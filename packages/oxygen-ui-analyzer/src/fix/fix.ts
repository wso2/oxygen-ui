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

import {spawnSync} from 'child_process';
import {readFileSync, realpathSync, writeFileSync} from 'fs';
import {join, resolve} from 'path';
import {rules as registry, type RuleDefinition} from '@wso2/oxygen-ui-rules';
import {analyze, createAnalyzerEslint, getFindingIds, type AnalyzeOptions} from '../engine/analyze.js';
import type {Finding, Report} from '../report/types.js';
import {formatUnifiedDiff} from './diff.js';

export interface FixOptions extends AnalyzeOptions {
  /** Only fix findings of these rules. Defaults to every rule. */
  ruleIds?: string[];
  /** Fix at most this many files. */
  limit?: number;
  /** Also apply suggested fixes, which change more than automatic fixes and need review. */
  suggestions?: boolean;
}

export interface FileFix {
  /** Path relative to the project root, with forward slashes. */
  file: string;
  /** The findings the change fixes. */
  findings: Finding[];
  /** The findings among them that are fixed with a suggestion, rather than an automatic fix. */
  suggested: Finding[];
  before: string;
  after: string;
  diff: string;
}

export interface FixPlan {
  root: string;
  /** The analysis options the plan was made with, reused to check the result. */
  options: Pick<AnalyzeOptions, 'include' | 'ignore' | 'rules' | 'config'>;
  /** The analysis the plan is based on. */
  report: Report;
  /** The rules in scope. */
  ruleIds: string[];
  files: FileFix[];
  /** Findings in scope that have no safe automatic fix, and need another kind of change. */
  unfixable: Finding[];
  /** Fixable findings left out because of `limit`. */
  skipped: Finding[];
}

export interface ApplyOptions {
  /** Commands to run after writing the changes, such as `pnpm typecheck`. A failure rolls the changes back. */
  verify?: string[];
  /** Apply even when the files to change have uncommitted changes, or the project is not a git repository. */
  allowDirty?: boolean;
  /** Called before each verification command runs. */
  onVerify?: (command: string) => void;
}

export interface VerificationResult {
  command: string;
  exitCode: number;
}

export interface FixResult {
  /**
   * - `applied`: the changes were written and passed every check.
   * - `rolled-back`: the changes were written, failed a check, and were reverted.
   * - `refused`: nothing was written.
   */
  status: 'applied' | 'rolled-back' | 'refused';
  reason?: string;
  files: string[];
  /** Number of findings fixed. */
  fixed: number;
  /** Findings in scope that remain after the fix. */
  remaining: Finding[];
  /** Findings that the changes introduced. Any regression rolls the changes back. */
  regressions: Finding[];
  verification: VerificationResult[];
  /** The analysis after the fix, or before it if nothing was written. */
  report: Report;
}

/**
 * Works out the safe fixes for a project without changing any file.
 *
 * Only findings of rules whose fix type is `safe`, and that have an automatic fix, are fixed.
 */
export async function planFixes(options: FixOptions = {}): Promise<FixPlan> {
  const root = resolve(options.root ?? process.cwd());
  const rules = options.rules ?? registry;
  const ruleIds = resolveRuleIds(rules, options.ruleIds);
  const safeRuleIds = new Set(
    rules.filter((rule) => ruleIds.includes(rule.meta.id) && rule.meta.fix === 'safe').map((rule) => rule.meta.id),
  );

  const report = await analyze({...options, root, rules});
  const inScope = report.findings.filter((finding) => ruleIds.includes(finding.ruleId));
  const isAutomatic = (finding: Finding) => safeRuleIds.has(finding.ruleId) && finding.fix.available;
  const fixable = inScope.filter((finding) => isAutomatic(finding) || (options.suggestions && finding.fix.suggestion));
  const candidateFiles = [...new Set(fixable.map((finding) => finding.file))];
  const selectedFiles = options.limit === undefined ? candidateFiles : candidateFiles.slice(0, Math.max(options.limit, 0));

  const files: FileFix[] = [];

  if (selectedFiles.length > 0) {
    const eslint = createAnalyzerEslint({
      root,
      rules,
      ignore: options.ignore,
      ruleOptions: Object.fromEntries(Object.entries(options.config?.rules ?? {}).map(([id, setting]) => [id, setting.options])),
    });

    for (const file of selectedFiles) {
      const planned = new Map(fixable.filter((finding) => finding.file === file).map((finding) => [finding.id, finding]));
      const before = readFileSync(join(root, file), 'utf-8');
      const {text, applied} = await fixFile(eslint, join(root, file), file, before, planned, isAutomatic);

      if (text !== before) {
        const findings = [...applied].map((id) => planned.get(id) as Finding).sort((a, b) => a.line - b.line);

        files.push({
          file,
          findings,
          suggested: findings.filter((finding) => !isAutomatic(finding)),
          before,
          after: text,
          diff: formatUnifiedDiff(file, before, text),
        });
      }
    }
  }

  files.sort((a, b) => a.file.localeCompare(b.file));

  const fixedIds = new Set(files.flatMap((fileFix) => fileFix.findings.map((finding) => finding.id)));
  const skippedFiles = new Set(candidateFiles.slice(selectedFiles.length));

  return {
    root,
    options: {include: options.include, ignore: options.ignore, rules, config: options.config},
    report,
    ruleIds,
    files,
    unfixable: inScope.filter((finding) => !fixedIds.has(finding.id) && !(skippedFiles.has(finding.file) && fixable.includes(finding))),
    skipped: fixable.filter((finding) => skippedFiles.has(finding.file)),
  };
}

/** The most passes over one file. Each pass applies the planned fixes that do not overlap. */
const MAX_FIX_PASSES = 10;

/**
 * Applies the planned fixes to one file's text, without writing it. Only the planned findings are
 * fixed, so problems the analysis does not report, such as findings covered by a product exception,
 * are left alone. Fixes that overlap, such as a suggestion that rewrites code that another fix also
 * changes, are applied in later passes, matching findings by id.
 */
async function fixFile(
  eslint: ReturnType<typeof createAnalyzerEslint>,
  filePath: string,
  file: string,
  source: string,
  planned: Map<string, Finding>,
  isAutomatic: (finding: Finding) => boolean,
): Promise<{text: string; applied: Set<string>}> {
  let text = source;
  const applied = new Set<string>();

  for (let pass = 0; pass < MAX_FIX_PASSES && applied.size < planned.size; pass += 1) {
    const [result] = await eslint.lintText(text, {filePath});
    const ids = getFindingIds(file, text, result.messages);
    const edits: {id: string; range: [number, number]; text: string}[] = [];

    result.messages.forEach((message, index) => {
      const id = ids[index];
      const finding = id ? planned.get(id) : undefined;

      if (!id || !finding || applied.has(id)) {
        return;
      }

      const fix = isAutomatic(finding) ? message.fix : message.suggestions?.[0]?.fix;
      if (fix) {
        edits.push({id, range: fix.range, text: fix.text});
      }
    });

    // Apply the edits that do not overlap, from the end of the file so earlier ranges stay valid.
    const selected: typeof edits = [];
    for (const edit of edits.sort((a, b) => a.range[0] - b.range[0])) {
      const previous = selected[selected.length - 1];

      if (!previous || edit.range[0] >= previous.range[1]) {
        selected.push(edit);
      }
    }

    if (selected.length === 0) {
      break;
    }

    for (const edit of selected.reverse()) {
      text = text.slice(0, edit.range[0]) + edit.text + text.slice(edit.range[1]);
      applied.add(edit.id);
    }
  }

  return {text, applied};
}

/**
 * Writes the changes of a plan, analyzes the project again, and runs the verification commands.
 * The changes are reverted if they introduce findings or a command fails.
 */
export async function applyFixes(plan: FixPlan, options: ApplyOptions = {}): Promise<FixResult> {
  const files = plan.files.map((fileFix) => fileFix.file);
  const fixed = plan.files.reduce((count, fileFix) => count + fileFix.findings.length, 0);
  const refuse = (reason: string): FixResult => ({
    status: 'refused',
    reason,
    files: [],
    fixed: 0,
    remaining: plan.report.findings.filter((finding) => plan.ruleIds.includes(finding.ruleId)),
    regressions: [],
    verification: [],
    report: plan.report,
  });

  if (files.length === 0) {
    return refuse('There is nothing to fix.');
  }

  if (!options.allowDirty) {
    const dirty = getUncommittedFiles(plan.root, files);

    if (dirty === null) {
      return refuse('The project is not a git repository, so the changes could not be undone with git. Use --allow-dirty to apply them anyway.');
    }
    if (dirty.length > 0) {
      return refuse(`These files have uncommitted changes: ${dirty.join(', ')}. Commit or stash them first, or use --allow-dirty.`);
    }
  }

  const changedSincePlan = plan.files.filter((fileFix) => readFileSync(join(plan.root, fileFix.file), 'utf-8') !== fileFix.before);
  if (changedSincePlan.length > 0) {
    return refuse(`These files changed after the fixes were planned: ${changedSincePlan.map((fileFix) => fileFix.file).join(', ')}. Run the fix again.`);
  }

  const rollback = () => {
    for (const fileFix of plan.files) {
      writeFileSync(join(plan.root, fileFix.file), fileFix.before);
    }
  };

  for (const fileFix of plan.files) {
    writeFileSync(join(plan.root, fileFix.file), fileFix.after);
  }

  let report: Report;
  try {
    report = await analyze({...plan.options, root: plan.root});
  } catch (error) {
    rollback();
    throw error;
  }

  const beforeKeys = countKeys(plan.report.findings);
  const regressions = report.findings.filter((finding) => {
    const key = findingKey(finding);
    const remaining = beforeKeys.get(key) ?? 0;

    beforeKeys.set(key, remaining - 1);
    return remaining <= 0;
  });
  const remaining = report.findings.filter((finding) => plan.ruleIds.includes(finding.ruleId));
  const result = {files, fixed, remaining, regressions, verification: [] as VerificationResult[], report};

  if (regressions.length > 0) {
    rollback();
    return {...result, status: 'rolled-back', reason: `The changes introduced ${regressions.length} new finding(s).`, report: plan.report};
  }

  for (const command of options.verify ?? []) {
    options.onVerify?.(command);
    const {status} = spawnSync(command, {cwd: plan.root, shell: true, stdio: 'inherit'});
    const exitCode = status ?? 1;

    result.verification.push({command, exitCode});

    if (exitCode !== 0) {
      rollback();
      return {...result, status: 'rolled-back', reason: `"${command}" failed with exit code ${exitCode}.`, report: plan.report};
    }
  }

  return {...result, status: 'applied'};
}

function resolveRuleIds(rules: RuleDefinition[], requested?: string[]): string[] {
  const known = rules.map((rule) => rule.meta.id);

  if (!requested || requested.length === 0) {
    return known;
  }

  const unknown = requested.filter((id) => !known.includes(id));
  if (unknown.length > 0) {
    throw new Error(`Unknown rule: ${unknown.join(', ')}. Known rules: ${known.join(', ')}.`);
  }

  return requested;
}

/** A finding's identity without its position, so that moved code still matches. */
function findingKey(finding: Finding): string {
  return `${finding.ruleId}\0${finding.file}\0${finding.evidence.trim()}`;
}

function countKeys(findings: Finding[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const finding of findings) {
    counts.set(findingKey(finding), (counts.get(findingKey(finding)) ?? 0) + 1);
  }
  return counts;
}

/**
 * Returns which of the files have uncommitted changes, or `null` if the project is not in a git
 * repository or git is not available.
 */
function getUncommittedFiles(root: string, files: string[]): string[] | null {
  const inside = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {cwd: root, encoding: 'utf-8'});

  if (inside.status !== 0 || inside.stdout.trim() !== 'true') {
    return null;
  }

  const topLevel = spawnSync('git', ['rev-parse', '--show-toplevel'], {cwd: root, encoding: 'utf-8'});
  const status = spawnSync('git', ['status', '--porcelain=v1', '--untracked-files=all', '--', ...files], {
    cwd: root,
    encoding: 'utf-8',
  });

  if (topLevel.status !== 0 || status.status !== 0) {
    return null;
  }

  // Porcelain paths are relative to the repository root, which git reports with symbolic links
  // resolved, so compare real paths. Untracked files count as uncommitted, because git cannot
  // restore them either.
  const dirty = new Set(
    status.stdout
      .split('\n')
      .filter(Boolean)
      .map((line) => resolve(realpathSync(topLevel.stdout.trim()), line.slice(3))),
  );

  return files.filter((file) => dirty.has(realpathSync(resolve(root, file))));
}
