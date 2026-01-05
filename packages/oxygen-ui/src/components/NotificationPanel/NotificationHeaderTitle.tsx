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
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Props for NotificationHeaderTitle component.
 */
export interface NotificationHeaderTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationHeaderTitle - Title for the notification panel header.
 *
 * Displays the panel title with proper styling.
 *
 * @example
 * ```tsx
 * <NotificationPanel.Header>
 *   <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
 *   ...
 * </NotificationPanel.Header>
 * ```
 */
export const NotificationHeaderTitle: React.FC<NotificationHeaderTitleProps> = ({
  children,
  sx,
}) => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

// Add display name for child detection
NotificationHeaderTitle.displayName = 'NotificationHeaderTitle';

export default NotificationHeaderTitle;
