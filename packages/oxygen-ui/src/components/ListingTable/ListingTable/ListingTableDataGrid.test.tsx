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
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import OxygenUIThemeProvider from '../../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import ListingTable from './ListingTable';

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

describe('ListingTable.DataGrid', () => {
  beforeAll(async () => {
    await import('@mui/x-data-grid');
  }, 30_000);

  afterEach(() => {
    cleanup();
  });

  it('does not statically import @mui/x-data-grid', () => {
    const source = readFileSync(join(here, 'ListingTableDataGrid.tsx'), 'utf8');
    expect(
      staticImportSpecifiers(source).filter(
        (specifier) => specifier === '@mui/x-data-grid' || specifier.startsWith('@mui/x-data-grid/'),
      ),
    ).toEqual([]);
  });

  it('clears the cached Data Grid load when the import rejects', () => {
    const source = readFileSync(join(here, 'ListingTableDataGrid.tsx'), 'utf8');
    const loadFn = source.slice(
      source.indexOf('function loadStyledDataGrid'),
      source.indexOf('export function ListingTableDataGrid'),
    );
    expect(loadFn).toContain('styledDataGridPromise = undefined');
    expect(loadFn).toMatch(/throw error/);
  });

  it('announces loading with a status role and no reserved height', () => {
    render(
      <OxygenUIThemeProvider>
        <ListingTable.Provider>
          <ListingTable.Container>
            <ListingTable.DataGrid
              autoHeight
              rows={[{ id: 1, name: 'Acme' }]}
              columns={[{ field: 'name', headerName: 'Customer', width: 160 }]}
            />
          </ListingTable.Container>
        </ListingTable.Provider>
      </OxygenUIThemeProvider>,
    );

    const status = screen.getByRole('status', { name: 'Loading data grid' });
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(getComputedStyle(status).minHeight).not.toBe('200px');
  });

  it('renders row values after the grid loads', async () => {
    render(
      <OxygenUIThemeProvider>
        <ListingTable.Provider>
          <ListingTable.Container>
            <ListingTable.DataGrid
              autoHeight
              rows={[{ id: 1, name: 'Acme' }]}
              columns={[{ field: 'name', headerName: 'Customer', width: 160 }]}
            />
          </ListingTable.Container>
        </ListingTable.Provider>
      </OxygenUIThemeProvider>,
    );

    expect(await screen.findByText('Acme', undefined, { timeout: 15_000 })).toBeTruthy();
  }, 20_000);
});
