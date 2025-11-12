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

import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import Layout from '../../src/layouts'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'

interface LayoutStoryArgs {
  sidebarWidth: number
  showSidebar: boolean
  showNavbar: boolean
  showHeader: boolean
  navbarTitle: string
  contentTitle: string
  contentDescription: string
}

/**
 * The Layout component provides a flexible and composable structure for building application layouts.
 * It consists of several sub-components that can be composed together:
 * - Layout.Root: The main container
 * - Layout.Sidebar: Sidebar navigation area
 * - Layout.Navbar: Top navigation bar
 * - Layout.Header: Header section within content
 * - Layout.Content: Main content area
 */
const meta: Meta<LayoutStoryArgs> = {
  title: 'Layouts/Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible layout system built on MUI Box components that provides a composable structure for application layouts.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    sidebarWidth: {
      control: { type: 'range', min: 180, max: 400, step: 20 },
      description: 'Width of the sidebar in pixels',
    },
    showSidebar: {
      control: 'boolean',
      description: 'Toggle sidebar visibility',
    },
    showNavbar: {
      control: 'boolean',
      description: 'Toggle navbar visibility',
    },
    showHeader: {
      control: 'boolean',
      description: 'Toggle content header visibility',
    },
    navbarTitle: {
      control: 'text',
      description: 'Title text in the navbar',
    },
    contentTitle: {
      control: 'text',
      description: 'Title text in the content area',
    },
    contentDescription: {
      control: 'text',
      description: 'Description text in the content area',
    },
  },
  args: {
    sidebarWidth: 240,
    showSidebar: true,
    showNavbar: false,
    showHeader: false,
    navbarTitle: 'Application Name',
    contentTitle: 'Main Content',
    contentDescription:
      'This is the main content area of the layout. It automatically grows to fill available space and includes a background color based on the theme.',
  },
}

export default meta
type Story = StoryObj<LayoutStoryArgs>

// Interactive Playground
export const Playground: Story = {
  render: args => (
    <Layout sx={{ height: '100vh', flexDirection: args.showNavbar ? 'column' : 'row' }}>
      {args.showNavbar && (
        <Layout.Navbar>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {args.navbarTitle}
              </Typography>
            </Toolbar>
          </AppBar>
        </Layout.Navbar>
      )}
      <Layout sx={{ flex: 1 }}>
        {args.showSidebar && (
          <Layout.Sidebar
            sx={{
              width: args.sidebarWidth,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider',
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Navigation</Typography>
            </Box>
            <List>
              {['Dashboard', 'Analytics', 'Reports', 'Settings'].map(text => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Layout.Sidebar>
        )}
        <Layout.Content>
          {args.showHeader && (
            <Layout.Header
              sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <Typography variant="h5">{args.contentTitle}</Typography>
              <Typography variant="body2" color="text.secondary">
                Page header section
              </Typography>
            </Layout.Header>
          )}
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {args.contentTitle}
            </Typography>
            <Typography sx={{ mb: 2 }}>{args.contentDescription}</Typography>
          </Box>
        </Layout.Content>
      </Layout>
    </Layout>
  ),
}

// Basic Layout with Sidebar and Content
export const BasicLayout = () => (
  <Layout sx={{ height: '100vh' }}>
    <Layout.Sidebar
      sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Sidebar</Typography>
      </Box>
      <List>
        {['Dashboard', 'Profile', 'Settings', 'Analytics'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Layout.Sidebar>
    <Layout.Content>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Main Content
        </Typography>
        <Typography sx={{ mb: 2 }}>
          This is the main content area of the layout. It automatically grows to fill available
          space and includes a background color based on the theme.
        </Typography>
      </Box>
    </Layout.Content>
  </Layout>
)

// Layout with Navbar
export const WithNavbar = () => (
  <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
    <Layout.Navbar>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Application Name
          </Typography>
        </Toolbar>
      </AppBar>
    </Layout.Navbar>
    <Layout sx={{ flex: 1 }}>
      <Layout.Sidebar
        sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}
      >
        <List>
          {['Home', 'Products', 'Services', 'Contact'].map(text => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Layout.Sidebar>
      <Layout.Content>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Layout with Top Navigation
          </Typography>
          <Typography sx={{ mb: 2 }}>
            This layout includes a navbar at the top, sidebar on the left, and main content area.
          </Typography>
        </Box>
      </Layout.Content>
    </Layout>
  </Layout>
)

// Layout with Header in Content
export const WithContentHeader = () => (
  <Layout sx={{ height: '100vh' }}>
    <Layout.Sidebar
      sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Navigation</Typography>
      </Box>
      <List>
        {['Overview', 'Reports', 'Users', 'Settings'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Layout.Sidebar>
    <Layout.Content>
      <Layout.Header
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h5">Page Title</Typography>
        <Typography variant="body2" color="text.secondary">
          Subtitle or description
        </Typography>
      </Layout.Header>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }}>
          This layout includes a header section within the content area, useful for page titles and
          breadcrumbs.
        </Typography>
      </Box>
    </Layout.Content>
  </Layout>
)

// Full Featured Layout
export const FullFeaturedLayout = () => (
  <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
    <Layout.Navbar>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Layout.Navbar>
    <Layout sx={{ height: '100%' }}>
      <Layout.Sidebar
        sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Menu</Typography>
        </Box>
        <List>
          {['Dashboard', 'Analytics', 'Reports', 'Users', 'Settings'].map(text => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Layout.Sidebar>
      <Layout.Content>
        <Layout.Header
          sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Typography variant="h5">Dashboard Overview</Typography>
        </Layout.Header>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Content Area
          </Typography>
          <Typography sx={{ mb: 2 }}>
            This is a full-featured layout combining all the layout components: navbar at the top,
            sidebar for navigation, content header, and the main content area.
          </Typography>
          <Typography sx={{ mb: 2 }}>
            The layout is fully responsive and uses flexbox for optimal space distribution.
          </Typography>
        </Box>
      </Layout.Content>
    </Layout>
  </Layout>
)

// Content Only Layout
export const ContentOnly = () => (
  <Layout sx={{ height: '100vh' }}>
    <Layout.Content>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Simple Content Layout
        </Typography>
        <Typography sx={{ mb: 2 }}>
          A minimal layout with just the content area, useful for full-width pages or simple views.
        </Typography>
      </Box>
    </Layout.Content>
  </Layout>
)
