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

import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {beforeAll, describe, expect, it} from 'vitest';
import {analyze} from './engine/analyze.js';
import type {Report} from './report/types.js';
import {formatTerminal} from './reporters/terminal.js';

const FIXTURE = fileURLToPath(new URL('../test/fixtures/basic', import.meta.url));

describe('analyze', () => {
  let report: Report;

  beforeAll(async () => {
    report = await analyze({root: FIXTURE});
  });

  it('describes the project and the tool', () => {
    expect(report.schemaVersion).toBe(1);
    expect(report.project.name).toBe('fixture-basic');
    expect(report.tool.name).toBe('@wso2/oxygen-ui-analyzer');
    expect(report.ruleset.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('skips test files by default', () => {
    expect(report.findings.map((finding) => finding.file)).not.toContain('src/Inconsistent.test.tsx');
    expect(report.summary.filesAnalyzed).toBe(4);
  });

  it('reports each inconsistent import with its position and evidence', () => {
    const findings = report.findings.filter((finding) => finding.file === 'src/Inconsistent.tsx');

    expect(findings.map((finding) => [finding.ruleId, finding.line, finding.evidence])).toEqual([
      ['no-direct-mui-imports', 1, "import {Box} from '@mui/material';"],
      ['no-direct-mui-imports', 2, "import MuiButton from '@mui/material/Button';"],
      ['no-direct-mui-imports', 3, "import {DataGrid} from '@mui/x-data-grid';"],
      ['no-direct-lucide-imports', 4, "import {Home} from 'lucide-react';"],
    ]);
  });

  it('takes the category, severity and fix type from the rule', () => {
    const finding = report.findings.find((candidate) => candidate.line === 1)!;

    expect(finding).toMatchObject({
      category: 'imports',
      severity: 'error',
      confidence: 'high',
      kind: 'deterministic',
      fix: {type: 'safe', available: true},
    });
  });

  it('marks findings without an automatic fix', () => {
    const dataGrid = report.findings.find((finding) => finding.line === 3)!;

    expect(dataGrid.fix.available).toBe(false);
  });

  it('respects disable comments and ignores other plugins\' rules', () => {
    expect(report.findings.filter((finding) => finding.file === 'src/Suppressed.tsx')).toEqual([]);
  });

  it('reports files that cannot be parsed as errors, not findings', () => {
    expect(report.errors).toHaveLength(1);
    expect(report.errors[0]).toMatchObject({file: 'src/Broken.tsx'});
  });

  it('gives findings stable ids that do not depend on the line number', async () => {
    const again = await analyze({root: FIXTURE});

    expect(again.findings.map((finding) => finding.id)).toEqual(report.findings.map((finding) => finding.id));
    expect(new Set(report.findings.map((finding) => finding.id)).size).toBe(report.findings.length);
  });

  it('summarises findings by severity and category', () => {
    expect(report.summary).toEqual({
      filesAnalyzed: 4,
      filesWithFindings: 1,
      findings: 4,
      bySeverity: {error: 4, warning: 0, info: 0},
      byCategory: {imports: 4},
    });
  });

  it('includes each rule with its documentation and finding count', () => {
    const rule = report.rules.find((candidate) => candidate.id === 'no-direct-lucide-imports')!;

    expect(rule.findings).toBe(1);
    expect(rule.docs).toContain('## How to fix');
  });

  it('honours include and ignore options', async () => {
    const onlyClean = await analyze({root: FIXTURE, include: ['src/Clean.tsx']});
    const withoutInconsistent = await analyze({root: FIXTURE, ignore: ['src/Inconsistent.tsx']});

    expect(onlyClean.summary.filesAnalyzed).toBe(1);
    expect(onlyClean.findings).toEqual([]);
    expect(withoutInconsistent.findings).toEqual([]);
  });
});

describe('report schema', () => {
  const schema = JSON.parse(
    readFileSync(fileURLToPath(new URL('../schema/report.schema.json', import.meta.url)), 'utf-8'),
  ) as {required: string[]; $defs: {finding: {required: string[]}; rule: {required: string[]}}};

  it('lists every top-level field the analyzer writes', async () => {
    const report = await analyze({root: FIXTURE});

    expect(Object.keys(report).sort()).toEqual([...schema.required].sort());
    expect(Object.keys(report.findings[0]).filter((key) => !key.startsWith('end')).sort()).toEqual(
      [...schema.$defs.finding.required].sort(),
    );
    expect(Object.keys(report.rules[0]).sort()).toEqual([...schema.$defs.rule.required].sort());
  });
});

describe('formatTerminal', () => {
  it('groups findings by file and ends with a summary', async () => {
    const output = formatTerminal(await analyze({root: FIXTURE}));

    expect(output).toContain('src/Inconsistent.tsx');
    expect(output).toContain('1:19    error');
    expect(output).toContain('✖ 4 findings in 1 of 4 files (4 errors)');
    expect(output).toContain('3 findings can be fixed automatically.');
    expect(output).toContain('1 file could not be analyzed.');
  });

  it('reports a clean project', async () => {
    const output = formatTerminal(await analyze({root: FIXTURE, include: ['src/Clean.tsx']}));

    expect(output).toContain('✓ No findings in 1 file');
  });
});
