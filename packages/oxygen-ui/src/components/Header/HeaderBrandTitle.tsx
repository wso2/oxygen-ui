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
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Props for HeaderBrandTitle component.
 */
export interface HeaderBrandTitleProps {
  /** Title text to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * HeaderBrandTitle - Title component for the header brand.
 *
 * Displays the application title with responsive behavior:
 * - Hidden on xs viewports for cleaner mobile experience
 * - Font size: 16px on xs, 18px on sm+
 *
 * @example
 * ```tsx
 * <Header.Brand>
 *   <Header.BrandLogo>...</Header.BrandLogo>
 *   <Header.BrandTitle>Dashboard</Header.BrandTitle>
 * </Header.Brand>
 * ```
 */
export const HeaderBrandTitle: React.FC<HeaderBrandTitleProps> = ({
  children,
  sx,
}) => {
  return (
    <Typography
      variant="h6"
      component="div"
      sx={{
        fontWeight: 600,
        fontSize: { xs: 16, sm: 18 },
        ml: 1,
        display: { xs: 'none', sm: 'block' },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

// Add display name for child detection
HeaderBrandTitle.displayName = 'HeaderBrandTitle';

export default HeaderBrandTitle;
