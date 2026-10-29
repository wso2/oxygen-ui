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

import {mkdtempSync, rmSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {rules} from '@wso2/oxygen-ui-rules';
import {afterEach, describe, expect, it} from 'vitest';
import {loadConfig, resolveConfig} from './load.js';

const dirs: string[] = [];
afterEach(() => dirs.splice(0).forEach((dir) => rmSync(dir, {recursive: true, force: true})));

function project(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'oxygen-ui-config-'));
  dirs.push(root);
  for (const [file, content] of Object.entries(files)) writeFileSync(join(root, file), content);
  return root;
}

describe('loadConfig', () => {
  it('uses the defaults when the project has no config', async () => {
    expect(await loadConfig(project({}))).toEqual({
      path: null,
      include: undefined,
      ignore: [],
      rules: {},
      exceptions: [],
      baseline: '.oxygen-ui/baseline.json',
      failOn: 'error',
      verify: [],
    });
  });

  it('loads a JavaScript config', async () => {
    const root = project({
      'oxygen-ui-analyzer.config.js': `export default {
        ignore: ['src/legacy/**'],
        rules: {'no-direct-lucide-imports': 'warning', 'no-direct-mui-imports': {options: {allowedPackages: ['@mui/x-date-pickers']}}},
        failOn: 'warning',
      };`,
      'package.json': '{"type": "module"}',
    });

    const config = await loadConfig(root);

    expect(config.path).toBe(join(root, 'oxygen-ui-analyzer.config.js'));
    expect(config.ignore).toEqual(['src/legacy/**']);
    expect(config.rules).toEqual({
      'no-direct-lucide-imports': {severity: 'warning'},
      'no-direct-mui-imports': {options: {allowedPackages: ['@mui/x-date-pickers']}},
    });
    expect(config.failOn).toBe('warning');
  });

  it('loads a JSON config, or the file given', async () => {
    const root = project({'custom.json': '{"verify": ["pnpm typecheck"]}'});

    expect((await loadConfig(root, 'custom.json')).verify).toEqual(['pnpm typecheck']);
  });

  it('reports a config file that does not load', async () => {
    const root = project({'oxygen-ui-analyzer.config.json': '{not json'});

    await expect(loadConfig(root)).rejects.toThrow('The config file could not be loaded');
  });
});

describe('resolveConfig', () => {
  const invalid = (config: unknown) => () => resolveConfig('config.js', config, rules);

  it.each([
    [[], 'must export an object'],
    [{rule: {}}, 'Unknown option "rule"'],
    [{rules: {'no-such-rule': 'error'}}, 'unknown rule "no-such-rule"'],
    [{rules: {'no-direct-mui-imports': 'fatal'}}, 'unknown severity "fatal"'],
    [{exceptions: [{rule: 'no-direct-mui-imports', files: ['src/**']}]}, 'needs a "reason"'],
    [{exceptions: [{rule: 'no-direct-mui-imports', files: [], reason: 'Why'}]}, 'needs "files"'],
    [{exceptions: [{rule: 'no-direct-mui-imports', files: ['a'], reason: 'Why', expires: '31/12/2026'}]}, 'invalid "expires" date'],
    [{baseline: '/tmp/baseline.json'}, 'relative to the project root'],
    [{failOn: 'fatal'}, '"failOn" must be error, warning or info'],
    [{ignore: 'src/legacy/**'}, '"ignore" must be a list'],
  ])('rejects %j', (config, message) => {
    expect(invalid(config)).toThrow(message);
  });
});
