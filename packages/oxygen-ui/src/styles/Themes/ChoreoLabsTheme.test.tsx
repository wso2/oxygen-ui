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
import { AppBar, Button, Card, Dialog, Fab, Paper } from '@mui/material';
import type { TypographyVariantsOptions } from '@mui/material/styles';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
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

  it('uses Fog for light-mode hairlines', () => {
    expect(ChoreoLabsTheme.colorSchemes.light!.palette.divider).toBe('#D7DBE4');
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
