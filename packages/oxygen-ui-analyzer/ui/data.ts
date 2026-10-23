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

import type {Finding, Report, ReportRule} from '../src/report/types.js';

export type {Finding, Report, ReportRule};

export type Severity = Finding['severity'];

export interface FileSummary {
  file: string;
  findings: Finding[];
  bySeverity: Record<Severity, number>;
  fixable: number;
}

export interface Filters {
  query: string;
  severity: Severity | 'all';
  category: Finding['category'] | 'all';
  fixableOnly: boolean;
}

export const DEFAULT_FILTERS: Filters = {query: '', severity: 'all', category: 'all', fixableOnly: false};

const SEVERITY_ORDER: Severity[] = ['error', 'warning', 'info'];

/** Whether `fix` fixes the finding automatically. */
export function isAutoFixable(finding: Finding): boolean {
  return finding.fix.available && finding.fix.type === 'safe';
}

/** Findings matching the filters. The query matches the file, message, rule and code. */
export function filterFindings(findings: Finding[], filters: Filters): Finding[] {
  const query = filters.query.trim().toLowerCase();

  return findings.filter(
    (finding) =>
      (filters.severity === 'all' || finding.severity === filters.severity) &&
      (filters.category === 'all' || finding.category === filters.category) &&
      (!filters.fixableOnly || isAutoFixable(finding)) &&
      (!query ||
        [finding.file, finding.message, finding.ruleId, finding.evidence].some((text) => text.toLowerCase().includes(query))),
  );
}

/** Files with findings, the ones needing most attention first: errors, then total findings, then path. */
export function summarizeFiles(findings: Finding[]): FileSummary[] {
  const files = new Map<string, FileSummary>();

  for (const finding of findings) {
    const summary = files.get(finding.file) ?? {
      file: finding.file,
      findings: [],
      bySeverity: {error: 0, warning: 0, info: 0},
      fixable: 0,
    };

    summary.findings.push(finding);
    summary.bySeverity[finding.severity] += 1;
    summary.fixable += isAutoFixable(finding) ? 1 : 0;
    files.set(finding.file, summary);
  }

  return [...files.values()].sort(
    (a, b) =>
      b.bySeverity.error - a.bySeverity.error || b.findings.length - a.findings.length || a.file.localeCompare(b.file),
  );
}

/** The severity of the most severe finding. */
export function highestSeverity(findings: Finding[]): Severity {
  return SEVERITY_ORDER.find((severity) => findings.some((finding) => finding.severity === severity)) ?? 'info';
}

/** The text of a `## Heading` section in a rule's Markdown docs, or an empty string. */
export function getDocSection(docs: string, heading: string): string {
  const match = new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm').exec(docs);
  return match ? match[1].trim() : '';
}

/**
 * A prompt for an AI coding assistant to fix one finding, with the rule's guidance.
 */
export function buildFixPrompt(finding: Finding, rule?: ReportRule): string {
  const howToFix = rule ? getDocSection(rule.docs, 'How to fix') : '';

  return [
    `Fix this Oxygen UI finding in ${finding.file}, line ${finding.line}.`,
    '',
    `Rule: ${finding.ruleId}${rule ? ` (${rule.title})` : ''}`,
    `Problem: ${finding.message}`,
    '',
    'Code:',
    finding.evidence,
    ...(howToFix ? ['', 'How to fix, from the rule documentation:', howToFix] : []),
    '',
    'Check the Oxygen UI API before changing the code. Keep the change limited to this finding, keep the behaviour the same, and run the project\'s lint, type checks and tests afterwards.',
  ].join('\n');
}

/** The `CodeBlock` language for a file. */
export function languageOf(file: string): 'tsx' | 'typescript' | 'jsx' | 'javascript' {
  if (file.endsWith('.tsx')) return 'tsx';
  if (/\.[mc]?ts$/.test(file)) return 'typescript';
  if (file.endsWith('.jsx')) return 'jsx';
  return 'javascript';
}

export type Route = {view: 'files'} | {view: 'file'; file: string} | {view: 'rules'} | {view: 'rule'; id: string};

/** Reads the view from the URL hash, such as `#/files/src/App.tsx` or `#/rules/no-direct-mui-imports`. */
export function parseRoute(hash: string): Route {
  const [, section, ...rest] = hash.replace(/^#/, '').split('/');
  const target = decodeURIComponent(rest.join('/'));

  if (section === 'rules') {
    return target ? {view: 'rule', id: target} : {view: 'rules'};
  }

  return section === 'files' && target ? {view: 'file', file: target} : {view: 'files'};
}

export function routeToHash(route: Route): string {
  switch (route.view) {
    case 'file':
      return `#/files/${route.file.split('/').map(encodeURIComponent).join('/')}`;
    case 'rule':
      return `#/rules/${encodeURIComponent(route.id)}`;
    case 'rules':
      return '#/rules';
    default:
      return '#/files';
  }
}
