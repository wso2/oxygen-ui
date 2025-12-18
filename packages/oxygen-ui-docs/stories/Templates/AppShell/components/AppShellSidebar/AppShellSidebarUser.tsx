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
  Tooltip,
  Divider,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';
import { AppShellSidebarUserAvatar } from './AppShellSidebarUserAvatar';
import { AppShellSidebarUserName } from './AppShellSidebarUserName';
import { AppShellSidebarUserEmail } from './AppShellSidebarUserEmail';

// Child display names for detection
const CHILD_DISPLAY_NAMES = [
  'AppShellSidebarUserAvatar',
  'AppShellSidebarUserName',
  'AppShellSidebarUserEmail',
];

/**
 * Props for AppShellSidebarUser component.
 */
export interface AppShellSidebarUserProps {
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
      if (displayName === 'AppShellSidebarUserAvatar') {
        avatarChild = child;
      } else if (
        displayName === 'AppShellSidebarUserName' ||
        displayName === 'AppShellSidebarUserEmail'
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
      if (displayName === 'AppShellSidebarUserName' && child.props.children) {
        tooltipText = String(child.props.children);
      }
    }
  });
  return tooltipText;
};

/**
 * AppShellSidebarUser - User profile section at the bottom of the sidebar.
 *
 * Uses composable children API:
 * ```tsx
 * <AppShellSidebar.User>
 *   <AppShellSidebar.UserAvatar>JD</AppShellSidebar.UserAvatar>
 *   <AppShellSidebar.UserName>John Doe</AppShellSidebar.UserName>
 *   <AppShellSidebar.UserEmail>john@example.com</AppShellSidebar.UserEmail>
 * </AppShellSidebar.User>
 * ```
 *
 * Theme tokens used:
 * - `primary.main` - Avatar background color
 * - `text.secondary` - Email text color
 */
export const AppShellSidebarUser: React.FC<AppShellSidebarUserProps> = ({
  children,
  onClick,
  showDivider = true,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();
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

AppShellSidebarUser.displayName = 'AppShellSidebarUser';

export { AppShellSidebarUserAvatar, AppShellSidebarUserName, AppShellSidebarUserEmail };
export type { AppShellSidebarUserAvatarProps } from './AppShellSidebarUserAvatar';
export type { AppShellSidebarUserNameProps } from './AppShellSidebarUserName';
export type { AppShellSidebarUserEmailProps } from './AppShellSidebarUserEmail';

export default AppShellSidebarUser;
