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

import {describe, expect, it} from 'vitest';
import {matchesAny} from './glob.js';

describe('matchesAny', () => {
  it.each([
    ['src/legacy/**', 'src/legacy/Old.tsx', true],
    ['src/legacy/**', 'src/legacy/deep/Old.tsx', true],
    ['src/legacy/**', 'src/legacyish/Old.tsx', false],
    ['**/*.stories.tsx', 'Button.stories.tsx', true],
    ['**/*.stories.tsx', 'src/a/Button.stories.tsx', true],
    ['src/*.tsx', 'src/App.tsx', true],
    ['src/*.tsx', 'src/pages/App.tsx', false],
    ['src/**/*.{ts,tsx}', 'src/a/b.ts', true],
    ['src/**/*.{ts,tsx}', 'src/b.tsx', true],
    ['src/**/*.{ts,tsx}', 'src/b.js', false],
    ['src/App?.tsx', 'src/App1.tsx', true],
    ['./src/App.tsx', 'src/App.tsx', true],
    ['src/[x].tsx', 'src/[x].tsx', true],
  ])('%s matches %s: %s', (pattern, path, expected) => {
    expect(matchesAny(path, [pattern])).toBe(expected);
  });
});
