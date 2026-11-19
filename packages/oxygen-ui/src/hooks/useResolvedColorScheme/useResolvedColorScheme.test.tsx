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

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useResolvedColorScheme } from './useResolvedColorScheme';

const systemPrefersDark = (dark: boolean) =>
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: dark && query.includes('dark'),
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
  }));

const theme = createTheme({ colorSchemes: { light: true, dark: true } });

const inMode = (mode: 'light' | 'dark' | 'system') => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme} defaultMode={mode}>
      {children}
    </ThemeProvider>
  );
  return renderHook(() => useResolvedColorScheme(), { wrapper }).result.current;
};

beforeEach(() => localStorage.clear());
afterEach(() => vi.unstubAllGlobals());

describe('useResolvedColorScheme', () => {
  it('resolves the system mode to dark when the system prefers dark', () => {
    systemPrefersDark(true);
    expect(inMode('system')).toBe('dark');
  });

  it('resolves the system mode to light when the system prefers light', () => {
    systemPrefersDark(false);
    expect(inMode('system')).toBe('light');
  });

  it('follows an explicit mode, whatever the system prefers', () => {
    systemPrefersDark(true);
    expect(inMode('light')).toBe('light');
    systemPrefersDark(false);
    expect(inMode('dark')).toBe('dark');
  });

  it('follows the theme palette outside a color scheme provider', () => {
    systemPrefersDark(true);
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>{children}</ThemeProvider>
    );
    expect(renderHook(() => useResolvedColorScheme(), { wrapper }).result.current).toBe('dark');
  });
});
