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

import { extendTheme, type Theme, type Shadows } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ChevronDown, X } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import { pxToRem } from '../../utils';

// Define custom theme properties interface
interface CustomThemeProperties {
  blur: {
    light: string;
    medium: string;
    heavy: string;
  };
  border: {
    width: string;
    style: string;
  };
  gradient: {
    primary: string;
  };
  syntax: {
    light: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      function: string;
      number: string;
      operator: string;
    };
    dark: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      function: string;
      number: string;
      operator: string;
    };
  };
}

// Extend MUI Theme to include custom properties
declare module '@mui/material/styles' {
  interface Theme extends CustomThemeProperties {}
  
  interface ThemeOptions extends Partial<CustomThemeProperties> {}
  
  interface ThemeVars extends CustomThemeProperties {}
}

export interface OxygenTheme extends Theme, CustomThemeProperties {}

const OxygenBaseTheme = extendTheme({
  cssVarPrefix: 'oxygen',
  colorSchemeSelector: 'data-color-scheme',
  typography: {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeightRegular: 400,
    fontSize: 14,
    h1: {
      fontSize: pxToRem(36),
      fontWeight: 400,
    },
    h2: {
      fontSize: pxToRem(30),
      fontWeight: 400,
    },
    h3: {
      fontSize: pxToRem(24),
      fontWeight: 400,
    },
    h4: {
      fontSize: pxToRem(18),
      fontWeight: 400,
    },
    h5: {
      fontSize: pxToRem(16),
      fontWeight: 400,
    },
    h6: {
      fontSize: pxToRem(14),
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: pxToRem(18),
    },
    subtitle2: {
      fontSize: pxToRem(14),
      fontWeight: 400,
    },
    body1: {
      fontSize: pxToRem(14),
    },
    body2: {
      fontSize: pxToRem(14),
      fontWeight: 400,
    },
    caption: {
      fontSize: pxToRem(12),
      fontWeight: 400,
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  shape: {
    borderRadius: 15,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#fa7b3f',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#e8e8e8',
        },
        background: {
          default: '#f5f5f5',
          paper: '#ffffffb5',
        },
        text: {
          primary: '#40404B',
          secondary: '#40404B',
        },
        divider: '#00000012',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#F87643',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#3c3c3c',
        },
        background: {
          default: '#000000',
          paper: '#00000045',
        },
        text: {
          primary: '#efefef',
          secondary: '#D0D3E2',
        },
        divider: '#ffffff16',
      },
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.secondary.main,
          color: theme.vars.palette.text.primary,
        }),
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: React.createElement(ChevronDown),
        clearIcon: React.createElement(X),
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
            background: `${theme.gradient.primary} !important`,
            color: '#fff !important',
            '&:hover': {
              background: `${theme.gradient.primary} !important`,
              opacity: 0.9,
              color: '#fff !important',
            },
          }
        }),
        outlinedPrimary: ({ theme }) => ({
          borderColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.main,
          '&:hover': {
            borderColor: theme.vars.palette.primary.dark,
            backgroundColor: theme.vars.palette.action.hover,
          },
        }),
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: ({ theme }: { theme: OxygenTheme }) => ({
          background: theme.gradient.primary,
          color: '#fff',
          '&:hover': {
            background: theme.gradient.primary,
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
          // Use CSS variable - will automatically switch between light/dark
          background: theme.vars!.palette.background.paper,
          opacity: 0.7,
        }),
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          // Paper background is already set by colorSchemes
          background: theme.vars.palette.background.paper,
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          marginBottom: '6px'
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          borderRadius: theme.shape.borderRadius,
          WebkitBackdropFilter: theme.blur.light,
          backdropFilter: theme.blur.light,
          border: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
          backgroundColor: theme.vars!.palette.background.paper,
          boxShadow: theme.shadows[1],
        }),
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          // Use CSS variable - automatically switches between colorSchemes
          background: theme.vars.palette.background.paper,
          opacity: 0.95,
        })
      }
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        IconComponent: ChevronDown
      },
      styleOverrides: {
        icon: {
          top: '50%',
          transform: 'translateY(-50%)',
          marginTop: 0,
        },
        select: {
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          borderRadius: 8,
          background: theme.vars.palette.background.paper,
        }),
        notchedOutline: ({ theme }) => ({
          borderWidth: 1,
          borderColor: theme.vars.palette.divider,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
            color: theme.vars.palette.primary.dark,
            textDecoration: 'underline',
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          '&.Mui-selected': {
            // Use CSS variable - automatically adapts to color scheme
            backgroundColor: theme.vars.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.vars.palette.action.hover,
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
            backgroundColor: theme.vars!.palette.action.hover,
            WebkitBackdropFilter: theme.blur.medium,
            backdropFilter: theme.blur.medium,
            borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          },
          '& .MuiDataGrid-virtualScroller': {
            marginTop: '0 !important',
            overflow: 'auto',
          }
        }),
        columnHeaders: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars!.palette.action.hover,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
        }),
        columnHeader: {
          backgroundColor: 'transparent',
        },
        cell: ({ theme }: { theme: OxygenTheme }) => ({
          borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
          backgroundColor: 'transparent',
        }),
      },
    },
  },
});

// Add custom properties to the theme and theme.vars
const customProperties = {
  blur: {
    light: 'blur(3px)',
    medium: 'blur(10px)',
    heavy: 'blur(20px)',
  },
  border: {
    width: '1px',
    style: 'solid',
  },
  gradient: {
    primary: 'linear-gradient(90deg, #F47B20 0%, #EF4223 100%)',
  },
  syntax: {
    light: {
      background: '#f5f5f5',
      text: '#24292e',
      comment: '#6a737d',
      keyword: '#d73a49',
      string: '#032f62',
      function: '#6f42c1',
      number: '#005cc5',
      operator: '#d73a49',
    },
    dark: {
      background: '#1e1e1e',
      text: '#d4d4d4',
      comment: '#6a9955',
      keyword: '#569cd6',
      string: '#ce9178',
      function: '#dcdcaa',
      number: '#b5cea8',
      operator: '#d4d4d4',
    },
  },
};

Object.assign(OxygenBaseTheme, customProperties);

// Ensure vars object exists before assigning
if (OxygenBaseTheme.vars) {
  Object.assign(OxygenBaseTheme.vars, customProperties);
}

export default OxygenBaseTheme as OxygenTheme;
