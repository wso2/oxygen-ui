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
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { createTheme, useTheme } from '@mui/material/styles';
import { renderWithTheme } from './renderWithTheme';
import defaultTheme from '../styles/Themes/AcrylicBaseTheme';

const overrideTheme = createTheme({
  palette: { primary: { main: 'rgb(1, 2, 3)' } },
});

function ThemeProbe() {
  const theme = useTheme();
  return <div data-testid="theme-probe">{theme.palette.primary.main}</div>;
}

afterEach(() => {
  cleanup();
});

describe('renderWithTheme', () => {
  it('renders children inside the Oxygen theme provider by default', () => {
    renderWithTheme(<ThemeProbe />);

    // Without the provider, useTheme() falls back to MUI's default theme
    // (primary.main '#1976d2'), so matching the default Oxygen theme value
    // proves the default-provider branch was applied. The expected value is
    // read from the default theme module instead of hardcoding the brand
    // hex, so a brand refresh does not break this helper-mechanics test.
    expect(screen.getByTestId('theme-probe').textContent).toBe(
      defaultTheme.palette.primary.main,
    );
  });

  it('accepts an optional theme override instead of a global setup', () => {
    renderWithTheme(<ThemeProbe />, { theme: overrideTheme });

    expect(screen.getByTestId('theme-probe').textContent).toBe('rgb(1, 2, 3)');
  });
});
