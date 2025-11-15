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

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@wso2/oxygen-ui';
import { History, Star, Archive, Home, Search, User, Settings, Bell, Mail, MapPin } from '@wso2/oxygen-ui-icons-react';

/**
 * Bottom Navigation allows users to navigate between top-level views in a single tap.
 * 
 * Read more at: https://mui.com/material-ui/react-bottom-navigation/
 */
const meta: Meta<typeof BottomNavigation> = {
  title: 'Navigation/Bottom Navigation',
  component: BottomNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI Bottom Navigation is a direct import of MUI Bottom Navigation. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-bottom-navigation/](https://mui.com/material-ui/react-bottom-navigation/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

/**
 * Basic bottom navigation
 */
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    return (
      <Paper sx={{ position: 'relative', width: 500 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<History />} />
          <BottomNavigationAction label="Favorites" icon={<Star />} />
          <BottomNavigationAction label="Archive" icon={<Archive />} />
        </BottomNavigation>
      </Paper>
    );
  },
};

/**
 * Bottom navigation without labels
 */
export const WithoutLabels: Story = {
  render: () => {
    const [value, setValue] = useState(1);

    return (
      <Paper sx={{ position: 'relative', width: 500 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction icon={<Home />} />
          <BottomNavigationAction icon={<Search />} />
          <BottomNavigationAction icon={<User />} />
          <BottomNavigationAction icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    );
  },
};

/**
 * Bottom navigation with multiple actions
 */
export const MultipleActions: Story = {
  render: () => {
    const [value, setValue] = useState('home');

    return (
      <Paper sx={{ position: 'relative', width: 600 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" value="home" icon={<Home />} />
          <BottomNavigationAction label="Search" value="search" icon={<Search />} />
          <BottomNavigationAction label="Notifications" value="notifications" icon={<Bell />} />
          <BottomNavigationAction label="Messages" value="messages" icon={<Mail />} />
          <BottomNavigationAction label="Profile" value="profile" icon={<User />} />
        </BottomNavigation>
      </Paper>
    );
  },
};

/**
 * Bottom navigation with conditional rendering
 */
export const Conditional: Story = {
  render: () => {
    const [value, setValue] = useState('recents');

    return (
      <Paper sx={{ position: 'relative', width: 500 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" value="recents" icon={<History />} />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<Star />} />
          <BottomNavigationAction label="Nearby" value="nearby" icon={<MapPin />} />
        </BottomNavigation>
      </Paper>
    );
  },
};
