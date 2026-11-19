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

import * as material from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { repoRoot, sourceFilesUnder } from '../test/support/sourceFiles';

/** Material UI and MUI X name each state and slot class `Mui<Component>-<slot>`. */
const classNamePattern = /(?<![A-Za-z0-9_-])Mui([A-Z][A-Za-z]+)-([a-zA-Z]+)\b/g;

const lowerFirst = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

/** The class names a component exports, or undefined for a component this package does not know. */
const exportedClassNames = (component: string): Set<string> | undefined => {
  const classes = component === 'DataGrid' ? gridClasses : (material as Record<string, unknown>)[`${lowerFirst(component)}Classes`];

  return classes && typeof classes === 'object' ? new Set(Object.values(classes as Record<string, string>)) : undefined;
};

describe('Material UI class names written as text', () => {
  it('are all exported by the installed Material UI or MUI X', () => {
    const stale: string[] = [];
    let checked = 0;

    for (const file of sourceFilesUnder(join(repoRoot, 'packages/oxygen-ui/src'))) {
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, index) => {
          for (const [className, component] of line.matchAll(classNamePattern)) {
            const exported = exportedClassNames(component);

            checked += 1;

            if (!exported?.has(className)) {
              const reason = exported ? 'is not in' : 'has no';
              stale.push(`${relative(repoRoot, file)}:${index + 1} ${className} ${reason} ${lowerFirst(component)}Classes`);
            }
          }
        });
    }

    expect(stale).toEqual([]);
    // Guards the scan itself: the pattern and the folder must still find the class names written in src.
    expect(checked).toBeGreaterThan(100);
  });

  it('are found by the pattern, including the one a Material UI upgrade removed', () => {
    const found = [...'a .MuiInputBase-inputSizeSmall b MuiSelect-select'.matchAll(classNamePattern)].map((match) => match[0]);

    expect(found).toEqual(['MuiInputBase-inputSizeSmall', 'MuiSelect-select']);
    expect(exportedClassNames('InputBase')?.has('MuiInputBase-inputSizeSmall')).toBe(false);
    expect(exportedClassNames('InputBase')?.has('MuiInputBase-sizeSmall')).toBe(true);
  });
});
