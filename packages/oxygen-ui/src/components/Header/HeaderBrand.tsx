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
import type { SxProps, Theme } from '@mui/material/styles';
import { HeaderBrandLogo } from './HeaderBrandLogo';
import { HeaderBrandTitle } from './HeaderBrandTitle';

/**
 * Props for HeaderBrand component.
 */
export interface HeaderBrandProps {
  /** Click handler for brand area */
  onClick?: () => void;
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
  children,
  sx,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        ml: 1,
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

HeaderBrand.displayName = 'HeaderBrand';

export { HeaderBrandLogo, HeaderBrandTitle };
export type { HeaderBrandLogoProps } from './HeaderBrandLogo';
export type { HeaderBrandTitleProps } from './HeaderBrandTitle';

export default HeaderBrand;
