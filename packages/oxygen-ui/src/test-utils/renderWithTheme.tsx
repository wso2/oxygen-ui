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
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { Theme } from '@mui/material/styles';
import OxygenUIThemeProvider from '../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';

export interface RenderWithThemeOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Optional theme override for cases like ThemeSwitcher and color-scheme
   * tests. When omitted, the provider default is used. This is an opt-in
   * per-render argument, not a global Vitest setup.
   */
  theme?: Theme;
}

/**
 * Shared render helper for colocated behaviour tests. Wraps Testing Library
 * `render` with the existing `OxygenUIThemeProvider` so every family hits
 * the same consumer seam.
 */
export function renderWithTheme(
  ui: React.ReactElement,
  { theme, ...options }: RenderWithThemeOptions = {},
): RenderResult {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <OxygenUIThemeProvider theme={theme}>{children}</OxygenUIThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export default renderWithTheme;
