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

import { extendTheme, type Theme, type ThemeOptions } from '@mui/material/styles';
import OxygenThemeBase, { type OxygenTheme } from '../styles/Themes/OxygenThemeBase';

/**
 * Creates an Oxygen UI theme by extending a base theme with custom configuration.
 * 
 * This utility function simplifies theme creation by handling the theme extension
 * logic and ensuring proper TypeScript typing. It extends OxygenThemeBase by default,
 * but allows specifying a different base theme if needed.
 * 
 * @param config - Partial theme configuration to merge with the base theme
 * @param baseTheme - Optional base theme to extend from. Defaults to OxygenThemeBase
 * @returns A fully configured OxygenTheme
 * 
 * @example
 * ```typescript
 * // Create a theme extending OxygenThemeBase
 * const MyTheme = createOxygenTheme({
 *   colorSchemes: {
 *     light: {
 *       palette: {
 *         primary: { main: '#ff0000' }
 *       }
 *     }
 *   }
 * });
 * 
 * // Create a theme extending AcrylicOrangeTheme
 * const MyCustomTheme = createOxygenTheme({
 *   components: {
 *     MuiButton: {
 *       styleOverrides: {
 *         root: { borderRadius: 8 }
 *       }
 *     }
 *   }
 * }, AcrylicOrangeTheme);
 * ```
 */
export function createOxygenTheme(
  config?: Partial<ThemeOptions> | Record<string, unknown>,
  baseTheme: Theme = OxygenThemeBase
): OxygenTheme {
  return extendTheme(baseTheme, config ?? {}) as OxygenTheme;
}
