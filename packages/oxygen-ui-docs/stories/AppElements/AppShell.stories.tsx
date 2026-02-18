/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
  AppShell,
  ColorSchemeToggle,
  IconButton,
  Tooltip,
  Badge,
  Divider,
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
  formatRelativeTime,
  useAppShell,
  useNotifications,
  type NotificationItem,
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
  UserRoundIcon,
  CreditCard,
  LogOut,
} from '@wso2/oxygen-ui-icons-react';

// =============================================================================
// TYPES
// =============================================================================

interface Organization {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'info',
    title: 'New feature available',
    message: 'Check out the new analytics dashboard with real-time insights.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    avatar: 'A',
    actionLabel: 'View',
  },
  {
    id: '2',
    type: 'success',
    title: 'Deployment successful',
    message: 'Your application has been deployed to production.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Storage limit approaching',
    message: 'You have used 85% of your storage quota. Consider upgrading your plan.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    actionLabel: 'Upgrade',
  },
  {
    id: '4',
    type: 'error',
    title: 'Build failed',
    message: 'The latest build for project "api-service" failed. Check the logs for details.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: true,
    actionLabel: 'View Logs',
  },
  {
    id: '5',
    type: 'info',
    title: 'Team member joined',
    message: 'Sarah Johnson has joined your organization.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    avatar: 'SJ',
  },
  {
    id: '6',
    type: 'info',
    title: 'Scheduled maintenance',
    message: 'Planned maintenance on December 20th from 2:00 AM - 4:00 AM UTC.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
  },
];

const mockOrganizations: Organization[] = [
  { id: 'org-1', name: 'Acme Corporation', avatar: 'AC', description: 'Primary organization' },
  { id: 'org-2', name: 'Beta Industries', avatar: 'BI', description: 'Partner organization' },
  { id: 'org-3', name: 'Gamma Labs', avatar: 'GL', description: 'Research division' },
];

const mockProjects: Project[] = [
  { id: 'proj-1', name: 'Main Platform', description: 'Production application', color: '#1976d2' },
  { id: 'proj-2', name: 'Mobile App', description: 'iOS and Android app', color: '#9c27b0' },
  { id: 'proj-3', name: 'API Services', description: 'Backend microservices', color: '#2e7d32' },
  { id: 'proj-4', name: 'Analytics Dashboard', description: 'Internal analytics', color: '#ed6c02' },
];

const mockUser: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'JD',
  role: 'Pro',
};

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
 * Notification button that consumes AppShell context.
 */
const NotificationButton: React.FC<{ count: number }> = ({ count }) => {
  const { actions } = useAppShell();
  
  return (
    <Tooltip title="Notifications">
      <IconButton
        onClick={actions.toggleNotificationPanel}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        <Badge
          badgeContent={count}
          color="error"
          max={99}
          invisible={count === 0}
        >
          <Bell size={20} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

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
  title: 'App Elements/App Shell',
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
    // Notification state (separate concern)
    const {
      notifications,
      actions: notifActions,
      unreadCount,
      unreadNotifications,
    } = useNotifications({
      initialNotifications: [...mockNotifications],
    });

    // App-specific state managed locally
    const [selectedOrg, setOrganization] = React.useState<Organization>(mockOrganizations[0]);
    const [selectedProject, setProject] = React.useState<Project>(mockProjects[0]);
    const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

    const [tabIndex, setTabIndex] = React.useState(0);
    const alertNotifications = notifications.filter(
      (n) => n.type === 'warning' || n.type === 'error'
    );

    const getFilteredNotifications = () => {
      switch (tabIndex) {
        case 1:
          return unreadNotifications;
        case 2:
          return alertNotifications;
        default:
          return notifications;
      }
    };

    return (
      <AppShell
        initialCollapsed={args.sidebarCollapsed}
        collapseOnSelectOnMobile={true}
        collapseOnMobile={false}
      >
        {/* Notification Banner */}
        {args.showNotificationBanner && (
          <NotificationBanner
            severity={args.bannerSeverity}
            message={args.bannerMessage}
            actionLabel="Learn More"
            onAction={() => console.log('Banner action clicked')}
          />
        )}

        <AppShell.Navbar>
          <Header minimal={args.minimal}>
            <Header.Toggle />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Oxygen UI</Header.BrandTitle>
            </Header.Brand>
            <Header.Switchers>
              <ComplexSelect
                value={selectedOrg.id}
                onChange={(e) => {
                  const org = mockOrganizations.find((o) => o.id === e.target.value);
                  if (org) setOrganization(org);
                }}
                size="small"
                sx={{ minWidth: 180 }}
                renderValue={() => (
                  <>
                    <ComplexSelect.MenuItem.Avatar>
                      {selectedOrg.avatar}
                    </ComplexSelect.MenuItem.Avatar>
                    <ComplexSelect.MenuItem.Text primary={selectedOrg.name} />
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
              <ComplexSelect
                value={selectedProject.id}
                onChange={(e) => {
                  const project = mockProjects.find((p) => p.id === e.target.value);
                  if (project) setProject(project);
                }}
                size="small"
                sx={{ minWidth: 160 }}
                renderValue={() => (
                  <ComplexSelect.MenuItem.Text primary={selectedProject.name} />
                )}
              >
                <ComplexSelect.ListHeader>Projects</ComplexSelect.ListHeader>
                {mockProjects.map((project) => (
                  <ComplexSelect.MenuItem key={project.id} value={project.id}>
                    <ComplexSelect.MenuItem.Text primary={project.name} secondary={project.description} />
                  </ComplexSelect.MenuItem>
                ))}
              </ComplexSelect>
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
              <NotificationButton count={args.notificationCount ?? unreadCount} />
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }}
              />
              <UserMenu>
                <UserMenu.Trigger name={mockUser.name} avatar={mockUser.avatar} />
                <UserMenu.Header 
                  name={mockUser.name} 
                  email={mockUser.email} 
                  avatar={mockUser.avatar} 
                  role={mockUser.role}
                />
                <UserMenu.Item
                  icon={<UserRoundIcon />}
                  label="Profile"
                  onClick={() => console.log('Profile clicked')}
                />
                <UserMenu.Item
                  icon={<Settings />}
                  label="Settings"
                  onClick={() => console.log('Settings clicked')}
                />
                <UserMenu.Item
                  icon={<CreditCard />}
                  label="Billing"
                  onClick={() => console.log('Billing clicked')}
                />
                <UserMenu.Divider />
                <UserMenu.Logout
                  icon={<LogOut />}
                  onClick={() => setConfirmDialogOpen(true)}
                />
              </UserMenu>
            </Header.Actions>
          </Header>
        </AppShell.Navbar>

        <AppShell.Sidebar>
          <Sidebar>
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
        </AppShell.Sidebar>

        <AppShell.Main>
          <SampleContent />
        </AppShell.Main>

        {args.showFooter && (
          <AppShell.Footer>
            <Footer>
              <Footer.Copyright>© {new Date().getFullYear()} WSO2 LLC. All rights reserved.</Footer.Copyright>
              <Footer.Divider />
              <Footer.Version>oxygen-ui-v1.0.0</Footer.Version>
              <Footer.Link href="#terms">Terms & Conditions</Footer.Link>
              <Footer.Link href="#privacy">Privacy Policy</Footer.Link>
            </Footer>
          </AppShell.Footer>
        )}

        <AppShell.NotificationPanel>
          <NotificationPanel>
            <NotificationPanel.Header>
              <NotificationPanel.HeaderIcon><Bell size={20} /></NotificationPanel.HeaderIcon>
              <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
              {unreadCount > 0 && <NotificationPanel.HeaderBadge>{unreadCount}</NotificationPanel.HeaderBadge>}
              <NotificationPanel.HeaderClose />
            </NotificationPanel.Header>
            <NotificationPanel.Tabs
              tabs={[
                { label: 'All', count: notifications.length },
                { label: 'Unread', count: unreadNotifications.length, color: 'primary' },
                { label: 'Alerts', count: alertNotifications.length, color: 'warning' },
              ]}
              value={tabIndex}
              onChange={setTabIndex}
            />
            {notifications.length > 0 && (
              <NotificationPanel.Actions
                hasUnread={unreadNotifications.length > 0}
                onMarkAllRead={notifActions.markAllRead}
                onClearAll={notifActions.clearAll}
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
                    type={notification.type ?? 'info'}
                    read={notification.read}
                    onMarkRead={notifActions.markRead}
                    onDismiss={notifActions.dismiss}
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
            open={confirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
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
              <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => {
                  console.log('Signed out');
                  setConfirmDialogOpen(false);
                }}
              >
                Sign Out
              </Button>
            </DialogActions>
          </Dialog>
        </AppShell.NotificationPanel>
      </AppShell>
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
  render: Playground.render,
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
    const [dialogOpen, setDialogOpen] = React.useState(false);
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
      <AppShell initialCollapsed={args.sidebarCollapsed}>
        <AppShell.Navbar>
          <Header minimal>
            <Header.Toggle />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Oxygen UI</Header.BrandTitle>
            </Header.Brand>
            <Header.Spacer />
            <Header.Actions>
              <ColorSchemeToggle />
              <UserMenu>
                <UserMenu.Trigger name={mockUser.name} avatar={mockUser.avatar} />
                <UserMenu.Header 
                  name={mockUser.name} 
                  email={mockUser.email} 
                  avatar={mockUser.avatar} 
                  role={mockUser.role}
                />
                <UserMenu.Logout onClick={() => setDialogOpen(true)} />
              </UserMenu>
            </Header.Actions>
          </Header>
        </AppShell.Navbar>

        <AppShell.Sidebar>
          <Sidebar>
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
        </AppShell.Sidebar>

        <AppShell.Main>
          <Box sx={{ p: 3 }}>
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
        </AppShell.Main>

        <AppShell.NotificationPanel>
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
        </AppShell.NotificationPanel>
      </AppShell>
    );
  },
};

/**
 * App Shell with mobile-responsive sidebar behavior.
 * Demonstrates auto-collapse features for mobile devices.
 * 
 * Features:
 * - collapseOnSelectOnMobile: Sidebar automatically collapses after selecting a menu item on mobile
 * - collapseOnMobile: Sidebar starts collapsed on page load when in mobile view
 * 
 * Resize your browser window to mobile size (<900px) to see the behavior.
 */
export const MobileResponsive: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    showFooter: true,
  },
  render: (args) => {
    // MobileInfo component that uses context to display state
    const MobileInfo: React.FC = () => {
      const { state } = useAppShell();
      
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Mobile-Responsive Sidebar
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            This example demonstrates mobile-responsive sidebar behavior. 
            Resize your browser to mobile width (&lt;900px) to see:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', mb: 3 }}>
            <li>Sidebar starts collapsed on page load (collapseOnMobile: true)</li>
            <li>Sidebar auto-collapses after selecting a menu item (collapseOnSelectOnMobile: true)</li>
            <li>On desktop, sidebar remains open by default</li>
          </Box>
          <Typography sx={{ color: 'text.secondary' }}>
            Current sidebar state: <strong>{state.sidebarCollapsed ? 'Collapsed' : 'Expanded'}</strong>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Active menu item: <strong>{state.activeMenuItem}</strong>
          </Typography>
        </Box>
      );
    };

    return (
      <AppShell
        initialCollapsed={false}
        collapseOnSelectOnMobile={true}
        collapseOnMobile={true}
      >
        <AppShell.Navbar>
          <Header>
            <Header.Toggle />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Mobile Demo</Header.BrandTitle>
            </Header.Brand>
            <Header.Spacer />
            <Header.Actions>
              <ColorSchemeToggle />
            </Header.Actions>
          </Header>
        </AppShell.Navbar>

        <AppShell.Sidebar>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Category>
                <Sidebar.CategoryLabel>Navigation</Sidebar.CategoryLabel>
                <Sidebar.Item id="dashboard">
                  <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Dashboard</Sidebar.ItemLabel>
                </Sidebar.Item>
                <Sidebar.Item id="analytics">
                  <Sidebar.ItemIcon><BarChart3 size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Analytics</Sidebar.ItemLabel>
                </Sidebar.Item>
                <Sidebar.Item id="users">
                  <Sidebar.ItemIcon><Users size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Users</Sidebar.ItemLabel>
                </Sidebar.Item>
                <Sidebar.Item id="settings">
                  <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
                </Sidebar.Item>
              </Sidebar.Category>
            </Sidebar.Nav>
          </Sidebar>
        </AppShell.Sidebar>

        <AppShell.Main>
          <MobileInfo />
        </AppShell.Main>

        {args.showFooter && (
          <AppShell.Footer>
            <Footer>
              <Footer.Copyright>© 2026 WSO2 LLC</Footer.Copyright>
              <Footer.Divider />
              <Footer.Link href="#privacy">Privacy</Footer.Link>
              <Footer.Link href="#terms">Terms</Footer.Link>
            </Footer>
          </AppShell.Footer>
        )}
      </AppShell>
    );
  },
};

/**
 * App Shell with custom sidebar width configuration.
 * Demonstrates how to customize the expanded and collapsed sidebar widths.
 * 
 * Features:
 * - sidebarWidth: Custom width when sidebar is expanded (default: 250px)
 * - sidebarCollapsedWidth: Custom width when sidebar is collapsed (default: 64px)
 * 
 * This example uses 300px expanded width and 80px collapsed width.
 */
export const CustomSidebarWidth: Story = {
  args: {
    sidebarCollapsed: false,
    showNotificationBanner: false,
    showFooter: true,
  },
  render: (args) => {
    // WidthInfo component that uses context and actions
    const WidthInfo: React.FC = () => {
      const { state, actions } = useAppShell();
      
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Custom Sidebar Width
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            This example demonstrates custom sidebar width configuration.
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', mb: 3 }}>
            <li>Expanded width: 300px (default is 250px)</li>
            <li>Collapsed width: 80px (default is 64px)</li>
          </Box>
          <Typography sx={{ color: 'text.secondary' }}>
            Current width: <strong>{state.sidebarCollapsed ? `${state.sidebarCollapsedWidth}px` : `${state.sidebarWidth}px`}</strong>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Sidebar state: <strong>{state.sidebarCollapsed ? 'Collapsed' : 'Expanded'}</strong>
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={actions.toggleSidebar}>
              Toggle Sidebar
            </Button>
          </Box>
        </Box>
      );
    };

    return (
      <AppShell
        initialCollapsed={false}
        sidebarWidth={300}
        sidebarCollapsedWidth={80}
      >
        <AppShell.Navbar>
          <Header>
            <Header.Toggle />
            <Header.Brand>
              <Header.BrandLogo><Logo /></Header.BrandLogo>
              <Header.BrandTitle>Custom Width Demo</Header.BrandTitle>
            </Header.Brand>
            <Header.Spacer />
            <Header.Actions>
              <ColorSchemeToggle />
            </Header.Actions>
          </Header>
        </AppShell.Navbar>

        <AppShell.Sidebar>
          <Sidebar>
            <Sidebar.Nav>
              <Sidebar.Category>
                <Sidebar.CategoryLabel>Navigation</Sidebar.CategoryLabel>
                <Sidebar.Item id="dashboard">
                  <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Dashboard</Sidebar.ItemLabel>
                </Sidebar.Item>
                <Sidebar.Item id="analytics">
                  <Sidebar.ItemIcon><BarChart3 size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Analytics</Sidebar.ItemLabel>
                </Sidebar.Item>
                <Sidebar.Item id="users">
                  <Sidebar.ItemIcon><Users size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Users</Sidebar.ItemLabel>
                </Sidebar.Item>
                <Sidebar.Item id="settings">
                  <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
                </Sidebar.Item>
              </Sidebar.Category>
            </Sidebar.Nav>
          </Sidebar>
        </AppShell.Sidebar>

        <AppShell.Main>
          <WidthInfo />
        </AppShell.Main>

        {args.showFooter && (
          <AppShell.Footer>
            <Footer>
              <Footer.Copyright>© 2026 WSO2 LLC</Footer.Copyright>
              <Footer.Divider />
              <Footer.Link href="#privacy">Privacy</Footer.Link>
              <Footer.Link href="#terms">Terms</Footer.Link>
            </Footer>
          </AppShell.Footer>
        )}
      </AppShell>
    );
  },
};
