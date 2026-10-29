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
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Styled header container for the drawer panel.
 */
const DrawerPanelHeaderRoot = styled(Box, {
  name: 'MuiDrawerPanel',
  slot: 'Header',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  flexShrink: 0,
  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

/**
 * Props for DrawerPanelHeader component.
 */
export interface DrawerPanelHeaderProps {
  /** Header content, typically `DrawerPanel.Title` and `DrawerPanel.Actions` */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelHeader - Top row of the drawer panel holding the title and actions.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Header>
 *   <DrawerPanel.Title icon={<ListTree size={20} />}>Build details</DrawerPanel.Title>
 *   <DrawerPanel.Actions>
 *     <DrawerPanel.ExpandButton />
 *     <DrawerPanel.CloseButton />
 *   </DrawerPanel.Actions>
 * </DrawerPanel.Header>
 * ```
 */
export const DrawerPanelHeader: React.FC<DrawerPanelHeaderProps> = ({ children, sx }) => {
  return <DrawerPanelHeaderRoot sx={sx}>{children}</DrawerPanelHeaderRoot>;
};

DrawerPanelHeader.displayName = 'DrawerPanelHeader';

export default DrawerPanelHeader;
