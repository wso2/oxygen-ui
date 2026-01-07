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
import { useSidebar } from './context';

/**
 * Styled user name for the sidebar user section.
 */
const SidebarUserNameRoot = styled(Typography, {
  name: 'MuiSidebar',
  slot: 'UserName',
})({
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Props for SidebarUserName component.
 */
export interface SidebarUserNameProps {
  /** User's display name */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarUserName - User name display for the sidebar user section.
 *
 * Displays the user's name with proper styling. Hidden when the
 * sidebar is collapsed.
 *
 * @example
 * ```tsx
 * <Sidebar.User>
 *   <Sidebar.UserAvatar>JD</Sidebar.UserAvatar>
 *   <Sidebar.UserName>John Doe</Sidebar.UserName>
 *   <Sidebar.UserEmail>john@example.com</Sidebar.UserEmail>
 * </Sidebar.User>
 * ```
 */
export const SidebarUserName: React.FC<SidebarUserNameProps> = ({
  children,
  sx,
}) => {
  const { collapsed } = useSidebar();

  // Hide when sidebar is collapsed
  if (collapsed) {
    return null;
  }

  return (
    <SidebarUserNameRoot variant="body2" sx={sx}>
      {children}
    </SidebarUserNameRoot>
  );
};

// Add display name for child detection
SidebarUserName.displayName = 'SidebarUserName';

export default SidebarUserName;
