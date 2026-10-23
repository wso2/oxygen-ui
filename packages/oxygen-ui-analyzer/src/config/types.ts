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

import type {RuleSeverity} from '@wso2/oxygen-ui-rules';

/** A rule's severity in a product, or `off` to not check it. */
export type RuleSettingSeverity = RuleSeverity | 'off';

/**
 * How a product applies a rule: a severity, or a severity with the rule's options, such as
 * `{severity: 'error', options: {allowedPackages: ['@mui/x-date-pickers/AdapterDayjs']}}`.
 */
export type RuleSetting = RuleSettingSeverity | {severity?: RuleSettingSeverity; options?: Record<string, unknown>};

/**
 * Findings a product accepts on purpose. Every exception needs a reason, so that reviewers can
 * judge it, and can have an expiry date, after which its findings are reported again.
 */
export interface ExceptionConfig {
  /** The rule the exception is for. */
  rule: string;
  /** Glob patterns of the files it covers, relative to the project root. */
  files: string[];
  reason: string;
  /** Last day the exception applies, as YYYY-MM-DD. */
  expires?: string;
}

/**
 * The product-owned analyzer configuration, in `oxygen-ui-analyzer.config.js` (or `.mjs`, `.cjs`
 * or `.json`) at the project root. The analyzer never changes this file.
 */
export interface AnalyzerConfig {
  /** Files to analyze, relative to the project root. */
  include?: string[];
  /** Files to skip, in addition to the defaults (dependencies, build output and tests). */
  ignore?: string[];
  /** Severity and options per rule id. Rules that are not listed use their defaults. */
  rules?: Record<string, RuleSetting>;
  exceptions?: ExceptionConfig[];
  /** The baseline file, relative to the project root. Defaults to `.oxygen-ui/baseline.json`. */
  baseline?: string;
  /** The lowest severity of new findings that fails `check`. Defaults to `error`. */
  failOn?: RuleSeverity;
  /** Commands that `fix --apply` runs after writing changes, such as `pnpm typecheck`. */
  verify?: string[];
}

/** The configuration with defaults applied, as the analyzer uses it. */
export interface ResolvedConfig {
  /** The config file, or `null` if the project has none. */
  path: string | null;
  include?: string[];
  ignore: string[];
  rules: Record<string, {severity?: RuleSettingSeverity; options?: Record<string, unknown>}>;
  exceptions: ExceptionConfig[];
  baseline: string;
  failOn: RuleSeverity;
  verify: string[];
}
