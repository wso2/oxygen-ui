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

import { createTheme } from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

const noShadows = Array(25).fill('none') as Shadows;

const OxygenTheme = createTheme({
  typography: {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeightRegular: 300,
    fontSize: 14,
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 14,
    },
  },
  shadows: noShadows,
  shape: {
    borderRadius: 20,
  },
  cssVariables: {
    colorSchemeSelector: 'data-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#F87643',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#e8e8e8',
        },
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
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
          paper: '#00000088',
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 400,
        },
        containedPrimary: {
          background: 'linear-gradient(77.74deg, #eb4f63 11.16%, #fa7b3f 99.55%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(77.74deg, #d0364b 11.16%, #f2621f 99.55%)',
            color: '#fff',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          marginBottom: '4px'
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          WebkitBackdropFilter: 'blur(3px)',
          backdropFilter: 'blur(3px)',
          ...theme.applyStyles('light', {
            border: '1px solid #ffffff7a',
            background: 'rgb(230 230 230 / 5%)',
            boxShadow: 
              '0 10px 22px 0 rgba(6, 6, 14, 0.1),' +
              '0 24px 48px 0 rgba(199, 211, 234, 0.05) inset,' +
              '0 1px 1px 0 rgba(199, 211, 234, 0.12) inset',
          }),
          ...theme.applyStyles('dark', {
            border: '1px solid #d2d2d20f',
            background: 'rgb(230 230 230 / 5%)',
            boxShadow: 
              '0 24px 32px 0 rgba(6, 6, 14, 0.70),' + 
              '0 24px 48px 0 rgba(199, 211, 234, 0.05) inset,' + 
              '0 1px 1px 0 rgba(199, 211, 234, 0.12) inset',
          }),
        })
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          ...theme.applyStyles('light', {
            background: '#ffffff9c',
          }),
          ...theme.applyStyles('dark', {
            background: '#040404c2',
          }),
        })
      }
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiSelect: {
      defaultProps: { size: 'small' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          borderRadius: 8,
          ...theme.applyStyles('light', {
            background: '#ffffffc4'
          }),
          ...theme.applyStyles('dark', {
            background: '#ffffff05'
          })
        }),
        notchedOutline: ({ theme }) => ({
          borderWidth: 1,
          ...theme.applyStyles('light', {
            borderColor: '#d9d9d987'
          }),
          ...theme.applyStyles('dark', {
            borderColor: '#ffffff0d'
          })
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
          color: theme.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
            color: theme.palette.primary.dark,
            textDecoration: 'underline',
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '8px',
          '&.Mui-selected': {
            ...theme.applyStyles('light', {
              backgroundColor: theme.palette.action.selected,
            }),
            ...theme.applyStyles('dark', {
              backgroundColor: '#ffffff1a',
            }),
            '&:hover': {
              ...theme.applyStyles('light', {
                backgroundColor: theme.palette.action.hover,
              }),
              ...theme.applyStyles('dark', {
                backgroundColor: '#ffffff1a',
              }),
            },
          },
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: 'none',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          overflow: 'hidden',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#ffffff0a',
            borderBottom: '1px solid',
            borderColor: theme.palette.divider,
          }
        }),
        columnHeaders: ({ theme }) => ({
          backgroundColor: '#ffffff0a',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        }),
        columnHeader: {
          backgroundColor: 'transparent',
        },
        cell: ({ theme }) => ({
          borderBottom: '1px solid',
          backgroundColor: 'transparent',
          borderColor: theme.palette.divider,
        }),
      },
    },
  },
});

export default OxygenTheme;
