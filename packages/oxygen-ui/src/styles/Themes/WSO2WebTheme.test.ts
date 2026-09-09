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

import { describe, it, expect } from 'vitest';
import WSO2WebTheme from './WSO2WebTheme';

/**
 * The source designs declare one palette in their token block and render a different one
 * in their markup. These tests pin the rendered palette, which is the one the theme
 * reproduces, so the two colours never get swapped back.
 */
describe('WSO2WebTheme role mapping', () => {
  it('uses the orange-red action colour as primary, not as error', () => {
    const { palette } = WSO2WebTheme.colorSchemes.light;

    expect(palette.primary.main).toBe('#D32F00');
    expect(palette.error.main).not.toBe('#D32F00');
    expect(palette.error.main).toBe('#D93025');
  });

  it('keeps the console blue informational rather than secondary', () => {
    const { palette } = WSO2WebTheme.colorSchemes.light;

    expect(palette.info.main).toBe('#3866F3');
    expect(palette.secondary.main).not.toBe('#3866F3');
  });

  it('renders alternate actions as near-white with deep indigo type', () => {
    const { palette } = WSO2WebTheme.colorSchemes.light;

    expect(palette.secondary.main).toBe('#FFFFFF');
    expect(palette.secondary.contrastText).toBe('#02074B');
  });

  it('gives amber a dark contrast text, since white on it fails AA', () => {
    expect(WSO2WebTheme.colorSchemes.light.palette.warning.contrastText).toBe('#000000');
  });
});

describe('WSO2WebTheme colour schemes', () => {
  it('defines both light and dark schemes', () => {
    expect(WSO2WebTheme.colorSchemes.light).toBeDefined();
    expect(WSO2WebTheme.colorSchemes.dark).toBeDefined();
  });

  it('lifts accents in dark mode so they stay legible on the navy surfaces', () => {
    const { palette } = WSO2WebTheme.colorSchemes.dark;

    expect(palette.background.default).toBe('#1A2740');
    expect(palette.primary.main).toBe('#FF6E47');
    expect(palette.info.main).toBe('#8FB0FF');
  });

  it('keeps shell surfaces near-opaque so the mesh background stays subtle', () => {
    expect(WSO2WebTheme.colorSchemes.light.palette.background.paper).toBe(
      'rgba(255,255,255,0.92)'
    );
    expect(WSO2WebTheme.colorSchemes.dark.palette.background.paper).toBe(
      'rgba(26,39,64,0.92)'
    );
  });
});

describe('WSO2WebTheme shape', () => {
  it('uses the design system card radius and pill buttons', () => {
    expect(WSO2WebTheme.shape.borderRadius).toBe(15);
    expect(WSO2WebTheme.components?.MuiButton?.styleOverrides?.root).toMatchObject({
      borderRadius: 999,
    });
  });

  it('does not colour MuiTableContainer, which would defeat disablePaper', () => {
    expect(WSO2WebTheme.components?.MuiTableContainer).toBeUndefined();
  });
});
