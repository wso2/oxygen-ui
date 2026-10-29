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

export interface TerminalFormatOptions {
  /** Whether to use ANSI colours. */
  color?: boolean;
}

const SEVERITY_COLOR: Record<RuleSeverity, string> = {
  error: '31',
  warning: '33',
  info: '36',
};

/**
 * Formats a report for a terminal: findings grouped by file, then a summary.
 */
export function formatTerminal(report: Report, options: TerminalFormatOptions = {}): string {
  const paint = (code: string, text: string): string => (options.color ? `\u001b[${code}m${text}\u001b[0m` : text);
  const output: string[] = [];

  output.push('');
  output.push(`${paint('1', 'Oxygen UI analysis')} ${paint('2', `· ${report.project.name} · rules ${report.ruleset.version}`)}`);
  output.push('');

  const byFile = new Map<string, Finding[]>();
  for (const finding of report.findings) {
    byFile.set(finding.file, [...(byFile.get(finding.file) ?? []), finding]);
  }

  for (const [file, findings] of byFile) {
    output.push(paint('4', file));

    for (const finding of findings) {
      const position = `${finding.line}:${finding.column}`.padEnd(8);
      const severity = paint(SEVERITY_COLOR[finding.severity], finding.severity.padEnd(8));
      const fix = finding.fix.available ? paint('32', ' [fixable]') : '';

      output.push(`  ${paint('2', position)}${severity}${finding.message}  ${paint('2', finding.ruleId)}${fix}`);
    }

    output.push('');
  }

  for (const error of report.errors) {
    output.push(`${paint('4', error.file)}`);
    output.push(`  ${paint('2', `${error.line ?? ''}`.padEnd(8))}${paint('35', 'skipped ')}${error.message}`);
    output.push('');
  }

  const {summary} = report;
  const fixable = report.findings.filter((finding) => finding.fix.available).length;

  if (summary.findings === 0) {
    output.push(paint('32', `✓ No findings in ${summary.filesAnalyzed} ${plural(summary.filesAnalyzed, 'file')}`));
  } else {
    const counts = (['error', 'warning', 'info'] as const)
      .filter((severity) => summary.bySeverity[severity] > 0)
      .map((severity) => `${summary.bySeverity[severity]} ${plural(summary.bySeverity[severity], severity)}`)
      .join(', ');

    output.push(
      paint(
        summary.bySeverity.error > 0 ? '31' : '33',
        `✖ ${summary.findings} ${plural(summary.findings, 'finding')} in ${summary.filesWithFindings} of ${summary.filesAnalyzed} ${plural(summary.filesAnalyzed, 'file')} (${counts})`,
      ),
    );

    if (fixable > 0) {
      output.push(paint('2', `  ${fixable} ${plural(fixable, 'finding')} can be fixed automatically.`));
    }
  }

  if (report.errors.length > 0) {
    output.push(
      paint('35', `  ${report.errors.length} ${plural(report.errors.length, 'file')} could not be analyzed.`),
    );
  }

  output.push('');

  return output.join('\n');
}

function plural(count: number, word: string): string {
  return count === 1 ? word : `${word}s`;
}
