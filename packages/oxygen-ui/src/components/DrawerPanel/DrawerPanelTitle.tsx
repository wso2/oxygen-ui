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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useDrawerPanel } from './context';

/**
 * Styled container for the title and its optional icon.
 */
const DrawerPanelTitleRoot = styled(Box, {
  name: 'MuiDrawerPanel',
  slot: 'Title',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flex: 1,
  minWidth: 0,
}));

/**
 * Styled icon wrapper shown before the title.
 */
const DrawerPanelTitleIcon = styled(Box, {
  name: 'MuiDrawerPanel',
  slot: 'TitleIcon',
})({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

/**
 * Props for DrawerPanelTitle component.
 */
export interface DrawerPanelTitleProps {
  /** Title text, written in sentence case */
  children: React.ReactNode;
  /** Optional icon shown before the title */
  icon?: React.ReactNode;
  /** Heading element rendered for the title (default: `h2`) */
  component?: React.ElementType;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * DrawerPanelTitle - Heading of the drawer panel.
 *
 * The drawer uses this heading as its accessible name, so screen readers
 * announce the title when the panel opens.
 *
 * @example
 * ```tsx
 * <DrawerPanel.Title icon={<ListTree size={20} />}>Build details</DrawerPanel.Title>
 * ```
 */
export const DrawerPanelTitle: React.FC<DrawerPanelTitleProps> = ({
  children,
  icon,
  component = 'h2',
  sx,
}) => {
  const { titleId } = useDrawerPanel();

  return (
    <DrawerPanelTitleRoot sx={sx}>
      {icon && <DrawerPanelTitleIcon aria-hidden="true">{icon}</DrawerPanelTitleIcon>}
      <Typography id={titleId} variant="h6" component={component} noWrap sx={{ fontWeight: 600 }}>
        {children}
      </Typography>
    </DrawerPanelTitleRoot>
  );
};

DrawerPanelTitle.displayName = 'DrawerPanelTitle';

export default DrawerPanelTitle;
