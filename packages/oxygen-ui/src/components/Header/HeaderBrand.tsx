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
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { HeaderBrandLogo } from './HeaderBrandLogo';
import { HeaderBrandTitle } from './HeaderBrandTitle';

/**
 * Props for the styled component.
 */
interface HeaderBrandRootProps {
  clickable?: boolean;
}

/**
 * Styled container for the header brand.
 */
const HeaderBrandRoot = styled(Box, {
  name: 'MuiHeader',
  slot: 'Brand',
  shouldForwardProp: (prop) => prop !== 'clickable',
})<HeaderBrandRootProps>(({ theme, clickable }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1),
  cursor: clickable ? 'pointer' : 'default',
}));

/**
 * Styled interactive container used when an onClick is provided, so the brand
 * area is keyboard focusable and exposed as a button to assistive technology.
 */
const HeaderBrandButtonRoot = styled(ButtonBase, {
  name: 'MuiHeader',
  slot: 'BrandButton',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

/**
 * Props for HeaderBrand component.
 */
export interface HeaderBrandProps {
  /** Click handler for brand area */
  onClick?: () => void;
  /** Accessible name for the brand button when onClick is provided */
  'aria-label'?: string;
  /** Child components (BrandLogo, BrandTitle) */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * HeaderBrand - Logo and title section for the header.
 *
 * Uses composable children API:
 * ```tsx
 * <Header.Brand>
 *   <Header.BrandLogo><Logo /></Header.BrandLogo>
 *   <Header.BrandTitle>Dashboard</Header.BrandTitle>
 * </Header.Brand>
 * ```
 */
export const HeaderBrand: React.FC<HeaderBrandProps> = ({
  onClick,
  'aria-label': ariaLabel,
  children,
  sx,
}) => {
  if (onClick) {
    return (
      <HeaderBrandButtonRoot onClick={onClick} aria-label={ariaLabel} sx={sx}>
        {children}
      </HeaderBrandButtonRoot>
    );
  }

  return (
    <HeaderBrandRoot clickable={false} sx={sx}>
      {children}
    </HeaderBrandRoot>
  );
};

HeaderBrand.displayName = 'HeaderBrand';

export { HeaderBrandLogo, HeaderBrandTitle };
export type { HeaderBrandLogoProps } from './HeaderBrandLogo';
export type { HeaderBrandTitleProps } from './HeaderBrandTitle';

export default HeaderBrand;
