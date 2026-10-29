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

import {cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {fileURLToPath} from 'url';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {run} from './cli.js';

const FIXTURE = fileURLToPath(new URL('../test/fixtures/basic', import.meta.url));
let root: string;
let output: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'oxygen-ui-cli-'));
  cpSync(FIXTURE, root, {recursive: true});
  // The fixture's unparsable file is not needed here.
  rmSync(join(root, 'src/Broken.tsx'));
  output = '';
  const capture = (chunk: string | Uint8Array) => {
    output += chunk.toString();
    return true;
  };
  vi.spyOn(process.stdout, 'write').mockImplementation(capture);
  vi.spyOn(process.stderr, 'write').mockImplementation(capture);
});

afterEach(() => {
  vi.restoreAllMocks();
  rmSync(root, {recursive: true, force: true});
});

const cli = async (...args: string[]) => {
  output = '';
  return run(args);
};

describe('the adoption flow', () => {
  it('initialises, records a baseline, and then only fails on new findings', async () => {
    expect(await cli('init', root)).toBe(0);
    expect(existsSync(join(root, 'oxygen-ui-analyzer.config.js'))).toBe(true);
    expect(output).toContain('"oxygen:check": "oxygen-ui-analyzer check"');

    // The existing findings fail check until they are recorded.
    expect(await cli('check', root, '--no-color')).toBe(1);
    expect(output).toContain('4 new findings at or above error severity.');
    expect(output).toContain('There is no baseline');

    expect(await cli('baseline', root)).toBe(0);
    expect(output).toContain('Created .oxygen-ui/baseline.json with 4 findings.');
    expect(await cli('check', root, '--no-color')).toBe(0);
    expect(output).toContain('4 known findings in the baseline');

    // New code adds a finding.
    writeFileSync(join(root, 'src/Clean.tsx'), "import {Settings} from 'lucide-react';\n\nexport {Settings};\n");
    expect(await cli('check', root, '--no-color')).toBe(1);
    expect(output).toContain('src/Clean.tsx:1:24');
    expect(output).toContain('1 new finding at or above error severity.');

    // Fixing the new finding and one baseline finding passes, and prune records the fix.
    expect(await cli('fix', root, '--apply', '--allow-dirty', '--rule', 'no-direct-lucide-imports', '--no-color')).toBe(0);
    expect(await cli('check', root, '--no-color')).toBe(0);
    expect(output).toContain('1 baseline finding fixed. Run oxygen-ui-analyzer baseline --prune');

    expect(await cli('baseline', root, '--prune')).toBe(0);
    expect(output).toContain('Removed 1 fixed findings from .oxygen-ui/baseline.json. 3 remain.');
    expect(JSON.parse(readFileSync(join(root, '.oxygen-ui/baseline.json'), 'utf-8')).findings).toHaveLength(3);
  });

  it('never overwrites an existing config', async () => {
    writeFileSync(join(root, 'oxygen-ui-analyzer.config.json'), '{}');

    expect(await cli('init', root)).toBe(0);
    expect(output).toContain('already exists, so nothing was changed.');
    expect(existsSync(join(root, 'oxygen-ui-analyzer.config.js'))).toBe(false);
  });

  it('uses the config for every command', async () => {
    writeFileSync(
      join(root, 'oxygen-ui-analyzer.config.json'),
      JSON.stringify({exceptions: [{rule: 'no-direct-mui-imports', files: ['src/**'], reason: 'Migrating in Q1.'}]}),
    );

    expect(await cli('check', root, '--no-color')).toBe(1);
    expect(output).toContain('1 new finding');
    expect(output).toContain('3 findings accepted by exceptions in the config.');
  });

  it('reports check results as JSON', async () => {
    expect(await cli('check', root, '--format', 'json')).toBe(1);

    expect(JSON.parse(output)).toMatchObject({passed: false, failOn: 'error', newFindings: 4, baseline: null});
  });
});

describe('errors', () => {
  it('rejects options that a command does not accept', async () => {
    expect(await cli('analyze', root, '--apply')).toBe(2);
    expect(output).toContain('The analyze command does not accept --apply.');
    expect(await cli('build', root, '--format', 'json')).toBe(2);
    expect(await cli('init', root, '--config', 'x.js')).toBe(2);
  });

  it('reports an invalid config', async () => {
    writeFileSync(join(root, 'oxygen-ui-analyzer.config.json'), JSON.stringify({rules: {'no-such-rule': 'off'}}));

    expect(await cli('analyze', root)).toBe(2);
    expect(output).toContain('unknown rule "no-such-rule"');
  });

  it('cannot prune a baseline that does not exist', async () => {
    expect(await cli('baseline', root, '--prune')).toBe(2);
    expect(output).toContain('There is no baseline');
  });

  it('rejects an unknown failure threshold', async () => {
    expect(await cli('check', root, '--fail-on', 'fatal')).toBe(2);
  });
});
