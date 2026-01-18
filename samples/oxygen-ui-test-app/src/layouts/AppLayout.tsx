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

import { Outlet } from 'react-router'
import { Link as NavigateLink } from 'react-router'
import {
  AppShell,
  Badge,
  ColorSchemeToggle,
  ComplexSelect,
  Footer,
  Divider,
  Header,
  IconButton,
  Sidebar,
  Tooltip,
  UserMenu,
  Link,
  NotificationPanel,
  formatRelativeTime,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useAppShell,
  useNotifications,
} from '@wso2/oxygen-ui'
import { useState, type JSX } from 'react'
import { useNavigate, useLocation } from 'react-router'
import Logo from '../components/Logo';
import {
  BarChart3,
  Bell,
  Building,
  Database,
  FolderOpen,
  Globe,
  HelpCircle,
  Home,
  Key,
  Layers,
  Lock,
  Settings,
  Shield,
  UserCog,
  Users
} from '@wso2/oxygen-ui-icons-react';
import { mockNotifications, mockOrganizations, mockProjects, mockUser } from '../mock-data';
import type { Organization, Project } from '../mock-data/types';

export default function AppLayout(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  // Shell layout state (sidebar, menu, panel visibility)
  const { state: shellState, actions: shellActions } = useAppShell({
    initialCollapsed: true,
  });

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
  const [selectedOrg, setOrganization] = useState<Organization>(mockOrganizations[0]);
  const [selectedProject, setProject] = useState<Project>(mockProjects[0]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
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

  // Check if current path matches /projects/:id or any subpaths
  const isProject = /^\/projects\/[^/]+/.test(location.pathname);

  return (
    <AppShell>
      <AppShell.Navbar>
        <Header>
          <Header.Toggle
            collapsed={false}
            onToggle={shellActions.toggleSidebar}
          />
          <Header.Brand>
            <Header.BrandLogo><Logo /></Header.BrandLogo>
            <Header.BrandTitle>Developer</Header.BrandTitle>
          </Header.Brand>
          <Header.Switchers showDivider={false}>
            <ComplexSelect
              value={selectedOrg?.id || ''}
              onChange={(e) => {
                const org = mockOrganizations.find((o) => o.id === e.target.value);
                if (org) setOrganization(org);
              }}
              size="small"
              sx={{ minWidth: 180 }}
              renderValue={() => (
                <>
                  <ComplexSelect.MenuItem.Icon>
                    <Building />
                  </ComplexSelect.MenuItem.Icon>
                  <ComplexSelect.MenuItem.Text
                    primary={selectedOrg?.name}
                    secondary={selectedOrg?.description}
                  />
                </>
              )}
              label="Organizations"
            >
              {mockOrganizations.map((org) => (
                <ComplexSelect.MenuItem key={org.id} value={org.id}>
                  <ComplexSelect.MenuItem.Icon><Building /></ComplexSelect.MenuItem.Icon>
                  <ComplexSelect.MenuItem.Text primary={org.name} secondary={org.description} />
                </ComplexSelect.MenuItem>
              ))}
            </ComplexSelect>
            {isProject && (
              <ComplexSelect
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const project = mockProjects.find((p) => p.id === e.target.value);
                  if (project) setProject(project);
                }}
                size="small"
                sx={{ minWidth: 160 }}
                renderValue={() => (
                  <ComplexSelect.MenuItem.Text primary={selectedProject?.name} secondary={selectedProject?.description} />
                )}
                label="Projects"
              >
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
            <Tooltip title="Notifications">
              <IconButton
                onClick={shellActions.toggleNotificationPanel}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <Badge
                  badgeContent={unreadCount ?? 0}
                  color="error"
                  max={99}
                  invisible={(unreadCount ?? 0) === 0}
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
              onLogout={() => setConfirmDialogOpen(true)}
            />
          </Header.Actions>
        </Header>
      </AppShell.Navbar>

      <AppShell.Sidebar>
        <Sidebar
          collapsed={shellState.sidebarCollapsed}
          activeItem={shellState.activeMenuItem}
          expandedMenus={shellState.expandedMenus}
          onSelect={shellActions.setActiveMenuItem}
          onToggleExpand={shellActions.toggleMenu}
        >
          <Sidebar.Nav>
            {/* Main Navigation */}
            <Sidebar.Category>
              <Sidebar.Item id="dashboard">
                <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                <Sidebar.ItemLabel>Dashboard</Sidebar.ItemLabel>
              </Sidebar.Item>
              <Link component={NavigateLink} to="/analytics">
                <Sidebar.Item id="analytics">
                  <Sidebar.ItemIcon><BarChart3 size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Analytics</Sidebar.ItemLabel>
                </Sidebar.Item>
              </Link>
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
              <Link component={NavigateLink} to="/projects">
                <Sidebar.Item id="projects">
                  <Sidebar.ItemIcon><FolderOpen size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Projects</Sidebar.ItemLabel>
                  <Sidebar.ItemBadge>5</Sidebar.ItemBadge>
                </Sidebar.Item>
              </Link>
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
              <Link component={NavigateLink} to="/settings">
                <Sidebar.Item id="settings">
                  <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
                  <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
                </Sidebar.Item>
              </Link>
              <Sidebar.Item id="help">
                <Sidebar.ItemIcon><HelpCircle size={20} /></Sidebar.ItemIcon>
                <Sidebar.ItemLabel>Help & Support</Sidebar.ItemLabel>
              </Sidebar.Item>
            </Sidebar.Category>
          </Sidebar.Footer>
        </Sidebar>
      </AppShell.Sidebar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer
          companyName="WSO2 LLC"
          version="oxygen-ui_v3.0.0-alpha.13"
          termsUrl="#terms"
          privacyUrl="#privacy"
        />
      </AppShell.Footer>

      <AppShell.NotificationPanel>
        <NotificationPanel
          open={shellState.notificationPanelOpen}
          onClose={shellActions.toggleNotificationPanel}
        >
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
            <NotificationPanel.EmptyState />
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

        {/* Confirm Dialog - managed locally */}
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
                navigate('/login');
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
}
