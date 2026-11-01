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
import OxygenThemeBase from '../OxygenThemeBase';
import { createOxygenTheme } from '../../utils/createOxygenTheme';
import type { OxygenTheme } from '../OxygenThemeBase';

/**
 * Choreo Labs core colours, from the Choreo Labs Web Design System.
 */
const ChoreoLabsColors = {
  signal: '#FF4600',
  // Signal is below 4.5:1 as text on light surfaces, so orange text there uses Burn.
  burn: '#C43300',
  midnightInk: '#0B1633',
  blackout: '#050A1C',
  cobalt: '#1F4FFF',
  slate: '#5A6072',
  paper: '#F4F6FA',
  white: '#FFFFFF',
};

// Sora, the Choreo Labs brand typeface, loaded from @fontsource-variable/sora in fonts-sora.css.
const fontFamily = "'Sora Variable', sans-serif";

// The base theme is already built, so its typography variants each carry their own fontFamily.
// Set it on every variant, not only the root, so a font change reaches all of them.
const typographyVariants = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline',
];

const ChoreoLabsColorSchemes = {
  light: {
    palette: {
      primary: {
        main: ChoreoLabsColors.signal,
        dark: ChoreoLabsColors.burn,
        contrastText: ChoreoLabsColors.midnightInk, // Text on Signal is Midnight Ink
      },
      secondary: {
        main: '#e8e8e8',
      },
      info: {
        main: ChoreoLabsColors.cobalt,
        contrastText: ChoreoLabsColors.white,
      },
      background: {
        default: ChoreoLabsColors.paper,
        paper: '#ffffffc5',
        acrylic: '#ffffff40', // More transparent version for Paper and Card components
      },
      text: {
        primary: ChoreoLabsColors.midnightInk,
        secondary: ChoreoLabsColors.slate,
      },
      divider: '#00000012',
    },
  },
  dark: {
    palette: {
      primary: {
        main: ChoreoLabsColors.signal,
        dark: ChoreoLabsColors.burn,
        contrastText: ChoreoLabsColors.midnightInk,
      },
      secondary: {
        main: '#3c3c3c',
      },
      info: {
        main: ChoreoLabsColors.cobalt,
        contrastText: ChoreoLabsColors.white,
      },
      background: {
        default: ChoreoLabsColors.blackout,
        paper: `${ChoreoLabsColors.midnightInk}c5`,
        acrylic: `${ChoreoLabsColors.midnightInk}40`, // More transparent version for Paper and Card components
      },
      text: {
        primary: ChoreoLabsColors.white,
        secondary: '#D0D3E2',
      },
      divider: '#ffffff16',
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
  typography: typographyVariants.reduce<Record<string, unknown>>(
    (typography, variant) => ({ ...typography, [variant]: { fontFamily } }),
    { fontFamily },
  ),
  shape: {
    borderRadius: 12,
  },
  gradient: {
    // The brand uses no gradients, so the theme itself doesn't use this. It stays a flat Signal for
    // apps that read theme.gradient.primary.
    primary: `linear-gradient(${ChoreoLabsColors.signal}, ${ChoreoLabsColors.signal})`,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.secondary.main,
          color: theme.vars.palette.text.primary,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 400,
        },
        containedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          '&:not(:disabled)': {
            background: `${theme.vars.palette.primary.main} !important`,
            color: `${theme.vars.palette.primary.contrastText} !important`,
            // The default hover darkens to Burn, which is below 4.5:1 against Midnight Ink text.
            '&:hover': {
              background: `${theme.vars.palette.primary.main} !important`,
              opacity: 0.9,
              color: `${theme.vars.palette.primary.contrastText} !important`,
            },
          },
        }),
        outlinedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          borderColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.main,
          '&:hover': {
            borderColor: theme.vars.palette.primary.dark,
            backgroundColor: theme.vars.palette.action.hover,
          },
          ...theme.applyStyles('light', {
            color: theme.vars.palette.primary.dark,
          }),
        }),
        textPrimary: ({ theme }: { theme: OxygenTheme }) => theme.applyStyles('light', {
          color: theme.vars.palette.primary.dark,
        }),
        containedSecondary: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.secondary.main,
          color: theme.vars.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.vars.palette.secondary.main,
            opacity: 0.8,
          },
        }),
        outlinedSecondary: ({ theme }: { theme: OxygenTheme }) => ({
          borderColor: theme.vars.palette.divider,
          color: theme.vars.palette.text.primary,
          '&:hover': {
            borderColor: theme.vars.palette.text.secondary,
            backgroundColor: theme.vars.palette.action.hover,
          },
        }),
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.vars.palette.primary.main,
            opacity: 0.9,
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
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.acrylic,
          WebkitBackdropFilter: theme.blur.light,
          backdropFilter: theme.blur.light,
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
          marginBottom: '2px',
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
          // More transparent for direct Paper component usage
          backgroundColor: theme.vars.palette.background.acrylic,
          // No gradients: drop MUI's dark-mode elevation overlay
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
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          // More transparent for Card component
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
          borderRadius: 8,
          backgroundColor: theme.vars.palette.background.acrylic,
        }),
        notchedOutline: ({ theme }: { theme: OxygenTheme }) => ({
          borderWidth: 1,
          borderColor: theme.vars.palette.divider,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
            color: theme.vars.palette.primary.dark,
            textDecoration: 'underline',
          },
          ...theme.applyStyles('light', {
            color: theme.vars.palette.primary.dark,
          }),
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          borderRadius: 8,
          '&.Mui-selected': {
            // Use CSS variable - automatically adapts to color scheme
            backgroundColor: theme.vars.palette.action.selected,
            // Keep the selected background on hover so the item still reads as selected
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
