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
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSidebar } from './context';
import { useSidebarItemContext } from './SidebarItemContext';

/**
 * Props for the styled component.
 */
interface SidebarItemIconRootProps {
  ownerState: {
    collapsed: boolean;
    isActive: boolean;
  };
}

/**
 * Styled icon container for sidebar items.
 */
const SidebarItemIconRoot = styled(ListItemIcon, {
  name: 'MuiSidebar',
  slot: 'ItemIcon',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<SidebarItemIconRootProps>(({ theme, ownerState }) => ({
  minWidth: 0,
  marginRight: ownerState.collapsed ? 0 : theme.spacing(2),
  justifyContent: 'center',
  color: ownerState.isActive
    ? (theme.vars || theme).palette.primary.main
    : 'inherit',
}));

/**
 * Props for SidebarItemIcon component.
 */
export interface SidebarItemIconProps {
  /** Icon element to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarItemIcon - Icon container for a sidebar item.
 *
 * Automatically adjusts styling based on active state and collapsed state.
 * Use as a child of Sidebar.Item for composable menu items.
 *
 * Theme tokens used:
 * - `primary.main` - Active item icon color
 *
 * @example
 * ```tsx
 * <Sidebar.Item id="home">
 *   <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
 *   <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
 * </Sidebar.Item>
 * ```
 */
export const SidebarItemIcon: React.FC<SidebarItemIconProps> = ({
  children,
  sx,
}) => {
  const { collapsed } = useSidebar();
  const { isActive } = useSidebarItemContext();

  const iconWithSize = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...(children.props as object),
        size: (children.props as { size?: number }).size ?? 20,
      } as React.Attributes)
    : children;

  return (
    <SidebarItemIconRoot
      ownerState={{ collapsed, isActive }}
      sx={sx}
    >
      {iconWithSize}
    </SidebarItemIconRoot>
  );
};

// Add display name for child detection
SidebarItemIcon.displayName = 'SidebarItemIcon';

export default SidebarItemIcon;
