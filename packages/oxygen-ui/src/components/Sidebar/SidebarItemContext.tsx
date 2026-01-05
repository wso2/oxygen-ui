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
export interface SidebarItemContextValue {
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
 * Context for sharing state between SidebarItem and its children.
 */
export const SidebarItemContext = React.createContext<SidebarItemContextValue | null>(null);

/**
 * Hook to access the sidebar item context.
 * Must be used within a SidebarItem component.
 */
export const useSidebarItemContext = (): SidebarItemContextValue => {
  const context = React.useContext(SidebarItemContext);
  if (!context) {
    throw new Error(
      'useSidebarItemContext must be used within a SidebarItem component'
    );
  }
  return context;
};

/**
 * Provider component for sidebar item context.
 */
export const SidebarItemProvider: React.FC<{
  value: SidebarItemContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <SidebarItemContext.Provider value={value}>
      {children}
    </SidebarItemContext.Provider>
  );
};
