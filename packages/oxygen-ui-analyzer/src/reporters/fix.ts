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

import type {FixPlan, FixResult} from '../fix/fix.js';
import type {Finding} from '../report/types.js';

export interface FixFormatOptions {
  /** Whether to use ANSI colours. */
  color?: boolean;
  /** Whether the plan is about to be applied, rather than only previewed. */
  applying?: boolean;
}

type Paint = (code: string, text: string) => string;

const painter = (color?: boolean): Paint => (code, text) => (color ? `\u001b[${code}m${text}\u001b[0m` : text);

const plural = (count: number, word: string, pluralWord = `${word}s`): string => `${count} ${count === 1 ? word : pluralWord}`;

/**
 * Formats a fix plan as a preview: the diff of every file that would change, then a summary.
 */
export function formatFixPlan(plan: FixPlan, options: FixFormatOptions = {}): string {
  const paint = painter(options.color);
  const output: string[] = [''];
  const fixCount = plan.files.reduce((count, fileFix) => count + fileFix.findings.length, 0);

  output.push(`${paint('1', options.applying ? 'Oxygen UI fix' : 'Oxygen UI fix preview')} ${paint('2', `· ${plan.report.project.name} · rules ${plan.report.ruleset.version}`)}`);
  output.push('');

  for (const fileFix of plan.files) {
    if (fileFix.suggested.length > 0) {
      output.push(paint('33', `Includes ${plural(fileFix.suggested.length, 'suggested fix', 'suggested fixes')} to review: ${fileFix.suggested.map((finding) => `line ${finding.line}`).join(', ')}`));
    }
    output.push(colorDiff(fileFix.diff, paint));
  }

  if (fixCount === 0) {
    output.push(paint('32', '✓ Nothing to fix automatically.'));
  } else {
    output.push(paint('1', `${plural(fixCount, 'finding')} in ${plural(plan.files.length, 'file')} can be fixed.`));

    if (!options.applying) {
      output.push(paint('2', '  Nothing has been changed. Run again with --apply to write the changes.'));
    }
  }

  if (plan.skipped.length > 0) {
    output.push(paint('2', `  ${plural(plan.skipped.length, 'more finding')} can be fixed in files left out by --limit.`));
  }

  output.push(...formatUnfixable(plan.unfixable, paint));
  output.push('');

  return output.join('\n');
}

/**
 * Formats the result of applying a fix plan.
 */
export function formatFixResult(result: FixResult, options: FixFormatOptions = {}): string {
  const paint = painter(options.color);
  const output: string[] = [''];

  if (result.status === 'refused') {
    output.push(paint('33', `Nothing was changed. ${result.reason ?? ''}`.trim()));
  } else if (result.status === 'rolled-back') {
    output.push(paint('31', `✖ The changes were rolled back. ${result.reason ?? ''}`.trim()));

    for (const finding of result.regressions) {
      output.push(`  ${finding.file}:${finding.line}:${finding.column}  ${finding.message}  ${paint('2', finding.ruleId)}`);
    }
  } else {
    output.push(paint('32', `✓ Fixed ${plural(result.fixed, 'finding')} in ${plural(result.files.length, 'file')}.`));

    for (const file of result.files) {
      output.push(`  ${file}`);
    }

    for (const {command} of result.verification) {
      output.push(paint('2', `  Passed: ${command}`));
    }

    output.push(paint('2', '  Review the changes with git diff before committing.'));
  }

  if (result.status !== 'refused' && result.remaining.length > 0) {
    output.push(`  ${plural(result.remaining.length, 'finding')} ${result.remaining.length === 1 ? 'remains' : 'remain'}. Run analyze to see them.`);
  }

  output.push('');

  return output.join('\n');
}

function formatUnfixable(findings: Finding[], paint: Paint): string[] {
  if (findings.length === 0) {
    return [];
  }

  const suggested = findings.filter((finding) => finding.fix.suggestion).length;
  const other = findings.length - suggested;
  const output = [paint('2', `  ${plural(findings.length, 'other finding')} cannot be fixed automatically:`)];

  if (suggested > 0) {
    output.push(paint('2', `    ${suggested} ${suggested === 1 ? 'has a suggested fix' : 'have suggested fixes'} to review. Preview ${suggested === 1 ? 'it' : 'them'} with --suggestions.`));
  }

  if (other > 0) {
    output.push(paint('2', `    ${other} ${other === 1 ? 'needs' : 'need'} a manual or AI-assisted change. Write a plan for an AI assistant with --ai.`));
  }

  return output;
}

function colorDiff(diff: string, paint: Paint): string {
  return diff
    .split('\n')
    .map((line) => {
      if (line.startsWith('+++') || line.startsWith('---')) return paint('1', line);
      if (line.startsWith('@@')) return paint('36', line);
      if (line.startsWith('+')) return paint('32', line);
      if (line.startsWith('-')) return paint('31', line);
      return line;
    })
    .join('\n');
}

/**
 * Formats a fix plan, or the result of applying one, as JSON for tools such as the report UI.
 */
export function formatFixJson(plan: FixPlan, result?: FixResult): string {
  const summary = {
    project: plan.report.project,
    ruleset: plan.report.ruleset,
    rules: plan.ruleIds,
    files: plan.files.map(({file, findings, suggested, diff}) => ({
      file,
      findings: findings.map((finding) => finding.id),
      suggested: suggested.map((finding) => finding.id),
      diff,
    })),
    unfixable: plan.unfixable,
    skipped: plan.skipped,
    ...(result
      ? {
          result: {
            status: result.status,
            reason: result.reason,
            files: result.files,
            fixed: result.fixed,
            remaining: result.remaining.length,
            regressions: result.regressions,
            verification: result.verification,
          },
        }
      : {}),
  };

  return `${JSON.stringify(summary, null, 2)}\n`;
}
