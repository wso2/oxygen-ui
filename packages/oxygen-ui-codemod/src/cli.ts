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

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { PathMapError, requireInstalledPathMap } from '@wso2/oxygen-ui-path-map';
import { findBarrelImports, transformPathImports } from './transform.js';

export interface CliEnvironment {
  cwd: string;
  stdout: (text: string) => void;
  stderr: (text: string) => void;
}

const SOURCE_EXTENSION = /\.(?:[cm]?[jt]s|[jt]sx)$/;
const SKIPPED_DIRECTORIES = new Set(['node_modules', 'dist', 'build', 'coverage', '.git', '.next']);

const USAGE = 'Usage: oxygen-ui-codemod path-imports [--check] [paths...]';

const sourceFilesUnder = (target: string): string[] => {
  if (statSync(target).isFile()) return [target];
  return readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return SKIPPED_DIRECTORIES.has(entry.name) ? [] : sourceFilesUnder(path.join(target, entry.name));
    }
    return SOURCE_EXTENSION.test(entry.name) ? [path.join(target, entry.name)] : [];
  });
};

export const runCli = async (args: string[], env: CliEnvironment): Promise<number> => {
  const [command, ...rest] = args;
  if (command !== 'path-imports') {
    env.stderr(`Unknown transform "${command ?? ''}". ${USAGE}`);
    return 2;
  }

  const unknown = rest.find((arg) => arg.startsWith('-') && arg !== '--check');
  if (unknown !== undefined) {
    env.stderr(`Unknown option "${unknown}". ${USAGE}`);
    return 2;
  }

  const check = rest.includes('--check');
  const targets = rest.filter((arg) => !arg.startsWith('-'));
  const roots = (targets.length > 0 ? targets : ['.']).map((target) => path.resolve(env.cwd, target));

  let map;
  try {
    map = requireInstalledPathMap(env.cwd);
  } catch (error) {
    if (!(error instanceof PathMapError)) throw error;
    env.stderr(error.message);
    return 2;
  }

  const relative = (file: string) => path.relative(env.cwd, file);
  let changed = 0;
  let remaining = 0;

  for (const file of roots.flatMap(sourceFilesUnder)) {
    const source = readFileSync(file, 'utf8');
    if (check) {
      for (const line of findBarrelImports(source, map)) {
        env.stdout(`${relative(file)}:${line}  barrel import of @wso2/oxygen-ui`);
        remaining++;
      }
      continue;
    }
    const result = transformPathImports(source, map);
    for (const report of result.reports) {
      env.stdout(`${relative(file)}:${report.line}  ${report.message}`);
    }
    if (result.source !== source) {
      writeFileSync(file, result.source);
      changed++;
    }
  }

  if (check) {
    env.stdout(
      remaining > 0 ? `${remaining} barrel import${remaining === 1 ? ' remains' : 's remain'}.` : 'No barrel imports remain.',
    );
    return remaining > 0 ? 1 : 0;
  }
  env.stdout(`Changed ${changed} file${changed === 1 ? '' : 's'}.`);
  return 0;
};
