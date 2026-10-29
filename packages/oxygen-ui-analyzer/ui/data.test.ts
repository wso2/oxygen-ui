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

import {describe, expect, it} from 'vitest';
import {
  buildFixPrompt,
  DEFAULT_FILTERS,
  filterFindings,
  getDocSection,
  parseRoute,
  routeToHash,
  summarizeFiles,
  type Finding,
  type ReportRule,
} from './data.js';

const finding = (overrides: Partial<Finding>): Finding => ({
  id: 'id',
  ruleId: 'no-direct-mui-imports',
  category: 'imports',
  severity: 'error',
  confidence: 'high',
  kind: 'deterministic',
  file: 'src/App.tsx',
  line: 1,
  column: 1,
  message: 'Use Oxygen UI.',
  evidence: "import {Box} from '@mui/material';",
  fix: {type: 'safe', available: true},
  ...overrides,
});

const findings = [
  finding({id: 'a', file: 'src/b.tsx', severity: 'warning'}),
  finding({id: 'b', file: 'src/a.tsx'}),
  finding({id: 'c', file: 'src/b.tsx', severity: 'warning', fix: {type: 'manual', available: false}, evidence: 'const legacy = 1;'}),
];

describe('summarizeFiles', () => {
  it('puts files with errors first, then files with more findings', () => {
    expect(summarizeFiles(findings).map((file) => [file.file, file.findings.length, file.fixable])).toEqual([
      ['src/a.tsx', 1, 1],
      ['src/b.tsx', 2, 1],
    ]);
  });
});

describe('filterFindings', () => {
  it('filters by severity, fixability and text in the code', () => {
    expect(filterFindings(findings, {...DEFAULT_FILTERS, severity: 'warning'}).map((item) => item.id)).toEqual(['a', 'c']);
    expect(filterFindings(findings, {...DEFAULT_FILTERS, fixableOnly: true}).map((item) => item.id)).toEqual(['a', 'b']);
    expect(filterFindings(findings, {...DEFAULT_FILTERS, query: 'LEGACY'}).map((item) => item.id)).toEqual(['c']);
  });
});

describe('routes', () => {
  it('round-trips files with slashes and special characters, and rules', () => {
    for (const route of [
      {view: 'files'},
      {view: 'file', file: 'src/pages/Users Page#1.tsx'},
      {view: 'rules'},
      {view: 'rule', id: 'no-direct-mui-imports'},
    ] as const) {
      expect(parseRoute(routeToHash(route))).toEqual(route);
    }
  });

  it('falls back to the file list', () => {
    expect(parseRoute('')).toEqual({view: 'files'});
    expect(parseRoute('#/unknown')).toEqual({view: 'files'});
  });
});

describe('getDocSection and buildFixPrompt', () => {
  const rule = {
    id: 'no-direct-mui-imports',
    title: 'Import MUI components from Oxygen UI',
    docs: '## Why\n\nBecause.\n\n## How to fix\n\nImport from `@wso2/oxygen-ui`.\n\n## Exceptions\n\nNone.\n',
  } as ReportRule;

  it('reads one section of the docs', () => {
    expect(getDocSection(rule.docs, 'How to fix')).toBe('Import from `@wso2/oxygen-ui`.');
    expect(getDocSection(rule.docs, 'Exceptions')).toBe('None.');
    expect(getDocSection(rule.docs, 'Missing')).toBe('');
  });

  it('builds a prompt with the location, code and the rule\'s fix guidance', () => {
    const prompt = buildFixPrompt(findings[1], rule);

    expect(prompt).toContain('Fix this Oxygen UI finding in src/a.tsx, line 1.');
    expect(prompt).toContain('Rule: no-direct-mui-imports (Import MUI components from Oxygen UI)');
    expect(prompt).toContain("import {Box} from '@mui/material';");
    expect(prompt).toContain('Import from `@wso2/oxygen-ui`.');
  });
});
