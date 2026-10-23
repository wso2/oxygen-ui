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
import {
  ESLINT_PLUGIN_NAMESPACE,
  getEslintRules,
  getRecommendedEslintRules,
  rules as registry,
} from '@wso2/oxygen-ui-rules';

// The rules are defined in @wso2/oxygen-ui-rules, the single source of truth shared with the
// Oxygen UI analyzer and AI instructions. This plugin only exposes them to ESLint.
const plugin: ESLint.Plugin = {
  meta: {
    name: '@wso2/eslint-plugin-oxygen-ui',
    version: '0.0.1',
  },
  configs: {} as Record<string, Linter.Config>,
  rules: getEslintRules(registry),
};

// Recommended config. Uses the same plugin namespace as the README.
const recommendedConfig: Linter.Config = {
  plugins: {
    [ESLINT_PLUGIN_NAMESPACE]: plugin,
  },
  rules: getRecommendedEslintRules(registry, ESLINT_PLUGIN_NAMESPACE),
};

// Assign configs
if (plugin.configs) {
  plugin.configs.recommended = recommendedConfig;
}

export default plugin;
