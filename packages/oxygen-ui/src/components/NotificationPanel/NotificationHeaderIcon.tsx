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
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Props for NotificationHeaderIcon component.
 */
export interface NotificationHeaderIconProps {
  /** Icon element */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * NotificationHeaderIcon - Icon for the notification panel header.
 *
 * Displays an icon in the header section.
 *
 * @example
 * ```tsx
 * <NotificationPanel.Header>
 *   <NotificationPanel.HeaderIcon><Bell size={20} /></NotificationPanel.HeaderIcon>
 *   ...
 * </NotificationPanel.Header>
 * ```
 */
export const NotificationHeaderIcon: React.FC<NotificationHeaderIconProps> = ({
  children,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

// Add display name for child detection
NotificationHeaderIcon.displayName = 'NotificationHeaderIcon';

export default NotificationHeaderIcon;
