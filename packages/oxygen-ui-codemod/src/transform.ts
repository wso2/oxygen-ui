/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import ts from 'typescript';
import type { PathMap, PathMapEntry } from '@wso2/oxygen-ui-path-map';

export const BARREL = '@wso2/oxygen-ui';

export type RemainingReason =
  | 'unknown-name'
  | 'unsupported-import'
  | 'unsupported-export'
  | 'dynamic-import'
  | 'require';

export interface Report {
  line: number;
  reason: RemainingReason;
  message: string;
}

export interface TransformResult {
  source: string;
  reports: Report[];
}

interface Edit {
  start: number;
  end: number;
  text: string;
}

interface Remaining {
  position: number;
  reason: RemainingReason;
  message: string;
}

const isBarrelLiteral = (node: ts.Node | undefined): boolean =>
  node !== undefined && ts.isStringLiteralLike(node) && node.text === BARREL;

interface Binding {
  imported: string;
  local: string;
  typeOnly: boolean;
}

interface Placement {
  binding: Binding;
  entry: PathMapEntry;
}

type Refusal = Omit<Remaining, 'position'>;

const placeBindings = (bindings: Binding[], map: PathMap): Map<string, Placement[]> | Refusal => {
  const byPath = new Map<string, Placement[]>();
  for (const binding of bindings) {
    const entry = map[binding.imported];
    if (!entry) {
      return {
        reason: 'unknown-name',
        message: `${binding.imported} is not in the path map of the installed @wso2/oxygen-ui.`,
      };
    }
    const placed = { ...binding, typeOnly: binding.typeOnly || entry.typeOnly };
    byPath.set(entry.path, [...(byPath.get(entry.path) ?? []), { binding: placed, entry }]);
  }
  return byPath;
};

const typeMarker = (typeOnly: boolean): string => (typeOnly ? 'type ' : '');

const namedSpecifier = ({ binding, entry }: Placement, typeOnly: boolean): string => {
  const exported = entry.kind === 'default' ? 'default' : binding.imported;
  const renamed = exported === binding.local ? exported : `${exported} as ${binding.local}`;
  return typeMarker(typeOnly) + renamed;
};

// Names that are only types stay inline as `type X` in the statement of their path. The ESLint rule's fix
// writes a separate `import type` statement instead; the two differ on purpose, see `statementsFor` there.
const importStatements = (path: string, placements: Placement[], statementTypeOnly: boolean, quote: string): string[] => {
  const statements: string[] = [];
  const bound = placements.filter(({ entry }) => entry.kind !== 'namespace');

  for (const { binding, entry } of placements) {
    if (entry.kind === 'namespace') {
      statements.push(
        `import ${typeMarker(statementTypeOnly || binding.typeOnly)}* as ${binding.local} from ${quote}${path}${quote}`,
      );
    }
  }
  if (bound.length === 0) return statements;

  if (statementTypeOnly) {
    const [only] = bound;
    statements.push(
      bound.length === 1 && only.entry.kind === 'default'
        ? `import type ${only.binding.local} from ${quote}${path}${quote}`
        : `import type { ${bound.map((p) => namedSpecifier(p, false)).join(', ')} } from ${quote}${path}${quote}`,
    );
    return statements;
  }

  const main = bound.find(({ entry, binding }) => entry.kind === 'default' && !binding.typeOnly);
  const named = bound.filter((placement) => placement !== main).map((p) => namedSpecifier(p, p.binding.typeOnly));
  const parts = [main?.binding.local, named.length > 0 ? `{ ${named.join(', ')} }` : undefined];
  statements.push(`import ${parts.filter(Boolean).join(', ')} from ${quote}${path}${quote}`);
  return statements;
};

const exportStatements = (path: string, placements: Placement[], statementTypeOnly: boolean, quote: string): string[] => {
  const statements: string[] = [];
  const bound = placements.filter(({ entry }) => entry.kind !== 'namespace');

  for (const { binding, entry } of placements) {
    if (entry.kind === 'namespace') {
      statements.push(
        `export ${typeMarker(statementTypeOnly || binding.typeOnly)}* as ${binding.local} from ${quote}${path}${quote}`,
      );
    }
  }
  if (bound.length > 0) {
    const specifiers = bound.map((p) => namedSpecifier(p, !statementTypeOnly && p.binding.typeOnly));
    statements.push(`export ${typeMarker(statementTypeOnly)}{ ${specifiers.join(', ')} } from ${quote}${path}${quote}`);
  }
  return statements;
};

const rewriteStatement = (
  statement: ts.ImportDeclaration | ts.ExportDeclaration,
  source: string,
  map: PathMap,
): { text: string } | { remaining: Refusal } => {
  const isImport = ts.isImportDeclaration(statement);
  const bindings = isImport ? statement.importClause?.namedBindings : statement.exportClause;
  const hasDefaultImport = isImport && statement.importClause?.name !== undefined;
  const refusal = (reason: RemainingReason, message: string) => ({ remaining: { reason, message } });

  if (!bindings || hasDefaultImport || !(ts.isNamedImports(bindings) || ts.isNamedExports(bindings))) {
    return refusal(
      isImport ? 'unsupported-import' : 'unsupported-export',
      isImport
        ? 'A whole-barrel namespace import, a default import or a bare import is not rewritten.'
        : 'A barrel re-export of everything or as a namespace is not rewritten.',
    );
  }
  if (bindings.elements.length === 0) {
    return refusal(isImport ? 'unsupported-import' : 'unsupported-export', 'This statement names nothing.');
  }

  const statementText = statement.getText();
  if (statement.attributes || /\/\/|\/\*/.test(statementText)) {
    return refusal(
      isImport ? 'unsupported-import' : 'unsupported-export',
      'This statement has comments or import attributes that a rewrite would drop.',
    );
  }

  const statementTypeOnly = ts.isImportDeclaration(statement)
    ? Boolean(statement.importClause?.isTypeOnly)
    : statement.isTypeOnly;
  const placed = placeBindings(
    bindings.elements.map((specifier) => ({
      imported: (specifier.propertyName ?? specifier.name).text,
      local: specifier.name.text,
      typeOnly: specifier.isTypeOnly,
    })),
    map,
  );
  if (!(placed instanceof Map)) return { remaining: placed };

  const quote = source[statement.moduleSpecifier!.getStart()];
  const semicolon = source[statement.getEnd() - 1] === ';' ? ';' : '';
  const lineStart = source.lastIndexOf('\n', statement.getStart() - 1) + 1;
  const indent = /^[ \t]*/.exec(source.slice(lineStart, statement.getStart()))![0];
  const build = isImport ? importStatements : exportStatements;

  const lines = [...placed].flatMap(([path, placements]) => build(path, placements, statementTypeOnly, quote));
  const lineEnding = /\r?\n/.exec(source.slice(statement.getEnd()))?.[0] ?? '\n';
  return {
    text: lines
      .map((line) => line + semicolon)
      .join(`${lineEnding}${indent}`),
  };
};

const collectBarrelUses = (file: ts.SourceFile, source: string, map: PathMap) => {
  const edits: Edit[] = [];
  const remaining: Remaining[] = [];

  const visit = (node: ts.Node): void => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      isBarrelLiteral(node.moduleSpecifier)
    ) {
      const result = rewriteStatement(node, source, map);
      if ('text' in result) {
        edits.push({ start: node.getStart(), end: node.getEnd(), text: result.text });
      } else {
        remaining.push({ position: node.getStart(), ...result.remaining });
      }
      return;
    }
    if (ts.isCallExpression(node) && isBarrelLiteral(node.arguments[0])) {
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        remaining.push({
          position: node.getStart(),
          reason: 'dynamic-import',
          message: 'A dynamic import of the barrel is not rewritten.',
        });
      } else if (ts.isIdentifier(node.expression) && node.expression.text === 'require') {
        remaining.push({
          position: node.getStart(),
          reason: 'require',
          message: 'A require of the barrel is not rewritten.',
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { edits, remaining };
};

const applyEdits = (source: string, edits: Edit[]): string => {
  let result = '';
  let cursor = 0;
  for (const edit of edits) {
    result += source.slice(cursor, edit.start) + edit.text;
    cursor = edit.end;
  }
  return result + source.slice(cursor);
};

const positionAfterEdits = (position: number, edits: Edit[]): number =>
  edits
    .filter((edit) => edit.end <= position)
    .reduce((shifted, edit) => shifted + edit.text.length - (edit.end - edit.start), position);

const lineOf = (text: string, position: number): number => {
  let line = 1;
  for (let index = 0; index < position; index++) if (text[index] === '\n') line++;
  return line;
};

export const transformPathImports = (source: string, map: PathMap): TransformResult => {
  if (!source.includes(BARREL)) return { source, reports: [] };

  const file = ts.createSourceFile('input.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const { edits, remaining } = collectBarrelUses(file, source, map);

  if (remaining.some((use) => use.reason === 'unknown-name')) {
    return { source, reports: remaining.map((use) => toReport(source, use.position, use)) };
  }

  const output = applyEdits(source, edits);
  const reports = remaining.map((use) =>
    toReport(output, positionAfterEdits(use.position, edits), use),
  );
  return { source: output, reports };
};

const toReport = (text: string, position: number, use: Remaining): Report => ({
  line: lineOf(text, position),
  reason: use.reason,
  message: use.message,
});

export const findBarrelImports = (source: string, map: PathMap): number[] => {
  if (!source.includes(BARREL)) return [];
  const file = ts.createSourceFile('input.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const { edits, remaining } = collectBarrelUses(file, source, map);
  return [...edits.map((edit) => edit.start), ...remaining.map((use) => use.position)]
    .sort((a, b) => a - b)
    .map((position) => lineOf(source, position));
};
