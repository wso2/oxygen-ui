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
  /** Id of the level whose panel is open, if any. */
  openId: string | null;
  setOpenId: (id: string | null) => void;
  onChange: (value: ContextSwitcherValue) => void;
  /** Hides a level that was revealed by the expand toggle. */
  collapseFrom: (levelId: string) => void;
  /**
   * After hide or close unmounts the focused control, move focus to the
   * Show toggle, or to the last field if that toggle is not rendered.
   */
  restoreFocus: () => void;
}

export const ContextSwitcherContext = React.createContext<ContextSwitcherContextValue | null>(null);

export const useContextSwitcher = (): ContextSwitcherContextValue => {
  const value = React.useContext(ContextSwitcherContext);
  if (!value) {
    throw new Error('ContextSwitcher.Level must be rendered inside ContextSwitcher');
  }
  return value;
};

export interface LevelPanelContextValue {
  query: string;
  selectedValue: string | undefined;
  onSelect: (optionValue: string) => void;
}

export const LevelPanelContext = React.createContext<LevelPanelContextValue | null>(null);

export const useLevelPanel = (): LevelPanelContextValue => {
  const value = React.useContext(LevelPanelContext);
  if (!value) {
    throw new Error(
      'ContextSwitcher.Option and ContextSwitcher.Group must be rendered inside a level'
    );
  }
  return value;
};
