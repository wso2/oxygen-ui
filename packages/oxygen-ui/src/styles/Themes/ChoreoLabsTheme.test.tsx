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
import { AppBar, Breadcrumbs, Button, Card, Chip, Dialog, Fab, FilledInput, FormControl, FormLabel, Input, InputAdornment, InputLabel, Link, MenuItem, MenuList, NativeSelect, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material';
import type { TypographyVariantsOptions } from '@mui/material/styles';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import OxygenTextField from '../../components/TextField/TextField';
import OxygenSelect from '../../components/Select/Select';
import AppBreadcrumbs from '../../components/AppBreadcrumbs/AppBreadcrumbs';
import Footer from '../../components/Footer/Footer';
import PageTitle from '../../components/PageTitle/PageTitle';
import ComplexSelect from '../../components/ComplexSelect/ComplexSelect';
import SearchBar from '../../components/SearchBar/SearchBar';
import SidebarUserAvatar from '../../components/Sidebar/SidebarUserAvatar';
import UserMenu from '../../components/UserMenu/UserMenu';
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

  it.each([
    ['light', '#0B1633', '#FFFFFF'],
    ['dark', '#FFFFFF', '#0B1633'],
  ] as const)('uses dark blue as the secondary colour in the %s scheme', (scheme, main, contrastText) => {
    const { secondary } = ChoreoLabsTheme.colorSchemes[scheme]!.palette;

    expect(secondary.main).toBe(main);
    expect(secondary.contrastText).toBe(contrastText);
  });

  it.each(['light', 'dark'] as const)('uses Burn as the accent colour in the %s scheme', (scheme) => {
    const { accent } = ChoreoLabsTheme.colorSchemes[scheme]!.palette;

    expect(accent.main).toBe(BURN);
    expect(accent.contrastText).toBe('#FFFFFF');
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

  // MUI X DataGrid reads its text styles from the font CSS variables rather than the typography.
  it.each(['body1', 'body2', 'caption'] as const)('uses Sora in the %s font variable', (variant) => {
    expect(ChoreoLabsTheme.font[variant]).toContain('Sora Variable');
    expect(ChoreoLabsTheme.vars.font[variant]).toContain('Sora Variable');
    expect(OxygenTheme.font[variant]).toContain('Inter Variable');
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

  it('keeps the Signal fill and turns the label white on hover, keyboard focus and press on primary buttons', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="contained">Contained</Button>
      </OxygenUIThemeProvider>
    );

    expect(renderedCss()).toMatch(
      /:hover,[^{]*\.Mui-focusVisible,[^{]*:active\{background-color:var\(--oxygen-palette-primary-main\);color:#FFFFFF;/
    );
  });

  it('fills outlined primary buttons with Signal on hover and Action with an Ink label when pressed', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="outlined">Read the Article</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\{[^}]*border-color:var\(--oxygen-palette-Button-outlinedColor\);color:var\(--oxygen-palette-Button-outlinedColor\);/);
    expect(css).toMatch(/:hover,[^{]*\.Mui-focusVisible\{border-color:var\(--oxygen-palette-primary-main\);background-color:var\(--oxygen-palette-primary-main\);color:#FFFFFF;/);
    expect(css).toMatch(/:active\{border-color:#D83B00;background-color:#D83B00;color:#0B1633;/);
  });

  it('fills outlined accent buttons with Burn on hover and focus, and Ember when pressed', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="outlined" color="accent">Learn more</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\{[^}]*border-color:var\(--oxygen-palette-accent-main\);color:var\(--oxygen-palette-accent-main\);/);
    expect(css).toMatch(
      /:hover,[^{]*\.Mui-focusVisible\{border-color:var\(--oxygen-palette-accent-main\);background-color:var\(--oxygen-palette-accent-main\);color:var\(--oxygen-palette-accent-contrastText\);/
    );
    expect(css).toMatch(
      /:active\{border-color:var\(--oxygen-palette-accent-dark\);background-color:var\(--oxygen-palette-accent-dark\);color:var\(--oxygen-palette-accent-contrastText\);/
    );
  });

  it('lifts filled and outlined buttons on hover and presses them in, unless reduced motion is preferred', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="contained">Contained</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    // Text buttons and buttons used as toggles (in a ButtonGroup or with aria-pressed) stay put
    const lifting = ':not\\(\\.MuiButton-text\\):not\\(\\.MuiButtonGroup-grouped\\):not\\(\\[aria-pressed\\]\\)';

    expect(css).toMatch(
      new RegExp(`@media \\(hover: hover\\) and \\(prefers-reduced-motion: no-preference\\)\\{[^{]*${lifting}:hover\\{[^}]*;transform:translateY\\(-2px\\);`)
    );
    expect(css).toMatch(new RegExp(`@media \\(prefers-reduced-motion: no-preference\\)\\{[^{]*${lifting}:active\\{[^}]*;transform:scale\\(0\\.98\\);`));
  });

  it('uses the guideline disabled colours for every button variant', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="contained" disabled>Disabled</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\.Mui-disabled\{color:var\(--oxygen-palette-Button-disabledColor\);/);
    expect(css).toMatch(
      /\.Mui-disabled:not\(\.MuiButton-text\)\{background-color:var\(--oxygen-palette-Button-disabledBg\);border-color:transparent;/
    );
  });

  it('draws a 3px focus ring 3px outside buttons, without a shadow', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="contained">Contained</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\.Mui-focusVisible\{outline:3px solid var\(--oxygen-palette-Button-focusRing\);outline-offset:3px;/);
    // disableElevation adds this class, which removes MUI's shadows at rest, on hover, press and focus
    expect(getByText('Contained').classList).toContain('MuiButton-disableElevation');
  });

  it.each([
    ['light', { outlinedColor: BURN, disabledBg: '#D7DBE4', disabledColor: '#5A6072', containedSecondaryHoverBg: '#07080C', focusRing: '#1F4FFF' }],
    ['dark', { outlinedColor: SIGNAL, disabledBg: '#070D22', disabledColor: '#8A93A6', containedSecondaryHoverBg: '#FFFFFF', focusRing: '#3D8BFF' }],
  ] as const)('sets the guideline button state colours in the %s scheme', (scheme, colors) => {
    expect(ChoreoLabsTheme.colorSchemes[scheme]!.palette.Button).toMatchObject(colors);
  });

  it('makes every button size a pill', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button size="large" variant="contained">Large</Button>
      </OxygenUIThemeProvider>
    );
    const className = getByText('Large').className.split(' ').find((name) => name.startsWith('css-'));

    expect(renderedCss()).toMatch(new RegExp(`\\.${className}\\{[^}]*border-radius:999px`));
  });

  it('sizes buttons at 32, 40 and 48px', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button size="small">Small</Button>
        <Button>Medium</Button>
        <Button size="large">Large</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();
    const minHeight = (label: string) => {
      const className = getByText(label).className.split(' ').find((name) => name.startsWith('css-'));
      return css.match(new RegExp(`\\.${className}\\{[^}]*min-height:(\\d+)px`))?.[1];
    };

    expect(minHeight('Small')).toBe('32');
    expect(minHeight('Medium')).toBe('40');
    expect(minHeight('Large')).toBe('48');
  });

  it('uses dark blue for outlined and filled secondary buttons, filling the outline on hover', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="outlined" color="secondary">All Reports</Button>
        <Button variant="contained" color="secondary">Contact Us</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(
      /\{[^}]*background-color:var\(--oxygen-palette-secondary-main\);color:var\(--oxygen-palette-secondary-contrastText\);/
    );
    expect(css).toMatch(
      /:hover,[^{]*\.Mui-focusVisible\{background-color:var\(--oxygen-palette-Button-containedSecondaryHoverBg\);color:var\(--oxygen-palette-Button-containedSecondaryHoverColor\);/
    );

    expect(css).toMatch(
      /\{[^}]*border-color:var\(--oxygen-palette-secondary-main\);color:var\(--oxygen-palette-secondary-main\);/
    );
    expect(css).toMatch(
      /:hover,[^{]*:active\{border-color:var\(--oxygen-palette-secondary-main\);background-color:var\(--oxygen-palette-secondary-main\);color:var\(--oxygen-palette-secondary-contrastText\);/
    );
  });

  it('fills the subtle button variant with Action and a white label, darkening to Burn and Ember', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Button variant="subtle">Download</Button>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\{[^}]*background-color:#D83B00;color:#FFFFFF;/);
    expect(css).toMatch(/:hover,[^{]*\.Mui-focusVisible\{background-color:#C43300;\}/);
    expect(css).toMatch(/:active\{background-color:#8F2400;\}/);
  });

  it('uses the light avatar style for the app shell user avatars and page title avatars', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <UserMenu>
          <UserMenu.Trigger name="Jane Doe" />
        </UserMenu>
        <SidebarUserAvatar>JD</SidebarUserAvatar>
        <PageTitle>
          <PageTitle.Avatar>P</PageTitle.Avatar>
          <PageTitle.Header>Project</PageTitle.Header>
        </PageTitle>
      </OxygenUIThemeProvider>
    );
    const lightAvatar = 'background-color:color-mix(in srgb, var(--oxygen-palette-primary-main) 12%, transparent);color:var(--oxygen-palette-primary-main);}';

    (['MuiUserMenu-avatar', 'MuiSidebar-userAvatar', 'MuiPageTitle-avatar'] as const).forEach((slot) => {
      const rule = renderedCss().match(new RegExp(`\\.[^{}]*${slot}\\{[^}]*\\}`))?.[0];
      expect(rule?.endsWith(lightAvatar)).toBe(true);
    });
  });

  it('sizes outlined fields at 40 and 48px to line up with medium and large buttons', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="small"><TextField label="Name" /></div>
        <div data-testid="medium"><TextField size="medium" label="Name" /></div>
        <div data-testid="multiline"><TextField multiline /></div>
        <div data-testid="compact">
          <TextField sx={{ '& .MuiOutlinedInput-root': { height: 32 }, '& .MuiInputBase-input': { padding: '4px 8px' } }} />
        </div>
      </OxygenUIThemeProvider>
    );
    const style = (testId: string, selector: string) =>
      getComputedStyle(container.querySelector(`[data-testid="${testId}"] ${selector}`)!);

    expect(style('small', '.MuiInputBase-input').paddingTop).toBe('calc(0.5 * (40px - 1.4375em - 0px))');
    expect(style('medium', '.MuiInputBase-input').paddingTop).toBe('calc(0.5 * (48px - 1.4375em - 0px))');
    expect(style('small', '.MuiInputLabel-root').transform).toBe('translate(14px, calc((40px - 1.4375em - 0px) / 2)) scale(1)');
    expect(style('multiline', '.MuiInputBase-root').paddingTop).toBe('calc(0.5 * (40px - 1.4375em - 0px))');
    expect(style('multiline', '.MuiInputBase-input').paddingTop).toBe('0px');
    // Components that size their own fields keep that size
    expect(style('compact', '.MuiInputBase-root').height).toBe('32px');
    expect(style('compact', '.MuiInputBase-input').paddingTop).toBe('4px');
  });

  it('renders the tag chip as a dark blue uppercase label, or in the chosen colour', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Chip variant="tag" label="Webinar" />
        <Chip variant="tag" color="primary" label="New" />
      </OxygenUIThemeProvider>
    );
    const style = (label: string) => getComputedStyle(getByText(label).closest('.MuiChip-root')!);

    expect(style('Webinar').textTransform).toBe('uppercase');
    expect(style('Webinar').borderRadius).toBe('4px');
    expect(style('Webinar').backgroundColor).toBe('var(--oxygen-palette-secondary-main)');
    expect(style('New').backgroundColor).toBe('var(--oxygen-palette-primary-main)');
    // jsdom lowercases computed colours, CSS variable names included
    expect(style('New').color).toMatch(/^var\(--oxygen-palette-primary-contrasttext\)$/i);
  });

  it('gives outlined text inputs an Ink focus border, and a ring only with a fixed label', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <OutlinedInput />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/OutlinedInput-root\.Mui-focused:not\(\.MuiSelect-root\):not\(\.MuiNativeSelect-root\) \.MuiOutlinedInput-notchedOutline[^{]*\{border-width:1\.5px;/);
    expect(css).toMatch(/OutlinedInput-root\.Mui-focused:not\(\.Mui-error\):not\(\.MuiSelect-root\):not\(\.MuiNativeSelect-root\) \.MuiOutlinedInput-notchedOutline[^{]*\{border-color:var\(--oxygen-palette-text-primary\);/);
    expect(css).toMatch(/\.MuiFormLabel-root ?\+ ?\.MuiTextField-root:not\(:has\(> ?\.MuiInputLabel-root\)\) ?> ?\.css-[\w-]+OutlinedInput-root\.Mui-focused[^{]*\{box-shadow:0 0 0 3px #1F4FFF40;/);
    expect(css).toMatch(/\.MuiFormLabel-root ?\+ ?\.MuiTextField-root:not\(:has\(> ?\.MuiInputLabel-root\)\) ?> ?\.css-[\w-]+OutlinedInput-root\.Mui-focused\.Mui-error[^{]*\{box-shadow:0 0 0 3px rgba\(var\(--oxygen-palette-error-mainChannel\) \/ 0\.25\);/);
    // An unscoped ring rule (one starting right after the previous rule's `}`) would cross floating labels
    expect(css).not.toMatch(/\}\.css-[\w-]+OutlinedInput-root\.Mui-focused[^{]*\{box-shadow/);
  });

  it('gives fixed-label selects the text input focus border and ring', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <OutlinedInput />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();
    const selectFixedLabel = '\\.MuiFormLabel-root:not\\(\\.MuiInputLabel-root\\) ?\\+ ?\\.css-[\\w-]+OutlinedInput-root\\.Mui-focused';

    expect(css).toMatch(new RegExp(`${selectFixedLabel} \\.MuiOutlinedInput-notchedOutline[^{]*\\{border-width:1\\.5px;`));
    expect(css).toMatch(new RegExp(`${selectFixedLabel}:not\\(\\.Mui-error\\) \\.MuiOutlinedInput-notchedOutline[^{]*\\{border-color:var\\(--oxygen-palette-text-primary\\);`));
    expect(css).toMatch(new RegExp(`${selectFixedLabel}[^{]*\\{box-shadow:0 0 0 3px #1F4FFF40;`));
    expect(css).toMatch(new RegExp(`${selectFixedLabel}\\.Mui-error[^{]*\\{box-shadow:0 0 0 3px rgba`));
    // The fixed-label TextField rules no longer exclude selects, so `TextField select labelPlacement="top"` matches too.
    expect(css).not.toMatch(/\.MuiTextField-root:not\(:has\(> ?\.MuiInputLabel-root\)\) ?> ?\.css-[\w-]+OutlinedInput-root\.Mui-focused[^,{]*:not\(\.MuiSelect-root\)/);
  });

  // The theme can't see the label placement, so the select rules rely on this markup; fail loudly if it changes.
  it('matches the fixed-label select selectors only on fixed-label selects', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="fixed-select"><OxygenSelect labelPlacement="top" label="Role" value="" /></div>
        <div data-testid="fixed-text-select"><OxygenTextField select labelPlacement="top" label="Role" value="" /></div>
        <div data-testid="floating-select">
          <FormControl><InputLabel id="role">Role</InputLabel><OxygenSelect labelId="role" label="Role" value="" /></FormControl>
        </div>
        <div data-testid="floating-text-select"><OxygenTextField select label="Role" value="" /></div>
      </OxygenUIThemeProvider>
    );
    const fixedLabelInput = [
      '.MuiFormLabel-root + .MuiTextField-root:not(:has(> .MuiInputLabel-root)) > .MuiSelect-root',
      '.MuiFormLabel-root:not(.MuiInputLabel-root) + .MuiSelect-root',
    ].join(', ');
    const matches = (testId: string) => Boolean(container.querySelector(`[data-testid="${testId}"] :is(${fixedLabelInput})`));

    expect(matches('fixed-select')).toBe(true);
    expect(matches('fixed-text-select')).toBe(true);
    expect(matches('floating-select')).toBe(false);
    expect(matches('floating-text-select')).toBe(false);
  });

  // The theme can't see the label placement, so the ring relies on this markup; fail loudly if it changes.
  it('matches the ring selector only on fixed-label fields', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="fixed"><OxygenTextField labelPlacement="top" label="Name" /></div>
        <div data-testid="floating"><OxygenTextField label="Name" /></div>
        <div data-testid="standalone-label"><FormLabel>Details</FormLabel><OxygenTextField label="Name" /></div>
      </OxygenUIThemeProvider>
    );
    const ringTarget = (testId: string) => container.querySelector(
      `[data-testid="${testId}"] .MuiFormLabel-root + .MuiTextField-root:not(:has(> .MuiInputLabel-root)) > .MuiOutlinedInput-root`,
    );

    expect(ringTarget('fixed')).not.toBeNull();
    expect(ringTarget('floating')).toBeNull();
    expect(ringTarget('standalone-label')).toBeNull();
  });

  // Selects and text inputs share MuiOutlinedInput, and this class is the only way to tell them apart.
  it('marks select input roots with MuiSelect-root or MuiNativeSelect-root and leaves text inputs unmarked', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="select"><Select value="" /></div>
        <div data-testid="native-select"><NativeSelect input={<OutlinedInput />} /></div>
        <div data-testid="text"><OutlinedInput /></div>
      </OxygenUIThemeProvider>
    );
    const classes = (testId: string) => container.querySelector(`[data-testid="${testId}"] .MuiOutlinedInput-root`)?.classList;

    expect(classes('select')?.contains('MuiSelect-root')).toBe(true);
    expect(classes('native-select')?.contains('MuiNativeSelect-root')).toBe(true);
    expect(classes('text')?.contains('MuiSelect-root')).toBe(false);
    expect(classes('text')?.contains('MuiNativeSelect-root')).toBe(false);
  });

  it('keeps floating text and select label colours on focus without dropping the base select label offset', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <OxygenTextField label="Name" focused />
        <OxygenTextField select label="Role" value="" focused />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/\}\.css-[\w-]+InputLabel-root\.Mui-focused:not\(\.Mui-error\)\{color:var\(--oxygen-palette-text-secondary\);/);
    // Selects are no longer excluded from the neutral focus colour.
    expect(css).not.toMatch(/:not\(:has\(\.MuiSelect-select\)\)/);
    expect(ChoreoLabsTheme.components?.MuiInputLabel?.styleOverrides?.root).toHaveProperty([
      '.MuiFormControl-root:has(.MuiSelect-select) &:not(.MuiInputLabel-shrink)',
    ]);
  });

  it('keeps the focus ring off menu items, which mark focus with a background instead', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <MenuList><MenuItem>Development</MenuItem></MenuList>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    // The MenuItem rule must come after the ButtonBase ring so it wins at equal specificity.
    expect(css).toMatch(/MuiMenuItem-root\.Mui-focusVisible\{outline:2px solid #1F4FFF;[^}]*\}[\s\S]*MuiMenuItem-root\.Mui-focusVisible\{outline:none;/);
    expect(css).toMatch(/MuiMenuItem-root\.Mui-focusVisible\{background-color:var\(--oxygen-palette-action-focus\);/);
  });

  it('keeps floating select labels, but not text labels, at the default colour in error', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <div data-testid="select"><OxygenTextField select label="Role" error value="" /></div>
        <div data-testid="mui-select">
          <FormControl error><InputLabel id="r">Role</InputLabel><Select labelId="r" label="Role" value="" /></FormControl>
        </div>
        <div data-testid="wrapped-select">
          <FormControl error><InputLabel id="w">Role</InputLabel><div><Select labelId="w" label="Role" value="" /></div></FormControl>
        </div>
        <div data-testid="text"><OxygenTextField label="Name" error /></div>
        <div data-testid="text-with-select-adornment">
          <OxygenTextField
            label="Timeout"
            error
            slotProps={{ input: { endAdornment: <InputAdornment position="end"><Select value="s" variant="standard"><MenuItem value="s">s</MenuItem></Select></InputAdornment> } }}
          />
        </div>
      </OxygenUIThemeProvider>
    );
    const errorLabel = '.MuiFormControl-root:has(> .MuiSelect-root, > :not(.MuiInputBase-root) .MuiSelect-root, > .MuiNativeSelect-root, > :not(.MuiInputBase-root) .MuiNativeSelect-root) > .MuiInputLabel-root.Mui-error';
    const matches = (testId: string) => Boolean(container.querySelector(`[data-testid="${testId}"] ${errorLabel}`));

    expect(renderedCss()).toMatch(/:has\(> ?\.MuiSelect-root, ?> ?:not\(\.MuiInputBase-root\) \.MuiSelect-root, ?> ?\.MuiNativeSelect-root, ?> ?:not\(\.MuiInputBase-root\) \.MuiNativeSelect-root\) ?> ?\.css-[\w-]+\.MuiInputLabel-root\.Mui-error\{color:var\(--oxygen-palette-text-secondary\);/);
    expect(matches('select')).toBe(true);
    expect(matches('mui-select')).toBe(true);
    expect(matches('wrapped-select')).toBe(true);
    expect(matches('text')).toBe(false);
    expect(matches('text-with-select-adornment')).toBe(false);
  });

  it('fills the selected menu item with the neutral selected colour, not a primary tint', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <MenuList><MenuItem selected>Development</MenuItem></MenuList>
      </OxygenUIThemeProvider>
    );
    const itemClass = Array.from(container.querySelector('.MuiMenuItem-root')!.classList).find((name) => name.startsWith('css-'))!;
    // Rules for the applied class, in order; the last selected rule is the one that wins.
    const rules = renderedCss().split('}').filter((rule) => rule.includes(`.${itemClass}.Mui-selected`));
    const winning = rules[rules.length - 1];

    expect(winning).toContain(`.${itemClass}.Mui-selected:hover`);
    expect(winning).toContain(`.${itemClass}.Mui-selected.Mui-focusVisible`);
    expect(winning).toMatch(/\{background-color:var\(--oxygen-palette-action-selected\);$/);
  });

  it.each([
    ['light', { linkColor: '#5A6072', linkHoverColor: BURN, separatorColor: '#5A6072' }],
    ['dark', { linkColor: '#AEB6C6', linkHoverColor: SIGNAL, separatorColor: '#5F6B85' }],
  ] as const)('uses the guideline breadcrumb colours in the %s scheme', (scheme, colors) => {
    expect(ChoreoLabsTheme.colorSchemes[scheme]!.palette.Breadcrumbs).toEqual(colors);
  });

  it('separates app breadcrumbs with a slash and colours each level', () => {
    const { container, getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <AppBreadcrumbs items={[{ key: 'home', label: 'Home', onClick: () => {} }, { key: 'api', label: 'API Platform' }]} />
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();
    const ruleFor = (text: string) => {
      const className = getByText(text).className.split(' ').find((name) => name.startsWith('css-'));
      return css.match(new RegExp(`\\.${className}\\{[^}]*\\}`))?.[0] ?? '';
    };

    expect(container.querySelector('.MuiBreadcrumbs-separator')?.textContent).toBe('/');
    expect(ruleFor('Home')).toMatch(/font-size:14px;font-weight:400;line-height:1\.5;letter-spacing:0\.02em;word-spacing:0\.18em;color:var\(--oxygen-palette-Breadcrumbs-linkColor\);/);
    expect(css).toMatch(/AppBreadcrumbs-item:hover\{[^}]*text-decoration:none;color:var\(--oxygen-palette-Breadcrumbs-linkHoverColor\);\}/);
    expect(ruleFor('API Platform')).toMatch(/font-weight:400;[^}]*color:var\(--oxygen-palette-text-primary\);/);
  });

  it('keeps a custom app breadcrumb separator', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <AppBreadcrumbs separator=">" items={[{ key: 'home', label: 'Home' }, { key: 'api', label: 'API Platform' }]} />
      </OxygenUIThemeProvider>
    );

    expect(container.querySelector('.MuiBreadcrumbs-separator')?.textContent).toBe('>');
  });

  it('spaces breadcrumb slashes 10px apart and keeps the current level at regular weight', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Breadcrumbs><span>Home</span><span>API Platform</span></Breadcrumbs>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/MuiBreadcrumbs-separator\{[^}]*margin-left:10px;margin-right:10px;color:var\(--oxygen-palette-Breadcrumbs-separatorColor\);\}/);
    expect(css).toMatch(/\.MuiBreadcrumbs-li:last-child\{color:var\(--oxygen-palette-text-primary\);\}/);
    expect(css).not.toMatch(/MuiBreadcrumbs-li[^{]*\{[^}]*(font-weight:700|opacity)/);
  });

  it.each([
    ['light', { hoverColor: BURN, primaryColor: BURN, secondaryColor: MIDNIGHT_INK, successColor: '#15803D', errorColor: '#B42318', warningColor: '#8A5A00', infoColor: MIDNIGHT_INK }],
    ['dark', { hoverColor: SIGNAL, primaryColor: SIGNAL, secondaryColor: '#FFFFFF', successColor: '#4ADE80', errorColor: '#FF7A7F', warningColor: '#FCD34D', infoColor: '#FFFFFF' }],
  ] as const)('uses the brand link colours in the %s scheme', (scheme, colors) => {
    expect(ChoreoLabsTheme.colorSchemes[scheme]!.palette.Link).toEqual(colors);
  });

  // The last value of a property in a class's rules is the one that applies; hover keeps the
  // resting value when its rules don't set one.
  const lastValue = (css: string, selector: string, property: string, fallback: string) => {
    const values = css.split('}').filter((rule) => rule.startsWith(selector))
      .flatMap((rule) => [...rule.matchAll(new RegExp(`(?:^|[;{])${property}:([^;]+)`, 'g'))].map((match) => match[1]));
    return values[values.length - 1] ?? fallback;
  };
  const cssClass = (element: HTMLElement) => element.className.split(' ').find((name) => name.startsWith('css-'))!;

  it('gives links without a colour the default text colour, turning orange on hover', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Link href="/docs">Docs</Link>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(getByText('Docs'));
    const css = renderedCss();

    expect(lastValue(css, `.${className}{`, 'color', '')).toBe('var(--oxygen-palette-text-primary)');
    expect(lastValue(css, `.${className}:hover{`, 'color', '')).toBe('var(--oxygen-palette-Link-hoverColor)');
  });

  it.each(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const)('uses the brand colour for color="%s" links', (color) => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Link href="/docs" color={color}>Docs</Link>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(getByText('Docs'));
    const css = renderedCss();
    const rest = lastValue(css, `.${className}{`, 'color', '');

    expect(rest).toBe(`var(--oxygen-palette-Link-${color}Color)`);
    expect(lastValue(css, `.${className}:hover{`, 'color', rest)).toBe(rest);
  });

  it('leaves color="inherit" links in the surrounding colour', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Link href="/docs" color="inherit">Docs</Link>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(getByText('Docs'));

    expect(lastValue(renderedCss(), `.${className}{`, 'color', '')).toBe('inherit');
  });

  it('gives footer links the default text colour, with the link hover colour', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Footer><Footer.Link href="/terms">Terms</Footer.Link></Footer>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();

    expect(css).toMatch(/MuiFooter-link\{[^}]*color:var\(--oxygen-palette-text-primary\);\}/);
    expect(css).toMatch(/MuiFooter-link:hover\{color:var\(--oxygen-palette-Link-hoverColor\);\}/);
  });

  it.each([
    ['none', 'none', 'none'],
    ['hover', 'none', 'underline'],
    ['always', 'underline', 'underline'],
  ] as const)('follows underline="%s" on links', (underline, rest, hover) => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Link href="/docs" underline={underline}>Docs</Link>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(getByText('Docs'));
    const css = renderedCss();
    const restDecoration = lastValue(css, `.${className}{`, 'text-decoration', 'none');

    expect(restDecoration).toBe(rest);
    expect(lastValue(css, `.${className}:hover{`, 'text-decoration', restDecoration)).toBe(hover);
  });

  it('underlines links on hover by default', () => {
    expect(ChoreoLabsTheme.components?.MuiLink?.defaultProps?.underline).toBe('hover');
  });

  // The last value of a property among rules whose selector list includes `selector`
  const winningValue = (css: string, selector: string, property: string) => {
    const values = css.split('}').filter((rule) => rule.split('{')[0].split(',').includes(selector))
      .flatMap((rule) => [...rule.matchAll(new RegExp(`(?:^|[;{])${property}:([^;]+)`, 'g'))].map((match) => match[1]));
    return values[values.length - 1];
  };

  it('gives ComplexSelect options the neutral hover and selected fills of Select options', () => {
    render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <ComplexSelect open value="a" onChange={() => {}}>
          <ComplexSelect.MenuItem value="a">Alpha</ComplexSelect.MenuItem>
          <ComplexSelect.MenuItem value="b">Beta</ComplexSelect.MenuItem>
        </ComplexSelect>
      </OxygenUIThemeProvider>
    );
    const option = document.querySelector('.MuiMenuItem-root') as HTMLElement;
    const className = cssClass(option);
    const css = renderedCss();

    expect(winningValue(css, `.${className}:hover`, 'background-color')).toBe('var(--oxygen-palette-action-hover)');
    expect(winningValue(css, `.${className}.Mui-selected`, 'background-color')).toBe('var(--oxygen-palette-action-selected)');
    expect(winningValue(css, `.${className}.Mui-selected:hover`, 'background-color')).toBe('var(--oxygen-palette-action-selected)');
  });

  it('styles the ComplexSelect outside label like the Select fixed label', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <ComplexSelect label="Role" labelAnchor="outside" value="a" onChange={() => {}}>
          <ComplexSelect.MenuItem value="a">Alpha</ComplexSelect.MenuItem>
        </ComplexSelect>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(getByText('Role'));
    const css = renderedCss();

    expect(winningValue(css, `.${className}`, 'color')).toBe('var(--oxygen-palette-text-secondary)');
    expect(winningValue(css, `.${className}`, 'font-weight')).toBe('400');
    expect(winningValue(css, `.${className}`, 'margin-bottom')).toBe('4px');
    expect(winningValue(css, `.${className}.Mui-focused`, 'color')).toBe('var(--oxygen-palette-text-secondary)');
  });

  it.each([
    ['outside', 'var(--oxygen-palette-text-primary)', '0 0 0 3px #1F4FFF40'],
    ['inside', 'var(--oxygen-palette-text-primary)', '0 0 0 3px #1F4FFF40'],
    ['border', 'var(--oxygen-palette-text-primary)', undefined],
  ] as const)('gives ComplexSelect with the label %s a text-colour focus border, with a ring unless the label is on the border', (labelAnchor, borderColor, ring) => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <ComplexSelect label="Role" labelAnchor={labelAnchor} value="a" onChange={() => {}}>
          <ComplexSelect.MenuItem value="a">Alpha</ComplexSelect.MenuItem>
        </ComplexSelect>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(container.querySelector('.MuiInputBase-root') as HTMLElement);
    const css = renderedCss();

    expect(winningValue(css, `.${className}.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline`, 'border-color')).toBe(borderColor);
    expect(winningValue(css, `.${className}.Mui-focused`, 'box-shadow')).toBe(ring);
  });

  it.each(['outside', 'inside'] as const)('turns the ComplexSelect focus ring red on error with the label %s', (labelAnchor) => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <ComplexSelect label="Role" labelAnchor={labelAnchor} error value="a" onChange={() => {}}>
          <ComplexSelect.MenuItem value="a">Alpha</ComplexSelect.MenuItem>
        </ComplexSelect>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(container.querySelector('.MuiInputBase-root') as HTMLElement);

    expect(winningValue(renderedCss(), `.${className}.Mui-focused.Mui-error`, 'box-shadow')).toBe('0 0 0 3px rgba(var(--oxygen-palette-error-mainChannel) / 0.25)');
  });

  it('gives a ComplexSelect without a label the text-colour focus border but no ring, like a Select without one', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <ComplexSelect value="a" onChange={() => {}} slotProps={{ input: { 'aria-label': 'Role' } }}>
          <ComplexSelect.MenuItem value="a">Alpha</ComplexSelect.MenuItem>
        </ComplexSelect>
      </OxygenUIThemeProvider>
    );
    const className = cssClass(container.querySelector('.MuiInputBase-root') as HTMLElement);
    const css = renderedCss();

    expect(winningValue(css, `.${className}.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline`, 'border-color')).toBe('var(--oxygen-palette-text-primary)');
    expect(winningValue(css, `.${className}.Mui-focused`, 'box-shadow')).toBeUndefined();
  });

  it('gives a SearchBar without a floating label the fixed-label focus ring, red on error', () => {
    const { container } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <SearchBar />
      </OxygenUIThemeProvider>
    );
    const className = cssClass(container.querySelector('.MuiTextField-root') as HTMLElement);
    const css = renderedCss();
    const focused = `.${className}:not(:has(> .MuiInputLabel-root))>.MuiOutlinedInput-root.Mui-focused`;

    expect(winningValue(css, focused, 'box-shadow')).toBe('0 0 0 3px #1F4FFF40');
    expect(winningValue(css, `${focused}.Mui-error`, 'box-shadow')).toBe('0 0 0 3px rgba(var(--oxygen-palette-error-mainChannel) / 0.25)');
  });

  it('styles links and text inside plain Breadcrumbs like AppBreadcrumbs items', () => {
    const { getByText } = render(
      <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="#">Home</Link>
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>
      </OxygenUIThemeProvider>
    );
    const css = renderedCss();
    const link = getByText('Home');
    const text = getByText('Products');
    const rootClass = cssClass(link.closest('.MuiBreadcrumbs-root') as HTMLElement);
    const linkRule = `.${rootClass} .MuiBreadcrumbs-li:not(:last-child)>.MuiLink-root`;

    expect(winningValue(css, linkRule, 'color')).toBe('var(--oxygen-palette-Breadcrumbs-linkColor)');
    expect(winningValue(css, linkRule, 'text-decoration')).toBe('none');
    expect(winningValue(css, `${linkRule}:hover`, 'color')).toBe('var(--oxygen-palette-Breadcrumbs-linkHoverColor)');
    expect(winningValue(css, `${linkRule}:hover`, 'text-decoration')).toBe('none');
    expect(winningValue(css, `.${rootClass} .MuiBreadcrumbs-li>.MuiTypography-root`, 'font-size')).toBe('inherit');
    expect(text.closest('.MuiBreadcrumbs-li')).not.toBeNull();
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
