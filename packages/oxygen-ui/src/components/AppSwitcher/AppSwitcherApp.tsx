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
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { APP_SWITCHER_BRAND } from './brand';
import { AppSwitcherFooterContext } from './context';
import { WSO2 } from '@wso2/oxygen-ui-icons-react';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `background.paper` / `action.hover` - Card and tile surfaces
 * - `divider` - Resting card border
 * - `text.primary` / `text.secondary` / `text.disabled` - Typography
 *
 * Elevation:
 * - `shadows[2]` - Hover elevation
 *
 * Typography / sizing:
 * - `typography.body2` - Name text
 * - `spacing()` / `shape.borderRadius` - Card and tile dimensions
 *
 * Layout follows the agreed WSO2 Cloud design: the mark sits centered above a
 * centered name. A card is a destination, so its whole
 * surface is the hit target.
 */

/**
 * Visual treatments a card can take.
 *
 * - `platform` - Large brand-colored mark, used for the platform grid
 * - `manage`   - Smaller neutral mark on a grey disc, used for the manage row
 */
export type AppSwitcherAppTone = 'platform' | 'manage';

interface AppSwitcherAppOwnerState {
  disabled: boolean;
  tone: AppSwitcherAppTone;
}

/**
 * Props for the styled root, which renders polymorphically as either an anchor
 * or a `ButtonBase` depending on whether `url` is supplied.
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
 * The card lifts slightly on hover and gains a shadow, so a pointer user gets
 * the same "this is clickable" signal the design shows without relying on color
 * alone. The lift is suppressed under `prefers-reduced-motion`.
 */
const AppSwitcherAppRoot = styled(Card, {
  name: 'MuiAppSwitcher',
  slot: 'App',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<AppSwitcherAppRootProps>(({ theme, ownerState }) => {
  // The switcher is WSO2 Cloud chrome, so its accent is the brand orange even
  // when the surrounding product runs a different palette.
  const accent = APP_SWITCHER_BRAND.main;
  const manage = ownerState.tone === 'manage';

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // The manage row is a denser, secondary version of the same card: a smaller
    // mark, tighter gap and less height, so it reads as settings rather than as
    // another row of products.
    gap: theme.spacing(manage ? 0.75 : 1.25),
    width: '100%',
    // A fixed height rather than a floor, so every card in the switcher is the
    // same size whether its name runs to one line or two. The name itself is
    // clamped to two lines, so nothing can outgrow the box.
    height: theme.spacing(manage ? 9 : 13),
    padding: manage ? theme.spacing(1, 1) : theme.spacing(1.25, 1),
    textAlign: 'center',
    // A navigable card renders as an `<a>`, which underlines its text by
    // default. The card is the link target, not the words, so the underline is
    // cleared here rather than on the name alone.
    textDecoration: 'none',
    transition: theme.transitions.create(
      ['border-color', 'box-shadow', 'background-color', 'transform'],
      { duration: theme.transitions.duration.shorter },
    ),
    '&.MuiCard-root': {
      borderColor: (theme.vars || theme).palette.divider,
      backgroundColor: (theme.vars || theme).palette.background.paper,
    },
    // An unavailable platform keeps the same solid outline as every other card
    // and is set apart by its faded mark, muted label and tinted surface.
    ...(ownerState.disabled && {
      cursor: 'not-allowed',
      '&.MuiCard-root': {
        borderColor: (theme.vars || theme).palette.divider,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    }),
    '&:hover': {
      ...(!ownerState.disabled && {
        borderColor: accent,
        boxShadow: theme.shadows[2],
        transform: 'translateY(-2px)',
      }),
    },
    // MUI only adds `.Mui-focusVisible` on ButtonBase; anchors and consumer
    // components need the native selector to get the same ring.
    '&.Mui-focusVisible, &:focus-visible': {
      // The focus ring uses the darker brand token so it clears the 3:1 that
      // WCAG 2.1 SC 1.4.11 asks of an author-defined focus indicator.
      outline: `2px solid ${APP_SWITCHER_BRAND.focus}`,
      outlineOffset: 2,
    },
    // Motion is decoration here; the border and shadow still carry the state.
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover': {
        transform: 'none',
      },
    },
  };
});

/**
 * Styled holder for the app mark.
 *
 * Platform marks are the WSO2 logo and carry no backplate, matching the
 * design; manage marks sit on a neutral disc so the two rows read as different
 * kinds of destination.
 */
const AppSwitcherAppIcon = styled(Box, {
  name: 'MuiAppSwitcher',
  slot: 'AppIcon',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: AppSwitcherAppOwnerState }>(({ theme, ownerState }) => {
  const manage = ownerState.tone === 'manage';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    // The manage glyph sits on a fixed disc. The platform mark is the artwork
    // itself with no backplate, so it is sized by the icon rather than by a box.
    ...(manage && {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    }),
    borderRadius: '50%',
    backgroundColor: manage ? (theme.vars || theme).palette.action.hover : 'transparent',
    // The WSO2 mark is brand artwork rather than a themed accent, so it stays
    // orange; manage glyphs are neutral so they read as settings.
    color: manage ? (theme.vars || theme).palette.text.secondary : APP_SWITCHER_BRAND.main,
    // A faded mark is the only tint an unavailable platform keeps.
    ...(ownerState.disabled && {
      color: manage
        ? (theme.vars || theme).palette.text.disabled
        : APP_SWITCHER_BRAND.surfaceMark,
    }),
    '& svg': {
      display: 'block',
    },
  };
});

/**
 * Styled application name.
 */
const AppSwitcherAppName = styled(Typography, {
  name: 'MuiAppSwitcher',
  slot: 'AppName',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: AppSwitcherAppOwnerState }>(({ theme, ownerState }) => ({
  // Both rows take the same size; the manage row stays secondary through its
  // lighter weight and smaller mark rather than through a smaller label.
  fontSize: theme.typography.body2.fontSize,
  fontWeight:
    ownerState.tone === 'manage'
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  lineHeight: 1.35,
  // Grey rather than full-strength text: the mark carries the card, and the
  // names sit a step back from it.
  color: ownerState.disabled
    ? (theme.vars || theme).palette.text.disabled
    : (theme.vars || theme).palette.text.secondary,
  // `minmax(0, 1fr)` grid tracks still let a long unbroken name push the card
  // wider, so wrap rather than overflow.
  overflowWrap: 'anywhere',
  // The card is a fixed height, so a long name is clamped instead of spilling
  // past the border. The manage row is sized for a single line, the platform
  // row for two.
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: ownerState.tone === 'manage' ? 1 : 2,
  overflow: 'hidden',
}));

/**
 * Props for the AppSwitcher.App component.
 */
export interface AppSwitcherAppProps {
  /** Application name (e.g. `"API Platform"`) */
  name: string;
  /** Destination URL. The card renders as an anchor pointing at it. */
  url?: string;
  /** Mark shown above the name (default: the WSO2 logo) */
  icon?: React.ReactNode;
  /** Visual treatment (default: `"manage"` inside the footer, `"platform"` elsewhere) */
  tone?: AppSwitcherAppTone;
  /** Disables navigation, e.g. for platforms that are not yet available */
  disabled?: boolean;
  /**
   * Tooltip shown on hover and focus, typically explaining why a card is
   * unavailable (e.g. `"Coming soon"`). Omit for no tooltip.
   */
  tooltip?: React.ReactNode;
  /**
   * Custom root component, e.g. a router `Link`, for client-side navigation.
   * Router-specific props such as `to` are forwarded through.
   *
   * @example
   * component={Link} componentProps={{ to: '/apim' }}
   */
  component?: React.ElementType;
  /**
   * Extra props forwarded to `component`, for routers that use their own
   * navigation prop instead of `href` (e.g. React Router's `to`).
   */
  componentProps?: Record<string, unknown>;
  /** Anchor target (default: `"_blank"`, so platforms open in a new tab) */
  target?: string;
  /** Click handler. The popover stays open after it runs. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * AppSwitcher.App - Card button for a single destination in the switcher.
 *
 * Renders as an anchor when `url` is provided and as a button otherwise, so
 * links keep native browser affordances (middle-click, open in new tab).
 * Selecting a card leaves the popover open, since the card opens in a new tab.
 *
 * A `tooltip` explains a card's state on hover and focus — most often why an
 * unavailable platform cannot be opened. Because unavailable cards carry
 * `aria-disabled` rather than the native `disabled` attribute, they still
 * receive pointer events, so the tooltip works on them.
 *
 * @example
 * ```tsx
 * <AppSwitcher.App name="API Platform" url="https://api.wso2.com" />
 * <AppSwitcher.App name="Analytics Platform" disabled tooltip="Coming soon" />
 * ```
 */
export const AppSwitcherApp = React.forwardRef<HTMLElement, AppSwitcherAppProps>(
  function AppSwitcherApp(
    {
      name,
      url,
      icon,
      tone: toneProp,
      disabled = false,
      tooltip,
      component,
      componentProps,
      target = '_blank',
      onClick,
    },
    ref,
  ) {
    // The footer's cards take the manage treatment by default, so a composed
    // card matches a `links`-driven one without repeating `tone`.
    const inFooter = React.useContext(AppSwitcherFooterContext);
    const tone = toneProp ?? (inFooter ? 'manage' : 'platform');

    // Selecting a card deliberately leaves the popover open: cards open in a new
    // tab, so the current tab does not navigate and closing would look like the
    // switcher had dismissed itself for no reason. This matches the behavior of
    // other app-grid switchers, where only the trigger, an outside click or
    // Escape dismisses the popover.
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const ownerState = { disabled, tone };

    // A consumer-supplied `component` (typically a router Link) wins, so
    // client-side navigation works without the library depending on a router.
    // Otherwise render a real anchor when navigable, so middle-click and
    // "open in new tab" keep working. `rel` guards against reverse tabnabbing.
    const renderAsLink = Boolean(url) && !disabled;
    // `componentProps` may carry its own `target`, so the guard below is derived
    // from whichever target actually reaches the rendered element rather than
    // from the `target` prop alone.
    const effectiveTarget =
      typeof componentProps?.target === 'string' ? componentProps.target : target;
    const linkProps = {
      ...(url && { href: url }),
      ...(effectiveTarget && { target: effectiveTarget }),
    };
    // Keep the reverse-tabnabbing guard out of the overridable props below so
    // `componentProps` cannot drop it on a `_blank` target.
    const relProps = effectiveTarget === '_blank' ? { rel: 'noopener noreferrer' } : {};
    const anchorProps =
      component && !disabled
        ? { component, ...componentProps, ...linkProps, ...relProps }
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

    const card = (
      <AppSwitcherAppRoot
        {...anchorProps}
        ref={ref as React.Ref<HTMLDivElement>}
        ownerState={ownerState}
        variant="outlined"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-app-switcher-app=""
        aria-disabled={disabled ? 'true' : undefined}
      >
        <AppSwitcherAppIcon ownerState={ownerState} aria-hidden="true">
          {icon ?? <WSO2 size={tone === 'manage' ? 16 : 32} />}
        </AppSwitcherAppIcon>
        <AppSwitcherAppName ownerState={ownerState}>{name}</AppSwitcherAppName>
      </AppSwitcherAppRoot>
    );

    // `describeChild` because the card already has its own accessible name from
    // the platform name: the tooltip describes it rather than replacing it.
    return tooltip ? (
      <Tooltip title={tooltip} describeChild>
        {card}
      </Tooltip>
    ) : (
      card
    );
  },
);

AppSwitcherApp.displayName = 'AppSwitcher.App';

export default AppSwitcherApp;
