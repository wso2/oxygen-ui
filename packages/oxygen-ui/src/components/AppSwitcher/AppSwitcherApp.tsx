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
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { useAppSwitcher } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` / `action.hover` - Card surfaces
 * - `primary.main` - Selected (current) border, tint and focus ring
 * - `divider` - Resting card border
 * - `text.primary` / `text.secondary` / `text.disabled` - Typography
 *
 * Elevation:
 * - `shadows[1]` - Hover elevation, matching `Form.CardButton`
 */

/**
 * Status chip variants supported by an app card.
 */
export type AppSwitcherAppStatusColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

interface AppSwitcherAppOwnerState {
  current: boolean;
  disabled: boolean;
}

/**
 * Props for the styled root, which renders polymorphically as either an anchor
 * or a `ButtonBase` depending on whether `href` is supplied.
 */
interface AppSwitcherAppRootProps extends Omit<React.ComponentProps<typeof Card>, 'component'> {
  ownerState: AppSwitcherAppOwnerState;
  component?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Styled card button for an application entry.
 *
 * Hover and focus styling mirrors `Form.CardButton` so app cards feel
 * consistent with the rest of the design system.
 */
const AppSwitcherAppRoot = styled(Card, {
  name: 'MuiAppSwitcher',
  slot: 'App',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<AppSwitcherAppRootProps>(({ theme, ownerState }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  gap: theme.spacing(1.5),
  width: '100%',
  height: '100%',
  padding: theme.spacing(1.5),
  textAlign: 'left',
  transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&.MuiCard-root': {
    borderColor: ownerState.current
      ? (theme.vars || theme).palette.primary.main
      : (theme.vars || theme).palette.divider,
    backgroundColor: ownerState.current
      ? alpha(theme.palette.primary.main, 0.06)
      : (theme.vars || theme).palette.background.paper,
  },
  ...(ownerState.disabled && {
    cursor: 'not-allowed',
  }),
  '&:hover': {
    ...(!ownerState.disabled && {
      borderColor: (theme.vars || theme).palette.primary.main,
      boxShadow: theme.shadows[1],
    }),
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
    outlineOffset: 2,
  },
}));

/**
 * Styled top row holding the app icon and the status chip.
 */
const AppSwitcherAppHeader = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'AppHeader',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

/**
 * Styled tinted square holding the app icon.
 */
const AppSwitcherAppIcon = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'AppIcon',
})(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 36,
  height: 36,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: (theme.vars || theme).palette.action.hover,
  color: (theme.vars || theme).palette.text.primary,
  '& svg': {
    display: 'block',
  },
}));

/**
 * Styled status chip shown at the top-right of the card.
 */
const AppSwitcherAppStatus = styled(Chip, {
  name: 'MuiAppSwitcher',
  slot: 'AppStatus',
})({
  height: 20,
  fontSize: 11,
});

/**
 * Styled application name.
 */
const AppSwitcherAppName = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'AppName',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: AppSwitcherAppOwnerState }>(({ theme, ownerState }) => ({
  fontSize: 14,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.35,
  color: ownerState.disabled
    ? (theme.vars || theme).palette.text.disabled
    : (theme.vars || theme).palette.text.primary,
}));

/**
 * Styled optional description shown under the app name.
 */
const AppSwitcherAppDescription = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'AppDescription',
})(({ theme }) => ({
  fontSize: 12,
  lineHeight: 1.4,
  color: (theme.vars || theme).palette.text.secondary,
  marginTop: theme.spacing(0.25),
}));

/**
 * Props for the AppSwitcher.App component.
 */
export interface AppSwitcherAppProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'onClick'> {
  /** Application name (e.g. `"API Management"`) */
  name: string;
  /** Application icon, typically a 20px icon element */
  icon?: React.ReactNode;
  /** Optional supporting text shown under the name */
  description?: string;
  /** Status label rendered as a chip (e.g. `"Current"`, `"Try Now"`, `"Coming soon"`) */
  status?: string;
  /** Color of the status chip (default: `"default"`) */
  statusColor?: AppSwitcherAppStatusColor;
  /** Marks the app the user is currently in, highlighting the card */
  current?: boolean;
  /** Disables navigation, e.g. for apps that are not yet available */
  disabled?: boolean;
  /**
   * Custom root component, e.g. a router `Link`, for client-side navigation.
   * Router-specific props such as `to` are forwarded through.
   *
   * @example
   * component={Link} to="/apim"
   */
  component?: React.ElementType;
  /** Destination URL. When set, the card renders as an anchor. */
  href?: string;
  /** Anchor target, only applied together with `href` */
  target?: string;
  /** Click handler. The popover closes automatically after it runs. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional sx props */
  sx?: SxProps<Theme>;
}

/**
 * AppSwitcher.App - Card button for a single application in the switcher.
 *
 * Renders as an anchor when `href` is provided and as a button otherwise, so
 * links keep native browser affordances (middle-click, open in new tab).
 * Selecting an app closes the popover.
 *
 * @example
 * ```tsx
 * <AppSwitcher.App
 *   name="API Management"
 *   icon={<Braces size={20} />}
 *   status="Try Now"
 *   href="https://console.example.com/apim"
 * />
 * ```
 */
export const AppSwitcherApp = React.forwardRef<HTMLElement, AppSwitcherAppProps>(
  function AppSwitcherApp(
    {
      name,
      icon,
      description,
      status,
      statusColor = 'default',
      current = false,
      disabled = false,
      component,
      href,
      target,
      onClick,
      sx,
      ...props
    },
    ref
  ) {
    const { handleClose } = useAppSwitcher();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
      handleClose();
    };

    const ownerState = { current, disabled };

    // A consumer-supplied `component` (typically a router Link) wins, so
    // client-side navigation works without the library depending on a router.
    // Otherwise render a real anchor when navigable, so middle-click and
    // "open in new tab" keep working. `rel` guards against reverse tabnabbing.
    const renderAsLink = Boolean(href) && !disabled;
    const linkProps = {
      ...(href && { href }),
      ...(target && { target }),
      ...(target === '_blank' && { rel: 'noopener noreferrer' }),
    };
    const anchorProps =
      component && !disabled
        ? { component, ...linkProps }
        : renderAsLink
          ? { component: 'a' as React.ElementType, ...linkProps }
          : { component: ButtonBase as React.ElementType };

    // Unavailable apps stay focusable so they remain discoverable to screen
    // reader users; `aria-disabled` plus the click guard convey the state
    // without dropping the card out of the tab order.

    return (
      <AppSwitcherAppRoot
        {...props}
        {...anchorProps}
        ref={ref as React.Ref<HTMLDivElement>}
        ownerState={ownerState}
        variant="outlined"
        onClick={handleClick}
        aria-current={current ? 'true' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        sx={sx}
      >
        <AppSwitcherAppHeader>
          {icon && <AppSwitcherAppIcon aria-hidden="true">{icon}</AppSwitcherAppIcon>}
          {status && (
            <AppSwitcherAppStatus label={status} size="small" color={statusColor} />
          )}
        </AppSwitcherAppHeader>
        <Box>
          <AppSwitcherAppName ownerState={ownerState}>{name}</AppSwitcherAppName>
          {description && <AppSwitcherAppDescription>{description}</AppSwitcherAppDescription>}
        </Box>
      </AppSwitcherAppRoot>
    );
  }
);

AppSwitcherApp.displayName = 'AppSwitcher.App';

export default AppSwitcherApp;
