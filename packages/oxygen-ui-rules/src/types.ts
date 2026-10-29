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
  /** The detector's message id for the finding. Required for examples with `suggestions`. */
  messageId?: string;
  /** The code after `safe` fixes. `null` when the rule reports but does not fix the example. */
  output?: string | null;
  /**
   * The suggested fixes for the example's finding, which change more than an automatic fix and need
   * review. An empty list means the rule makes no suggestion. Only for examples with one finding.
   */
  suggestions?: RuleSuggestionExample[];
}

export interface RuleSuggestionExample {
  /** The suggestion's description, as shown to developers. */
  description: string;
  /** The code after applying the suggestion. */
  output: string;
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

/**
 * What kind of public API a catalog entry describes.
 */
export type CatalogKind = 'component' | 'layout' | 'provider' | 'hook' | 'theme' | 'utility' | 'animation';

/**
 * An Oxygen UI component, hook, theme or utility that products are expected to use. Every value
 * that `@wso2/oxygen-ui` exports itself must belong to exactly one entry, or be waived, so that
 * new exports are not added without deciding how they are governed.
 */
export interface CatalogComponent {
  /** Catalog name. Usually the main export. Rules refer to it with `{type: 'component', name}`. */
  name: string;
  kind: CatalogKind;
  /** Every export of `@wso2/oxygen-ui` that belongs to this entry. */
  exports: string[];
  /** What the entry is for, in one sentence. */
  summary: string;
  /** Storybook title of its documentation, such as `App Elements/Page Title`. */
  story?: string;
}

/**
 * A publishable package of the Oxygen UI repository and how products should use it.
 * Rules refer to it with `{type: 'package', name}`.
 */
export interface CatalogPackage {
  name: string;
  summary: string;
  /** How products are expected to import or depend on the package. */
  usage: string;
}

/**
 * A usage guide in the Oxygen UI Storybook. Rules extracted from it refer to it with
 * `{type: 'guide', id}`.
 */
export interface CatalogGuide {
  /** The Storybook title, such as `Guides/Choosing a Table`. */
  id: string;
  summary: string;
}

/**
 * An Oxygen UI export that is deliberately not in the catalog, with the reason.
 */
export interface CatalogWaiver {
  export: string;
  reason: string;
}
