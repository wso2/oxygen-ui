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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SimpleTreeView, TreeItem } from '@wso2/oxygen-ui/tree-view';

/**
 * MUI X Tree View provides components for displaying hierarchical data.
 * 
 * Read more at: https://mui.com/x/react-tree-view/
 */
const meta: Meta<typeof SimpleTreeView> = {
  title: 'Data Display/TreeView',
  component: SimpleTreeView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI tree view components are direct imports of MUI X Tree View. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/x/react-tree-view/](https://mui.com/x/react-tree-view/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SimpleTreeView>;

export const BasicTreeView: Story = {
  render: () => (
    <SimpleTreeView>
      <TreeItem itemId="1" label="Parent 1">
        <TreeItem itemId="2" label="Child 1.1" />
        <TreeItem itemId="3" label="Child 1.2" />
      </TreeItem>
      <TreeItem itemId="4" label="Parent 2">
        <TreeItem itemId="5" label="Child 2.1">
          <TreeItem itemId="6" label="Grandchild 2.1.1" />
        </TreeItem>
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const ExpandedTreeView: Story = {
  render: () => (
    <SimpleTreeView defaultExpandedItems={['1', '4']}>
      <TreeItem itemId="1" label="Parent 1">
        <TreeItem itemId="2" label="Child 1.1" />
        <TreeItem itemId="3" label="Child 1.2" />
      </TreeItem>
      <TreeItem itemId="4" label="Parent 2">
        <TreeItem itemId="5" label="Child 2.1">
          <TreeItem itemId="6" label="Grandchild 2.1.1" />
        </TreeItem>
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const FileSystemTree: Story = {
  render: () => (
    <SimpleTreeView>
      <TreeItem itemId="1" label="📁 Documents">
        <TreeItem itemId="2" label="📄 Resume.pdf" />
        <TreeItem itemId="3" label="📄 CoverLetter.doc" />
      </TreeItem>
      <TreeItem itemId="4" label="📁 Photos">
        <TreeItem itemId="5" label="📁 Vacation">
          <TreeItem itemId="6" label="🖼️ beach.jpg" />
          <TreeItem itemId="7" label="🖼️ sunset.jpg" />
        </TreeItem>
        <TreeItem itemId="8" label="🖼️ profile.jpg" />
      </TreeItem>
      <TreeItem itemId="9" label="📁 Projects">
        <TreeItem itemId="10" label="📁 Project A">
          <TreeItem itemId="11" label="📄 README.md" />
          <TreeItem itemId="12" label="📁 src">
            <TreeItem itemId="13" label="📄 index.ts" />
            <TreeItem itemId="14" label="📄 App.tsx" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const SelectedTreeView: Story = {
  render: () => (
    <SimpleTreeView defaultSelectedItems="5">
      <TreeItem itemId="1" label="Parent 1">
        <TreeItem itemId="2" label="Child 1.1" />
        <TreeItem itemId="3" label="Child 1.2" />
      </TreeItem>
      <TreeItem itemId="4" label="Parent 2">
        <TreeItem itemId="5" label="Child 2.1 (Pre-selected)" />
        <TreeItem itemId="6" label="Child 2.2" />
      </TreeItem>
    </SimpleTreeView>
  ),
};
