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
import { AppBar, Toolbar, Box } from '@wso2/oxygen-ui';
import type { SxProps, Theme } from '@wso2/oxygen-ui';
import { AppShellHeaderContext } from './context';
import { AppShellHeaderToggle } from './AppShellHeaderToggle';
import { AppShellHeaderBrand } from './AppShellHeaderBrand';
import { AppShellHeaderSwitchers } from './AppShellHeaderSwitchers';
import { AppShellHeaderActions } from './AppShellHeaderActions';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` - AppBar background color
 * - `divider` - Bottom border color
 *
 * Responsive Breakpoints:
 * - `xs` (0px) - Mobile layout, minHeight: 56
 * - `sm` (600px) - Tablet, minHeight: 64
 */

/**
 * Props for the AppShellHeader component.
 */
export interface AppShellHeaderProps {
  /** Header content (Toggle, Brand, Switchers, Actions) */
  children: React.ReactNode;
  /** Whether to show a minimal header (hides switchers) */
  minimal?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppShellHeader - Top navigation bar compound component.
 *
 * A composable header component that uses the compound component pattern.
 * Children can include Toggle, Brand, Switchers, and Actions sub-components.
 *
 * Features:
 * - Compound component pattern for maximum flexibility
 * - Context-based state sharing
 * - Responsive layout with proper spacing
 * - Clean, minimal design that works with light/dark themes
 *
 * Usage:
 * ```tsx
 * <AppShellHeader>
 *   <AppShellHeader.Toggle collapsed={collapsed} onToggle={toggle} />
 *   <AppShellHeader.Brand logo={<Logo />} title="Dashboard" />
 *   <AppShellHeader.Switchers>
 *     <OrgSwitcher ... />
 *     <ProjectSwitcher ... />
 *   </AppShellHeader.Switchers>
 *   <Box sx={{ flexGrow: 1 }} /> {/* Spacer *\/}
 *   <AppShellHeader.Actions>
 *     <ColorSchemeToggle />
 *     <NotificationButton ... />
 *     <UserMenu ... />
 *   </AppShellHeader.Actions>
 * </AppShellHeader>
 * ```
 */
const AppShellHeaderRoot: React.FC<AppShellHeaderProps> = ({
  children,
  minimal = false,
  sx,
}) => {
  const contextValue = React.useMemo(() => ({ minimal }), [minimal]);

  return (
    <AppShellHeaderContext.Provider value={contextValue}>
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
          {children}
        </Toolbar>
      </AppBar>
    </AppShellHeaderContext.Provider>
  );
};

/**
 * Spacer component for header layout.
 */
const AppShellHeaderSpacer: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => (
  <Box sx={{ flexGrow: 1, ...sx }} />
);

/**
 * AppShellHeader compound component with attached sub-components.
 *
 * Sub-components:
 * - `AppShellHeader.Toggle` - Sidebar toggle button
 * - `AppShellHeader.Brand` - Logo and title
 * - `AppShellHeader.Switchers` - Container for context switchers
 * - `AppShellHeader.Actions` - Container for action buttons
 * - `AppShellHeader.Spacer` - Flexible spacer
 */
export const AppShellHeader = Object.assign(AppShellHeaderRoot, {
  Toggle: AppShellHeaderToggle,
  Brand: AppShellHeaderBrand,
  Switchers: AppShellHeaderSwitchers,
  Actions: AppShellHeaderActions,
  Spacer: AppShellHeaderSpacer,
});

export default AppShellHeader;
