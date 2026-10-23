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

import {existsSync, readdirSync, readFileSync, statSync} from 'fs';
import {join, relative, resolve, sep} from 'path';
import {fileURLToPath} from 'url';

/** The root of the Oxygen UI repository. */
export const REPO_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../..');

/** The `@wso2/oxygen-ui-rules` package directory. */
export const RULES_PACKAGE_DIR = resolve(REPO_ROOT, 'packages/oxygen-ui-rules');

/** Formats a path relative to the repository root, with forward slashes. */
export function repoPath(path) {
  return relative(REPO_ROOT, path).split(sep).join('/');
}

/**
 * Returns the packages under `packages/` that are published, that is, not marked private.
 *
 * @returns {{name: string, dir: string}[]}
 */
export function listPublishablePackages() {
  const packagesDir = join(REPO_ROOT, 'packages');

  return readdirSync(packagesDir)
    .map((entry) => join(packagesDir, entry, 'package.json'))
    .filter((manifest) => existsSync(manifest))
    .map((manifest) => ({manifest, pkg: JSON.parse(readFileSync(manifest, 'utf-8'))}))
    .filter(({pkg}) => !pkg.private)
    .map(({manifest, pkg}) => ({name: pkg.name, dir: resolve(manifest, '..')}))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns the guides in the Oxygen UI Storybook: stories whose title starts with `Guides/`.
 *
 * @returns {{id: string, file: string}[]}
 */
export function listGuides() {
  const storiesDir = join(REPO_ROOT, 'packages/oxygen-ui-docs/stories');
  const guides = [];

  for (const file of walk(storiesDir)) {
    if (!/\.stories\.(t|j)sx?$/.test(file)) {
      continue;
    }

    // The meta title is the first `title: 'Guides/...'` in the file.
    const match = /\btitle:\s*(['"`])(Guides\/[^'"`]+)\1/.exec(readFileSync(file, 'utf-8'));

    if (match) {
      guides.push({id: match[2], file});
    }
  }

  return guides.sort((a, b) => a.id.localeCompare(b.id));
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);

    if (statSync(path).isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}
