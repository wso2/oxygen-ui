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

import {existsSync, writeFileSync} from 'fs';
import {join} from 'path';
import {CONFIG_FILES, DEFAULT_BASELINE} from './load.js';

export const CONFIG_TEMPLATE = `/**
 * Oxygen UI analyzer configuration. This file belongs to the product: the analyzer reads it but
 * never changes it. See https://github.com/wso2/oxygen-ui/tree/main/packages/oxygen-ui-analyzer.
 *
 * @type {import('@wso2/oxygen-ui-analyzer').AnalyzerConfig}
 */
export default {
  // Files to analyze. By default, all JavaScript and TypeScript files except dependencies,
  // build output and tests.
  // include: ['src/**/*.{ts,tsx}'],

  // Files to skip, in addition to the defaults.
  ignore: [],

  // Severity ('error', 'warning', 'info' or 'off') or {severity, options} per rule id.
  rules: {},

  // Findings the product accepts on purpose. Each needs a reason, and can expire.
  exceptions: [
    // {
    //   rule: 'no-direct-mui-imports',
    //   files: ['src/legacy/**'],
    //   reason: 'Legacy pages, replaced in the 2027 redesign.',
    //   expires: '2027-06-30',
    // },
  ],

  // The lowest severity of new findings that fails \`oxygen-ui-analyzer check\`.
  failOn: 'error',

  // Commands that \`oxygen-ui-analyzer fix --apply\` runs to check its changes.
  verify: [],

  // Findings recorded with \`oxygen-ui-analyzer baseline\`, which \`check\` does not fail on.
  baseline: '${DEFAULT_BASELINE}',
};
`;

/**
 * Writes the config file template. Returns the path, or `null` if the project already has a config
 * file, which is never overwritten.
 */
export function initConfig(root: string): {created: string | null; existing: string | null} {
  const existing = CONFIG_FILES.map((file) => join(root, file)).find((file) => existsSync(file)) ?? null;

  if (existing) {
    return {created: null, existing};
  }

  const path = join(root, CONFIG_FILES[0]);
  writeFileSync(path, CONFIG_TEMPLATE);

  return {created: path, existing: null};
}
