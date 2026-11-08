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

import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { AppBar, Button, Card, Dialog, Fab, FilledInput, Input, OutlinedInput, Paper, Select } from '@mui/material';
import type { TypographyVariantsOptions } from '@mui/material/styles';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import OxygenTextField from '../../components/TextField/TextField';
import { ChoreoLabsTheme, OxygenTheme } from './index';

const SIGNAL = '#FF4600';
const BURN = '#C43300';
const MIDNIGHT_INK = '#0B1633';

describe('ChoreoLabsTheme', () => {
  it('leaves the default theme unchanged', () => {
    expect(OxygenTheme.typography.fontFamily).not.toContain('Sora Variable');
    expect(OxygenTheme.colorSchemes.light!.palette.primary.main).not.toBe(SIGNAL);
    expect(OxygenTheme.colorSchemes.dark!.palette.primary.main).not.toBe(SIGNAL);
  });

  it.each(['light', 'dark'] as const)('uses the brand primary in the %s scheme', (scheme) => {
    const { primary } = ChoreoLabsTheme.colorSchemes[scheme]!.palette;

    expect(primary.main).toBe(SIGNAL);
    expect(primary.dark).toBe(BURN);
    expect(primary.contrastText).toBe(MIDNIGHT_INK);
  });

  // The base theme is built on an orange primary; its derived values must not leak through.
  it.each(['light', 'dark'] as const)('derives the %s primary channels from Signal', (scheme) => {
    const { primary } = ChoreoLabsTheme.colorSchemes[scheme]!.palette;

    expect(primary.mainChannel).toBe('255 70 0');
    expect(primary.darkChannel).toBe('196 51 0');
  });

  it.each([
    ['light', { info: '#0B1633', success: '#16A34A', warning: '#F5B300', error: '#E5484D' }],
    ['dark', { info: '#FFFFFF', success: '#4ADE80', warning: '#FCD34D', error: '#FF7A7F' }],
  ] as const)('uses the brand status colours in the %s scheme', (scheme, colors) => {
    const { palette } = ChoreoLabsTheme.colorSchemes[scheme]!;

    expect(palette.info.main).toBe(colors.info);
    expect(palette.success.main).toBe(colors.success);
    expect(palette.warning.main).toBe(colors.warning);
    expect(palette.error.main).toBe(colors.error);
  });

  it('uses White surfaces on the Paper content background in light mode, with Fog hairlines', () => {
    const { palette } = ChoreoLabsTheme.colorSchemes.light!;

    expect(palette.background.default).toBe('#F4F6FA');
    expect(palette.background.acrylic).toBe('#FFFFFF');
    expect(palette.divider).toBe('#D7DBE4');
  });

  it.each([
    ['light', { success: ['#15803D', '#DCFCE7'], warning: ['#8A5A00', '#FEF6D8'], error: ['#B42318', '#FDE7E7'] }],
    ['dark', { success: ['#4ADE80', '#0B1633'], warning: ['#FCD34D', '#0B1633'], error: ['#FF7A7F', '#0B1633'] }],
  ] as const)('uses the guideline alert text and wash in the %s scheme', (scheme, colors) => {
    const { Alert } = ChoreoLabsTheme.colorSchemes[scheme]!.palette;

    (['success', 'warning', 'error'] as const).forEach((status) => {
      expect(Alert[`${status}Color`]).toBe(colors[status][0]);
      expect(Alert[`${status}StandardBg`]).toBe(colors[status][1]);
    });
  });

  it('fills dark-mode info alerts with Deep Navy', () => {
    expect(ChoreoLabsTheme.colorSchemes.dark!.palette.Alert.infoFilledBg).toBe('#17223A');
  });

  it('sets Sora on every typography variant', () => {
    const typography = ChoreoLabsTheme.typography as unknown as Record<string, TypographyVariantsOptions>;
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'];

    expect(ChoreoLabsTheme.typography.fontFamily).toContain('Sora Variable');
    variants.forEach((variant) => {
      expect(typography[variant].fontFamily).toContain('Sora Variable');
    });
  });

  it('keeps the base theme reduced-motion styles', () => {
    const styleOverrides = ChoreoLabsTheme.components?.MuiCssBaseline?.styleOverrides as Record<string, unknown>;

    expect(styleOverrides).toHaveProperty(['@media (prefers-reduced-motion: reduce)']);
  });
});

describe('ChoreoLabsTheme gradients', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders component styles without gradients', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="contained">Contained</Button>
        <Fab color="primary">Fab</Fab>
        <Paper elevation={8}>Paper</Paper>
        <Card>Card</Card>
        <AppBar>App bar</AppBar>
        <Dialog open>Dialog</Dialog>
      </OxygenUIThemeProvider>
    );

    // Skip the colour-scheme variable blocks; MUI always defines its overlay variables there.
    const componentRules = Array.from(document.querySelectorAll('style'))
      .flatMap((style) => style.textContent?.match(/[^{}]+\{[^{}]*\}/g) ?? [])
      .filter((rule) => !/^\s*(:root|\[data-color-scheme)/.test(rule));

    componentRules.forEach((rule) => {
      expect(rule).not.toMatch(/gradient\(/);

      // MUI's dark-mode elevation overlay is a gradient, so every surface must turn it off.
      const backgroundImages = rule.match(/background-image:[^;}]+/g);
      if (backgroundImages?.some((declaration) => declaration.includes('--Paper-overlay'))) {
        expect(backgroundImages[backgroundImages.length - 1]).toBe('background-image:none');
      }
    });
  });
});

describe('ChoreoLabsTheme states', () => {
  afterEach(() => {
    cleanup();
  });

  const renderedCss = () => Array.from(document.querySelectorAll('style')).map((style) => style.textContent).join('');

  it('uses Flare on hover and Ember with a white label when pressed on primary buttons', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="contained">Contained</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/:hover\{background:#FF6E33\s*!important;/);
    expect(css).toMatch(/:active\{background:#8F2400\s*!important;color:#FFFFFF\s*!important;/);
  });

  it('gives outlined text inputs an Ink focus border, and a ring only with a fixed label', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <OutlinedInput />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/OutlinedInput-root\.Mui-focused:not\(\.MuiSelect-root\) \.MuiOutlinedInput-notchedOutline\{border-width:1\.5px;/);
    expect(css).toMatch(/OutlinedInput-root\.Mui-focused:not\(\.Mui-error\):not\(\.MuiSelect-root\) \.MuiOutlinedInput-notchedOutline\{border-color:var\(--oxygen-palette-text-primary\);/);
    expect(css).toMatch(/\.MuiFormLabel-root ?\+ ?\.MuiTextField-root \.css-[\w-]+OutlinedInput-root\.Mui-focused:not\(\.MuiSelect-root\)\{box-shadow:0 0 0 3px #1F4FFF40;/);
    expect(css).toMatch(/\.MuiFormLabel-root ?\+ ?\.MuiTextField-root \.css-[\w-]+OutlinedInput-root\.Mui-focused\.Mui-error:not\(\.MuiSelect-root\)\{box-shadow:0 0 0 3px rgba\(var\(--oxygen-palette-error-mainChannel\) \/ 0\.25\);/);
    // An unscoped ring rule (one starting right after the previous rule's `}`) would cross floating labels
    expect(css).not.toMatch(/\}\.css-[\w-]+OutlinedInput-root\.Mui-focused[^{]*\{box-shadow/);
  });

  // The theme can't see the label placement, so the ring relies on this markup; fail loudly if it changes.
  it('matches the ring selector only on fixed-label fields', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="fixed"><OxygenTextField labelPlacement="top" label="Name" /></div>
        <div data-testid="floating"><OxygenTextField label="Name" /></div>
      </OxygenUIThemeProvider>
    );
    const ringTarget = (testId: string) => container.querySelector(
      `[data-testid="${testId}"] .MuiFormLabel-root + .MuiTextField-root .MuiOutlinedInput-root`,
    );

    expect(ringTarget('fixed')).not.toBeNull();
    expect(ringTarget('floating')).toBeNull();
  });

  // Selects and text inputs share MuiOutlinedInput, and this class is the only way to tell them apart.
  it('marks select input roots with MuiSelect-root and leaves text inputs unmarked', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="select"><Select value="" /></div>
        <div data-testid="text"><OutlinedInput /></div>
      </OxygenUIThemeProvider>
    );

    expect(container.querySelector('[data-testid="select"] .MuiOutlinedInput-root')?.classList.contains('MuiSelect-root')).toBe(true);
    expect(container.querySelector('[data-testid="text"] .MuiOutlinedInput-root')?.classList.contains('MuiSelect-root')).toBe(false);
  });

  it('keeps the floating label colour on focus without dropping the base select label offset', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <OxygenTextField label="Name" focused />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\.Mui-focused:not\(\.Mui-error\)\{color:var\(--oxygen-palette-text-secondary\);/);
    expect(ChoreoLabsTheme.components?.MuiInputLabel?.styleOverrides?.root).toHaveProperty([
      '.MuiFormControl-root:has(.MuiSelect-select) &:not(.MuiInputLabel-shrink)',
    ]);
  });

  it('uses Cobalt for focus on every input variant', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <OutlinedInput />
        <FilledInput />
        <Input />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/OutlinedInput-root\.Mui-focused:not\(\.Mui-error\) \.MuiOutlinedInput-notchedOutline\{border-color:#1F4FFF;/);
    expect(css).toMatch(/FilledInput-root:not\(\.Mui-error\)::after\{border-bottom-color:#1F4FFF;/);
    expect(css).toMatch(/MuiInput-root:not\(\.Mui-error\)::after\{border-bottom-color:#1F4FFF;/);
  });
});
