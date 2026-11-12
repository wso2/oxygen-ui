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
import path from 'node:path';
import { rolldown, watch } from 'rolldown';
import esbuild from 'esbuild';
import { inlineCSSFontsPlugin } from '@wso2/esbuild-plugin-inline-css-fonts';

const manifest = JSON.parse(readFileSync('./package.json', 'utf8'));
const dependencyNames = [...Object.keys(manifest.dependencies ?? {}), ...Object.keys(manifest.peerDependencies ?? {})];
const escapeForRegExp = name => name.replace(/[/@.]/g, '\\$&');
const external = new RegExp(`^(${dependencyNames.map(escapeForRegExp).join('|')})($|/)`);

const sourceRoot = path.resolve('src');

const fontStylesheets = [path.join(sourceRoot, 'fonts.css'), path.join(sourceRoot, 'fonts-sora.css')];

/**
 * A font stylesheet becomes a JavaScript module that injects it. The module needs a `.js` id and
 * `moduleSideEffects`: under a `.css` id rolldown loses the import, and without the flag it drops the module.
 */
const fontStylesheetsAsInjectionModules = {
  name: 'font-stylesheets-as-injection-modules',
  resolveId(source, importer) {
    if (!source.endsWith('.css') || !importer) return null;

    const stylesheet = path.resolve(path.dirname(importer), source);
    if (!fontStylesheets.includes(stylesheet)) {
      throw new Error(`${importer} imports ${source}, and only the font stylesheets are built to a module.`);
    }

    return { id: stylesheet.replace(/\.css$/, '.js'), moduleSideEffects: true };
  },
  async load(id) {
    if (!fontStylesheets.includes(id.replace(/\.js$/, '.css'))) return null;

    const { outputFiles } = await esbuild.build({
      entryPoints: [id.replace(/\.js$/, '.css')],
      bundle: true,
      write: false,
      format: 'esm',
      logLevel: 'silent',
      plugins: [inlineCSSFontsPlugin({ styleAttribute: 'data-oxygen-fonts' })],
    });

    return { code: outputFiles[0].text, moduleType: 'js', moduleSideEffects: true };
  },
};

const options = {
  input: 'src/index.ts',
  platform: 'browser',
  external,
  plugins: [fontStylesheetsAsInjectionModules],
  transform: { target: 'es2017', jsx: { runtime: 'automatic' } },
  treeshake: { moduleSideEffects: true },
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
  },
};

if (process.argv.includes('--watch')) {
  watch(options);
} else {
  const bundle = await rolldown(options);

  await bundle.write(options.output);
  await bundle.close();
}
