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

import type {
  RuleCategory,
  RuleEnforcement,
  RuleFixType,
  RuleLevel,
  RuleSeverity,
} from '@wso2/oxygen-ui-rules';

/**
 * Version of the report format. Increased only for changes that older readers cannot handle.
 * The JSON schema is in `schema/report.schema.json`.
 */
export const REPORT_SCHEMA_VERSION = 1;

/**
 * - `deterministic`: produced by an automated rule; the same code always gives the same finding.
 * - `judgement`: produced by a review, such as the AI audit; it needs confirming before it is fixed.
 */
export type FindingKind = 'deterministic' | 'judgement';

export type FindingConfidence = 'high' | 'medium' | 'low';

export interface FindingFix {
  /** How the rule says this kind of finding can be fixed. */
  type: RuleFixType;
  /** Whether an automatic fix exists for this specific finding. */
  available: boolean;
}

export interface Finding {
  /**
   * Stable identifier, derived from the rule, the file and the code involved rather than the
   * line number, so it survives unrelated edits. Baselines and fix plans refer to it.
   */
  id: string;
  ruleId: string;
  category: RuleCategory;
  severity: RuleSeverity;
  confidence: FindingConfidence;
  kind: FindingKind;
  /** Path relative to the project root, with forward slashes. */
  file: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  message: string;
  /** The source lines the finding points to. */
  evidence: string;
  fix: FindingFix;
}

/** A rule as it applied to this analysis, including its documentation for the report UI. */
export interface ReportRule {
  id: string;
  title: string;
  summary: string;
  category: RuleCategory;
  level: RuleLevel;
  severity: RuleSeverity;
  enforcement: RuleEnforcement;
  fix: RuleFixType;
  docs: string;
  findings: number;
}

/** A file that could not be analyzed, for example because it does not parse. */
export interface AnalysisError {
  file: string;
  message: string;
  line?: number;
}

export interface ReportSummary {
  filesAnalyzed: number;
  filesWithFindings: number;
  findings: number;
  bySeverity: Record<RuleSeverity, number>;
  byCategory: Partial<Record<RuleCategory, number>>;
}

export interface Report {
  schemaVersion: typeof REPORT_SCHEMA_VERSION;
  tool: {name: string; version: string};
  ruleset: {version: string};
  project: {name: string};
  /** ISO 8601 timestamp. */
  generatedAt: string;
  summary: ReportSummary;
  rules: ReportRule[];
  findings: Finding[];
  errors: AnalysisError[];
}
