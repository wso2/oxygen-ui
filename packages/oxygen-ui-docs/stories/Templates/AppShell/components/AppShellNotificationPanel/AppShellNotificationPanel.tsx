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
import { Drawer } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { AppShellNotificationPanelContext } from './context';
import { NotificationHeader } from './NotificationHeader';
import { NotificationTabs } from './NotificationTabs';
import { NotificationActions } from './NotificationActions';
import { NotificationList } from './NotificationList';
import { NotificationItem } from './NotificationItem';
import { NotificationEmptyState } from './NotificationEmptyState';

/**
 * Theme tokens used in this component:
 *
 * Drawer uses theme's paper background and elevation.
 * Responsive behavior:
 * - Full width on xs (mobile)
 * - Fixed width on sm+ (tablet/desktop)
 */

/**
 * Props for the AppShellNotificationPanel component.
 */
export interface AppShellNotificationPanelProps {
  /** Whether the panel is open */
  open: boolean;
  /** Callback to close the panel */
  onClose: () => void;
  /** Panel content */
  children: React.ReactNode;
  /** Panel width (default: 380) */
  width?: number;
  /** Drawer anchor position */
  anchor?: 'left' | 'right';
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellNotificationPanel - Slide-out notification drawer compound component.
 *
 * A composable notification panel that uses the compound component pattern.
 * Children can include Header, Tabs, Actions, List, Item, and EmptyState.
 *
 * Features:
 * - Right-anchored drawer that slides in
 * - Compound component pattern for maximum flexibility
 * - Context-based close handler sharing
 * - Responsive width (full on mobile, fixed on desktop)
 *
 * Usage:
 * ```tsx
 * <AppShellNotificationPanel open={open} onClose={handleClose}>
 *   <AppShellNotificationPanel.Header unreadCount={unreadCount} />
 *   <AppShellNotificationPanel.Tabs
 *     tabs={[
 *       { label: 'All', count: all.length },
 *       { label: 'Unread', count: unread.length, color: 'primary' },
 *       { label: 'Alerts', count: alerts.length, color: 'warning' },
 *     ]}
 *     value={tabIndex}
 *     onChange={setTabIndex}
 *   />
 *   <AppShellNotificationPanel.Actions
 *     hasUnread={hasUnread}
 *     onMarkAllRead={handleMarkAllRead}
 *     onClearAll={handleClearAll}
 *   />
 *   {notifications.length === 0 ? (
 *     <AppShellNotificationPanel.EmptyState />
 *   ) : (
 *     <AppShellNotificationPanel.List>
 *       {notifications.map(n => (
 *         <AppShellNotificationPanel.Item
 *           key={n.id}
 *           {...n}
 *           onMarkRead={handleMarkRead}
 *           onDismiss={handleDismiss}
 *         />
 *       ))}
 *     </AppShellNotificationPanel.List>
 *   )}
 * </AppShellNotificationPanel>
 * ```
 */
const AppShellNotificationPanelRoot: React.FC<AppShellNotificationPanelProps> = ({
  open,
  onClose,
  children,
  width = 380,
  anchor = 'right',
  sx,
}) => {
  const contextValue = React.useMemo(() => ({ onClose }), [onClose]);

  return (
    <AppShellNotificationPanelContext.Provider value={contextValue}>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: width },
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          ...sx,
        }}
      >
        {children}
      </Drawer>
    </AppShellNotificationPanelContext.Provider>
  );
};

/**
 * AppShellNotificationPanel compound component with attached sub-components.
 *
 * Sub-components:
 * - `AppShellNotificationPanel.Header` - Panel header with title and close button
 * - `AppShellNotificationPanel.Tabs` - Tab navigation for filtering
 * - `AppShellNotificationPanel.Actions` - Bulk action buttons
 * - `AppShellNotificationPanel.List` - Scrollable notification list container
 * - `AppShellNotificationPanel.Item` - Individual notification item
 * - `AppShellNotificationPanel.EmptyState` - Empty state display
 */
export const AppShellNotificationPanel = Object.assign(AppShellNotificationPanelRoot, {
  Header: NotificationHeader,
  Tabs: NotificationTabs,
  Actions: NotificationActions,
  List: NotificationList,
  Item: NotificationItem,
  EmptyState: NotificationEmptyState,
});

export default AppShellNotificationPanel;
