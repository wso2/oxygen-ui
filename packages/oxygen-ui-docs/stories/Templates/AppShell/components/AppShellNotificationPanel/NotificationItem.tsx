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
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { X } from '@wso2/oxygen-ui-icons-react';
import { getNotificationTypeProps, NotificationType } from './utils';
import {
  NotificationItemProvider,
  type NotificationItemContextValue,
} from './NotificationItemContext';
import { NotificationItemAvatar } from './NotificationItemAvatar';
import { NotificationItemTitle } from './NotificationItemTitle';
import { NotificationItemMessage } from './NotificationItemMessage';
import { NotificationItemTimestamp } from './NotificationItemTimestamp';
import { NotificationItemAction } from './NotificationItemAction';

// Child display names for detection
const CHILD_DISPLAY_NAMES = [
  'NotificationItemAvatar',
  'NotificationItemTitle',
  'NotificationItemMessage',
  'NotificationItemTimestamp',
  'NotificationItemAction',
];

/**
 * Props for NotificationItem component.
 */
export interface NotificationItemProps {
  /** Unique identifier */
  id: string;
  /** Notification type for icon/color */
  type: NotificationType;
  /** Whether notification has been read */
  read?: boolean;
  /** Composable children (ItemAvatar, ItemTitle, ItemMessage, ItemTimestamp, ItemAction) */
  children: React.ReactNode;
  /** Optional action callback */
  onAction?: () => void;
  /** Callback when marked as read */
  onMarkRead?: (id: string) => void;
  /** Callback when dismissed */
  onDismiss?: (id: string) => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Separates children by type for proper layout.
 */
const separateChildren = (children: React.ReactNode): {
  avatarChild: React.ReactNode;
  titleChild: React.ReactNode;
  messageChild: React.ReactNode;
  timestampChild: React.ReactNode;
  actionChild: React.ReactNode;
} => {
  let avatarChild: React.ReactNode = null;
  let titleChild: React.ReactNode = null;
  let messageChild: React.ReactNode = null;
  let timestampChild: React.ReactNode = null;
  let actionChild: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      switch (displayName) {
        case 'NotificationItemAvatar':
          avatarChild = child;
          break;
        case 'NotificationItemTitle':
          titleChild = child;
          break;
        case 'NotificationItemMessage':
          messageChild = child;
          break;
        case 'NotificationItemTimestamp':
          timestampChild = child;
          break;
        case 'NotificationItemAction':
          actionChild = child;
          break;
      }
    }
  });

  return { avatarChild, titleChild, messageChild, timestampChild, actionChild };
};

/**
 * NotificationItem - Individual notification in the panel.
 *
 * Uses composable children API:
 * ```tsx
 * <AppShellNotificationPanel.Item id="1" type="info">
 *   <AppShellNotificationPanel.ItemAvatar>A</AppShellNotificationPanel.ItemAvatar>
 *   <AppShellNotificationPanel.ItemTitle>New feature</AppShellNotificationPanel.ItemTitle>
 *   <AppShellNotificationPanel.ItemMessage>Check it out</AppShellNotificationPanel.ItemMessage>
 *   <AppShellNotificationPanel.ItemTimestamp>5m ago</AppShellNotificationPanel.ItemTimestamp>
 *   <AppShellNotificationPanel.ItemAction>View</AppShellNotificationPanel.ItemAction>
 * </AppShellNotificationPanel.Item>
 * ```
 *
 * Theme tokens used:
 * - `action.hover` - Unread notification background
 * - `action.selected` - Hover state
 * - `primary.main` - Unread indicator dot
 * - `text.secondary` - Message text
 * - `text.disabled` - Timestamp text
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  type,
  read = false,
  children,
  onAction,
  onMarkRead,
  onDismiss,
  sx,
}) => {
  const typeProps = getNotificationTypeProps(type);
  const { avatarChild, titleChild, messageChild, timestampChild, actionChild } =
    separateChildren(children);

  // Create context value for child components
  const contextValue: NotificationItemContextValue = {
    id,
    type,
    typeProps,
    read,
    onMarkRead: () => onMarkRead?.(id),
    onAction,
  };

  const handleClick = () => {
    if (!read) {
      onMarkRead?.(id);
    }
    onAction?.();
  };

  return (
    <NotificationItemProvider value={contextValue}>
      <ListItem
        disablePadding
        secondaryAction={
          onDismiss && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss(id);
              }}
              sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
            >
              <X size={16} />
            </IconButton>
          )
        }
        sx={{
          bgcolor: read ? 'transparent' : 'action.hover',
          '&:hover': {
            bgcolor: 'action.selected',
          },
          ...sx,
        }}
      >
        <ListItemButton onClick={handleClick} sx={{ pr: 6 }}>
          {avatarChild}
          <ListItemText
            primary={titleChild}
            secondary={
              <Box component="span">
                {messageChild}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  {timestampChild}
                  {actionChild}
                </Box>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
    </NotificationItemProvider>
  );
};

// Add display name
NotificationItem.displayName = 'NotificationItem';

export {
  NotificationItemAvatar,
  NotificationItemTitle,
  NotificationItemMessage,
  NotificationItemTimestamp,
  NotificationItemAction,
};
export { useNotificationItemContext } from './NotificationItemContext';
export type { NotificationItemContextValue } from './NotificationItemContext';
export type { NotificationItemAvatarProps } from './NotificationItemAvatar';
export type { NotificationItemTitleProps } from './NotificationItemTitle';
export type { NotificationItemMessageProps } from './NotificationItemMessage';
export type { NotificationItemTimestampProps } from './NotificationItemTimestamp';
export type { NotificationItemActionProps } from './NotificationItemAction';

export default NotificationItem;
