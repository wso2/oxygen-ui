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
import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu, Box, Typography } from '@wso2/oxygen-ui';
import {
  User as ProfileIcon,
  Settings,
  CreditCard,
  LogOut,
} from '@wso2/oxygen-ui-icons-react';

/**
 * UserMenu is a compound component for displaying user profile dropdown menu
 * with navigation options like Profile, Settings, Billing, and Logout.
 */
const meta: Meta<typeof UserMenu> = {
  title: 'App Elements/User Menu',
  component: UserMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The UserMenu is a compound component that provides a user profile dropdown menu with customizable content.

### Features
- Composable structure with Trigger, Header, Item, Logout, and Divider sub-components
- User avatar button that opens dropdown (supports image URLs or text fallback)
- Option to show user name next to avatar with \`showName\` prop
- User info header with name, email, and role badge
- Customizable menu items for various actions
- Dedicated Logout component with destructive styling
- Role/plan badge display (e.g., "Pro", "Admin")

### Sub-components
- \`UserMenu.Trigger\` - Avatar button with optional name display
- \`UserMenu.Header\` - User info header (name, email, role badge)
- \`UserMenu.Item\` - Regular menu item with icon and label
- \`UserMenu.Logout\` - Destructive menu item for logout action
- \`UserMenu.Divider\` - Visual separator between menu sections

### Usage
\`\`\`tsx
import { UserMenu } from '@wso2/oxygen-ui';
import { User, Settings, CreditCard, LogOut } from '@wso2/oxygen-ui-icons-react';

<UserMenu>
  <UserMenu.Trigger 
    name="John Doe" 
    avatar="/avatar.jpg"  // Image URL or null for initials
    showName  // Optional: show name next to avatar
  />
  <UserMenu.Header 
    name="John Doe" 
    email="john@example.com" 
    avatar="/avatar.jpg"
    role="Pro"  // Optional role badge
  />
  <UserMenu.Item
    icon={<User size={18} />}
    label="Profile"
    onClick={() => navigate('/profile')}
  />
  <UserMenu.Item
    icon={<Settings size={18} />}
    label="Settings"
    onClick={() => navigate('/settings')}
  />
  <UserMenu.Divider />
  <UserMenu.Logout
    icon={<LogOut size={18} />}
    label="Log out"  // Optional, defaults to "Log out"
    onClick={() => handleLogout()}
  />
</UserMenu>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

/**
 * Default composition pattern example with all menu items.
 */
export const Composed: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Composition Pattern - Click the avatar to open menu
      </Typography>
      <UserMenu>
        <UserMenu.Trigger name="John Doe" avatar="JD" />
        <UserMenu.Header name="John Doe" email="john@example.com" avatar="JD" role="Pro" />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Item
          icon={<Settings size={18} />}
          label="Settings"
          onClick={() => console.log('Settings clicked')}
        />
        <UserMenu.Item
          icon={<CreditCard size={18} />}
          label="Billing"
          onClick={() => console.log('Billing clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};

/**
 * Menu with avatar image URL.
 */
export const WithAvatarImage: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Avatar with image URL
      </Typography>
      <UserMenu>
        <UserMenu.Trigger 
          name="Sarah Wilson" 
          avatar="https://i.pravatar.cc/150?img=47"
        />
        <UserMenu.Header 
          name="Sarah Wilson" 
          email="sarah@example.com" 
          avatar="https://i.pravatar.cc/150?img=47"
          role="Enterprise" 
        />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Item
          icon={<Settings size={18} />}
          label="Settings"
          onClick={() => console.log('Settings clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};

/**
 * Trigger with name displayed next to avatar.
 */
export const WithNameVisible: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Avatar with name displayed
      </Typography>
      <UserMenu>
        <UserMenu.Trigger 
          name="Alex Morgan" 
          avatar="AM"
          showName
        />
        <UserMenu.Header 
          name="Alex Morgan" 
          email="alex@example.com" 
          avatar="AM"
          role="Admin" 
        />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Item
          icon={<Settings size={18} />}
          label="Settings"
          onClick={() => console.log('Settings clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};

/**
 * Custom menu items with only profile and logout.
 */
export const MinimalMenu: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Minimal menu with custom items
      </Typography>
      <UserMenu>
        <UserMenu.Trigger name="Minimal User" avatar="MU" />
        <UserMenu.Header name="Minimal User" email="minimal@example.com" avatar="MU" />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="View Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          label="Sign Out"
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};

/**
 * Admin user with more menu options.
 */
export const AdminMenu: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Admin menu with additional options
      </Typography>
      <UserMenu>
        <UserMenu.Trigger name="Admin User" avatar="AU" />
        <UserMenu.Header name="Admin User" email="admin@company.com" avatar="AU" role="Admin" />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Item
          icon={<Settings size={18} />}
          label="Settings"
          onClick={() => console.log('Settings clicked')}
        />
        <UserMenu.Item
          icon={<Settings size={18} />}
          label="Admin Panel"
          onClick={() => console.log('Admin panel clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};

/**
 * Multiple user menus showing different user roles.
 */
export const MultipleUsers: Story = {
  render: () => (
    <Box sx={{ p: 4, display: 'flex', gap: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Free User
        </Typography>
        <UserMenu>
          <UserMenu.Trigger name="Free User" avatar="FU" />
          <UserMenu.Header name="Free User" email="free@example.com" avatar="FU" />
          <UserMenu.Item
            icon={<ProfileIcon size={18} />}
            label="Profile"
            onClick={() => console.log('Profile clicked')}
          />
          <UserMenu.Divider />
          <UserMenu.Logout
            icon={<LogOut size={18} />}
            onClick={() => console.log('Logout clicked')}
          />
        </UserMenu>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Pro User
        </Typography>
        <UserMenu>
          <UserMenu.Trigger name="Pro User" avatar="PU" />
          <UserMenu.Header name="Pro User" email="pro@example.com" avatar="PU" role="Pro" />
          <UserMenu.Item
            icon={<ProfileIcon size={18} />}
            label="Profile"
            onClick={() => console.log('Profile clicked')}
          />
          <UserMenu.Item
            icon={<CreditCard size={18} />}
            label="Billing"
            onClick={() => console.log('Billing clicked')}
          />
          <UserMenu.Divider />
          <UserMenu.Logout
            icon={<LogOut size={18} />}
            onClick={() => console.log('Logout clicked')}
          />
        </UserMenu>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Enterprise
        </Typography>
        <UserMenu>
          <UserMenu.Trigger name="Enterprise" avatar="EN" />
          <UserMenu.Header name="Enterprise" email="enterprise@example.com" avatar="EN" role="Enterprise" />
          <UserMenu.Item
            icon={<ProfileIcon size={18} />}
            label="Profile"
            onClick={() => console.log('Profile clicked')}
          />
          <UserMenu.Item
            icon={<Settings size={18} />}
            label="Settings"
            onClick={() => console.log('Settings clicked')}
          />
          <UserMenu.Item
            icon={<CreditCard size={18} />}
            label="Billing"
            onClick={() => console.log('Billing clicked')}
          />
          <UserMenu.Divider />
          <UserMenu.Logout
            icon={<LogOut size={18} />}
            onClick={() => console.log('Logout clicked')}
          />
        </UserMenu>
      </Box>
    </Box>
  ),
};

/**
 * User without custom avatar - uses first letter of name.
 */
export const WithoutCustomAvatar: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Avatar uses first letter of name
      </Typography>
      <UserMenu>
        <UserMenu.Trigger name="Michael Johnson" />
        <UserMenu.Header name="Michael Johnson" email="michael.johnson@example.com" />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};

/**
 * Long email that gets truncated in the header.
 */
export const LongEmail: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Long email gets truncated
      </Typography>
      <UserMenu>
        <UserMenu.Trigger name="Enterprise User" avatar="EU" />
        <UserMenu.Header 
          name="Enterprise User" 
          email="enterprise.user.with.very.long.email@corporation.example.com" 
          avatar="EU" 
          role="Enterprise" 
        />
        <UserMenu.Item
          icon={<ProfileIcon size={18} />}
          label="Profile"
          onClick={() => console.log('Profile clicked')}
        />
        <UserMenu.Item
          icon={<CreditCard size={18} />}
          label="Billing"
          onClick={() => console.log('Billing clicked')}
        />
        <UserMenu.Divider />
        <UserMenu.Logout
          icon={<LogOut size={18} />}
          onClick={() => console.log('Logout clicked')}
        />
      </UserMenu>
    </Box>
  ),
};
