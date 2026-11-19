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
import { createOxygenTheme } from './createOxygenTheme';
import OxygenThemeBase from '../styles/OxygenThemeBase';

describe('createOxygenTheme', () => {
  it('keeps the base font variables when the typography is unchanged', () => {
    expect(createOxygenTheme({}).font).toEqual(OxygenThemeBase.font);
  });

  it('derives the font variables from the merged typography', () => {
    const theme = createOxygenTheme({ typography: { fontFamily: 'Roboto', body2: { fontFamily: 'Roboto' } } });

    expect(theme.font.body2).toContain('Roboto');
    expect(theme.vars.font.body2).toContain('Roboto');
  });

  it('leaves the base theme font variables untouched', () => {
    const before = OxygenThemeBase.font;

    createOxygenTheme({ typography: { fontFamily: 'Roboto' } });

    expect(OxygenThemeBase.font).toBe(before);
    expect(OxygenThemeBase.font.body2).toContain('Inter Variable');
  });

  it('keeps a font variable passed in the config', () => {
    const theme = createOxygenTheme({ font: { body2: '400 1rem/1.5 Custom' } });

    expect(theme.font.body2).toBe('400 1rem/1.5 Custom');
  });

  it('keeps a font variable passed in the config of the base theme', () => {
    const parent = createOxygenTheme({ font: { body2: '400 1rem/1.5 Custom' } });
    const child = createOxygenTheme({}, parent);
    const grandchild = createOxygenTheme({ typography: { body1: { fontFamily: 'Roboto' } } }, child);

    expect(child.font.body2).toBe('400 1rem/1.5 Custom');
    expect(grandchild.font.body2).toBe('400 1rem/1.5 Custom');
    expect(grandchild.font.body1).toContain('Roboto');
  });

  it('overrides a font variable of the base theme with the one passed in the config', () => {
    const parent = createOxygenTheme({ font: { body1: '400 1rem/1.5 Parent', body2: '400 1rem/1.5 Parent' } });
    const child = createOxygenTheme({ font: { body2: '400 1rem/1.5 Child' } }, parent);

    expect(child.font.body1).toBe('400 1rem/1.5 Parent');
    expect(child.font.body2).toBe('400 1rem/1.5 Child');
  });
  describe('component variants', () => {
    type Props = Record<string, unknown>;
    const styleOf = (marker: string) => ({ marker });
    const variantsOf = (theme: { components?: Record<string, any> }, component: string) =>
      (theme.components?.[component]?.variants ?? []) as { props: Props | (() => boolean); style: { marker: string } }[];
    const labels = (theme: { components?: Record<string, any> }, component: string) =>
      variantsOf(theme, component).map(({ props, style }) => `${typeof props === 'function' ? 'fn' : JSON.stringify(props)}=${style.marker}`);

    const base = createOxygenTheme({
      components: {
        MuiButton: {
          variants: [
            { props: { variant: 'contained', color: 'primary' }, style: styleOf('base contained primary') },
            { props: { variant: 'outlined', color: 'secondary' }, style: styleOf('base outlined secondary') },
          ],
        },
      },
    });

    it('replaces in place the variant of the base that has the same props, and keeps the others', () => {
      const child = createOxygenTheme(
        { components: { MuiButton: { variants: [{ props: { color: 'primary', variant: 'contained' }, style: styleOf('child') }] } } },
        base,
      );

      expect(labels(child, 'MuiButton')).toEqual([
        '{"color":"primary","variant":"contained"}=child',
        '{"variant":"outlined","color":"secondary"}=base outlined secondary',
      ]);
    });

    it('puts a variant with props the base does not have after the ones of the base', () => {
      const child = createOxygenTheme(
        { components: { MuiButton: { variants: [{ props: { variant: 'text' }, style: styleOf('child text') }] } } },
        base,
      );

      expect(labels(child, 'MuiButton')).toEqual([
        '{"variant":"contained","color":"primary"}=base contained primary',
        '{"variant":"outlined","color":"secondary"}=base outlined secondary',
        '{"variant":"text"}=child text',
      ]);
    });

    it('never matches a variant whose props are a function, so it is added and the base stays', () => {
      const child = createOxygenTheme(
        { components: { MuiButton: { variants: [{ props: () => true, style: styleOf('child fn') }] } } },
        base,
      );

      expect(labels(child, 'MuiButton')).toHaveLength(3);
      expect(labels(child, 'MuiButton')[2]).toBe('fn=child fn');
    });

    it('keeps the variants the base theme defines for a component a config also defines variants for', () => {
      const theme = createOxygenTheme({
        components: { MuiAvatar: { variants: [{ props: { variant: 'custom' as never }, style: {} }] } },
      });

      const props = variantsOf(theme, 'MuiAvatar').map(({ props: p }) => JSON.stringify(p));

      expect(props).toContain('{"variant":"light"}');
      expect(props).toContain('{"variant":"custom"}');
    });

    it('still replaces every other array', () => {
      const withArray = createOxygenTheme({ components: { MuiButton: { defaultProps: { sx: [{ a: 1 }, { b: 2 }] } } } });
      const child = createOxygenTheme({ components: { MuiButton: { defaultProps: { sx: [{ c: 3 }] } } } }, withArray);

      expect(child.components?.MuiButton?.defaultProps?.sx).toEqual([{ c: 3 }]);
    });

    it('leaves the variants of the base theme untouched', () => {
      const before = labels(base, 'MuiButton');

      createOxygenTheme(
        { components: { MuiButton: { variants: [{ props: { variant: 'contained', color: 'primary' }, style: styleOf('child') }] } } },
        base,
      );

      expect(labels(base, 'MuiButton')).toEqual(before);
    });
  });
  describe('palette channels', () => {
    const palette = (theme: any, scheme: 'light' | 'dark' = 'light') => theme.colorSchemes[scheme].palette;

    it('derives the channels of a color the config changes, instead of keeping the ones of the color it replaced', () => {
      const base = createOxygenTheme({ colorSchemes: { light: { palette: { primary: { main: '#ff7300', light: '#ff8f33', dark: '#b25000' } } } } });
      const child = createOxygenTheme({ colorSchemes: { light: { palette: { primary: { main: '#0000ff', light: '#4040ff', dark: '#0000cc' } } } } }, base);

      expect(palette(base).primary.mainChannel).toBe('255 115 0');
      expect(palette(child).primary).toMatchObject({ mainChannel: '0 0 255', lightChannel: '64 64 255', darkChannel: '0 0 204' });
    });

    it('keeps a channel the config sets itself', () => {
      const base = createOxygenTheme({});
      const child = createOxygenTheme({ colorSchemes: { light: { palette: { primary: { main: '#0000ff', mainChannel: '1 2 3' } } } } }, base);

      expect(palette(child).primary.mainChannel).toBe('1 2 3');
    });

    it('keeps the channels of the colors the config leaves alone', () => {
      const base = createOxygenTheme({ colorSchemes: { light: { palette: { primary: { main: '#ff7300' } } } } });
      const child = createOxygenTheme({ colorSchemes: { light: { palette: { secondary: { main: '#0000ff' } } } } }, base);

      expect(palette(child).primary.mainChannel).toBe('255 115 0');
      expect(palette(child).secondary.mainChannel).toBe('0 0 255');
    });

    it('derives the channels of the other colors and of both schemes too', () => {
      const child = createOxygenTheme({ colorSchemes: { dark: { palette: { text: { primary: '#ffffff' }, error: { main: '#ff0000' } } } } }, createOxygenTheme({}));

      expect(palette(child, 'dark').text.primaryChannel).toBe('255 255 255');
      expect(palette(child, 'dark').error.mainChannel).toBe('255 0 0');
    });

    it('leaves the channels of the base theme untouched', () => {
      const base = createOxygenTheme({ colorSchemes: { light: { palette: { primary: { main: '#ff7300' } } } } });

      createOxygenTheme({ colorSchemes: { light: { palette: { primary: { main: '#0000ff' } } } } }, base);

      expect(palette(base).primary.mainChannel).toBe('255 115 0');
    });
  });
});
