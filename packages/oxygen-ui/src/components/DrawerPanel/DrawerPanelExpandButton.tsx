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
import { Maximize2, Minimize2 } from '@wso2/oxygen-ui-icons-react';
import { useDrawerPanel } from './context';

/**
 * Styled expand button. Hidden on small screens, where the panel is
 * already full width.
 */
const DrawerPanelExpandButtonRoot = styled(IconButton, {
  name: 'MuiDrawerPanel',
  slot: 'ExpandButton',
})(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'inline-flex',
  },
}));

/**
 * Props for DrawerPanelExpandButton component.
 */
export interface DrawerPanelExpandButtonProps {
  /** Label shown while collapsed (default: `"Expand"`) */
  expandLabel?: string;
  /** Label shown while expanded (default: `"Collapse"`) */
  collapseLabel?: string;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelExpandButton - Toggles the panel between its default and expanded width.
 *
 * Reads and updates `expanded` through the DrawerPanel context, so it works
 * whether the parent `DrawerPanel` is controlled or uncontrolled.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Actions>
 *   <DrawerPanel.ExpandButton />
 *   <DrawerPanel.CloseButton />
 * </DrawerPanel.Actions>
 * ```
 */
export const DrawerPanelExpandButton: React.FC<DrawerPanelExpandButtonProps> = ({
  expandLabel = 'Expand',
  collapseLabel = 'Collapse',
  sx,
}) => {
  const { expanded, toggleExpanded } = useDrawerPanel();
  const label = expanded ? collapseLabel : expandLabel;

  return (
    <Tooltip title={label}>
      <DrawerPanelExpandButtonRoot onClick={toggleExpanded} aria-label={label} size="small" sx={sx}>
        {expanded ? <Minimize2 size={20} aria-hidden="true" /> : <Maximize2 size={20} aria-hidden="true" />}
      </DrawerPanelExpandButtonRoot>
    </Tooltip>
  );
};

DrawerPanelExpandButton.displayName = 'DrawerPanelExpandButton';

export default DrawerPanelExpandButton;
