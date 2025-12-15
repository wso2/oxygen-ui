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
import { ComplexSelect, Box } from '@wso2/oxygen-ui';
import { User, Users, ShieldCheck, Smartphone, Settings, Plus } from '@wso2/oxygen-ui-icons-react';

const meta: Meta<typeof ComplexSelect> = {
  title: 'Inputs/ComplexSelect',
  component: ComplexSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 
          'A flexible select component with support for avatars, icons, headers, dividers, and rich content. ' +
          'Built on top of MUI Select component with a compound component API.\n\n' +
          '**Features:**\n' +
          '- `ComplexSelect.ListHeader` - Section headers\n' +
          '- `ComplexSelect.MenuItem` - Menu items with nested components\n' +
          '- `ComplexSelect.MenuItem.Avatar` - Avatar display with icons or text\n' +
          '- `ComplexSelect.MenuItem.Icon` - Icon display\n' +
          '- `ComplexSelect.MenuItem.Text` - Primary and secondary text\n' +
          '- `ComplexSelect.Divider` - Visual separators\n\n' +
          'Read MUI documentation for base Select API: ' +
          '[https://mui.com/material-ui/react-select/](https://mui.com/material-ui/react-select/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComplexSelect>;

export const Default: Story = {
  render: () => {
    const [role, setRole] = useState('admin');
    
    return (
      <Box sx={{ minWidth: 300 }}>
        <ComplexSelect
          value={role}
          onChange={(e) => setRole(e.target.value as string)}
          fullWidth
        >
          <ComplexSelect.ListHeader>User Roles</ComplexSelect.ListHeader>
          
          <ComplexSelect.MenuItem value="admin">
            <ComplexSelect.MenuItem.Icon>
              <ShieldCheck />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="Administrator" 
              secondary="Full system access"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="moderator">
            <ComplexSelect.MenuItem.Icon>
              <Users />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="Moderator" 
              secondary="Manage users and content"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="user">
            <ComplexSelect.MenuItem.Icon>
              <User />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="User" 
              secondary="Standard access"
            />
          </ComplexSelect.MenuItem>
        </ComplexSelect>
      </Box>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [role, setRole] = useState('admin');
    
    return (
      <Box sx={{ minWidth: 300 }}>
        <ComplexSelect
          value={role}
          onChange={(e) => setRole(e.target.value as string)}
          label="Select Role"
          fullWidth
        >
          <ComplexSelect.ListHeader>User Roles</ComplexSelect.ListHeader>
          
          <ComplexSelect.MenuItem value="admin">
            <ComplexSelect.MenuItem.Icon>
              <ShieldCheck />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="Administrator" 
              secondary="Full system access"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="moderator">
            <ComplexSelect.MenuItem.Icon>
              <Users />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="Moderator" 
              secondary="Manage users and content"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="user">
            <ComplexSelect.MenuItem.Icon>
              <User />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="User" 
              secondary="Standard access"
            />
          </ComplexSelect.MenuItem>
        </ComplexSelect>
      </Box>
    );
  },
};

export const ProductSelection: Story = {
  render: () => {
    const [product, setProduct] = useState(10);
    
    return (
      <Box sx={{ minWidth: 320 }}>
        <ComplexSelect
          value={product}
          onChange={(e) => setProduct(e.target.value as number)}
          label="Select Product"
          fullWidth
        >
          <ComplexSelect.ListHeader>Production</ComplexSelect.ListHeader>
          
          <ComplexSelect.MenuItem value={0}>
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'primary.main' }}>
              <Smartphone size={20} />
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Sitemark-web" 
              secondary="Web app"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value={10}>
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'primary.main' }}>
              <Smartphone size={20} />
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Sitemark-app" 
              secondary="Mobile application"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value={20}>
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'primary.main' }}>
              <Smartphone size={20} />
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Sitemark-Store" 
              secondary="Web app"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.ListHeader>Development</ComplexSelect.ListHeader>

          <ComplexSelect.MenuItem value={30}>
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'warning.main' }}>
              <Settings size={20} />
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Sitemark-Admin" 
              secondary="Web app"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.Divider />

          <ComplexSelect.MenuItem value={40}>
            <ComplexSelect.MenuItem.Icon>
              <Plus />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="Add product" 
              secondary="Create new project"
            />
          </ComplexSelect.MenuItem>
        </ComplexSelect>
      </Box>
    );
  },
};

export const WithAvatars: Story = {
  render: () => {
    const [user, setUser] = useState('user1');
    
    return (
      <Box sx={{ minWidth: 300 }}>
        <ComplexSelect
          value={user}
          onChange={(e) => setUser(e.target.value as string)}
          label="Select User"
          fullWidth
        >
          <ComplexSelect.ListHeader>Active Users</ComplexSelect.ListHeader>
          
          <ComplexSelect.MenuItem value="user1">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'primary.main' }}>
              JD
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="John Doe" 
              secondary="john.doe@example.com"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="user2">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'secondary.main' }}>
              JS
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Jane Smith" 
              secondary="jane.smith@example.com"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="user3">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'success.main' }}>
              BJ
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Bob Johnson" 
              secondary="bob.johnson@example.com"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.Divider />

          <ComplexSelect.ListHeader>Inactive Users</ComplexSelect.ListHeader>

          <ComplexSelect.MenuItem value="user4" disabled>
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'grey.400' }}>
              AW
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Alice Williams" 
              secondary="Currently offline"
            />
          </ComplexSelect.MenuItem>
        </ComplexSelect>
      </Box>
    );
  },
};

export const WithMultipleSections: Story = {
  render: () => {
    const [selection, setSelection] = useState('team1');
    
    return (
      <Box sx={{ minWidth: 300 }}>
        <ComplexSelect
          value={selection}
          onChange={(e) => setSelection(e.target.value as string)}
          label="Select Team"
          fullWidth
        >
          <ComplexSelect.ListHeader>Engineering Teams</ComplexSelect.ListHeader>
          
          <ComplexSelect.MenuItem value="team1">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'primary.main' }}>
              FE
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Frontend Team" 
              secondary="React, TypeScript"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="team2">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'secondary.main' }}>
              BE
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="Backend Team" 
              secondary="Node.js, Python"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.Divider />

          <ComplexSelect.ListHeader>Design Teams</ComplexSelect.ListHeader>

          <ComplexSelect.MenuItem value="team3">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'warning.main' }}>
              UX
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="UX Team" 
              secondary="User research, prototyping"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.MenuItem value="team4">
            <ComplexSelect.MenuItem.Avatar sx={{ bgcolor: 'info.main' }}>
              UI
            </ComplexSelect.MenuItem.Avatar>
            <ComplexSelect.MenuItem.Text 
              primary="UI Team" 
              secondary="Visual design, branding"
            />
          </ComplexSelect.MenuItem>

          <ComplexSelect.Divider />

          <ComplexSelect.ListHeader>Operations</ComplexSelect.ListHeader>

          <ComplexSelect.MenuItem value="team5">
            <ComplexSelect.MenuItem.Icon>
              <Users />
            </ComplexSelect.MenuItem.Icon>
            <ComplexSelect.MenuItem.Text 
              primary="DevOps Team" 
              secondary="Infrastructure, CI/CD"
            />
          </ComplexSelect.MenuItem>
        </ComplexSelect>
      </Box>
    );
  },
};
