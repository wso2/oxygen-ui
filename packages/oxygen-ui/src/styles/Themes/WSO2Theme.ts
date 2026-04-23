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
 * WSO2Theme - The default theme for WSO2 applications, reflecting the brand's identity
 * Features: Vibrant orange primary color, complementary blue secondary color, clean and modern design
 * Perfect for WSO2's product suite and applications that want to align with WSO2 branding
 */
const WSO2ThemeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#FF7300', // WSO2 Orange
        },
        secondary: {
          main: '#5CD1FF', // WSO2 Secondary Blue
        },
        success: {
          main: '#2e7d32', // Darker green for better contrast with white text
          contrastText: '#ffffff',
        },
        warning: {
          main: '#e65100', // Darker orange for better contrast with white text
          contrastText: '#ffffff',
        },
        error: {
          main: '#c62828', // Darker red for better contrast with white text
          contrastText: '#ffffff',
        },
        info: {
          main: '#0277bd', // Darker blue for better contrast with white text
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
          main: '#FF7300', // WSO2 Orange
        },
        secondary: {
          main: '#5CD1FF', // WSO2 Secondary Blue
        },
        success: {
          main: '#388e3c', // Darker green for better contrast with white text
          contrastText: '#ffffff',
        },
        warning: {
          main: '#f57c00', // Darker orange for better contrast with white text
          contrastText: '#ffffff',
        },
        error: {
          main: '#d32f2f', // Darker red for better contrast with white text
          contrastText: '#ffffff',
        },
        info: {
          main: '#0277bd', // Darker blue for better contrast with white text
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
    borderRadius: 20, // WSO2 button border radius
  },
  blur: {
    none: 'none',
    light: 'blur(10px)',
    medium: 'blur(16px)',
    heavy: 'blur(24px)',
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
        "html[data-color-scheme='dark'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: 
            'radial-gradient(circle at 50% 25%, #233248 0%, rgba(153, 170, 205, 0) 40%),' +
            'radial-gradient(circle at 500% 90%, #3b4e69 0%, rgba(153, 170, 205, 0) 20%),' +
            'radial-gradient(circle at 100% 125%, #3b4e69 0%, rgba(153, 170, 205, 0) 20%),' +
            'linear-gradient(120deg, #060812 100%)',
          backgroundBlendMode: 'screen',
        },
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: 
            'radial-gradient(circle at 65% 30%, rgb(30 64 175 / 8%) 5%, rgba(0, 0, 0, 0) 60% 40%), ' +
            'radial-gradient(circle at 15% 50%, rgb(255 255 255 / 8%) 1%, rgba(0, 0, 0, 0) 40% 70%), ' +
            'linear-gradient(120deg, #ffffff 100%)',
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
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000',
          transition: 'color 0.3s ease-in-out',
          '&:hover': {
            color: '#FFFFFF',
          },
        },
        outlined: ({ theme }: { theme: OxygenTheme }) => ({
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.main,
          },
          '&.MuiButton-colorSuccess': {
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            '&:hover': {
              color: theme.palette.success.main,
              borderColor: theme.palette.success.main,
            },
          },
          '&.MuiButton-colorWarning': {
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main,
            '&:hover': {
              color: theme.palette.warning.main,
              borderColor: theme.palette.warning.main,
            },
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
