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

// Types
export * from './types';

// Mock data
export * from './mock-data';

// Utilities
export * from './utils';

// Hooks
export * from './hooks';

// =============================================================================
// COMPOUND COMPONENTS (NEW MODULAR API)
// =============================================================================

// AppShellHeader - Composable header component
export { AppShellHeader } from './AppShellHeader';
export type { AppShellHeaderProps } from './AppShellHeader';
export {
  AppShellHeaderToggle,
  AppShellHeaderBrand,
  AppShellHeaderSwitchers,
  AppShellHeaderActions,
  useAppShellHeader,
} from './AppShellHeader';
export type {
  AppShellHeaderToggleProps,
  AppShellHeaderBrandProps,
  AppShellHeaderSwitchersProps,
  AppShellHeaderActionsProps,
} from './AppShellHeader';

// AppShellSidebar - Composable sidebar component
export { AppShellSidebar, SIDEBAR_WIDTH, COLLAPSED_SIDEBAR_WIDTH } from './AppShellSidebar';
export type { AppShellSidebarProps } from './AppShellSidebar';
export {
  AppShellSidebarNav,
  AppShellSidebarCategory,
  AppShellSidebarItem,
  AppShellSidebarFooter,
  AppShellSidebarUser,
  useAppShellSidebar,
} from './AppShellSidebar';
export type {
  AppShellSidebarNavProps,
  AppShellSidebarCategoryProps,
  AppShellSidebarItemProps,
  AppShellSidebarFooterProps,
  AppShellSidebarUserProps,
} from './AppShellSidebar';

// AppShellNotificationPanel - Composable notification panel
export { AppShellNotificationPanel } from './AppShellNotificationPanel';
export type { AppShellNotificationPanelProps } from './AppShellNotificationPanel';
export {
  NotificationHeader,
  NotificationTabs,
  NotificationActions,
  NotificationList,
  NotificationItem,
  NotificationEmptyState,
  useAppShellNotificationPanel,
  getNotificationTypeProps,
} from './AppShellNotificationPanel';
export type {
  NotificationHeaderProps,
  NotificationTabsProps,
  NotificationTabConfig,
  NotificationActionsProps,
  NotificationListProps,
  NotificationItemProps,
  NotificationEmptyStateProps,
  NotificationType,
  NotificationTypeProps,
} from './AppShellNotificationPanel';

// =============================================================================
// STANDALONE COMPONENTS
// =============================================================================

// These components are standalone and don't need compound component pattern
export { AppShellSwitcher } from './AppShellSwitcher';
export { AppShellUserMenu } from './AppShellUserMenu';
export { AppShellNotificationBanner } from './AppShellNotificationBanner';
export { AppShellFooter } from './AppShellFooter';
export { AppShellConfirmDialog } from './AppShellConfirmDialog';
