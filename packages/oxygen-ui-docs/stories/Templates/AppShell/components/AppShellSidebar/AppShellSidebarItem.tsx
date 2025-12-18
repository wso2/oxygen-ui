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
  Collapse,
  Tooltip,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { ChevronDown, ChevronUp } from '@wso2/oxygen-ui-icons-react';
import { useAppShellSidebar } from './context';
import {
  AppShellSidebarItemContext,
  AppShellSidebarItemProvider,
  type AppShellSidebarItemContextValue,
} from './AppShellSidebarItemContext';
import { AppShellSidebarItemIcon } from './AppShellSidebarItemIcon';
import { AppShellSidebarItemLabel } from './AppShellSidebarItemLabel';
import { AppShellSidebarItemBadge } from './AppShellSidebarItemBadge';

// Child display names for detection
const CHILD_DISPLAY_NAMES = [
  'AppShellSidebarItemIcon',
  'AppShellSidebarItemLabel',
  'AppShellSidebarItemBadge',
];

/**
 * Props for AppShellSidebarItem component.
 */
export interface AppShellSidebarItemProps {
  /** Unique identifier for this item */
  id: string;
  /** Composable children (ItemIcon, ItemLabel, ItemBadge) and nested items */
  children: React.ReactNode;
  /** Nesting depth (used internally) */
  depth?: number;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Separates composable children from nested items.
 */
const separateChildren = (children: React.ReactNode): {
  composableChildren: React.ReactNode[];
  nestedItems: React.ReactNode[];
} => {
  const composableChildren: React.ReactNode[] = [];
  const nestedItems: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      if (displayName && CHILD_DISPLAY_NAMES.includes(displayName)) {
        composableChildren.push(child);
      } else {
        nestedItems.push(child);
      }
    } else {
      nestedItems.push(child);
    }
  });

  return { composableChildren, nestedItems };
};

/**
 * Gets the label for tooltip from children.
 */
const getTooltipLabel = (children: React.ReactNode): string => {
  let tooltipLabel = '';
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      if (displayName === 'AppShellSidebarItemLabel' && child.props.children) {
        tooltipLabel = String(child.props.children);
      }
    }
  });
  return tooltipLabel;
};

/**
 * AppShellSidebarItem - Individual navigation menu item.
 *
 * Uses composable children API:
 * ```tsx
 * <AppShellSidebar.Item id="home">
 *   <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
 *   <AppShellSidebar.ItemLabel>Home</AppShellSidebar.ItemLabel>
 *   <AppShellSidebar.ItemBadge>3</AppShellSidebar.ItemBadge>
 *   {nestedItems}
 * </AppShellSidebar.Item>
 * ```
 *
 * Theme tokens used:
 * - `action.selected` - Active item background
 * - `primary.main` - Active item icon color
 */
export const AppShellSidebarItem: React.FC<AppShellSidebarItemProps> = ({
  id,
  children,
  depth = 0,
  sx,
}) => {
  const { collapsed, activeItem, expandedMenus, onSelect, onToggleExpand } = useAppShellSidebar();
  const { composableChildren, nestedItems } = separateChildren(children);

  const hasNestedItems = nestedItems.length > 0;
  const isActive = activeItem === id;
  const isExpanded = expandedMenus[id] || false;

  // Create context value for child components
  const contextValue: AppShellSidebarItemContextValue = {
    id,
    isActive,
    isExpanded,
    hasChildren: hasNestedItems,
    depth,
  };

  const handleClick = () => {
    if (hasNestedItems) {
      onToggleExpand?.(id);
    } else {
      onSelect?.(id);
    }
  };

  const tooltipLabel = getTooltipLabel(children);

  const buttonContent = (
    <ListItemButton
      selected={isActive && !hasNestedItems}
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
        ...sx,
      }}
    >
      <AppShellSidebarItemProvider value={contextValue}>
        {composableChildren}
        {!collapsed && hasNestedItems && (
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Box>
        )}
      </AppShellSidebarItemProvider>
    </ListItemButton>
  );

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        {collapsed ? (
          <Tooltip title={tooltipLabel} placement="right" arrow>
            {buttonContent}
          </Tooltip>
        ) : (
          buttonContent
        )}
      </ListItem>

      {/* Nested children - only shown when not collapsed */}
      {hasNestedItems && !collapsed && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {nestedItems.map((child, index) => {
              if (React.isValidElement<AppShellSidebarItemProps>(child)) {
                return React.cloneElement(child, {
                  key: child.key || index,
                  depth: depth + 1
                });
              }
              return child;
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

AppShellSidebarItem.displayName = 'AppShellSidebarItem';

export {
  AppShellSidebarItemIcon,
  AppShellSidebarItemLabel,
  AppShellSidebarItemBadge,
  AppShellSidebarItemContext,
  AppShellSidebarItemProvider,
};
export { useAppShellSidebarItemContext } from './AppShellSidebarItemContext';
export type { AppShellSidebarItemContextValue } from './AppShellSidebarItemContext';
export type { AppShellSidebarItemIconProps } from './AppShellSidebarItemIcon';
export type { AppShellSidebarItemLabelProps } from './AppShellSidebarItemLabel';
export type { AppShellSidebarItemBadgeProps } from './AppShellSidebarItemBadge';

export default AppShellSidebarItem;
