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

const { readFileSync } = require('fs');
const esbuild = require('esbuild');
const inlineCss = require('esbuild-plugin-inline-css');

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

esbuild.build({
  entryPoints: [
    'src/index.ts',
    'src/styles/OxygenTheme/OxygenTheme.ts',
    'src/contexts/OxygenUIThemeProvider/OxygenUIThemeProvider.tsx',
    'src/components/ColorModeToggle/ColorModeToggle.tsx'
  ],
  platform: 'browser',
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  splitting: false,
  sourcemap: true,
  minify: false,
  target: ['es2017'],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  preserveSymlinks: true,
  plugins: [
    inlineCss()
  ]
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
