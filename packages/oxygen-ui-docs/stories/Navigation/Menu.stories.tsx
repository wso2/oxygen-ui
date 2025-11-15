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

import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem, Button, Divider, ListItemIcon, ListItemText } from '@wso2/oxygen-ui';
import { User, Settings } from '@wso2/oxygen-ui-icons-react';
import React, { useState } from 'react';

/**
 * The Menu component displays a list of choices on a temporary surface.
 * It appears when users interact with a button, action, or other control.
 * 
 * This is a direct import of MUI menu component. 
 * Read more at: https://mui.com/material-ui/react-menu/
 */
const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI menu component is a direct import of MUI menu component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-menu/](https://mui.com/material-ui/react-menu/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
      <>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Menu</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </>
    );
  },
};

export const WithDivider: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
      <>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Menu</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>New File</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Open</MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>Save</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Save As</MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>Exit</MenuItem>
        </Menu>
      </>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
      <>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Menu</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><User /></ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><User /></ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
      <>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Menu</Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>Active Item</MenuItem>
          <MenuItem disabled>Disabled Item</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Active Item</MenuItem>
        </Menu>
      </>
    );
  },
};
