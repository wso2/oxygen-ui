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

import { createTheme, useTheme } from '@mui/material/styles';
import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { renderWithTheme } from './renderWithTheme';

/**
 * Reads theme tokens into the accessibility tree so tests lock the helper
 * seam without scraping computed CSS.
 */
function ThemeProbe() {
  const theme = useTheme();
  return (
    <output>
      {theme.shape.borderRadius}:{theme.palette.primary.main}
    </output>
  );
}

describe('renderWithTheme', () => {
  afterEach(() => {
    cleanup();
  });

  it('wraps the tree in the default Oxygen theme', () => {
    const { getByRole } = renderWithTheme(<ThemeProbe />);
    // Fingerprint that OxygenUIThemeProvider wrapped the tree: Acrylic
    // radius is 12. Bare MUI ThemeProvider / no wrap is 4.
    expect(getByRole('status').textContent).toMatch(/^12:/);
  });

  it('applies an optional theme override', () => {
    const theme = createTheme({
      palette: { primary: { main: '#112233' } },
      shape: { borderRadius: 7 },
    });
    const { getByRole } = renderWithTheme(<ThemeProbe />, { theme });
    expect(getByRole('status')).toHaveProperty('textContent', '7:#112233');
  });
});
