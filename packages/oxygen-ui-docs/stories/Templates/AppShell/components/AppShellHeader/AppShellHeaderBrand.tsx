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
import { Box, Typography } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';

/**
 * Props for AppShellHeaderBrand component.
 */
export interface AppShellHeaderBrandProps {
  /** Logo element to display */
  logo?: React.ReactNode;
  /** Application title */
  title?: string;
  /** Click handler for brand area */
  onClick?: () => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellHeaderBrand - Logo and title section for the header.
 *
 * Displays the application logo and title. The title is hidden on
 * mobile viewports for a cleaner responsive experience.
 *
 * Responsive behavior:
 * - Title: Hidden on xs, visible from sm up
 * - Font size: 16px on xs, 18px on sm+
 */
export const AppShellHeaderBrand: React.FC<AppShellHeaderBrandProps> = ({
  logo,
  title,
  onClick,
  sx,
}) => {
  const content = (
    <>
      {logo && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {logo}
        </Box>
      )}
      {title && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: { xs: 16, sm: 18 },
            ml: logo ? 1 : 0,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {title}
        </Typography>
      )}
    </>
  );

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
      {content}
    </Box>
  );
};

export default AppShellHeaderBrand;
