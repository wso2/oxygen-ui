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
 * Styled footer for drawer panel actions.
 */
const DrawerPanelFooterRoot = styled(Box, {
  name: 'MuiDrawerPanel',
  slot: 'Footer',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  flexShrink: 0,
  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

/**
 * Props for DrawerPanelFooter component.
 */
export interface DrawerPanelFooterProps {
  /** Footer actions; put the primary action last */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelFooter - Sticky footer for panel-level actions.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Footer>
 *   <Button variant="outlined">Cancel</Button>
 *   <Button variant="contained">Save</Button>
 * </DrawerPanel.Footer>
 * ```
 */
export const DrawerPanelFooter: React.FC<DrawerPanelFooterProps> = ({ children, sx }) => {
  return <DrawerPanelFooterRoot sx={sx}>{children}</DrawerPanelFooterRoot>;
};

DrawerPanelFooter.displayName = 'DrawerPanelFooter';

export default DrawerPanelFooter;
