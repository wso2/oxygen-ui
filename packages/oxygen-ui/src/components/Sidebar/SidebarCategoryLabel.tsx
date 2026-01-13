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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSidebar } from './context';

/**
 * Styled category label for the sidebar.
 */
const SidebarCategoryLabelRoot = styled(Typography, {
  name: 'MuiSidebar',
  slot: 'CategoryLabel',
  shouldForwardProp: prop => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: collapsed ? 0 : theme.spacing(1),
  paddingBottom: collapsed ? 0 : theme.spacing(1),
  height: collapsed ? 0 : 'auto',
  opacity: collapsed ? 0 : 1,
  overflow: 'hidden',
  transition: theme.transitions.create(['padding', 'height', 'opacity'], {
    easing: theme.transitions.easing.sharp,
    duration: collapsed
      ? theme.transitions.duration.leavingScreen
      : theme.transitions.duration.enteringScreen,
  }),
  display: 'block',
  color: (theme.vars || theme).palette.text.secondary,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontSize: 11,
}));

/**
 * Props for SidebarCategoryLabel component.
 */
export interface SidebarCategoryLabelProps {
  /** Label text to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarCategoryLabel - Label for a sidebar category.
 *
 * Automatically hides when sidebar is collapsed. Use as a child
 * of Sidebar.Category for composable category headers.
 *
 * Theme tokens used:
 * - `text.secondary` - Label text color
 *
 * @example
 * ```tsx
 * <Sidebar.Category>
 *   <Sidebar.CategoryLabel>Management</Sidebar.CategoryLabel>
 *   <Sidebar.Item id="users">...</Sidebar.Item>
 * </Sidebar.Category>
 * ```
 */
export const SidebarCategoryLabel: React.FC<SidebarCategoryLabelProps> = ({ children, sx }) => {
  const { collapsed } = useSidebar()

  return (
    <SidebarCategoryLabelRoot variant="caption" collapsed={collapsed} sx={sx}>
      {children}
    </SidebarCategoryLabelRoot>
  );
};

// Add display name for child detection
SidebarCategoryLabel.displayName = 'SidebarCategoryLabel';

export default SidebarCategoryLabel;
