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
import { AppShellSidebarContext } from './context';
import { AppShellSidebarNav } from './AppShellSidebarNav';
import { AppShellSidebarCategory } from './AppShellSidebarCategory';
import { AppShellSidebarItem } from './AppShellSidebarItem';
import { AppShellSidebarFooter } from './AppShellSidebarFooter';
import { AppShellSidebarUser } from './AppShellSidebarUser';

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
 * Props for the AppShellSidebar component.
 */
export interface AppShellSidebarProps {
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
 * AppShellSidebar - Collapsible navigation sidebar compound component.
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
 * <AppShellSidebar
 *   collapsed={collapsed}
 *   activeItem={activeId}
 *   expandedMenus={expanded}
 *   onSelect={handleSelect}
 *   onToggleExpand={handleToggle}
 * >
 *   <AppShellSidebar.Nav>
 *     <AppShellSidebar.Category label="Main">
 *       <AppShellSidebar.Item id="home" label="Home" icon={Home} />
 *       <AppShellSidebar.Item id="dashboard" label="Dashboard" icon={LayoutDashboard}>
 *         <AppShellSidebar.Item id="overview" label="Overview" icon={Eye} />
 *         <AppShellSidebar.Item id="analytics" label="Analytics" icon={BarChart3} />
 *       </AppShellSidebar.Item>
 *     </AppShellSidebar.Category>
 *   </AppShellSidebar.Nav>
 *   <AppShellSidebar.Footer>
 *     <AppShellSidebar.Category>
 *       <AppShellSidebar.Item id="settings" label="Settings" icon={Settings} />
 *     </AppShellSidebar.Category>
 *   </AppShellSidebar.Footer>
 *   <AppShellSidebar.User name="John Doe" email="john@example.com" onClick={...} />
 * </AppShellSidebar>
 * ```
 */
const AppShellSidebarRoot: React.FC<AppShellSidebarProps> = ({
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

  return (
    <AppShellSidebarContext.Provider value={contextValue}>
      <Box
        component="aside"
        sx={{
          width: collapsed ? collapsedWidth : width,
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: collapsed
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          overflow: 'hidden',
          ...sx,
        }}
      >
        {children}
      </Box>
    </AppShellSidebarContext.Provider>
  );
};

/**
 * AppShellSidebar compound component with attached sub-components.
 *
 * Sub-components:
 * - `AppShellSidebar.Nav` - Scrollable navigation container
 * - `AppShellSidebar.Category` - Groups items under a label
 * - `AppShellSidebar.Item` - Individual menu item
 * - `AppShellSidebar.Footer` - Fixed bottom section
 * - `AppShellSidebar.User` - User profile section
 */
export const AppShellSidebar = Object.assign(AppShellSidebarRoot, {
  Nav: AppShellSidebarNav,
  Category: AppShellSidebarCategory,
  Item: AppShellSidebarItem,
  Footer: AppShellSidebarFooter,
  User: AppShellSidebarUser,
});

export default AppShellSidebar;
