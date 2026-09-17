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
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { AppSwitcherContext } from './context';
import { AppSwitcherTrigger } from './AppSwitcherTrigger';
import { AppSwitcherSection } from './AppSwitcherSection';
import { AppSwitcherApp } from './AppSwitcherApp';
import { AppSwitcherFooter } from './AppSwitcherFooter';
import type { AppSwitcherFooterLink } from './AppSwitcherFooter';

/**
 * Theme tokens used in this component:
 *
 * Popover surface uses the theme's paper background and elevation.
 *
 * Responsive behavior:
 * - Width capped to the viewport on xs (mobile)
 * - Fixed width from sm up (tablet/desktop)
 */

/**
 * Styled popover for the app switcher.
 */
const AppSwitcherRoot = styled(Popover, {
  name: 'MuiAppSwitcher',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: { width: number } }>(({ theme, ownerState }) => ({
  '& .MuiPopover-paper': {
    width: `calc(100vw - ${theme.spacing(4)})`,
    maxWidth: '100%',
    marginTop: theme.spacing(1),
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      width: ownerState.width,
    },
  },
}));

/**
 * A single application shown in the switcher.
 */
export interface AppSwitcherItem {
  /** Stable identifier, used as the React key */
  key: string;
  /** Application name (e.g. `"API Platform"`) */
  name: string;
  /** Destination URL. The card renders as an anchor pointing at it. */
  url?: string;
  /** Mark shown above the name (default: the WSO2 logo) */
  icon?: React.ReactNode;
  /** Blocks navigation, e.g. for platforms that are not yet available */
  disabled?: boolean;
  /**
   * Tooltip shown on hover and focus, typically explaining why a platform is
   * unavailable (e.g. `"Coming soon"`). Omit for no tooltip.
   */
  tooltip?: React.ReactNode;
  /** Anchor target (default: `"_blank"`, so platforms open in a new tab) */
  target?: string;
  /** Custom root component, e.g. a router `Link`, for client-side navigation */
  component?: React.ElementType;
  /**
   * Extra props forwarded to `component`, for routers that use their own
   * navigation prop instead of `url` (e.g. React Router's `to`).
   *
   * @example
   * { component: Link, componentProps: { to: '/apim' } }
   */
  componentProps?: Record<string, unknown>;
  /** Click handler. The popover stays open after it runs. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * The manage section shown beneath the platforms.
 */
export interface AppSwitcherFooterAction {
  /** Heading above the links (default: `"Manage"`) */
  label?: string;
  /** WSO2 Cloud destinations, rendered as cards */
  links: AppSwitcherFooterLink[];
  /** Number of grid columns from the `sm` breakpoint up (default: 3) */
  columns?: number;
}

/**
 * Props for the AppSwitcher component.
 */
export interface AppSwitcherProps {
  /** Applications to switch between */
  apps: AppSwitcherItem[];
  /** Heading above the application grid (default: `"Platforms"`) */
  label?: string;
  /** Manage section beneath the platforms. Omit to hide it. */
  footer?: AppSwitcherFooterAction;
  /** Tooltip and accessible label for the trigger (default: `"Switch Platforms"`) */
  triggerLabel?: string;
  /** Custom trigger icon, replacing the default grid icon */
  triggerIcon?: React.ReactNode;
  /** Popover width in pixels from the `sm` breakpoint up (default: 460) */
  width?: number;
  /** Number of grid columns from the `sm` breakpoint up (default: 3) */
  columns?: number;
  /** Accessible name for the popover surface (default: `"Applications"`) */
  'aria-label'?: string;
  /** Additional sx props applied to the popover */
  sx?: SxProps<Theme>;
}

/**
 * AppSwitcher - Popover for navigating between WSO2 Cloud applications.
 *
 * Renders a grid icon button in the header that opens a popover listing the
 * available platforms. The layout is fixed by design so the switcher looks and
 * behaves identically across every product, and consumers supply data rather
 * than markup.
 *
 * Features:
 * - Fixed, consistent layout across products
 * - Card buttons that render as links when given a `url`, opening in a new tab
 * - Hover lift and accent border on every navigable card
 * - A manage section linking to the WSO2 Cloud tabs
 * - Responsive popover width (viewport-capped on mobile, fixed on desktop)
 *
 * Selecting a card leaves the popover open, since cards open in a new tab. Only
 * the trigger, an outside click or Escape dismisses it.
 *
 * @example
 * ```tsx
 * <Header.Actions>
 *   <AppSwitcher
 *     apps={[
 *       { key: 'agent', name: 'Agent Manager', url: 'https://agent.wso2.com' },
 *       { key: 'apim', name: 'API Platform', url: 'https://api.wso2.com' },
 *     ]}
 *     footer={{
 *       links: [
 *         { key: 'orgs', name: 'Organizations', url: 'https://console.wso2.com/organizations' },
 *         { key: 'billing', name: 'Billing', url: 'https://console.wso2.com/billing' },
 *       ],
 *     }}
 *   />
 * </Header.Actions>
 * ```
 */
export const AppSwitcher: React.FC<AppSwitcherProps> = ({
  apps,
  label = 'Platforms',
  footer,
  triggerLabel,
  triggerIcon,
  width = 460,
  columns = 3,
  'aria-label': ariaLabelProp,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = React.useId();

  // Clicking the trigger toggles: a second click on the grid icon dismisses the
  // popover rather than re-anchoring it, which is what an already-open switcher
  // leads a user to expect.
  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    setAnchorEl((current) => (current ? null : target));
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Empty/whitespace labels must not wipe the default accessible name.
  const ariaLabel =
    typeof ariaLabelProp === 'string' && ariaLabelProp.trim().length > 0
      ? ariaLabelProp
      : 'Applications';

  const contextValue = React.useMemo(
    () => ({ open, anchorEl, popoverId, handleOpen, handleClose }),
    [open, anchorEl, popoverId, handleOpen, handleClose]
  );

  return (
    <AppSwitcherContext.Provider value={contextValue}>
      <AppSwitcherTrigger label={triggerLabel} icon={triggerIcon} />
      <AppSwitcherRoot
        id={popoverId}
        ownerState={{ width }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { role: 'dialog', 'aria-label': ariaLabel } }}
        sx={sx}
      >
        <AppSwitcherSection label={label} columns={columns}>
          {apps.map(({ key, ...app }) => (
            <AppSwitcherApp key={key} {...app} />
          ))}
        </AppSwitcherSection>
        {footer && (
          <AppSwitcherFooter
            label={footer.label}
            links={footer.links}
            columns={footer.columns}
          />
        )}
      </AppSwitcherRoot>
    </AppSwitcherContext.Provider>
  );
};

AppSwitcher.displayName = 'AppSwitcher';

export default AppSwitcher;
