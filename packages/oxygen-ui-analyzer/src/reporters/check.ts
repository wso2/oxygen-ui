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
import type {Finding, Report} from '../report/types.js';

const RANK: Record<RuleSeverity, number> = {info: 1, warning: 2, error: 3};

export interface CheckResult {
  passed: boolean;
  /** The lowest severity of new findings that fails the check. */
  failOn: RuleSeverity;
  /** Findings that are not in the baseline, or every finding when there is no baseline. */
  newFindings: Finding[];
  /** The new findings at or above `failOn`, which fail the check. */
  failing: Finding[];
  report: Report;
}

/**
 * Decides whether a project passes `check`: it fails when it has new findings at or above
 * `failOn`. Findings in the baseline, and findings covered by exceptions, never fail it.
 */
export function evaluateCheck(report: Report, failOn: RuleSeverity): CheckResult {
  const newFindings = report.findings.filter((finding) => finding.status !== 'baseline');
  const failing = newFindings.filter((finding) => RANK[finding.severity] >= RANK[failOn]);

  return {passed: failing.length === 0, failOn, newFindings, failing, report};
}

export interface CheckFormatOptions {
  color?: boolean;
}

/**
 * Formats a check result for a terminal: the failing findings, notices and a summary.
 */
export function formatCheck(result: CheckResult, options: CheckFormatOptions = {}): string {
  const paint = (code: string, text: string) => (options.color ? `\u001b[${code}m${text}\u001b[0m` : text);
  const plural = (count: number, word: string) => `${count} ${count === 1 ? word : `${word}s`}`;
  const {report} = result;
  const output = ['', `${paint('1', 'Oxygen UI check')} ${paint('2', `· ${report.project.name} · rules ${report.ruleset.version}`)}`, ''];

  for (const finding of result.failing) {
    output.push(`  ${finding.file}:${finding.line}:${finding.column}  ${paint(finding.severity === 'error' ? '31' : '33', finding.severity)}  ${finding.message}  ${paint('2', finding.ruleId)}`);
  }

  if (result.failing.length > 0) {
    output.push('');
  }

  for (const notice of report.notices) {
    output.push(paint(notice.level === 'warning' ? '33' : '2', `  ${notice.level === 'warning' ? 'Warning' : 'Note'}: ${notice.message}`));
  }

  if (report.notices.length > 0) {
    output.push('');
  }

  if (result.passed) {
    output.push(paint('32', `✓ No new findings at or above ${result.failOn} severity.`));
  } else {
    output.push(paint('31', `✖ ${plural(result.failing.length, 'new finding')} at or above ${result.failOn} severity.`));
  }

  const below = result.newFindings.length - result.failing.length;
  if (below > 0) {
    output.push(paint('2', `  ${plural(below, 'other new finding')} below ${result.failOn} severity ${below === 1 ? 'does' : 'do'} not fail the check.`));
  }

  if (report.baseline) {
    output.push(paint('2', `  ${plural(report.baseline.known, 'known finding')} in the baseline (${report.baseline.path}).`));

    if (report.baseline.fixed > 0) {
      output.push(
        paint('32', `  ${plural(report.baseline.fixed, 'baseline finding')} fixed. Run oxygen-ui-analyzer baseline --prune to record ${report.baseline.fixed === 1 ? 'it' : 'them'}.`),
      );
    }
  } else if (!result.passed) {
    output.push(paint('2', '  There is no baseline, so every finding counts as new. To adopt the rules in an existing project, record the current findings with oxygen-ui-analyzer baseline.'));
  }

  if (report.suppressed.length > 0) {
    output.push(paint('2', `  ${plural(report.suppressed.length, 'finding')} accepted by exceptions in the config.`));
  }

  if (report.errors.length > 0) {
    output.push(paint('35', `  ${plural(report.errors.length, 'file')} could not be analyzed: ${report.errors.map((error) => error.file).join(', ')}.`));
  }

  output.push('');

  return output.join('\n');
}

/** Formats a check result as JSON. */
export function formatCheckJson(result: CheckResult): string {
  const {passed, failOn, newFindings, failing, report} = result;

  return `${JSON.stringify(
    {
      passed,
      failOn,
      failing,
      newFindings: newFindings.length,
      baseline: report.baseline ?? null,
      suppressed: report.suppressed.length,
      notices: report.notices,
      errors: report.errors,
    },
    null,
    2,
  )}\n`;
}
