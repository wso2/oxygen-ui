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
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Styled avatar for the sidebar user section.
 */
const SidebarUserAvatarRoot = styled(Avatar, {
  name: 'MuiSidebar',
  slot: 'UserAvatar',
})(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  color: (theme.vars || theme).palette.primary.contrastText,
  fontSize: 14,
}));

/**
 * Props for SidebarUserAvatar component.
 */
export interface SidebarUserAvatarProps {
  /** Avatar content (initials or text) */
  children?: React.ReactNode;
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarUserAvatar - Avatar for the user section.
 *
 * Displays user avatar with primary color background.
 * Can display initials as children or an image via src prop.
 *
 * Theme tokens used:
 * - `primary.main` - Avatar background color
 *
 * @example
 * ```tsx
 * <Sidebar.User>
 *   <Sidebar.UserAvatar>JD</Sidebar.UserAvatar>
 *   <Sidebar.UserName>John Doe</Sidebar.UserName>
 * </Sidebar.User>
 * ```
 */
export const SidebarUserAvatar: React.FC<SidebarUserAvatarProps> = ({
  children,
  src,
  alt,
  sx,
}) => {
  return (
    <SidebarUserAvatarRoot src={src} alt={alt} sx={sx}>
      {children}
    </SidebarUserAvatarRoot>
  );
};

// Add display name for child detection
SidebarUserAvatar.displayName = 'SidebarUserAvatar';

export default SidebarUserAvatar;
