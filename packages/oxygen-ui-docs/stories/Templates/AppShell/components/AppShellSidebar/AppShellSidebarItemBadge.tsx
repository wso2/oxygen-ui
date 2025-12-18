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
import { Chip } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';

/**
 * Props for AppShellSidebarItemBadge component.
 */
export interface AppShellSidebarItemBadgeProps {
  /** Badge content (number or string) */
  children: React.ReactNode;
  /** Badge color */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarItemBadge - Badge for a sidebar item.
 *
 * Displays a small chip/badge next to the item label. Hidden when
 * the sidebar is collapsed.
 *
 * @example
 * ```tsx
 * <AppShellSidebar.Item id="notifications">
 *   <AppShellSidebar.ItemIcon><Bell size={20} /></AppShellSidebar.ItemIcon>
 *   <AppShellSidebar.ItemLabel>Notifications</AppShellSidebar.ItemLabel>
 *   <AppShellSidebar.ItemBadge color="error">5</AppShellSidebar.ItemBadge>
 * </AppShellSidebar.Item>
 * ```
 */
export const AppShellSidebarItemBadge: React.FC<AppShellSidebarItemBadgeProps> = ({
  children,
  color = 'error',
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();

  // Hide badge when sidebar is collapsed
  if (collapsed) {
    return null;
  }

  return (
    <Chip
      label={children}
      size="small"
      color={color}
      sx={{
        height: 20,
        fontSize: 11,
        ml: 'auto',
        ...sx,
      }}
    />
  );
};

// Add display name for child detection
AppShellSidebarItemBadge.displayName = 'AppShellSidebarItemBadge';

export default AppShellSidebarItemBadge;
