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
 * Props for AppShellMain component.
 */
export interface AppShellMainProps {
  /** Main content area */
  children: React.ReactNode;
}

/**
 * AppShellMain - Slot component for the main content area.
 *
 * Used as a child of AppShell to define the primary content area.
 *
 * @example
 * ```tsx
 * <AppShell>
 *   <AppShell.Main>
 *     <Outlet />
 *   </AppShell.Main>
 * </AppShell>
 * ```
 */
export const AppShellMain: React.FC<AppShellMainProps> = ({ children }) => {
  return <>{children}</>;
};

AppShellMain.displayName = 'AppShellMain';

export default AppShellMain;
