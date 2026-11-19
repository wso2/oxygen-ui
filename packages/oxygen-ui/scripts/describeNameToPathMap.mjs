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

export const packageName = '@wso2/oxygen-ui';

const shareDeclaration = (a, b) => a.declarations?.some(declaration => b.declarations?.includes(declaration)) ?? false;

export const isTypeOnly = target => !(target.flags & ts.SymbolFlags.Value);

/**
 * Which path of the package each name on the barrel lives on. It works on TypeScript symbols that its caller
 * gives it, so it can be tested with symbols made by hand:
 *
 * - `published`: the paths, each `{ name, exports: Map<name, symbol>, module?: file }`.
 * - `barrelNames`: the symbols the barrel exports.
 * - `resolve` follows an alias to the symbol it names, and `moduleSymbol` gives the symbol of a module.
 * - `foldersOfTheMaterialRoot`: the Material UI folders its root re-exports.
 */
export function describeNameToPathMap(published, barrelNames, { resolve, moduleSymbol, foldersOfTheMaterialRoot }) {
  const candidates = published.map(entry => ({
    ...entry,
    targets: new Set(entry.exports.values()),
    moduleTarget: entry.module && moduleSymbol(entry.module),
  }));
  const map = {};
  const withoutPath = [];

  for (const barrelName of barrelNames) {
    const name = barrelName.name;
    const target = resolve(barrelName);
    const namespaceOwner = candidates.find(candidate => candidate.moduleTarget === target);
    const exporters = candidates.filter(candidate => candidate.targets.has(target));
    // Material UI's own module augmentation can make two symbols of one interface, so a type is also found by its declarations.
    const exportersOfTheSameDeclarations = () =>
      candidates.filter(candidate => [...candidate.targets].some(other => shareDeclaration(other, target)));
    const found = exporters.length || !isTypeOnly(target) ? exporters : exportersOfTheSameDeclarations();
    // Material UI can export one name from two modules, and its root re-exports only one of them.
    const owner =
      namespaceOwner ??
      found.find(candidate => candidate.name === name) ??
      found.find(candidate => foldersOfTheMaterialRoot.has(candidate.name)) ??
      found[0];

    if (!owner) {
      withoutPath.push(name);
      continue;
    }

    const isDefault =
      owner.exports.get('default') === target && (owner.name === name || owner.exports.get(name) !== target);

    map[name] = {
      path: `${packageName}/${owner.name}`,
      kind: namespaceOwner ? 'namespace' : isDefault ? 'default' : 'named',
      typeOnly: isTypeOnly(target),
    };
  }

  if (withoutPath.length) throw new Error(`On the barrel, and on no path: ${withoutPath.join(', ')}.`);

  return Object.fromEntries(Object.entries(map).sort(([a], [b]) => (a < b ? -1 : 1)));
}
