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

import type { Theme } from '@mui/material/styles';

/**
 * Theme values that extendTheme derives from other parts of the theme, and keeps as they are when
 * they are already present:
 * - `font`: the font CSS variables, derived from the typography.
 * - the `...Channel` strings of the palette colors, such as `mainChannel`, derived from the color. See
 *   omitPaletteChannels.
 */
const DERIVED_THEME_KEYS: readonly string[] = ['font'];

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const omitChannels = (palette: Record<string, unknown>): Record<string, unknown> => {
  const kept: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(palette)) {
    if (key.endsWith('Channel') && typeof value === 'string') continue;
    kept[key] = isPlainObject(value) ? omitChannels(value) : value;
  }

  return kept;
};

/**
 * Returns the color schemes of a built theme without the channels of their palette colors. A channel is derived
 * from its color, so a theme that extends a built theme and changes a color would otherwise keep the channel
 * of the color it replaced, and anything tinted from the channel, such as a hover background, would use the
 * old color. A channel the extending theme sets itself is kept: it is merged in after this.
 */
const omitPaletteChannels = (colorSchemes: Record<string, unknown>): Record<string, unknown> => {
  const schemes: Record<string, unknown> = {};

  for (const [scheme, values] of Object.entries(colorSchemes)) {
    schemes[scheme] = isPlainObject(values) && isPlainObject(values.palette) ? { ...values, palette: omitChannels(values.palette) } : values;
  }

  return schemes;
};

/**
 * The values each theme was explicitly given for the derived keys, as opposed to the ones derived for it.
 */
const explicitThemeValues = new WeakMap<Theme, Record<string, unknown>>();

/**
 * Returns a copy of a built theme without the values that were derived from the theme itself, so that
 * extendTheme derives them again when the theme is extended. Values the theme was explicitly given,
 * see rememberExplicitThemeValues, are kept: extendTheme applies them over the derived ones.
 */
export function omitDerivedThemeValues(theme: Theme): Partial<Theme> {
  const values: Record<string, unknown> = { ...theme };
  if (isPlainObject(values.colorSchemes)) values.colorSchemes = omitPaletteChannels(values.colorSchemes);
  const explicit = explicitThemeValues.get(theme) ?? {};
  DERIVED_THEME_KEYS.forEach((key) => {
    if (key in explicit) {
      values[key] = explicit[key];
    } else {
      delete values[key];
    }
  });
  return values;
}

/**
 * Remembers the values for the derived keys in the options a theme was built from, so that they
 * survive omitDerivedThemeValues when the theme is extended.
 */
export function rememberExplicitThemeValues(theme: Theme, options: Record<string, unknown>): void {
  const explicit: Record<string, unknown> = {};
  DERIVED_THEME_KEYS.forEach((key) => {
    if (options[key] !== undefined) {
      explicit[key] = options[key];
    }
  });
  explicitThemeValues.set(theme, explicit);
}
