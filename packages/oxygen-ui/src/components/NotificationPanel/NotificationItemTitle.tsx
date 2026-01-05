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
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { useNotificationItemContext } from './NotificationItemContext';

/**
 * Props for NotificationItemTitle component.
 */
export interface NotificationItemTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Whether to show unread indicator dot */
  showUnreadIndicator?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationItemTitle - Title for a notification item.
 *
 * Displays the notification title with bold styling for unread notifications.
 * Can optionally show an unread indicator dot.
 *
 * Theme tokens used:
 * - `primary.main` - Unread indicator dot color
 *
 * @example
 * ```tsx
 * <NotificationPanel.Item id="1" type="info">
 *   <NotificationPanel.ItemTitle>New feature</NotificationPanel.ItemTitle>
 *   ...
 * </NotificationPanel.Item>
 * ```
 */
export const NotificationItemTitle: React.FC<NotificationItemTitleProps> = ({
  children,
  showUnreadIndicator = true,
  sx,
}) => {
  const { read } = useNotificationItemContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: read ? 400 : 600,
          flex: 1,
        }}
      >
        {children}
      </Typography>
      {showUnreadIndicator && !read && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            flexShrink: 0,
          }}
        />
      )}
    </Box>
  );
};

// Add display name for child detection
NotificationItemTitle.displayName = 'NotificationItemTitle';

export default NotificationItemTitle;
