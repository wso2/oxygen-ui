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

import { describe, expect, it } from 'vitest';
import AcrylicOrangeTheme from './AcrylicOrangeTheme';
import AcrylicPurpleTheme from './AcrylicPurpleTheme';
import AcrylicBaseTheme from './AcrylicBaseTheme';
import ClassicTheme from './ClassicTheme';
import DefaultTheme from './DefaultTheme';
import HighContrastTheme from './HighContrastTheme';
import PaleBaseTheme from './PaleBaseTheme';
import PaleGray from './PaleGray';
import PaleIndigo from './PaleIndigo';
import { channelOf, paletteColor, tint } from './paletteTokens';

describe('channelOf and tint', () => {
  it('turn a hex colour into a CSS variable channel and an rgba string', () => {
    expect(channelOf('#5567d5')).toBe('85 103 213');
    expect(channelOf('#FFFFFF')).toBe('255 255 255');
    expect(tint('#5567d5', 0.12)).toBe('rgba(85, 103, 213, 0.12)');
  });

  it.each(['5567d5', '#567', '#5567d5ff', 'red', ''])('refuse %j, which is not a six digit hex colour', (value) => {
    expect(() => channelOf(value)).toThrow(/six digit hex colour/);
    expect(() => tint(value, 0.5)).toThrow(/six digit hex colour/);
  });
});

describe('paletteColor', () => {
  it('derives the main channel and keeps the other tokens as they are', () => {
    expect(paletteColor({ main: '#212121', light: '#424242', dark: '#000000', contrastText: '#ffffff' })).toEqual({
      main: '#212121',
      mainChannel: '33 33 33',
      light: '#424242',
      dark: '#000000',
      contrastText: '#ffffff',
    });
  });

  it('leaves out the tokens it is not given', () => {
    expect(Object.keys(paletteColor({ main: '#212121' }))).toEqual(['main', 'mainChannel']);
  });
});

describe('the channels the themes set', () => {
  const themes = { AcrylicOrangeTheme, AcrylicPurpleTheme, AcrylicBaseTheme, ClassicTheme, DefaultTheme, HighContrastTheme, PaleGray, PaleIndigo, PaleBaseTheme } as Record<string, any>;
  const sixDigit = /^#[0-9a-f]{6}$/i;

  it('are the channels of their colours, so anything tinted from a channel uses the colour it is named for', () => {
    const stale: string[] = [];

    for (const [name, theme] of Object.entries(themes)) {
      for (const [scheme, { palette }] of Object.entries<any>(theme.colorSchemes)) {
        for (const [color, tokens] of Object.entries<any>(palette)) {
          if (typeof tokens?.main !== 'string' || typeof tokens?.mainChannel !== 'string' || !sixDigit.test(tokens.main)) continue;
          if (tokens.mainChannel !== channelOf(tokens.main)) stale.push(`${name} ${scheme}.${color}`);
        }
      }
    }

    expect(stale).toEqual([]);
  });
});

describe('the overrides the Acrylic and Pale themes share', () => {
  it.each([
    ['AcrylicBaseTheme', AcrylicBaseTheme],
    ['PaleBaseTheme', PaleBaseTheme],
  ])('give %s small text fields and menu items at the body size', (_name, theme: any) => {
    expect(theme.components.MuiTextField.defaultProps).toEqual({ size: 'small' });
    expect(theme.components.MuiMenuItem.styleOverrides.root({ theme })).toEqual({ fontSize: theme.typography.body2.fontSize });
  });
});
