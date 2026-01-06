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
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Styled header container for the notification panel.
 */
const NotificationHeaderRoot = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'Header',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

/**
 * Styled container for header left content.
 */
const NotificationHeaderContent = styled(Box, {
  name: 'MuiNotificationPanel',
  slot: 'HeaderContent',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
 * Props for NotificationHeader component.
 */
export interface NotificationHeaderProps {
  /** Composable children (HeaderIcon, HeaderTitle, HeaderBadge, HeaderClose) */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Separates children by type for proper layout.
 */
const separateChildren = (children: React.ReactNode): {
  leftChildren: React.ReactNode[];
  closeChild: React.ReactNode;
} => {
  const leftChildren: React.ReactNode[] = [];
  let closeChild: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      if (displayName === 'NotificationHeaderClose') {
        closeChild = child;
      } else {
        leftChildren.push(child);
      }
    } else {
      leftChildren.push(child);
    }
  });

  return { leftChildren, closeChild };
};

/**
 * NotificationHeader - Header section of the notification panel.
 *
 * Uses composable children API:
 * ```tsx
 * <NotificationPanel.Header>
 *   <NotificationPanel.HeaderIcon><Bell size={20} /></NotificationPanel.HeaderIcon>
 *   <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
 *   <NotificationPanel.HeaderBadge>5</NotificationPanel.HeaderBadge>
 *   <NotificationPanel.HeaderClose />
 * </NotificationPanel.Header>
 * ```
 *
 * Theme tokens used:
 * - `divider` - Bottom border
 * - `primary` - Unread count chip color (via Chip color="primary")
 */
export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  children,
  sx,
}) => {
  const { leftChildren, closeChild } = separateChildren(children);

  return (
    <NotificationHeaderRoot sx={sx}>
      <NotificationHeaderContent>{leftChildren}</NotificationHeaderContent>
      {closeChild}
    </NotificationHeaderRoot>
  );
};

// Add display name
NotificationHeader.displayName = 'NotificationHeader';

export default NotificationHeader;
