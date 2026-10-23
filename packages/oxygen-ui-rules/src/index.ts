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

import rules from './rules/index.js';
import type {RuleDefinition} from './types.js';

export type * from './types.js';
export {default as defineRule} from './defineRule.js';
export {getEslintRules, getRecommendedEslintRules} from './eslint.js';
export {rules};
export * as catalog from './catalog/index.js';

/**
 * The version of this rule set. Reports and installed AI assets record it.
 */
export const rulesetVersion: string = __RULESET_VERSION__;

/**
 * The ESLint plugin namespace the rules are registered under, as in
 * `'@wso2/oxygen-ui/no-direct-mui-imports'`. Products use it in disable comments.
 */
export const ESLINT_PLUGIN_NAMESPACE = '@wso2/oxygen-ui';

/**
 * Returns the rule with the given id, or `undefined` if there is none.
 */
export function getRule(id: string): RuleDefinition | undefined {
  return rules.find((rule) => rule.meta.id === id);
}
