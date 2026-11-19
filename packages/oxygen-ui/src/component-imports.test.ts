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

import { readFileSync } from 'node:fs';
import { dirname, join, normalize, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import { repoRoot, sourceFilesUnder } from '../test/support/sourceFiles';

const componentsRoot = join(repoRoot, 'packages/oxygen-ui/src/components');

/**
 * A component reaches into another component's folder through that folder's `index`, or through its
 * `internal` when the two are built from the same parts, such as LogViewer from ListingTable's. Anything
 * deeper is listed here until it gets an `internal` of its own, and each entry is a pair `from -> target`.
 */
const deepImportsStillAllowed = [
  'HeaderBreadcrumbs -> ContextSwitcher/model',
];

const relativeSpecifier = /(?:from\s+|import\s*\(\s*|import\s+)['"](\.[^'"]*)['"]/g;

/** Every `from -> target` where a file in one component folder imports a path inside another. */
const importsBetweenComponents = (): { pair: string; file: string }[] =>
  sourceFilesUnder(componentsRoot).flatMap((file) => {
    const from = relative(componentsRoot, file).split(sep);

    // The files beside the component folders, such as the barrel, are not a component.
    if (from.length < 2) return [];

    return [...readFileSync(file, 'utf8').matchAll(relativeSpecifier)].flatMap(([, specifier]) => {
      const resolved = normalize(join(dirname(file), specifier));

      // An import of something outside the component folders, such as the styles, is not between components.
      if (!resolved.startsWith(`${componentsRoot}${sep}`)) return [];

      const target = relative(componentsRoot, resolved).split(sep);

      if (target[0] === from[0]) return [];

      return [{ pair: `${from[0]} -> ${target.join('/')}`, file: relative(componentsRoot, file) }];
    });
  });

const isDeclaredSeam = (pair: string) => /^[A-Za-z]+ -> [A-Za-z]+(\/(index|internal))?$/.test(pair);

describe('imports between components', () => {
  it('go through the other component folder\'s index or internal', () => {
    const deep = importsBetweenComponents().filter(({ pair }) => !isDeclaredSeam(pair) && !deepImportsStillAllowed.includes(pair));

    expect(deep.map(({ pair, file }) => `${file}: ${pair}`)).toEqual([]);
  });

  it('keeps no exception that nothing needs any more', () => {
    const used = new Set(importsBetweenComponents().map(({ pair }) => pair));

    expect(deepImportsStillAllowed.filter((pair) => !used.has(pair))).toEqual([]);
  });

  it('finds the imports it is meant to restrict', () => {
    const pairs = importsBetweenComponents().map(({ pair }) => pair);

    expect(pairs).toContain('LogViewer -> ListingTable/internal');
    expect(pairs.filter((pair) => pair.startsWith('LogViewer -> ListingTable/') && !pair.endsWith('/internal'))).toEqual([]);
    expect(pairs.length).toBeGreaterThan(10);
  });
});
