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
 * Context value for sidebar item state.
 */
export interface AppShellSidebarItemContextValue {
  /** Item's unique identifier */
  id: string;
  /** Whether this item is active */
  isActive: boolean;
  /** Whether this item is expanded (has visible children) */
  isExpanded: boolean;
  /** Whether this item has children */
  hasChildren: boolean;
  /** Current nesting depth */
  depth: number;
}

/**
 * Context for sharing state between AppShellSidebarItem and its children.
 */
export const AppShellSidebarItemContext = React.createContext<AppShellSidebarItemContextValue | null>(null);

/**
 * Hook to access the sidebar item context.
 * Must be used within an AppShellSidebarItem component.
 */
export const useAppShellSidebarItemContext = (): AppShellSidebarItemContextValue => {
  const context = React.useContext(AppShellSidebarItemContext);
  if (!context) {
    throw new Error(
      'useAppShellSidebarItemContext must be used within an AppShellSidebarItem component'
    );
  }
  return context;
};

/**
 * Provider component for sidebar item context.
 */
export const AppShellSidebarItemProvider: React.FC<{
  value: AppShellSidebarItemContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <AppShellSidebarItemContext.Provider value={value}>
      {children}
    </AppShellSidebarItemContext.Provider>
  );
};
