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
import { Box, List } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { AppShellSidebarCategoryLabel } from './AppShellSidebarCategoryLabel';

/**
 * Props for AppShellSidebarCategory component.
 */
export interface AppShellSidebarCategoryProps {
  /** Category label and navigation items */
  children: React.ReactNode;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Separates CategoryLabel children from other children.
 */
const separateChildren = (children: React.ReactNode): {
  labelChild: React.ReactNode;
  otherChildren: React.ReactNode[];
} => {
  let labelChild: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      if (displayName === 'AppShellSidebarCategoryLabel') {
        labelChild = child;
      } else {
        otherChildren.push(child);
      }
    } else {
      otherChildren.push(child);
    }
  });

  return { labelChild, otherChildren };
};

/**
 * AppShellSidebarCategory - Groups navigation items under a label.
 *
 * Uses composable children API:
 * ```tsx
 * <AppShellSidebar.Category>
 *   <AppShellSidebar.CategoryLabel>Main</AppShellSidebar.CategoryLabel>
 *   <AppShellSidebar.Item id="home">...</AppShellSidebar.Item>
 * </AppShellSidebar.Category>
 * ```
 *
 * Theme tokens used:
 * - `text.secondary` - Category label color
 */
export const AppShellSidebarCategory: React.FC<AppShellSidebarCategoryProps> = ({
  children,
  sx,
}) => {
  const { labelChild, otherChildren } = separateChildren(children);

  return (
    <Box sx={{ mb: 1, ...sx }}>
      {labelChild}
      <List disablePadding>
        {otherChildren}
      </List>
    </Box>
  );
};

AppShellSidebarCategory.displayName = 'AppShellSidebarCategory';

export { AppShellSidebarCategoryLabel };
export type { AppShellSidebarCategoryLabelProps } from './AppShellSidebarCategoryLabel';

export default AppShellSidebarCategory;
