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
import {defineConfig} from 'vitest/config';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig({
  define: {__RULESET_VERSION__: JSON.stringify(pkg.version)},
  plugins: [
    {
      // Mirrors the esbuild text loader, so rule docs import as strings in tests.
      name: 'oxygen-ui-rules-markdown',
      transform(code: string, id: string) {
        return id.endsWith('.md') ? {code: `export default ${JSON.stringify(code)};`, map: null} : null;
      },
    },
  ],
  test: {
    environment: 'node',
  },
});
