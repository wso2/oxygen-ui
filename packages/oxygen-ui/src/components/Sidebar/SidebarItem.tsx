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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { ChevronDown, ChevronUp } from '@wso2/oxygen-ui-icons-react';
import { useSidebar } from './context';
import {
  SidebarItemContext,
  SidebarItemProvider,
  type SidebarItemContextValue,
} from './SidebarItemContext';
import { SidebarItemIcon } from './SidebarItemIcon';
import { SidebarItemLabel } from './SidebarItemLabel';
import { SidebarItemBadge } from './SidebarItemBadge';

/**
 * Props for styled SidebarItemButton.
 */
interface SidebarItemButtonProps {
  ownerState: {
    collapsed: boolean;
    depth: number;
  };
}

/**
 * Styled list item container.
 */
const SidebarItemRoot = styled(ListItem, {
  name: 'MuiSidebar',
  slot: 'Item',
})({
  display: 'block',
  padding: 0,
});

/**
 * Styled button for sidebar item.
 */
const SidebarItemButton = styled(ListItemButton, {
  name: 'MuiSidebar',
  slot: 'ItemButton',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<SidebarItemButtonProps>(({ theme, ownerState }) => ({
  minHeight: 44,
  paddingRight: theme.spacing(2),
  paddingLeft: ownerState.collapsed ? theme.spacing(2) : theme.spacing(2 + ownerState.depth * 2),
  justifyContent: ownerState.collapsed ? 'center' : 'initial',
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    backgroundColor: (theme.vars || theme).palette.action.selected,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.selected,
    },
  },
}));

/**
 * Styled container for expand/collapse chevron.
 */
const SidebarItemChevron = styled(Box, {
  name: 'MuiSidebar',
  slot: 'ItemChevron',
})({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
});

// Child display names for detection
const CHILD_DISPLAY_NAMES = [
  'SidebarItemIcon',
  'SidebarItemLabel',
  'SidebarItemBadge',
];

/**
 * Props for SidebarItem component.
 */
export interface SidebarItemProps {
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
      const props = child.props as { children?: React.ReactNode };
      if (displayName === 'SidebarItemLabel' && props.children) {
        tooltipLabel = String(props.children);
      }
    }
  });
  return tooltipLabel;
};

/**
 * SidebarItem - Individual navigation menu item.
 *
 * Uses composable children API:
 * ```tsx
 * <Sidebar.Item id="home">
 *   <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
 *   <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
 *   <Sidebar.ItemBadge>3</Sidebar.ItemBadge>
 *   {nestedItems}
 * </Sidebar.Item>
 * ```
 *
 * Theme tokens used:
 * - `action.selected` - Active item background
 * - `primary.main` - Active item icon color
 */
export const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  children,
  depth = 0,
  sx,
}) => {
  const { collapsed, activeItem, expandedMenus, onSelect, onToggleExpand } = useSidebar();
  const { composableChildren, nestedItems } = separateChildren(children);

  const hasNestedItems = nestedItems.length > 0;
  const isActive = activeItem === id;
  const isExpanded = expandedMenus[id] || false;

  // Create context value for child components
  const contextValue: SidebarItemContextValue = {
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
  const ownerState = { collapsed, depth };

  const buttonContent = (
    <SidebarItemButton
      selected={isActive && !hasNestedItems}
      onClick={handleClick}
      ownerState={ownerState}
      sx={sx}
    >
      <SidebarItemProvider value={contextValue}>
        {composableChildren}
        {!collapsed && hasNestedItems && (
          <SidebarItemChevron>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </SidebarItemChevron>
        )}
      </SidebarItemProvider>
    </SidebarItemButton>
  );

  return (
    <>
      <SidebarItemRoot disablePadding>
        {collapsed ? (
          <Tooltip title={tooltipLabel} placement="right" arrow>
            {buttonContent}
          </Tooltip>
        ) : (
          buttonContent
        )}
      </SidebarItemRoot>

      {/* Nested children - only shown when not collapsed */}
      {hasNestedItems && !collapsed && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {nestedItems.map((child, index) => {
              if (React.isValidElement<SidebarItemProps>(child)) {
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

SidebarItem.displayName = 'SidebarItem';

export {
  SidebarItemIcon,
  SidebarItemLabel,
  SidebarItemBadge,
  SidebarItemContext,
  SidebarItemProvider,
};
export { useSidebarItemContext } from './SidebarItemContext';
export type { SidebarItemContextValue } from './SidebarItemContext';
export type { SidebarItemIconProps } from './SidebarItemIcon';
export type { SidebarItemLabelProps } from './SidebarItemLabel';
export type { SidebarItemBadgeProps } from './SidebarItemBadge';

export default SidebarItem;
