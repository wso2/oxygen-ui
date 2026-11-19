/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import { useColorScheme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export type ResolvedColorScheme = 'light' | 'dark';

/**
 * The color scheme on screen, `light` or `dark`, whatever the mode is.
 *
 * `mode` can be `system`, which only the operating system can resolve, so
 * code that picks colors by hand reads this and never compares `mode` itself.
 * Outside a color scheme provider it follows the theme's palette mode.
 */
export const useResolvedColorScheme = (): ResolvedColorScheme => {
  const { mode, colorScheme } = useColorScheme();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme();

  if (colorScheme) return colorScheme;
  if (mode === 'system') return prefersDark ? 'dark' : 'light';
  return mode ?? theme.palette.mode;
};

export default useResolvedColorScheme;
