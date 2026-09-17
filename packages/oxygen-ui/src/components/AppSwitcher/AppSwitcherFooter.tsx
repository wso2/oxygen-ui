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
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { AppSwitcherSection } from './AppSwitcherSection';
import { AppSwitcherApp } from './AppSwitcherApp';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `divider` - Top separator
 * - A 2% wash of the foreground color - Footer background, setting the manage
 *   row apart from the platform grid above it without reading as a grey block
 */

/**
 * A single WSO2 Cloud destination in the footer.
 */
export interface AppSwitcherFooterLink {
  /** Stable identifier, used as the React key */
  key: string;
  /** Link name (e.g. `"Users & roles"`) */
  name: string;
  /** Destination URL. Renders the card as an anchor. */
  url?: string;
  /** Mark shown above the name (default: the WSO2 logo) */
  icon?: React.ReactNode;
  /** Anchor target (default: `"_blank"`) */
  target?: string;
  /** Blocks navigation, e.g. for a tab the user cannot reach */
  disabled?: boolean;
  /** Tooltip shown on hover and focus, e.g. explaining a disabled link */
  tooltip?: React.ReactNode;
  /** Custom root component, e.g. a router `Link`, for client-side navigation */
  component?: React.ElementType;
  /**
   * Extra props forwarded to `component`, for routers that use their own
   * navigation prop instead of `href` (e.g. React Router's `to`).
   */
  componentProps?: Record<string, unknown>;
  /** Click handler. The popover stays open after it runs. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Styled footer container.
 */
const AppSwitcherFooterRoot = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'Footer',
})(({ theme }) => ({
  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
  // A wash rather than a fill: the divider already separates the manage row, so
  // the tint only needs to hint that it is a different kind of destination.
  // `action.hover` at full strength reads as a grey block behind the cards.
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.02)`
    : alpha(theme.palette.text.primary, 0.02),
}));

/**
 * Props for the AppSwitcher.Footer component.
 */
export interface AppSwitcherFooterProps {
  /** WSO2 Cloud destinations rendered as cards */
  links?: AppSwitcherFooterLink[];
  /** Heading above the links (default: `"Manage"`) */
  label?: string;
  /** Number of grid columns from the `sm` breakpoint up (default: 3) */
  columns?: number;
}

/**
 * AppSwitcher.Footer - Bottom section of the app switcher popover.
 *
 * Holds the WSO2 Cloud destinations (organizations, users, billing) as a
 * labelled grid of cards, using the same card as the platform grid so both rows
 * behave identically. The neutral mark and lighter type keep them visually
 * secondary to the platforms above.
 *
 * @example
 * ```tsx
 * <AppSwitcher.Footer
 *   label="Manage"
 *   links={[{ key: 'billing', name: 'Billing', url: 'https://console.wso2.com/billing' }]}
 * />
 * ```
 */
export const AppSwitcherFooter: React.FC<AppSwitcherFooterProps> = ({
  links,
  label = 'Manage',
  columns = 3,
}) => {
  // An empty list must not leave a bare separator and background behind.
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <AppSwitcherFooterRoot>
      <AppSwitcherSection label={label} columns={columns}>
        {links.map(({ key, ...link }) => (
          <AppSwitcherApp key={key} tone="manage" {...link} />
        ))}
      </AppSwitcherSection>
    </AppSwitcherFooterRoot>
  );
};

AppSwitcherFooter.displayName = 'AppSwitcher.Footer';

export default AppSwitcherFooter;
