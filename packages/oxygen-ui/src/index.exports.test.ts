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
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));

function staticImportSpecifiers(source: string): string[] {
  const stripped = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/import\s+type\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?/g, '')
    .replace(/export\s+type\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?/g, '');

  const fromSpecs = [...stripped.matchAll(/\b(?:import|export)\s+[\s\S]*?from\s+['"]([^'"]+)['"]/g)].map(
    (match) => match[1],
  );
  const bareSpecs = [...stripped.matchAll(/(?:^|[;\n])\s*import\s+['"]([^'"]+)['"]/g)].map(
    (match) => match[1],
  );
  return [...fromSpecs, ...bareSpecs];
}

function isHeavyUiSpecifier(specifier: string): boolean {
  const prefixes = ['prismjs', '@mui/x-data-grid', '@mui/x-date-pickers', '@mui/x-tree-view'];
  return prefixes.some((prefix) => specifier === prefix || specifier.startsWith(`${prefix}/`));
}

describe('package entry module graph', () => {
  it('does not statically import Prism or MUI X packages', () => {
    const source = readFileSync(join(here, 'index.ts'), 'utf8');
    expect(staticImportSpecifiers(source).filter(isHeavyUiSpecifier)).toEqual([]);
  });
});
