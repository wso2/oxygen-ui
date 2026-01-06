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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Styled timestamp text.
 */
const NotificationItemTimestampRoot = styled(Typography, {
  name: 'MuiNotificationPanel',
  slot: 'ItemTimestamp',
})<{ component?: React.ElementType }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.disabled,
  fontSize: 11,
}));

/**
 * Props for NotificationItemTimestamp component.
 */
export interface NotificationItemTimestampProps {
  /** Timestamp text (e.g., "5 minutes ago") */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationItemTimestamp - Timestamp for a notification item.
 *
 * Displays when the notification was created.
 *
 * Theme tokens used:
 * - `text.disabled` - Timestamp text color
 *
 * @example
 * ```tsx
 * <NotificationPanel.Item id="1" type="info">
 *   ...
 *   <NotificationPanel.ItemTimestamp>5m ago</NotificationPanel.ItemTimestamp>
 * </NotificationPanel.Item>
 * ```
 */
export const NotificationItemTimestamp: React.FC<NotificationItemTimestampProps> = ({
  children,
  sx,
}) => {
  return (
    <NotificationItemTimestampRoot component="span" variant="caption" sx={sx}>
      {children}
    </NotificationItemTimestampRoot>
  );
};

// Add display name for child detection
NotificationItemTimestamp.displayName = 'NotificationItemTimestamp';

export default NotificationItemTimestamp;
