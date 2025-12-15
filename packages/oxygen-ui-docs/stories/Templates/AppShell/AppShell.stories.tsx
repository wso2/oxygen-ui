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
 * using **compound components** for maximum flexibility and composability.
 *
 * ## Overview
 * This template provides a comprehensive reference implementation for building
 * enterprise application layouts using Oxygen UI components. It demonstrates:
 *
 * - **Compound Component Pattern**: Compose complex UIs from simple, focused parts
 * - **Layout Structure**: Using the Layout component for flexible composition
 * - **Navigation**: Collapsible sidebar with hierarchical menus
 * - **Header**: Top bar with logo, switchers, and user actions
 * - **Notifications**: Banner alerts and notification panel
 * - **Footer**: Copyright and legal links
 *
 * ## Compound Component Pattern
 *
 * Instead of monolithic components with many props, this template uses
 * compound components (like MUI's Tabs + Tab) where a parent provides context
 * and children compose the UI:
 *
 * ```tsx
 * // OLD API (monolithic, 21+ props)
 * <AppShellHeader
 *   logo={...} title={...} organizations={...}
 *   selectedOrg={...} onOrgChange={...} ... 20 more props
 * />
 *
 * // NEW API (composable, focused)
 * <AppShellHeader>
 *   <AppShellHeader.Toggle collapsed={collapsed} onToggle={toggle} />
 *   <AppShellHeader.Brand logo={<Logo />} title="Dashboard" />
 *   <AppShellHeader.Switchers>
 *     <OrgSwitcher ... />
 *   </AppShellHeader.Switchers>
 *   <AppShellHeader.Spacer />
 *   <AppShellHeader.Actions>
 *     <ColorSchemeToggle />
 *     <UserMenu ... />
 *   </AppShellHeader.Actions>
 * </AppShellHeader>
 * ```
 *
 * ## Benefits
 *
 * 1. **Design System Ready** - Each sub-component can be promoted independently
 * 2. **Testable** - Small components are easier to unit test
 * 3. **Flexible** - Users can compose their own layouts
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
A comprehensive App Shell template using **compound components** for maximum flexibility.

This template shows how to compose Oxygen UI components to create a complete
application shell with:
- Collapsible navigation sidebar (compound component)
- Header with logo, context switchers, and user menu (compound component)
- Notification system with panel (compound component)
- Footer with legal links

**Compound Components:**
\`\`\`tsx
<AppShellHeader>
  <AppShellHeader.Toggle ... />
  <AppShellHeader.Brand ... />
  <AppShellHeader.Switchers>...</AppShellHeader.Switchers>
  <AppShellHeader.Actions>...</AppShellHeader.Actions>
</AppShellHeader>

<AppShellSidebar>
  <AppShellSidebar.Nav>
    <AppShellSidebar.Category label="Main">
      <AppShellSidebar.Item ... />
    </AppShellSidebar.Category>
  </AppShellSidebar.Nav>
  <AppShellSidebar.User ... />
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
            <AppShellHeader.Brand logo={<Logo />} title="Oxygen UI" />
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
                  <AppShellSidebar.Item id="dashboard" label="Dashboard" icon={Home} />
                  <AppShellSidebar.Item id="analytics" label="Analytics" icon={BarChart3}>
                    <AppShellSidebar.Item id="analytics-overview" label="Overview" icon={PieChart} />
                    <AppShellSidebar.Item id="analytics-reports" label="Reports" icon={FileText} />
                    <AppShellSidebar.Item id="analytics-realtime" label="Real-time" icon={Activity} />
                    <AppShellSidebar.Item id="analytics-trends" label="Trends" icon={TrendingUp} />
                  </AppShellSidebar.Item>
                </AppShellSidebar.Category>

                {/* Management */}
                <AppShellSidebar.Category label="Management">
                  <AppShellSidebar.Item id="users" label="Users" icon={Users} badge={3}>
                    <AppShellSidebar.Item id="users-list" label="All Users" icon={Users} />
                    <AppShellSidebar.Item id="users-roles" label="Roles" icon={UserCog} />
                    <AppShellSidebar.Item id="users-permissions" label="Permissions" icon={Lock} />
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="projects" label="Projects" icon={FolderOpen} />
                  <AppShellSidebar.Item id="integrations" label="Integrations" icon={Layers} />
                </AppShellSidebar.Category>

                {/* Infrastructure */}
                <AppShellSidebar.Category label="Infrastructure">
                  <AppShellSidebar.Item id="security" label="Security" icon={Shield}>
                    <AppShellSidebar.Item id="security-overview" label="Overview" icon={Shield} />
                    <AppShellSidebar.Item id="security-api-keys" label="API Keys" icon={Key} />
                  </AppShellSidebar.Item>
                  <AppShellSidebar.Item id="databases" label="Databases" icon={Database} />
                  <AppShellSidebar.Item id="domains" label="Domains" icon={Globe} />
                </AppShellSidebar.Category>
              </AppShellSidebar.Nav>

              {/* Settings Footer */}
              <AppShellSidebar.Footer>
                <AppShellSidebar.Category>
                  <AppShellSidebar.Item id="settings" label="Settings" icon={Settings} />
                  <AppShellSidebar.Item id="notifications-settings" label="Notifications" icon={Bell} />
                  <AppShellSidebar.Item id="help" label="Help & Support" icon={HelpCircle} />
                </AppShellSidebar.Category>
              </AppShellSidebar.Footer>

              {/* User Section */}
              <AppShellSidebar.User
                name={mockUser.name}
                email={mockUser.email}
                avatar={mockUser.avatar}
                onClick={() => console.log('User menu clicked')}
              />
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
          <AppShellNotificationPanel.Header unreadCount={unreadCount} />
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
                  title={notification.title}
                  message={notification.message}
                  timestamp={formatRelativeTime(notification.timestamp)}
                  read={notification.read}
                  avatar={notification.avatar}
                  actionLabel={notification.actionLabel}
                  onAction={notification.onAction}
                  onMarkRead={actions.markNotificationRead}
                  onDismiss={actions.dismissNotification}
                />
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
            <AppShellHeader.Brand logo={<Logo />} title="Oxygen UI" />
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
                  <AppShellSidebar.Item id="dashboard" label="Dashboard" icon={Home} />
                  <AppShellSidebar.Item id="analytics" label="Analytics" icon={BarChart3} />
                </AppShellSidebar.Category>
              </AppShellSidebar.Nav>
              <AppShellSidebar.User
                name={mockUser.name}
                email={mockUser.email}
                onClick={() => {}}
              />
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
          <AppShellNotificationPanel.Header unreadCount={unreadCount} />
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
                  title={notification.title}
                  message={notification.message}
                  timestamp={formatRelativeTime(notification.timestamp)}
                  read={notification.read}
                  avatar={notification.avatar}
                  actionLabel={notification.actionLabel}
                  onMarkRead={actions.markNotificationRead}
                  onDismiss={actions.dismissNotification}
                />
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
            <AppShellHeader.Brand logo={<Logo />} title="Oxygen UI" />
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
                  <AppShellSidebar.Item id="dashboard" label="Dashboard" icon={Home} />
                  <AppShellSidebar.Item id="settings" label="Settings" icon={Settings} />
                </AppShellSidebar.Category>
              </AppShellSidebar.Nav>
              <AppShellSidebar.User
                name={mockUser.name}
                email={mockUser.email}
                onClick={() => {}}
              />
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
