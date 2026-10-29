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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { X } from '@wso2/oxygen-ui-icons-react';
import { useDrawerPanel } from './context';

/**
 * Styled close button for the drawer panel header.
 */
const DrawerPanelCloseButtonRoot = styled(IconButton, {
  name: 'MuiDrawerPanel',
  slot: 'CloseButton',
})({});

/**
 * Props for DrawerPanelCloseButton component.
 */
export interface DrawerPanelCloseButtonProps {
  /** Tooltip and accessible name (default: `"Close"`) */
  label?: string;
  /** Click handler (overrides context onClose) */
  onClick?: () => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelCloseButton - Closes the drawer panel.
 *
 * Uses `onClose` from the parent `DrawerPanel` unless `onClick` is given.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Actions>
 *   <DrawerPanel.CloseButton />
 * </DrawerPanel.Actions>
 * ```
 */
export const DrawerPanelCloseButton: React.FC<DrawerPanelCloseButtonProps> = ({
  label = 'Close',
  onClick,
  sx,
}) => {
  const { onClose } = useDrawerPanel();

  return (
    <Tooltip title={label}>
      <DrawerPanelCloseButtonRoot onClick={onClick ?? onClose} aria-label={label} size="small" sx={sx}>
        <X size={20} aria-hidden="true" />
      </DrawerPanelCloseButtonRoot>
    </Tooltip>
  );
};

DrawerPanelCloseButton.displayName = 'DrawerPanelCloseButton';

export default DrawerPanelCloseButton;
