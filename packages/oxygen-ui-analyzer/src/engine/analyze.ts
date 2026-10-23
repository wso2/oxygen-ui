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
import {
  REPORT_SCHEMA_VERSION,
  type AnalysisError,
  type Finding,
  type Report,
  type ReportRule,
  type ReportSummary,
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
}

const RULE_ID_PREFIX = `${ESLINT_PLUGIN_NAMESPACE}/`;

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
  const rules = options.rules ?? registry;
  const automatedRules = rules.filter((rule) => rule.detect);

  const eslint = new ESLint({
    cwd: root,
    overrideConfigFile: true,
    overrideConfig: createEslintConfig(automatedRules, [...DEFAULT_IGNORE, ...(options.ignore ?? [])]),
    errorOnUnmatchedPattern: false,
    warnIgnored: false,
  });

  const results = await eslint.lintFiles(options.include ?? DEFAULT_INCLUDE);

  const findings: Finding[] = [];
  const errors: AnalysisError[] = [];

  for (const result of results) {
    const file = toProjectPath(root, result.filePath);
    const lines = (result.source ?? readFileSync(result.filePath, 'utf-8')).split(/\r?\n/);
    const occurrences = new Map<string, number>();

    for (const message of result.messages) {
      if (message.fatal) {
        errors.push({file, message: message.message, line: message.line});
        continue;
      }

      const ruleId = message.ruleId?.startsWith(RULE_ID_PREFIX) ? message.ruleId.slice(RULE_ID_PREFIX.length) : null;
      const rule = ruleId ? rules.find((candidate) => candidate.meta.id === ruleId) : undefined;

      // Problems that are not Oxygen UI findings, such as comments that configure other plugins' rules.
      if (!rule) {
        continue;
      }

      const evidence = getEvidence(lines, message);
      const key = `${rule.meta.id}\0${file}\0${evidence.trim()}`;
      const occurrence = occurrences.get(key) ?? 0;
      occurrences.set(key, occurrence + 1);

      findings.push({
        id: createFindingId(key, occurrence),
        ruleId: rule.meta.id,
        category: rule.meta.category,
        severity: rule.meta.severity,
        confidence: 'high',
        kind: 'deterministic',
        file,
        line: message.line,
        column: message.column,
        ...(message.endLine ? {endLine: message.endLine} : {}),
        ...(message.endColumn ? {endColumn: message.endColumn} : {}),
        message: message.message,
        evidence,
        fix: {type: rule.meta.fix, available: Boolean(message.fix)},
      });
    }
  }

  findings.sort(compareFindings);
  errors.sort((a, b) => a.file.localeCompare(b.file));

  return {
    schemaVersion: REPORT_SCHEMA_VERSION,
    tool: {name: '@wso2/oxygen-ui-analyzer', version: __ANALYZER_VERSION__},
    ruleset: {version: rulesetVersion},
    project: {name: getProjectName(root)},
    generatedAt: new Date().toISOString(),
    summary: summarize(results.length, findings),
    rules: rules.map((rule) => toReportRule(rule, findings)),
    findings,
    errors,
  };
}

function createEslintConfig(rules: RuleDefinition[], ignores: string[]): Linter.Config[] {
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
      rules: Object.fromEntries(rules.map((rule) => [`${RULE_ID_PREFIX}${rule.meta.id}`, 'error' as const])),
    },
  ];
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

function toReportRule(rule: RuleDefinition, findings: Finding[]): ReportRule {
  const {id, title, summary, category, level, severity, enforcement, fix} = rule.meta;

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
