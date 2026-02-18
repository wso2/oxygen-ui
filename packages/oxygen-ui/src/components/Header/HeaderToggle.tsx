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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Menu } from '@wso2/oxygen-ui-icons-react';
import { AppShellContext } from '../AppShell/context';

/**
 * Styled toggle button for the header.
 */
const HeaderToggleRoot = styled(IconButton, {
  name: 'MuiHeader',
  slot: 'Toggle',
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
}));

/**
 * Props for HeaderToggle component.
 */
export interface HeaderToggleProps {
  /** Whether the sidebar is collapsed (optional, uses AppShell context if available) */
  collapsed?: boolean;
  /** Callback to toggle sidebar (optional, uses AppShell context if available) */
  onToggle?: () => void;
  /** Label for expanded state tooltip */
  expandLabel?: string;
  /** Label for collapsed state tooltip */
  collapseLabel?: string;
  /** Custom icon for expanded state */
  expandIcon?: React.ReactNode;
  /** Custom icon for collapsed state */
  collapseIcon?: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * HeaderToggle - Sidebar toggle button for the header.
 *
 * Displays an animated icon that indicates the current sidebar state
 * and toggles between expanded/collapsed states.
 *
 * Custom icons can be provided via `expandIcon` and `collapseIcon` props.
 * If not provided, defaults to Menu icon.
 *
 * Theme tokens used:
 * - `text.secondary` - Icon color
 */
export const HeaderToggle: React.FC<HeaderToggleProps> = ({
  collapsed: collapsedProp,
  onToggle: onToggleProp,
  expandLabel = 'Expand sidebar',
  collapseLabel = 'Collapse sidebar',
  expandIcon,
  collapseIcon,
  sx,
}) => {
  // Try to consume AppShell context (optional - gracefully degrades if not available)
  const appShellContext = React.useContext(AppShellContext);

  // Use context values as defaults, allow prop overrides
  const collapsed = collapsedProp ?? appShellContext?.state.sidebarCollapsed ?? false;
  const onToggle = onToggleProp ?? appShellContext?.actions.toggleSidebar ?? (() => {});

  return (
    <Tooltip title={collapsed ? expandLabel : collapseLabel}>
      <HeaderToggleRoot onClick={onToggle} size="small" sx={sx}>
        {collapsed ? (
          expandIcon || <Menu size={20} />
        ) : (
          collapseIcon || <Menu size={20} />
        )}
      </HeaderToggleRoot>
    </Tooltip>
  );
};

export default HeaderToggle;
