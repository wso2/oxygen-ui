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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { HeaderContext } from './context';
import { HeaderToggle } from './HeaderToggle';
import {
  HeaderBrand,
  HeaderBrandLogo,
  HeaderBrandTitle,
} from './HeaderBrand';
import { HeaderSwitchers } from './HeaderSwitchers';
import { HeaderActions } from './HeaderActions';

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
 * Props for the Header component.
 */
export interface HeaderProps {
  /** Header content (Toggle, Brand, Switchers, Actions) */
  children: React.ReactNode;
  /** Whether to show a minimal header (hides switchers) */
  minimal?: boolean;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Header - Top navigation bar compound component.
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
 * <Header>
 *   <Header.Toggle collapsed={collapsed} onToggle={toggle} />
 *   <Header.Brand>
 *     <Header.BrandLogo><Logo /></Header.BrandLogo>
 *     <Header.BrandTitle>Dashboard</Header.BrandTitle>
 *   </Header.Brand>
 *   <Header.Switchers>
 *     <OrgSwitcher ... />
 *     <ProjectSwitcher ... />
 *   </Header.Switchers>
 *   <Header.Spacer />
 *   <Header.Actions>
 *     <ColorSchemeToggle />
 *     <NotificationButton ... />
 *     <UserMenu ... />
 *   </Header.Actions>
 * </Header>
 * ```
 */
const HeaderRoot: React.FC<HeaderProps> = ({
  children,
  minimal = false,
  sx,
}) => {
  const contextValue = React.useMemo(() => ({ minimal }), [minimal]);

  return (
    <HeaderContext.Provider value={contextValue}>
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
    </HeaderContext.Provider>
  );
};

/**
 * Props for the HeaderSpacer component.
 */
export interface HeaderSpacerProps {
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * Spacer component for header layout.
 */
const HeaderSpacer: React.FC<HeaderSpacerProps> = ({ sx }) => (
  <Box sx={{ flexGrow: 1, ...sx }} />
);

/**
 * Header compound component with attached sub-components.
 *
 * Sub-components:
 * - `Header.Toggle` - Sidebar toggle button
 * - `Header.Brand` - Logo and title
 * - `Header.Switchers` - Container for context switchers
 * - `Header.Actions` - Container for action buttons
 * - `Header.Spacer` - Flexible spacer
 */
export const Header = Object.assign(HeaderRoot, {
  Toggle: HeaderToggle,
  Brand: HeaderBrand,
  BrandLogo: HeaderBrandLogo,
  BrandTitle: HeaderBrandTitle,
  Switchers: HeaderSwitchers,
  Actions: HeaderActions,
  Spacer: HeaderSpacer,
});

export default Header;
