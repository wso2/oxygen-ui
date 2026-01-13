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
 * Props for AppShellNotificationPanel component.
 */
export interface AppShellNotificationPanelProps {
  /** Notification panel content (typically NotificationPanel component) */
  children: React.ReactNode;
}

/**
 * AppShellNotificationPanel - Slot component for the notification panel overlay.
 *
 * Used as a child of AppShell to define the notification panel.
 *
 * @example
 * ```tsx
 * <AppShell>
 *   <AppShell.NotificationPanel>
 *     <NotificationPanel open={open} onClose={onClose}>...</NotificationPanel>
 *   </AppShell.NotificationPanel>
 * </AppShell>
 * ```
 */
export const AppShellNotificationPanel: React.FC<AppShellNotificationPanelProps> = ({ children }) => {
  return <>{children}</>;
};

AppShellNotificationPanel.displayName = 'AppShellNotificationPanel';

export default AppShellNotificationPanel;
