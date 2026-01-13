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
}

/**
 * App Shell actions interface.
 */
export interface AppShellActions {
  toggleSidebar: () => void;
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
 * For notification data management, use the `useNotifications` hook separately.
 *
 * @example
 * ```tsx
 * const { state, actions } = useAppShell({
 *   initialCollapsed: false,
 * });
 *
 * // Use state
 * <Sidebar collapsed={state.sidebarCollapsed} />
 * <NotificationPanel open={state.notificationPanelOpen} />
 *
 * // Use actions
 * <Button onClick={actions.toggleSidebar}>Toggle</Button>
 * ```
 */
export const useAppShell = (options: UseAppShellOptions = {}): UseAppShellReturn => {
  const {
    initialCollapsed = false,
    initialActiveItem = 'dashboard',
  } = options;

  const [state, setState] = React.useState<AppShellState>({
    sidebarCollapsed: initialCollapsed,
    notificationPanelOpen: false,
    activeMenuItem: initialActiveItem,
    expandedMenus: {},
  });

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const toggleNotificationPanel = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      notificationPanelOpen: !prev.notificationPanelOpen,
    }));
  }, []);

  const setActiveMenuItem = React.useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeMenuItem: id }));
  }, []);

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
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
    }),
    [
      toggleSidebar,
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
    ]
  );

  return {
    state,
    actions,
  };
};

export default useAppShell;
