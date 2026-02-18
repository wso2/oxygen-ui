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
  Button,
  Stack,
  Chip,
  AppShell,
  Header,
  Sidebar,
  NotificationPanel,
  IconButton,
  Badge,
  Tooltip,
  useAppShell,
} from '@wso2/oxygen-ui';
import { Home, Settings, Users, Menu, Bell } from '@wso2/oxygen-ui-icons-react';

const meta: Meta = {
  title: 'App Elements/useAppShell',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
\`useAppShell\` is a versatile hook that works in two modes:

**1. Create Mode (with options):** Creates and manages shell state
\`\`\`tsx
const shell = useAppShell({
  initialCollapsed: false,
  collapseOnSelectOnMobile: true
});
\`\`\`

**2. Consume Mode (no options):** Consumes existing context from \`<AppShell>\`
\`\`\`tsx
const { state, actions } = useAppShell();
\`\`\`

### State Properties
- \`sidebarCollapsed\`: boolean - Current sidebar collapsed state
- \`activeMenuItem\`: string | undefined - Currently active menu item ID
- \`notificationPanelOpen\`: boolean - Notification panel open state

### Actions
- \`toggleSidebar()\`: Toggle sidebar collapsed state
- \`expandSidebar()\`: Expand the sidebar
- \`collapseSidebar()\`: Collapse the sidebar
- \`setActiveMenuItem(id: string)\`: Set active menu item
- \`toggleNotificationPanel()\`: Toggle notification panel
- \`openNotificationPanel()\`: Open notification panel
- \`closeNotificationPanel()\`: Close notification panel

### Options (Create Mode Only)
- \`initialCollapsed\`: boolean - Initial sidebar collapsed state (default: false)
- \`collapseOnSelectOnMobile\`: boolean - Auto-collapse on mobile after selection (default: false)
- \`collapseOnMobile\`: boolean - Always collapsed on mobile (default: false)
- \`sidebarWidth\`: number - Expanded sidebar width in pixels (default: 250)
- \`sidebarCollapsedWidth\`: number - Collapsed sidebar width in pixels (default: 64)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * NotificationButton component that consumes AppShell context to toggle notification panel.
 */
const NotificationButton: React.FC = () => {
  const { state, actions } = useAppShell();
  
  return (
    <Tooltip title="Notifications">
      <IconButton
        onClick={actions.toggleNotificationPanel}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        <Badge
          badgeContent={state.notificationPanelOpen ? 1 : 0}
          color="primary"
          variant="dot"
        >
          <Bell size={20} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

/**
 * StatusDisplay component that consumes AppShell context.
 */
const StatusDisplay: React.FC = () => {
  const { state } = useAppShell();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Shell State (from useAppShell)
        </Typography>
        <Stack spacing={1.5}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Sidebar Collapsed:
            </Typography>
            <Chip
              label={state.sidebarCollapsed ? 'Yes' : 'No'}
              color={state.sidebarCollapsed ? 'warning' : 'success'}
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Active Menu Item:
            </Typography>
            <Chip
              label={state.activeMenuItem || 'None'}
              color="primary"
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Notification Panel:
            </Typography>
            <Chip
              label={state.notificationPanelOpen ? 'Open' : 'Closed'}
              color={state.notificationPanelOpen ? 'success' : 'default'}
              size="small"
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * ControlPanel component that consumes AppShell context to control shell state.
 */
const ControlPanel: React.FC = () => {
  const { actions } = useAppShell();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Shell Controls (using useAppShell actions)
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Sidebar Controls:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                size="small"
                onClick={actions.toggleSidebar}
              >
                Toggle Sidebar
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={actions.expandSidebar}
              >
                Expand
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={actions.collapseSidebar}
              >
                Collapse
              </Button>
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Active Menu Item:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                size="small"
                onClick={() => actions.setActiveMenuItem('dashboard')}
              >
                Set to Dashboard
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => actions.setActiveMenuItem('users')}
              >
                Set to Users
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => actions.setActiveMenuItem('settings')}
              >
                Set to Settings
              </Button>
            </Stack>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Notification Panel:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                size="small"
                onClick={actions.toggleNotificationPanel}
              >
                Toggle Panel
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * Demonstrates consuming AppShell context using useAppShell() with no parameters.
 * This is the most common pattern when using AppShell as a provider.
 */
export const ConsumeContext: Story = {
  render: () => {
    return (
      <AppShell initialCollapsed={false}>
        <AppShell.Navbar>
          <Header>
            <Header.Toggle />
            <Header.Brand>
              <Header.BrandTitle>useAppShell Demo</Header.BrandTitle>
            </Header.Brand>
            <Header.Spacer />
            <Header.Actions>
              <NotificationButton />
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
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Consume Context Mode
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              These components use <code>useAppShell()</code> to consume the context created by{' '}
              <code>&lt;AppShell&gt;</code>.
            </Typography>
            
            <Stack spacing={3} sx={{ mt: 3 }}>
              <StatusDisplay />
              <ControlPanel />
            </Stack>
          </Box>
        </AppShell.Main>

        <AppShell.NotificationPanel>
          <NotificationPanel>
            <NotificationPanel.Header>
              <NotificationPanel.HeaderIcon><Bell size={20} /></NotificationPanel.HeaderIcon>
              <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
              <NotificationPanel.HeaderClose />
            </NotificationPanel.Header>
            <NotificationPanel.List>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Use the controls in the main area to toggle this panel.
                </Typography>
              </Box>
            </NotificationPanel.List>
          </NotificationPanel>
        </AppShell.NotificationPanel>
      </AppShell>
    );
  },
};

/**
 * Demonstrates using useAppShell in Create Mode by passing options.
 * This pattern is useful when you need shell state without using the AppShell component.
 * 
 * Note: This is less common than Consume Mode since AppShell component handles this automatically.
 */
export const CreateMode: Story = {
  render: () => {
    const CustomShellManager: React.FC = () => {
      // Create shell state with options
      const shell = useAppShell({
        initialCollapsed: true,
        collapseOnSelectOnMobile: true,
        sidebarWidth: 280,
        sidebarCollapsedWidth: 72,
      });

      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Create Mode
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Using <code>useAppShell(options)</code> to create shell state directly.
          </Typography>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shell State
              </Typography>
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Sidebar Collapsed:
                  </Typography>
                  <Chip
                    label={shell.state.sidebarCollapsed ? 'Yes' : 'No'}
                    color={shell.state.sidebarCollapsed ? 'warning' : 'success'}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Menu Item:
                  </Typography>
                  <Chip
                    label={shell.state.activeMenuItem || 'None'}
                    color="primary"
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Sidebar Width:
                  </Typography>
                  <Chip
                    label={`${shell.state.sidebarCollapsed ? shell.state.sidebarCollapsedWidth : shell.state.sidebarWidth}px`}
                    size="small"
                  />
                </Box>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Actions:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={shell.actions.toggleSidebar}
                    startIcon={<Menu size={16} />}
                  >
                    Toggle Sidebar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => shell.actions.setActiveMenuItem('dashboard')}
                  >
                    Activate Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => shell.actions.setActiveMenuItem('settings')}
                  >
                    Activate Settings
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2, bgcolor: 'info.50', borderColor: 'info.main' }} variant="outlined">
            <CardContent>
              <Typography variant="body2" color="info.dark">
                <strong>💡 Tip:</strong> In most cases, you should use the Consume Context pattern
                by wrapping your app with <code>&lt;AppShell&gt;</code> and calling{' '}
                <code>useAppShell()</code> in child components. Create Mode is only needed for
                advanced use cases where you need shell state outside the AppShell component.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );
    };

    return <CustomShellManager />;
  },
};
