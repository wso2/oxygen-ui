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

import * as React from 'react';
import type { ContextSwitcherValue } from './context';

/**
 * Visible text of a React node, used to name an option and to filter it.
 */
export const nodeText = (node: React.ReactNode): string => {
  if (node == null || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeText).join('');
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return nodeText(node.props.children);
  }
  return '';
};

/**
 * Case-insensitive substring match. Only a query with no characters matches
 * everything. Spaces are characters, so a whitespace-only query does not.
 */
export const matchesQuery = (text: string, query: string): boolean => {
  if (query.length === 0) {
    return true;
  }
  return text.toLowerCase().includes(query.toLowerCase());
};

/**
 * Keeps selections from the first level up to, but not including, the first
 * level that has no selection. A later value whose parent is empty is ignored.
 */
export const normalizeValue = (
  levelIds: readonly string[],
  value: ContextSwitcherValue
): ContextSwitcherValue => {
  const next: ContextSwitcherValue = {};
  for (const id of levelIds) {
    const selected = value[id];
    if (!selected) {
      break;
    }
    next[id] = selected;
  }
  return next;
};

/**
 * How many levels have a selection, stopping at the first empty level.
 */
export const selectedLevelCount = (
  levelIds: readonly string[],
  value: ContextSwitcherValue
): number => {
  let count = 0;
  for (const id of levelIds) {
    if (!value[id]) {
      break;
    }
    count += 1;
  }
  return count;
};

/** Selections that come before `index`, in level order. */
const selectionsBefore = (
  levelIds: readonly string[],
  value: ContextSwitcherValue,
  index: number
): ContextSwitcherValue => {
  const next: ContextSwitcherValue = {};
  for (let i = 0; i < index; i += 1) {
    const id = levelIds[i];
    if (value[id]) {
      next[id] = value[id];
    }
  }
  return next;
};

/**
 * Drops a level and every level after it.
 */
export const clearFrom = (
  levelIds: readonly string[],
  value: ContextSwitcherValue,
  levelId: string
): ContextSwitcherValue => selectionsBefore(levelIds, value, levelIds.indexOf(levelId));

/**
 * Sets a level and drops every level after it. Earlier levels stay.
 */
export const selectLevel = (
  levelIds: readonly string[],
  value: ContextSwitcherValue,
  levelId: string,
  optionValue: string
): ContextSwitcherValue => ({
  ...selectionsBefore(levelIds, value, levelIds.indexOf(levelId)),
  [levelId]: optionValue,
});
