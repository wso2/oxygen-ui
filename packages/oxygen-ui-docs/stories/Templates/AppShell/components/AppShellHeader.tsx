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
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Tooltip,
  Typography,
  Divider,
  ColorSchemeToggle,
} from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  HelpCircle,
} from '@wso2/oxygen-ui-icons-react';
import type { Organization, Project, Environment, User } from './types';
import { AppShellSwitcher } from './AppShellSwitcher';
import { AppShellUserMenu } from './AppShellUserMenu';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - AppBar background color
 * - `text.secondary` - Icon button default color
 * - `divider` - Bottom border, vertical dividers between sections
 * - `error.main` - Notification badge color (via Badge color="error")
 *
 * Responsive Breakpoints:
 * - `xs` (0px) - Mobile layout
 * - `sm` (600px) - Tablet, shows title
 * - `md` (900px) - Desktop, shows switchers
 *
 * Responsive Spacing:
 * - minHeight: { xs: 56, sm: 64 } - Toolbar height
 * - px: { xs: 1, sm: 2 } - Horizontal padding
 * - display: { xs: 'none', sm: 'block' } - Conditional visibility
 *
 * Components:
 * - ColorSchemeToggle - Built-in Oxygen UI theme toggle
 * - Badge - Uses MUI's color prop for semantic colors
 */

/**
 * Props for the AppShellHeader component.
 */
export interface AppShellHeaderProps {
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean;
  /** Callback to toggle sidebar */
  onToggleSidebar: () => void;
  /** Logo element to display */
  logo?: React.ReactNode;
  /** Application title (shown next to logo) */
  title?: string;
  /** Available organizations */
  organizations?: Organization[];
  /** Currently selected organization */
  selectedOrg?: Organization | null;
  /** Callback when organization changes */
  onOrgChange?: (org: Organization) => void;
  /** Available projects */
  projects?: Project[];
  /** Currently selected project */
  selectedProject?: Project | null;
  /** Callback when project changes */
  onProjectChange?: (project: Project) => void;
  /** Current environment */
  environment?: Environment;
  /** Callback when environment changes */
  onEnvironmentChange?: (env: Environment) => void;
  /** Number of unread notifications */
  notificationCount?: number;
  /** Callback when notification button is clicked */
  onNotificationClick?: () => void;
  /** Callback when help button is clicked */
  onHelpClick?: () => void;
  /** Current user */
  user?: User;
  /** Callback when profile is clicked */
  onProfileClick?: () => void;
  /** Callback when settings is clicked */
  onSettingsClick?: () => void;
  /** Callback when billing is clicked */
  onBillingClick?: () => void;
  /** Callback when logout is clicked */
  onLogout?: () => void;
  /** Whether to show a minimal header (logo + user only) */
  minimal?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellHeader - Top navigation bar component.
 *
 * Features:
 * - Sidebar toggle button with animated icon
 * - Logo and application title
 * - Organization/Project/Environment switchers (visual placeholders)
 * - Theme toggle (light/dark mode)
 * - Notification button with badge
 * - Help button
 * - User menu with profile, settings, billing, and logout
 *
 * The header uses MUI's AppBar with a clean, minimal design that works
 * well with both light and dark themes.
 *
 * Usage:
 * ```tsx
 * <AppShellHeader
 *   sidebarCollapsed={collapsed}
 *   onToggleSidebar={handleToggle}
 *   logo={<Logo />}
 *   title="Dashboard"
 *   organizations={orgs}
 *   selectedOrg={currentOrg}
 *   onOrgChange={handleOrgChange}
 *   notificationCount={3}
 *   onNotificationClick={handleNotifications}
 *   user={currentUser}
 *   onLogout={handleLogout}
 * />
 * ```
 */
export const AppShellHeader: React.FC<AppShellHeaderProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
  logo,
  title,
  organizations,
  selectedOrg,
  onOrgChange,
  projects,
  selectedProject,
  onProjectChange,
  environment,
  onEnvironmentChange,
  notificationCount = 0,
  onNotificationClick,
  onHelpClick,
  user,
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onLogout,
  minimal = false,
  sx,
}) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        ...sx,
      }}
    >
      <Toolbar
        sx={{
          gap: 1,
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Left section: Sidebar toggle + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Sidebar toggle button */}
          <Tooltip
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <IconButton
              onClick={onToggleSidebar}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </IconButton>
          </Tooltip>

          {/* Logo */}
          {logo && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              {logo}
            </Box>
          )}

          {/* Application title */}
          {title && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: { xs: 16, sm: 18 },
                ml: logo ? 1 : 0,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {title}
            </Typography>
          )}
        </Box>

        {/* Center section: Switchers */}
        {!minimal && (
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
              ml: 2,
            }}
          >
            {/* Divider after logo section */}
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Organization switcher */}
            {organizations && organizations.length > 0 && (
              <AppShellSwitcher
                type="organization"
                items={organizations}
                selected={selectedOrg || organizations[0]}
                onChange={onOrgChange}
              />
            )}

            {/* Project switcher */}
            {projects && projects.length > 0 && (
              <AppShellSwitcher
                type="project"
                items={projects}
                selected={selectedProject || projects[0]}
                onChange={onProjectChange}
              />
            )}

            {/* Environment switcher */}
            {environment && onEnvironmentChange && (
              <AppShellSwitcher
                type="environment"
                environment={environment}
                onEnvironmentChange={onEnvironmentChange}
              />
            )}
          </Box>
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right section: Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Theme toggle */}
          <ColorSchemeToggle />

          {/* Help button */}
          {!minimal && onHelpClick && (
            <Tooltip title="Help & Support">
              <IconButton
                onClick={onHelpClick}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <HelpCircle size={20} />
              </IconButton>
            </Tooltip>
          )}

          {/* Notification button */}
          {!minimal && onNotificationClick && (
            <Tooltip title="Notifications">
              <IconButton
                onClick={onNotificationClick}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <Badge
                  badgeContent={notificationCount}
                  color="error"
                  max={99}
                  invisible={notificationCount === 0}
                >
                  <Bell size={20} />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {/* User menu */}
          {user && (
            <>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }}
              />
              <AppShellUserMenu
                user={user}
                onProfileClick={onProfileClick}
                onSettingsClick={onSettingsClick}
                onBillingClick={onBillingClick}
                onLogout={onLogout}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppShellHeader;
