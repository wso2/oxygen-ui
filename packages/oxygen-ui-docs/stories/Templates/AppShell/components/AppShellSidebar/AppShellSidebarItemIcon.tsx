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
import { ListItemIcon } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';
import { useAppShellSidebarItemContext } from './AppShellSidebarItemContext';

/**
 * Props for AppShellSidebarItemIcon component.
 */
export interface AppShellSidebarItemIconProps {
  /** Icon element to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarItemIcon - Icon container for a sidebar item.
 *
 * Automatically adjusts styling based on active state and collapsed state.
 * Use as a child of AppShellSidebar.Item for composable menu items.
 *
 * Theme tokens used:
 * - `primary.main` - Active item icon color
 *
 * @example
 * ```tsx
 * <AppShellSidebar.Item id="home">
 *   <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
 *   <AppShellSidebar.ItemLabel>Home</AppShellSidebar.ItemLabel>
 * </AppShellSidebar.Item>
 * ```
 */
export const AppShellSidebarItemIcon: React.FC<AppShellSidebarItemIconProps> = ({
  children,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();
  const { isActive } = useAppShellSidebarItemContext();

  return (
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: collapsed ? 0 : 2,
        justifyContent: 'center',
        color: isActive ? 'primary.main' : 'inherit',
        ...sx,
      }}
    >
      {children}
    </ListItemIcon>
  );
};

// Add display name for child detection
AppShellSidebarItemIcon.displayName = 'AppShellSidebarItemIcon';

export default AppShellSidebarItemIcon;
