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

import type {Linter, Rule} from 'eslint';
import type {RuleDefinition, RuleSeverity} from './types.js';

const ESLINT_SEVERITY: Record<RuleSeverity, Linter.RuleSeverity | null> = {
  error: 'error',
  warning: 'warn',
  // Informational findings are shown in reports, not as lint problems.
  info: null,
};

/**
 * Returns the ESLint rule modules for every automated rule, keyed by rule id.
 */
export function getEslintRules(rules: RuleDefinition[]): Record<string, Rule.RuleModule> {
  return Object.fromEntries(
    rules.filter((rule) => rule.detect).map((rule) => [rule.meta.id, rule.detect as Rule.RuleModule]),
  );
}

/**
 * Returns the recommended ESLint rule settings: every automated rule that is not advisory,
 * at its default severity, prefixed with the plugin namespace.
 */
export function getRecommendedEslintRules(rules: RuleDefinition[], namespace: string): Linter.RulesRecord {
  const settings: Linter.RulesRecord = {};

  for (const rule of rules) {
    const severity = ESLINT_SEVERITY[rule.meta.severity];

    if (rule.detect && rule.meta.level !== 'advisory' && severity) {
      settings[`${namespace}/${rule.meta.id}`] = severity;
    }
  }

  return settings;
}
