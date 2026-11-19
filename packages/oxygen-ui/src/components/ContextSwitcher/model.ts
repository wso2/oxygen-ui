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
import { isContextSwitcherGroup } from './ContextSwitcherGroup';
import { isContextSwitcherOption, type ContextSwitcherOptionProps } from './ContextSwitcherOption';

/**
 * Elements in child order. A fragment is transparent. Text and empty slots are skipped.
 */
export const flattenElements = (children: React.ReactNode): React.ReactElement[] => {
  const elements: React.ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }
    if (child.type === React.Fragment) {
      const fragment = child.props as { children?: React.ReactNode };
      elements.push(...flattenElements(fragment.children));
      return;
    }
    elements.push(child);
  });
  return elements;
};

/**
 * Visible text of a React node, used to name an option.
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

type OptionElement = React.ReactElement<ContextSwitcherOptionProps>;

/**
 * What a level's list holds, in child order: a loose option, or a group with
 * the options inside it. A group with no options is left out, and so is
 * anything that is neither.
 */
export type LevelEntry =
  | { kind: 'option'; option: OptionElement }
  | { kind: 'group'; label: React.ReactNode; options: OptionElement[] };

export const parseLevelChildren = (children: React.ReactNode): LevelEntry[] => {
  const entries: LevelEntry[] = [];
  flattenElements(children).forEach((child) => {
    if (isContextSwitcherOption(child)) {
      entries.push({ kind: 'option', option: child });
      return;
    }
    if (isContextSwitcherGroup(child)) {
      const options = flattenElements(child.props.children).filter(isContextSwitcherOption);
      if (options.length > 0) {
        entries.push({ kind: 'group', label: child.props.label, options });
      }
    }
  });
  return entries;
};

/** Every option of a level, loose ones and grouped ones, in order. */
export const optionsOf = (entries: LevelEntry[]): OptionElement[] =>
  ([] as OptionElement[]).concat(...entries.map((entry) => (entry.kind === 'option' ? [entry.option] : entry.options)));

export interface ChainState {
  /** Index of the level in the foreground, or -1 with no levels. */
  currentIndex: number;
  /** The empty level whose list is open while Back is on, if any. */
  openEmptyId: string | null;
  /** How many levels are on screen. */
  visibleCount: number;
  /** Index of the level joined to Back, or -1 when Back is off or there are no levels. */
  backIndex: number;
}

/**
 * Which levels are on screen and which one is current, from the selection,
 * the open list and whether Back is on. `value` has to be normalized.
 */
export const chainState = (
  levelIds: readonly string[],
  value: ContextSwitcherValue,
  openId: string | null,
  back: boolean
): ChainState => {
  const total = levelIds.length;
  if (total === 0) {
    return { currentIndex: -1, openEmptyId: null, visibleCount: 0, backIndex: -1 };
  }
  const selectedCount = selectedLevelCount(levelIds, value);
  const openIndex = openId === null ? -1 : levelIds.indexOf(openId);
  const currentIndex =
    openIndex >= 0 && openIndex <= selectedCount ? openIndex : Math.max(selectedCount - 1, 0);
  const openEmptyId =
    back && openId !== null && openId === levelIds[currentIndex] && !value[openId] ? openId : null;
  const visibleCount = back
    ? Math.min(total, openEmptyId ? selectedCount + 1 : Math.max(selectedCount, 1))
    : Math.min(total, Math.max(selectedCount + 1, 1));
  const backIndex = !back
    ? -1
    : openEmptyId
      ? levelIds.indexOf(openEmptyId)
      : Math.max(selectedCount - 1, 0);
  return { currentIndex, openEmptyId, visibleCount, backIndex };
};
