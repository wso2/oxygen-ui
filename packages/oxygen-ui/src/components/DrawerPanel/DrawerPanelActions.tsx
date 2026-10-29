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
 * Styled container for header actions, aligned to the right.
 */
const DrawerPanelActionsRoot = styled(Box, {
  name: 'MuiDrawerPanel',
  slot: 'Actions',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginLeft: 'auto',
  flexShrink: 0,
}));

/**
 * Props for DrawerPanelActions component.
 */
export interface DrawerPanelActionsProps {
  /** Action buttons; keep `ExpandButton` and `CloseButton` last, in that order */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelActions - Right-aligned group of header actions.
 *
 * Place any extra actions (for example a "More actions" menu) before the
 * expand and close buttons so the close button always stays rightmost.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Actions>
 *   <DrawerPanel.ExpandButton />
 *   <DrawerPanel.CloseButton />
 * </DrawerPanel.Actions>
 * ```
 */
export const DrawerPanelActions: React.FC<DrawerPanelActionsProps> = ({ children, sx }) => {
  return <DrawerPanelActionsRoot sx={sx}>{children}</DrawerPanelActionsRoot>;
};

DrawerPanelActions.displayName = 'DrawerPanelActions';

export default DrawerPanelActions;
