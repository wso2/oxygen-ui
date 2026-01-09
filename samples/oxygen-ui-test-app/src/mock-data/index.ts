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

import {
  Home,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  FileText,
  FolderOpen,
  Shield,
  Bell,
  Layers,
  Globe,
  Database,
  Activity,
  PieChart,
  TrendingUp,
  UserCog,
  Lock,
  Key,
} from '@wso2/oxygen-ui-icons-react'
import type {
  NavigationCategory,
  NotificationItem,
  Organization,
  Project,
  User,
  Component,
  McpServer,
} from './types'

/**
 * Main navigation items organized by category.
 * Demonstrates hierarchical menu structure with sub-menus.
 */
export const navigationCategories: NavigationCategory[] = [
  {
    id: 'main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: Home,
        href: '/dashboard',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        children: [
          {
            id: 'analytics-overview',
            label: 'Overview',
            icon: PieChart,
            href: '/analytics/overview',
          },
          {
            id: 'analytics-reports',
            label: 'Reports',
            icon: FileText,
            href: '/analytics/reports',
          },
          {
            id: 'analytics-realtime',
            label: 'Real-time',
            icon: Activity,
            href: '/analytics/realtime',
          },
          {
            id: 'analytics-trends',
            label: 'Trends',
            icon: TrendingUp,
            href: '/analytics/trends',
          },
        ],
      },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    items: [
      {
        id: 'users',
        label: 'Users',
        icon: Users,
        badge: 3,
        children: [
          {
            id: 'users-list',
            label: 'All Users',
            icon: Users,
            href: '/users',
          },
          {
            id: 'users-roles',
            label: 'Roles',
            icon: UserCog,
            href: '/users/roles',
          },
          {
            id: 'users-permissions',
            label: 'Permissions',
            icon: Lock,
            href: '/users/permissions',
          },
        ],
      },
      {
        id: 'projects',
        label: 'Projects',
        icon: FolderOpen,
        href: '/projects',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: Layers,
        href: '/integrations',
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: [
      {
        id: 'security',
        label: 'Security',
        icon: Shield,
        children: [
          {
            id: 'security-overview',
            label: 'Overview',
            icon: Shield,
            href: '/security',
          },
          {
            id: 'security-api-keys',
            label: 'API Keys',
            icon: Key,
            href: '/security/api-keys',
          },
        ],
      },
      {
        id: 'databases',
        label: 'Databases',
        icon: Database,
        href: '/databases',
      },
      {
        id: 'domains',
        label: 'Domains',
        icon: Globe,
        href: '/domains',
      },
    ],
  },
]

/**
 * Settings navigation items (shown at bottom of sidebar).
 */
export const settingsNavigation: NavigationCategory = {
  id: 'settings',
  items: [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
    {
      id: 'notifications-settings',
      label: 'Notifications',
      icon: Bell,
      href: '/settings/notifications',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      href: '/help',
    },
  ],
}

/**
 * Sample notifications for the notification panel.
 */
export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'info',
    title: 'New feature available',
    message: 'Check out the new analytics dashboard with real-time insights.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    avatar: 'A',
    actionLabel: 'View',
  },
  {
    id: '2',
    type: 'success',
    title: 'Deployment successful',
    message: 'Your application has been deployed to production.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Storage limit approaching',
    message: 'You have used 85% of your storage quota. Consider upgrading your plan.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    actionLabel: 'Upgrade',
  },
  {
    id: '4',
    type: 'error',
    title: 'Build failed',
    message: 'The latest build for project "api-service" failed. Check the logs for details.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    actionLabel: 'View Logs',
  },
  {
    id: '5',
    type: 'info',
    title: 'Team member joined',
    message: 'Sarah Johnson has joined your organization.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    avatar: 'SJ',
  },
  {
    id: '6',
    type: 'info',
    title: 'Scheduled maintenance',
    message: 'Planned maintenance on December 20th from 2:00 AM - 4:00 AM UTC.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
]

/**
 * Sample organizations for the org switcher.
 */
export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Acme Corporation',
    avatar: 'AC',
    description: 'Primary organization',
  },
  {
    id: 'org-2',
    name: 'Beta Industries',
    avatar: 'BI',
    description: 'Partner organization',
  },
  {
    id: 'org-3',
    name: 'Gamma Labs',
    avatar: 'GL',
    description: 'Research division',
  },
]

/**
 * Sample projects for the project switcher.
 */
export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Main Platform',
    description: 'Production application',
    color: '#1976d2',
  },
  {
    id: 'proj-2',
    name: 'Mobile App',
    description: 'iOS and Android app',
    color: '#9c27b0',
  },
  {
    id: 'proj-3',
    name: 'API Services',
    description: 'Backend microservices',
    color: '#2e7d32',
  },
  {
    id: 'proj-4',
    name: 'Analytics Dashboard',
    description: 'Internal analytics',
    color: '#ed6c02',
  },
]

/**
 * Sample user for the user menu.
 */
export const mockUser: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'JD',
  role: 'Pro',
}

export const mockComponents: Component[] = [
  {
    id: '1',
    name: 'User Authentication API',
    type: 'HTTP',
    status: 'active',
    lastModified: '2 months ago',
  },
  {
    id: '2',
    name: 'Order Management API',
    type: 'HTTP',
    status: 'active',
    lastModified: '3 months ago',
  },
  {
    id: '3',
    name: 'Product Catalog API',
    type: 'HTTP',
    status: 'active',
    lastModified: '3 months ago',
  },
  {
    id: '4',
    name: 'Payment Processing API',
    type: 'HTTP',
    status: 'inactive',
    lastModified: '5 months ago',
  },
]

export const mockMcpServers: McpServer[] = [
  { id: '1', action: 'Customer Support MCP', user: 'System', timestamp: '2 months ago' },
  { id: '2', action: 'Order Processing MCP', user: 'System', timestamp: '3 months ago' },
  { id: '3', action: 'Fraud Detection MCP', user: 'System', timestamp: '5 months ago' },
  { id: '4', action: 'Notification Dispatcher MCP', user: 'System', timestamp: '7 months ago' },
]
