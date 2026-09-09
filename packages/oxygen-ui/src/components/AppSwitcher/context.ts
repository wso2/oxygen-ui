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
 * Context value for the AppSwitcher compound component.
 */
export interface AppSwitcherContextValue {
  /** Whether the popover is open */
  open: boolean;
  /** Element the popover is anchored to */
  anchorEl: HTMLElement | null;
  /** Id of the popover surface, used for `aria-controls` on the trigger */
  popoverId: string;
  /** Opens the popover, anchoring it to the event target */
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  /** Closes the popover */
  handleClose: () => void;
}

/**
 * Context for sharing state between AppSwitcher compound components.
 */
export const AppSwitcherContext = React.createContext<AppSwitcherContextValue | null>(null);

/**
 * Hook to access AppSwitcher context.
 * @throws Error if used outside AppSwitcher
 */
export const useAppSwitcher = (): AppSwitcherContextValue => {
  const context = React.useContext(AppSwitcherContext);
  if (!context) {
    throw new Error('AppSwitcher sub-components must be used within an AppSwitcher component');
  }
  return context;
};

AppSwitcherContext.displayName = 'AppSwitcher.Context';
