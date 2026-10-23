// @vitest-environment jsdom
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

import {act, cleanup, render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import App from './App.js';
import type {Finding, Report} from './data.js';

const finding = (id: string, file: string, line: number, overrides: Partial<Finding> = {}): Finding => ({
  id,
  ruleId: 'no-direct-mui-imports',
  category: 'imports',
  severity: 'error',
  confidence: 'high',
  kind: 'deterministic',
  file,
  line,
  column: 1,
  message: `Finding ${id}`,
  evidence: "import {Box} from '@mui/material';",
  fix: {type: 'safe', available: true},
  ...overrides,
});

const report: Report = {
  schemaVersion: 1,
  tool: {name: '@wso2/oxygen-ui-analyzer', version: '0.0.1'},
  ruleset: {version: '0.0.1'},
  project: {name: 'demo-product'},
  generatedAt: '2026-10-23T08:00:00.000Z',
  summary: {
    filesAnalyzed: 3,
    filesWithFindings: 2,
    findings: 3,
    bySeverity: {error: 3, warning: 0, info: 0},
    byCategory: {imports: 3},
  },
  rules: [
    {
      id: 'no-direct-mui-imports',
      title: 'Import MUI components from Oxygen UI',
      summary: 'Import from `@wso2/oxygen-ui`.',
      category: 'imports',
      level: 'mandatory',
      severity: 'error',
      enforcement: 'automated',
      fix: 'safe',
      docs: '## Why\n\nOne theme.\n\n## How to fix\n\nImport from `@wso2/oxygen-ui`.',
      findings: 3,
    },
  ],
  findings: [
    finding('a', 'src/Users.tsx', 3),
    finding('b', 'src/Users.tsx', 4, {fix: {type: 'safe', available: false}}),
    finding('c', 'src/Badge.tsx', 1),
  ],
  suppressed: [],
  notices: [],
  errors: [{file: 'src/Broken.tsx', message: 'Parsing error', line: 2}],
};

const navigate = (hash: string) =>
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

afterEach(() => {
  cleanup();
  window.location.hash = '';
});

describe('report UI', () => {
  it('summarises the report and lists the files to update, most findings first', () => {
    render(<App initialReport={report} live={false} />);

    expect(screen.getByText('demo-product')).toBeTruthy();
    expect(screen.getByText('Files to update')).toBeTruthy();
    expect(screen.getAllByRole('link', {name: /^src\//}).map((link) => link.textContent)).toEqual(['src/Users.tsx', 'src/Badge.tsx']);
    expect(screen.getByText(/src\/Broken\.tsx:2/)).toBeTruthy();
    expect(document.title).toBe('demo-product | Oxygen UI report');
  });

  it('shows the findings of a file, with their code and a fix prompt', () => {
    render(<App initialReport={report} live={false} />);
    navigate('#/files/src/Users.tsx');

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('Finding a')).toBeTruthy();
    expect(screen.getAllByRole('button', {name: 'Copy fix prompt'})).toHaveLength(2);
    expect(document.title).toBe('src/Users.tsx | Oxygen UI report');
  });

  it('shows a rule with its documentation and the files it applies to', () => {
    render(<App initialReport={report} live={false} />);
    navigate('#/rules/no-direct-mui-imports');

    expect(screen.getByRole('heading', {name: 'Import MUI components from Oxygen UI'})).toBeTruthy();
    expect(screen.getByRole('heading', {name: 'How to fix'})).toBeTruthy();
    expect(screen.getByRole('link', {name: 'src/Badge.tsx'})).toBeTruthy();
  });

  it('marks new findings when the report was compared with a baseline', () => {
    const compared: Report = {
      ...report,
      findings: report.findings.map((item, index) => ({...item, status: index === 0 ? 'new' : 'baseline'})),
      baseline: {path: '.oxygen-ui/baseline.json', known: 2, new: 1, fixed: 0},
    };

    render(<App initialReport={compared} live={false} />);
    expect(screen.getByText('New since baseline')).toBeTruthy();
    expect(screen.getByRole('switch', {name: 'New only'})).toBeTruthy();

    navigate('#/files/src/Users.tsx');
    expect(screen.getAllByText('New')).toHaveLength(1);
  });

  it('shows notices and the findings accepted by exceptions', () => {
    const withExceptions: Report = {
      ...report,
      notices: [{level: 'warning', message: 'The exception for no-direct-mui-imports on src/old/** expired on 2026-01-31.'}],
      suppressed: [{...report.findings[2], id: 'd', file: 'src/legacy/Old.tsx', exception: {reason: 'Replaced in the redesign.', files: ['src/legacy/**'], expires: '2027-06-30'}}],
    };

    render(<App initialReport={withExceptions} live={false} />);
    expect(screen.getByText(/expired on 2026-01-31/)).toBeTruthy();

    navigate('#/accepted');
    expect(screen.getByText('Replaced in the redesign.')).toBeTruthy();
    expect(screen.getByText('2027-06-30')).toBeTruthy();
    expect(document.title).toBe('Accepted findings | Oxygen UI report');
  });

  it('says when the project has no findings', () => {
    render(<App initialReport={{...report, findings: [], errors: []}} live={false} />);

    expect(screen.getByText(/No findings/)).toBeTruthy();
  });
});
