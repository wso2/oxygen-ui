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
import { Box } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { NotificationHeaderIcon } from './NotificationHeaderIcon';
import { NotificationHeaderTitle } from './NotificationHeaderTitle';
import { NotificationHeaderBadge } from './NotificationHeaderBadge';
import { NotificationHeaderClose } from './NotificationHeaderClose';

// Child display names for detection
const CHILD_DISPLAY_NAMES = [
  'NotificationHeaderIcon',
  'NotificationHeaderTitle',
  'NotificationHeaderBadge',
  'NotificationHeaderClose',
];

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
 * <AppShellNotificationPanel.Header>
 *   <AppShellNotificationPanel.HeaderIcon><Bell size={20} /></AppShellNotificationPanel.HeaderIcon>
 *   <AppShellNotificationPanel.HeaderTitle>Notifications</AppShellNotificationPanel.HeaderTitle>
 *   <AppShellNotificationPanel.HeaderBadge>5</AppShellNotificationPanel.HeaderBadge>
 *   <AppShellNotificationPanel.HeaderClose />
 * </AppShellNotificationPanel.Header>
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {leftChildren}
      </Box>
      {closeChild}
    </Box>
  );
};

// Add display name
NotificationHeader.displayName = 'NotificationHeader';

export {
  NotificationHeaderIcon,
  NotificationHeaderTitle,
  NotificationHeaderBadge,
  NotificationHeaderClose,
};
export type { NotificationHeaderIconProps } from './NotificationHeaderIcon';
export type { NotificationHeaderTitleProps } from './NotificationHeaderTitle';
export type { NotificationHeaderBadgeProps } from './NotificationHeaderBadge';
export type { NotificationHeaderCloseProps } from './NotificationHeaderClose';

export default NotificationHeader;
