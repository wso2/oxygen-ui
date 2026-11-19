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

import { existsSync, globSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { installBuiltPackage, type InstalledPackage } from './installBuiltPackage';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url));

interface MapEntry {
  path: string;
  kind: 'default' | 'named' | 'namespace';
  typeOnly: boolean;
}

const nameToPathMap: Record<string, MapEntry> = JSON.parse(
  readFileSync(join(packageRoot, 'dist/path-map.json'), 'utf8'),
);

const componentFolders = readdirSync(join(packageRoot, 'src/components'), { withFileTypes: true })
  .filter(entry => entry.isDirectory() && existsSync(join(packageRoot, 'src/components', entry.name, 'index.ts')))
  .map(entry => entry.name);

const materialRoot = dirname(createRequire(import.meta.url).resolve('@mui/material/package.json'));

// `version` is the Oxygen version on the barrel, not Material UI's, and `esm` is Material UI's build output.
const materialPaths = readdirSync(materialRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && existsSync(join(materialRoot, entry.name, 'index.d.ts')))
  .map(entry => entry.name)
  .filter(name => name !== 'esm' && name !== 'version');

const hooks = ['useAppShell', 'useNotifications', 'useResolvedColorScheme', 'useThemeContent'];

const themes = [
  'OxygenTheme',
  'ClassicTheme',
  'HighContrastTheme',
  'PaleBaseTheme',
  'PaleGrayTheme',
  'PaleIndigoTheme',
];

const muiXPaths = [
  'data-grid',
  'date-pickers',
  'tree-view',
  ...['AdapterDateFns', 'AdapterDateFnsJalali', 'AdapterDateFnsJalaliV2', 'AdapterDateFnsV2', 'AdapterDayjs', 'AdapterDayjsBuddhist', 'AdapterLuxon', 'AdapterMoment', 'AdapterMomentHijri', 'AdapterMomentJalaali'].map(
    adapter => `date-pickers/${adapter}`,
  ),
];

const pathsOfOneName = ['OxygenUIThemeProvider', 'Layout', 'PageLoader', 'ParticleBackground', 'version'];

const publishedPaths = globSync('paths/**/*.js', { cwd: join(packageRoot, 'dist') }).map(file => file.replace(/^paths\/(.*)\.js$/, '$1'));

describe('path imports', { timeout: 120_000 }, () => {
  let installed: InstalledPackage;

  // esbuild, which the bundlers load, refuses to start under Vitest's jsdom environment, so the DOM is installed here.
  // Prism's language modules read the `Prism` that its core puts on `window` as a bare global, so `window` is the global object.
  // The globals stay for the rest of the file, because Prism highlights on a timer after the tests end.
  beforeAll(() => {
    const { window } = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });

    for (const name of Object.getOwnPropertyNames(window)) {
      if (!(name in globalThis)) Object.defineProperty(globalThis, name, { value: window[name as keyof typeof window], configurable: true, writable: true });
    }
    Object.defineProperty(globalThis, 'window', { value: globalThis, configurable: true, writable: true });
    installed = installBuiltPackage();
  });

  afterAll(() => {
    installed?.remove();
  });

  it('gives the Override from the path of TextField and of Select, the same object as the barrel', async () => {
    const app = await installed.evaluate(`
      import { TextField, Select } from '@wso2/oxygen-ui';
      import PathTextField from '@wso2/oxygen-ui/TextField';
      import PathSelect from '@wso2/oxygen-ui/Select';
      import { TextField as MaterialTextField } from '@mui/material';
      export { TextField, Select, PathTextField, PathSelect, MaterialTextField };
    `);

    expect(app.PathTextField).toBe(app.TextField);
    expect(app.PathSelect).toBe(app.Select);
    expect(app.PathTextField).not.toBe(app.MaterialTextField);
  });

  it('has a path for every Oxygen component folder, Material UI path, shared hook and theme, and for the provider, Layout, ParticleBackground and version, and no other', () => {
    // An Oxygen component folder and a Material UI path of one name are one path, the Oxygen one.
    const expected = new Set([
      ...componentFolders,
      'SearchBarWithAdvancedFilter',
      ...materialPaths,
      ...hooks,
      ...themes,
      ...pathsOfOneName,
      ...muiXPaths,
    ]);

    expect([...publishedPaths].sort()).toEqual([...expected].sort());
  });

  it('gives every name in the map as the same object from its path as from the barrel', async () => {
    const valueNames = Object.keys(nameToPathMap).filter(name => !nameToPathMap[name].typeOnly);
    const paths = [...new Set(valueNames.map(name => nameToPathMap[name].path))];
    const importOfPath = (path: string) => `path_${paths.indexOf(path)}`;

    const app = await installed.evaluate(`
      import * as barrel from '@wso2/oxygen-ui';
      ${paths.map(path => `import * as ${importOfPath(path)} from '${path}';`).join('\n')}
      export const pairs = [
        ${valueNames
          .map(name => {
            const entry = nameToPathMap[name];
            const imported = importOfPath(entry.path);
            const fromPath = { default: `${imported}.default`, named: `${imported}.${name}`, namespace: imported }[entry.kind];
            return `['${name}', barrel.${name}, ${fromPath}]`;
          })
          .join(',\n')}
      ];
    `);

    const pairs = app.pairs as [string, unknown, unknown][];

    expect(pairs.length).toBe(valueNames.length);
    for (const [name, fromBarrel, fromPath] of pairs) {
      if (nameToPathMap[name].kind === 'namespace') {
        // Two namespace objects are never identical, so a namespace is the same when each member is.
        expect(Object.keys(fromPath as object).sort(), name).toEqual(Object.keys(fromBarrel as object).sort());
        for (const member of Object.keys(fromBarrel as object)) {
          expect((fromPath as Record<string, unknown>)[member], `${name}.${member}`).toBe((fromBarrel as Record<string, unknown>)[member]);
        }
      } else {
        expect(fromPath, `${name} from its path`).toBe(fromBarrel);
      }
    }
  });

  it('has a map entry for every value the barrel exports', async () => {
    const app = await installed.evaluate(`
      import * as barrel from '@wso2/oxygen-ui';
      export const names = Object.keys(barrel);
    `);
    // Material UI exports these at run time and leaves them out of its declarations, so no import of them type checks.
    const withoutDeclarations = ['FormLabelRoot', 'StepperContext', 'createTransitions', 'experimental_extendTheme', 'private_createMixins', 'usePagination'];

    expect(
      (app.names as string[]).filter(name => !withoutDeclarations.includes(name) && !(name in nameToPathMap)),
    ).toEqual([]);
  });

  it('puts the hooks, the themes, the provider and what goes with it, Layout, ParticleBackground and version on paths of their own', () => {
    const pathOf = (name: string) => nameToPathMap[name]?.path;

    for (const hook of hooks) expect(pathOf(hook), hook).toBe(`@wso2/oxygen-ui/${hook}`);
    for (const theme of themes) expect(pathOf(theme), theme).toBe(`@wso2/oxygen-ui/${theme}`);
    for (const name of pathsOfOneName) expect(pathOf(name), name).toBe(`@wso2/oxygen-ui/${name}`);
    for (const name of ['useThemeSwitcher', 'createEmotionCache', 'ThemeOption', 'ThemeSwitcherContextValue', 'EmotionCache']) {
      expect(pathOf(name), name).toBe('@wso2/oxygen-ui/OxygenUIThemeProvider');
    }
    expect(pathOf('major')).toBe('@wso2/oxygen-ui/version');
  });

  it('maps the MUI X namespaces to the lower-case paths, and the adapter to its path under date-pickers', () => {
    expect(nameToPathMap.DataGrid).toEqual({ path: '@wso2/oxygen-ui/data-grid', kind: 'namespace', typeOnly: false });
    expect(nameToPathMap.DatePickers).toEqual({ path: '@wso2/oxygen-ui/date-pickers', kind: 'namespace', typeOnly: false });
    expect(nameToPathMap.TreeView).toEqual({ path: '@wso2/oxygen-ui/tree-view', kind: 'namespace', typeOnly: false });
    expect(nameToPathMap.AdapterDateFns).toEqual({ path: '@wso2/oxygen-ui/date-pickers/AdapterDateFns', kind: 'named', typeOnly: false });
  });

  it('re-exports every named export of its MUI X package from each lower-case path', async () => {
    const app = await installed.evaluate(`
      import * as dataGrid from '@wso2/oxygen-ui/data-grid';
      import * as datePickers from '@wso2/oxygen-ui/date-pickers';
      import * as treeView from '@wso2/oxygen-ui/tree-view';
      import * as muiDataGrid from '@mui/x-data-grid';
      import * as muiDatePickers from '@mui/x-date-pickers';
      import * as muiTreeView from '@mui/x-tree-view';
      import { AdapterDateFns } from '@wso2/oxygen-ui/date-pickers/AdapterDateFns';
      import { AdapterDateFns as MuiAdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
      import { AdapterDateFns as FromTheBarrel } from '@wso2/oxygen-ui';
      export const pairs = { dataGrid: [dataGrid, muiDataGrid], datePickers: [datePickers, muiDatePickers], treeView: [treeView, muiTreeView] };
      export { AdapterDateFns, MuiAdapterDateFns, FromTheBarrel };
    `);

    for (const [name, [fromPath, fromMui]] of Object.entries(app.pairs as Record<string, [object, object]>)) {
      expect(Object.keys(fromPath).sort(), name).toEqual(Object.keys(fromMui).sort());
      expect(Object.keys(fromPath).length, name).toBeGreaterThan(0);
      for (const member of Object.keys(fromMui)) {
        expect((fromPath as Record<string, unknown>)[member], `${name}.${member}`).toBe((fromMui as Record<string, unknown>)[member]);
      }
    }
    expect(app.AdapterDateFns).toBe(app.MuiAdapterDateFns);
    expect(app.AdapterDateFns).toBe(app.FromTheBarrel);
  });

  it('keeps the MUI X namespaces and AdapterDateFns on the barrel', async () => {
    const app = await installed.evaluate(`
      import { DataGrid, DatePickers, TreeView, AdapterDateFns } from '@wso2/oxygen-ui';
      export { DataGrid, DatePickers, TreeView, AdapterDateFns };
    `);

    expect(app.DataGrid).toHaveProperty('DataGrid');
    expect(app.DatePickers).toHaveProperty('DatePicker');
    expect(app.TreeView).toHaveProperty('SimpleTreeView');
    expect(typeof app.AdapterDateFns).toBe('function');
  });

  it('gives a theme path the theme as its default export, and the provider path the provider, with what goes with it', async () => {
    const app = await installed.evaluate(`
      import ClassicTheme from '@wso2/oxygen-ui/ClassicTheme';
      import { ClassicTheme as FromTheBarrel } from '@wso2/oxygen-ui';
      import Provider, { useThemeSwitcher, createEmotionCache } from '@wso2/oxygen-ui/OxygenUIThemeProvider';
      import { OxygenUIThemeProvider, useThemeSwitcher as switcherFromTheBarrel, createEmotionCache as cacheFromTheBarrel } from '@wso2/oxygen-ui';
      import version from '@wso2/oxygen-ui/version';
      import { version as versionFromTheBarrel } from '@wso2/oxygen-ui';
      export { ClassicTheme, FromTheBarrel, Provider, OxygenUIThemeProvider, useThemeSwitcher, switcherFromTheBarrel, createEmotionCache, cacheFromTheBarrel, version, versionFromTheBarrel };
    `);

    expect(app.ClassicTheme).toBe(app.FromTheBarrel);
    expect(app.Provider).toBe(app.OxygenUIThemeProvider);
    expect(app.useThemeSwitcher).toBe(app.switcherFromTheBarrel);
    expect(app.createEmotionCache).toBe(app.cacheFromTheBarrel);
    expect(app.version).toBe(app.versionFromTheBarrel);
  });

  it('gives Material UI paths the default and the named exports of Material UI', async () => {
    const app = await installed.evaluate(`
      import Button, { buttonClasses } from '@wso2/oxygen-ui/Button';
      import Box from '@wso2/oxygen-ui/Box';
      import MaterialButton, { buttonClasses as materialButtonClasses } from '@mui/material/Button';
      import MaterialBox from '@mui/material/Box';
      export { Button, buttonClasses, Box, MaterialButton, materialButtonClasses, MaterialBox };
    `);

    expect(app.Button).toBe(app.MaterialButton);
    expect(app.buttonClasses).toBe(app.materialButtonClasses);
    expect(app.Box).toBe(app.MaterialBox);
  });

  it('gives the Override path the Material UI names the Override does not replace', async () => {
    const app = await installed.evaluate(`
      import { textFieldClasses } from '@wso2/oxygen-ui/TextField';
      import { textFieldClasses as materialTextFieldClasses } from '@mui/material/TextField';
      export { textFieldClasses, materialTextFieldClasses };
    `);

    expect(app.textFieldClasses).toBeDefined();
    expect(app.textFieldClasses).toBe(app.materialTextFieldClasses);
  });

  it('adds Oxygen names to the styles and utils paths, which keep Material UI names', async () => {
    const app = await installed.evaluate(`
      import { createOxygenTheme, pxToRem, styled, useTheme } from '@wso2/oxygen-ui/styles';
      import { formatRelativeTime, debounce } from '@wso2/oxygen-ui/utils';
      import * as barrel from '@wso2/oxygen-ui';
      export { createOxygenTheme, pxToRem, styled, useTheme, formatRelativeTime, debounce, barrel };
    `);
    const barrel = app.barrel as Record<string, unknown>;

    expect(app.createOxygenTheme).toBe(barrel.createOxygenTheme);
    expect(app.pxToRem).toBe(barrel.pxToRem);
    expect(app.styled).toBe(barrel.styled);
    expect(app.useTheme).toBe(barrel.useTheme);
    expect(app.formatRelativeTime).toBe(barrel.formatRelativeTime);
    expect(typeof app.debounce).toBe('function');
  });

  it('gives every path a default export', async () => {
    const pathNames = [...componentFolders, 'SearchBarWithAdvancedFilter'];
    const app = await installed.evaluate(`
      ${pathNames.map((name, index) => `import d${index} from '@wso2/oxygen-ui/${name}';`).join('\n')}
      export const defaults = {${pathNames.map((name, index) => `${name}: d${index}`).join(', ')}};
    `);

    const missing = Object.entries(app.defaults as Record<string, unknown>).filter(([, value]) => value === undefined);

    expect(missing.map(([name]) => name)).toEqual([]);
  });

  describe.each(['bundler', 'node16', 'nodenext'] as const)('type declarations under moduleResolution %s', moduleResolution => {
    it('resolve to a typed default export for every Oxygen component path', () => {
      const pathNames = [...componentFolders, 'SearchBarWithAdvancedFilter'];
      const source = `
        type IsAny<T> = 0 extends 1 & T ? true : false;
        ${pathNames.map((name, index) => `import d${index} from '@wso2/oxygen-ui/${name}';\nconst notAny${index}: IsAny<typeof d${index}> = false;`).join('\n')}
        export { ${pathNames.map((_, index) => `notAny${index}`).join(', ')} };
      `;

      expect(installed.typeCheck(source, moduleResolution)).toEqual([]);
    });

    it('resolve for every published path, with the names Oxygen adds and the types Material UI has', () => {
      const source = `
        ${publishedPaths.map((name, index) => `import * as p${index} from '@wso2/oxygen-ui/${name}';`).join('\n')}
        import Button, { type ButtonProps, buttonClasses } from '@wso2/oxygen-ui/Button';
        import { type TextFieldProps, textFieldClasses } from '@wso2/oxygen-ui/TextField';
        import { createOxygenTheme, pxToRem, styled, type OxygenThemeType, type Theme } from '@wso2/oxygen-ui/styles';
        import { formatRelativeTime, debounce } from '@wso2/oxygen-ui/utils';
        import { amber } from '@wso2/oxygen-ui/colors';
        export const used = [${publishedPaths.map((_, index) => `p${index}`).join(', ')}, Button, buttonClasses, textFieldClasses, createOxygenTheme, pxToRem, styled, formatRelativeTime, debounce, amber];
        export type Used = [ButtonProps, TextFieldProps, OxygenThemeType, Theme];
      `;

      expect(installed.typeCheck(source, moduleResolution)).toEqual([]);
    });
  });
});
