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
import OxygenBaseTheme from './OxygenBaseTheme';
import type { OxygenTheme } from './OxygenBaseTheme';

/**
 * High Contrast Theme - Maximum accessibility with high contrast colors
 * Features: Pure black/white backgrounds, bold borders, enhanced visibility
 * Designed for users with visual impairments or low vision
 */
const HighContrastThemeBase = extendTheme(OxygenBaseTheme, {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0000FF',
          light: '#4040FF',
          dark: '#0000CC',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#FFD700',
          light: '#FFED4E',
          dark: '#CCB000',
          contrastText: '#000000',
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#000000',
          secondary: '#000000',
        },
        divider: '#000000',
        error: {
          main: '#CC0000',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#FF6600',
          contrastText: '#000000',
        },
        info: {
          main: '#0066CC',
          contrastText: '#FFFFFF',
        },
        success: {
          main: '#008000',
          contrastText: '#FFFFFF',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#00FFFF',
          light: '#66FFFF',
          dark: '#00CCCC',
          contrastText: '#000000',
        },
        secondary: {
          main: '#FFFF00',
          light: '#FFFF66',
          dark: '#CCCC00',
          contrastText: '#000000',
        },
        background: {
          default: '#000000',
          paper: '#000000',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#FFFFFF',
        },
        divider: '#FFFFFF',
        error: {
          main: '#FF0000',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#FF9900',
          contrastText: '#000000',
        },
        info: {
          main: '#00BFFF',
          contrastText: '#000000',
        },
        success: {
          main: '#00FF00',
          contrastText: '#000000',
        },
      },
    },
  },
  border: {
    width: '3px',
    style: 'solid',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          fontWeight: 700,
          border: '3px solid',
          '&:hover': {
            borderWidth: '3px',
          },
        },
        containedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars!.palette.primary.main,
          color: theme.vars!.palette.primary.contrastText,
          borderColor: theme.vars!.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.vars!.palette.primary.dark,
            borderColor: theme.vars!.palette.primary.dark,
          },
        }),
        contained: ({ theme }: { theme: OxygenTheme }) => ({
          borderColor: theme.vars!.palette.primary.main,
        }),
        outlined: ({ theme }: { theme: OxygenTheme }) => ({
          borderWidth: '3px',
          borderColor: theme.vars!.palette.primary.main,
          '&:hover': {
            borderWidth: '3px',
            backgroundColor: theme.vars!.palette.action.hover,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '3px solid',
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          border: `3px solid ${theme.vars!.palette.divider}`,
          borderRadius: 0,
        }),
        outlined: {
          borderWidth: '3px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '3px',
            },
            '&:hover fieldset': {
              borderWidth: '3px',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '3px',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          textDecorationThickness: '2px',
          textUnderlineOffset: '4px',
          fontWeight: 700,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderWidth: '2px',
        },
      },
    },
  },
});

// Add custom gradient property
const HighContrastTheme = HighContrastThemeBase as OxygenTheme;
Object.assign(HighContrastTheme, {
  gradient: {
    primary: 'none',
  },
});

if (HighContrastTheme.vars) {
  Object.assign(HighContrastTheme.vars, {
    gradient: {
      primary: 'none',
    },
  });
}

export default HighContrastTheme;
