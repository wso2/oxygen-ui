/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import { readdirSync, readFileSync } from 'fs';
import esbuild from 'esbuild';
import { inlineCSSFontsPlugin } from '@wso2/esbuild-plugin-inline-css-fonts';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// Real subpath entries (wso2/oxygen-ui#582): every top-level src/*.ts besides
// the barrel and tests becomes dist/<Name>.js + dist/<Name>.cjs, so the
// `"./*": "./dist/*"` exports map resolves without the Vite plugin alias.
const entryPoints = readdirSync('./src')
  .filter((name) => name.endsWith('.ts') && !name.endsWith('.test.ts'))
  .map((name) => `src/${name}`);

const shared = {
  entryPoints,
  platform: 'browser',
  outdir: 'dist',
  bundle: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  target: ['es2017'],
  allowOverwrite: true,
  plugins: [
    inlineCSSFontsPlugin({
      styleAttribute: 'data-oxygen-fonts'
    })
  ],
  loader: {
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
    '.json': 'json',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  preserveSymlinks: true,
};

try {
  await esbuild.build({
    ...shared,
    format: 'esm',
    outExtension: { '.js': '.js' },
  });

  await esbuild.build({
    ...shared,
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
