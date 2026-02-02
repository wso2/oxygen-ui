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

import { extendTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import OxygenThemeBase, { type OxygenTheme } from './OxygenThemeBase';

// Extend the TypeBackground interface to include acrylic
declare module '@mui/material/styles' {
  interface TypeBackground {
    acrylic?: string;
  }
}

/**
 * LowColorBaseTheme - Base theme for flat design with solid colors and no blur effects
 * Features: Clean minimalist design, solid colors, no blur effects, minimal shadows
 * This base theme contains all common flat design component styles.
 * Extend this theme to create color variants (PaleGray, PaleIndigo, etc.)
 */
const LowColorBaseTheme = extendTheme(OxygenThemeBase, {
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          backgroundColor: theme.vars!.palette.secondary.main,
          color: theme.vars!.palette.text.primary,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 400,
        },
        containedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          '&:not(:disabled)': {
            // Flat design with subtle gradient
            background: `${theme.gradient.primary} !important`,
            color: `${theme.vars!.palette.primary.contrastText} !important`,
            '&:hover': {
              background: `${theme.gradient.primary} !important`,
              opacity: 0.9,
              color: `${theme.vars!.palette.primary.contrastText} !important`,
            },
          }
        }),
        outlinedPrimary: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - solid borders and colors
          borderColor: theme.vars!.palette.primary.main,
          color: theme.vars!.palette.primary.main,
          '&:hover': {
            borderColor: theme.vars!.palette.primary.dark,
            backgroundColor: theme.vars!.palette.action.hover,
            color: theme.vars!.palette.primary.dark,
          },
        }),
        containedSecondary: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - solid colors
          backgroundColor: theme.vars!.palette.secondary.main,
          color: theme.vars!.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.vars!.palette.secondary.dark,
            color: theme.vars!.palette.secondary.contrastText,
          },
        }),
        outlinedSecondary: ({ theme }: { theme: OxygenTheme }) => ({
          borderColor: theme.vars!.palette.divider,
          color: theme.vars!.palette.text.primary,
          '&:hover': {
            borderColor: theme.vars!.palette.text.secondary,
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    MuiFab: {
      styleOverrides: {
        primary: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design with subtle gradient
          background: theme.gradient.primary,
          color: theme.vars!.palette.primary.contrastText,
          '&:hover': {
            background: theme.gradient.primary,
            opacity: 0.9,
            color: theme.vars!.palette.primary.contrastText,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - no blur, solid background
          background: theme.vars!.palette.background.paper,
        }),
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          // Paper background is already set by colorSchemes
          background: theme.vars!.palette.background.paper,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - solid background, no blur
          backgroundColor: `${theme.vars!.palette.background.paper} !important`,
          borderRadius: 0,
        }),
      },
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
          marginBottom: '2px'
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          borderRadius: theme.shape.borderRadius,
          // Flat design - solid background, no blur, minimal shadow
          border: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
          backgroundColor: theme.vars!.palette.background.paper,
          boxShadow: 'none',
        }),
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - solid background
          background: theme.vars!.palette.background.paper,
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - solid background
          backgroundColor: theme.vars!.palette.background.paper,
        }),
      }
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
          borderRadius: 8,
          // Flat design - solid background
          backgroundColor: theme.vars!.palette.background.paper,
        }),
        notchedOutline: ({ theme }: { theme: OxygenTheme }) => ({
          borderWidth: 1,
          borderColor: theme.vars!.palette.divider,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          // Flat design - solid link colors
          color: theme.vars!.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
            color: theme.vars!.palette.primary.dark,
            textDecoration: 'underline',
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          borderRadius: 8,
          '&.Mui-selected': {
            // Flat design - solid selected background
            backgroundColor: theme.vars!.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.vars!.palette.action.hover,
            },
          },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          '&.Mui-selected': {
            backgroundColor: theme.vars!.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.vars!.palette.action.hover,
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
            // Flat design - solid background, no blur
            backgroundColor: theme.vars!.palette.action.hover,
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
          // Flat design - solid background, no blur
          backgroundColor: theme.vars!.palette.action.hover,
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

// LowColor base theme uses subtle gradients for primary elements
const lowColorBaseGradient = {
  gradient: {
    primary: 'linear-gradient(90deg, var(--oxygen-palette-primary-main) 0%, var(--oxygen-palette-primary-dark) 100%)',
  },
};

Object.assign(LowColorBaseTheme, lowColorBaseGradient);
if (LowColorBaseTheme.vars) {
  Object.assign(LowColorBaseTheme.vars, lowColorBaseGradient);
}

export default LowColorBaseTheme as OxygenTheme;
