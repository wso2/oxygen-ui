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

import { readFileSync } from 'fs';
import esbuild from 'esbuild';
import { inlineCSSFontsPlugin } from '@wso2/esbuild-plugin-inline-css-fonts';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const shared = {
  entryPoints: [
    'src/index.ts',
    'src/data-grid.ts',
    'src/date-pickers.ts',
    'src/tree-view.ts',
    'src/date-pickers/AdapterDateFns.ts',
    'src/date-pickers/AdapterDateFnsJalali.ts',
    'src/date-pickers/AdapterDateFnsJalaliV2.ts',
    'src/date-pickers/AdapterDateFnsV2.ts',
    'src/date-pickers/AdapterDayjs.ts',
    'src/date-pickers/AdapterLuxon.ts',
    'src/date-pickers/AdapterMoment.ts',
    'src/date-pickers/AdapterMomentHijri.ts',
    'src/date-pickers/AdapterMomentJalaali.ts',
  ],
  platform: 'browser',
  outdir: 'dist',
  bundle: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  target: ['es2017'],
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

Promise.all([
  esbuild.build({
    ...shared,
    format: 'esm',
  }),
  esbuild.build({
    ...shared,
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  }),
]).catch((err) => {
  console.error(err);
  process.exit(1);
});
