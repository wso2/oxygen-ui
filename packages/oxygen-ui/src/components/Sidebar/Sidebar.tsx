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
import { SidebarContext } from './context';
import { SidebarNav } from './SidebarNav';
import {
  SidebarCategory,
  SidebarCategoryLabel,
} from './SidebarCategory';
import {
  SidebarItem,
  SidebarItemIcon,
  SidebarItemLabel,
  SidebarItemBadge,
} from './SidebarItem';
import { SidebarFooter } from './SidebarFooter';
import {
  SidebarUser,
  SidebarUserAvatar,
  SidebarUserName,
  SidebarUserEmail,
} from './SidebarUser';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Sidebar background
 * - `divider` - Border color
 *
 * Transitions (via theme.transitions):
 * - `duration.leavingScreen` - Collapse animation (195ms default)
 * - `duration.enteringScreen` - Expand animation (225ms default)
 * - `easing.sharp` - Width transition easing curve
 */

/** Default expanded sidebar width in pixels */
export const SIDEBAR_WIDTH = 250;

/** Default collapsed sidebar width in pixels */
export const COLLAPSED_SIDEBAR_WIDTH = 64;

/**
 * Props for styled SidebarRootStyled.
 */
interface SidebarRootStyledProps {
  ownerState: {
    collapsed: boolean;
    width: number;
    collapsedWidth: number;
  };
}

/**
 * Styled root container for the sidebar.
 */
const SidebarRootStyled = styled(Box, {
  name: 'MuiSidebar',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<SidebarRootStyledProps & { component?: React.ElementType }>(({ theme, ownerState }) => ({
  width: ownerState.collapsed ? ownerState.collapsedWidth : ownerState.width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: ownerState.collapsed
      ? theme.transitions.duration.leavingScreen
      : theme.transitions.duration.enteringScreen,
  }),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  borderRight: `1px solid ${(theme.vars || theme).palette.divider}`,
  overflow: 'hidden',
  '& a': {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

/**
 * Props for the Sidebar component.
 */
export interface SidebarProps {
  /** Whether the sidebar is collapsed */
  collapsed?: boolean;
  /** Currently active menu item ID */
  activeItem?: string;
  /** Map of expanded menu IDs */
  expandedMenus?: Record<string, boolean>;
  /** Callback when a menu item is selected */
  onSelect?: (id: string) => void;
  /** Callback to toggle menu expansion */
  onToggleExpand?: (id: string) => void;
  /** Sidebar content (Nav, Footer, User) */
  children: React.ReactNode;
  /** Expanded sidebar width */
  width?: number;
  /** Collapsed sidebar width */
  collapsedWidth?: number;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Sidebar - Collapsible navigation sidebar compound component.
 *
 * A composable sidebar component that uses the compound component pattern.
 * Children can include Nav, Category, Item, Footer, and User sub-components.
 *
 * Features:
 * - Smooth width transition between expanded and collapsed states
 * - Context-based state sharing for active/expanded states
 * - Hierarchical menu structure with expandable sub-menus
 * - Icon-only mode with tooltips when collapsed
 *
 * Usage:
 * ```tsx
 * <Sidebar
 *   collapsed={collapsed}
 *   activeItem={activeId}
 *   expandedMenus={expanded}
 *   onSelect={handleSelect}
 *   onToggleExpand={handleToggle}
 * >
 *   <Sidebar.Nav>
 *     <Sidebar.Category>
 *       <Sidebar.CategoryLabel>Main</Sidebar.CategoryLabel>
 *       <Sidebar.Item id="home">
 *         <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
 *         <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
 *       </Sidebar.Item>
 *     </Sidebar.Category>
 *   </Sidebar.Nav>
 *   <Sidebar.Footer>
 *     <Sidebar.Category>
 *       <Sidebar.Item id="settings">
 *         <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
 *         <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
 *       </Sidebar.Item>
 *     </Sidebar.Category>
 *   </Sidebar.Footer>
 * </Sidebar>
 * ```
 */
const Sidebar: React.FC<SidebarProps> & {
  Nav: typeof SidebarNav;
  Category: typeof SidebarCategory;
  CategoryLabel: typeof SidebarCategoryLabel;
  Item: typeof SidebarItem;
  ItemIcon: typeof SidebarItemIcon;
  ItemLabel: typeof SidebarItemLabel;
  ItemBadge: typeof SidebarItemBadge;
  Footer: typeof SidebarFooter;
  User: typeof SidebarUser;
  UserAvatar: typeof SidebarUserAvatar;
  UserName: typeof SidebarUserName;
  UserEmail: typeof SidebarUserEmail;
} = ({
  collapsed = false,
  activeItem,
  expandedMenus = {},
  onSelect,
  onToggleExpand,
  children,
  width = SIDEBAR_WIDTH,
  collapsedWidth = COLLAPSED_SIDEBAR_WIDTH,
  sx,
}) => {
  const contextValue = React.useMemo(
    () => ({
      collapsed,
      activeItem,
      expandedMenus,
      onSelect,
      onToggleExpand,
    }),
    [collapsed, activeItem, expandedMenus, onSelect, onToggleExpand]
  );

  const ownerState = { collapsed, width, collapsedWidth };

  return (
    <SidebarContext.Provider value={contextValue}>
      <SidebarRootStyled component="aside" ownerState={ownerState} sx={sx}>
        {children}
      </SidebarRootStyled>
    </SidebarContext.Provider>
  );
};

/**
 * Sidebar compound component with attached sub-components.
 *
 * Sub-components:
 * - `Sidebar.Nav` - Scrollable navigation container
 * - `Sidebar.Category` - Groups items under a label
 * - `Sidebar.Item` - Individual menu item
 * - `Sidebar.Footer` - Fixed bottom section
 * - `Sidebar.User` - User profile section
 */
Sidebar.Nav = SidebarNav;
Sidebar.Category = SidebarCategory;
Sidebar.CategoryLabel = SidebarCategoryLabel;
Sidebar.Item = SidebarItem;
Sidebar.ItemIcon = SidebarItemIcon;
Sidebar.ItemLabel = SidebarItemLabel;
Sidebar.ItemBadge = SidebarItemBadge;
Sidebar.Footer = SidebarFooter;
Sidebar.User = SidebarUser;
Sidebar.UserAvatar = SidebarUserAvatar;
Sidebar.UserName = SidebarUserName;
Sidebar.UserEmail = SidebarUserEmail;
Sidebar.displayName = 'Sidebar';

export { Sidebar };
export default Sidebar;
