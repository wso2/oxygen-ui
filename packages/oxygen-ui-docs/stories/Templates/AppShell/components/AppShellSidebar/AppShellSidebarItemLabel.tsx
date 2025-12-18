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
import { ListItemText } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';
import { useAppShellSidebarItemContext } from './AppShellSidebarItemContext';

/**
 * Props for AppShellSidebarItemLabel component.
 */
export interface AppShellSidebarItemLabelProps {
  /** Label text to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarItemLabel - Label text for a sidebar item.
 *
 * Automatically hidden when sidebar is collapsed. Adjusts font weight
 * based on active state.
 *
 * @example
 * ```tsx
 * <AppShellSidebar.Item id="home">
 *   <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
 *   <AppShellSidebar.ItemLabel>Home</AppShellSidebar.ItemLabel>
 * </AppShellSidebar.Item>
 * ```
 */
export const AppShellSidebarItemLabel: React.FC<AppShellSidebarItemLabelProps> = ({
  children,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();
  const { isActive } = useAppShellSidebarItemContext();

  // Hide label when sidebar is collapsed
  if (collapsed) {
    return null;
  }

  return (
    <ListItemText
      primary={children}
      primaryTypographyProps={{
        fontSize: 14,
        fontWeight: isActive ? 600 : 400,
      }}
      sx={sx}
    />
  );
};

// Add display name for child detection
AppShellSidebarItemLabel.displayName = 'AppShellSidebarItemLabel';

export default AppShellSidebarItemLabel;
