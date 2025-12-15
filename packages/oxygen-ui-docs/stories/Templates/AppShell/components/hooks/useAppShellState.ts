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
import type { NotificationItem, Organization, Project, Environment } from '../types';

/**
 * App Shell state interface.
 */
export interface AppShellState {
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean;
  /** Whether the notification panel is open */
  notificationPanelOpen: boolean;
  /** Whether a confirm dialog is open */
  confirmDialogOpen: boolean;
  /** Currently active menu item ID */
  activeMenuItem: string;
  /** Map of expanded menu IDs */
  expandedMenus: Record<string, boolean>;
  /** List of notifications */
  notifications: NotificationItem[];
  /** Selected organization */
  selectedOrg: Organization | null;
  /** Selected project */
  selectedProject: Project | null;
  /** Current environment */
  environment: Environment;
}

/**
 * App Shell actions interface.
 */
export interface AppShellActions {
  toggleSidebar: () => void;
  toggleNotificationPanel: () => void;
  setActiveMenuItem: (id: string) => void;
  toggleMenu: (id: string) => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  setOrganization: (org: Organization) => void;
  setProject: (project: Project) => void;
  setEnvironment: (env: Environment) => void;
  openConfirmDialog: () => void;
  closeConfirmDialog: () => void;
}

/**
 * Options for useAppShellState hook.
 */
export interface UseAppShellStateOptions {
  /** Initial sidebar collapsed state */
  initialCollapsed?: boolean;
  /** Initial active menu item */
  initialActiveItem?: string;
  /** Initial notifications */
  initialNotifications?: NotificationItem[];
  /** Initial organization */
  initialOrg?: Organization | null;
  /** Initial project */
  initialProject?: Project | null;
  /** Initial environment */
  initialEnvironment?: Environment;
}

/**
 * Custom hook for App Shell state management.
 *
 * Provides a clean pattern for managing shell state including:
 * - Sidebar collapse state
 * - Notification panel state
 * - Active menu item and expanded menus
 * - Notifications with CRUD operations
 * - Organization/Project/Environment selection
 *
 * @example
 * ```tsx
 * const { state, actions, unreadCount } = useAppShellState({
 *   initialCollapsed: false,
 *   initialNotifications: myNotifications,
 * });
 *
 * // Use state
 * <Sidebar collapsed={state.sidebarCollapsed} />
 *
 * // Use actions
 * <Button onClick={actions.toggleSidebar}>Toggle</Button>
 *
 * // Use computed values
 * <Badge count={unreadCount} />
 * ```
 */
export const useAppShellState = (options: UseAppShellStateOptions = {}) => {
  const {
    initialCollapsed = false,
    initialActiveItem = 'dashboard',
    initialNotifications = [],
    initialOrg = null,
    initialProject = null,
    initialEnvironment = 'development',
  } = options;

  const [state, setState] = React.useState<AppShellState>({
    sidebarCollapsed: initialCollapsed,
    notificationPanelOpen: false,
    confirmDialogOpen: false,
    activeMenuItem: initialActiveItem,
    expandedMenus: {},
    notifications: initialNotifications,
    selectedOrg: initialOrg,
    selectedProject: initialProject,
    environment: initialEnvironment,
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

  const markNotificationRead = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  }, []);

  const dismissNotification = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const markAllNotificationsRead = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const clearAllNotifications = React.useCallback(() => {
    setState((prev) => ({ ...prev, notifications: [] }));
  }, []);

  const setOrganization = React.useCallback((org: Organization) => {
    setState((prev) => ({ ...prev, selectedOrg: org }));
  }, []);

  const setProject = React.useCallback((project: Project) => {
    setState((prev) => ({ ...prev, selectedProject: project }));
  }, []);

  const setEnvironment = React.useCallback((env: Environment) => {
    setState((prev) => ({ ...prev, environment: env }));
  }, []);

  const openConfirmDialog = React.useCallback(() => {
    setState((prev) => ({ ...prev, confirmDialogOpen: true }));
  }, []);

  const closeConfirmDialog = React.useCallback(() => {
    setState((prev) => ({ ...prev, confirmDialogOpen: false }));
  }, []);

  const unreadCount = React.useMemo(
    () => state.notifications.filter((n) => !n.read).length,
    [state.notifications]
  );

  const actions: AppShellActions = React.useMemo(
    () => ({
      toggleSidebar,
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
      markNotificationRead,
      dismissNotification,
      markAllNotificationsRead,
      clearAllNotifications,
      setOrganization,
      setProject,
      setEnvironment,
      openConfirmDialog,
      closeConfirmDialog,
    }),
    [
      toggleSidebar,
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
      markNotificationRead,
      dismissNotification,
      markAllNotificationsRead,
      clearAllNotifications,
      setOrganization,
      setProject,
      setEnvironment,
      openConfirmDialog,
      closeConfirmDialog,
    ]
  );

  return {
    state,
    actions,
    unreadCount,
  };
};

export default useAppShellState;
