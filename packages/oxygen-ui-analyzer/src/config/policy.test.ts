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

import {cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {fileURLToPath} from 'url';
import {rules} from '@wso2/oxygen-ui-rules';
import {afterEach, describe, expect, it} from 'vitest';
import {createBaseline} from '../baseline/baseline.js';
import {analyze} from '../engine/analyze.js';
import {applyFixes, planFixes} from '../fix/fix.js';
import {evaluateCheck} from '../reporters/check.js';
import {resolveConfig} from './load.js';

const FIXTURE = fileURLToPath(new URL('../../test/fixtures/basic', import.meta.url));
const config = (value: object) => resolveConfig('oxygen-ui-analyzer.config.js', value, rules);
const roots: string[] = [];

afterEach(() => roots.splice(0).forEach((root) => rmSync(root, {recursive: true, force: true})));

describe('rule settings', () => {
  it('changes a rule\'s severity, or turns it off', async () => {
    const report = await analyze({
      root: FIXTURE,
      config: config({rules: {'no-direct-lucide-imports': 'off', 'no-direct-mui-imports': 'warning'}}),
    });

    expect(report.findings.map((finding) => finding.ruleId)).not.toContain('no-direct-lucide-imports');
    expect(new Set(report.findings.map((finding) => finding.severity))).toEqual(new Set(['warning']));
    expect(report.rules.map((rule) => [rule.id, rule.severity])).toEqual([['no-direct-mui-imports', 'warning']]);
  });

  it('passes options to the rule', async () => {
    const report = await analyze({
      root: FIXTURE,
      config: config({rules: {'no-direct-mui-imports': {options: {allowedPackages: ['@mui/x-data-grid']}}}}),
    });

    expect(report.findings.map((finding) => finding.evidence)).not.toContain("import {DataGrid} from '@mui/x-data-grid';");
  });

  it('notes mandatory rules that are turned off', async () => {
    const report = await analyze({root: FIXTURE, config: config({rules: {'no-direct-lucide-imports': 'off'}})});

    expect(report.notices).toEqual([
      expect.objectContaining({level: 'warning', message: expect.stringContaining('mandatory rule no-direct-lucide-imports is turned off')}),
    ]);
  });
});

describe('exceptions', () => {
  const exception = {rule: 'no-direct-lucide-imports', files: ['src/Inconsistent.tsx'], reason: 'Waiting for the icon refresh.'};

  it('moves accepted findings to suppressed, with the reason', async () => {
    const report = await analyze({root: FIXTURE, config: config({exceptions: [exception]})});

    expect(report.findings.map((finding) => finding.ruleId)).not.toContain('no-direct-lucide-imports');
    expect(report.summary.findings).toBe(3);
    expect(report.suppressed).toEqual([
      expect.objectContaining({ruleId: 'no-direct-lucide-imports', exception: {reason: exception.reason, files: exception.files}}),
    ]);
  });

  it('reports findings again after the exception expires', async () => {
    const expiring = config({exceptions: [{...exception, expires: '2026-12-31'}]});

    const before = await analyze({root: FIXTURE, config: expiring, today: '2026-12-31'});
    const after = await analyze({root: FIXTURE, config: expiring, today: '2027-01-01'});

    expect(before.suppressed).toHaveLength(1);
    expect(after.suppressed).toHaveLength(0);
    expect(after.findings.map((finding) => finding.ruleId)).toContain('no-direct-lucide-imports');
    expect(after.notices[0].message).toContain('expired on 2026-12-31');
  });

  it('notes exceptions that match nothing', async () => {
    const report = await analyze({root: FIXTURE, config: config({exceptions: [{...exception, files: ['src/legacy/**']}]})});

    expect(report.notices[0]).toEqual({level: 'info', message: expect.stringContaining('matches no findings')});
  });

  it('are not fixed by fix', async () => {
    const root = mkdtempSync(join(tmpdir(), 'oxygen-ui-policy-'));
    roots.push(root);
    cpSync(FIXTURE, root, {recursive: true});

    const plan = await planFixes({root, config: config({exceptions: [exception]})});
    await applyFixes(plan, {allowDirty: true});

    const source = readFileSync(join(root, 'src/Inconsistent.tsx'), 'utf-8');
    expect(source).toContain("import {Home} from 'lucide-react';");
    expect(source).toContain("import {Box} from '@wso2/oxygen-ui';");
  });
});

describe('baseline and check', () => {
  it('marks known and new findings, and counts fixed ones', async () => {
    const original = await analyze({root: FIXTURE});
    const baseline = createBaseline(original.findings.slice(1), '0.0.1');
    baseline.findings.push({id: 'fixed-long-ago', ruleId: 'no-direct-mui-imports', file: 'src/Old.tsx'});

    const report = await analyze({root: FIXTURE, baseline: {path: '.oxygen-ui/baseline.json', baseline}});

    expect(report.findings.map((finding) => finding.status)).toEqual(['new', 'baseline', 'baseline', 'baseline']);
    expect(report.baseline).toEqual({path: '.oxygen-ui/baseline.json', known: 3, new: 1, fixed: 1});
  });

  it('fails only on new findings at or above the threshold', async () => {
    const original = await analyze({root: FIXTURE});
    const everything = {path: 'b.json', baseline: createBaseline(original.findings, '0.0.1')};
    const allButOne = {path: 'b.json', baseline: createBaseline(original.findings.slice(1), '0.0.1')};

    expect(evaluateCheck(await analyze({root: FIXTURE, baseline: everything}), 'error').passed).toBe(true);
    expect(evaluateCheck(await analyze({root: FIXTURE, baseline: allButOne}), 'error').failing).toHaveLength(1);

    const asWarnings = await analyze({root: FIXTURE, baseline: allButOne, config: config({rules: {'no-direct-mui-imports': 'warning'}})});
    expect(evaluateCheck(asWarnings, 'error').passed).toBe(true);
    expect(evaluateCheck(asWarnings, 'warning').passed).toBe(false);
  });

  it('treats every finding as new without a baseline', async () => {
    const result = evaluateCheck(await analyze({root: FIXTURE}), 'error');

    expect(result.failing).toHaveLength(4);
  });

  it('keeps finding ids when unrelated lines move', async () => {
    const root = mkdtempSync(join(tmpdir(), 'oxygen-ui-policy-'));
    roots.push(root);
    cpSync(FIXTURE, root, {recursive: true});

    const before = await analyze({root});
    const file = join(root, 'src/Inconsistent.tsx');
    writeFileSync(file, `// A new comment at the top\n\n${readFileSync(file, 'utf-8')}`);
    const after = await analyze({root, baseline: {path: 'b.json', baseline: createBaseline(before.findings, '0.0.1')}});

    expect(after.findings.every((finding) => finding.status === 'baseline')).toBe(true);
  });
});
