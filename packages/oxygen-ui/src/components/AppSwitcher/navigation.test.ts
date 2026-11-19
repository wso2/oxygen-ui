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

import { describe, expect, it } from 'vitest';
import { nextCardIndex } from './navigation';

/** Three columns and two rows, as the grid lays out at `sm` and up. */
const grid = [0, 0, 0, 50, 50, 50];
/** One column, as the grid lays out on a narrow screen: every card is on its own row. */
const column = [0, 50, 100, 150];

describe('nextCardIndex in a grid', () => {
  it.each([
    ['ArrowRight', 0, 1],
    ['ArrowRight', 2, 3],
    ['ArrowLeft', 3, 2],
    ['ArrowDown', 1, 4],
    ['ArrowUp', 4, 1],
    ['Home', 4, 0],
    ['End', 1, 5],
  ])('%s from card %d goes to card %d', (key, from, to) => {
    expect(nextCardIndex(key, from, grid)).toBe(to);
  });

  it.each([
    ['ArrowLeft', 0],
    ['ArrowUp', 1],
    ['ArrowRight', 5],
    ['ArrowDown', 3],
    ['ArrowDown', 5],
  ])('%s from card %d goes nowhere, instead of wrapping', (key, from) => {
    expect(nextCardIndex(key, from, grid)).toBeNull();
  });

  it('keeps focus where it is for Home on the first card and End on the last', () => {
    expect(nextCardIndex('Home', 0, grid)).toBe(0);
    expect(nextCardIndex('End', 5, grid)).toBe(5);
  });
});

describe('nextCardIndex in one column', () => {
  it('makes a vertical step the same as a horizontal one', () => {
    expect(nextCardIndex('ArrowDown', 1, column)).toBe(2);
    expect(nextCardIndex('ArrowUp', 1, column)).toBe(0);
    expect(nextCardIndex('ArrowRight', 1, column)).toBe(2);
  });
});

describe('nextCardIndex, when there is nothing to move to', () => {
  it('ignores a key that does not move focus', () => {
    expect(nextCardIndex('Tab', 0, grid)).toBeNull();
    expect(nextCardIndex('a', 0, grid)).toBeNull();
  });

  it('goes nowhere when focus is not on a card or there are no cards', () => {
    expect(nextCardIndex('ArrowRight', -1, grid)).toBeNull();
    expect(nextCardIndex('ArrowRight', 0, [])).toBeNull();
  });

  it('reads every card as in one row when no layout is measured, as jsdom reports', () => {
    expect(nextCardIndex('ArrowDown', 0, [0, 0, 0, 0])).toBeNull();
    expect(nextCardIndex('ArrowRight', 0, [0, 0, 0, 0])).toBe(1);
  });
});
