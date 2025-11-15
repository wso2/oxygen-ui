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
import {
    Box,
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@wso2/oxygen-ui';
import { Inbox, Star, Send, FileText, Mail, Trash2, TriangleAlert } from '@wso2/oxygen-ui-icons-react';
import React, { useState } from 'react';

/**
 * The Drawer component is a panel that slides in from the edge of the screen. 
 * It can be used for navigation, menus, or temporary content.
 * 
 * This is a direct import of MUI drawer component. 
 * Read more at: https://mui.com/material-ui/react-drawer/
 */
const meta: Meta<typeof Drawer> = {
  title: 'Navigation/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI drawer component is a direct import of MUI drawer component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-drawer/](https://mui.com/material-ui/react-drawer/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const getIconForItem = (text: string) => {
  switch (text) {
    case 'Inbox':
      return <Inbox />;
    case 'Starred':
      return <Star />;
    case 'Send email':
      return <Send />;
    case 'Drafts':
      return <FileText />;
    case 'All mail':
      return <Mail />;
    case 'Trash':
      return <Trash2 />;
    case 'Spam':
      return <TriangleAlert />;
    default:
      return <Mail />;
  }
};

const DrawerList = () => (
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {getIconForItem(text)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {getIconForItem(text)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export const TemporaryLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    return (
      <div>
        <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <DrawerList />
          </Box>
        </Drawer>
      </div>
    );
  },
};

export const Anchors: Story = {
  render: () => {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer = (anchor: 'top' | 'left' | 'bottom' | 'right', open: boolean) => () => {
      setState({ ...state, [anchor]: open });
    };

    return (
      <div>
        {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} sx={{ mr: 1, mb: 1 }}>
              {anchor}
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <Box
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                <DrawerList />
              </Box>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  },
};

export const Permanent: Story = {
  render: () => (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
      >
        <DrawerList />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box>Main content area</Box>
      </Box>
    </Box>
  ),
};

export const Persistent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <Button onClick={handleDrawerOpen} disabled={open}>
          Open Drawer
        </Button>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              position: 'relative',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Button onClick={handleDrawerClose} fullWidth>
              Close Drawer
            </Button>
          </Box>
          <DrawerList />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box>Main content area</Box>
        </Box>
      </Box>
    );
  },
};
