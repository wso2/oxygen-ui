/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts');
const postcss = require('rollup-plugin-postcss');
const {terser} = require('rollup-plugin-terser');
const image = require('@rollup/plugin-image');

const pkg = require('./package.json');

/**
 * This method returns a method hat takes the id of a module as an argument and returns true if it should not be
 * included in the final bundle and returns false if it should be.
 *
 * @param {boolean} includeMaterialDeps - True if Material dependencies should be
 * included in the bundle; False otherwise.
 * @returns A method that takes the id of the module as an argument
 */
const shouldExclude = (includeMaterialDeps = false) => {
  const peerDeps = includeMaterialDeps
    ? Object.keys(pkg.peerDependencies || {}).filter(id => {
        return (
          !id.startsWith('@emotion/react') &&
          !id.startsWith('@emotion/styled') &&
          !id.startsWith('@mui/icons-material') &&
          !id.startsWith('@mui/lab') &&
          !id.startsWith('@mui/material') &&
          !id.startsWith('@mui/system') &&
          !id.startsWith('@mui/utils')
        );
      })
    : Object.keys(pkg.peerDependencies || {});

  const regExps = peerDeps.map(dep => new RegExp(`^${dep}(\\/\.+)*$`));
  return id => regExps.some(regExp => regExp.test(id));
};

module.exports = [
  {
    cache: false,
    input: 'src/index.ts',
    external: shouldExclude(),
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({tsconfig: './tsconfig.lib.json'}),
      postcss(),
      terser(),
      image(),
    ],
  },
  {
    cache: false,
    input: 'src/index.ts',
    external: shouldExclude(true),
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.lib.json' }),
      postcss(),
      terser(),
      image(),
    ],
  },
  {
    cache: false,
    external: [/\.s?css$/],
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts.default()],
  },
];
