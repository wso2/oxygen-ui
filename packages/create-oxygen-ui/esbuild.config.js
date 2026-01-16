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

import esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  platform: 'node',
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  sourcemap: true,
  minify: false,
  target: ['node20'],
  banner: {
    js: '#!/usr/bin/env node',
  },
  external: [
    // Keep these external to reduce bundle size
    '@inquirer/prompts',
    'commander',
    'picocolors',
    'tar',
  ],
};

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(buildOptions).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
