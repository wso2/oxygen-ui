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
import {diffLines, formatUnifiedDiff} from './diff.js';

describe('diffLines', () => {
  it('finds no changes in equal texts', () => {
    expect(diffLines('a\nb\n', 'a\nb\n').every((operation) => operation.type === 'equal')).toBe(true);
  });

  it('finds replaced, inserted and deleted lines', () => {
    expect(diffLines('a\nb\nc\n', 'a\nB\nc\nd\n')).toEqual([
      {type: 'equal', line: 'a'},
      {type: 'delete', line: 'b'},
      {type: 'insert', line: 'B'},
      {type: 'equal', line: 'c'},
      {type: 'insert', line: 'd'},
    ]);
    expect(diffLines('a\nb\n', '')).toEqual([
      {type: 'delete', line: 'a'},
      {type: 'delete', line: 'b'},
    ]);
  });
});

describe('formatUnifiedDiff', () => {
  const lines = (count: number) => Array.from({length: count}, (_, index) => `line ${index + 1}`);

  it('returns an empty string when nothing changed', () => {
    expect(formatUnifiedDiff('a.ts', 'x\n', 'x\n')).toBe('');
  });

  it('formats a change with context lines', () => {
    const before = `${lines(10).join('\n')}\n`;
    const after = before.replace('line 5', 'line five');

    expect(formatUnifiedDiff('src/a.ts', before, after)).toBe(
      [
        '--- a/src/a.ts',
        '+++ b/src/a.ts',
        '@@ -2,7 +2,7 @@',
        ' line 2',
        ' line 3',
        ' line 4',
        '-line 5',
        '+line five',
        ' line 6',
        ' line 7',
        ' line 8',
        '',
      ].join('\n'),
    );
  });

  it('splits distant changes into separate hunks and keeps close ones together', () => {
    const before = `${lines(30).join('\n')}\n`;
    const distant = before.replace('line 2\n', 'line two\n').replace('line 25', 'line twenty-five');
    const close = before.replace('line 2\n', 'line two\n').replace('line 7\n', 'line seven\n');

    expect(formatUnifiedDiff('a.ts', before, distant).match(/^@@/gm)).toHaveLength(2);
    expect(formatUnifiedDiff('a.ts', before, close).match(/^@@/gm)).toHaveLength(1);
    expect(formatUnifiedDiff('a.ts', before, distant)).toContain('@@ -22,7 +22,7 @@');
  });
});
