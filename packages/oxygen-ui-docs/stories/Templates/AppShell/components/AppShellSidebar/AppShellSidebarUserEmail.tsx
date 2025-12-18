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
import { useAppShellSidebar } from './context';

/**
 * Props for AppShellSidebarUserEmail component.
 */
export interface AppShellSidebarUserEmailProps {
  /** User's email address */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarUserEmail - User email display for the sidebar user section.
 *
 * Displays the user's email with secondary styling. Hidden when the
 * sidebar is collapsed.
 *
 * Theme tokens used:
 * - `text.secondary` - Email text color
 *
 * @example
 * ```tsx
 * <AppShellSidebar.User>
 *   <AppShellSidebar.UserAvatar>JD</AppShellSidebar.UserAvatar>
 *   <AppShellSidebar.UserName>John Doe</AppShellSidebar.UserName>
 *   <AppShellSidebar.UserEmail>john@example.com</AppShellSidebar.UserEmail>
 * </AppShellSidebar.User>
 * ```
 */
export const AppShellSidebarUserEmail: React.FC<AppShellSidebarUserEmailProps> = ({
  children,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();

  // Hide when sidebar is collapsed
  if (collapsed) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

// Add display name for child detection
AppShellSidebarUserEmail.displayName = 'AppShellSidebarUserEmail';

export default AppShellSidebarUserEmail;
