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

const KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];

/**
 * The card to move focus to for a key, or null when the key moves nowhere. `tops` is the vertical position of each
 * card. The number of columns is read from them, as the cards that share the first one's top: the single-column
 * layout below `sm` makes horizontal steps equivalent to vertical ones, so it cannot be taken from the `columns` prop.
 * It clamps instead of wrapping: a vertical step off the last row would otherwise land somewhere unrelated.
 */
export const nextCardIndex = (key: string, current: number, tops: readonly number[]): number | null => {
  if (!KEYS.includes(key) || current < 0 || current >= tops.length) return null;

  const perRow = Math.max(1, tops.filter((top) => top === tops[0]).length);
  const next = {
    ArrowRight: current + 1,
    ArrowLeft: current - 1,
    ArrowDown: current + perRow,
    ArrowUp: current - perRow,
    Home: 0,
    End: tops.length - 1,
  }[key as 'ArrowRight'];

  return next < 0 || next >= tops.length ? null : next;
};
