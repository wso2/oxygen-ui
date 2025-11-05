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
import './theme.css';

const noShadows = Array(25).fill('none') as Shadows;

const OxygenTheme = createTheme({
  typography: {
    fontSize: 14
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
        divider: '#fefefe12',
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
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
              '0 5px 10px 0 rgba(6, 6, 14, 0.1), ' +
              '0 0 0 0 rgba(199, 211, 234, 0.01) inset, ' +
              '0 0 0 0 rgba(199, 211, 234, 0.12) inset',
          }),
          ...theme.applyStyles('dark', {
            border: '1px solid #d2d2d20f',
            background: 'rgb(230 230 230 / 5%)',
            boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
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
        root: { borderRadius: '8px' },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          borderColor: theme.palette.divider,
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
