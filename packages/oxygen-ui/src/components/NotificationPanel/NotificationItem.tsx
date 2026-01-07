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
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { X } from '@wso2/oxygen-ui-icons-react';
import { getNotificationTypeProps, NotificationType } from './utils';
import {
  NotificationItemProvider,
  type NotificationItemContextValue,
} from './NotificationItemContext';

/**
 * Props for styled NotificationItemRoot.
 */
interface NotificationItemRootProps {
  ownerState: {
    read: boolean;
  };
}

/**
 * Styled list item container.
 */
const NotificationItemRoot = styled(ListItem, {
  name: 'MuiNotificationPanel',
  slot: 'Item',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<NotificationItemRootProps>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.read
    ? 'transparent'
    : (theme.vars || theme).palette.action.hover,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.selected,
  },
}));

/**
 * Styled list item button.
 */
const NotificationItemButton = styled(ListItemButton, {
  name: 'MuiNotificationPanel',
  slot: 'ItemButton',
})(({ theme }) => ({
  paddingRight: theme.spacing(6),
}));

/**
 * Styled dismiss button.
 */
const NotificationItemDismiss = styled(IconButton, {
  name: 'MuiNotificationPanel',
  slot: 'ItemDismiss',
})({
  opacity: 0.5,
  '&:hover': {
    opacity: 1,
  },
});

/**
 * Styled container for timestamp and action.
 */
const NotificationItemFooter = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'ItemFooter',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));

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
 * <NotificationPanel.Item id="1" type="info">
 *   <NotificationPanel.ItemAvatar>A</NotificationPanel.ItemAvatar>
 *   <NotificationPanel.ItemTitle>New feature</NotificationPanel.ItemTitle>
 *   <NotificationPanel.ItemMessage>Check it out</NotificationPanel.ItemMessage>
 *   <NotificationPanel.ItemTimestamp>5m ago</NotificationPanel.ItemTimestamp>
 *   <NotificationPanel.ItemAction>View</NotificationPanel.ItemAction>
 * </NotificationPanel.Item>
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

  const ownerState = { read };

  return (
    <NotificationItemProvider value={contextValue}>
      <NotificationItemRoot
        disablePadding
        ownerState={ownerState}
        secondaryAction={
          onDismiss && (
            <NotificationItemDismiss
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss(id);
              }}
            >
              <X size={16} />
            </NotificationItemDismiss>
          )
        }
        sx={sx}
      >
        <NotificationItemButton onClick={handleClick}>
          {avatarChild}
          <ListItemText
            primary={titleChild}
            secondary={
              <Box component="span">
                {messageChild}
                <NotificationItemFooter>
                  {timestampChild}
                  {actionChild}
                </NotificationItemFooter>
              </Box>
            }
          />
        </NotificationItemButton>
      </NotificationItemRoot>
    </NotificationItemProvider>
  );
};

// Add display name
NotificationItem.displayName = 'NotificationItem';

export default NotificationItem;
