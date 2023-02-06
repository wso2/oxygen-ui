/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

const {babel} = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  external: ['react'],
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.esm.js`,
      format: 'esm',
      name: 'oxygen-icons-react',
    },
    {
      file: `dist/index.umd.js`,
      format: 'umd',
      globals: {
        react: 'React',
      },
      name: 'oxygen-icons-react',
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],

    }),
    commonjs(),
  ],
};
