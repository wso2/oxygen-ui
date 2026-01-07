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
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { SidebarCategoryLabel } from './SidebarCategoryLabel';

/**
 * Styled container for sidebar category.
 */
const SidebarCategoryRoot = styled(Box, {
  name: 'MuiSidebar',
  slot: 'Category',
})(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

/**
 * Props for SidebarCategory component.
 */
export interface SidebarCategoryProps {
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
      if (displayName === 'SidebarCategoryLabel') {
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
 * SidebarCategory - Groups navigation items under a label.
 *
 * Uses composable children API:
 * ```tsx
 * <Sidebar.Category>
 *   <Sidebar.CategoryLabel>Main</Sidebar.CategoryLabel>
 *   <Sidebar.Item id="home">...</Sidebar.Item>
 * </Sidebar.Category>
 * ```
 *
 * Theme tokens used:
 * - `text.secondary` - Category label color
 */
export const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  children,
  sx,
}) => {
  const { labelChild, otherChildren } = separateChildren(children);

  return (
    <SidebarCategoryRoot sx={sx}>
      {labelChild}
      <List disablePadding>{otherChildren}</List>
    </SidebarCategoryRoot>
  );
};

SidebarCategory.displayName = 'SidebarCategory';

export { SidebarCategoryLabel };
export type { SidebarCategoryLabelProps } from './SidebarCategoryLabel';

export default SidebarCategory;
