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
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Styled logo container for the header brand.
 */
const HeaderBrandLogoRoot = styled(Box, {
  name: 'MuiHeader',
  slot: 'BrandLogo',
})({
  display: 'flex',
  alignItems: 'center',
});

/**
 * Props for HeaderBrandLogo component.
 */
export interface HeaderBrandLogoProps {
  /** Logo element to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * HeaderBrandLogo - Logo container for the header brand.
 *
 * Wraps your logo element with proper alignment and sizing.
 * Use as a child of Header.Brand for composable branding.
 *
 * @example
 * ```tsx
 * <Header.Brand>
 *   <Header.BrandLogo>
 *     <MyLogo />
 *   </Header.BrandLogo>
 * </Header.Brand>
 * ```
 */
export const HeaderBrandLogo: React.FC<HeaderBrandLogoProps> = ({
  children,
  sx,
}) => {
  return <HeaderBrandLogoRoot sx={sx}>{children}</HeaderBrandLogoRoot>;
};

// Add display name for child detection
HeaderBrandLogo.displayName = 'HeaderBrandLogo';

export default HeaderBrandLogo;
