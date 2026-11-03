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

/**
 * Props for a labelled cluster of options.
 */
export interface ContextSwitcherGroupProps {
  /** Name of the group in the list. */
  label: string;
  /** Options in this group. */
  children: React.ReactNode;
}

/** True when the child is a `ContextSwitcher.Group`. */
export const isContextSwitcherGroup = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherGroupProps> =>
  React.isValidElement<ContextSwitcherGroupProps>(child) && child.type === ContextSwitcherGroup;

/**
 * ContextSwitcher.Group - A labelled cluster of options inside a level.
 *
 * A marker the level reads. It must sit inside a level and is never drawn on its own.
 */
export const ContextSwitcherGroup = (
  _props: ContextSwitcherGroupProps
): React.ReactElement | null => {
  throw new Error('ContextSwitcher.Group must be rendered inside a level');
};

ContextSwitcherGroup.displayName = 'ContextSwitcher.Group';

export default ContextSwitcherGroup;
