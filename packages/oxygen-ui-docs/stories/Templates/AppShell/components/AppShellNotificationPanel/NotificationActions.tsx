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
import { Box, Button } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { CheckCheck, Trash2 } from '@wso2/oxygen-ui-icons-react';

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 1,
        p: 1,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'action.hover',
        ...sx,
      }}
    >
      {hasUnread && onMarkAllRead && (
        <Button
          size="small"
          startIcon={<CheckCheck size={14} />}
          onClick={onMarkAllRead}
          sx={{ textTransform: 'none', fontSize: 12 }}
        >
          Mark all read
        </Button>
      )}
      {onClearAll && (
        <Button
          size="small"
          startIcon={<Trash2 size={14} />}
          onClick={onClearAll}
          color="error"
          sx={{ textTransform: 'none', fontSize: 12 }}
        >
          Clear all
        </Button>
      )}
    </Box>
  );
};

export default NotificationActions;
