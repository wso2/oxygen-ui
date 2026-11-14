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

// @vitest-environment node

import { existsSync, globSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('../..', import.meta.url));
const distribution = join(packageRoot, 'dist');
const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));

const builtModules = (): string[] =>
  globSync('**/*.js', { cwd: distribution }).filter(file => !file.startsWith('_virtual/'));

describe('built package layout', () => {
  it('has one module per source module, in the source directory layout', () => {
    const modulesWithoutSource = builtModules().filter(file => {
      const base = file.replace(/\.js$/, '');
      return !['.ts', '.tsx', '.css'].some(extension => existsSync(join(packageRoot, 'src', base + extension)))
        && file !== 'package.json.js';
    });

    expect(modulesWithoutSource).toEqual([]);
    expect(builtModules()).toContain('components/TextField/TextField.js');
  });

  it('gives every relative import its file extension', () => {
    const relativeSpecifier = /(?:from|import)\s*["'](\.{1,2}\/[^"']+)["']/g;
    const withoutExtension = builtModules().flatMap(file => {
      const code = readFileSync(join(distribution, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
      return [...code.matchAll(relativeSpecifier)]
        .map(match => match[1])
        .filter(specifier => !existsSync(join(distribution, dirname(file), specifier)) || !/\.js$/.test(specifier))
        .map(specifier => `${file}: ${specifier}`);
    });

    expect(withoutExtension).toEqual([]);
  });

  it('exports only the root, with types and an ESM import condition', () => {
    expect(manifest.exports).toEqual({ '.': { types: './dist/index.d.ts', import: './dist/index.js' } });
  });

  it('lists as side effects only modules that exist', () => {
    expect(manifest.sideEffects.filter((file: string) => !existsSync(join(packageRoot, file)))).toEqual([]);
  });

  it('carries the package version without the package manifest', () => {
    const versionModule = readFileSync(join(distribution, 'package.json.js'), 'utf8');

    expect(versionModule).toContain(`"${manifest.version}"`);
    expect(versionModule).not.toContain('dependencies');
  });
});
