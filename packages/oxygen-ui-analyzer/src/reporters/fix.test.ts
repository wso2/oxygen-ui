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

import {fileURLToPath} from 'url';
import {beforeAll, describe, expect, it} from 'vitest';
import {planFixes, type FixPlan, type FixResult} from '../fix/fix.js';
import {formatFixJson, formatFixPlan, formatFixResult} from './fix.js';

// Planning reads the fixture but never writes to it.
const FIXTURE = fileURLToPath(new URL('../../test/fixtures/basic', import.meta.url));

describe('fix formatters', () => {
  let plan: FixPlan;

  beforeAll(async () => {
    plan = await planFixes({root: FIXTURE});
  });

  const result = (overrides: Partial<FixResult>): FixResult => ({
    status: 'applied',
    files: ['src/Inconsistent.tsx'],
    fixed: 3,
    remaining: plan.unfixable,
    regressions: [],
    verification: [],
    report: plan.report,
    ...overrides,
  });

  it('previews the diff and says nothing was changed', () => {
    const output = formatFixPlan(plan);

    expect(output).toContain('Oxygen UI fix preview');
    expect(output).toContain("+import {Box} from '@wso2/oxygen-ui';");
    expect(output).toContain('3 findings in 1 file can be fixed.');
    expect(output).toContain('Run again with --apply to write the changes.');
    expect(output).toContain('1 other finding cannot be fixed automatically:');
    expect(output).toContain('1 needs a manual change');
  });

  it('leaves out the --apply hint while applying', () => {
    expect(formatFixPlan(plan, {applying: true})).not.toContain('--apply');
  });

  it('reports applied, rolled-back and refused results', () => {
    expect(formatFixResult(result({verification: [{command: 'pnpm typecheck', exitCode: 0}]}))).toContain(
      '✓ Fixed 3 findings in 1 file.',
    );
    expect(formatFixResult(result({}))).toContain('1 finding remains.');
    expect(formatFixResult(result({status: 'rolled-back', reason: '"pnpm test" failed with exit code 1.'}))).toContain(
      '✖ The changes were rolled back. "pnpm test" failed with exit code 1.',
    );
    expect(formatFixResult(result({status: 'refused', reason: 'There is nothing to fix.'}))).toContain(
      'Nothing was changed. There is nothing to fix.',
    );
  });

  it('formats the plan as JSON with finding ids and diffs', () => {
    const json = JSON.parse(formatFixJson(plan, result({})));

    expect(json.files).toHaveLength(1);
    expect(json.files[0].findings).toHaveLength(3);
    expect(json.files[0].diff).toContain('@@');
    expect(json.result).toMatchObject({status: 'applied', fixed: 3, remaining: 1});
  });
});
