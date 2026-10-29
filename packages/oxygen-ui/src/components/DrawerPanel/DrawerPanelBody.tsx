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
 * Styled scrollable body of the drawer panel.
 */
const DrawerPanelBodyRoot = styled(Box, {
  name: 'MuiDrawerPanel',
  slot: 'Body',
})(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

/**
 * Props for DrawerPanelBody component.
 */
export interface DrawerPanelBodyProps {
  /** Main panel content */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelBody - Scrollable main content of the drawer panel.
 *
 * The header and footer stay in place while the body scrolls.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Body>
 *   <Typography>Panel content</Typography>
 * </DrawerPanel.Body>
 * ```
 */
export const DrawerPanelBody: React.FC<DrawerPanelBodyProps> = ({ children, sx }) => {
  return <DrawerPanelBodyRoot sx={sx}>{children}</DrawerPanelBodyRoot>;
};

DrawerPanelBody.displayName = 'DrawerPanelBody';

export default DrawerPanelBody;
