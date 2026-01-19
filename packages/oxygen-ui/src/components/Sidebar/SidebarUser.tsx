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
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSidebar } from './context';
import { SidebarUserAvatar } from './SidebarUserAvatar';
import { SidebarUserName } from './SidebarUserName';
import { SidebarUserEmail } from './SidebarUserEmail';

/**
 * Props for styled SidebarUserButton.
 */
interface SidebarUserButtonProps {
  ownerState: {
    collapsed: boolean;
  };
}

/**
 * Styled container for the user section.
 */
const SidebarUserRoot = styled(Box, {
  name: 'MuiSidebar',
  slot: 'User',
})(({ theme }) => ({
  padding: theme.spacing(2),
}));

/**
 * Styled button for user profile.
 */
const SidebarUserButton = styled(ListItemButton, {
  name: 'MuiSidebar',
  slot: 'UserButton',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<SidebarUserButtonProps>(({ theme, ownerState }) => ({
  minHeight: 56,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  justifyContent: ownerState.collapsed ? 'center' : 'initial',
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  transition: theme.transitions.create(['padding-left', 'padding-right'], {
    easing: theme.transitions.easing.sharp,
    duration: ownerState.collapsed
      ? theme.transitions.duration.leavingScreen
      : theme.transitions.duration.enteringScreen,
  }),
}))

/**
 * Styled container for user text content.
 */
const SidebarUserTextContainer = styled(Box, {
  name: 'MuiSidebar',
  slot: 'UserTextContainer',
  shouldForwardProp: prop => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  marginLeft: theme.spacing(2),
  overflow: 'hidden',
  opacity: collapsed ? 0 : 1,
  width: collapsed ? 0 : 'auto',
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['opacity', 'width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: collapsed
      ? theme.transitions.duration.leavingScreen
      : theme.transitions.duration.enteringScreen,
  }),
}))

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

  const ownerState = { collapsed };

  const content = (
    <SidebarUserButton onClick={onClick} ownerState={ownerState}>
      {avatarChild}
      <SidebarUserTextContainer collapsed={collapsed}>{textChildren}</SidebarUserTextContainer>
    </SidebarUserButton>
  );

  return (
    <>
      {showDivider && <Divider />}
      <SidebarUserRoot sx={sx}>
        {collapsed ? (
          <Tooltip title={tooltipText} placement="right" arrow>
            {content}
          </Tooltip>
        ) : (
          content
        )}
      </SidebarUserRoot>
    </>
  );
};

SidebarUser.displayName = 'SidebarUser';

export { SidebarUserAvatar, SidebarUserName, SidebarUserEmail };
export type { SidebarUserAvatarProps } from './SidebarUserAvatar';
export type { SidebarUserNameProps } from './SidebarUserName';
export type { SidebarUserEmailProps } from './SidebarUserEmail';

export default SidebarUser;
