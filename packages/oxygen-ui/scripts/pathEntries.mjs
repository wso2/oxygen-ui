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

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import ts from 'typescript';
import { parsePathMap } from '@wso2/oxygen-ui-path-map';
import { describeNameToPathMap, isTypeOnly } from './describeNameToPathMap.mjs';

const sourceRoot = path.resolve('src');
const publishedFolder = 'paths';
const materialPackage = '@mui/material';

/** Components that live inside another component's folder but are public in their own right. */
const componentsBesideTheirFolder = ['SearchBar/SearchBarWithAdvancedFilter'];

/** `esm` is Material UI's build output, not a path. */
const materialFoldersWithoutAMaterialPath = ['esm'];

/** A lower-case path passes a whole MUI X package through by name; PascalCase paths name one component. */
const muiXPackages = [
  { name: 'data-grid', specifier: '@mui/x-data-grid' },
  { name: 'date-pickers', specifier: '@mui/x-date-pickers' },
  { name: 'tree-view', specifier: '@mui/x-tree-view' },
];

const dateAdapterFolderExcludingBases = /^Adapter(?!.*Base$)/;

/** What an Oxygen path carries besides what its module exports: a default export that the barrel names, and types. */
const additionsToOxygenPaths = {
  OxygenUIThemeProvider: [{ from: '@emotion/cache', defaultNamed: 'createEmotionCache', names: ['EmotionCache'] }],
};

/** What Oxygen adds to the Material UI path of the same name: where it is defined, and the names. */
const oxygenAdditionsToMaterialPaths = {
  styles: [
    { moduleId: 'utils/createOxygenTheme', names: ['createOxygenTheme'] },
    { moduleId: 'utils/pxToRem', names: ['pxToRem'] },
    { moduleId: 'styles/index', names: ['OxygenThemeType'] },
  ],
  utils: [{ moduleId: 'utils/formatRelativeTime', names: ['formatRelativeTime'] }],
};

/**
 * Names the Material UI root exports and no Material UI path does. They come from the root, because
 * the copy of `@mui/utils` that Material UI uses may not be the copy this package resolves.
 */
const materialRootNamesOnTheUtilsPath = ['unstable_composeClasses'];

const sourceFileOf = moduleId => {
  const file = ['.ts', '.tsx'].map(extension => path.join(sourceRoot, moduleId + extension)).find(existsSync);

  if (!file) throw new Error(`No source file for the module ${moduleId}.`);

  return file;
};

const foldersWithAnIndex = root =>
  readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && existsSync(path.join(root, entry.name, 'index.ts')))
    .map(entry => entry.name);

const pathsOfFolders = folder =>
  foldersWithAnIndex(path.join(sourceRoot, folder)).map(name => ({ name, moduleId: `${folder}/${name}/index` }));

/** A theme has a path named after its barrel name, and the module that the theme index takes it from. */
function describeThemePaths() {
  const index = path.join(sourceRoot, 'styles/Themes/index.ts');
  const source = ts.createSourceFile(index, readFileSync(index, 'utf8'), ts.ScriptTarget.Latest);

  return source.statements.filter(ts.isExportDeclaration).flatMap(statement =>
    statement.exportClause.elements
      .filter(element => element.propertyName?.text === 'default')
      .map(element => ({ name: element.name.text, moduleId: `styles/Themes/${statement.moduleSpecifier.text.replace('./', '')}` })),
  );
}

/**
 * One path per Oxygen component, hook, context and animation folder, named after the folder, so a new one
 * gets its path when its folder appears. A path is the folder's index, so it carries everything the index exports.
 */
function describeOxygenPaths() {
  const beside = componentsBesideTheirFolder.map(moduleId => ({
    name: path.basename(moduleId),
    moduleId: `components/${moduleId}`,
  }));

  return [
    ...pathsOfFolders('components'),
    ...beside,
    ...pathsOfFolders('hooks'),
    ...pathsOfFolders('contexts'),
    ...pathsOfFolders('animations'),
    ...describeThemePaths(),
    { name: 'Layout', moduleId: 'layouts/index' },
    { name: 'version', moduleId: 'version' },
  ].map(oxygenPath => ({ ...oxygenPath, source: sourceFileOf(oxygenPath.moduleId) }));
}

/** One path per Material UI path that has an index, discovered from the installed Material UI. */
function describeMaterialPaths(oxygenPaths) {
  const materialRoot = path.dirname(createRequire(import.meta.url).resolve(`${materialPackage}/package.json`));
  const oxygenNames = new Set(oxygenPaths.map(oxygenPath => oxygenPath.name));

  return readdirSync(materialRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && existsSync(path.join(materialRoot, entry.name, 'index.d.ts')))
    .map(entry => entry.name)
    .filter(name => !materialFoldersWithoutAMaterialPath.includes(name))
    .map(name => ({ name, specifier: `${materialPackage}/${name}`, replacedByOxygen: oxygenNames.has(name) }));
}

/** One path under `date-pickers` for each first-party date adapter, discovered from the installed date pickers. */
function describeDateAdapterPaths() {
  const pickersRoot = path.dirname(createRequire(import.meta.url).resolve('@mui/x-date-pickers/package.json'));

  return readdirSync(pickersRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && dateAdapterFolderExcludingBases.test(entry.name) && existsSync(path.join(pickersRoot, entry.name, 'index.d.ts')))
    .map(entry => ({ name: `date-pickers/${entry.name}`, specifier: `@mui/x-date-pickers/${entry.name}` }));
}

function openProgram(rootFiles, barrelModule) {
  const config = ts.getParsedCommandLineOfConfigFile('tsconfig.json', {}, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: diagnostic => {
      throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    },
  });
  const resolveSpecifier = specifier => {
    const { resolvedModule } = ts.resolveModuleName(specifier, barrelModule, config.options, ts.sys);

    if (!resolvedModule) throw new Error(`${specifier} does not resolve from the barrel.`);

    return resolvedModule.resolvedFileName;
  };
  const sourceOf = fileOrSpecifier => (path.isAbsolute(fileOrSpecifier) ? fileOrSpecifier : resolveSpecifier(fileOrSpecifier));
  const program = ts.createProgram(rootFiles.map(sourceOf), config.options);
  const checker = program.getTypeChecker();
  const moduleSymbol = file => checker.getSymbolAtLocation(program.getSourceFile(sourceOf(file)));

  /** The first path segment of every relative module that a file re-exports from. */
  const reexportedFolders = file =>
    new Set(
      program
        .getSourceFile(sourceOf(file))
        .statements.filter(statement => ts.isExportDeclaration(statement) && statement.moduleSpecifier)
        .map(statement => statement.moduleSpecifier.text.match(/^\.\/([^/]+)/)?.[1])
        .filter(Boolean),
    );

  return {
    moduleSymbol,
    reexportedFolders,
    exportsOf: file => checker.getExportsOfModule(moduleSymbol(file)),
    resolve: symbol => (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol),
  };
}

/**
 * An export clause is one line of a path entry. A name that only exists as a type is left out of the
 * JavaScript entry, and written with `type` in the declaration entry.
 */
const renderEntry = (clauses, { declaration }) =>
  clauses
    .flatMap(({ from, star, defaultAs, defaultNamed, names = [] }) => {
      const lines = [];

      if (star) lines.push(`export * from '${from}';`);
      if (defaultAs === 'default') lines.push(`export { default } from '${from}';`);
      else if (defaultAs) lines.push(`export { ${defaultAs} as default } from '${from}';`);
      if (defaultNamed) lines.push(`export { default as ${defaultNamed} } from '${from}';`);

      const values = names.filter(name => !name.typeOnly).map(name => name.name);
      const types = names.filter(name => name.typeOnly).map(name => name.name);

      if (values.length) lines.push(`export { ${values.join(', ')} } from '${from}';`);
      if (declaration && types.length) lines.push(`export type { ${types.join(', ')} } from '${from}';`);

      return lines;
    })
    .join('\n') + '\n';

/** A path has the component as its default export: the index's own default, or else the name equal to the folder. */
function defaultExportOf(component, exportNames) {
  if (exportNames.has('default')) return 'default';
  if (exportNames.has(component.name)) return component.name;

  throw new Error(`${component.name} exports neither a default nor a name equal to its folder.`);
}

export function describePathEntries() {
  const barrelModule = path.join(sourceRoot, 'index.ts');
  const oxygen = describeOxygenPaths();
  const materials = describeMaterialPaths(oxygen);
  const additionModules = Object.values(oxygenAdditionsToMaterialPaths).flat().map(({ moduleId }) => sourceFileOf(moduleId));
  const muiX = [...muiXPackages, ...describeDateAdapterPaths()];
  const program = openProgram(
    [
      barrelModule,
      ...oxygen.map(oxygenPath => oxygenPath.source),
      ...materials.map(material => material.specifier),
      ...muiX.map(({ specifier }) => specifier),
      materialPackage,
      ...Object.values(additionsToOxygenPaths).flat().map(({ from }) => from),
      ...additionModules,
    ],
    barrelModule,
  );
  const { exportsOf, resolve } = program;
  const exportsByName = file => new Map(exportsOf(file).map(symbol => [symbol.name, resolve(symbol)]));
  const oxygenExports = new Map(oxygen.map(oxygenPath => [oxygenPath.name, exportsByName(oxygenPath.source)]));
  const namesOxygenDefines = new Set([...oxygenExports.values()].flatMap(exports => [...exports.keys()]));
  const materialByName = new Map(materials.map(material => [material.name, material]));

  const oxygenPaths = oxygen.map(oxygenPath => {
    const exports = oxygenExports.get(oxygenPath.name);
    const clauses = [{ from: `../${oxygenPath.moduleId}.js`, star: true, defaultAs: defaultExportOf(oxygenPath, exports) }];

    for (const { from, defaultNamed, names } of additionsToOxygenPaths[oxygenPath.name] ?? []) {
      const added = exportsByName(from);

      clauses.push({ from, defaultNamed, names: names.map(name => ({ name, typeOnly: isTypeOnly(added.get(name)) })) });
      exports.set(defaultNamed, added.get('default'));
      for (const name of names) exports.set(name, added.get(name));
    }

    const material = materialByName.get(oxygenPath.name);

    if (material) {
      // Oxygen replaces these Material UI names on the barrel, so the Material UI names it leaves stay with the Oxygen path.
      const materialExports = exportsByName(material.specifier);
      const extras = [...materialExports]
        .filter(([name]) => name !== 'default' && !namesOxygenDefines.has(name))
        .map(([name, target]) => ({ name, typeOnly: isTypeOnly(target) }));

      clauses.push({ from: material.specifier, names: extras });
      for (const extra of extras) exports.set(extra.name, materialExports.get(extra.name));
    }

    return { name: oxygenPath.name, clauses, exports };
  });

  const materialPaths = materials
    .filter(material => !material.replacedByOxygen)
    .map(material => {
      const exports = exportsByName(material.specifier);
      const clauses = [{ from: material.specifier, star: true, defaultAs: exports.has('default') ? 'default' : null }];

      for (const { moduleId, names } of oxygenAdditionsToMaterialPaths[material.name] ?? []) {
        const source = sourceFileOf(moduleId);
        const sourceExports = exportsByName(source);
        const added = names.map(name => ({ name, typeOnly: isTypeOnly(sourceExports.get(name)) }));

        clauses.push({ from: `../${moduleId}.js`, names: added });
        for (const { name } of added) exports.set(name, sourceExports.get(name));
      }

      if (material.name === 'utils') {
        const rootExports = exportsByName(materialPackage);

        clauses.push({
          from: materialPackage,
          names: materialRootNamesOnTheUtilsPath.map(name => ({ name, typeOnly: isTypeOnly(rootExports.get(name)) })),
        });
        for (const name of materialRootNamesOnTheUtilsPath) exports.set(name, rootExports.get(name));
      }

      return { name: material.name, clauses, exports, module: material.specifier };
    });

  const muiXPaths = muiX.map(({ name, specifier }) => {
    const exports = exportsByName(specifier);

    return { name, clauses: [{ from: specifier, star: true }], exports, module: specifier };
  });

  const published = [...oxygenPaths, ...materialPaths, ...muiXPaths];

  return {
    sources: oxygen.map(oxygenPath => oxygenPath.source),
    paths: published.map(entry => ({
      name: entry.name,
      javascript: renderEntry(entry.clauses, { declaration: false }),
      declaration: renderEntry(entry.clauses, { declaration: true }),
    })),
    nameToPathMap: describeNameToPathMap(published, exportsOf(barrelModule), {
      resolve: program.resolve,
      moduleSymbol: program.moduleSymbol,
      foldersOfTheMaterialRoot: program.reexportedFolders(materialPackage),
    }),
  };
}

export function writePathEntries({ paths, nameToPathMap }) {
  const distribution = path.resolve('dist');
  const folder = path.join(distribution, publishedFolder);
  const pathMapText = `${JSON.stringify(nameToPathMap, null, 2)}\n`;
  const checked = parsePathMap(pathMapText);

  // Checked before anything is written, with the same function the codemod and the lint rule read it with.
  if ('reason' in checked) throw new Error(`The path map this build produced fails the check its readers apply: ${checked.reason}.`);

  mkdirSync(folder, { recursive: true });

  for (const entry of paths) {
    mkdirSync(path.dirname(path.join(folder, entry.name)), { recursive: true });
    writeFileSync(path.join(folder, `${entry.name}.js`), entry.javascript);
    writeFileSync(path.join(folder, `${entry.name}.d.ts`), entry.declaration);
  }

  writeFileSync(path.join(distribution, 'path-map.json'), pathMapText);
}
