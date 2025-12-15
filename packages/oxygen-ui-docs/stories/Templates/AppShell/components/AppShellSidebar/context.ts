/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
 * Context value for AppShellSidebar compound component.
 */
export interface AppShellSidebarContextValue {
  /** Whether the sidebar is collapsed */
  collapsed: boolean;
  /** Currently active menu item ID */
  activeItem?: string;
  /** Map of expanded menu IDs */
  expandedMenus: Record<string, boolean>;
  /** Callback when a menu item is selected */
  onSelect?: (id: string) => void;
  /** Callback to toggle menu expansion */
  onToggleExpand?: (id: string) => void;
}

/**
 * Context for sharing state between AppShellSidebar compound components.
 */
export const AppShellSidebarContext = React.createContext<AppShellSidebarContextValue | null>(null);

/**
 * Hook to access AppShellSidebar context.
 * @throws Error if used outside AppShellSidebar
 */
export const useAppShellSidebar = (): AppShellSidebarContextValue => {
  const context = React.useContext(AppShellSidebarContext);
  if (!context) {
    throw new Error('AppShellSidebar compound components must be used within AppShellSidebar');
  }
  return context;
};
