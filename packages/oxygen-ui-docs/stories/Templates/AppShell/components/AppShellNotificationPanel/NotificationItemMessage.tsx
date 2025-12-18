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
import { Typography } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Props for NotificationItemMessage component.
 */
export interface NotificationItemMessageProps {
  /** Message text */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationItemMessage - Message/description for a notification item.
 *
 * Displays the notification message with secondary text styling.
 *
 * Theme tokens used:
 * - `text.secondary` - Message text color
 *
 * @example
 * ```tsx
 * <AppShellNotificationPanel.Item id="1" type="info">
 *   <AppShellNotificationPanel.ItemTitle>New feature</AppShellNotificationPanel.ItemTitle>
 *   <AppShellNotificationPanel.ItemMessage>Check it out!</AppShellNotificationPanel.ItemMessage>
 *   ...
 * </AppShellNotificationPanel.Item>
 * ```
 */
export const NotificationItemMessage: React.FC<NotificationItemMessageProps> = ({
  children,
  sx,
}) => {
  return (
    <Typography
      component="span"
      variant="caption"
      sx={{
        display: 'block',
        color: 'text.secondary',
        mb: 0.5,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

// Add display name for child detection
NotificationItemMessage.displayName = 'NotificationItemMessage';

export default NotificationItemMessage;
