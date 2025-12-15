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
import { Box, Typography, IconButton, Chip } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { X, Bell } from '@wso2/oxygen-ui-icons-react';
import { useAppShellNotificationPanel } from './context';

/**
 * Props for NotificationHeader component.
 */
export interface NotificationHeaderProps {
  /** Title text */
  title?: string;
  /** Unread count to display */
  unreadCount?: number;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationHeader - Header section of the notification panel.
 *
 * Displays the panel title with an optional unread count badge
 * and close button.
 *
 * Theme tokens used:
 * - `divider` - Bottom border
 * - `primary` - Unread count chip color (via Chip color="primary")
 */
export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  title = 'Notifications',
  unreadCount = 0,
  showCloseButton = true,
  sx,
}) => {
  const { onClose } = useAppShellNotificationPanel();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Bell size={20} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {unreadCount > 0 && (
          <Chip
            label={unreadCount}
            size="small"
            color="primary"
            sx={{ height: 20, fontSize: 11 }}
          />
        )}
      </Box>
      {showCloseButton && (
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      )}
    </Box>
  );
};

export default NotificationHeader;
