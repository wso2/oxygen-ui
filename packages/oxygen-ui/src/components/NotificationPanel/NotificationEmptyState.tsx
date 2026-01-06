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
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { BellOff } from '@wso2/oxygen-ui-icons-react';

/**
 * Styled container for empty state.
 */
const NotificationEmptyStateRoot = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'EmptyState',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  textAlign: 'center',
}));

/**
 * Styled message text.
 */
const NotificationEmptyStateMessage = styled(Typography, {
  name: 'MuiNotificationPanel',
  slot: 'EmptyStateMessage',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
}));

/**
 * Props for NotificationEmptyState component.
 */
export interface NotificationEmptyStateProps {
  /** Message to display */
  message?: string;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationEmptyState - Empty state display for no notifications.
 *
 * Shows a centered message with an icon when there are no notifications
 * to display.
 *
 * Theme tokens used:
 * - `text.secondary` - Message text color
 */
export const NotificationEmptyState: React.FC<NotificationEmptyStateProps> = ({
  message = 'No notifications',
  icon,
  sx,
}) => {
  return (
    <NotificationEmptyStateRoot sx={sx}>
      {icon || <BellOff size={48} style={{ opacity: 0.3, marginBottom: 16 }} />}
      <NotificationEmptyStateMessage variant="body2">
        {message}
      </NotificationEmptyStateMessage>
    </NotificationEmptyStateRoot>
  );
};

export default NotificationEmptyState;
