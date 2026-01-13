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
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useSidebar } from './context';

/**
 * Styled navigation container for the sidebar.
 */
const SidebarNavRoot = styled(Box, {
  name: 'MuiSidebar',
  slot: 'Nav',
})<{ component?: React.ElementType }>(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: (theme.vars || theme).palette.action.disabled,
    borderRadius: 3,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: (theme.vars || theme).palette.action.active,
  },
}));

/**
 * Styled divider between navigation categories.
 */
const SidebarNavDivider = styled(Divider, {
  name: 'MuiSidebar',
  slot: 'NavDivider',
})(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

/**
 * Props for SidebarNav component.
 */
export interface SidebarNavProps {
  /** Navigation categories */
  children: React.ReactNode;
  /** Whether to show dividers between categories */
  showDividers?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * SidebarNav - Scrollable navigation container.
 *
 * Contains navigation categories and handles scrolling behavior.
 * Provides styled scrollbars using theme tokens.
 *
 * Theme tokens used:
 * - `action.disabled` - Scrollbar thumb color
 * - `action.active` - Scrollbar thumb hover color
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({
  children,
  showDividers = true,
  sx,
}) => {
  const { collapsed } = useSidebar();
  const childArray = React.Children.toArray(children);

  return (
    <SidebarNavRoot component="nav" sx={sx}>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && showDividers && !collapsed && <SidebarNavDivider />}
          {child}
        </React.Fragment>
      ))}
    </SidebarNavRoot>
  );
};

export default SidebarNav;
