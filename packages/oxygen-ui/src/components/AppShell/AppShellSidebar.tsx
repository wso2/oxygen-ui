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
 * Props for AppShellSidebar component.
 */
export interface AppShellSidebarProps {
  /** Sidebar content (typically Sidebar component) */
  children: React.ReactNode;
}

/**
 * AppShellSidebar - Slot component for the sidebar area.
 *
 * Used as a child of AppShell to define the left sidebar navigation.
 *
 * @example
 * ```tsx
 * <AppShell>
 *   <AppShell.Sidebar>
 *     <Sidebar collapsed={collapsed}>...</Sidebar>
 *   </AppShell.Sidebar>
 * </AppShell>
 * ```
 */
export const AppShellSidebar: React.FC<AppShellSidebarProps> = ({ children }) => {
  return <>{children}</>;
};

AppShellSidebar.displayName = 'AppShellSidebar';

export default AppShellSidebar;
