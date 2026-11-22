/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import type {Theme} from '@mui/material/styles';
import {JSX, useMemo} from 'react';
import ColorSchemeSVG, {type ColorSchemeSVGProps} from '../ColorSchemeSVG';
import illustrationStyles from './illustrationStyles';
import {STATUS_ILLUSTRATIONS, type StatusIllustrationStatus} from './illustrations';
import type {IllustrationSVGProps} from './types';

export type {
  StatusIllustrationHttpStatus,
  StatusIllustrationState,
  StatusIllustrationStatus,
} from './illustrations';

export interface StatusIllustrationProps
  extends Omit<ColorSchemeSVGProps, 'svg' | 'children' | 'viewBox' | 'preserveAspectRatio' | 'xmlns' | 'xmlnsXlink'> {
  /**
   * The status to illustrate: an HTTP status code (`404`, `500`, ...)
   * or an application state (`'no-records'`, `'failed'`, `'unsuccessful'`, `'mail-sent'`).
   */
  status: StatusIllustrationStatus;
  /**
   * Accessible label read by screen readers. Defaults to the status name, such as "404 Not found".
   */
  label?: string;
  /**
   * Hide the illustration from assistive technology, for when nearby text already says the same thing.
   * @default false
   */
  decorative?: boolean;
}

/**
 * Maps the illustration colour variables to the theme palette. Uses the theme's CSS variables,
 * so the illustration follows light and dark mode without re-rendering.
 */
const paletteVariables = (theme: Theme) => {
  const {palette} = theme.vars ?? theme;

  return {
    // Blue base with the brand colour as the decorative accent, following the illustrations' design.
    // Danger (the 5xx and failure cores, error badges) uses the theme's error colour.
    '--illustration-primary': palette.blue.main,
    // Edge shading on the cores. Mixed rather than read from `blue.dark`, which the palette doesn't define.
    '--illustration-shade': `color-mix(in srgb, ${palette.blue.main} 45%, #000)`,
    // White in both schemes: the dark scheme's blue contrastText is navy, which hides the core icons
    '--illustration-on-primary': palette.common.white,
    '--illustration-accent': palette.primary.main,
    '--illustration-danger': palette.error.main,
    '--illustration-success': palette.success.main,
    '--illustration-warning': palette.warning.main,
    '--illustration-on-warning': palette.warning.contrastText,
    // A slate grey (grey tinted with the blue), opaque so the glow behind the 4xx cores doesn't tint them
    '--illustration-neutral': `color-mix(in srgb, ${palette.grey[600]} 85%, ${palette.blue.main})`,
    '--illustration-ink': palette.text.primary,
    // Satellite cards. Prefer the theme's card colour, made opaque so the orbits don't show through
    // translucent (acrylic) papers; fall back to the page background where relative colours aren't supported.
    '--illustration-surface': palette.background.default,
    '@supports (color: rgb(from red r g b))': {
      '--illustration-surface': `rgb(from ${palette.background.paper} r g b)`,
    },
    '--illustration-glow': 0.14,
    ...theme.applyStyles('dark', {'--illustration-glow': 0.2}),
  };
};

/**
 * Themable illustrations for HTTP status codes and common application states, such as error pages,
 * empty states and confirmation screens. Renders through `ColorSchemeSVG` and takes its colours from
 * the theme palette, so it matches the active theme in both light and dark mode.
 *
 * Any colour can be overridden by setting its CSS variable through `sx`: `--illustration-primary`,
 * `--illustration-accent`, `--illustration-danger`, `--illustration-success`, `--illustration-warning`, `--illustration-neutral`,
 * `--illustration-ink`, `--illustration-surface`, `--illustration-on-primary`, `--illustration-on-warning`,
 * `--illustration-shade` and `--illustration-glow` (opacity of the background glow).
 *
 * @example
 * ```tsx
 * <StatusIllustration status={404} />
 * ```
 *
 * @example
 * ```tsx
 * // Next to a heading that already describes the state
 * <StatusIllustration status="no-records" width={240} decorative />
 * <Typography variant="h5">No records found</Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Override a colour
 * <StatusIllustration status={500} sx={{'--illustration-danger': '#d32f2f'}} />
 * ```
 */
export default function StatusIllustration({
  status,
  label,
  decorative = false,
  width = 400,
  height,
  sx,
  ...rest
}: StatusIllustrationProps): JSX.Element | null {
  const illustration = STATUS_ILLUSTRATIONS[status];
  const Illustration = illustration?.component;
  const accessibleLabel = label ?? illustration?.label;

  // ColorSchemeSVG only forwards width and height to the SVG, so bind the accessibility attributes here.
  // Memoised so the SVG isn't remounted on every render.
  const svg = useMemo(() => {
    if (!Illustration) {
      return undefined;
    }

    const a11yProps: IllustrationSVGProps = decorative
      ? {role: undefined, 'aria-label': undefined, 'aria-hidden': true, focusable: false}
      : {'aria-label': accessibleLabel};

    function BoundIllustration(props: IllustrationSVGProps): JSX.Element {
      return <Illustration {...props} {...a11yProps} />;
    }

    return BoundIllustration;
  }, [Illustration, accessibleLabel, decorative]);

  if (!svg) {
    return null;
  }

  // Keep the 4:3 aspect ratio when only the width is given.
  const resolvedHeight = height ?? (typeof width === 'number' ? (width * 3) / 4 : 'auto');

  return (
    <ColorSchemeSVG
      svg={svg}
      width={width}
      height={resolvedHeight}
      sx={{
        '&': paletteVariables,
        ...illustrationStyles,
        maxWidth: '100%',
        // Scale down in narrow containers, keeping the aspect ratio unless a height was set.
        '& svg': {maxWidth: '100%', ...(height === undefined && {height: 'auto'})},
        ...sx,
      }}
      {...rest}
    />
  );
}
