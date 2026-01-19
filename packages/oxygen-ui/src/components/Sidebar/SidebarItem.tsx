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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
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
  transition: theme.transitions.create(['padding-left', 'padding-right'], {
    easing: theme.transitions.easing.sharp,
    duration: ownerState.collapsed
      ? theme.transitions.duration.leavingScreen
      : theme.transitions.duration.enteringScreen,
  }),
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
  paddingLeft: 1,
  display: 'flex',
  alignItems: 'center',
});

/**
 * Styled popover for nested items when sidebar is collapsed.
 */
const SidebarItemPopover = styled(Popover, {
  name: 'MuiSidebar',
  slot: 'ItemPopover',
})({
  pointerEvents: 'none',
});

/**
 * Styled list container for popover nested items.
 */
const SidebarItemPopoverList = styled(List, {
  name: 'MuiSidebar',
  slot: 'ItemPopoverList',
})(({ theme }) => ({
  padding: theme.spacing(0.5),
  pointerEvents: 'auto',
}));

/**
 * Styled button for popover menu items (always shows label, not icon-only).
 */
const SidebarItemPopoverButton = styled(ListItemButton, {
  name: 'MuiSidebar',
  slot: 'ItemPopoverButton',
})(({ theme }) => ({
  minHeight: 40,
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  gap: theme.spacing(1.5),
  '&.Mui-selected': {
    backgroundColor: (theme.vars || theme).palette.action.selected,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.selected,
    },
  },
}));

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

  React.Children.toArray(children).forEach((child) => {
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
 * Extracts icon and label from a SidebarItem's children for popover rendering.
 */
const extractItemContent = (itemChildren: React.ReactNode): {
  icon: React.ReactNode;
  label: string;
} => {
  let icon: React.ReactNode = null;
  let label = '';

  React.Children.forEach(itemChildren, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      const props = child.props as { children?: React.ReactNode };
      if (displayName === 'SidebarItemIcon') {
        icon = props.children;
      } else if (displayName === 'SidebarItemLabel' && props.children) {
        label = String(props.children);
      }
    }
  });

  return { icon, label };
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

  // Check if any nested child is active (for highlighting parent when collapsed)
  const hasActiveChild = React.useMemo(() => {
    if (!hasNestedItems || !activeItem) return false;
    return nestedItems.some((child) => {
      if (React.isValidElement<SidebarItemProps>(child)) {
        return child.props.id === activeItem;
      }
      return false;
    });
  }, [hasNestedItems, nestedItems, activeItem]);

  // Popover state for collapsed mode with nested items
  const [popoverAnchor, setPopoverAnchor] = React.useState<HTMLElement | null>(null);
  const popoverOpen = Boolean(popoverAnchor);

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

  // Hover handlers for collapsed state popover
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (collapsed && hasNestedItems) {
      setPopoverAnchor(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    setPopoverAnchor(null);
  };

  const tooltipLabel = getTooltipLabel(children);
  const ownerState = { collapsed, depth };

  // Parent should appear selected when collapsed and has an active child
  const shouldShowSelected = (isActive && !hasNestedItems) || (collapsed && hasActiveChild);

  const buttonContent = (
    <SidebarItemButton
      selected={shouldShowSelected}
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
        {!collapsed && !hasNestedItems && (
          <Box sx={{ ml: 'auto', width: 16, pl: 1 }} />
        )}
      </SidebarItemProvider>
    </SidebarItemButton>
  );

  // For collapsed state with nested items, use a wrapper div for hover events
  const collapsedWithNested = collapsed && hasNestedItems;

  // Handler for clicking a nested item in the popover
  const handlePopoverItemClick = (itemId: string) => {
    onSelect?.(itemId);
    setPopoverAnchor(null);
  };

  return (
    <>
      <SidebarItemRoot
        disablePadding
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {collapsed ? (
          // When collapsed: show tooltip only for items without nested children
          collapsedWithNested ? (
            buttonContent
          ) : (
            <Tooltip title={tooltipLabel} placement="right" arrow>
              {buttonContent}
            </Tooltip>
          )
        ) : (
          buttonContent
        )}
      </SidebarItemRoot>

      {/* Popover for nested items when collapsed */}
      {collapsedWithNested && (
        <SidebarItemPopover
          open={popoverOpen}
          anchorEl={popoverAnchor}
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          onClose={handleMouseLeave}
          disableRestoreFocus
          slotProps={{
            paper: {
              onMouseEnter: () => setPopoverAnchor(popoverAnchor),
              onMouseLeave: handleMouseLeave,
            },
          }}
        >
          <SidebarItemPopoverList disablePadding>
            {nestedItems.map((child, index) => {
              if (React.isValidElement<SidebarItemProps>(child)) {
                const childProps = child.props as SidebarItemProps;
                const { icon, label } = extractItemContent(childProps.children);
                const isItemActive = activeItem === childProps.id;

                return (
                  <SidebarItemPopoverButton
                    key={childProps.id || index}
                    selected={isItemActive}
                    onClick={() => handlePopoverItemClick(childProps.id)}
                  >
                    {icon && (
                      <ListItemIcon sx={{ minWidth: 'auto' }}>
                        {icon}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={label} />
                  </SidebarItemPopoverButton>
                );
              }
              return child;
            })}
          </SidebarItemPopoverList>
        </SidebarItemPopover>
      )}

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
