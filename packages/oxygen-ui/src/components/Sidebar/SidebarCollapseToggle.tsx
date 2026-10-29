/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { PanelLeftClose, PanelLeftOpen } from '@wso2/oxygen-ui-icons-react';
import { useSidebar } from './context';
import { AppShellContext } from '../AppShell/context';
import { SidebarItemProvider } from './SidebarItemContext';
import { SidebarItemIcon } from './SidebarItemIcon';
import { SidebarItemLabel } from './SidebarItemLabel';

interface SidebarCollapseToggleButtonProps {
  ownerState: {
    collapsed: boolean;
  };
}

/**
 * Same sizing as SidebarItemButton so the toggle lines up with the menu items.
 */
const SidebarCollapseToggleButton = styled(ListItemButton, {
  name: 'MuiSidebar',
  slot: 'CollapseToggle',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<SidebarCollapseToggleButtonProps>(({ theme, ownerState }) => ({
  minHeight: 44,
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  justifyContent: ownerState.collapsed ? 'center' : 'initial',
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  color: (theme.vars || theme).palette.text.primary,
}));

/**
 * Props for SidebarCollapseToggle component.
 */
export interface SidebarCollapseToggleProps {
  /** Toggles the sidebar; defaults to the AppShell action */
  onToggle?: () => void;
  /** Label when expanded */
  collapseLabel?: string;
  /** Tooltip when collapsed */
  expandLabel?: string;
  /** Icon when expanded */
  collapseIcon?: React.ReactNode;
  /** Icon when collapsed */
  expandIcon?: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarCollapseToggle - Collapse control for the bottom of the sidebar.
 *
 * Place it in `Sidebar.Footer` so it stays in the same spot however long the nav gets.
 *
 * @example
 * ```tsx
 * <Sidebar.Footer>
 *   <Sidebar.CollapseToggle onToggle={toggle} />
 * </Sidebar.Footer>
 * ```
 */
export const SidebarCollapseToggle: React.FC<SidebarCollapseToggleProps> = ({
  onToggle: onToggleProp,
  collapseLabel = 'Collapse',
  expandLabel = 'Expand',
  collapseIcon,
  expandIcon,
  sx,
}) => {
  const { collapsed } = useSidebar();

  // Apps using AppShell get toggling without wiring onToggle
  const appShellContext = React.useContext(AppShellContext);
  const onToggle = onToggleProp ?? appShellContext?.actions.toggleSidebar;

  const label = collapsed ? expandLabel : collapseLabel;
  const icon = collapsed ? expandIcon || <PanelLeftOpen /> : collapseIcon || <PanelLeftClose />;

  const button = (
    <SidebarCollapseToggleButton
      onClick={onToggle}
      ownerState={{ collapsed }}
      sx={sx}
      // The label is hidden when collapsed, so the button needs its own name
      aria-label={collapsed ? label : undefined}
      aria-expanded={!collapsed}
    >
      {/* ItemIcon and ItemLabel need an item context; reusing them keeps styling in sync with menu items */}
      <SidebarItemProvider
        value={{ id: 'sidebar-collapse-toggle', isActive: false, isExpanded: false, hasChildren: false, depth: 0 }}
      >
        <SidebarItemIcon>{icon}</SidebarItemIcon>
        <SidebarItemLabel>{label}</SidebarItemLabel>
      </SidebarItemProvider>
    </SidebarCollapseToggleButton>
  );

  return (
    <List disablePadding>
      <ListItem disablePadding sx={{ display: 'block' }}>
        {collapsed ? (
          <Tooltip title={label} placement="right" arrow>
            {button}
          </Tooltip>
        ) : (
          button
        )}
      </ListItem>
    </List>
  );
};

SidebarCollapseToggle.displayName = 'SidebarCollapseToggle';

export default SidebarCollapseToggle;
