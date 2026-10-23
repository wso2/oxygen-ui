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

import {createHash} from 'crypto';
import {existsSync, readFileSync} from 'fs';
import {basename, join, relative, resolve, sep} from 'path';
import parser from '@typescript-eslint/parser';
import {
  ESLINT_PLUGIN_NAMESPACE,
  getEslintRules,
  rules as registry,
  rulesetVersion,
  type RuleDefinition,
} from '@wso2/oxygen-ui-rules';
import {ESLint, type Linter} from 'eslint';
import type {Baseline} from '../baseline/baseline.js';
import {matchesAny} from '../config/glob.js';
import type {ResolvedConfig} from '../config/types.js';
import {
  REPORT_SCHEMA_VERSION,
  type AnalysisError,
  type BaselineComparison,
  type Finding,
  type Report,
  type ReportNotice,
  type ReportRule,
  type ReportSummary,
  type SuppressedFinding,
} from '../report/types.js';
import {DEFAULT_IGNORE, DEFAULT_INCLUDE} from './defaults.js';

export interface AnalyzeOptions {
  /** The project to analyze. Defaults to the current working directory. */
  root?: string;
  /** Glob patterns of files to analyze, relative to `root`. Defaults to `DEFAULT_INCLUDE`. */
  include?: string[];
  /** Glob patterns of files to skip, added to `DEFAULT_IGNORE`. */
  ignore?: string[];
  /** The rules to run. Defaults to every rule in `@wso2/oxygen-ui-rules`. */
  rules?: RuleDefinition[];
  /** The product's rule settings and exceptions, from its config file. */
  config?: Pick<ResolvedConfig, 'path' | 'rules' | 'exceptions'>;
  /** The baseline to compare the findings with. */
  baseline?: {path: string; baseline: Baseline} | null;
  /** Today's date as YYYY-MM-DD, used for exception expiry dates. Defaults to the current date. */
  today?: string;
}

const RULE_ID_PREFIX = `${ESLINT_PLUGIN_NAMESPACE}/`;

/**
 * Returns the Oxygen UI rule id for an ESLint rule id such as
 * `'@wso2/oxygen-ui/no-direct-mui-imports'`, or `null` for other plugins' rules.
 */
export function toRuleId(eslintRuleId: string | null): string | null {
  return eslintRuleId?.startsWith(RULE_ID_PREFIX) ? eslintRuleId.slice(RULE_ID_PREFIX.length) : null;
}

export interface AnalyzerEslintOptions {
  root: string;
  rules: RuleDefinition[];
  ignore?: string[];
  /** Which problems ESLint should fix. By default nothing is fixed. */
  fix?: (message: Linter.LintMessage) => boolean;
  /** Options per rule id, passed to the rule's detector. */
  ruleOptions?: Record<string, Record<string, unknown> | undefined>;
}

/**
 * Creates the ESLint instance the analyzer uses: only the automated Oxygen UI rules, with the
 * project's own ESLint configuration ignored.
 */
export function createAnalyzerEslint({root, rules, ignore = [], fix, ruleOptions = {}}: AnalyzerEslintOptions): ESLint {
  return new ESLint({
    cwd: root,
    overrideConfigFile: true,
    overrideConfig: createEslintConfig(
      rules.filter((rule) => rule.detect),
      [...DEFAULT_IGNORE, ...ignore],
      ruleOptions,
    ),
    errorOnUnmatchedPattern: false,
    warnIgnored: false,
    ...(fix ? {fix} : {}),
  });
}

/** Maximum number of source lines kept as evidence for one finding. */
const MAX_EVIDENCE_LINES = 3;

/**
 * Analyzes a project against the Oxygen UI rules and returns the report.
 *
 * The project's own ESLint configuration is not used, so the results do not depend on it.
 * Disable comments for the Oxygen UI rules, such as
 * `// eslint-disable-next-line @wso2/oxygen-ui/no-direct-mui-imports`, are respected.
 */
export async function analyze(options: AnalyzeOptions = {}): Promise<Report> {
  const root = resolve(options.root ?? process.cwd());
  const settings = options.config?.rules ?? {};
  const rules = (options.rules ?? registry).filter((rule) => settings[rule.meta.id]?.severity !== 'off');
  const eslint = createAnalyzerEslint({
    root,
    rules,
    ignore: options.ignore,
    ruleOptions: getRuleOptions(options.config),
  });
  const results = await eslint.lintFiles(options.include ?? DEFAULT_INCLUDE);

  const findings: Finding[] = [];
  const errors: AnalysisError[] = [];

  for (const result of results) {
    const file = toProjectPath(root, result.filePath);
    const source = result.source ?? readFileSync(result.filePath, 'utf-8');
    const lines = source.split(/\r?\n/);
    const ids = getFindingIds(file, source, result.messages);

    for (const [index, message] of result.messages.entries()) {
      if (message.fatal) {
        errors.push({file, message: message.message, line: message.line});
        continue;
      }

      const ruleId = toRuleId(message.ruleId);
      const rule = ruleId ? rules.find((candidate) => candidate.meta.id === ruleId) : undefined;

      // Problems that are not Oxygen UI findings, such as comments that configure other plugins' rules.
      if (!rule) {
        continue;
      }

      const suggestion = message.suggestions?.[0]?.desc;

      findings.push({
        id: ids[index] as string,
        ruleId: rule.meta.id,
        category: rule.meta.category,
        severity: getSeverity(rule, options.config),
        confidence: 'high',
        kind: 'deterministic',
        file,
        line: message.line,
        column: message.column,
        ...(message.endLine ? {endLine: message.endLine} : {}),
        ...(message.endColumn ? {endColumn: message.endColumn} : {}),
        message: message.message,
        evidence: getEvidence(lines, message),
        fix: {type: rule.meta.fix, available: Boolean(message.fix), ...(suggestion ? {suggestion} : {})},
      });
    }
  }

  findings.sort(compareFindings);
  errors.sort((a, b) => a.file.localeCompare(b.file));

  const today = options.today ?? new Date().toISOString().slice(0, 10);
  const {active, suppressed, notices} = applyExceptions(findings, options.config, today);
  notices.push(...getRuleNotices(options.rules ?? registry, options.config));
  const baseline = options.baseline ? compareWithBaseline(active, options.baseline) : undefined;

  return {
    schemaVersion: REPORT_SCHEMA_VERSION,
    tool: {name: '@wso2/oxygen-ui-analyzer', version: __ANALYZER_VERSION__},
    ruleset: {version: rulesetVersion},
    project: {name: getProjectName(root)},
    generatedAt: new Date().toISOString(),
    summary: summarize(results.length, active),
    rules: rules.map((rule) => toReportRule(rule, active, getSeverity(rule, options.config))),
    findings: active,
    suppressed,
    notices,
    errors,
    ...(baseline ? {baseline} : {}),
  };
}

function getSeverity(rule: RuleDefinition, config: AnalyzeOptions['config']): Finding['severity'] {
  const severity = config?.rules[rule.meta.id]?.severity;
  return severity && severity !== 'off' ? severity : rule.meta.severity;
}

function getRuleOptions(config: AnalyzeOptions['config']): Record<string, Record<string, unknown> | undefined> {
  return Object.fromEntries(Object.entries(config?.rules ?? {}).map(([id, setting]) => [id, setting.options]));
}

/**
 * Moves findings covered by an exception that has not expired to `suppressed`, and reports
 * exceptions that have expired or match nothing, so that the config stays accurate.
 */
function applyExceptions(
  findings: Finding[],
  config: AnalyzeOptions['config'],
  today: string,
): {active: Finding[]; suppressed: SuppressedFinding[]; notices: ReportNotice[]} {
  const exceptions = config?.exceptions ?? [];
  const current = exceptions.filter((exception) => !exception.expires || exception.expires >= today);
  const used = new Set<number>();
  const active: Finding[] = [];
  const suppressed: SuppressedFinding[] = [];

  for (const finding of findings) {
    const index = current.findIndex((exception) => exception.rule === finding.ruleId && matchesAny(finding.file, exception.files));

    if (index === -1) {
      active.push(finding);
      continue;
    }

    used.add(index);
    const {reason, files, expires} = current[index];
    suppressed.push({...finding, exception: {reason, files, ...(expires ? {expires} : {})}});
  }

  const describe = (exception: (typeof exceptions)[number]) => `The exception for ${exception.rule} on ${exception.files.join(', ')}`;
  const notices: ReportNotice[] = [
    ...exceptions
      .filter((exception) => exception.expires && exception.expires < today)
      .map((exception) => ({
        level: 'warning' as const,
        message: `${describe(exception)} expired on ${exception.expires} and no longer applies. Fix the findings it covered, or renew it with a reason.`,
      })),
    ...current
      .filter((_exception, index) => !used.has(index))
      .map((exception) => ({
        level: 'info' as const,
        message: `${describe(exception)} matches no findings. Remove it from the config.`,
      })),
  ];

  return {active, suppressed, notices};
}

/** Notices for rule settings that reviewers should see, such as mandatory rules turned off. */
function getRuleNotices(rules: RuleDefinition[], config: AnalyzeOptions['config']): ReportNotice[] {
  const where = config?.path ? basename(config.path) : 'the config';

  return rules
    .filter((rule) => rule.meta.level === 'mandatory' && config?.rules[rule.meta.id]?.severity === 'off')
    .map((rule) => ({
      level: 'warning' as const,
      message: `The mandatory rule ${rule.meta.id} is turned off in ${where}. Mandatory rules should only be relaxed for specific files, with an exception and a reason.`,
    }));
}

function compareWithBaseline(findings: Finding[], {path, baseline}: {path: string; baseline: Baseline}): BaselineComparison {
  const known = new Set(baseline.findings.map((entry) => entry.id));
  const current = new Set(findings.map((finding) => finding.id));

  for (const finding of findings) {
    finding.status = known.has(finding.id) ? 'baseline' : 'new';
  }

  return {
    path,
    known: findings.filter((finding) => finding.status === 'baseline').length,
    new: findings.filter((finding) => finding.status === 'new').length,
    fixed: baseline.findings.filter((entry) => !current.has(entry.id)).length,
  };
}

function createEslintConfig(
  rules: RuleDefinition[],
  ignores: string[],
  ruleOptions: Record<string, Record<string, unknown> | undefined>,
): Linter.Config[] {
  return [
    {ignores},
    {
      files: DEFAULT_INCLUDE,
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser,
        parserOptions: {ecmaFeatures: {jsx: true}},
      },
      linterOptions: {
        // Products' disable comments for their own rules are not Oxygen UI findings.
        reportUnusedDisableDirectives: 'off',
      },
      plugins: {
        [ESLINT_PLUGIN_NAMESPACE]: {rules: getEslintRules(rules)},
      },
      // The finding severity comes from the rule's metadata, so ESLint only needs the rule on.
      rules: Object.fromEntries(
        rules.map((rule) => {
          const options = ruleOptions[rule.meta.id];
          return [`${RULE_ID_PREFIX}${rule.meta.id}`, options ? ['error', options] : 'error'];
        }),
      ) as Linter.RulesRecord,
    },
  ];
}

/**
 * Returns the finding id for each of a file's lint messages, in order, or `null` for messages that
 * are not Oxygen UI findings. Ids depend on the rule, the file and the code involved, not the
 * position, so they identify the same finding after unrelated code moves.
 */
export function getFindingIds(file: string, source: string, messages: Linter.LintMessage[]): (string | null)[] {
  const lines = source.split(/\r?\n/);
  const occurrences = new Map<string, number>();

  return messages.map((message) => {
    const ruleId = message.fatal ? null : toRuleId(message.ruleId);

    if (!ruleId) {
      return null;
    }

    const key = `${ruleId}\0${file}\0${getEvidence(lines, message).trim()}`;
    const occurrence = occurrences.get(key) ?? 0;
    occurrences.set(key, occurrence + 1);

    return createFindingId(key, occurrence);
  });
}

function getEvidence(lines: string[], message: Linter.LintMessage): string {
  const start = Math.max(message.line - 1, 0);
  const end = Math.min(message.endLine ?? message.line, start + MAX_EVIDENCE_LINES);

  return lines.slice(start, end).join('\n');
}

function createFindingId(key: string, occurrence: number): string {
  return createHash('sha256').update(`${key}\0${occurrence}`).digest('hex').slice(0, 16);
}

function toProjectPath(root: string, filePath: string): string {
  return relative(root, filePath).split(sep).join('/');
}

function getProjectName(root: string): string {
  const packageJsonPath = join(root, 'package.json');

  if (existsSync(packageJsonPath)) {
    try {
      const {name} = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {name?: unknown};

      if (typeof name === 'string' && name) {
        return name;
      }
    } catch {
      // Fall back to the directory name.
    }
  }

  return basename(root);
}

function summarize(filesAnalyzed: number, findings: Finding[]): ReportSummary {
  const summary: ReportSummary = {
    filesAnalyzed,
    filesWithFindings: new Set(findings.map((finding) => finding.file)).size,
    findings: findings.length,
    bySeverity: {error: 0, warning: 0, info: 0},
    byCategory: {},
  };

  for (const finding of findings) {
    summary.bySeverity[finding.severity] += 1;
    summary.byCategory[finding.category] = (summary.byCategory[finding.category] ?? 0) + 1;
  }

  return summary;
}

function toReportRule(rule: RuleDefinition, findings: Finding[], severity: ReportRule['severity']): ReportRule {
  const {id, title, summary, category, level, enforcement, fix} = rule.meta;

  return {
    id,
    title,
    summary,
    category,
    level,
    severity,
    enforcement,
    fix,
    docs: rule.docs,
    findings: findings.filter((finding) => finding.ruleId === id).length,
  };
}

function compareFindings(a: Finding, b: Finding): number {
  return a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column || a.ruleId.localeCompare(b.ruleId);
}
