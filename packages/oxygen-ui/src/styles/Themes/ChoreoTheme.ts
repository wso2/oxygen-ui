/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import AcrylicBaseTheme from './AcrylicBaseTheme';
import type { OxygenTheme } from './OxygenThemeBase';

/**
 * Choreo Theme - Indigo-violet gradient theme for Choreo product
 * Features: Choreo brand indigo (#5567d5), violet accents, modern acrylic styling
 *
 * Usage:
 * ```tsx
 * import { OxygenUIThemeProvider, ChoreoTheme } from '@wso2/oxygen-ui';
 *
 * <OxygenUIThemeProvider theme={ChoreoTheme}>
 *   <App />
 * </OxygenUIThemeProvider>
 * ```
 */
const ChoreoThemeBase = extendTheme(AcrylicBaseTheme, {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#5567d5',
          mainChannel: '85 103 213',
          light: '#7a8aef',
          dark: '#3d4db0',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#8d91a3',
          light: '#f7f8fb',
          dark: '#40404b',
        },
        error: {
          main: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        warning: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        success: {
          main: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
        info: {
          main: '#5567d5',
          light: '#7a8aef',
          dark: '#3d4db0',
        },
        text: {
          primary: '#1d2028',
          secondary: '#4a4a5a',
          disabled: '#9ca3af',
        },
        divider: '#e6e7ec',
        action: {
          active: 'rgba(85, 103, 213, 0.56)',
          hover: 'rgba(85, 103, 213, 0.08)',
          selected: 'rgba(85, 103, 213, 0.16)',
          selectedOpacity: 0.16,
          focus: 'rgba(85, 103, 213, 0.24)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#6b7de0',
          mainChannel: '107 125 224',
          light: '#8b9aef',
          dark: '#5567d5',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#4a4e5e',
          light: '#6b7280',
          dark: '#2d2d35',
        },
        error: {
          main: '#f87171',
          light: '#fca5a5',
          dark: '#ef4444',
        },
        warning: {
          main: '#fbbf24',
          light: '#fcd34d',
          dark: '#f59e0b',
        },
        success: {
          main: '#4ade80',
          light: '#86efac',
          dark: '#22c55e',
        },
        info: {
          main: '#6b7de0',
          light: '#8b9aef',
          dark: '#5567d5',
        },
        background: {
          default: '#000000',
          paper: '#000000b8',
        },
        text: {
          primary: '#efefef',
          secondary: '#d0d3e2',
          disabled: '#6b7280',
        },
        divider: '#ffffff16',
        action: {
          active: 'rgba(107, 125, 224, 0.56)',
          hover: 'rgba(107, 125, 224, 0.12)',
          selected: 'rgba(107, 125, 224, 0.24)',
          selectedOpacity: 0.24,
          focus: 'rgba(107, 125, 224, 0.32)',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: () => ({
          '&:not(:disabled)': {
            background: 'linear-gradient(77.74deg, #4a5bc8 11.16%, #745bcc 99.55%) !important',
            color: '#fff !important',
            '&:hover': {
              background: 'linear-gradient(77.74deg, #4a5bc8 11.16%, #745bcc 99.55%) !important',
              opacity: 0.9,
              color: '#fff !important',
            },
          },
        }),
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid currentColor',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(85, 103, 213, 0.16)',
            '&:hover': {
              backgroundColor: 'rgba(85, 103, 213, 0.24)',
            },
          },
          "[data-color-scheme='dark'] &.Mui-selected": {
            backgroundColor: 'rgba(107, 125, 224, 0.24)',
            '&:hover': {
              backgroundColor: 'rgba(107, 125, 224, 0.32)',
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars!.palette.background.paper,
          color: theme.vars!.palette.text.primary,
          border: `1px solid ${theme.vars!.palette.divider}`,
          fontSize: theme.typography.caption.fontSize,
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "html[data-color-scheme='dark'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: `
            radial-gradient(circle at 70% 20%, rgba(85, 103, 213, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 20% 60%, rgba(116, 91, 204, 0.22) 0%, transparent 45%),
            radial-gradient(circle at 50% 100%, rgba(85, 103, 213, 0.08) 0%, transparent 60%)
          `,
          backgroundBlendMode: 'screen',
        },
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: `
            radial-gradient(circle at 70% 20%, rgba(85, 103, 213, 0.10) 0%, transparent 45%),
            radial-gradient(circle at 20% 60%, rgba(116, 91, 204, 0.12) 0%, transparent 40%),
            radial-gradient(circle at center bottom, rgba(85, 103, 213, 0.04) 0%, transparent 50%)
          `,
          backgroundBlendMode: 'normal',
        },
      },
    },
  },
});

// Add custom gradient property (with improved contrast)
const choreoGradient = {
  gradient: {
    primary: 'linear-gradient(77.74deg, #4a5bc8 11.16%, #745bcc 99.55%)',
  },
};

// Add Choreo-branded syntax highlighting
const choreoSyntax = {
  syntax: {
    light: {
      background: '#f8f9fc',
      text: '#1d2028',
      comment: '#8d91a3',
      keyword: '#5567d5',
      string: '#16a34a',
      function: '#745bcc',
      number: '#ea580c',
      operator: '#40404b',
    },
    dark: {
      background: '#0d0d14',
      text: '#e4e4ef',
      comment: '#6b7280',
      keyword: '#6b7de0',
      string: '#4ade80',
      function: '#a78bfa',
      number: '#fb923c',
      operator: '#d0d3e2',
    },
  },
};

Object.assign(ChoreoThemeBase, choreoGradient, choreoSyntax);
if (ChoreoThemeBase.vars) {
  Object.assign(ChoreoThemeBase.vars, choreoGradient, choreoSyntax);
}

const ChoreoTheme = ChoreoThemeBase as OxygenTheme;

export default ChoreoTheme;
