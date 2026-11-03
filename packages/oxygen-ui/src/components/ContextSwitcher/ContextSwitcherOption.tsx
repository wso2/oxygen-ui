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
 * Props for a single choice in a level.
 */
export interface ContextSwitcherOptionProps {
  /** Value written into the context map when this option is picked. */
  value: string;
  /** Shown, but cannot be picked. */
  disabled?: boolean;
  /** Label shown in the field and in the list. */
  children: React.ReactNode;
}

/** True when the child is a `ContextSwitcher.Option`. */
export const isContextSwitcherOption = (
  child: React.ReactNode
): child is React.ReactElement<ContextSwitcherOptionProps> =>
  React.isValidElement<ContextSwitcherOptionProps>(child) && child.type === ContextSwitcherOption;

/**
 * ContextSwitcher.Option - One choice in a level.
 *
 * A marker the level reads. It must sit inside a level and is never drawn on its own.
 */
export const ContextSwitcherOption = (
  _props: ContextSwitcherOptionProps
): React.ReactElement | null => {
  throw new Error('ContextSwitcher.Option must be rendered inside a level');
};

ContextSwitcherOption.displayName = 'ContextSwitcher.Option';

export default ContextSwitcherOption;
