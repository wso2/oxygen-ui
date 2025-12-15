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
} from '@wso2/oxygen-ui';
import { Zap } from '@wso2/oxygen-ui-icons-react';
import {
  // Types
  type NotificationItem,
  type Organization,
  type Project,
  type Environment,
  type User,
  SIDEBAR_WIDTH,
  COLLAPSED_SIDEBAR_WIDTH,
  // Mock data
  navigationCategories,
  settingsNavigation,
  mockNotifications,
  mockOrganizations,
  mockProjects,
  mockUser,
  // Components
  AppShellSidebar,
  AppShellHeader,
  AppShellNotificationBanner,
  AppShellNotificationPanel,
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
 * App Shell Context for state management demonstration.
 */
interface AppShellState {
  sidebarCollapsed: boolean;
  notificationPanelOpen: boolean;
  confirmDialogOpen: boolean;
  activeMenuItem: string;
  expandedMenus: Record<string, boolean>;
  notifications: NotificationItem[];
  selectedOrg: Organization;
  selectedProject: Project;
  environment: Environment;
}

/**
 * Custom hook for App Shell state management.
 * Demonstrates a clean pattern for managing shell state.
 */
const useAppShellState = (initialCollapsed = false) => {
  const [state, setState] = React.useState<AppShellState>({
    sidebarCollapsed: initialCollapsed,
    notificationPanelOpen: false,
    confirmDialogOpen: false,
    activeMenuItem: 'dashboard',
    expandedMenus: {},
    notifications: [...mockNotifications],
    selectedOrg: mockOrganizations[0],
    selectedProject: mockProjects[0],
    environment: 'development',
  });

  const toggleSidebar = React.useCallback(() => {
    setState((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  }, []);

  const toggleNotificationPanel = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      notificationPanelOpen: !prev.notificationPanelOpen,
    }));
  }, []);

  const setActiveMenuItem = React.useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeMenuItem: id }));
  }, []);

  const toggleMenu = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      expandedMenus: {
        ...prev.expandedMenus,
        [id]: !prev.expandedMenus[id],
      },
    }));
  }, []);

  const markNotificationRead = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  }, []);

  const dismissNotification = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const markAllNotificationsRead = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const clearAllNotifications = React.useCallback(() => {
    setState((prev) => ({ ...prev, notifications: [] }));
  }, []);

  const setOrganization = React.useCallback((org: Organization) => {
    setState((prev) => ({ ...prev, selectedOrg: org }));
  }, []);

  const setProject = React.useCallback((project: Project) => {
    setState((prev) => ({ ...prev, selectedProject: project }));
  }, []);

  const setEnvironment = React.useCallback((env: Environment) => {
    setState((prev) => ({ ...prev, environment: env }));
  }, []);

  const openConfirmDialog = React.useCallback(() => {
    setState((prev) => ({ ...prev, confirmDialogOpen: true }));
  }, []);

  const closeConfirmDialog = React.useCallback(() => {
    setState((prev) => ({ ...prev, confirmDialogOpen: false }));
  }, []);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return {
    state,
    actions: {
      toggleSidebar,
      toggleNotificationPanel,
      setActiveMenuItem,
      toggleMenu,
      markNotificationRead,
      dismissNotification,
      markAllNotificationsRead,
      clearAllNotifications,
      setOrganization,
      setProject,
      setEnvironment,
      openConfirmDialog,
      closeConfirmDialog,
    },
    unreadCount,
  };
};

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
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
  </Box>
);

/**
 * The App Shell template demonstrates a complete application layout pattern.
 *
 * ## Overview
 * This template provides a comprehensive reference implementation for building
 * enterprise application layouts using Oxygen UI components. It demonstrates:
 *
 * - **Layout Structure**: Using the Layout component for flexible composition
 * - **Navigation**: Collapsible sidebar with hierarchical menus
 * - **Header**: Top bar with logo, switchers, and user actions
 * - **Notifications**: Banner alerts and notification panel
 * - **Footer**: Copyright and legal links
 * - **Dialogs**: Confirmation patterns for user actions
 *
 * ## Key Patterns
 *
 * ### State Management
 * The example uses a custom hook (`useAppShellState`) to demonstrate clean
 * state management patterns. In a real application, you would integrate this
 * with your preferred state management solution (Redux, Zustand, Context, etc.).
 *
 * ### Styling
 * All components use the MUI `sx` prop with theme tokens for consistent styling.
 * No inline styles are used, making it easy to customize via the theme.
 *
 * ### Responsive Design
 * The layout adapts to different screen sizes:
 * - Desktop: Full sidebar with text labels
 * - Tablet: Collapsed sidebar with icons only
 * - Mobile: Drawer-based navigation (implement as needed)
 *
 * ## Usage
 * Copy the relevant components and patterns for your application:
 *
 * ```tsx
 * import { Layout } from '@wso2/oxygen-ui';
 *
 * function MyApp() {
 *   return (
 *     <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
 *       <Layout.Navbar>
 *         <Header />
 *       </Layout.Navbar>
 *       <Layout sx={{ flex: 1 }}>
 *         <Layout.Sidebar>
 *           <Sidebar />
 *         </Layout.Sidebar>
 *         <Layout.Content>
 *           <MainContent />
 *           <Footer />
 *         </Layout.Content>
 *       </Layout>
 *     </Layout>
 *   );
 * }
 * ```
 */
const meta: Meta<AppShellArgs> = {
  title: 'Templates/App Shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive App Shell template demonstrating enterprise application layout patterns.

This template shows how to compose Oxygen UI components to create a complete
application shell with:
- Collapsible navigation sidebar
- Header with logo, context switchers, and user menu
- Notification system (banner + panel)
- Footer with legal links
- Confirmation dialogs

**Note:** The switcher components (Organization, Project, Environment) are visual
demonstrations. Implement your own selection logic based on your application needs.
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
      description: 'Use minimal header (logo + user only)',
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
 * Interactive playground with all features.
 */
export const Playground: Story = {
  render: (args) => {
    const { state, actions, unreadCount } = useAppShellState(args.sidebarCollapsed);

    // Sync with storybook args
    React.useEffect(() => {
      if (args.sidebarCollapsed !== state.sidebarCollapsed) {
        actions.toggleSidebar();
      }
    }, [args.sidebarCollapsed]);

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

        {/* Header */}
        <Layout.Navbar>
          <AppShellHeader
            sidebarCollapsed={state.sidebarCollapsed}
            onToggleSidebar={actions.toggleSidebar}
            logo={<Logo />}
            title="Oxygen UI"
            organizations={mockOrganizations}
            selectedOrg={state.selectedOrg}
            onOrgChange={(org) => actions.setOrganization(org as Organization)}
            projects={mockProjects}
            selectedProject={state.selectedProject}
            onProjectChange={(proj) => actions.setProject(proj as Project)}
            environment={state.environment}
            onEnvironmentChange={actions.setEnvironment}
            notificationCount={args.notificationCount ?? unreadCount}
            onNotificationClick={actions.toggleNotificationPanel}
            onHelpClick={() => console.log('Help clicked')}
            user={mockUser}
            onProfileClick={() => console.log('Profile clicked')}
            onSettingsClick={() => console.log('Settings clicked')}
            onBillingClick={() => console.log('Billing clicked')}
            onLogout={actions.openConfirmDialog}
            minimal={args.minimal}
          />
        </Layout.Navbar>

        {/* Main Content Area */}
        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <Layout.Sidebar>
            <AppShellSidebar
              categories={navigationCategories}
              settingsCategory={settingsNavigation}
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              user={mockUser}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
              onUserMenuClick={() => console.log('User menu clicked')}
            />
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

        {/* Notification Panel */}
        <AppShellNotificationPanel
          open={state.notificationPanelOpen}
          onClose={actions.toggleNotificationPanel}
          notifications={state.notifications}
          onMarkRead={actions.markNotificationRead}
          onDismiss={actions.dismissNotification}
          onMarkAllRead={actions.markAllNotificationsRead}
          onClearAll={actions.clearAllNotifications}
        />

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
 * Minimal header showing only logo and user menu.
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
    const { state, actions, unreadCount } = useAppShellState();

    // Auto-open notification panel for this story
    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (!state.notificationPanelOpen) {
          actions.toggleNotificationPanel();
        }
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
        <Layout.Navbar>
          <AppShellHeader
            sidebarCollapsed={state.sidebarCollapsed}
            onToggleSidebar={actions.toggleSidebar}
            logo={<Logo />}
            title="Oxygen UI"
            organizations={mockOrganizations}
            selectedOrg={state.selectedOrg}
            onOrgChange={(org) => actions.setOrganization(org as Organization)}
            projects={mockProjects}
            selectedProject={state.selectedProject}
            onProjectChange={(proj) => actions.setProject(proj as Project)}
            environment={state.environment}
            onEnvironmentChange={actions.setEnvironment}
            notificationCount={unreadCount}
            onNotificationClick={actions.toggleNotificationPanel}
            onHelpClick={() => console.log('Help clicked')}
            user={mockUser}
            onLogout={actions.openConfirmDialog}
          />
        </Layout.Navbar>

        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          <Layout.Sidebar>
            <AppShellSidebar
              categories={navigationCategories}
              settingsCategory={settingsNavigation}
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              user={mockUser}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
              onUserMenuClick={() => {}}
            />
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
          notifications={state.notifications}
          onMarkRead={actions.markNotificationRead}
          onDismiss={actions.dismissNotification}
          onMarkAllRead={actions.markAllNotificationsRead}
          onClearAll={actions.clearAllNotifications}
        />
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
          <AppShellHeader
            sidebarCollapsed={state.sidebarCollapsed}
            onToggleSidebar={actions.toggleSidebar}
            logo={<Logo />}
            title="Oxygen UI"
            user={mockUser}
            onLogout={() => setDialogOpen(true)}
            minimal
          />
        </Layout.Navbar>

        <Layout sx={{ flex: 1, overflow: 'hidden' }}>
          <Layout.Sidebar>
            <AppShellSidebar
              categories={navigationCategories}
              settingsCategory={settingsNavigation}
              collapsed={state.sidebarCollapsed}
              activeItem={state.activeMenuItem}
              expandedMenus={state.expandedMenus}
              user={mockUser}
              onSelect={actions.setActiveMenuItem}
              onToggleExpand={actions.toggleMenu}
              onUserMenuClick={() => {}}
            />
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
