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

import type {ESLint, Linter} from 'eslint';
import noDirectMuiImportsRule from './rules/no-direct-mui-imports.js';
import noDirectLucideImportsRule from './rules/no-direct-lucide-imports.js';

const plugin: ESLint.Plugin = {
  meta: {
    name: '@wso2/eslint-plugin-oxygen-ui',
    version: '0.0.1',
  },
  configs: {} as Record<string, Linter.Config>,
  rules: {
    'no-direct-mui-imports': noDirectMuiImportsRule,
    'no-direct-lucide-imports': noDirectLucideImportsRule,
  },
};

// Recommended config. Uses the same plugin namespace as the README, and the
// rule defaults, which point to @wso2/oxygen-ui and @wso2/oxygen-ui-icons-react.
const recommendedConfig: Linter.Config = {
  plugins: {
    '@wso2/oxygen-ui': plugin,
  },
  rules: {
    '@wso2/oxygen-ui/no-direct-mui-imports': 'error',
    '@wso2/oxygen-ui/no-direct-lucide-imports': 'error',
  },
};

// Assign configs
if (plugin.configs) {
  plugin.configs.recommended = recommendedConfig;
}

export default plugin;
