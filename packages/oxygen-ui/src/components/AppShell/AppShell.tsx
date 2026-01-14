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
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import Layout from '../../layouts';
import { AppShellNavbar } from './AppShellNavbar';
import { AppShellSidebar } from './AppShellSidebar';
import { AppShellMain } from './AppShellMain';
import { AppShellFooter } from './AppShellFooter';
import { AppShellNotificationPanel } from './AppShellNotificationPanel';

/**
 * Display names for slot detection.
 */
const SLOT_DISPLAY_NAMES = {
  Navbar: 'AppShellNavbar',
  Sidebar: 'AppShellSidebar',
  Main: 'AppShellMain',
  Footer: 'AppShellFooter',
  NotificationPanel: 'AppShellNotificationPanel',
} as const;

/**
 * Extracted slot content from children.
 */
interface ExtractedSlots {
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
  notificationPanel: React.ReactNode;
}

/**
 * Extracts slot content from children based on displayName.
 */
const extractSlots = (children: React.ReactNode): ExtractedSlots => {
  const slots: ExtractedSlots = {
    navbar: null,
    sidebar: null,
    main: null,
    footer: null,
    notificationPanel: null,
  };

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.FC)?.displayName;
      const childProps = child.props as { children?: React.ReactNode };

      switch (displayName) {
        case SLOT_DISPLAY_NAMES.Navbar:
          slots.navbar = childProps.children;
          break;
        case SLOT_DISPLAY_NAMES.Sidebar:
          slots.sidebar = childProps.children;
          break;
        case SLOT_DISPLAY_NAMES.Main:
          slots.main = childProps.children;
          break;
        case SLOT_DISPLAY_NAMES.Footer:
          slots.footer = childProps.children;
          break;
        case SLOT_DISPLAY_NAMES.NotificationPanel:
          slots.notificationPanel = childProps.children;
          break;
        default:
          // Non-slot children go to main content
          if (!slots.main) {
            slots.main = child;
          }
      }
    }
  });

  return slots;
};

/**
 * Props for AppShell component.
 */
export interface AppShellProps {
  /** AppShell slot components (Navbar, Sidebar, Main, Footer, NotificationPanel) */
  children: React.ReactNode;
  /** Additional sx props for the root container */
  sx?: SxProps<Theme>;
}

/**
 * AppShell - Convenience wrapper for building application layouts.
 *
 * Uses a compound component pattern where children define the layout slots.
 * This reduces boilerplate compared to manually composing Layout components.
 *
 * @example
 * ```tsx
 * <AppShell>
 *   <AppShell.Navbar>
 *     <Header>...</Header>
 *   </AppShell.Navbar>
 *   <AppShell.Sidebar>
 *     <Sidebar collapsed={collapsed}>...</Sidebar>
 *   </AppShell.Sidebar>
 *   <AppShell.Main>
 *     <Outlet />
 *   </AppShell.Main>
 *   <AppShell.Footer>
 *     <Footer companyName="WSO2 LLC" />
 *   </AppShell.Footer>
 *   <AppShell.NotificationPanel>
 *     <NotificationPanel open={open} onClose={onClose}>...</NotificationPanel>
 *   </AppShell.NotificationPanel>
 * </AppShell>
 * ```
 */
const AppShell: React.FC<AppShellProps> & {
  Navbar: typeof AppShellNavbar;
  Sidebar: typeof AppShellSidebar;
  Main: typeof AppShellMain;
  Footer: typeof AppShellFooter;
  NotificationPanel: typeof AppShellNotificationPanel;
} = ({ children, sx }) => {
  const slots = extractSlots(children);

  return (
    <Layout sx={{ height: '100vh', flexDirection: 'column', ...sx }}>
      {/* Navbar/Header */}
      {slots.navbar && <Layout.Navbar>{slots.navbar}</Layout.Navbar>}

      {/* Main content area with sidebar */}
      <Layout sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        {slots.sidebar && <Layout.Sidebar>{slots.sidebar}</Layout.Sidebar>}

        {/* Content + Footer */}
        <Layout.Content sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ flex: 1, overflow: 'auto' }}>{slots.main}</Box>
          {slots.footer}
        </Layout.Content>
      </Layout>

      {/* Notification Panel - overlay */}
      {slots.notificationPanel}
    </Layout>
  );
};

// Attach sub-components
AppShell.Navbar = AppShellNavbar;
AppShell.Sidebar = AppShellSidebar;
AppShell.Main = AppShellMain;
AppShell.Footer = AppShellFooter;
AppShell.NotificationPanel = AppShellNotificationPanel;
AppShell.displayName = 'AppShell';

export { AppShell };
export default AppShell;
