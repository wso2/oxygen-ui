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
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSidebar } from './context';

/**
 * Styled badge for sidebar items.
 */
const SidebarItemBadgeRoot = styled(Chip, {
  name: 'MuiSidebar',
  slot: 'ItemBadge',
})({
  height: 20,
  fontSize: 11,
  marginLeft: 'auto',
});

/**
 * Props for SidebarItemBadge component.
 */
export interface SidebarItemBadgeProps {
  /** Badge content (number or string) */
  children: React.ReactNode;
  /** Badge color */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarItemBadge - Badge for a sidebar item.
 *
 * Displays a small chip/badge next to the item label. Hidden when
 * the sidebar is collapsed.
 *
 * @example
 * ```tsx
 * <Sidebar.Item id="notifications">
 *   <Sidebar.ItemIcon><Bell size={20} /></Sidebar.ItemIcon>
 *   <Sidebar.ItemLabel>Notifications</Sidebar.ItemLabel>
 *   <Sidebar.ItemBadge color="error">5</Sidebar.ItemBadge>
 * </Sidebar.Item>
 * ```
 */
export const SidebarItemBadge: React.FC<SidebarItemBadgeProps> = ({
  children,
  color = 'error',
  sx,
}) => {
  const { collapsed } = useSidebar();

  // Hide badge when sidebar is collapsed
  if (collapsed) {
    return null;
  }

  return (
    <SidebarItemBadgeRoot label={children} size="small" color={color} sx={sx} />
  );
};

// Add display name for child detection
SidebarItemBadge.displayName = 'SidebarItemBadge';

export default SidebarItemBadge;
