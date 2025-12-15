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
import { Box, List, Typography } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';

/**
 * Props for AppShellSidebarCategory component.
 */
export interface AppShellSidebarCategoryProps {
  /** Category label (hidden when collapsed) */
  label?: string;
  /** Navigation items in this category */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarCategory - Groups navigation items under a label.
 *
 * The label is hidden when the sidebar is collapsed. Use this to
 * organize navigation items into logical sections.
 *
 * Theme tokens used:
 * - `text.secondary` - Category label color
 */
export const AppShellSidebarCategory: React.FC<AppShellSidebarCategoryProps> = ({
  label,
  children,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();

  return (
    <Box sx={{ mb: 1, ...sx }}>
      {label && !collapsed && (
        <Typography
          variant="caption"
          sx={{
            px: 3,
            py: 1,
            display: 'block',
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: 11,
          }}
        >
          {label}
        </Typography>
      )}
      <List disablePadding>
        {children}
      </List>
    </Box>
  );
};

export default AppShellSidebarCategory;
