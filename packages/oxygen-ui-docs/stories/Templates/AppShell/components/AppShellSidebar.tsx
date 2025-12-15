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
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Tooltip,
  Typography,
  Badge,
  Avatar,
  Stack,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { ChevronDown, ChevronUp } from '@wso2/oxygen-ui-icons-react';
import type {
  NavigationCategory,
  NavigationItem,
  User,
  AppShellContextValue,
} from './types';
import { SIDEBAR_WIDTH, COLLAPSED_SIDEBAR_WIDTH } from './types';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - Sidebar background
 * - `action.selected` - Active menu item background
 * - `action.hover` - Hover state background (implicit via ListItemButton)
 * - `action.disabled` - Scrollbar thumb color
 * - `action.active` - Scrollbar thumb hover color
 * - `primary.main` - Active item icon color
 * - `text.secondary` - Category labels
 * - `divider` - Section borders
 *
 * Transitions (via theme.transitions):
 * - `duration.leavingScreen` - Collapse animation (195ms default)
 * - `duration.enteringScreen` - Expand animation (225ms default)
 * - `easing.sharp` - Width transition easing curve
 *
 * Spacing:
 * - px/py/mx/ml values use 8px base unit (e.g., px: 2 = 16px)
 */

/**
 * Props for the sidebar menu item component.
 */
interface MenuItemProps {
  item: NavigationItem;
  collapsed: boolean;
  isActive: boolean;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  depth?: number;
}

/**
 * Individual menu item component with support for nested children.
 * Handles collapsed state with tooltips and expandable sub-menus.
 */
const MenuItem: React.FC<MenuItemProps> = ({
  item,
  collapsed,
  isActive,
  isExpanded,
  onSelect,
  onToggleExpand,
  depth = 0,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(item.id);
    } else {
      onSelect(item.id);
    }
  };

  const buttonContent = (
    <ListItemButton
      selected={isActive && !hasChildren}
      onClick={handleClick}
      sx={{
        minHeight: 44,
        px: 2,
        pl: collapsed ? 2 : 2 + depth * 2,
        justifyContent: collapsed ? 'center' : 'initial',
        borderRadius: 1,
        mx: 1,
        '&.Mui-selected': {
          bgcolor: 'action.selected',
          '&:hover': {
            bgcolor: 'action.selected',
          },
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: collapsed ? 0 : 2,
          justifyContent: 'center',
          color: isActive ? 'primary.main' : 'inherit',
        }}
      >
        {item.badge ? (
          <Badge badgeContent={item.badge} color="error" max={99}>
            <Icon size={20} />
          </Badge>
        ) : (
          <Icon size={20} />
        )}
      </ListItemIcon>
      {!collapsed && (
        <>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
            }}
          />
          {hasChildren && (
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Box>
          )}
        </>
      )}
    </ListItemButton>
  );

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        {collapsed ? (
          <Tooltip title={item.label} placement="right" arrow>
            {buttonContent}
          </Tooltip>
        ) : (
          buttonContent
        )}
      </ListItem>

      {/* Nested children - only shown when not collapsed */}
      {hasChildren && !collapsed && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                collapsed={collapsed}
                isActive={false} // Children active state handled separately
                isExpanded={false}
                onSelect={onSelect}
                onToggleExpand={onToggleExpand}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

/**
 * Props for the navigation category component.
 */
interface NavigationCategoryProps {
  category: NavigationCategory;
  collapsed: boolean;
  activeItem: string;
  expandedMenus: Record<string, boolean>;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

/**
 * Navigation category component that groups menu items.
 * Shows category label when not collapsed.
 */
const NavigationCategorySection: React.FC<NavigationCategoryProps> = ({
  category,
  collapsed,
  activeItem,
  expandedMenus,
  onSelect,
  onToggleExpand,
}) => {
  return (
    <Box sx={{ mb: 1 }}>
      {/* Category label - only shown when not collapsed and label exists */}
      {category.label && !collapsed && (
        <Typography
          variant="caption"
          sx={{
            px: 3,
            py: 1,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: 11,
          }}
        >
          {category.label}
        </Typography>
      )}
      <List disablePadding>
        {category.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            isActive={activeItem === item.id}
            isExpanded={expandedMenus[item.id] || false}
            onSelect={onSelect}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </List>
    </Box>
  );
};

/**
 * Props for the user section at the bottom of the sidebar.
 */
interface UserSectionProps {
  user: User;
  collapsed: boolean;
  onUserMenuClick: () => void;
}

/**
 * User section shown at the bottom of the sidebar.
 * Displays user avatar and info when expanded.
 */
const UserSection: React.FC<UserSectionProps> = ({
  user,
  collapsed,
  onUserMenuClick,
}) => {
  const content = (
    <ListItemButton
      onClick={onUserMenuClick}
      sx={{
        minHeight: 56,
        px: 2,
        justifyContent: collapsed ? 'center' : 'initial',
        borderRadius: 1,
        mx: 1,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: 'primary.main',
          fontSize: 14,
        }}
      >
        {user.avatar || user.name.charAt(0)}
      </Avatar>
      {!collapsed && (
        <Box sx={{ ml: 2, overflow: 'hidden' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
            }}
          >
            {user.email}
          </Typography>
        </Box>
      )}
    </ListItemButton>
  );

  return (
    <Box sx={{ p: 1 }}>
      {collapsed ? (
        <Tooltip title={user.name} placement="right" arrow>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </Box>
  );
};

/**
 * Props for the AppShellSidebar component.
 */
export interface AppShellSidebarProps {
  /** Navigation categories to display */
  categories: NavigationCategory[];
  /** Settings/bottom navigation category */
  settingsCategory?: NavigationCategory;
  /** Whether the sidebar is collapsed */
  collapsed: boolean;
  /** Currently active menu item ID */
  activeItem: string;
  /** Map of expanded menu IDs */
  expandedMenus: Record<string, boolean>;
  /** User information */
  user: User;
  /** Callback when a menu item is selected */
  onSelect: (id: string) => void;
  /** Callback to toggle menu expansion */
  onToggleExpand: (id: string) => void;
  /** Callback when user section is clicked */
  onUserMenuClick: () => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebar - Collapsible navigation sidebar component.
 *
 * Features:
 * - Smooth width transition between expanded (250px) and collapsed (64px) states
 * - Hierarchical menu structure with expandable sub-menus
 * - Icon-only mode with tooltips when collapsed
 * - Category labels for grouping menu items
 * - Settings section at bottom
 * - User information section
 *
 * Usage:
 * ```tsx
 * <AppShellSidebar
 *   categories={navigationCategories}
 *   settingsCategory={settingsNavigation}
 *   collapsed={sidebarCollapsed}
 *   activeItem={activeMenuItem}
 *   expandedMenus={expandedMenus}
 *   user={currentUser}
 *   onSelect={handleMenuSelect}
 *   onToggleExpand={handleToggleMenu}
 *   onUserMenuClick={handleUserMenuClick}
 * />
 * ```
 */
export const AppShellSidebar: React.FC<AppShellSidebarProps> = ({
  categories,
  settingsCategory,
  collapsed,
  activeItem,
  expandedMenus,
  user,
  onSelect,
  onToggleExpand,
  onUserMenuClick,
  sx,
}) => {
  return (
    <Box
      sx={{
        width: collapsed ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH,
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
      {/* Main navigation area - scrollable */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          py: 1,
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'action.disabled',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            bgcolor: 'action.active',
          },
        }}
      >
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            {index > 0 && !collapsed && (
              <Divider sx={{ my: 1, mx: 2 }} />
            )}
            <NavigationCategorySection
              category={category}
              collapsed={collapsed}
              activeItem={activeItem}
              expandedMenus={expandedMenus}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
            />
          </React.Fragment>
        ))}
      </Box>

      {/* Settings section - fixed at bottom */}
      {settingsCategory && (
        <>
          <Divider />
          <Box sx={{ py: 1 }}>
            <NavigationCategorySection
              category={settingsCategory}
              collapsed={collapsed}
              activeItem={activeItem}
              expandedMenus={expandedMenus}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
            />
          </Box>
        </>
      )}

      {/* User section - fixed at bottom */}
      <Divider />
      <UserSection
        user={user}
        collapsed={collapsed}
        onUserMenuClick={onUserMenuClick}
      />
    </Box>
  );
};

export default AppShellSidebar;
