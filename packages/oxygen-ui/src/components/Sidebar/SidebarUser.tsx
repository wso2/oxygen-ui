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
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSidebar } from './context';
import { SidebarUserAvatar } from './SidebarUserAvatar';
import { SidebarUserName } from './SidebarUserName';
import { SidebarUserEmail } from './SidebarUserEmail';

// Child display names for detection
const CHILD_DISPLAY_NAMES = [
  'SidebarUserAvatar',
  'SidebarUserName',
  'SidebarUserEmail',
];

/**
 * Props for SidebarUser component.
 */
export interface SidebarUserProps {
  /** Composable children (UserAvatar, UserName, UserEmail) */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Whether to show divider above */
  showDivider?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Separates children by type for proper layout.
 */
const separateChildren = (children: React.ReactNode): {
  avatarChild: React.ReactNode;
  textChildren: React.ReactNode[];
} => {
  let avatarChild: React.ReactNode = null;
  const textChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      if (displayName === 'SidebarUserAvatar') {
        avatarChild = child;
      } else if (
        displayName === 'SidebarUserName' ||
        displayName === 'SidebarUserEmail'
      ) {
        textChildren.push(child);
      }
    }
  });

  return { avatarChild, textChildren };
};

/**
 * Gets the tooltip text from children.
 */
const getTooltipText = (children: React.ReactNode): string => {
  let tooltipText = '';
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      const props = child.props as { children?: React.ReactNode };
      if (displayName === 'SidebarUserName' && props.children) {
        tooltipText = String(props.children);
      }
    }
  });
  return tooltipText;
};

/**
 * SidebarUser - User profile section at the bottom of the sidebar.
 *
 * Uses composable children API:
 * ```tsx
 * <Sidebar.User>
 *   <Sidebar.UserAvatar>JD</Sidebar.UserAvatar>
 *   <Sidebar.UserName>John Doe</Sidebar.UserName>
 *   <Sidebar.UserEmail>john@example.com</Sidebar.UserEmail>
 * </Sidebar.User>
 * ```
 *
 * Theme tokens used:
 * - `primary.main` - Avatar background color
 * - `text.secondary` - Email text color
 */
export const SidebarUser: React.FC<SidebarUserProps> = ({
  children,
  onClick,
  showDivider = true,
  sx,
}) => {
  const { collapsed } = useSidebar();
  const { avatarChild, textChildren } = separateChildren(children);
  const tooltipText = getTooltipText(children);

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
      {avatarChild}
      {!collapsed && textChildren.length > 0 && (
        <Box sx={{ ml: 2, overflow: 'hidden' }}>
          {textChildren}
        </Box>
      )}
    </ListItemButton>
  );

  return (
    <>
      {showDivider && <Divider />}
      <Box sx={{ p: 1, ...sx }}>
        {collapsed ? (
          <Tooltip title={tooltipText} placement="right" arrow>
            {content}
          </Tooltip>
        ) : (
          content
        )}
      </Box>
    </>
  );
};

SidebarUser.displayName = 'SidebarUser';

export { SidebarUserAvatar, SidebarUserName, SidebarUserEmail };
export type { SidebarUserAvatarProps } from './SidebarUserAvatar';
export type { SidebarUserNameProps } from './SidebarUserName';
export type { SidebarUserEmailProps } from './SidebarUserEmail';

export default SidebarUser;
