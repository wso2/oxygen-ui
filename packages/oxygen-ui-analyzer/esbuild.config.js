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

import {copyFileSync, mkdirSync, readFileSync} from 'fs';
import {createRequire} from 'module';
import {dirname, join} from 'path';
import {build} from 'esbuild';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

await build({
  entryPoints: ['src/index.ts', 'src/cli.ts'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  format: 'esm',
  target: ['node24'],
  platform: 'node',
  // The rules are bundled; ESLint and the TypeScript parser are installed as dependencies.
  external: ['eslint', '@typescript-eslint/parser', 'typescript'],
  define: {__ANALYZER_VERSION__: JSON.stringify(pkg.version)},
  logLevel: 'info',
});

// The report UI: a React app built with Oxygen UI, bundled into one script that the report HTML
// inlines, so a built report is a single file that opens without a server.
await build({
  entryPoints: ['ui/main.tsx'],
  outfile: 'dist/ui/app.js',
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  define: {'process.env.NODE_ENV': JSON.stringify('production')},
  logLevel: 'info',
});

// Oxygen UI icons ship their stroke styles as a separate stylesheet.
const require = createRequire(import.meta.url);
mkdirSync('dist/ui', {recursive: true});
copyFileSync(join(dirname(require.resolve('@wso2/oxygen-ui-icons-react')), 'index.css'), 'dist/ui/app.css');

console.log('✅ Build completed');
