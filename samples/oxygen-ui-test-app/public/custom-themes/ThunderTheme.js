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
 * Corporate Blue Theme - Example custom theme extension for Oxygen UI
 * This theme demonstrates a professional corporate blue color scheme.
 */

// Export the partial theme configuration object
// The loader will pass this to createOxygenTheme
const corporateBlueThemeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#10996b', // Thunder Green
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#49646e', // Thunder Secondary Blue
          contrastText: '#ffffff',
        },
        warning: {
          main: '#f59e0b',
          contrastText: '#ffffff',
        },
        error: {
          main: '#ef4444',
          contrastText: '#ffffff',
        },
        info: {
          main: '#3b82f6',
          contrastText: '#ffffff',
        },
        success: {
          main: '#10996b',
          contrastText: '#ffffff',
        },
        background: {
          default: '#ffffff',
          paper: '#ffffffc5',
          acrylic: '#ffffff40',
        },
        text: {
          primary: '#181818',
          secondary: '#181818',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#109a6c', // Thunder Green
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#49646e', // Thunder Secondary Blue
          contrastText: '#ffffff',
        },
        warning: {
          main: '#f59e0b',
          contrastText: '#ffffff',
        },
        error: {
          main: '#ef4444',
          contrastText: '#ffffff',
        },
        info: {
          main: '#3b82f6',
          contrastText: '#ffffff',
        },
        success: {
          main: '#10b981',
          contrastText: '#ffffff',
        },
        background: {
          default: '#0f172a',
          paper: '#00000026',
          acrylic: '#0000000d',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#FFFFFF',
        },
      },
    },
  },
  shape: {
    borderRadius: 8, // WSO2 button border radius
  },
  blur: {
    none: 'none',
    light: 'blur(10px)',
    medium: 'blur(16px)',
    heavy: 'blur(24px)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html[data-color-scheme='dark'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: 
            'radial-gradient(circle at 65% 30%, rgb(16 185 129 / 15%) 10%, rgba(0, 0, 0, 0) 60% 40%), ' +
            'radial-gradient(circle at 15% 50%, rgb(20 184 166 / 20%) 1%, rgba(0, 0, 0, 0) 40% 70%), ' +
            'radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 0%, var(--oxygen-palette-background-default) 100%)',
          backgroundBlendMode: 'screen',
        },
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: 
            'radial-gradient(circle at 65% 30%, rgb(16 185 129 / 8%) 10%, rgba(0, 0, 0, 0) 60% 40%), ' +
            'radial-gradient(circle at 15% 50%, rgb(20 184 166 / 12%) 1%, rgba(0, 0, 0, 0) 40% 70%), ' +
            'radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, var(--oxygen-palette-background-default) 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
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
          transition: 'all 0.3s ease-in-out',
        },
        contained: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0d8d63',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#3d5460',
          },
        },
        outlined: ({ theme }) => ({
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: '#10b98110',
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          '&:hover': {
            backgroundColor: '#49646e10',
            borderColor: theme.palette.secondary.main,
          },
        }),
        text: ({ theme }) => ({
          color: theme.vars.palette.text.primary,
          '&:hover': {
            backgroundColor: '#10b98110',
            color: theme.vars.palette.text.primary,
          },
        }),
        textSecondary: ({ theme }) => ({
          color: theme.palette.secondary.main,
          '&:hover': {
            backgroundColor: '#49646e10',
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          textDecoration: 'underline',
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        }),
      },
    },
  },
};

// Export using CommonJS format for the loader
/* eslint-disable no-undef */
if (typeof module !== 'undefined' && module.exports) {
  module.exports.default = corporateBlueThemeConfig;
}
