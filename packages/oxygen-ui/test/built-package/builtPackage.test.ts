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

// @vitest-environment node

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import barrelExportsIn0231 from './barrel-exports-0.23.1.json';
import {
  installBuiltPackage,
  type Bundler,
  type InstalledPackage,
  type Marker,
} from './installBuiltPackage';

interface Row {
  name: string;
  app: string;
  holds: Marker[];
  /** Gzip bytes, 10% above the size measured when the row was added or the build last changed. */
  gzipBudget: Record<Bundler, number>;
}

const bundlers: Bundler[] = ['rolldown', 'vite'];

const barrelImport = (...names: string[]): string =>
  `import { ${names.join(', ')} } from '@wso2/oxygen-ui';\nexport { ${names.join(', ')} };\n`;

const rows: Row[] = [
  { name: 'TextField', app: barrelImport('TextField'), holds: [], gzipBudget: { rolldown: 56064, vite: 57338 } },
  { name: 'Select', app: barrelImport('Select'), holds: [], gzipBudget: { rolldown: 53806, vite: 55013 } },
  { name: 'Header', app: barrelImport('Header'), holds: [], gzipBudget: { rolldown: 55822, vite: 57027 } },
  { name: 'AppShell', app: barrelImport('AppShell'), holds: [], gzipBudget: { rolldown: 28987, vite: 29466 } },
  { name: 'Button', app: barrelImport('Button'), holds: [], gzipBudget: { rolldown: 36975, vite: 37772 } },
  { name: 'OxygenUIThemeProvider', app: barrelImport('OxygenUIThemeProvider'), holds: ['font injection'], gzipBudget: { rolldown: 339838, vite: 341590 } },
  { name: 'only an Oxygen theme', app: barrelImport('AcrylicOrangeTheme'), holds: ['font injection'], gzipBudget: { rolldown: 321306, vite: 322007 } },
  {
    name: 'the seven imports of the issue',
    app: barrelImport('TextField', 'Select', 'Header', 'AppShell', 'Button', 'OxygenUIThemeProvider', 'Box'),
    holds: ['font injection'],
    gzipBudget: { rolldown: 393342, vite: 396304 },
  },
  // Uses every marked library, so a marker that stops matching fails here and not silently in the rows above.
  { name: 'every marked library', app: barrelImport('DataGrid', 'DatePickers', 'TreeView', 'CodeBlock', 'OxygenUIThemeProvider'), holds: ['Data Grid', 'date pickers', 'Tree View', 'Prism', 'font injection'], gzipBudget: { rolldown: 643651, vite: 653343 } },
];

const namesRemovedUpstream = ['ChoreoLabsTheme'];

describe('built package', { timeout: 60_000 }, () => {
  let installed: InstalledPackage;
  const measured: { app: string; bundler: Bundler; gzipBytes: number; holds: string }[] = [];

  beforeAll(() => {
    installed = installBuiltPackage();
  });

  afterAll(() => {
    installed?.remove();
    console.table(measured);
  });

  it('still exports from the barrel the names 0.23.1 exported', async () => {
    const stillExported = barrelExportsIn0231.filter(name => !namesRemovedUpstream.includes(name));
    expect(await installed.barrelExportNames()).toEqual(expect.arrayContaining(stillExported));
  });

  it('does not resolve a path to an internal module', async () => {
    await expect(installed.bundle(`import '@wso2/oxygen-ui/components/TextField/TextField';\n`, 'rolldown')).rejects.toThrow();
    await expect(installed.bundle(`import '@wso2/oxygen-ui/index';\n`, 'vite')).rejects.toThrow();
  });

  describe.each(rows)('app importing $name', row => {
    it.each(bundlers)('bundled with %s holds only the marked code it uses, within its gzip budget', async bundler => {
      const report = await installed.bundle(row.app, bundler);

      measured.push({ app: row.name, bundler, gzipBytes: report.gzipBytes, holds: report.markers.join(', ') });

      expect.soft([...report.markers].sort()).toEqual([...row.holds].sort());
      expect.soft(report.gzipBytes).toBeLessThanOrEqual(row.gzipBudget[bundler]);
    });
  });
});
