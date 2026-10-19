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

import OxygenThemeBase from '../OxygenThemeBase';
import { createOxygenTheme } from '../../utils/createOxygenTheme';
import type { OxygenTheme } from '../OxygenThemeBase';

/**
 * WSO2 brand color ramps (Foundations › Color).
 * Orange 500 is the brand accent and is used sparingly, for the single most important action.
 */
const neutral = {
  50: '#F7F7F7',
  100: '#EBEBEB',
  200: '#D9D9D9',
  300: '#C2C2C2',
  400: '#A9A9A9',
  600: '#767676',
  700: '#5C5C5C',
  800: '#444444',
  900: '#2E2E2E',
  950: '#161616',
};

const blue = {
  50: '#DFF7FF',
  100: '#C5EAFF',
  200: '#A6D5FF',
  300: '#86BBFF',
  400: '#699FFF',
  500: '#325FEB',
  800: '#1432A4',
  900: '#091E7A',
  950: '#02074B',
};

const orange = {
  50: '#FFE6D6',
  100: '#FFD0B8',
  200: '#FFB292',
  300: '#FF906B',
  400: '#FF6E47',
  500: '#F14E23',
  600: '#D32F00',
  700: '#AF0700',
  800: '#890000',
  900: '#640000',
  950: '#3B0000',
};

/**
 * Dark mode navy surfaces and accents.
 */
const navy = {
  canvas: '#0B142B', // Page, header and sidebar
  raised: '#12203E', // Cards, menus, list rows and selected items
  textPrimary: '#E4ECFA',
  textSecondary: 'rgba(228, 236, 250, 0.80)',
  accentLight: '#B9D8FF',
  accent: '#6FA8F5',
  accentDark: '#164C93',
};

/**
 * Light mode mesh behind the shell: a warm orange bloom top left, a white bloom bottom left
 * and a navy bloom on the right.
 */
const lightMesh =
  `radial-gradient(55% 50% at 8% 4%, ${orange[400]} 0%, ${orange[500]}6b 32%, ${orange[500]}00 66%),` +
  'radial-gradient(50% 55% at 2% 96%, #FFFFFF 0%, #FFFFFF66 40%, #FFFFFF00 74%),' +
  `radial-gradient(80% 85% at 96% 26%, ${blue[950]} 0%, ${blue[800]} 45%, ${blue[950]}00 88%),` +
  `linear-gradient(120deg, ${orange[100]} 0%, #8891A8 52%, ${blue[950]} 100%)`;

/**
 * Washes the mesh with white so surfaces stay readable; the sidebar shows slightly more mesh
 * than the page.
 */
const lightWash = (alpha: number): string =>
  `linear-gradient(rgba(255, 255, 255, ${alpha}), rgba(255, 255, 255, ${alpha})), ${lightMesh}`;

const semantic = {
  error: '#E60000',
  warning: '#FFB400',
  success: '#00C853',
  // Darker shades for text on light surfaces; the base colors fall below 4.5:1 on white
  warningText: '#8A5A00',
  successText: '#007A33',
};

const grey = {
  50: neutral[50],
  100: neutral[100],
  200: neutral[200],
  300: neutral[300],
  400: neutral[400],
  600: neutral[600],
  700: neutral[700],
  800: neutral[800],
  900: neutral[900],
};

/**
 * WSO2Theme - The default theme for WSO2 applications, reflecting the brand's identity
 * Features: Orange 500 brand accent, blue secondary, neutral greys and aurora mesh backgrounds
 * Perfect for WSO2's product suite and applications that want to align with WSO2 branding
 */
const WSO2ThemeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: orange[500],
          main: orange[600], // WSO2 Orange
          dark: orange[700],
          contrastText: '#FFFFFF',
        },
        secondary: {
          light: blue[500],
          main: blue[800], // WSO2 Blue
          dark: blue[900],
          contrastText: '#FFFFFF',
        },
        success: {
          main: semantic.success,
          dark: semantic.successText,
          contrastText: neutral[950],
        },
        warning: {
          main: semantic.warning,
          dark: semantic.warningText,
          contrastText: neutral[950],
        },
        error: {
          main: semantic.error,
          contrastText: '#FFFFFF',
        },
        info: {
          light: blue[500],
          main: blue[800],
          dark: blue[900],
          contrastText: '#FFFFFF',
        },
        grey,
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
          acrylic: '#FFFFFF',
        },
        text: {
          primary: blue[950],
          secondary: neutral[800],
        },
        divider: `${blue[950]}1f`,
        action: {
          selected: '#FFFFFF',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: orange[500],
          main: orange[600], // WSO2 Orange, deepened so white text reads on navy
          dark: orange[700],
          contrastText: '#FFFFFF',
        },
        secondary: {
          light: navy.accentLight,
          main: navy.accent, // WSO2 Blue, lifted for contrast on navy
          dark: navy.accentDark,
          contrastText: neutral[950],
        },
        success: {
          main: semantic.success,
          contrastText: neutral[950],
        },
        warning: {
          main: semantic.warning,
          contrastText: neutral[950],
        },
        error: {
          main: semantic.error,
          contrastText: '#FFFFFF',
        },
        info: {
          light: navy.accentLight,
          main: navy.accent,
          dark: navy.accentDark,
          contrastText: neutral[950],
        },
        grey,
        background: {
          default: navy.canvas, // Navy night
          paper: navy.raised,
          acrylic: navy.raised,
        },
        text: {
          primary: navy.textPrimary,
          secondary: navy.textSecondary,
        },
        divider: 'rgba(255, 255, 255, 0.14)',
        action: {
          selected: navy.raised,
        },
      },
    },
  },
  shape: {
    borderRadius: 20, // WSO2 button border radius
  },
  blur: {
    none: 'none',
    light: 'blur(10px)',
    medium: 'blur(16px)',
    heavy: 'blur(24px)',
  },
  gradient: {
    // Signal: accent bars and 4px rules only
    primary: `linear-gradient(120deg, ${blue[500]} 0%, ${blue[300]} 50%, ${orange[500]} 100%)`,
  },
  syntax: {
    light: {
      background: '#f5f5f5',
    },
    dark: {
      background: '#0c0c0c',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Night: a single flat navy so the shell reads as one surface
        "html[data-color-scheme='dark'] body": {
          backgroundColor: navy.canvas,
          backgroundImage: 'none',
        },
        // Light: the washed mesh shows through the page behind the content
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundColor: '#FFFFFF',
          backgroundImage: lightWash(0.9),
        },
      },
    },
    // The header sits on the page color: it shows the washed mesh in light mode and the page navy in dark mode
    MuiHeader: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: 'transparent',
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.background.default,
          }),
        }),
      },
    },
    // The sidebar shows a little more of the mesh than the page in light mode and the page navy in dark mode
    MuiSidebar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundAttachment: 'fixed',
          backgroundImage: lightWash(0.86),
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.background.default,
            backgroundImage: 'none',
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'color 0.3s ease-in-out',
          // Show labels as written (sentence case) instead of MUI's default all caps
          textTransform: 'none',
        },
        // Light mode Orange 500 needs dark text; darker hover and dark mode oranges need white text
        containedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.primary.contrastText,
          '&:hover': {
            color: '#FFFFFF',
          },
        }),
        outlined: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.main,
          },
          // Light mode labels use the darker shade so they meet 4.5:1 on white surfaces
          '&.MuiButton-colorSuccess': {
            color: theme.vars.palette.success.dark,
            borderColor: theme.vars.palette.success.main,
            '&:hover': {
              color: theme.vars.palette.success.dark,
              borderColor: theme.vars.palette.success.main,
            },
            ...theme.applyStyles('dark', {
              color: theme.vars.palette.success.main,
              '&:hover': {
                color: theme.vars.palette.success.main,
              },
            }),
          },
          // Light mode labels use the darker shade so they meet 4.5:1 on white surfaces
          '&.MuiButton-colorWarning': {
            color: theme.vars.palette.warning.dark,
            borderColor: theme.vars.palette.warning.main,
            '&:hover': {
              color: theme.vars.palette.warning.dark,
              borderColor: theme.vars.palette.warning.main,
            },
            ...theme.applyStyles('dark', {
              color: theme.vars.palette.warning.main,
              '&:hover': {
                color: theme.vars.palette.warning.main,
              },
            }),
          },
          '&.MuiButton-colorError': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            '&:hover': {
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
            },
          },
          '&.MuiButton-colorInfo': {
            color: theme.palette.info.main,
            borderColor: theme.palette.info.main,
            '&:hover': {
              color: theme.palette.info.main,
              borderColor: theme.palette.info.main,
            },
          },
        }),
        text: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.text.primary,
          '&:hover': {
            color: theme.vars.palette.text.primary,
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small' as const,
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small' as const,
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small' as const,
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
  },
};

const WSO2Theme = createOxygenTheme(WSO2ThemeConfig, OxygenThemeBase);

export default WSO2Theme;
