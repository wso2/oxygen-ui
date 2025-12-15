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
  Tooltip,
  Badge,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { ChevronDown, ChevronUp } from '@wso2/oxygen-ui-icons-react';
import type { LucideIcon } from '@wso2/oxygen-ui-icons-react';
import { useAppShellSidebar } from './context';

/**
 * Props for AppShellSidebarItem component.
 */
export interface AppShellSidebarItemProps {
  /** Unique identifier for this item */
  id: string;
  /** Item label */
  label: string;
  /** Icon component (from @wso2/oxygen-ui-icons-react) */
  icon: LucideIcon;
  /** Badge content (optional) */
  badge?: number | string;
  /** Nested items */
  children?: React.ReactNode;
  /** Nesting depth (used internally) */
  depth?: number;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarItem - Individual navigation menu item.
 *
 * Supports nested children with collapsible sub-menus. When the sidebar
 * is collapsed, shows tooltips on hover.
 *
 * Theme tokens used:
 * - `action.selected` - Active item background
 * - `primary.main` - Active item icon color
 */
export const AppShellSidebarItem: React.FC<AppShellSidebarItemProps> = ({
  id,
  label,
  icon: Icon,
  badge,
  children,
  depth = 0,
  sx,
}) => {
  const { collapsed, activeItem, expandedMenus, onSelect, onToggleExpand } = useAppShellSidebar();
  const hasChildren = React.Children.count(children) > 0;
  const isActive = activeItem === id;
  const isExpanded = expandedMenus[id] || false;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand?.(id);
    } else {
      onSelect?.(id);
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
        ...sx,
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
        {badge ? (
          <Badge badgeContent={badge} color="error" max={99}>
            <Icon size={20} />
          </Badge>
        ) : (
          <Icon size={20} />
        )}
      </ListItemIcon>
      {!collapsed && (
        <>
          <ListItemText
            primary={label}
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
          <Tooltip title={label} placement="right" arrow>
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
            {React.Children.map(children, (child) => {
              if (React.isValidElement<AppShellSidebarItemProps>(child)) {
                return React.cloneElement(child, { depth: depth + 1 });
              }
              return child;
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default AppShellSidebarItem;
