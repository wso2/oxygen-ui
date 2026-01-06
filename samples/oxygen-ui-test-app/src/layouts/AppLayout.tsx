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
  Badge,
  Box,
  ColorSchemeToggle,
  ComplexSelect,
  Footer,
  Divider,
  Header,
  IconButton,
  Layout,
  Sidebar,
  Tooltip,
  UserMenu,
  Link,
} from '@wso2/oxygen-ui'
import type { JSX } from 'react'
import Logo from '../components/Logo';
import {
  Activity,
  BarChart3,
  Bell,
  Building,
  Database,
  FileText,
  FolderOpen,
  Globe,
  HelpCircle,
  Home,
  Key,
  Layers,
  Lock,
  PieChart,
  Settings,
  Shield,
  TrendingUp,
  UserCog,
  Users
} from '@wso2/oxygen-ui-icons-react';
import { mockNotifications, mockOrganizations, mockProjects, mockUser } from '../mock-data';
import { useAppShellState } from '../hooks';

export default function AppLayout(): JSX.Element {

  const { state, actions, unreadCount } = useAppShellState({
    initialCollapsed: true,
    initialNotifications: [...mockNotifications],
    initialOrg: mockOrganizations[0],
    initialProject: mockProjects[0],
  });
  
  return (
    <Layout sx={{ height: '100vh', flexDirection: 'column' }}>
      <Layout.Navbar>
        <Header>
          <Header.Toggle
            collapsed={false}
            onToggle={actions.toggleSidebar}
          />
          <Header.Brand>
            <Header.BrandLogo><Logo /></Header.BrandLogo>
            <Header.BrandTitle>Developer</Header.BrandTitle>
          </Header.Brand>
          <Header.Switchers>
            <ComplexSelect
              value={state.selectedOrg?.id || ''}
              onChange={(e) => {
                const org = mockOrganizations.find((o) => o.id === e.target.value);
                if (org) actions.setOrganization(org);
              }}
              size="small"
              sx={{ minWidth: 180 }}
              renderValue={() => (
                <>
                  <ComplexSelect.MenuItem.Icon>
                    <Building />
                  </ComplexSelect.MenuItem.Icon>
                  <ComplexSelect.MenuItem.Text 
                    primary={state.selectedOrg?.name} 
                    secondary={state.selectedOrg?.description}
                  />
                </>
              )}
            >
              <ComplexSelect.ListHeader>Organizations</ComplexSelect.ListHeader>
              {mockOrganizations.map((org) => (
                <ComplexSelect.MenuItem key={org.id} value={org.id}>
                  <ComplexSelect.MenuItem.Icon><Building /></ComplexSelect.MenuItem.Icon>
                  <ComplexSelect.MenuItem.Text primary={org.name} secondary={org.description} />
                </ComplexSelect.MenuItem>
              ))}
            </ComplexSelect>
            <ComplexSelect
              value={state.selectedProject?.id || ''}
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
          </Header.Switchers>
          <Header.Spacer />
          <Header.Actions>
            <ColorSchemeToggle />
            <Tooltip title="Notifications">
              <IconButton
                onClick={actions.toggleNotificationPanel}
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
              onLogout={actions.openConfirmDialog}
            />
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
                <Link component={NavigateLink} to="/projects">
                  <Sidebar.Item id="projects">
                    <Sidebar.ItemIcon><FolderOpen size={20} /></Sidebar.ItemIcon>
                    <Sidebar.ItemLabel>Projects</Sidebar.ItemLabel>
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
        </Layout.Sidebar>

        <Layout.Content sx={{ flex: 1 }}>
          <Layout sx={{ height: '100%', flexDirection: 'column' }}>
            <Box sx={{ overflow: 'auto' }}>
              <Outlet />
            </Box>

            <Footer
              companyName="Oxygen UI"
              version="v1.0.0"
              termsUrl="#terms"
              privacyUrl="#privacy"
            />
          </Layout>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
