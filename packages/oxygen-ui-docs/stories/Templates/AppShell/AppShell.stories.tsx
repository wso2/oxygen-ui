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
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Layout,
  ColorSchemeToggle,
  IconButton,
  Tooltip,
  Badge,
  Divider,
} from '@wso2/oxygen-ui';
import {
  Zap,
  Bell,
  HelpCircle,
  Home,
  BarChart3,
  Users,
  Settings,
  FolderOpen,
  Layers,
  Shield,
  Database,
  Globe,
  PieChart,
  FileText,
  Activity,
  TrendingUp,
  UserCog,
  Lock,
  Key,
} from '@wso2/oxygen-ui-icons-react';
import {
  // Types
  type Organization,
  type Project,
  type Environment,
  // Mock data
  mockNotifications,
  mockOrganizations,
  mockProjects,
  mockUser,
  // Hooks
  useAppShellState,
  // Utilities
  formatRelativeTime,
  // Compound Components
  AppShellHeader,
  AppShellSidebar,
  AppShellNotificationPanel,
  // Standalone Components
  AppShellSwitcher,
  AppShellUserMenu,
  AppShellNotificationBanner,
  AppShellFooter,
  AppShellConfirmDialog,
} from './components';

/**
 * Storybook args interface for the App Shell.
 */
interface AppShellArgs {
  sidebarCollapsed: boolean;
  showNotificationBanner: boolean;
  bannerSeverity: 'info' | 'warning' | 'error' | 'success';
  bannerMessage: string;
  showFooter: boolean;
  notificationCount: number;
  minimal: boolean;
}

/**
 * Sample content component to demonstrate the main content area.
 */
const SampleContent: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
      Dashboard
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
      Welcome to your application dashboard. This is a sample content area
      demonstrating how to use the App Shell layout.
    </Typography>

    <Grid container spacing={3}>
      {[
        { title: 'Total Users', value: '12,345', change: '+12%' },
        { title: 'Active Projects', value: '48', change: '+3' },
        { title: 'Revenue', value: '$45,678', change: '+8.2%' },
        { title: 'Performance', value: '98.5%', change: '+0.5%' },
      ].map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', textTransform: 'uppercase' }}
              >
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, my: 1 }}>
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'success.main', fontWeight: 600 }}
              >
                {stat.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/**
 * Logo component for the header.
 */
const Logo: React.FC = () => (
  <Box
    sx={{
      width: 32,
      height: 32,
      borderRadius: 1,
      bgcolor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'primary.contrastText',
    }}
  >
    <Zap size={20} />
  </Box>
);

/**
 * The App Shell template demonstrates a complete application layout pattern
 * using **compound components** with a **children-only API** for maximum
 * flexibility and composability.
 *
 * ## Overview
 * This template provides a comprehensive reference implementation for building
 * enterprise application layouts using Oxygen UI components. It demonstrates:
 *
 * - **Compound Component Pattern**: Compose complex UIs from simple, focused parts
 * - **Children-Only API**: No props for UI elements - use child components instead
 * - **Layout Structure**: Using the Layout component for flexible composition
 * - **Navigation**: Collapsible sidebar with hierarchical menus
 * - **Header**: Top bar with logo, switchers, and user actions
 * - **Notifications**: Banner alerts and notification panel
 * - **Footer**: Copyright and legal links
 *
 * ## Children-Only API
 *
 * All compound components use a children-based API for maximum composability.
 * Each UI element is a separate child component:
 *
 * ```tsx
 * // Header with composable children
 * <AppShellHeader>
 *   <AppShellHeader.Toggle collapsed={collapsed} onToggle={toggle} />
 *   <AppShellHeader.Brand>
 *     <AppShellHeader.BrandLogo><Logo /></AppShellHeader.BrandLogo>
 *     <AppShellHeader.BrandTitle>Dashboard</AppShellHeader.BrandTitle>
 *   </AppShellHeader.Brand>
 *   <AppShellHeader.Spacer />
 *   <AppShellHeader.Actions>...</AppShellHeader.Actions>
 * </AppShellHeader>
 *
 * // Sidebar with deeply composable items
 * <AppShellSidebar.Item id="users">
 *   <AppShellSidebar.ItemIcon><Users size={20} /></AppShellSidebar.ItemIcon>
 *   <AppShellSidebar.ItemLabel>Users</AppShellSidebar.ItemLabel>
 *   <AppShellSidebar.ItemBadge>3</AppShellSidebar.ItemBadge>
 * </AppShellSidebar.Item>
 * ```
 *
 * ## Benefits
 *
 * 1. **Maximum Flexibility** - Full control over each UI element
 * 2. **Design System Ready** - Each sub-component can be promoted independently
 * 3. **Testable** - Small components are easier to unit test
 * 4. **Maintainable** - ~100 lines per file instead of ~500
 * 5. **Tree-shakeable** - Import only what you use
 */
const meta: Meta<AppShellArgs> = {
  title: 'Templates/App Shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive App Shell template using **compound components** with a **children-only API**.

This template shows how to compose Oxygen UI components to create a complete
application shell with:
- Collapsible navigation sidebar with hierarchical menus
- Header with logo, context switchers, and user actions
- Notification system with slide-out panel
- Footer with legal links

**Children-Only API Example:**
\`\`\`tsx
<AppShellHeader>
  <AppShellHeader.Toggle collapsed={collapsed} onToggle={toggle} />
  <AppShellHeader.Brand>
    <AppShellHeader.BrandLogo><Logo /></AppShellHeader.BrandLogo>
    <AppShellHeader.BrandTitle>Dashboard</AppShellHeader.BrandTitle>
  </AppShellHeader.Brand>
  <AppShellHeader.Spacer />
  <AppShellHeader.Actions>...</AppShellHeader.Actions>
</AppShellHeader>

<AppShellSidebar collapsed={collapsed} activeItem={activeId} ...>
  <AppShellSidebar.Nav>
    <AppShellSidebar.Category>
      <AppShellSidebar.CategoryLabel>Main</AppShellSidebar.CategoryLabel>
      <AppShellSidebar.Item id="home">
        <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
        <AppShellSidebar.ItemLabel>Home</AppShellSidebar.ItemLabel>
      </AppShellSidebar.Item>
    </AppShellSidebar.Category>
  </AppShellSidebar.Nav>
</AppShellSidebar>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    sidebarCollapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsed',
    },
    showNotificationBanner: {
      control: 'boolean',
      description: 'Show the notification banner at the top',
    },
    bannerSeverity: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
      description: 'Severity level of the notification banner',
    },
    bannerMessage: {
      control: 'text',
      description: 'Message to display in the notification banner',
    },
    showFooter: {
      control: 'boolean',
      description: 'Show the footer',
    },
    notificationCount: {
      control: { type: 'number', min: 0, max: 99 },
      description: 'Number of unread notifications (badge count)',
    },
    minimal: {
      control: 'boolean',
      description: 'Use minimal header (hides switchers)',
    },
  },
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    bannerSeverity: 'info',
    bannerMessage: 'Scheduled maintenance on December 20th from 2:00 AM - 4:00 AM UTC.',
    showFooter: true,
    notificationCount: 2,
    minimal: false,
  },
};

export default meta;
type Story = StoryObj<AppShellArgs>;

/**
 * Interactive playground with compound component API.
 */
export const Playground: Story = {
  render: (args) => {
    const { state, actions, unreadCount } = useAppShellState({
      initialCollapsed: args.sidebarCollapsed,
      initialNotifications: [...mockNotifications],
      initialOrg: mockOrganizations[0],
      initialProject: mockProjects[0],
    });

    // Sync with storybook args
    React.useEffect(() => {
      if (args.sidebarCollapsed !== state.sidebarCollapsed) {
        actions.toggleSidebar();
      }
    }, [args.sidebarCollapsed]);

    const [tabIndex, setTabIndex] = React.useState(0);
    const unreadNotifications = state.notifications.filter((n) => !n.read);
    const alertNotifications = state.notifications.filter(
      (n) => n.type === 'warning' || n.type === 'error'
    );

    const getFilteredNotifications = () => {
      switch (tabIndex) {
        case 1:
          return unreadNotifications;
        case 2:
          return alertNotifications;
        default:
          return state.notifications;
      }
    };

    return (
      <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
        {/* Notification Banner */}
        {args.showNotificationBanner && (
          <AppShellNotificationBanner
            severity={args.bannerSeverity}
            message={args.bannerMessage}
            actionLabel="Learn More"
            onAction={() => console.log('Banner action clicked')}
          />
        )}

        {/* Header - Using Compound Component Pattern */}
        <Layout.Navbar>
          <AppShellHeader minimal={args.minimal}>
            <AppShellHeader.Toggle
              collapsed={state.sidebarCollapsed}
              onToggle={actions.toggleSidebar}
            />
            <AppShellHeader.Brand>
              <AppShellHeader.BrandLogo><Logo /></AppShellHeader.BrandLogo>
              <AppShellHeader.BrandTitle>Oxygen UI</AppShellHeader.BrandTitle>
            </AppShellHeader.Brand>
            <AppShellHeader.Switchers>
              {state.selectedOrg && (
                <AppShellSwitcher
                  type="organization"
                  items={mockOrganizations}
                  selected={state.selectedOrg}
                  onChange={(org) => actions.setOrganization(org as Organization)}
                />
              )}
              {state.selectedProject && (
                <AppShellSwitcher
                  type="project"
                  items={mockProjects}
                  selected={state.selectedProject}
                  onChange={(proj) => actions.setProject(proj as Project)}
                />
              )}
              <AppShellSwitcher
                type="environment"
                environment={state.environment}
                onEnvironmentChange={actions.setEnvironment}
              />
            </AppShellHeader.Switchers>
            <AppShellHeader.Spacer />
            <AppShellHeader.Actions>
              <ColorSchemeToggle />
              <Tooltip title="Help & Support">
                <IconButton
                  onClick={() => console.log('Help clicked')}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <HelpCircle size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton
                  onClick={actions.toggleNotificationPanel}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <Badge
                    badgeContent={args.notificationCount ?? unreadCount}
                    color="error"
                    max={99}
                    invisible={(args.notificationCount ?? unreadCount) === 0}
                  >
                    <Bell size={20} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }}
              />
              <AppShellUserMenu
                user={mockUser}
                onProfileClick={() => console.log('Profile clicked')}
                onSettingsClick={() => console.log('Settings clicked')}
                onBillingClick={() => console.log('Billing clicked')}
                onLogout={actions.openConfirmDialog}
              />
            </AppShellHeader.Actions>
          </AppShellHeader>
        </Layout.Navbar>

        {/* Main Content Area */}
        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          {/* Sidebar - Using Compound Component Pattern */}
          <Layout.Sidebar>
            <AppShellSidebar
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
            >
              <AppShellSidebar.Nav>
                {/* Main Navigation */}
                <AppShellSidebar.Category>
                  <AppShellSidebar.Item id="dashboard">
                    <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Dashboard</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="analytics">
                    <AppShellSidebar.ItemIcon><BarChart3 size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Analytics</AppShellSidebar.ItemLabel>
                    <AppShellSidebar.Item id="analytics-overview">
                      <AppShellSidebar.ItemIcon><PieChart size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Overview</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                    <AppShellSidebar.Item id="analytics-reports">
                      <AppShellSidebar.ItemIcon><FileText size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Reports</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                    <AppShellSidebar.Item id="analytics-realtime">
                      <AppShellSidebar.ItemIcon><Activity size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Real-time</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                    <AppShellSidebar.Item id="analytics-trends">
                      <AppShellSidebar.ItemIcon><TrendingUp size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Trends</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>

                {/* Management */}
                <AppShellSidebar.Category>
                  <AppShellSidebar.CategoryLabel>Management</AppShellSidebar.CategoryLabel>
                  <AppShellSidebar.Item id="users">
                    <AppShellSidebar.ItemIcon><Users size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Users</AppShellSidebar.ItemLabel>
                    <AppShellSidebar.ItemBadge>3</AppShellSidebar.ItemBadge>
                    <AppShellSidebar.Item id="users-list">
                      <AppShellSidebar.ItemIcon><Users size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>All Users</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                    <AppShellSidebar.Item id="users-roles">
                      <AppShellSidebar.ItemIcon><UserCog size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Roles</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                    <AppShellSidebar.Item id="users-permissions">
                      <AppShellSidebar.ItemIcon><Lock size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Permissions</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="projects">
                    <AppShellSidebar.ItemIcon><FolderOpen size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Projects</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="integrations">
                    <AppShellSidebar.ItemIcon><Layers size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Integrations</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>

                {/* Infrastructure */}
                <AppShellSidebar.Category>
                  <AppShellSidebar.CategoryLabel>Infrastructure</AppShellSidebar.CategoryLabel>
                  <AppShellSidebar.Item id="security">
                    <AppShellSidebar.ItemIcon><Shield size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Security</AppShellSidebar.ItemLabel>
                    <AppShellSidebar.Item id="security-overview">
                      <AppShellSidebar.ItemIcon><Shield size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>Overview</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                    <AppShellSidebar.Item id="security-api-keys">
                      <AppShellSidebar.ItemIcon><Key size={20} /></AppShellSidebar.ItemIcon>
                      <AppShellSidebar.ItemLabel>API Keys</AppShellSidebar.ItemLabel>
                    </AppShellSidebar.Item>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="databases">
                    <AppShellSidebar.ItemIcon><Database size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Databases</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="domains">
                    <AppShellSidebar.ItemIcon><Globe size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Domains</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>
              </AppShellSidebar.Nav>

              {/* Settings Footer */}
              <AppShellSidebar.Footer>
                <AppShellSidebar.Category>
                  <AppShellSidebar.Item id="settings">
                    <AppShellSidebar.ItemIcon><Settings size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Settings</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="notifications-settings">
                    <AppShellSidebar.ItemIcon><Bell size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Notifications</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="help">
                    <AppShellSidebar.ItemIcon><HelpCircle size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Help & Support</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>
              </AppShellSidebar.Footer>
            </AppShellSidebar>
          </Layout.Sidebar>

          {/* Content */}
          <Layout.Content
            sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <SampleContent />
            </Box>

            {/* Footer */}
            {args.showFooter && (
              <AppShellFooter
                companyName="Oxygen UI"
                version="v1.0.0"
                termsUrl="#terms"
                privacyUrl="#privacy"
              />
            )}
          </Layout.Content>
        </Layout>

        {/* Notification Panel - Using Compound Component Pattern */}
        <AppShellNotificationPanel
          open={state.notificationPanelOpen}
          onClose={actions.toggleNotificationPanel}
        >
          <AppShellNotificationPanel.Header>
            <AppShellNotificationPanel.HeaderIcon><Bell size={20} /></AppShellNotificationPanel.HeaderIcon>
            <AppShellNotificationPanel.HeaderTitle>Notifications</AppShellNotificationPanel.HeaderTitle>
            {unreadCount > 0 && <AppShellNotificationPanel.HeaderBadge>{unreadCount}</AppShellNotificationPanel.HeaderBadge>}
            <AppShellNotificationPanel.HeaderClose />
          </AppShellNotificationPanel.Header>
          <AppShellNotificationPanel.Tabs
            tabs={[
              { label: 'All', count: state.notifications.length },
              { label: 'Unread', count: unreadNotifications.length, color: 'primary' },
              { label: 'Alerts', count: alertNotifications.length, color: 'warning' },
            ]}
            value={tabIndex}
            onChange={setTabIndex}
          />
          {state.notifications.length > 0 && (
            <AppShellNotificationPanel.Actions
              hasUnread={unreadNotifications.length > 0}
              onMarkAllRead={actions.markAllNotificationsRead}
              onClearAll={actions.clearAllNotifications}
            />
          )}
          {getFilteredNotifications().length === 0 ? (
            <AppShellNotificationPanel.EmptyState
              message={
                tabIndex === 0
                  ? 'No notifications'
                  : tabIndex === 1
                  ? 'No unread notifications'
                  : 'No alerts'
              }
            />
          ) : (
            <AppShellNotificationPanel.List>
              {getFilteredNotifications().map((notification) => (
                <AppShellNotificationPanel.Item
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  read={notification.read}
                  onAction={notification.onAction}
                  onMarkRead={actions.markNotificationRead}
                  onDismiss={actions.dismissNotification}
                >
                  <AppShellNotificationPanel.ItemAvatar>{notification.avatar}</AppShellNotificationPanel.ItemAvatar>
                  <AppShellNotificationPanel.ItemTitle>{notification.title}</AppShellNotificationPanel.ItemTitle>
                  <AppShellNotificationPanel.ItemMessage>{notification.message}</AppShellNotificationPanel.ItemMessage>
                  <AppShellNotificationPanel.ItemTimestamp>{formatRelativeTime(notification.timestamp)}</AppShellNotificationPanel.ItemTimestamp>
                  {notification.actionLabel && (
                    <AppShellNotificationPanel.ItemAction>{notification.actionLabel}</AppShellNotificationPanel.ItemAction>
                  )}
                </AppShellNotificationPanel.Item>
              ))}
            </AppShellNotificationPanel.List>
          )}
        </AppShellNotificationPanel>

        {/* Confirm Dialog */}
        <AppShellConfirmDialog
          open={state.confirmDialogOpen}
          title="Sign Out"
          message="Are you sure you want to sign out of your account?"
          confirmLabel="Sign Out"
          onConfirm={() => {
            console.log('Signed out');
            actions.closeConfirmDialog();
          }}
          onCancel={actions.closeConfirmDialog}
        />
      </Layout>
    );
  },
};

/**
 * Complete App Shell with all features visible.
 */
export const Complete: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: true,
    bannerSeverity: 'info',
    showFooter: true,
  },
  render: Playground.render,
};

/**
 * App Shell with collapsed sidebar showing icon-only navigation.
 */
export const WithCollapsedSidebar: Story = {
  args: {
    sidebarCollapsed: true,
    showNotificationBanner: false,
    showFooter: true,
  },
  render: Playground.render,
};

/**
 * App Shell with notification banner displayed.
 */
export const WithNotificationBanner: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: true,
    bannerSeverity: 'warning',
    bannerMessage: 'Your storage quota is almost full. Please upgrade your plan.',
    showFooter: true,
  },
  render: Playground.render,
};

/**
 * App Shell with error notification banner.
 */
export const WithErrorBanner: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: true,
    bannerSeverity: 'error',
    bannerMessage: 'Service disruption detected. Our team is investigating.',
    showFooter: true,
  },
  render: Playground.render,
};

/**
 * Minimal header showing only essential elements.
 */
export const MinimalHeader: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    showFooter: true,
    minimal: true,
  },
  render: Playground.render,
};

/**
 * App Shell without footer.
 */
export const WithoutFooter: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    showFooter: false,
  },
  render: Playground.render,
};

/**
 * App Shell demonstrating the notification panel.
 * Click the bell icon in the header to see the panel.
 */
export const WithNotificationPanel: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    showFooter: true,
    notificationCount: 3,
  },
  render: (args) => {
    const { state, actions, unreadCount } = useAppShellState({
      initialNotifications: [...mockNotifications],
      initialOrg: mockOrganizations[0],
      initialProject: mockProjects[0],
    });

    const [tabIndex, setTabIndex] = React.useState(0);
    const unreadNotifications = state.notifications.filter((n) => !n.read);
    const alertNotifications = state.notifications.filter(
      (n) => n.type === 'warning' || n.type === 'error'
    );

    // Auto-open notification panel for this story
    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (!state.notificationPanelOpen) {
          actions.toggleNotificationPanel();
        }
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    const getFilteredNotifications = () => {
      switch (tabIndex) {
        case 1:
          return unreadNotifications;
        case 2:
          return alertNotifications;
        default:
          return state.notifications;
      }
    };

    return (
      <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
        <Layout.Navbar>
          <AppShellHeader>
            <AppShellHeader.Toggle
              collapsed={state.sidebarCollapsed}
              onToggle={actions.toggleSidebar}
            />
            <AppShellHeader.Brand>
              <AppShellHeader.BrandLogo><Logo /></AppShellHeader.BrandLogo>
              <AppShellHeader.BrandTitle>Oxygen UI</AppShellHeader.BrandTitle>
            </AppShellHeader.Brand>
            <AppShellHeader.Spacer />
            <AppShellHeader.Actions>
              <ColorSchemeToggle />
              <IconButton
                onClick={actions.toggleNotificationPanel}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <Bell size={20} />
                </Badge>
              </IconButton>
              <AppShellUserMenu user={mockUser} onLogout={actions.openConfirmDialog} />
            </AppShellHeader.Actions>
          </AppShellHeader>
        </Layout.Navbar>

        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          <Layout.Sidebar>
            <AppShellSidebar
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
            >
              <AppShellSidebar.Nav>
                <AppShellSidebar.Category>
                  <AppShellSidebar.Item id="dashboard">
                    <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Dashboard</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="analytics">
                    <AppShellSidebar.ItemIcon><BarChart3 size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Analytics</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>
              </AppShellSidebar.Nav>
            </AppShellSidebar>
          </Layout.Sidebar>

          <Layout.Content sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <SampleContent />
            </Box>
            {args.showFooter && (
              <AppShellFooter companyName="Oxygen UI" version="v1.0.0" />
            )}
          </Layout.Content>
        </Layout>

        <AppShellNotificationPanel
          open={state.notificationPanelOpen}
          onClose={actions.toggleNotificationPanel}
        >
          <AppShellNotificationPanel.Header>
            <AppShellNotificationPanel.HeaderIcon><Bell size={20} /></AppShellNotificationPanel.HeaderIcon>
            <AppShellNotificationPanel.HeaderTitle>Notifications</AppShellNotificationPanel.HeaderTitle>
            {unreadCount > 0 && <AppShellNotificationPanel.HeaderBadge>{unreadCount}</AppShellNotificationPanel.HeaderBadge>}
            <AppShellNotificationPanel.HeaderClose />
          </AppShellNotificationPanel.Header>
          <AppShellNotificationPanel.Tabs
            tabs={[
              { label: 'All', count: state.notifications.length },
              { label: 'Unread', count: unreadNotifications.length, color: 'primary' },
              { label: 'Alerts', count: alertNotifications.length, color: 'warning' },
            ]}
            value={tabIndex}
            onChange={setTabIndex}
          />
          {state.notifications.length > 0 && (
            <AppShellNotificationPanel.Actions
              hasUnread={unreadNotifications.length > 0}
              onMarkAllRead={actions.markAllNotificationsRead}
              onClearAll={actions.clearAllNotifications}
            />
          )}
          {getFilteredNotifications().length === 0 ? (
            <AppShellNotificationPanel.EmptyState />
          ) : (
            <AppShellNotificationPanel.List>
              {getFilteredNotifications().map((notification) => (
                <AppShellNotificationPanel.Item
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  read={notification.read}
                  onMarkRead={actions.markNotificationRead}
                  onDismiss={actions.dismissNotification}
                >
                  <AppShellNotificationPanel.ItemAvatar>{notification.avatar}</AppShellNotificationPanel.ItemAvatar>
                  <AppShellNotificationPanel.ItemTitle>{notification.title}</AppShellNotificationPanel.ItemTitle>
                  <AppShellNotificationPanel.ItemMessage>{notification.message}</AppShellNotificationPanel.ItemMessage>
                  <AppShellNotificationPanel.ItemTimestamp>{formatRelativeTime(notification.timestamp)}</AppShellNotificationPanel.ItemTimestamp>
                  {notification.actionLabel && (
                    <AppShellNotificationPanel.ItemAction>{notification.actionLabel}</AppShellNotificationPanel.ItemAction>
                  )}
                </AppShellNotificationPanel.Item>
              ))}
            </AppShellNotificationPanel.List>
          )}
        </AppShellNotificationPanel>
      </Layout>
    );
  },
};

/**
 * App Shell demonstrating the confirmation dialog.
 * Click "Log out" in the user menu to see the dialog.
 */
export const WithConfirmDialog: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    showFooter: true,
  },
  render: (args) => {
    const { state, actions } = useAppShellState();
    const [dialogOpen, setDialogOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDialogOpen(false);
        console.log('Action confirmed');
      }, 1500);
    };

    return (
      <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
        <Layout.Navbar>
          <AppShellHeader minimal>
            <AppShellHeader.Toggle
              collapsed={state.sidebarCollapsed}
              onToggle={actions.toggleSidebar}
            />
            <AppShellHeader.Brand>
              <AppShellHeader.BrandLogo><Logo /></AppShellHeader.BrandLogo>
              <AppShellHeader.BrandTitle>Oxygen UI</AppShellHeader.BrandTitle>
            </AppShellHeader.Brand>
            <AppShellHeader.Spacer />
            <AppShellHeader.Actions>
              <ColorSchemeToggle />
              <AppShellUserMenu user={mockUser} onLogout={() => setDialogOpen(true)} />
            </AppShellHeader.Actions>
          </AppShellHeader>
        </Layout.Navbar>

        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          <Layout.Sidebar>
            <AppShellSidebar
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
            >
              <AppShellSidebar.Nav>
                <AppShellSidebar.Category>
                  <AppShellSidebar.Item id="dashboard">
                    <AppShellSidebar.ItemIcon><Home size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Dashboard</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="settings">
                    <AppShellSidebar.ItemIcon><Settings size={20} /></AppShellSidebar.ItemIcon>
                    <AppShellSidebar.ItemLabel>Settings</AppShellSidebar.ItemLabel>
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>
              </AppShellSidebar.Nav>
            </AppShellSidebar>
          </Layout.Sidebar>

          <Layout.Content sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Confirmation Dialog Example
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 3 }}>
                This story demonstrates the confirmation dialog pattern. The dialog
                is shown by default. Click "Confirm Delete" to see the loading state.
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => setDialogOpen(true)}
              >
                Open Delete Dialog
              </Button>
            </Box>
          </Layout.Content>
        </Layout>

        <AppShellConfirmDialog
          open={dialogOpen}
          title="Delete Project"
          message="This will permanently delete the project and all associated data. This action cannot be undone."
          confirmLabel="Delete Project"
          destructive
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setDialogOpen(false)}
        />
      </Layout>
    );
  },
};
