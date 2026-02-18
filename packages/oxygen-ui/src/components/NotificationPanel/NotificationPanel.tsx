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
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { NotificationPanelContext } from './context';
import { AppShellContext } from '../AppShell/context';
import { NotificationHeader } from './NotificationHeader';
import { NotificationHeaderIcon } from './NotificationHeaderIcon';
import { NotificationHeaderTitle } from './NotificationHeaderTitle';
import { NotificationHeaderBadge } from './NotificationHeaderBadge';
import { NotificationHeaderClose } from './NotificationHeaderClose';
import { NotificationTabs } from './NotificationTabs';
import { NotificationActions } from './NotificationActions';
import { NotificationList } from './NotificationList';
import { NotificationItem } from './NotificationItem';
import { NotificationItemAvatar } from './NotificationItemAvatar';
import { NotificationItemTitle } from './NotificationItemTitle';
import { NotificationItemMessage } from './NotificationItemMessage';
import { NotificationItemTimestamp } from './NotificationItemTimestamp';
import { NotificationItemAction } from './NotificationItemAction';
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
 * Props for styled NotificationPanelRoot.
 */
interface NotificationPanelRootProps {
  ownerState: {
    width: number;
  };
}

/**
 * Styled drawer for the notification panel.
 */
const NotificationPanelRoot = styled(Drawer, {
  name: 'MuiNotificationPanel',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<NotificationPanelRootProps>(({ theme, ownerState }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: ownerState.width,
    },
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

/**
 * Props for the NotificationPanel component.
 */
export interface NotificationPanelProps {
  /** Whether the panel is open (optional, uses AppShell context if available) */
  open?: boolean;
  /** Callback to close the panel (optional, uses AppShell context if available) */
  onClose?: () => void;
  /** Panel content */
  children: React.ReactNode;
  /** Panel width (default: 380) */
  width?: number;
  /** Drawer anchor position */
  anchor?: 'left' | 'right';
  /** Drawer variant (default: 'temporary') */
  variant?: 'permanent' | 'persistent' | 'temporary';
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationPanel - Slide-out notification drawer compound component.
 *
 * A composable notification panel that uses the compound component pattern.
 * Children can include Header, Tabs, Actions, List, Item, and EmptyState.
 *
 * Features:
 * - Right-anchored drawer that slides in
 * - Compound component pattern for maximum flexibility
 * - Context-based close handler sharing
 * - Responsive width (full on mobile, fixed on desktop)
 * - Supports temporary, persistent, and permanent variants
 * - Can be clipped under app bar using persistent/permanent variant
 *
 * @example
 * // Clipped under app bar
 * <Box sx={{ display: 'flex' }}>
 *   <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
 *     <Toolbar>...</Toolbar>
 *   </AppBar>
 *   <Box component="main" sx={{ flexGrow: 1 }}>
 *     <Toolbar />
 *     <NotificationPanel open={open} onClose={handleClose} variant="persistent">
 *       ...
 *     </NotificationPanel>
 *   </Box>
 * </Box>
 *
 * @example
 * // Default overlay
 * <NotificationPanel open={open} onClose={handleClose}>
 *   <NotificationPanel.Header>
 *     <NotificationPanel.HeaderIcon>...</NotificationPanel.HeaderIcon>
 *     <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
 *     <NotificationPanel.HeaderBadge>5</NotificationPanel.HeaderBadge>
 *     <NotificationPanel.HeaderClose />
 *   </NotificationPanel.Header>
 *   <NotificationPanel.Tabs tabs={tabs} value={tabIndex} onChange={setTabIndex} />
 *   <NotificationPanel.Actions hasUnread={true} onMarkAllRead={handler} onClearAll={handler} />
 *   <NotificationPanel.List>
 *     <NotificationPanel.Item id="1" type="info">
 *       <NotificationPanel.ItemAvatar>A</NotificationPanel.ItemAvatar>
 *       <NotificationPanel.ItemTitle>Title</NotificationPanel.ItemTitle>
 *       <NotificationPanel.ItemMessage>Message</NotificationPanel.ItemMessage>
 *       <NotificationPanel.ItemTimestamp>5 min ago</NotificationPanel.ItemTimestamp>
 *       <NotificationPanel.ItemAction>View</NotificationPanel.ItemAction>
 *     </NotificationPanel.Item>
 *   </NotificationPanel.List>
 * </NotificationPanel>
 */
const NotificationPanel: React.FC<NotificationPanelProps> & {
  Header: typeof NotificationHeader;
  HeaderIcon: typeof NotificationHeaderIcon;
  HeaderTitle: typeof NotificationHeaderTitle;
  HeaderBadge: typeof NotificationHeaderBadge;
  HeaderClose: typeof NotificationHeaderClose;
  Tabs: typeof NotificationTabs;
  Actions: typeof NotificationActions;
  List: typeof NotificationList;
  Item: typeof NotificationItem;
  ItemAvatar: typeof NotificationItemAvatar;
  ItemTitle: typeof NotificationItemTitle;
  ItemMessage: typeof NotificationItemMessage;
  ItemTimestamp: typeof NotificationItemTimestamp;
  ItemAction: typeof NotificationItemAction;
  EmptyState: typeof NotificationEmptyState;
} = ({
  open: openProp,
  onClose: onCloseProp,
  children,
  width = 380,
  anchor = 'right',
  variant = 'temporary',
  sx,
}) => {
  // Try to consume AppShell context (optional - gracefully degrades if not available)
  const appShellContext = React.useContext(AppShellContext);

  // Use context values as defaults, allow prop overrides
  const open = openProp ?? appShellContext?.state.notificationPanelOpen ?? false;
  const onClose = React.useMemo(
    () => onCloseProp ?? appShellContext?.actions.toggleNotificationPanel ?? (() => {}),
    [onCloseProp, appShellContext?.actions.toggleNotificationPanel]
  );

  const contextValue = React.useMemo(() => ({ onClose }), [onClose]);
  const ownerState = { width };

  return (
    <NotificationPanelContext.Provider value={contextValue}>
      <NotificationPanelRoot
        anchor={anchor}
        open={open}
        onClose={onClose}
        ownerState={ownerState}
        sx={sx}
        variant={variant}
      >
        {children}
      </NotificationPanelRoot>
    </NotificationPanelContext.Provider>
  );
};

/**
 * NotificationPanel compound component with attached sub-components.
 *
 * Sub-components:
 * - `NotificationPanel.Header` - Panel header with title and close button
 * - `NotificationPanel.HeaderIcon` - Icon in the header
 * - `NotificationPanel.HeaderTitle` - Title text in the header
 * - `NotificationPanel.HeaderBadge` - Badge/count in the header
 * - `NotificationPanel.HeaderClose` - Close button
 * - `NotificationPanel.Tabs` - Tab navigation for filtering
 * - `NotificationPanel.Actions` - Bulk action buttons
 * - `NotificationPanel.List` - Scrollable notification list container
 * - `NotificationPanel.Item` - Individual notification item
 * - `NotificationPanel.ItemAvatar` - Avatar for notification item
 * - `NotificationPanel.ItemTitle` - Title for notification item
 * - `NotificationPanel.ItemMessage` - Message for notification item
 * - `NotificationPanel.ItemTimestamp` - Timestamp for notification item
 * - `NotificationPanel.ItemAction` - Action button for notification item
 * - `NotificationPanel.EmptyState` - Empty state display
 */
NotificationPanel.Header = NotificationHeader;
NotificationPanel.HeaderIcon = NotificationHeaderIcon;
NotificationPanel.HeaderTitle = NotificationHeaderTitle;
NotificationPanel.HeaderBadge = NotificationHeaderBadge;
NotificationPanel.HeaderClose = NotificationHeaderClose;
NotificationPanel.Tabs = NotificationTabs;
NotificationPanel.Actions = NotificationActions;
NotificationPanel.List = NotificationList;
NotificationPanel.Item = NotificationItem;
NotificationPanel.ItemAvatar = NotificationItemAvatar;
NotificationPanel.ItemTitle = NotificationItemTitle;
NotificationPanel.ItemMessage = NotificationItemMessage;
NotificationPanel.ItemTimestamp = NotificationItemTimestamp;
NotificationPanel.ItemAction = NotificationItemAction;
NotificationPanel.EmptyState = NotificationEmptyState;
NotificationPanel.displayName = 'NotificationPanel';

export { NotificationPanel };
export default NotificationPanel;
