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
 * Context value for DrawerPanel compound component.
 */
export interface DrawerPanelContextValue {
  /** Whether the panel is open */
  open: boolean;
  /** Callback to close the panel */
  onClose: () => void;
  /** Whether the panel is expanded to its wide width */
  expanded: boolean;
  /** Toggle between the default and expanded width */
  toggleExpanded: () => void;
  /** Id applied to `DrawerPanel.Title`; the drawer is labelled by it */
  titleId: string;
}

/**
 * Context for sharing state between DrawerPanel compound components.
 */
export const DrawerPanelContext = React.createContext<DrawerPanelContextValue | null>(null);

/**
 * Hook to access DrawerPanel context.
 * @throws Error if used outside DrawerPanel
 */
export const useDrawerPanel = (): DrawerPanelContextValue => {
  const context = React.useContext(DrawerPanelContext);
  if (!context) {
    throw new Error('DrawerPanel compound components must be used within DrawerPanel');
  }
  return context;
};
