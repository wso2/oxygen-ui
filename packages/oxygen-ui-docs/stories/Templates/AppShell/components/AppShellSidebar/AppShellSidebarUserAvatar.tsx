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
import { Avatar } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Props for AppShellSidebarUserAvatar component.
 */
export interface AppShellSidebarUserAvatarProps {
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
 * AppShellSidebarUserAvatar - Avatar for the user section.
 *
 * Displays user avatar with primary color background.
 * Can display initials as children or an image via src prop.
 *
 * Theme tokens used:
 * - `primary.main` - Avatar background color
 *
 * @example
 * ```tsx
 * <AppShellSidebar.User>
 *   <AppShellSidebar.UserAvatar>JD</AppShellSidebar.UserAvatar>
 *   <AppShellSidebar.UserName>John Doe</AppShellSidebar.UserName>
 * </AppShellSidebar.User>
 * ```
 */
export const AppShellSidebarUserAvatar: React.FC<AppShellSidebarUserAvatarProps> = ({
  children,
  src,
  alt,
  sx,
}) => {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: 32,
        height: 32,
        bgcolor: 'primary.main',
        fontSize: 14,
        ...sx,
      }}
    >
      {children}
    </Avatar>
  );
};

// Add display name for child detection
AppShellSidebarUserAvatar.displayName = 'AppShellSidebarUserAvatar';

export default AppShellSidebarUserAvatar;
