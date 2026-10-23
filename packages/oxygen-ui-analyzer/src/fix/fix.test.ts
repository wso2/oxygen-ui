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

import {spawnSync} from 'child_process';
import {cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {fileURLToPath} from 'url';
import {defineRule, rules as registry, type RuleDefinition} from '@wso2/oxygen-ui-rules';
import {afterEach, describe, expect, it} from 'vitest';
import {applyFixes, planFixes} from './fix.js';

const FIXTURE = fileURLToPath(new URL('../../test/fixtures/basic', import.meta.url));
const projects: string[] = [];

/** Copies the fixture project to a temporary directory, optionally as a committed git repository. */
function createProject({git = false} = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'oxygen-ui-fix-'));
  projects.push(root);
  cpSync(FIXTURE, root, {recursive: true});

  if (git) {
    const runGit = (...args: string[]) =>
      spawnSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.com', '-c', 'commit.gpgsign=false', ...args], {
        cwd: root,
      });
    runGit('init', '-q');
    runGit('add', '.');
    runGit('commit', '-q', '-m', 'Fixture');
  }

  return root;
}

const read = (root: string, file: string) => readFileSync(join(root, file), 'utf-8');

afterEach(() => {
  for (const root of projects.splice(0)) {
    rmSync(root, {recursive: true, force: true});
  }
});

describe('planFixes', () => {
  it('plans the safe fixes without changing any file', async () => {
    const root = createProject();
    const before = read(root, 'src/Inconsistent.tsx');
    const plan = await planFixes({root});

    expect(plan.files.map((fileFix) => [fileFix.file, fileFix.findings.length])).toEqual([['src/Inconsistent.tsx', 3]]);
    expect(plan.files[0].diff).toContain("-import {Box} from '@mui/material';");
    expect(plan.files[0].diff).toContain("+import {Box} from '@wso2/oxygen-ui';");
    expect(plan.files[0].diff).toContain("+import {Button as MuiButton} from '@wso2/oxygen-ui';");
    expect(plan.files[0].diff).toContain("+import {Home} from '@wso2/oxygen-ui-icons-react';");
    expect(read(root, 'src/Inconsistent.tsx')).toBe(before);
  });

  it('lists findings that cannot be fixed automatically', async () => {
    const plan = await planFixes({root: createProject()});

    expect(plan.unfixable.map((finding) => finding.evidence)).toEqual(["import {DataGrid} from '@mui/x-data-grid';"]);
  });

  it('only fixes the requested rules', async () => {
    const plan = await planFixes({root: createProject(), ruleIds: ['no-direct-lucide-imports']});

    expect(plan.files[0].findings.map((finding) => finding.ruleId)).toEqual(['no-direct-lucide-imports']);
    expect(plan.files[0].diff).not.toMatch(/^[-+]import .*'@mui\/material'/m);
    expect(plan.unfixable).toEqual([]);
  });

  it('rejects unknown rules', async () => {
    await expect(planFixes({root: createProject(), ruleIds: ['no-such-rule']})).rejects.toThrow('Unknown rule: no-such-rule');
  });

  it('fixes at most --limit files and reports the rest as skipped', async () => {
    const root = createProject();
    writeFileSync(join(root, 'src/Icons.tsx'), "import {Settings} from 'lucide-react';\n\nexport {Settings};\n");

    const plan = await planFixes({root, limit: 1});

    expect(plan.files.map((fileFix) => fileFix.file)).toEqual(['src/Icons.tsx']);
    expect(plan.skipped.map((finding) => finding.file)).toEqual(['src/Inconsistent.tsx', 'src/Inconsistent.tsx', 'src/Inconsistent.tsx']);
  });
});

describe('applyFixes', () => {
  it('writes the changes and reports what remains', async () => {
    const root = createProject({git: true});
    const result = await applyFixes(await planFixes({root}));

    expect(result.status).toBe('applied');
    expect(result.fixed).toBe(3);
    expect(result.regressions).toEqual([]);
    expect(result.remaining.map((finding) => finding.evidence)).toEqual(["import {DataGrid} from '@mui/x-data-grid';"]);
    expect(read(root, 'src/Inconsistent.tsx')).toContain("import {Box} from '@wso2/oxygen-ui';");
  });

  it('refuses to change files with uncommitted changes', async () => {
    const root = createProject({git: true});
    writeFileSync(join(root, 'src/Inconsistent.tsx'), `${read(root, 'src/Inconsistent.tsx')}// edited\n`);
    const edited = read(root, 'src/Inconsistent.tsx');

    const result = await applyFixes(await planFixes({root}));

    expect(result.status).toBe('refused');
    expect(result.reason).toContain('src/Inconsistent.tsx');
    expect(read(root, 'src/Inconsistent.tsx')).toBe(edited);
  });

  it('refuses outside a git repository unless dirty changes are allowed', async () => {
    const root = createProject();
    const plan = await planFixes({root});

    expect((await applyFixes(plan)).status).toBe('refused');
    expect((await applyFixes(plan, {allowDirty: true})).status).toBe('applied');
  });

  it('refuses when a file changed after the fixes were planned', async () => {
    const root = createProject({git: true});
    const plan = await planFixes({root});
    writeFileSync(join(root, 'src/Inconsistent.tsx'), "import {Box} from '@mui/material';\n");

    const result = await applyFixes(plan, {allowDirty: true});

    expect(result.status).toBe('refused');
    expect(result.reason).toContain('changed after the fixes were planned');
  });

  it('rolls the changes back when a verification command fails', async () => {
    const root = createProject({git: true});
    const before = read(root, 'src/Inconsistent.tsx');

    const result = await applyFixes(await planFixes({root}), {verify: ['node -e "process.exit(0)"', 'node -e "process.exit(3)"']});

    expect(result.status).toBe('rolled-back');
    expect(result.verification).toEqual([
      {command: 'node -e "process.exit(0)"', exitCode: 0},
      {command: 'node -e "process.exit(3)"', exitCode: 3},
    ]);
    expect(read(root, 'src/Inconsistent.tsx')).toBe(before);
  });

  it('rolls the changes back when they introduce new findings', async () => {
    // A safe fix that rewrites one disallowed import into another.
    const importRule = (id: string, from: string, to?: string): RuleDefinition =>
      defineRule({
        ...registry[0],
        meta: {...registry[0].meta, id},
        detect: {
          meta: {type: 'problem', fixable: 'code', schema: [], messages: {found: `Do not import ${from}.`}},
          create: (context) => ({
            ImportDeclaration(node) {
              if (node.source.value === from) {
                context.report({
                  node: node.source,
                  messageId: 'found',
                  ...(to ? {fix: (fixer) => fixer.replaceText(node.source, `'${to}'`)} : {}),
                });
              }
            },
          }),
        },
      });

    const root = createProject({git: true});
    const rules = [importRule('no-lucide', 'lucide-react', 'forbidden-icons'), importRule('no-forbidden-icons', 'forbidden-icons')];
    const before = read(root, 'src/Inconsistent.tsx');

    const result = await applyFixes(await planFixes({root, rules}));

    expect(result.status).toBe('rolled-back');
    expect(result.regressions.map((finding) => [finding.ruleId, finding.evidence])).toEqual([
      ['no-forbidden-icons', "import {Home} from 'forbidden-icons';"],
    ]);
    expect(read(root, 'src/Inconsistent.tsx')).toBe(before);
  });

  it('refuses when there is nothing to fix', async () => {
    const result = await applyFixes(await planFixes({root: createProject({git: true}), include: ['src/Clean.tsx']}));

    expect(result.status).toBe('refused');
    expect(result.reason).toBe('There is nothing to fix.');
  });
});
