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
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Styled badge chip for the notification panel header.
 */
const NotificationHeaderBadgeRoot = styled(Chip, {
  name: 'MuiNotificationPanel',
  slot: 'HeaderBadge',
})({
  height: 20,
  fontSize: 11,
});

/**
 * Props for NotificationHeaderBadge component.
 */
export interface NotificationHeaderBadgeProps {
  /** Badge content (typically unread count) */
  children: React.ReactNode;
  /** Badge color */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationHeaderBadge - Badge for the notification panel header.
 *
 * Displays an unread count or other notification badge.
 *
 * @example
 * ```tsx
 * <NotificationPanel.Header>
 *   <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
 *   <NotificationPanel.HeaderBadge>5</NotificationPanel.HeaderBadge>
 *   ...
 * </NotificationPanel.Header>
 * ```
 */
export const NotificationHeaderBadge: React.FC<NotificationHeaderBadgeProps> = ({
  children,
  color = 'primary',
  sx,
}) => {
  // Don't render if no content or 0
  if (!children || children === 0 || children === '0') {
    return null;
  }

  return (
    <NotificationHeaderBadgeRoot label={children} size="small" color={color} sx={sx} />
  );
};

// Add display name for child detection
NotificationHeaderBadge.displayName = 'NotificationHeaderBadge';

export default NotificationHeaderBadge;
