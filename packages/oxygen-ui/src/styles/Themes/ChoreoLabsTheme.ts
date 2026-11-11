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

import { extendTheme } from '@mui/material/styles';
import type { TypographyVariant, TypographyVariantsOptions } from '@mui/material/styles';
import OxygenThemeBase from '../OxygenThemeBase';
import { createOxygenTheme } from '../../utils/createOxygenTheme';
import type { OxygenTheme } from '../OxygenThemeBase';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    Button?: Partial<ChoreoLabsButtonPalette>;
    Breadcrumbs?: Partial<ChoreoLabsBreadcrumbsPalette>;
    Link?: Partial<ChoreoLabsLinkPalette>;
  }
  interface Palette {
    // Only set by ChoreoLabsTheme
    Button?: ChoreoLabsButtonPalette;
    Breadcrumbs?: ChoreoLabsBreadcrumbsPalette;
    Link?: ChoreoLabsLinkPalette;
  }
}

/** Link colours that differ between the light and dark schemes */
interface ChoreoLabsLinkPalette {
  /** Default (text colour) links on hover */
  hoverColor: string;
  /** Text of links with a palette `color` */
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  errorColor: string;
  warningColor: string;
  infoColor: string;
}

const linkColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;

/** Breadcrumb colours that differ between the light and dark schemes */
interface ChoreoLabsBreadcrumbsPalette {
  /** Parent levels */
  linkColor: string;
  /** Parent levels on hover */
  linkHoverColor: string;
  /** The slash between levels */
  separatorColor: string;
}

/**
 * Button colours that differ between the light and dark schemes. Kept in the palette so each scheme
 * swaps them through CSS variables, instead of scheme selectors that would outrank the disabled style.
 */
interface ChoreoLabsButtonPalette {
  /** Outlined primary border and label, and text primary label */
  outlinedColor: string;
  /** Text primary label on hover */
  textHoverColor: string;
  /** Contained secondary fill on hover and when pressed */
  containedSecondaryHoverBg: string;
  /** Contained secondary label on hover */
  containedSecondaryHoverColor: string;
  /** Contained secondary label when pressed */
  containedSecondaryActiveColor: string;
  disabledBg: string;
  disabledColor: string;
  /** Keyboard focus ring */
  focusRing: string;
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
  interface ButtonPropsVariantOverrides {
    subtle: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    tag: true;
  }
}

const tagColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const;

// A tag keeps its own colours when clickable or deletable, instead of MUI's grey hover and delete icon
const tagStyle = (backgroundColor: string, color: string) => ({
  backgroundColor,
  color,
  '&.MuiChip-clickable:hover, &.MuiChip-clickable.Mui-focusVisible, &.MuiChip-deletable.Mui-focusVisible': {
    backgroundColor,
    opacity: 0.85,
  },
  '& .MuiChip-deleteIcon, & .MuiChip-deleteIcon:hover': {
    color,
  },
});

/**
 * Choreo Labs core colours, from the Choreo Labs Web Design System.
 */
const ChoreoLabsColors = {
  signal: '#FF4600',
  flare: '#FF6E33',
  ember: '#8F2400',
  // Signal is below 4.5:1 as text on light surfaces, so orange text there uses Burn.
  burn: '#C43300',
  // The orange for white labels (4.6:1)
  action: '#D83B00',
  midnightInk: '#0B1633',
  deepNavy: '#17223A',
  blackout: '#050A1C',
  midnight900: '#070D22',
  midnightText2: '#AEB6C6',
  midnightText3: '#8A93A6',
  midnightText4: '#5F6B85',
  void: '#07080C',
  cobalt: '#1F4FFF',
  // Focus colour on dark surfaces, where Cobalt is too dark
  azure: '#3D8BFF',
  mist: '#EAF6FF',
  slate: '#5A6072',
  fog: '#D7DBE4',
  paper: '#F4F6FA',
  graphite: '#1E222C',
  white: '#FFFFFF',
};

// The guidelines define no info colour and Cobalt is never a fill, so info is neutral navy.
const ChoreoLabsStatusColors = {
  light: {
    info: { main: ChoreoLabsColors.midnightInk, contrastText: ChoreoLabsColors.white },
    success: { main: '#16A34A', dark: '#15803D', contrastText: ChoreoLabsColors.white },
    warning: { main: '#F5B300', dark: '#8A5A00', contrastText: ChoreoLabsColors.midnightInk },
    error: { main: '#E5484D', dark: '#B42318', contrastText: ChoreoLabsColors.white },
  },
  dark: {
    info: { main: ChoreoLabsColors.white, contrastText: ChoreoLabsColors.midnightInk },
    success: { main: '#4ADE80', contrastText: ChoreoLabsColors.midnightInk },
    warning: { main: '#FCD34D', contrastText: ChoreoLabsColors.midnightInk },
    error: { main: '#FF7A7F', contrastText: ChoreoLabsColors.midnightInk },
  },
};

// Matches only fixed-label fields: the Oxygen TextField's `top` mode puts a FormLabel right before
// an inner TextField that has no label of its own. Excluding TextFields with an InputLabel keeps a
// standalone FormLabel placed before a floating-label field from matching.
const fixedLabelField = '.MuiFormLabel-root + .MuiTextField-root:not(:has(> .MuiInputLabel-root))';

// Prefixes that, followed by an input root state, match only fixed-label inputs: the Oxygen TextField's
// inner input, and the Oxygen Select's `top` mode, which puts a FormLabel (not an InputLabel) right
// before the select's input root.
const fixedLabelInputs = [`${fixedLabelField} > &`, '.MuiFormLabel-root:not(.MuiInputLabel-root) + &'];
const onFixedLabelInput = (selector: string) => fixedLabelInputs.map((prefix) => `${prefix}${selector}`).join(', ');

// Floating-label selects and native selects share MuiOutlinedInput with text inputs but keep the
// Cobalt focus border; fixed-label selects take the text input focus style.
const notSelect = ':not(.MuiSelect-root):not(.MuiNativeSelect-root)';

// A FormControl whose field is a select, either directly or inside a wrapper. A select inside the
// field's own input root (such as a unit picker in a text field's adornment) doesn't count.
const selectFormControl = '.MuiFormControl-root:has(> .MuiSelect-root, > :not(.MuiInputBase-root) .MuiSelect-root, '
  + '> .MuiNativeSelect-root, > :not(.MuiInputBase-root) .MuiNativeSelect-root)';

const fontFamily = "'Sora Variable', sans-serif";

// Breadcrumbs use the guideline's small caption type at regular weight, current level included
const breadcrumbText = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.02em',
  wordSpacing: '0.18em',
};

// Outlined fields match the button heights: small fields line up with medium buttons, medium with large.
// Padding is derived from the 1.4375em line height so it holds for any font size. Heights aren't fixed,
// so multiline fields and Autocomplete chips still grow, and components that set their own size keep it.
// Buttons that lift on hover: not text buttons, and not buttons used as toggles
const liftingButton = ':not(.MuiButton-text):not(.MuiButtonGroup-grouped):not([aria-pressed])';

const fieldHeight = { small: 40, medium: 48 };
const fieldPadding = (height: number, inner = '0px') => `calc((${height}px - 1.4375em - ${inner}) / 2)`;

// Matches the base theme's `light` Avatar variant, for the avatars the app shell styles itself
const lightAvatar = ({ theme }: { theme: OxygenTheme }) => ({
  backgroundColor: `color-mix(in srgb, ${theme.vars.palette.primary.main} 12%, transparent)`,
  color: theme.vars.palette.primary.main,
});

// The base theme's typography variants each carry their own fontFamily, so set it on every variant.
const typographyVariants: TypographyVariant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline',
];

const ChoreoLabsColorSchemes = {
  light: {
    palette: {
      primary: {
        main: ChoreoLabsColors.signal,
        dark: ChoreoLabsColors.burn,
        contrastText: ChoreoLabsColors.midnightInk,
      },
      secondary: {
        main: ChoreoLabsColors.midnightInk,
        contrastText: ChoreoLabsColors.white,
      },
      accent: {
        main: ChoreoLabsColors.burn,
        light: ChoreoLabsColors.signal,
        dark: ChoreoLabsColors.ember,
        contrastText: ChoreoLabsColors.white,
      },
      background: {
        default: ChoreoLabsColors.paper,
        paper: '#ffffffc5',
        acrylic: ChoreoLabsColors.white,
      },
      text: {
        primary: ChoreoLabsColors.midnightInk,
        secondary: ChoreoLabsColors.slate,
      },
      divider: ChoreoLabsColors.fog,
      ...ChoreoLabsStatusColors.light,
      Avatar: {
        defaultBg: ChoreoLabsColors.fog,
      },
      Button: {
        outlinedColor: ChoreoLabsColors.burn,
        textHoverColor: ChoreoLabsColors.ember,
        // Midnight Ink fill: darkens to Void
        containedSecondaryHoverBg: ChoreoLabsColors.void,
        containedSecondaryHoverColor: ChoreoLabsColors.white,
        containedSecondaryActiveColor: ChoreoLabsColors.white,
        disabledBg: ChoreoLabsColors.fog,
        disabledColor: ChoreoLabsColors.slate,
        focusRing: ChoreoLabsColors.cobalt,
      },
      Breadcrumbs: {
        linkColor: ChoreoLabsColors.slate,
        linkHoverColor: ChoreoLabsColors.burn,
        separatorColor: ChoreoLabsColors.slate,
      },
      // Signal and the status colours are below 4.5:1 as text on light surfaces, so light-mode
      // link text uses their dark shades, the same as the Alert text colours
      Link: {
        hoverColor: ChoreoLabsColors.burn,
        primaryColor: ChoreoLabsColors.burn,
        secondaryColor: ChoreoLabsColors.midnightInk,
        successColor: '#15803D',
        errorColor: '#B42318',
        warningColor: '#8A5A00',
        infoColor: ChoreoLabsColors.midnightInk,
      },
      Alert: {
        infoColor: ChoreoLabsColors.midnightInk,
        infoIconColor: ChoreoLabsColors.midnightInk,
        infoStandardBg: ChoreoLabsColors.mist,
        successColor: '#15803D',
        successStandardBg: '#DCFCE7',
        warningColor: '#8A5A00',
        warningStandardBg: '#FEF6D8',
        warningFilledColor: ChoreoLabsColors.midnightInk,
        errorColor: '#B42318',
        errorStandardBg: '#FDE7E7',
      },
    },
  },
  dark: {
    palette: {
      primary: {
        main: ChoreoLabsColors.signal,
        dark: ChoreoLabsColors.burn,
        contrastText: ChoreoLabsColors.midnightInk,
      },
      // Midnight Ink disappears on the dark ground, so dark mode inverts the secondary colour
      secondary: {
        main: ChoreoLabsColors.white,
        contrastText: ChoreoLabsColors.midnightInk,
      },
      accent: {
        main: ChoreoLabsColors.burn,
        light: ChoreoLabsColors.signal,
        dark: ChoreoLabsColors.ember,
        contrastText: ChoreoLabsColors.white,
      },
      background: {
        default: ChoreoLabsColors.blackout,
        paper: `${ChoreoLabsColors.deepNavy}c5`,
        acrylic: `${ChoreoLabsColors.midnightInk}40`,
      },
      text: {
        primary: ChoreoLabsColors.white,
        secondary: '#D0D3E2',
      },
      divider: '#ffffff16',
      ...ChoreoLabsStatusColors.dark,
      Avatar: {
        defaultBg: ChoreoLabsColors.graphite,
      },
      Button: {
        outlinedColor: ChoreoLabsColors.signal,
        textHoverColor: ChoreoLabsColors.flare,
        // White fill (the guideline's inverse button): the fill stays and the label turns orange
        containedSecondaryHoverBg: ChoreoLabsColors.white,
        containedSecondaryHoverColor: ChoreoLabsColors.action,
        containedSecondaryActiveColor: ChoreoLabsColors.burn,
        disabledBg: ChoreoLabsColors.midnight900,
        disabledColor: ChoreoLabsColors.midnightText3,
        focusRing: ChoreoLabsColors.azure,
      },
      Breadcrumbs: {
        linkColor: ChoreoLabsColors.midnightText2,
        linkHoverColor: ChoreoLabsColors.signal,
        separatorColor: ChoreoLabsColors.midnightText4,
      },
      Link: {
        hoverColor: ChoreoLabsColors.signal,
        primaryColor: ChoreoLabsColors.signal,
        secondaryColor: ChoreoLabsColors.white,
        successColor: '#4ADE80',
        errorColor: '#FF7A7F',
        warningColor: '#FCD34D',
        infoColor: ChoreoLabsColors.white,
      },
      Alert: {
        infoColor: ChoreoLabsColors.white,
        infoIconColor: ChoreoLabsColors.white,
        infoStandardBg: ChoreoLabsColors.midnightInk,
        // The derived filled colour would be grey
        infoFilledBg: ChoreoLabsColors.deepNavy,
        infoFilledColor: ChoreoLabsColors.white,
        // Status text in dark mode is the light shade on Ink; filled alerts keep the base colours
        successColor: '#4ADE80',
        successStandardBg: ChoreoLabsColors.midnightInk,
        successFilledBg: '#16A34A',
        successFilledColor: ChoreoLabsColors.white,
        warningColor: '#FCD34D',
        warningStandardBg: ChoreoLabsColors.midnightInk,
        warningFilledBg: '#F5B300',
        warningFilledColor: ChoreoLabsColors.midnightInk,
        errorColor: '#FF7A7F',
        errorStandardBg: ChoreoLabsColors.midnightInk,
        errorFilledBg: '#E5484D',
        errorFilledColor: ChoreoLabsColors.white,
      },
    },
  },
};

// OxygenThemeBase is an already-built theme, so overriding only `main` on top of it keeps the
// base orange's derived values (light/dark shades, colour channels, Alert, LinearProgress, Slider...).
// Building the palettes on their own first gives createOxygenTheme a complete set that replaces them.
const { colorSchemes } = extendTheme({
  cssVarPrefix: 'oxygen', // Same as OxygenThemeBase, so derived values reference --oxygen-* variables
  colorSchemes: ChoreoLabsColorSchemes,
});

/**
 * ChoreoLabs Theme - Choreo Labs brand theme
 * A copy of AcrylicOrangeTheme (translucent acrylic surfaces) with the Choreo Labs palette and the
 * Sora typeface: Signal orange primary, Midnight Ink text and Blackout dark mode. The brand uses no gradients, so the page
 * background is the flat Paper or Blackout colour instead of Acrylic Orange's radial background.
 *
 * Usage:
 * ```tsx
 * import { OxygenUIThemeProvider, ChoreoLabsTheme } from '@wso2/oxygen-ui';
 *
 * <OxygenUIThemeProvider theme={ChoreoLabsTheme}>
 *   <App />
 * </OxygenUIThemeProvider>
 * ```
 */
const ChoreoLabsThemeConfig = {
  colorSchemes,
  typography: typographyVariants.reduce<TypographyVariantsOptions>(
    (typography, variant) => ({ ...typography, [variant]: { fontFamily } }),
    { fontFamily },
  ),
  shape: {
    borderRadius: 12,
  },
  gradient: {
    // Unused by the theme; kept flat for apps that read theme.gradient.primary
    primary: `linear-gradient(${ChoreoLabsColors.signal}, ${ChoreoLabsColors.signal})`,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.Avatar.defaultBg,
          color: theme.vars.palette.text.primary,
        }),
      },
    },
    // Icon and letter avatars in page titles use the light tint; image avatars cover it
    MuiPageTitle: {
      styleOverrides: {
        avatar: lightAvatar,
      },
    },
    MuiUserMenu: {
      styleOverrides: {
        avatar: lightAvatar,
        headerAvatar: lightAvatar,
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `2px solid ${ChoreoLabsColors.cobalt}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiButton: {
      // The guidelines' buttons are flat: no shadow at rest, on hover, when pressed or on focus
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        // States follow the Choreo Labs button guidelines. Keyboard focus takes the hover colours (without
        // the lift), as in the guidelines. Hover rules come before active ones so a pressed button shows
        // its active colours.
        root: ({ theme }: { theme: OxygenTheme }) => ({
          // Every button is a pill at any height, as in the guidelines (--cl-radius-pill)
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 500,
          // Colours ease over 250ms; the lift uses the guidelines' ease-out curve
          transition: [
            theme.transitions.create(['background-color', 'border-color', 'color'], {
              duration: theme.transitions.duration.short,
            }),
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.short,
              easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
            }),
          ].join(', '),
          // A 3px ring set 3px out: Cobalt on light surfaces, Azure on dark. Overrides the thinner
          // ButtonBase ring that other button-like components keep.
          '&.Mui-focusVisible': {
            outline: `3px solid ${theme.vars.palette.Button?.focusRing}`,
            outlineOffset: 3,
          },
          // Filled and outlined buttons lift 2px on hover and press in slightly. Text buttons stay put,
          // and so do buttons used as toggles (in a ButtonGroup or with aria-pressed): the lift would
          // pull one segment out of line with its neighbours.
          '@media (hover: hover) and (prefers-reduced-motion: no-preference)': {
            [`&${liftingButton}:hover`]: {
              transform: 'translateY(-2px)',
            },
          },
          '@media (prefers-reduced-motion: no-preference)': {
            [`&${liftingButton}:active`]: {
              transform: 'scale(0.98)',
            },
          },
          // Every variant shares one disabled style; text buttons only grey their label
          '&.Mui-disabled': {
            color: theme.vars.palette.Button?.disabledColor,
          },
          '&.Mui-disabled:not(.MuiButton-text)': {
            backgroundColor: theme.vars.palette.Button?.disabledBg,
            borderColor: 'transparent',
          },
        }),
        sizeSmall: { minHeight: 32 },
        sizeMedium: { minHeight: 40 },
        sizeLarge: { minHeight: 48 },
        // Signal fill with a Midnight Ink label; on hover and press the fill stays and the label turns white
        containedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
          '&:hover, &.Mui-focusVisible, &:active': {
            backgroundColor: theme.vars.palette.primary.main,
            color: ChoreoLabsColors.white,
          },
        }),
        // Burn outline (Signal in dark mode); fills with Signal on hover and Action with an Ink label when pressed
        outlinedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          borderColor: theme.vars.palette.Button?.outlinedColor,
          color: theme.vars.palette.Button?.outlinedColor,
          '&:hover, &.Mui-focusVisible': {
            borderColor: theme.vars.palette.primary.main,
            backgroundColor: theme.vars.palette.primary.main,
            color: ChoreoLabsColors.white,
          },
          '&:active': {
            borderColor: ChoreoLabsColors.action,
            backgroundColor: ChoreoLabsColors.action,
            color: ChoreoLabsColors.midnightInk,
          },
        }),
        // The guidelines have no text button, so it follows the link colours: Burn, then Ember on hover
        // (Signal and Flare in dark mode)
        textPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.Button?.outlinedColor,
          '&:hover, &.Mui-focusVisible': {
            color: theme.vars.palette.Button?.textHoverColor,
          },
        }),
        // Midnight Ink fill that darkens to Void on hover. Dark mode inverts it to a white fill whose
        // label turns Action on hover and Burn when pressed.
        containedSecondary: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.secondary.main,
          color: theme.vars.palette.secondary.contrastText,
          '&:hover, &.Mui-focusVisible': {
            backgroundColor: theme.vars.palette.Button?.containedSecondaryHoverBg,
            color: theme.vars.palette.Button?.containedSecondaryHoverColor,
          },
          '&:active': {
            backgroundColor: theme.vars.palette.Button?.containedSecondaryHoverBg,
            color: theme.vars.palette.Button?.containedSecondaryActiveColor,
          },
        }),
        // Ink outline (white in dark mode) that fills on hover and press
        outlinedSecondary: ({ theme }: { theme: OxygenTheme }) => ({
          borderColor: theme.vars.palette.secondary.main,
          color: theme.vars.palette.secondary.main,
          '&:hover, &.Mui-focusVisible, &:active': {
            borderColor: theme.vars.palette.secondary.main,
            backgroundColor: theme.vars.palette.secondary.main,
            color: theme.vars.palette.secondary.contrastText,
          },
        }),
      },
      variants: [
        // Outlined accent works like the other outlined buttons: a solid Burn outline that fills with
        // Burn and a white label on hover and keyboard focus, and darkens to Ember when pressed
        {
          props: { variant: 'outlined', color: 'accent' },
          style: ({ theme }: { theme: OxygenTheme }) => ({
            borderColor: theme.vars.palette.accent.main,
            color: theme.vars.palette.accent.main,
            '&:hover, &.Mui-focusVisible': {
              borderColor: theme.vars.palette.accent.main,
              backgroundColor: theme.vars.palette.accent.main,
              color: theme.vars.palette.accent.contrastText,
            },
            '&:active': {
              borderColor: theme.vars.palette.accent.dark,
              backgroundColor: theme.vars.palette.accent.dark,
              color: theme.vars.palette.accent.contrastText,
            },
          }),
        },
        // The guidelines' action button: white label on Action, darkening to Burn on hover and Ember when pressed
        {
          props: { variant: 'subtle' },
          style: {
            backgroundColor: ChoreoLabsColors.action,
            color: ChoreoLabsColors.white,
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: ChoreoLabsColors.burn,
            },
            '&:active': {
              backgroundColor: ChoreoLabsColors.ember,
            },
          },
        },
      ],
    },
    MuiFab: {
      styleOverrides: {
        primary: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: ChoreoLabsColors.flare,
          },
          '&:active': {
            backgroundColor: ChoreoLabsColors.ember,
            color: ChoreoLabsColors.white,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          background: theme.vars.palette.background.paper,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          background: theme.vars.palette.background.paper,
        }),
      },
    },
    MuiSidebar: {
      styleOverrides: {
        userAvatar: lightAvatar,
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.acrylic,
          WebkitBackdropFilter: theme.blur.light,
          backdropFilter: theme.blur.light,
          ...theme.applyStyles('light', {
            backgroundColor: ChoreoLabsColors.white,
          }),
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: `${theme.vars.palette.background.acrylic} !important`,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          borderRadius: 0,
          ...theme.applyStyles('light', {
            backgroundColor: `${ChoreoLabsColors.white} !important`,
          }),
        }),
      },
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
          marginBottom: '4px',
          // A select's error shows on its border and helper text, so its floating label keeps its colour.
          // Set here because InputLabel has no `error` style slot; InputLabel renders a FormLabel.
          [`${selectFormControl} > &.MuiInputLabel-root.Mui-error`]: {
            color: theme.vars.palette.text.secondary,
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          borderRadius: theme.shape.borderRadius,
          WebkitBackdropFilter: theme.blur.light,
          backdropFilter: theme.blur.light,
          border: `${theme.border.width} ${theme.border.style} ${theme.vars.palette.divider}`,
          backgroundColor: theme.vars.palette.background.acrylic,
          // Drop MUI's dark-mode elevation overlay gradient
          backgroundImage: 'none',
          boxShadow: theme.shadows[1],
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        // The Autocomplete input keeps MUI's own vertical padding (7.5px, or 2.5px when small)
        root: {
          '& .MuiOutlinedInput-root:not(.MuiInputBase-sizeSmall)': {
            paddingTop: fieldPadding(fieldHeight.medium, '15px'),
            paddingBottom: fieldPadding(fieldHeight.medium, '15px'),
          },
          '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
            paddingTop: fieldPadding(fieldHeight.small, '5px'),
            paddingBottom: fieldPadding(fieldHeight.small, '5px'),
          },
        },
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        }),
      },
    },
    MuiChip: {
      variants: [
        // `tag`: a filled, square-cornered uppercase label. Dark blue unless a colour is set.
        {
          props: { variant: 'tag' },
          style: ({ theme }: { theme: OxygenTheme }) => ({
            borderRadius: 4,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            ...tagStyle(theme.vars.palette.secondary.main, theme.vars.palette.secondary.contrastText),
          }),
        },
        ...tagColors.map((color) => ({
          props: { variant: 'tag' as const, color },
          style: ({ theme }: { theme: OxygenTheme }) =>
            tagStyle(theme.vars.palette[color].main, theme.vars.palette[color].contrastText),
        })),
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.acrylic,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        textColorPrimary: ({ theme }: { theme: OxygenTheme }) => theme.applyStyles('light', {
          '&.Mui-selected': {
            color: theme.vars.palette.primary.dark,
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&.MuiOutlinedInput-input': {
            paddingTop: fieldPadding(fieldHeight.medium),
            paddingBottom: fieldPadding(fieldHeight.medium),
          },
          '&.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall': {
            paddingTop: fieldPadding(fieldHeight.small),
            paddingBottom: fieldPadding(fieldHeight.small),
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Replaces the base theme's offset for select labels, which was tuned to the old field heights
          '.MuiFormControl-root:has(.MuiSelect-select) &:not(.MuiInputLabel-shrink)': {
            top: 0,
          },
        },
        outlined: {
          '&:not(.MuiInputLabel-shrink)': {
            transform: `translate(14px, ${fieldPadding(fieldHeight.medium)}) scale(1)`,
          },
          // A label outside a sized FormControl stays medium, so follow the field's size instead
          '&.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink), .MuiFormControl-root:has(.MuiInputBase-sizeSmall) &:not(.MuiInputLabel-shrink)': {
            transform: `translate(14px, ${fieldPadding(fieldHeight.small)}) scale(1)`,
          },
        },
        // The field's border already shows focus, so floating labels on text inputs and selects stay
        // neutral like fixed labels do.
        // `focused` rather than `root`: createOxygenTheme deep-merges objects but replaces functions,
        // so a function `root` would drop the base theme's select label offset.
        focused: ({ theme }: { theme: OxygenTheme }) => ({
          '&.Mui-focused:not(.Mui-error)': {
            color: theme.vars.palette.text.secondary,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Multiline fields pad the root instead
        input: ({ ownerState }: { ownerState: { size?: string; multiline?: boolean } }) => {
          if (ownerState.multiline) {
            return {};
          }
          const padding = fieldPadding(ownerState.size === 'small' ? fieldHeight.small : fieldHeight.medium);
          return { paddingTop: padding, paddingBottom: padding };
        },
        multiline: ({ ownerState }: { ownerState: { size?: string } }) => {
          const padding = fieldPadding(ownerState.size === 'small' ? fieldHeight.small : fieldHeight.medium);
          return { paddingTop: padding, paddingBottom: padding };
        },
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.pxToRem(14),
          borderRadius: 8,
          backgroundColor: theme.vars.palette.background.acrylic,
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: ChoreoLabsColors.cobalt,
          },
          // Text inputs and fixed-label selects follow the brand's focus style (thin text-colour border,
          // ring on fixed-label fields), while floating-label selects keep the Cobalt border above.
          [`&.Mui-focused${notSelect} .MuiOutlinedInput-notchedOutline, ${onFixedLabelInput('.Mui-focused .MuiOutlinedInput-notchedOutline')}`]: {
            borderWidth: 1.5,
          },
          [`&.Mui-focused:not(.Mui-error)${notSelect} .MuiOutlinedInput-notchedOutline, ${onFixedLabelInput('.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline')}`]: {
            borderColor: theme.vars.palette.text.primary,
          },
          // A box-shadow ignores the outline's notch and would cut through a floating label.
          [onFixedLabelInput('.Mui-focused')]: {
            boxShadow: `0 0 0 3px ${ChoreoLabsColors.cobalt}40`,
          },
          [onFixedLabelInput('.Mui-focused.Mui-error')]: {
            boxShadow: `0 0 0 3px rgba(${theme.vars.palette.error.mainChannel} / 0.25)`,
          },
        }),
        notchedOutline: ({ theme }: { theme: OxygenTheme }) => ({
          borderWidth: 1,
          borderColor: theme.vars.palette.divider,
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:not(.Mui-error)::after': {
            borderBottomColor: ChoreoLabsColors.cobalt,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&:not(.Mui-error)::after': {
            borderBottomColor: ChoreoLabsColors.cobalt,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
          // Drop the ButtonBase focus ring: the menu clips its sides, leaving stray lines above and
          // below the item. The focus background still marks the keyboard-focused item.
          '&.Mui-focusVisible': {
            outline: 'none',
          },
          // A neutral fill for the selected option, matching selected list items, instead of a primary tint.
          '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': {
            backgroundColor: theme.vars.palette.action.selected,
          },
        }),
      },
    },
    // ComplexSelect options match the Select's options: neutral hover and selected fills instead of
    // the component's primary tint
    MuiComplexSelectMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          '&:hover': {
            backgroundColor: theme.vars.palette.action.hover,
          },
          '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': {
            backgroundColor: theme.vars.palette.action.selected,
          },
        }),
      },
    },
    // The outside label matches the Select's fixed label: secondary text at regular weight, 4px
    // above the field, and no colour change on focus
    MuiComplexSelect: {
      styleOverrides: {
        // Focus is a 1.5px text-colour border in every label mode, not Cobalt. With the label outside
        // or inside, the field also gets the Select's fixed-label ring. A ring would cut through a
        // border label, and a field without a label gets none, like a Select without one.
        root: ({ theme, labelAnchor }: { theme: OxygenTheme; labelAnchor?: string }) => ({
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1.5,
          },
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.vars.palette.text.primary,
          },
          ...((labelAnchor === 'outside' || labelAnchor === 'inside') && {
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px ${ChoreoLabsColors.cobalt}40`,
            },
            '&.Mui-focused.Mui-error': {
              boxShadow: `0 0 0 3px rgba(${theme.vars.palette.error.mainChannel} / 0.25)`,
            },
          }),
        }),
        inputLabel: ({ theme, labelAnchor }: { theme: OxygenTheme; labelAnchor?: string }) => (
          labelAnchor === 'outside' ? {
            color: theme.vars.palette.text.secondary,
            fontWeight: theme.typography.fontWeightRegular,
            marginBottom: 4,
            '&.Mui-focused': {
              color: theme.vars.palette.text.secondary,
            },
          } : {}
        ),
      },
    },
    // Links without a `color` take the default text colour and turn orange on hover; links with a
    // palette `color` use the brand colour for it. The underline follows the `underline` prop, so
    // `none` never underlines; links default to underlining on hover.
    MuiLink: {
      defaultProps: {
        color: 'textPrimary',
        underline: 'hover',
      },
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          variants: [
            {
              props: { color: 'textPrimary' },
              style: {
                '&:hover': {
                  color: theme.vars.palette.Link?.hoverColor,
                },
              },
            },
            ...linkColors.map((color) => ({
              props: { color },
              style: {
                color: theme.vars.palette.Link?.[`${color}Color`],
              },
            })),
          ],
          '&.Mui-focusVisible, &:focus-visible': {
            outline: `2px solid ${ChoreoLabsColors.cobalt}`,
            outlineOffset: 2,
          },
        }),
      },
    },
    // The footer styles its links itself, so they need the same colours here
    MuiFooter: {
      styleOverrides: {
        link: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.text.primary,
          '&:hover': {
            color: theme.vars.palette.Link?.hoverColor,
          },
        }),
      },
    },
    // Slash separated, with 10px either side of the slash. Replaces the base theme's li and
    // separator styles, so the current level isn't bold and dark-mode parents aren't dimmed.
    MuiBreadcrumbs: {
      styleOverrides: {
        root: breadcrumbText,
        // Breadcrumb children are the app's own Link and Typography elements, so they're styled here
        // to match AppBreadcrumbs: caption text, and parent links that turn orange with no underline.
        li: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.Breadcrumbs?.linkColor,
          '&:last-child': {
            color: theme.vars.palette.text.primary,
          },
          '& > .MuiTypography-root': {
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            letterSpacing: 'inherit',
          },
          '&:not(:last-child) > .MuiLink-root': {
            color: theme.vars.palette.Breadcrumbs?.linkColor,
            textDecoration: 'none',
            '&:hover': {
              color: theme.vars.palette.Breadcrumbs?.linkHoverColor,
              textDecoration: 'none',
            },
          },
        }),
        separator: ({ theme }: { theme: OxygenTheme }) => ({
          marginLeft: 10,
          marginRight: 10,
          color: theme.vars.palette.Breadcrumbs?.separatorColor,
        }),
      },
    },
    MuiAppBreadcrumbs: {
      defaultProps: {
        separator: '/',
      },
      styleOverrides: {
        // MUI also resolves this with the root's props, where there is no item ownerState
        item: ({ theme, ownerState }: { theme: OxygenTheme; ownerState?: { isLast?: boolean; isClickable?: boolean } }) => ({
          ...breadcrumbText,
          ...(ownerState?.isLast && {
            color: theme.vars.palette.text.primary,
          }),
          ...(ownerState?.isClickable && {
            color: theme.vars.palette.Breadcrumbs?.linkColor,
            '&:hover': {
              textDecoration: 'none',
              color: theme.vars.palette.Breadcrumbs?.linkHoverColor,
            },
          }),
        }),
        ellipsis: {
          ...breadcrumbText,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: theme.vars.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.vars.palette.action.selected,
            },
          },
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          border: 'none',
          backgroundColor: 'transparent',
          overflow: 'hidden',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.vars.palette.action.hover,
            WebkitBackdropFilter: theme.blur.medium,
            backdropFilter: theme.blur.medium,
            borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars.palette.divider}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          },
          '& .MuiDataGrid-virtualScroller': {
            marginTop: '0 !important',
            overflow: 'auto',
          },
        }),
        columnHeaders: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.action.hover,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars.palette.divider}`,
        }),
        columnHeader: {
          backgroundColor: 'transparent',
        },
        cell: ({ theme }: { theme: OxygenTheme }) => ({
          borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars.palette.divider}`,
          backgroundColor: 'transparent',
        }),
      },
    },
  },
};

const ChoreoLabsTheme = createOxygenTheme(ChoreoLabsThemeConfig, OxygenThemeBase);

export default ChoreoLabsTheme;
