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

import type { ComponentType, ReactNode } from 'react'

/**
 * Navigation item for sidebar menus.
 * Supports nested children for sub-menus.
 */
export interface NavigationItem {
  /** Unique identifier for the menu item */
  id: string
  /** Display label */
  label: string
  /** Icon component to render */
  icon: ComponentType<{ size?: number }>
  /** Optional href for navigation */
  href?: string
  /** Nested menu items for sub-menus */
  children?: NavigationItem[]
  /** Optional badge count (e.g., for notifications) */
  badge?: number
  /** Whether this item is a divider */
  divider?: boolean
}

/**
 * Navigation category for grouping menu items.
 */
export interface NavigationCategory {
  /** Category identifier */
  id: string
  /** Category label (optional, can be used as section header) */
  label?: string
  /** Items in this category */
  items: NavigationItem[]
}

/**
 * Notification item for the notification panel.
 */
export interface NotificationItem {
  /** Unique identifier */
  id: string
  /** Notification type/severity */
  type: 'info' | 'warning' | 'error' | 'success'
  /** Notification title */
  title: string
  /** Notification message/description */
  message: string
  /** When the notification was created */
  timestamp: Date
  /** Whether the notification has been read */
  read: boolean
  /** Optional avatar URL or initials */
  avatar?: string
  /** Optional action label */
  actionLabel?: string
  /** Optional action callback */
  onAction?: () => void
}

/**
 * Organization for the org switcher.
 */
export interface Organization {
  /** Unique identifier */
  id: string
  /** Organization name */
  name: string
  /** Avatar URL or initials */
  avatar?: string
  /** Optional description or subtitle */
  description?: string
}

/**
 * Project for the project switcher.
 */
export interface Project {
  /** Unique identifier */
  id: string
  /** Project name */
  name: string
  /** Optional description */
  description?: string
  /** Optional project color/identifier */
  color?: string
  status?: 'active' | 'archived' | 'draft'
  componentsCount?: number
  lastUpdated?: string
}

/**
 * User information for the user menu.
 */
export interface User {
  /** User's display name */
  name: string
  /** User's email */
  email: string
  /** Avatar URL or initials */
  avatar?: string
  /** User's role or plan */
  role?: string
}

/**
 * App Shell context value for state management.
 * Demonstrates proper context pattern for shell state.
 */
export interface AppShellContextValue {
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean
  /** Toggle sidebar collapsed state */
  toggleSidebar: () => void
  /** Set sidebar collapsed state directly */
  setSidebarCollapsed: (collapsed: boolean) => void

  /** Whether the notification panel is open */
  notificationPanelOpen: boolean
  /** Toggle notification panel */
  toggleNotificationPanel: () => void
  /** Set notification panel state directly */
  setNotificationPanelOpen: (open: boolean) => void

  /** Current notifications */
  notifications: NotificationItem[]
  /** Mark a notification as read */
  markNotificationRead: (id: string) => void
  /** Dismiss/remove a notification */
  dismissNotification: (id: string) => void
  /** Clear all notifications */
  clearAllNotifications: () => void

  /** Currently selected organization */
  selectedOrg: Organization | null
  /** Set selected organization */
  setSelectedOrg: (org: Organization) => void

  /** Currently selected project */
  selectedProject: Project | null
  /** Set selected project */
  setSelectedProject: (project: Project) => void

  /** Currently active menu item */
  activeMenuItem: string
  /** Set active menu item */
  setActiveMenuItem: (id: string) => void

  /** Expanded sub-menu IDs */
  expandedMenus: Record<string, boolean>
  /** Toggle a sub-menu expansion */
  toggleMenu: (id: string) => void

  /** Current user */
  user: User
}

/**
 * Props for the notification banner component.
 */
export interface NotificationBannerProps {
  /** Whether the banner is visible */
  visible?: boolean
  /** Banner severity/type */
  severity?: 'info' | 'warning' | 'error' | 'success'
  /** Banner title */
  title?: string
  /** Banner message */
  message: string
  /** Optional action button label */
  actionLabel?: string
  /** Action button callback */
  onAction?: () => void
  /** Dismiss callback */
  onDismiss?: () => void
}

/**
 * Props for the confirm dialog component.
 */
export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Dialog title */
  title: string
  /** Dialog message/content */
  message: string | ReactNode
  /** Confirm button label */
  confirmLabel?: string
  /** Cancel button label */
  cancelLabel?: string
  /** Whether this is a destructive action (styles confirm button red) */
  destructive?: boolean
  /** Whether confirm action is in progress */
  loading?: boolean
  /** Confirm callback */
  onConfirm: () => void
  /** Cancel/close callback */
  onCancel: () => void
}

export interface Component {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive'
  lastModified: string
}

export interface McpServer {
  id: string
  action: string
  user: string
  timestamp: string
}

// Note: SIDEBAR_WIDTH and COLLAPSED_SIDEBAR_WIDTH have been moved to AppShellSidebar
