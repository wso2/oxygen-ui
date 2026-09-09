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
import type { Shadows } from '@mui/material/styles';

/**
 * WSO2WebTheme - The WSO2 Web Design System look, as used on wso2.com and its
 * identity surfaces (sign-in, console). A sibling of WSO2Theme rather than a
 * replacement: WSO2Theme carries the product tangerine (#FF7300) and cyan pairing,
 * while this theme carries the web system's deep indigo and orange-red.
 *
 * Role mapping follows what the source designs actually render, not the names their
 * token block declares (the two disagree):
 * - #D32F00 (orange-red) is the action colour: submit buttons, checkbox accents, link hover
 * - #02074B (deep indigo) is the type colour: headings, links, on-surface text
 * - #3866F3 (blue) is informational only: metrics, sparklines, progress
 *
 * Usage:
 * ```tsx
 * import { OxygenUIThemeProvider, WSO2WebTheme } from '@wso2/oxygen-ui';
 *
 * <OxygenUIThemeProvider theme={WSO2WebTheme}>
 *   <App />
 * </OxygenUIThemeProvider>
 * ```
 */

/** Elevation ramp from the design's four shadow tokens, tinted navy rather than black. */
const WSO2WebShadows = [
  'none',
  ...Array(4).fill('0 1px 2px rgba(0,26,53,0.06)'),
  ...Array(4).fill('0 2px 10px rgba(0,26,53,0.08)'),
  ...Array(8).fill('0 4px 20px rgba(0,26,53,0.12)'),
  ...Array(8).fill('0 24px 60px rgba(2,7,75,0.22)'),
] as Shadows;

/**
 * The login design's four-layer mesh: an orange bloom top-left, a white bloom bottom-left,
 * an indigo-to-blue bloom right, over a peach-to-indigo base. Light mode keeps the peach
 * side dominant so on-surface text stays legible; dark mode drops onto the #1A2740 base.
 */
const meshLight =
  'radial-gradient(55% 50% at 8% 4%, rgba(255,110,71,0.20) 0%, rgba(241,78,35,0.08) 32%, rgba(241,78,35,0) 66%), ' +
  'radial-gradient(50% 55% at 2% 96%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0) 74%), ' +
  'radial-gradient(80% 85% at 96% 26%, rgba(20,50,164,0.10) 0%, rgba(56,102,243,0.05) 45%, rgba(2,7,75,0) 88%), ' +
  'linear-gradient(120deg, #F7F4F2 0%, #F4F6FA 52%, #EEF1F7 100%)';

const meshDark =
  'radial-gradient(55% 50% at 8% 4%, rgba(255,110,71,0.24) 0%, rgba(241,78,35,0.10) 32%, rgba(241,78,35,0) 66%), ' +
  'radial-gradient(50% 55% at 2% 96%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0) 74%), ' +
  'radial-gradient(80% 85% at 96% 26%, rgba(20,50,164,0.28) 0%, rgba(56,102,243,0.14) 45%, rgba(2,7,75,0) 88%), ' +
  'linear-gradient(120deg, #1F2637 0%, #1A2740 52%, #131C33 100%)';

/**
 * Content surfaces in the designs are fully opaque (#fff list rows), unlike the shell
 * panels which sit at 0.86-0.90 with a blur. Keyed off colorSchemeSelector rather than
 * palette.common.background, which resolves to #000 under the dark scheme.
 */
const OPAQUE_SURFACE = {
  backgroundColor: '#FFFFFF',
  backdropFilter: 'none',
  WebkitBackdropFilter: 'none',
  "html[data-color-scheme='dark'] &": {
    backgroundColor: '#1F2E4A',
  },
} as const;

const WSO2WebThemeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#D32F00', // The design's call to action: submit buttons, accents
          light: '#FF6E47',
          dark: '#AF0700',
          contrastText: '#FFFFFF',
        },
        secondary: {
          // OAuth / alternate actions render as near-white pills with indigo type
          main: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#F7F7F7',
          contrastText: '#02074B',
        },
        info: {
          main: '#3866F3', // Metrics, sparklines, progress - informational only
          light: '#6E8FF7',
          dark: '#1432A4',
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#D93025',
          light: '#FF8A80',
          dark: '#AF0700',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#E8A100',
          light: '#F5C242',
          dark: '#B87F00',
          contrastText: '#000000', // Amber needs dark type; white only reaches 2.2:1
        },
        success: {
          main: '#1A7F35', // Nudged darker than the #1E8E3E token to clear 4.5:1 on white
          light: '#1E8E3E',
          dark: '#14622A',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#F4F6FA',
          paper: 'rgba(255,255,255,0.92)', // Design's shell panels sit at 0.86-0.90
          acrylic: 'rgba(255,255,255,0.86)',
        },
        text: {
          primary: '#444444',
          secondary: '#5C5C5C',
          disabled: '#A9A9A9',
        },
        divider: 'rgba(2,7,75,0.14)',
        action: {
          hover: 'rgba(2,7,75,0.045)',
          hoverOpacity: 0.045,
          selected: 'rgba(2,7,75,0.1)',
          selectedOpacity: 0.1,
        },
      },
    },
    dark: {
      palette: {
        // The source designs ship no dark mode. Surfaces come from the login mesh's
        // #1A2740 base and each accent is lifted until it clears 4.5:1 against it.
        primary: {
          main: '#FF6E47',
          light: '#FFD0B8',
          dark: '#D32F00',
          contrastText: '#2A1215',
        },
        secondary: {
          main: '#243352',
          light: '#31446B',
          dark: '#1A2740',
          contrastText: '#FFFFFF',
        },
        info: {
          main: '#8FB0FF',
          light: '#C5EAFF',
          dark: '#3866F3',
          contrastText: '#02074B',
        },
        error: {
          main: '#FF8A80',
          light: '#FFB3A3',
          dark: '#D93025',
          contrastText: '#2A1215',
        },
        warning: {
          main: '#F5C242',
          light: '#FFD08A',
          dark: '#E8A100',
          contrastText: '#0F1830',
        },
        success: {
          main: '#6FD68A',
          light: '#9BE6AC',
          dark: '#1E8E3E',
          contrastText: '#0F1830',
        },
        background: {
          default: '#1A2740',
          paper: 'rgba(26,39,64,0.92)',
          acrylic: 'rgba(26,39,64,0.86)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C2C2C2',
          disabled: '#8891A8',
        },
        divider: 'rgba(255,255,255,0.14)',
        action: {
          hover: 'rgba(255,255,255,0.06)',
          hoverOpacity: 0.06,
          selected: 'rgba(255,110,71,0.16)',
          selectedOpacity: 0.16,
        },
      },
    },
  },
  typography: {
    fontFamily: "'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  shape: {
    borderRadius: 15, // --radius-xl, the design's standard card radius
  },
  shadows: WSO2WebShadows,
  blur: {
    none: 'none',
    light: 'blur(10px)',
    medium: 'blur(22px)', // The design's card blur
    heavy: 'blur(28px)', // The design's mesh bloom blur
  },
  gradient: {
    primary: 'linear-gradient(90deg, #02074B 0%, #1432A4 100%)', // --gradient-text
  },
  syntax: {
    light: {
      background: '#F8F9FA',
    },
    dark: {
      background: '#0B1733',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: meshLight,
        },
        "html[data-color-scheme='dark'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: meshDark,
        },
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
    MuiCard: {
      styleOverrides: {
        // Cards are content, not chrome: opaque, so no mesh bleeds through
        root: {
          ...OPAQUE_SURFACE,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Pill buttons throughout both designs
          textTransform: 'none' as const,
          fontWeight: 700,
        },
        // Alternate actions are near-white pills with a navy hairline, not solid fills
        containedSecondary: {
          border: '1px solid rgba(2,7,75,0.14)',
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Headings carry the deep indigo; body copy stays on text.primary (#444444)
        h1: ({ theme }: { theme: OxygenTheme }) => ({ color: theme.vars.palette.text.primary }),
        h2: ({ theme }: { theme: OxygenTheme }) => ({ color: theme.vars.palette.text.primary }),
        h3: ({ theme }: { theme: OxygenTheme }) => ({ color: theme.vars.palette.text.primary }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.vars.palette.text.primary,
          textDecoration: 'none',
          '&:hover': {
            color: theme.vars.palette.primary.main, // a:hover { color: #D32F00 }
            textDecoration: 'none',
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          '&.Mui-checked': {
            color: theme.vars.palette.primary.main, // accent-color: #D32F00
          },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Inputs are pills in the design, matching the buttons
          ...OPAQUE_SURFACE,
        },
      },
    },
  },
};

const WSO2WebTheme = createOxygenTheme(WSO2WebThemeConfig, OxygenThemeBase);

export default WSO2WebTheme;
