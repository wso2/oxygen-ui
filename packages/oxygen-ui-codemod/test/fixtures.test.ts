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

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { transformPathImports } from '../src/transform.js';
import { map } from './map.js';

const directory = path.join(import.meta.dirname, 'fixtures');
const read = (file: string) => readFileSync(path.join(directory, file), 'utf8');

const names = readdirSync(directory)
  .filter((file) => file.endsWith('.input.txt'))
  .map((file) => file.replace('.input.txt', ''));

describe('path-imports fixtures', () => {
  it.each(names)('%s', (name) => {
    const { source, reports } = transformPathImports(read(`${name}.input.txt`), map);
    expect(source).toBe(read(`${name}.output.txt`));

    const reportsFile = `${name}.reports.json`;
    const expected = existsSync(path.join(directory, reportsFile)) ? JSON.parse(read(reportsFile)) : [];
    expect(reports).toMatchObject(expected);
    expect(reports).toHaveLength(expected.length);
  });
});
