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

import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** The root of the repository, for the tests that scan source text. */
export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');

/**
 * The files under a folder, at any depth, whose name matches `extensions`, leaving out test files. The
 * tests that guard the source read text from them rather than going through a module.
 */
export const sourceFilesUnder = (directory: string, extensions = /\.(ts|tsx)$/): string[] =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);

    if (statSync(path).isDirectory()) return sourceFilesUnder(path, extensions);

    return extensions.test(entry) && !entry.includes('.test.') ? [path] : [];
  });
