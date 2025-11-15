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
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The AppBar component displays information and actions at the top of the screen.
 * It's commonly used for branding, navigation, and actions.
 * 
 * This is a direct import of MUI app bar component. 
 * Read more at: https://mui.com/material-ui/react-app-bar/
 */
const meta: Meta<typeof AppBar> = {
  title: 'Surfaces/App Bar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Oxygen UI app bar component is a direct import of MUI app bar component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-app-bar/](https://mui.com/material-ui/react-app-bar/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            ☰
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Primary</Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="secondary" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Secondary</Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="default" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Default</Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6">Transparent</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  ),
};

export const WithMenu: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            ☰
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  ),
};

export const Dense: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            ☰
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dense App Bar
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  ),
};
