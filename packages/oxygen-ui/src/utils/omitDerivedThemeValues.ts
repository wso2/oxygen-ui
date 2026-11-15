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
 */
const DERIVED_THEME_KEYS: readonly string[] = ['font'];

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
