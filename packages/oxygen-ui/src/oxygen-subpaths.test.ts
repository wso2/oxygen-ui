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

describe('Oxygen subpaths', () => {
  it('publishes CommonJS require mappings for MUI X subpaths', () => {
    const pkg = JSON.parse(readFileSync(join(here, '../package.json'), 'utf8')) as {
      exports: Record<string, { require?: string }>;
    };

    expect(pkg.exports['./data-grid']?.require).toBe('./dist/data-grid.cjs');
    expect(pkg.exports['./date-pickers']?.require).toBe('./dist/date-pickers.cjs');
    expect(pkg.exports['./date-pickers/*']?.require).toBe('./dist/date-pickers/*.cjs');
    expect(pkg.exports['./tree-view']?.require).toBe('./dist/tree-view.cjs');
  });

  it('data-grid re-exports @mui/x-data-grid', () => {
    const source = readFileSync(join(here, 'data-grid.ts'), 'utf8');
    expect(staticImportSpecifiers(source)).toEqual(['@mui/x-data-grid']);
  });

  it('date-pickers exports DatePicker and does not import adapters', () => {
    const source = readFileSync(join(here, 'date-pickers.ts'), 'utf8');
    const specifiers = staticImportSpecifiers(source);
    expect(specifiers).toContain('@mui/x-date-pickers');
    expect(specifiers.filter((specifier) => specifier.includes('Adapter'))).toEqual([]);
  });

  it('tree-view exports SimpleTreeView', async () => {
    const { SimpleTreeView } = await import('./tree-view');
    expect(SimpleTreeView).toBeDefined();
  }, 15_000);

  it('date-pickers/AdapterDateFns exports AdapterDateFns', async () => {
    const { AdapterDateFns } = await import('./date-pickers/AdapterDateFns');
    expect(AdapterDateFns).toBeDefined();
  }, 15_000);
});
