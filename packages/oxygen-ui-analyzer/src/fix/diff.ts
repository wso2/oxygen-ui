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

export interface DiffOperation {
  type: 'equal' | 'delete' | 'insert';
  line: string;
}

/**
 * Computes a shortest line diff between two texts with the Myers algorithm.
 */
export function diffLines(before: string, after: string): DiffOperation[] {
  const a = splitLines(before);
  const b = splitLines(after);
  const max = a.length + b.length;
  const trace: Map<number, number>[] = [];
  const v = new Map<number, number>([[1, 0]]);

  for (let d = 0; d <= max; d += 1) {
    trace.push(new Map(v));

    for (let k = -d; k <= d; k += 2) {
      const down = k === -d || (k !== d && (v.get(k - 1) as number) < (v.get(k + 1) as number));
      let x = down ? (v.get(k + 1) as number) : (v.get(k - 1) as number) + 1;
      let y = x - k;

      while (x < a.length && y < b.length && a[x] === b[y]) {
        x += 1;
        y += 1;
      }

      v.set(k, x);

      if (x >= a.length && y >= b.length) {
        return backtrack(trace, a, b);
      }
    }
  }

  return [];
}

function backtrack(trace: Map<number, number>[], a: string[], b: string[]): DiffOperation[] {
  const operations: DiffOperation[] = [];
  let x = a.length;
  let y = b.length;

  for (let d = trace.length - 1; d >= 0; d -= 1) {
    const v = trace[d];
    const k = x - y;
    const down = k === -d || (k !== d && (v.get(k - 1) as number) < (v.get(k + 1) as number));
    const previousK = down ? k + 1 : k - 1;
    const previousX = v.get(previousK) as number;
    const previousY = previousX - previousK;

    while (x > previousX && y > previousY) {
      operations.push({type: 'equal', line: a[x - 1]});
      x -= 1;
      y -= 1;
    }

    if (d > 0) {
      operations.push(x === previousX ? {type: 'insert', line: b[y - 1]} : {type: 'delete', line: a[x - 1]});
    }

    x = previousX;
    y = previousY;
  }

  return operations.reverse();
}

function splitLines(text: string): string[] {
  return text === '' ? [] : text.replace(/\n$/, '').split('\n');
}

/**
 * Formats the changes between two versions of a file as a unified diff, with the given number of
 * unchanged context lines around each change. Returns an empty string if nothing changed.
 */
export function formatUnifiedDiff(file: string, before: string, after: string, context = 3): string {
  const operations = diffLines(before, after);
  const changed = operations.map((operation, index) => (operation.type === 'equal' ? -1 : index)).filter((index) => index >= 0);

  if (changed.length === 0) {
    return '';
  }

  // Group changes whose context would overlap into one hunk.
  const groups: [number, number][] = [];
  for (const index of changed) {
    const last = groups[groups.length - 1];

    if (last && index - last[1] <= context * 2 + 1) {
      last[1] = index;
    } else {
      groups.push([index, index]);
    }
  }

  // Line numbers before each operation, in the old and new file.
  const oldLine: number[] = [];
  const newLine: number[] = [];
  let oldCount = 0;
  let newCount = 0;
  for (const operation of operations) {
    oldLine.push(oldCount);
    newLine.push(newCount);
    if (operation.type !== 'insert') oldCount += 1;
    if (operation.type !== 'delete') newCount += 1;
  }

  const output = [`--- a/${file}`, `+++ b/${file}`];

  for (const [first, last] of groups) {
    const start = Math.max(first - context, 0);
    const end = Math.min(last + context, operations.length - 1);
    const hunk = operations.slice(start, end + 1);
    const oldLength = hunk.filter((operation) => operation.type !== 'insert').length;
    const newLength = hunk.filter((operation) => operation.type !== 'delete').length;
    const oldStart = oldLength === 0 ? oldLine[start] : oldLine[start] + 1;
    const newStart = newLength === 0 ? newLine[start] : newLine[start] + 1;

    output.push(`@@ -${oldStart},${oldLength} +${newStart},${newLength} @@`);
    for (const operation of hunk) {
      output.push(`${operation.type === 'equal' ? ' ' : operation.type === 'delete' ? '-' : '+'}${operation.line}`);
    }
  }

  return `${output.join('\n')}\n`;
}
