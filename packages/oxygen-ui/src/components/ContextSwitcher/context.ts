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

/** Map of level id to the selected option value. A missing id is an empty level. */
export type ContextSwitcherValue = Record<string, string>;

export interface ContextSwitcherContextValue {
  /** Selection with orphan levels removed. */
  value: ContextSwitcherValue;
  /** Level ids in child order. */
  levelIds: readonly string[];
  /** Id of the level whose list is open, if any. */
  openId: string | null;
  /** Id of the level that shares a border with Back, if any. */
  joinedId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  onChange: (value: ContextSwitcherValue) => void;
  /** Move focus to the neighboring stop. Stays put at either end. */
  moveFocus: (from: HTMLElement, direction: -1 | 1) => void;
  /**
   * Applies a pick. The same option keeps the levels under it. A different
   * option clears them. Either way the next level's list opens.
   */
  applyPick: (levelId: string, optionValue: string) => void;
}

export const ContextSwitcherContext = React.createContext<ContextSwitcherContextValue | null>(null);

export const useContextSwitcher = (): ContextSwitcherContextValue => {
  const value = React.useContext(ContextSwitcherContext);
  if (!value) {
    throw new Error('ContextSwitcher.Level must be rendered inside ContextSwitcher');
  }
  return value;
};
