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
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider } from '@wso2/oxygen-ui';
import { Mail, FileText, Send } from '@wso2/oxygen-ui-icons-react';
import React from 'react';

/**
 * The List component displays a continuous group of text or images.
 * It's commonly used for navigation menus, settings, or any list of items.
 * 
 * This is a direct import of MUI list component. 
 * Read more at: https://mui.com/material-ui/react-list/
 */
const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI list component is a direct import of MUI list component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-list/](https://mui.com/material-ui/react-list/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <List sx={{ width: 300, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary="Item 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 2" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 3" />
      </ListItem>
    </List>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <List sx={{ width: 300, bgcolor: 'background.paper' }}>
      <ListItemButton>
        <ListItemText primary="Inbox" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Sent" />
      </ListItemButton>
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List sx={{ width: 300, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemIcon><Mail /></ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem>
        <ListItemIcon><FileText /></ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem>
        <ListItemIcon><Send /></ListItemIcon>
        <ListItemText primary="Sent" />
      </ListItem>
    </List>
  ),
};

export const WithSecondaryText: Story = {
  render: () => (
    <List sx={{ width: 300, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText 
          primary="Brunch this weekend?" 
          secondary="Ali Connors — I'll be in your neighborhood doing errands this…" 
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText 
          primary="Summer BBQ" 
          secondary="to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…" 
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText 
          primary="Oui Oui" 
          secondary="Sandra Adams — Do you have Paris recommendations? Have you ever…" 
        />
      </ListItem>
    </List>
  ),
};

export const Dense: Story = {
  render: () => (
    <List dense sx={{ width: 300, bgcolor: 'background.paper' }}>
      <ListItemButton>
        <ListItemText primary="Item 1" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Item 2" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Item 3" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Item 4" />
      </ListItemButton>
    </List>
  ),
};
