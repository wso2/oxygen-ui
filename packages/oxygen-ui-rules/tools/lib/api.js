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

import {dirname, resolve, sep} from 'path';
import ts from 'typescript';

/**
 * Reads the public API of a package from its TypeScript entry point. Returns only the values the
 * package declares itself, leaving out re-exports from dependencies such as
 * `export * from '@mui/material'`.
 *
 * Each value maps to a description that `pnpm rules:coverage` snapshots:
 * - `props`: the props a component declares itself (inherited MUI and DOM props are left out).
 *   Optional props end with `?`.
 * - `members`: the sub-components of a compound component, such as `ListingTable.Filter`,
 *   with their own props.
 *
 * @param {{packageDir: string, entry?: string, tsconfig?: string}} options
 * @returns {Map<string, {props?: string[], members?: Record<string, string[]>}>}
 */
export function readOwnedApi(options) {
  const {owned} = readApiDetails(options);

  return new Map(
    [...owned].map(([name, value]) => {
      const description = {};
      if (value.props) description.props = value.props.map(propName).sort();
      if (value.members) {
        description.members = Object.fromEntries(
          Object.entries(value.members).map(([member, props]) => [member, props.map(propName).sort()]),
        );
      }
      return [name, description];
    }),
  );
}

const propName = (prop) => `${prop.name}${prop.optional ? '?' : ''}`;

/** Longest type text kept in the generated API reference. */
const MAX_TYPE_LENGTH = 120;

/**
 * Reads a package's public API in detail, for the generated API reference.
 *
 * @param {{packageDir: string, entry?: string, tsconfig?: string}} options
 * @returns {{
 *   all: Set<string>,
 *   owned: Map<string, {description: string, props?: Prop[], members?: Record<string, Prop[]>}>,
 * }}
 *   `all` holds every export name, including re-exports such as MUI's, and `owned` the values the
 *   package declares itself.
 * @typedef {{name: string, optional: boolean, type: string, description: string}} Prop
 */
export function readApiDetails({packageDir, entry = 'src/index.ts', tsconfig = 'tsconfig.json'}) {
  const sourceDir = resolve(packageDir, 'src') + sep;
  const configPath = resolve(packageDir, tsconfig);
  const config = ts.readConfigFile(configPath, ts.sys.readFile);

  if (config.error) {
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  }

  const {options} = ts.parseJsonConfigFileContent(config.config, ts.sys, dirname(configPath));
  const entryPath = resolve(packageDir, entry);
  const program = ts.createProgram([entryPath], {...options, noEmit: true});
  const checker = program.getTypeChecker();
  const entryFile = program.getSourceFile(entryPath);

  if (!entryFile) {
    throw new Error(`Cannot read ${entryPath}`);
  }

  // TypeScript reports file names with forward slashes on every platform.
  const isOwned = (symbol) =>
    (symbol.getDeclarations() ?? []).some((declaration) =>
      resolve(declaration.getSourceFile().fileName).startsWith(sourceDir),
    );

  const owned = new Map();
  const all = new Set();

  for (const exported of checker.getExportsOfModule(checker.getSymbolAtLocation(entryFile))) {
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    all.add(exported.getName());

    if (isOwned(symbol) && symbol.flags & ts.SymbolFlags.Value) {
      owned.set(exported.getName(), describeValue(checker, exported.getName(), symbol, isOwned));
    }
  }

  return {all, owned: new Map([...owned].sort(([a], [b]) => a.localeCompare(b)))};
}

function describeValue(checker, name, symbol, isOwned) {
  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()[0];
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const description = {description: ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim()};

  // Components are capitalised; hooks, utilities and constants are not, and have no props.
  if (!/^[A-Z]/.test(name)) {
    return description;
  }

  const props = getProps(checker, type, declaration, isOwned);
  if (props) {
    description.props = props;
  }

  const members = {};
  for (const property of type.getProperties()) {
    if (/^[A-Z]/.test(property.getName()) && isOwned(property)) {
      const memberProps = getProps(checker, checker.getTypeOfSymbolAtLocation(property, declaration), declaration, isOwned);

      if (memberProps) {
        members[property.getName()] = memberProps;
      }
    }
  }

  if (Object.keys(members).length > 0) {
    description.members = Object.fromEntries(Object.entries(members).sort(([a], [b]) => a.localeCompare(b)));
  }

  return description;
}

/** The props a component declares itself, or `null` if the value is not callable. */
function getProps(checker, type, declaration, isOwned) {
  const [signature] = type.getCallSignatures();

  if (!signature) {
    return null;
  }

  const [propsParameter] = signature.getParameters();

  if (!propsParameter) {
    return [];
  }

  const propsType = checker.getApparentType(checker.getTypeOfSymbolAtLocation(propsParameter, declaration));

  return checker
    .getPropertiesOfType(propsType)
    .filter((property) => isOwned(property))
    .map((property) => {
      const optional = Boolean(property.flags & ts.SymbolFlags.Optional);
      const typeText = describeType(checker, checker.getTypeOfSymbolAtLocation(property, declaration), optional);

      return {
        name: property.getName(),
        optional,
        type: typeText.length > MAX_TYPE_LENGTH ? `${typeText.slice(0, MAX_TYPE_LENGTH - 1)}…` : typeText,
        description: ts.displayPartsToString(property.getDocumentationComment(checker)).replace(/\s+/g, ' ').trim(),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Formats a prop type. Unions are listed member by member, so named unions such as
 * `ListingTableVariant` show their allowed values, unless the list is too long to be useful.
 * Optional props leave out `undefined`.
 */
function describeType(checker, type, optional) {
  // Optional props include undefined, which the Required column already shows.
  const named = optional ? checker.typeToString(type).replace(/ \| undefined$/, '') : checker.typeToString(type);

  if (!type.isUnion()) {
    return named;
  }

  const parts = type.types.map((member) => checker.typeToString(member)).filter((part) => !(optional && part === 'undefined'));
  // TypeScript represents boolean as the union of true and false.
  const merged = parts.includes('true') && parts.includes('false')
    ? [...parts.filter((part) => part !== 'true' && part !== 'false'), 'boolean']
    : parts;
  const expanded = [...new Set(merged)].join(' | ');

  return expanded.length <= MAX_TYPE_LENGTH ? expanded : named;
}
