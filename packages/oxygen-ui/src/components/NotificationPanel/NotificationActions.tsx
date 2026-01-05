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
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { CheckCheck, Trash2 } from '@wso2/oxygen-ui-icons-react';

/**
 * Styled actions container.
 */
const NotificationActionsRoot = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'Actions',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundColor: (theme.vars || theme).palette.action.hover,
}));

/**
 * Styled action button.
 */
const NotificationActionButton = styled(Button, {
  name: 'MuiNotificationPanel',
  slot: 'ActionButton',
})({
  textTransform: 'none',
  fontSize: 12,
});

/**
 * Props for NotificationActions component.
 */
export interface NotificationActionsProps {
  /** Whether there are unread notifications */
  hasUnread?: boolean;
  /** Callback to mark all as read */
  onMarkAllRead?: () => void;
  /** Callback to clear all notifications */
  onClearAll?: () => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationActions - Bulk action buttons for notifications.
 *
 * Provides "Mark all read" and "Clear all" actions.
 *
 * Theme tokens used:
 * - `action.hover` - Background color
 * - `divider` - Border color
 * - `error` - Clear all button color (via Button color="error")
 */
export const NotificationActions: React.FC<NotificationActionsProps> = ({
  hasUnread = false,
  onMarkAllRead,
  onClearAll,
  sx,
}) => {
  return (
    <NotificationActionsRoot sx={sx}>
      {hasUnread && onMarkAllRead && (
        <NotificationActionButton
          size="small"
          startIcon={<CheckCheck size={14} />}
          onClick={onMarkAllRead}
        >
          Mark all read
        </NotificationActionButton>
      )}
      {onClearAll && (
        <NotificationActionButton
          size="small"
          startIcon={<Trash2 size={14} />}
          onClick={onClearAll}
          color="error"
        >
          Clear all
        </NotificationActionButton>
      )}
    </NotificationActionsRoot>
  );
};

export default NotificationActions;
