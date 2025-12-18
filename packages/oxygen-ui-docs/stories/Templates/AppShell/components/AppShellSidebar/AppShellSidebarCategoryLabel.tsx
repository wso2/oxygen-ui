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
import { Typography } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { useAppShellSidebar } from './context';

/**
 * Props for AppShellSidebarCategoryLabel component.
 */
export interface AppShellSidebarCategoryLabelProps {
  /** Label text to display */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellSidebarCategoryLabel - Label for a sidebar category.
 *
 * Automatically hides when sidebar is collapsed. Use as a child
 * of AppShellSidebar.Category for composable category headers.
 *
 * Theme tokens used:
 * - `text.secondary` - Label text color
 *
 * @example
 * ```tsx
 * <AppShellSidebar.Category>
 *   <AppShellSidebar.CategoryLabel>Management</AppShellSidebar.CategoryLabel>
 *   <AppShellSidebar.Item id="users">...</AppShellSidebar.Item>
 * </AppShellSidebar.Category>
 * ```
 */
export const AppShellSidebarCategoryLabel: React.FC<AppShellSidebarCategoryLabelProps> = ({
  children,
  sx,
}) => {
  const { collapsed } = useAppShellSidebar();

  // Hide label when sidebar is collapsed
  if (collapsed) {
    return null;
  }

  return (
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
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

// Add display name for child detection
AppShellSidebarCategoryLabel.displayName = 'AppShellSidebarCategoryLabel';

export default AppShellSidebarCategoryLabel;
