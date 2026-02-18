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
import type {UseAppShellReturn} from '../../hooks/useAppShell/useAppShell';

/**
 * Context for sharing AppShell state across components.
 * Allows child components to access the same shell state without prop drilling.
 */
export const AppShellContext = React.createContext<UseAppShellReturn | undefined>(undefined);

/**
 * Provider component for AppShell context.
 * Wrap your app shell with this to share state with child components.
 *
 * @example
 * ```tsx
 * function AppLayout() {
 *   const shell = useAppShell({ initialCollapsed: false });
 *
 *   return (
 *     <AppShellProvider value={shell}>
 *       <AppShell>
 *         <Sidebar collapsed={shell.state.sidebarCollapsed} />
 *         <Outlet />
 *       </AppShell>
 *     </AppShellProvider>
 *   );
 * }
 * ```
 */
export const AppShellProvider: React.FC<React.PropsWithChildren<{value: UseAppShellReturn}>> = ({
  children,
  value,
}) => {
  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
};

AppShellProvider.displayName = 'AppShellProvider';

/**
 * Hook to access AppShell context with a helpful error message.
 * Throws an error if used outside of AppShell component tree.
 * 
 * @param componentName - Name of the component using the context (for error messages)
 * @returns AppShell context value
 * @throws Error if used outside AppShell
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, actions } = useAppShellContext('MyComponent');
 *   // ...
 * }
 * ```
 */
export const useAppShellContext = (componentName: string): UseAppShellReturn => {
  const context = React.useContext(AppShellContext);
  
  if (!context) {
    throw new Error(
      `${componentName} must be used as a child of <AppShell>. ` +
      `Wrap your component tree with <AppShell> to provide the necessary context.\n\n` +
      `Example:\n` +
      `<AppShell>\n` +
      `  <AppShell.Navbar>\n` +
      `    <Header>...</Header>\n` +
      `  </AppShell.Navbar>\n` +
      `  <AppShell.Sidebar>\n` +
      `    <Sidebar>...</Sidebar>\n` +
      `  </AppShell.Sidebar>\n` +
      `</AppShell>`
    );
  }
  
  return context;
};
