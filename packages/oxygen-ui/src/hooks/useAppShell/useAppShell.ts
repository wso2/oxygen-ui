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
import useMediaQuery from '@mui/material/useMediaQuery';
import type {Theme} from '@mui/material/styles';
import {AppShellContext} from '../../components/AppShell/context';

/**
 * App Shell state interface.
 */
export interface AppShellState {
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean;
  /** Whether the notification panel is open */
  notificationPanelOpen: boolean;
  /** Currently active menu item ID */
  activeMenuItem: string;
  /** Map of expanded menu IDs */
  expandedMenus: Record<string, boolean>;
  /** Expanded sidebar width in pixels */
  sidebarWidth: number;
  /** Collapsed sidebar width in pixels */
  sidebarCollapsedWidth: number;
}

/**
 * App Shell actions interface.
 */
export interface AppShellActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  toggleNotificationPanel: () => void;
  setActiveMenuItem: (id: string) => void;
  toggleMenu: (id: string) => void;
}

/**
 * Options for useAppShell hook.
 */
export interface UseAppShellOptions {
  /** Initial sidebar collapsed state */
  initialCollapsed?: boolean;
  /** Initial active menu item */
  initialActiveItem?: string;
  /** Auto-collapse sidebar on menu item selection in mobile view (default: true) */
  collapseOnSelectOnMobile?: boolean;
  /** Auto-collapse sidebar on page load when in mobile view (default: false) */
  collapseOnMobile?: boolean;
  /** Expanded sidebar width in pixels (default: 250) */
  sidebarWidth?: number;
  /** Collapsed sidebar width in pixels (default: 64) */
  sidebarCollapsedWidth?: number;
}

/**
 * Return type for useAppShell hook.
 */
export interface UseAppShellReturn {
  state: AppShellState;
  actions: AppShellActions;
}

/**
 * Custom hook for App Shell layout state management.
 *
 * Provides a clean pattern for managing core shell layout state including:
 * - Sidebar collapse state
 * - Notification panel visibility
 * - Active menu item and expanded menus
 *
 * Can be used in two modes:
 * 1. **Create mode** (with options): Creates a new shell state instance
 * 2. **Consume mode** (without options): Consumes shared state from AppShellProvider
 *
 * For notification data management, use the `useNotifications` hook separately.
 *
 * @example
 * ```tsx
 * // Create mode - in layout component
 * function AppLayout() {
 *   const shell = useAppShell({
 *     initialCollapsed: false,
 *     collapseOnSelectOnMobile: true,
 *     sidebarWidth: 280,
 *   });
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
 *
 * // Consume mode - in child page component
 * function MyPage() {
 *   const { state, actions } = useAppShell(); // No options = consume from context
 *   
 *   useEffect(() => {
 *     actions.toggleSidebar(); // Control shared sidebar state
 *   }, []);
 * }
 * ```
 */
export const useAppShell = (options?: UseAppShellOptions): UseAppShellReturn => {
  const contextValue = React.useContext(AppShellContext);

  // Extract options (do this before any conditional returns)
  const {
    initialCollapsed = false,
    initialActiveItem = 'dashboard',
    collapseOnSelectOnMobile = true,
    collapseOnMobile = true,
    sidebarWidth = 250,
    sidebarCollapsedWidth = 64,
  } = options || {};

  // Detect mobile view using MUI breakpoint (must call unconditionally)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  // Create state (must call unconditionally)
  const [state, setState] = React.useState<AppShellState>({
    sidebarCollapsed: initialCollapsed,
    notificationPanelOpen: false,
    activeMenuItem: initialActiveItem,
    expandedMenus: {},
    sidebarWidth,
    sidebarCollapsedWidth,
  });

  // Auto-collapse sidebar on mobile if collapseOnMobile is enabled
  React.useEffect(() => {
    if (options && collapseOnMobile && isMobile) {
      setState((prev) => ({ ...prev, sidebarCollapsed: true }));
    }
  }, [options, collapseOnMobile, isMobile]);

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const setSidebarCollapsed = React.useCallback((collapsed: boolean) => {
    setState((prev) => ({ ...prev, sidebarCollapsed: collapsed }));
  }, []);

  const collapseSidebar = React.useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: true }));
  }, []);

  const expandSidebar = React.useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: false }));
  }, []);

  const toggleNotificationPanel = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      notificationPanelOpen: !prev.notificationPanelOpen,
    }));
  }, []);

  const setActiveMenuItem = React.useCallback((id: string) => {
    setState((prev) => {
      const newState = { ...prev, activeMenuItem: id };
      
      // Auto-collapse sidebar on mobile when collapseOnSelectOnMobile is enabled
      if (collapseOnSelectOnMobile && isMobile && !prev.sidebarCollapsed) {
        newState.sidebarCollapsed = true;
      }
      
      return newState;
    });
  }, [collapseOnSelectOnMobile, isMobile]);

  const toggleMenu = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      expandedMenus: {
        ...prev.expandedMenus,
        [id]: !prev.expandedMenus[id],
      },
    }));
  }, []);

  const actions: AppShellActions = React.useMemo(
    () => ({
      toggleSidebar,
      setSidebarCollapsed,
      collapseSidebar,
      expandSidebar,
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
    }),
    [
      toggleSidebar,
      setSidebarCollapsed,
      collapseSidebar,
      expandSidebar,
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
    ]
  );

  const createdValue: UseAppShellReturn = React.useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  );

  // If no options provided, consume from context (after all hooks are called)
  if (options === undefined) {
    if (!contextValue) {
      throw new Error(
        'useAppShell() must be used within an <AppShell> component. ' +
        'Either wrap your component tree with <AppShell> or pass options to create a new instance.\n\n' +
        'Example usage:\n' +
        '// As a child of AppShell (consumes context):\n' +
        'function MyPage() {\n' +
        '  const { state, actions } = useAppShell();\n' +
        '  // ...\n' +
        '}\n\n' +
        '// Or create instance with options:\n' +
        'const shell = useAppShell({ initialCollapsed: false });'
      );
    }
    return contextValue;
  }

  // Options provided, return created instance
  return createdValue;
};

export default useAppShell;
