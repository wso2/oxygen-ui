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
import {
  Box,
  ListItemButton,
  Avatar,
  Typography,
  Tooltip,
  Divider,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';

/**
 * Props for AppShellSidebarUser component.
 */
export interface AppShellSidebarUserProps {
  /** User's display name */
  name: string;
  /** User's email */
  email?: string;
  /** User's avatar (initials or image URL) */
  avatar?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether to show divider above */
  showDivider?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarUser - User profile section at the bottom of the sidebar.
 *
 * Displays user avatar, name, and email. When collapsed, shows only
 * the avatar with a tooltip containing the user's name.
 *
 * Theme tokens used:
 * - `primary.main` - Avatar background color
 * - `text.secondary` - Email text color
 */
export const AppShellSidebarUser: React.FC<AppShellSidebarUserProps> = ({
  name,
  email,
  avatar,
  onClick,
  showDivider = true,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();

  const content = (
    <ListItemButton
      onClick={onClick}
      sx={{
        minHeight: 56,
        px: 2,
        justifyContent: collapsed ? 'center' : 'initial',
        borderRadius: 1,
        mx: 1,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: 'primary.main',
          fontSize: 14,
        }}
      >
        {avatar || name.charAt(0)}
      </Avatar>
      {!collapsed && (
        <Box sx={{ ml: 2, overflow: 'hidden' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Typography>
          {email && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
              }}
            >
              {email}
            </Typography>
          )}
        </Box>
      )}
    </ListItemButton>
  );

  return (
    <>
      {showDivider && <Divider />}
      <Box sx={{ p: 1, ...sx }}>
        {collapsed ? (
          <Tooltip title={name} placement="right" arrow>
            {content}
          </Tooltip>
        ) : (
          content
        )}
      </Box>
    </>
  );
};

export default AppShellSidebarUser;
