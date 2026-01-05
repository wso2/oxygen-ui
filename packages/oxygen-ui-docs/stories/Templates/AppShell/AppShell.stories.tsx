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
  Header,
  Sidebar,
  NotificationPanel,
  UserMenu,
  NotificationBanner,
  Footer,
  ComplexSelect,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@wso2/oxygen-ui';
import {
  // Types (story-specific)
  type Organization,
  type Project,
  // Mock data
  mockNotifications,
  mockOrganizations,
  mockProjects,
  mockUser,
  // Hooks
  useAppShellState,
  // Utilities
  formatRelativeTime,
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
 * <Header>
 *   <Header.Toggle collapsed={collapsed} onToggle={toggle} />
 *   <Header.Brand>
 *     <Header.BrandLogo><Logo /></Header.BrandLogo>
 *     <Header.BrandTitle>Dashboard</Header.BrandTitle>
 *   </Header.Brand>
 *   <Header.Spacer />
 *   <Header.Actions>...</Header.Actions>
 * </Header>
 *
 * // Sidebar with deeply composable items
 * <Sidebar.Item id="users">
 *   <Sidebar.ItemIcon><Users size={20} /></Sidebar.ItemIcon>
 *   <Sidebar.ItemLabel>Users</Sidebar.ItemLabel>
 *   <Sidebar.ItemBadge>3</Sidebar.ItemBadge>
 * </Sidebar.Item>
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
<Header>
  <Header.Toggle collapsed={collapsed} onToggle={toggle} />
  <Header.Brand>
    <Header.BrandLogo><Logo /></Header.BrandLogo>
    <Header.BrandTitle>Dashboard</Header.BrandTitle>
  </Header.Brand>
  <Header.Spacer />
  <Header.Actions>...</Header.Actions>
</Header>

<Sidebar collapsed={collapsed} activeItem={activeId} ...>
  <Sidebar.Nav>
    <Sidebar.Category>
      <Sidebar.CategoryLabel>Main</Sidebar.CategoryLabel>
      <Sidebar.Item id="home">
        <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
        <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
      </Sidebar.Item>
    </Sidebar.Category>
  </Sidebar.Nav>
</Sidebar>
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
          <NotificationBanner
            severity={args.bannerSeverity}
            message={args.bannerMessage}
            actionLabel="Learn More"
            onAction={() => console.log('Banner action clicked')}
          />
        )}

        {/* Header - Using Compound Component Pattern */}
        <Layout.Navbar>
          <Header minimal={args.minimal}>
            <Header.Toggle
              collapsed={state.sidebarCollapsed}
              onToggle={actions.toggleSidebar}
            />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Oxygen UI</Header.BrandTitle>
            </Header.Brand>
            <Header.Switchers>
              {state.selectedOrg && (
                <ComplexSelect
                  value={state.selectedOrg.id}
                  onChange={(e) => {
                    const org = mockOrganizations.find((o) => o.id === e.target.value);
                    if (org) actions.setOrganization(org);
                  }}
                  size="small"
                  sx={{ minWidth: 180 }}
                  renderValue={() => (
                    <>
                      <ComplexSelect.MenuItem.Avatar>
                        {state.selectedOrg?.avatar}
                      </ComplexSelect.MenuItem.Avatar>
                      <ComplexSelect.MenuItem.Text primary={state.selectedOrg?.name} />
                    </>
                  )}
                >
                  <ComplexSelect.ListHeader>Organizations</ComplexSelect.ListHeader>
                  {mockOrganizations.map((org) => (
                    <ComplexSelect.MenuItem key={org.id} value={org.id}>
                      <ComplexSelect.MenuItem.Avatar>{org.avatar}</ComplexSelect.MenuItem.Avatar>
                      <ComplexSelect.MenuItem.Text primary={org.name} secondary={org.description} />
                    </ComplexSelect.MenuItem>
                  ))}
                </ComplexSelect>
              )}
              {state.selectedProject && (
                <ComplexSelect
                  value={state.selectedProject.id}
                  onChange={(e) => {
                    const project = mockProjects.find((p) => p.id === e.target.value);
                    if (project) actions.setProject(project);
                  }}
                  size="small"
                  sx={{ minWidth: 160 }}
                  renderValue={() => (
                    <ComplexSelect.MenuItem.Text primary={state.selectedProject?.name} />
                  )}
                >
                  <ComplexSelect.ListHeader>Projects</ComplexSelect.ListHeader>
                  {mockProjects.map((project) => (
                    <ComplexSelect.MenuItem key={project.id} value={project.id}>
                      <ComplexSelect.MenuItem.Text primary={project.name} secondary={project.description} />
                    </ComplexSelect.MenuItem>
                  ))}
                </ComplexSelect>
              )}
            </Header.Switchers>
            <Header.Spacer />
            <Header.Actions>
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
              <UserMenu
                user={mockUser}
                onProfileClick={() => console.log('Profile clicked')}
                onSettingsClick={() => console.log('Settings clicked')}
                onBillingClick={() => console.log('Billing clicked')}
                onLogout={actions.openConfirmDialog}
              />
            </Header.Actions>
          </Header>
        </Layout.Navbar>

        {/* Main Content Area */}
        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          {/* Sidebar - Using Compound Component Pattern */}
          <Layout.Sidebar>
            <Sidebar
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
            >
              <Sidebar.Nav>
                {/* Main Navigation */}
                <Sidebar.Category>
                  <Sidebar.Item id="dashboard">
                    <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Dashboard</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="analytics">
                    <Sidebar.ItemIcon><BarChart3 size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Analytics</Sidebar.ItemLabel>
                    <Sidebar.Item id="analytics-overview">
                      <Sidebar.ItemIcon><PieChart size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Overview</Sidebar.ItemLabel>
                    </Sidebar.Item>
                    <Sidebar.Item id="analytics-reports">
                      <Sidebar.ItemIcon><FileText size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Reports</Sidebar.ItemLabel>
                    </Sidebar.Item>
                    <Sidebar.Item id="analytics-realtime">
                      <Sidebar.ItemIcon><Activity size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Real-time</Sidebar.ItemLabel>
                    </Sidebar.Item>
                    <Sidebar.Item id="analytics-trends">
                      <Sidebar.ItemIcon><TrendingUp size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Trends</Sidebar.ItemLabel>
                    </Sidebar.Item>
                  </Sidebar.Item>
                </Sidebar.Category>

                {/* Management */}
                <Sidebar.Category>
                  <Sidebar.CategoryLabel>Management</Sidebar.CategoryLabel>
                  <Sidebar.Item id="users">
                    <Sidebar.ItemIcon><Users size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Users</Sidebar.ItemLabel>
                    <Sidebar.ItemBadge>3</Sidebar.ItemBadge>
                    <Sidebar.Item id="users-list">
                      <Sidebar.ItemIcon><Users size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>All Users</Sidebar.ItemLabel>
                    </Sidebar.Item>
                    <Sidebar.Item id="users-roles">
                      <Sidebar.ItemIcon><UserCog size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Roles</Sidebar.ItemLabel>
                    </Sidebar.Item>
                    <Sidebar.Item id="users-permissions">
                      <Sidebar.ItemIcon><Lock size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Permissions</Sidebar.ItemLabel>
                    </Sidebar.Item>
                  </Sidebar.Item>
                  <Sidebar.Item id="projects">
                    <Sidebar.ItemIcon><FolderOpen size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Projects</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="integrations">
                    <Sidebar.ItemIcon><Layers size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Integrations</Sidebar.ItemLabel>
                  </Sidebar.Item>
                </Sidebar.Category>

                {/* Infrastructure */}
                <Sidebar.Category>
                  <Sidebar.CategoryLabel>Infrastructure</Sidebar.CategoryLabel>
                  <Sidebar.Item id="security">
                    <Sidebar.ItemIcon><Shield size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Security</Sidebar.ItemLabel>
                    <Sidebar.Item id="security-overview">
                      <Sidebar.ItemIcon><Shield size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>Overview</Sidebar.ItemLabel>
                    </Sidebar.Item>
                    <Sidebar.Item id="security-api-keys">
                      <Sidebar.ItemIcon><Key size={20} /></Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>API Keys</Sidebar.ItemLabel>
                    </Sidebar.Item>
                  </Sidebar.Item>
                  <Sidebar.Item id="databases">
                    <Sidebar.ItemIcon><Database size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Databases</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="domains">
                    <Sidebar.ItemIcon><Globe size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Domains</Sidebar.ItemLabel>
                  </Sidebar.Item>
                </Sidebar.Category>
              </Sidebar.Nav>

              {/* Settings Footer */}
              <Sidebar.Footer>
                <Sidebar.Category>
                  <Sidebar.Item id="settings">
                    <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="notifications-settings">
                    <Sidebar.ItemIcon><Bell size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Notifications</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="help">
                    <Sidebar.ItemIcon><HelpCircle size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Help & Support</Sidebar.ItemLabel>
                  </Sidebar.Item>
                </Sidebar.Category>
              </Sidebar.Footer>
            </Sidebar>
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
              <Footer
                companyName="Oxygen UI"
                version="v1.0.0"
                termsUrl="#terms"
                privacyUrl="#privacy"
              />
            )}
          </Layout.Content>
        </Layout>

        {/* Notification Panel - Using Compound Component Pattern */}
        <NotificationPanel
          open={state.notificationPanelOpen}
          onClose={actions.toggleNotificationPanel}
        >
          <NotificationPanel.Header>
            <NotificationPanel.HeaderIcon><Bell size={20} /></NotificationPanel.HeaderIcon>
            <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
            {unreadCount > 0 && <NotificationPanel.HeaderBadge>{unreadCount}</NotificationPanel.HeaderBadge>}
            <NotificationPanel.HeaderClose />
          </NotificationPanel.Header>
          <NotificationPanel.Tabs
            tabs={[
              { label: 'All', count: state.notifications.length },
              { label: 'Unread', count: unreadNotifications.length, color: 'primary' },
              { label: 'Alerts', count: alertNotifications.length, color: 'warning' },
            ]}
            value={tabIndex}
            onChange={setTabIndex}
          />
          {state.notifications.length > 0 && (
            <NotificationPanel.Actions
              hasUnread={unreadNotifications.length > 0}
              onMarkAllRead={actions.markAllNotificationsRead}
              onClearAll={actions.clearAllNotifications}
            />
          )}
          {getFilteredNotifications().length === 0 ? (
            <NotificationPanel.EmptyState
              message={
                tabIndex === 0
                  ? 'No notifications'
                  : tabIndex === 1
                  ? 'No unread notifications'
                  : 'No alerts'
              }
            />
          ) : (
            <NotificationPanel.List>
              {getFilteredNotifications().map((notification) => (
                <NotificationPanel.Item
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  read={notification.read}
                  onAction={notification.onAction}
                  onMarkRead={actions.markNotificationRead}
                  onDismiss={actions.dismissNotification}
                >
                  <NotificationPanel.ItemAvatar>{notification.avatar}</NotificationPanel.ItemAvatar>
                  <NotificationPanel.ItemTitle>{notification.title}</NotificationPanel.ItemTitle>
                  <NotificationPanel.ItemMessage>{notification.message}</NotificationPanel.ItemMessage>
                  <NotificationPanel.ItemTimestamp>{formatRelativeTime(notification.timestamp)}</NotificationPanel.ItemTimestamp>
                  {notification.actionLabel && (
                    <NotificationPanel.ItemAction>{notification.actionLabel}</NotificationPanel.ItemAction>
                  )}
                </NotificationPanel.Item>
              ))}
            </NotificationPanel.List>
          )}
        </NotificationPanel>

        {/* Confirm Dialog */}
        <Dialog
          open={state.confirmDialogOpen}
          onClose={actions.closeConfirmDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Sign Out</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to sign out of your account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={actions.closeConfirmDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log('Signed out');
                actions.closeConfirmDialog();
              }}
            >
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
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
          <Header>
            <Header.Toggle
              collapsed={state.sidebarCollapsed}
              onToggle={actions.toggleSidebar}
            />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Oxygen UI</Header.BrandTitle>
            </Header.Brand>
            <Header.Spacer />
            <Header.Actions>
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
              <UserMenu user={mockUser} onLogout={actions.openConfirmDialog} />
            </Header.Actions>
          </Header>
        </Layout.Navbar>

        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          <Layout.Sidebar>
            <Sidebar
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
            >
              <Sidebar.Nav>
                <Sidebar.Category>
                  <Sidebar.Item id="dashboard">
                    <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Dashboard</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="analytics">
                    <Sidebar.ItemIcon><BarChart3 size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Analytics</Sidebar.ItemLabel>
                  </Sidebar.Item>
                </Sidebar.Category>
              </Sidebar.Nav>
            </Sidebar>
          </Layout.Sidebar>

          <Layout.Content sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <SampleContent />
            </Box>
            {args.showFooter && (
              <Footer companyName="Oxygen UI" version="v1.0.0" />
            )}
          </Layout.Content>
        </Layout>

        <NotificationPanel
          open={state.notificationPanelOpen}
          onClose={actions.toggleNotificationPanel}
        >
          <NotificationPanel.Header>
            <NotificationPanel.HeaderIcon><Bell size={20} /></NotificationPanel.HeaderIcon>
            <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
            {unreadCount > 0 && <NotificationPanel.HeaderBadge>{unreadCount}</NotificationPanel.HeaderBadge>}
            <NotificationPanel.HeaderClose />
          </NotificationPanel.Header>
          <NotificationPanel.Tabs
            tabs={[
              { label: 'All', count: state.notifications.length },
              { label: 'Unread', count: unreadNotifications.length, color: 'primary' },
              { label: 'Alerts', count: alertNotifications.length, color: 'warning' },
            ]}
            value={tabIndex}
            onChange={setTabIndex}
          />
          {state.notifications.length > 0 && (
            <NotificationPanel.Actions
              hasUnread={unreadNotifications.length > 0}
              onMarkAllRead={actions.markAllNotificationsRead}
              onClearAll={actions.clearAllNotifications}
            />
          )}
          {getFilteredNotifications().length === 0 ? (
            <NotificationPanel.EmptyState />
          ) : (
            <NotificationPanel.List>
              {getFilteredNotifications().map((notification) => (
                <NotificationPanel.Item
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  read={notification.read}
                  onMarkRead={actions.markNotificationRead}
                  onDismiss={actions.dismissNotification}
                >
                  <NotificationPanel.ItemAvatar>{notification.avatar}</NotificationPanel.ItemAvatar>
                  <NotificationPanel.ItemTitle>{notification.title}</NotificationPanel.ItemTitle>
                  <NotificationPanel.ItemMessage>{notification.message}</NotificationPanel.ItemMessage>
                  <NotificationPanel.ItemTimestamp>{formatRelativeTime(notification.timestamp)}</NotificationPanel.ItemTimestamp>
                  {notification.actionLabel && (
                    <NotificationPanel.ItemAction>{notification.actionLabel}</NotificationPanel.ItemAction>
                  )}
                </NotificationPanel.Item>
              ))}
            </NotificationPanel.List>
          )}
        </NotificationPanel>
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
          <Header minimal>
            <Header.Toggle
              collapsed={state.sidebarCollapsed}
              onToggle={actions.toggleSidebar}
            />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Oxygen UI</Header.BrandTitle>
            </Header.Brand>
            <Header.Spacer />
            <Header.Actions>
              <ColorSchemeToggle />
              <UserMenu user={mockUser} onLogout={() => setDialogOpen(true)} />
            </Header.Actions>
          </Header>
        </Layout.Navbar>

        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          <Layout.Sidebar>
            <Sidebar
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
            >
              <Sidebar.Nav>
                <Sidebar.Category>
                  <Sidebar.Item id="dashboard">
                    <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Dashboard</Sidebar.ItemLabel>
                  </Sidebar.Item>
                  <Sidebar.Item id="settings">
                    <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
                  </Sidebar.Item>
                </Sidebar.Category>
              </Sidebar.Nav>
            </Sidebar>
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

        <Dialog
          open={dialogOpen}
          onClose={() => !loading && setDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently delete the project and all associated data. This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete Project'}
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    );
  },
};
