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
import { describe, expect, it } from 'vitest';
// @ts-expect-error The build scripts are plain JavaScript.
import { describeNameToPathMap } from '../../scripts/describeNameToPathMap.mjs';

/** A symbol as the derivation reads it: its flags, its declarations and, for an alias, the symbol it names. */
interface FakeSymbol {
  name: string;
  flags: number;
  declarations?: object[];
  aliasOf?: FakeSymbol;
}

const value = (name: string, declarations?: object[]): FakeSymbol => ({ name, flags: ts.SymbolFlags.Variable, declarations });
const type = (name: string, declarations?: object[]): FakeSymbol => ({ name, flags: ts.SymbolFlags.Interface, declarations });
const alias = (name: string, of: FakeSymbol): FakeSymbol => ({ name, flags: ts.SymbolFlags.Alias, aliasOf: of });

interface PublishedPath {
  name: string;
  exports: Map<string, FakeSymbol>;
  module?: string;
}

const describe_ = (
  published: PublishedPath[],
  barrel: FakeSymbol[],
  options: { modules?: Record<string, FakeSymbol>; materialRootFolders?: string[] } = {},
) =>
  describeNameToPathMap(published, barrel, {
    resolve: (symbol: FakeSymbol) => symbol.aliasOf ?? symbol,
    moduleSymbol: (file: string) => options.modules?.[file],
    foldersOfTheMaterialRoot: new Set(options.materialRootFolders ?? []),
  });

describe('describeNameToPathMap', () => {
  it('puts a component on its own path as the default export', () => {
    const button = value('Button');
    const map = describe_([{ name: 'Button', exports: new Map([['default', button], ['Button', button]]) }], [alias('Button', button)]);

    expect(map).toEqual({ Button: { path: '@wso2/oxygen-ui/Button', kind: 'default', typeOnly: false } });
  });

  it('names a value that is not the default export a named export of its path', () => {
    const button = value('Button');
    const classes = value('buttonClasses');
    const map = describe_(
      [{ name: 'Button', exports: new Map([['default', button], ['buttonClasses', classes]]) }],
      [alias('Button', button), alias('buttonClasses', classes)],
    );

    expect(map.buttonClasses).toEqual({ path: '@wso2/oxygen-ui/Button', kind: 'named', typeOnly: false });
  });

  it('keeps the default kind for another name that points at the default export, and the named kind when the path also exports it by that name', () => {
    const component = value('ColorSchemeToggle');
    const path = { name: 'ColorSchemeToggle', exports: new Map([['default', component]]) };

    expect(describe_([path], [alias('ColorSchemeToggleDefault', component)]).ColorSchemeToggleDefault.kind).toBe('default');

    const withNamedExport = { name: 'ColorSchemeToggle', exports: new Map([['default', component], ['ColorSchemeToggleDefault', component]]) };

    expect(describe_([withNamedExport], [alias('ColorSchemeToggleDefault', component)]).ColorSchemeToggleDefault.kind).toBe('named');
  });

  it('marks a name that only exists as a type as type-only', () => {
    const props = type('ButtonProps');
    const map = describe_([{ name: 'Button', exports: new Map([['ButtonProps', props]]) }], [alias('ButtonProps', props)]);

    expect(map.ButtonProps).toEqual({ path: '@wso2/oxygen-ui/Button', kind: 'named', typeOnly: true });
  });

  it('finds a type by its declarations when Material UI augmentation made two symbols of one interface', () => {
    const declaration = {};
    const onPath = type('PaletteOptions', [declaration]);
    const onBarrel = type('PaletteOptions', [declaration]);
    const map = describe_([{ name: 'styles', exports: new Map([['PaletteOptions', onPath]]) }], [onBarrel]);

    expect(map.PaletteOptions.path).toBe('@wso2/oxygen-ui/styles');
  });

  it('does not look past the symbol for a value, so a value on no path is an error', () => {
    const declaration = {};
    const onPath = value('thing', [declaration]);
    const onBarrel = value('thing', [declaration]);

    expect(() => describe_([{ name: 'styles', exports: new Map([['thing', onPath]]) }], [onBarrel])).toThrow(/On the barrel, and on no path: thing/);
  });

  describe('when more than one path exports the same symbol', () => {
    const shared = value('Fade');
    const exports = () => new Map([['Fade', shared]]);

    it('prefers the path named like the name', () => {
      const map = describe_(
        [{ name: 'transitions', exports: exports() }, { name: 'Fade', exports: exports() }],
        [alias('Fade', shared)],
      );

      expect(map.Fade.path).toBe('@wso2/oxygen-ui/Fade');
    });

    it('then prefers a folder the Material UI root re-exports', () => {
      const map = describe_(
        [{ name: 'internal', exports: exports() }, { name: 'transitions', exports: exports() }],
        [alias('Fade', shared)],
        { materialRootFolders: ['transitions'] },
      );

      expect(map.Fade.path).toBe('@wso2/oxygen-ui/transitions');
    });

    it('then takes the first path', () => {
      const map = describe_(
        [{ name: 'first', exports: exports() }, { name: 'second', exports: exports() }],
        [alias('Fade', shared)],
      );

      expect(map.Fade.path).toBe('@wso2/oxygen-ui/first');
    });
  });

  it('gives a whole module its path as a namespace, before any name match', () => {
    const grid = value('DataGrid');
    const dataGridModule = value('data-grid module');
    const map = describe_(
      [
        { name: 'data-grid', exports: new Map(), module: '@mui/x-data-grid' },
        { name: 'DataGrid', exports: new Map([['DataGrid', grid]]) },
      ],
      [alias('DataGrid', dataGridModule)],
      { modules: { '@mui/x-data-grid': dataGridModule } },
    );

    expect(map.DataGrid).toEqual({ path: '@wso2/oxygen-ui/data-grid', kind: 'namespace', typeOnly: false });
  });

  it('lists every name that is on the barrel and on no path', () => {
    expect(() => describe_([], [value('One'), value('Two')])).toThrow('On the barrel, and on no path: One, Two.');
  });

  it('sorts the map by name', () => {
    const a = value('a');
    const b = value('B');
    const published = [{ name: 'path', exports: new Map([['a', a], ['B', b]]) }];

    expect(Object.keys(describe_(published, [alias('b', b), alias('a', a)]))).toEqual(['a', 'b']);
  });
});
