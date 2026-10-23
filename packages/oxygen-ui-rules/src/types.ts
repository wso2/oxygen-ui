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

import type {Rule} from 'eslint';

/**
 * What area of UI consistency a rule governs. Used to group findings in reports.
 */
export type RuleCategory =
  | 'imports'
  | 'styling'
  | 'components'
  | 'patterns'
  | 'accessibility'
  | 'testability'
  | 'content';

/**
 * How strongly products are expected to follow a rule.
 * - `mandatory`: products must follow it, unless they record an exception.
 * - `recommended`: products should follow it; deviations are reviewed.
 * - `advisory`: guidance only; never fails a check.
 */
export type RuleLevel = 'mandatory' | 'recommended' | 'advisory';

/**
 * Default severity of a finding. Products can override it in their config.
 */
export type RuleSeverity = 'error' | 'warning' | 'info';

/**
 * How a rule is checked.
 * - `automated`: the rule has a `detect` implementation, and its findings are deterministic.
 * - `judgement`: the rule needs UX review; findings come from the AI audit and need confirming.
 */
export type RuleEnforcement = 'automated' | 'judgement';

/**
 * How a finding can be fixed.
 * - `safe`: a mechanical change that cannot alter behaviour; `fix` applies it.
 * - `suggestion`: usually right, but a developer should confirm it.
 * - `ai`: needs judgement or several files; handled by the remediation skill.
 * - `manual`: only a person can decide.
 */
export type RuleFixType = 'safe' | 'suggestion' | 'ai' | 'manual';

/**
 * Where a rule comes from. Rules point back to the Oxygen UI component, package or guide
 * they enforce, and to the product code they were extracted from.
 */
export type RuleSource =
  | {type: 'component'; name: string}
  | {type: 'package'; name: string}
  | {type: 'guide'; id: string}
  | {type: 'product'; product: string; reference?: string};

export interface RuleMeta {
  /** Stable kebab-case identifier. Also the ESLint rule name, without the plugin prefix. */
  id: string;
  /** Short sentence-case title. */
  title: string;
  /** One sentence describing what the rule requires. */
  summary: string;
  category: RuleCategory;
  level: RuleLevel;
  severity: RuleSeverity;
  enforcement: RuleEnforcement;
  fix: RuleFixType;
  sources: RuleSource[];
  /** The `@wso2/oxygen-ui-rules` version that introduced the rule. */
  since: string;
}

export interface RuleExample {
  /** What the example shows. */
  title: string;
  code: string;
  /** File name to lint the example as. Defaults to `example.tsx`. */
  filename?: string;
}

export interface InvalidRuleExample extends RuleExample {
  /** Number of findings the example produces. Required for automated rules. */
  errors?: number;
  /** The code after `safe` fixes. `null` when the rule reports but does not fix the example. */
  output?: string | null;
}

export interface RuleExamples {
  valid: RuleExample[];
  invalid: InvalidRuleExample[];
}

export interface RuleDefinition {
  meta: RuleMeta;
  /** Markdown: why the rule exists, its impact, how to fix it, and allowed exceptions. */
  docs: string;
  examples: RuleExamples;
  /** The automated check, as an ESLint rule. Present only for `automated` rules. */
  detect?: Rule.RuleModule;
}
