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

import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { runCli } from '../src/cli.js';

const map = {
  Button: { path: '@wso2/oxygen-ui/Button', kind: 'default', typeOnly: false },
  TextField: { path: '@wso2/oxygen-ui/TextField', kind: 'default', typeOnly: false },
};

const BARREL_FILE = `import { Button } from '@wso2/oxygen-ui';\n`;
const MIGRATED_FILE = `import Button from '@wso2/oxygen-ui/Button';\n`;

let app: string;

const writeApp = (files: Record<string, string>, installMap: boolean | 'none' = true) => {
  const oxygen = path.join(app, 'node_modules/@wso2/oxygen-ui');
  mkdirSync(path.join(oxygen, 'dist'), { recursive: true });
  const exportsField = installMap ? { './path-map.json': './dist/path-map.json' } : {};
  writeFileSync(
    path.join(oxygen, 'package.json'),
    JSON.stringify({ name: '@wso2/oxygen-ui', version: '0.23.1', exports: exportsField }),
  );
  if (installMap) writeFileSync(path.join(oxygen, 'dist/path-map.json'), JSON.stringify(map));
  for (const [name, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(app, name)), { recursive: true });
    writeFileSync(path.join(app, name), content);
  }
};

const run = async (...args: string[]) => {
  let out = '';
  let err = '';
  const code = await runCli(args, {
    cwd: app,
    stdout: (text) => (out += `${text}\n`),
    stderr: (text) => (err += `${text}\n`),
  });
  return { code, out, err };
};

const read = (name: string) => readFileSync(path.join(app, name), 'utf8');

beforeEach(() => {
  app = mkdtempSync(path.join(tmpdir(), 'oxygen-codemod-'));
});

describe('path-imports', () => {
  it('rewrites barrel imports, reports how many files it changed, and exits zero', async () => {
    writeApp({ 'src/a.tsx': BARREL_FILE, 'src/b.ts': MIGRATED_FILE, 'src/c.ts': 'export {};\n' });
    const { code, out } = await run('path-imports');
    expect(code).toBe(0);
    expect(out).toContain('Changed 1 file');
    expect(read('src/a.tsx')).toBe(MIGRATED_FILE);
  });

  it('leaves node_modules and build output alone', async () => {
    writeApp({ 'node_modules/dep/index.js': BARREL_FILE, 'dist/out.js': BARREL_FILE });
    const { code, out } = await run('path-imports');
    expect(code).toBe(0);
    expect(out).toContain('Changed 0 files');
    expect(read('node_modules/dep/index.js')).toBe(BARREL_FILE);
    expect(read('dist/out.js')).toBe(BARREL_FILE);
  });

  it('limits the run to the paths it is given', async () => {
    writeApp({ 'src/a.tsx': BARREL_FILE, 'other/b.tsx': BARREL_FILE });
    await run('path-imports', 'src');
    expect(read('src/a.tsx')).toBe(MIGRATED_FILE);
    expect(read('other/b.tsx')).toBe(BARREL_FILE);
  });

  it('says so when the installed Oxygen package has no path map', async () => {
    writeApp({ 'src/a.tsx': BARREL_FILE }, false);
    const { code, err } = await run('path-imports');
    expect(code).not.toBe(0);
    expect(err).toContain('0.23.1');
    expect(err).toContain('path map');
    expect(read('src/a.tsx')).toBe(BARREL_FILE);
  });

  it('says so when Oxygen is not installed', async () => {
    const { code, err } = await run('path-imports');
    expect(code).not.toBe(0);
    expect(err).toContain('@wso2/oxygen-ui is not installed');
  });

  it.each(['--chek', '--dry-run', '--help', '-h', '-c'])('rejects the option %s and writes nothing', async (option) => {
    writeApp({ 'src/a.tsx': BARREL_FILE });
    const { code, err } = await run('path-imports', option);
    expect(code).toBe(2);
    expect(err).toContain(`Unknown option "${option}"`);
    expect(read('src/a.tsx')).toBe(BARREL_FILE);
  });

  it('rejects an unknown transform', async () => {
    writeApp({});
    const { code, err } = await run('nope');
    expect(code).not.toBe(0);
    expect(err).toContain('path-imports');
  });
});

describe('path-imports --check', () => {
  it('writes nothing, lists each remaining barrel import with file and line, and fails', async () => {
    writeApp({ 'src/a.tsx': `import x from 'x';\n${BARREL_FILE}` });
    const { code, out } = await run('path-imports', '--check');
    expect(code).toBe(1);
    expect(out).toContain(`${path.join('src', 'a.tsx')}:2`);
    expect(read('src/a.tsx')).toBe(`import x from 'x';\n${BARREL_FILE}`);
  });

  it('exits zero on a migrated app', async () => {
    writeApp({ 'src/a.tsx': MIGRATED_FILE });
    const { code } = await run('path-imports', '--check');
    expect(code).toBe(0);
  });

  it('counts every reported case, dynamic imports, requires and unknown names included', async () => {
    writeApp({
      'src/a.tsx': [
        `import * as O from '@wso2/oxygen-ui';`,
        `const lazy = import('@wso2/oxygen-ui');`,
        `const cjs = require('@wso2/oxygen-ui');`,
        `import { Missing } from '@wso2/oxygen-ui';`,
        ``,
      ].join('\n'),
    });
    const { code, out } = await run('path-imports', '--check');
    expect(code).toBe(1);
    for (const line of [1, 2, 3, 4]) expect(out).toContain(`${path.join('src', 'a.tsx')}:${line}`);
  });

  it('lists a barrel import the transform cannot rewrite', async () => {
    writeApp({ 'src/a.tsx': `import * as O from '@wso2/oxygen-ui';\n` });
    const { code, out } = await run('path-imports', '--check');
    expect(code).toBe(1);
    expect(out).toContain(`${path.join('src', 'a.tsx')}:1`);
  });
});

describe('path-imports reporting without --check', () => {
  it('lists what it could not rewrite and still exits zero', async () => {
    writeApp({ 'src/a.tsx': `import * as O from '@wso2/oxygen-ui';\n` });
    const { code, out } = await run('path-imports');
    expect(code).toBe(0);
    expect(out).toContain(`${path.join('src', 'a.tsx')}:1`);
  });
});
