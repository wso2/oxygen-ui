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
 *
 * Typography / sizing:
 * - `typography.body1` / `typography.body2` - Name and description text
 * - `spacing()` / `shape.borderRadius` - Icon tile dimensions
 *
 * The status chip keeps a compact height so a chip never out-weighs the app name
 * it sits beside, but takes its type scale from `typography.caption` rather than
 * a hardcoded size.
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
      ? // `mainChannel` keeps the tint on the CSS variable, so it follows a
        // color-scheme switch; `alpha()` would bake in the light-mode value.
        theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.06)`
        : alpha(theme.palette.primary.main, 0.06)
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
  // MUI only adds `.Mui-focusVisible` on ButtonBase; anchors and consumer
  // components need the native selector to get the same ring.
  '&.Mui-focusVisible, &:focus-visible': {
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
  width: theme.spacing(4.5),
  height: theme.spacing(4.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: (theme.vars || theme).palette.action.hover,
  color: (theme.vars || theme).palette.text.primary,
  '& svg': {
    display: 'block',
  },
}));

/**
 * Styled status chip shown at the top-right of the card.
 *
 * MUI's `size="small"` chip is 24px tall, which crowds the 36px icon tile and
 * competes with the app name. The compact height keeps the chip secondary.
 */
const AppSwitcherAppStatus = styled(Chip, {
  name: 'MuiAppSwitcher',
  slot: 'AppStatus',
})(({ theme }) => ({
  height: theme.spacing(2.5),
  fontSize: theme.typography.caption.fontSize,
  // The default small-chip padding is tuned for a 24px chip and looks
  // off-center once the height is reduced.
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
  },
}));

/**
 * Styled application name.
 */
const AppSwitcherAppName = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'AppName',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: AppSwitcherAppOwnerState }>(({ theme, ownerState }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.35,
  color: ownerState.disabled
    ? (theme.vars || theme).palette.text.disabled
    : (theme.vars || theme).palette.text.primary,
  // `minmax(0, 1fr)` grid tracks still let a long unbroken name push the card
  // wider, so wrap rather than overflow.
  overflowWrap: 'anywhere',
}));

/**
 * Styled optional description shown under the app name.
 */
const AppSwitcherAppDescription = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'AppDescription',
})(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  lineHeight: 1.4,
  color: (theme.vars || theme).palette.text.secondary,
  marginTop: theme.spacing(0.25),
  // Descriptions are optional supporting text; cap them at two lines so one
  // long entry cannot stretch its row and misalign the grid.
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
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
  /**
   * Extra props forwarded to `component`, for routers that use their own
   * navigation prop instead of `href` (e.g. React Router's `to`).
   */
  componentProps?: Record<string, unknown>;
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
      componentProps,
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
    };
    // Keep the reverse-tabnabbing guard out of the overridable props below so
    // `componentProps` cannot drop it on a `_blank` target.
    const relProps = target === '_blank' ? { rel: 'noopener noreferrer' } : {};
    const anchorProps =
      component && !disabled
        ? { component, ...linkProps, ...componentProps, ...relProps }
        : renderAsLink
          ? { component: 'a' as React.ElementType, ...linkProps, ...relProps }
          : { component: ButtonBase as React.ElementType };

    // Unavailable apps stay focusable so they remain discoverable to screen
    // reader users; `aria-disabled` plus the click guard convey the state
    // without dropping the card out of the tab order. A disabled card falls
    // through to the ButtonBase branch above, so it is a real `<button>` and
    // keeps its own `tabIndex` and keyboard activation.
    //
    // Space on a button also scrolls the popover unless it is swallowed here;
    // the resulting click is already blocked by `handleClick`.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
      }
    };

    return (
      <AppSwitcherAppRoot
        {...props}
        {...anchorProps}
        ref={ref as React.Ref<HTMLDivElement>}
        ownerState={ownerState}
        variant="outlined"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-app-switcher-app=""
        aria-current={current ? 'true' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        sx={sx}
      >
        <AppSwitcherAppHeader>
          {icon && <AppSwitcherAppIcon aria-hidden="true">{icon}</AppSwitcherAppIcon>}
          {status && <AppSwitcherAppStatus label={status} size="small" color={statusColor} />}
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
