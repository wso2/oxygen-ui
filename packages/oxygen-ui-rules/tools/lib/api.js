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
export function readOwnedApi({packageDir, entry = 'src/index.ts', tsconfig = 'tsconfig.json'}) {
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

  const api = new Map();

  for (const exported of checker.getExportsOfModule(checker.getSymbolAtLocation(entryFile))) {
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;

    if (isOwned(symbol) && symbol.flags & ts.SymbolFlags.Value) {
      api.set(exported.getName(), describeValue(checker, exported.getName(), symbol, isOwned));
    }
  }

  return new Map([...api].sort(([a], [b]) => a.localeCompare(b)));
}

function describeValue(checker, name, symbol, isOwned) {
  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()[0];
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const description = {};

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
    .map((property) => `${property.getName()}${property.flags & ts.SymbolFlags.Optional ? '?' : ''}`)
    .sort();
}
