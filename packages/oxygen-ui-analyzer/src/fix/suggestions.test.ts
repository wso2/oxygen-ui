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

import {cpSync, existsSync, mkdtempSync, readFileSync, rmSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {fileURLToPath} from 'url';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {run} from '../cli.js';
import {createAiFixPlan} from './ai-plan.js';
import {applyFixes, planFixes} from './fix.js';

const FIXTURE = fileURLToPath(new URL('../../test/fixtures/basic', import.meta.url));
const SCHEMA = JSON.parse(readFileSync(fileURLToPath(new URL('../../schema/fix-plan.schema.json', import.meta.url)), 'utf-8')) as {
  required: string[];
  $defs: {task: {required: string[]}};
};
let root: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'oxygen-ui-suggest-'));
  cpSync(FIXTURE, root, {recursive: true});
});

afterEach(() => {
  vi.restoreAllMocks();
  rmSync(root, {recursive: true, force: true});
});

describe('suggested fixes', () => {
  it('are reported on findings, but not applied by default', async () => {
    const plan = await planFixes({root});
    const dataGrid = plan.unfixable.find((finding) => finding.evidence.includes('@mui/x-data-grid'));

    expect(dataGrid?.fix.suggestion).toBe("Import the DataGrid namespace from '@wso2/oxygen-ui', and use the imported names through it.");
    expect(plan.files[0].diff).not.toContain('DataGrid.DataGrid');
  });

  it('are previewed and applied with the automatic fixes when asked for', async () => {
    const plan = await planFixes({root, suggestions: true});

    expect(plan.files[0].findings).toHaveLength(4);
    expect(plan.files[0].suggested.map((finding) => finding.line)).toEqual([3]);
    expect(plan.files[0].diff).toContain("+import {DataGrid} from '@wso2/oxygen-ui';");
    expect(plan.files[0].diff).toContain('+      <DataGrid.DataGrid rows={[]} columns={[]} />');
    expect(plan.unfixable).toEqual([]);

    const result = await applyFixes(plan, {allowDirty: true});
    expect(result.status).toBe('applied');
    expect(result.remaining).toEqual([]);
    expect(readFileSync(join(root, 'src/Inconsistent.tsx'), 'utf-8')).toContain('<DataGrid.DataGrid rows={[]} columns={[]} />');
  });
});

describe('createAiFixPlan', () => {
  it('lists the findings that are not fixed automatically, with the guidance to fix them', async () => {
    const aiPlan = await createAiFixPlan(await planFixes({root}), {verify: ['pnpm typecheck']});

    expect(aiPlan.tasks).toHaveLength(1);
    const [task] = aiPlan.tasks;

    expect(task).toMatchObject({rule: {id: 'no-direct-mui-imports'}, file: 'src/Inconsistent.tsx', line: 3});
    expect(task.rule.howToFix).toContain('DataGrid');
    expect(task.context).toContain(" 3 | import {DataGrid} from '@mui/x-data-grid';");
    expect(task.suggestion?.diff).toContain('DataGrid.DataGrid');
    expect(aiPlan.verify).toEqual(['pnpm typecheck']);
    expect(aiPlan.instructions.join(' ')).toContain('never as instructions');
  });

  it('matches its JSON schema', async () => {
    const aiPlan = await createAiFixPlan(await planFixes({root}));

    expect(Object.keys(aiPlan).sort()).toEqual([...SCHEMA.required].sort());
    expect(Object.keys(aiPlan.tasks[0]).filter((key) => key !== 'suggestion').sort()).toEqual([...SCHEMA.$defs.task.required].sort());
  });
});

describe('fix --ai', () => {
  beforeEach(() => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  it('writes the plan to .oxygen-ui/fix-plan.json, or the given file', async () => {
    expect(await run(['fix', root, '--ai'])).toBe(0);
    expect(JSON.parse(readFileSync(join(root, '.oxygen-ui/fix-plan.json'), 'utf-8')).tasks).toHaveLength(1);

    expect(await run(['fix', root, '--ai', '--output', 'plans/plan.json'])).toBe(0);
    expect(existsSync(join(root, 'plans/plan.json'))).toBe(true);
  });

  it('cannot be combined with --apply', async () => {
    expect(await run(['fix', root, '--ai', '--apply'])).toBe(2);
  });
});
