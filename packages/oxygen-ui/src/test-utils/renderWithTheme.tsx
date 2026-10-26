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
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import OxygenUIThemeProvider from '../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';

export type RenderWithThemeOptions = Omit<RenderOptions, 'wrapper'> & {
  /**
   * Optional theme passed to OxygenUIThemeProvider. Omit to use the default
   * Oxygen theme. Not a global Vitest setup — pass per call.
   */
  theme?: Theme;
};

/**
 * Testing Library render wrapped in OxygenUIThemeProvider.
 * The shared consumer seam for colocated first-party tests.
 */
export function renderWithTheme(
  ui: ReactElement,
  { theme, ...options }: RenderWithThemeOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <OxygenUIThemeProvider theme={theme}>{children}</OxygenUIThemeProvider>
    );
  }

  return render(ui, { ...options, wrapper: Wrapper });
}
