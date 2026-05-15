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

/**
 * Purple Theme - Example custom theme extension for Oxygen UI
 * This theme demonstrates a professional purple color scheme.
 */

// Export the partial theme configuration object
// The loader will pass this to createOxygenTheme
const PurpleThemeConfig = {
  shape: {
    borderRadius: 8,
  },
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
        background: {
          default: '#f7f8fb',
          paper: '#ffffff',
        },
        text: {
          primary: '#1d2028',
          secondary: '#4a4a5a',
          disabled: '#9ca3af',
        },
        divider: '#b2b6c961',
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
          default: '#0d0d14',
          paper: '#1a1a24',
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
        root: {
          textTransform: 'none',
          fontWeight: 400,
        },
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
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: 'none',
          boxShadow: '0 0 1px rgba(141,145,163,0.4), 0 1px 2px rgba(203,206,219,0.3)',
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
          borderRadius: 0,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small'
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
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
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          fontSize: theme.typography.caption.fontSize,
        }),
      },
    },
  },
};

// Add custom gradient property (with improved contrast)
const purpleGradient = {
  gradient: {
    primary: 'linear-gradient(77.74deg, #4a5bc8 11.16%, #745bcc 99.55%)',
  },
};

// Add branded syntax highlighting
const purpleSyntax = {
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

Object.assign(PurpleThemeConfig, purpleGradient, purpleSyntax);

if (PurpleThemeConfig.vars) {
  Object.assign(PurpleThemeConfig.vars, purpleGradient, purpleSyntax);
}

// Export using CommonJS format for the loader
/* eslint-disable no-undef */
if (typeof module !== 'undefined' && module.exports) {
  module.exports.default = PurpleThemeConfig;
}
