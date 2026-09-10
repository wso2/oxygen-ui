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
import type { AppSwitcherAppStatusColor } from './AppSwitcherApp';

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
  /** Application name (e.g. `"API Management"`) */
  name: string;
  /** Application icon, typically a 20px icon element */
  icon?: React.ReactNode;
  /** Status chip label (e.g. `"Current"`, `"Try Now"`, `"Coming soon"`) */
  status?: string;
  /** Color of the status chip (default: `"default"`) */
  statusColor?: AppSwitcherAppStatusColor;
  /** Marks the app the user is currently in */
  current?: boolean;
  /** Blocks navigation, e.g. for apps that are not yet available */
  disabled?: boolean;
  /** Destination URL. Renders the card as an anchor. */
  href?: string;
  /** Anchor target, only applied together with `href` */
  target?: string;
  /** Custom root component, e.g. a router `Link`, for client-side navigation */
  component?: React.ElementType;
  /** Click handler. The popover closes automatically after it runs. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * The footer action shown beneath the applications.
 */
export interface AppSwitcherFooterAction {
  /** Supporting text on the left (e.g. `"Manage Organization & Users, billing"`) */
  description?: React.ReactNode;
  /** Label of the trailing action (e.g. `"WSO2 Cloud Console"`) */
  label?: string;
  /** Destination URL for the trailing action */
  href?: string;
  /** Anchor target, only applied together with `href` */
  target?: string;
  /** Custom component for the action, e.g. a router `Link` */
  component?: React.ElementType;
  /** Click handler. The popover closes automatically after it runs. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Props for the AppSwitcher component.
 */
export interface AppSwitcherProps {
  /** Applications to switch between */
  apps: AppSwitcherItem[];
  /** Heading above the application grid (default: `"Platforms"`) */
  label?: string;
  /** Footer with supporting text and a link action. Omit to hide the footer. */
  footer?: AppSwitcherFooterAction;
  /** Tooltip and accessible label for the trigger (default: `"Switch app"`) */
  triggerLabel?: string;
  /** Custom trigger icon, replacing the default grid icon */
  triggerIcon?: React.ReactNode;
  /** Popover width in pixels from the `sm` breakpoint up (default: 440) */
  width?: number;
  /** Number of grid columns from the `sm` breakpoint up (default: 2) */
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
 * - Card buttons that render as links when given an `href`
 * - Current, disabled and status-chip states per application
 * - Responsive popover width (viewport-capped on mobile, fixed on desktop)
 *
 * @example
 * ```tsx
 * <Header.Actions>
 *   <AppSwitcher
 *     apps={[
 *       { key: 'agent', name: 'Agent', icon: <Bot size={20} />, status: 'Current', current: true },
 *       { key: 'apim', name: 'API Management', icon: <Braces size={20} />, status: 'Try Now', href: '/apim' },
 *     ]}
 *     footer={{
 *       description: 'Manage Organization & Users, billing',
 *       label: 'WSO2 Cloud Console',
 *       href: 'https://console.wso2.com',
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
  width = 440,
  columns = 2,
  'aria-label': ariaLabelProp,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = React.useId();

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
            description={footer.description}
            actionLabel={footer.label}
            href={footer.href}
            target={footer.target}
            component={footer.component}
            onActionClick={footer.onClick}
          />
        )}
      </AppSwitcherRoot>
    </AppSwitcherContext.Provider>
  );
};

AppSwitcher.displayName = 'AppSwitcher';

export default AppSwitcher;
