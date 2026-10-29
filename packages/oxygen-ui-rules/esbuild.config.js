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

import {readFileSync} from 'fs';
import {build} from 'esbuild';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  target: ['esnext'],
  platform: 'node',
  external: ['eslint'],
  // Rule docs are authored as Markdown next to each rule and bundled as strings.
  loader: {'.md': 'text'},
  define: {__RULESET_VERSION__: JSON.stringify(pkg.version)},
  logLevel: 'info',
};

await build({...shared, outfile: 'dist/index.js', format: 'esm'});
await build({...shared, outfile: 'dist/index.cjs', format: 'cjs'});

console.log('✅ Build completed');
