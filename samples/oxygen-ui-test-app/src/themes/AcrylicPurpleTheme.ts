/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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

/*
 * Acrylic Purple, defined in the app with the public `createOxygenTheme`.
 *
 * The library keeps this theme only as reference source
 * (packages/oxygen-ui/src/styles/Themes/AcrylicBaseTheme.ts and AcrylicPurpleTheme.ts) and no longer
 * exports it, so the sample app builds its own copy the way any consumer would.
 */

import { createOxygenTheme, type OxygenThemeType } from '@wso2/oxygen-ui';

const AcrylicBaseTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#fa7b3f',
          contrastText: '#ffffff',
        },
        // Every token is set: this merges into a built theme, whose derived light, dark and
        // channel values for the base grey would otherwise stay. Dark text on the light grey,
        // as the secondary button uses (the base theme's white is 1.2:1). `dark` is the hover
        // and focus background, kept light enough for that text (6.5:1).
        secondary: {
          main: '#e8e8e8',
          light: '#ededed',
          dark: '#d0d0d0',
          contrastText: '#40404B',
          mainChannel: '232 232 232',
          lightChannel: '237 237 237',
          darkChannel: '208 208 208',
          contrastTextChannel: '64 64 75',
        },
        background: {
          default: '#f5f5f5',
          paper: '#ffffffc5',
          acrylic: '#ffffff40', // More transparent version for Paper and Card components
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
          paper: '#000000c5',
          acrylic: '#00000040', // More transparent version for Paper and Card components
        },
        text: {
          primary: '#efefef',
          secondary: '#D0D3E2',
        },
        divider: '#ffffff16',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          backgroundColor: theme.vars!.palette.secondary.main,
          color: theme.vars!.palette.text.primary,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 400,
        },
      },
      variants: [
        // MUI v9 no longer applies combined keys such as `containedPrimary`, so each variant and colour pair
        // is matched here.
        {
          props: { variant: 'contained', color: 'primary' },
          style: ({ theme }: { theme: OxygenThemeType }) => ({
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
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: ({ theme }: { theme: OxygenThemeType }) => ({
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.action.hover,
            },
          }),
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: ({ theme }: { theme: OxygenThemeType }) => ({
            backgroundColor: theme.vars!.palette.secondary.main,
            color: theme.vars!.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.vars!.palette.secondary.main,
              opacity: 0.8,
            },
          }),
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: ({ theme }: { theme: OxygenThemeType }) => ({
            borderColor: theme.vars!.palette.divider,
            color: theme.vars!.palette.text.primary,
            '&:hover': {
              borderColor: theme.vars!.palette.text.secondary,
              backgroundColor: theme.palette.action.hover,
            },
          }),
        },
      ],
    },
    MuiFab: {
      styleOverrides: {
        primary: ({ theme }: { theme: OxygenThemeType }) => ({
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
        paper: ({ theme }: { theme: OxygenThemeType }) => ({
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          background: theme.vars!.palette.background.paper
        }),
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenThemeType }) => ({
          background: theme.vars!.palette.background.paper,
          borderRadius: 0,
        }),
      },
    },
    MuiSidebar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          backgroundColor: theme.vars!.palette.background.acrylic,
          WebkitBackdropFilter: theme.blur.light,
          backdropFilter: theme.blur.light,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          backgroundColor: `${theme.vars!.palette.background.acrylic} !important`,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          borderRadius: 0,
        }),
      },
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          fontSize: theme.typography.body2.fontSize,
          marginBottom: '2px'
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          borderRadius: theme.shape.borderRadius,
          WebkitBackdropFilter: theme.blur.light,
          backdropFilter: theme.blur.light,
          border: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
          // More transparent for direct Paper component usage
          backgroundColor: theme.vars!.palette.background.acrylic,
          boxShadow: theme.shadows[1],
        }),
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenThemeType }) => ({
          backgroundColor: theme.vars!.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        })
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ theme }: { theme: OxygenThemeType }) => ({
          backgroundColor: theme.vars!.palette.background.paper,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          backgroundImage: 'none',
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          // More transparent for Card component
          backgroundColor: theme.vars!.palette.background.acrylic,
        }),
      }
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          fontSize: theme.typography.body2.fontSize,
          borderRadius: 8,
          backgroundColor: theme.vars!.palette.background.acrylic,
        }),
        notchedOutline: ({ theme }: { theme: OxygenThemeType }) => ({
          borderWidth: 1,
          borderColor: theme.vars!.palette.divider,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          fontSize: theme.typography.body2.fontSize,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
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
        root: ({ theme }: { theme: OxygenThemeType }) => ({
          borderRadius: 8,
          '&.Mui-selected': {
            // Use CSS variable - automatically adapts to color scheme
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenThemeType }) => ({
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
        columnHeaders: ({ theme }: { theme: OxygenThemeType }) => ({
          backgroundColor: theme.vars!.palette.action.hover,
          WebkitBackdropFilter: theme.blur.medium,
          backdropFilter: theme.blur.medium,
          borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
        }),
        columnHeader: {
          backgroundColor: 'transparent',
        },
        cell: ({ theme }: { theme: OxygenThemeType }) => ({
          borderBottom: `${theme.border.width} ${theme.border.style} ${theme.vars!.palette.divider}`,
          backgroundColor: 'transparent',
        }),
      },
    },
  },
};


/**
 * AcrylicPurple Theme - Purple-blue gradient theme

 * Features: Purple-blue gradient, modern spacing, radial background
 */
const AcrylicPurpleThemeConfig = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#646cff',
          mainChannel: '100 108 255',
          light: '#8187ff',
          dark: '#4651cc',
          contrastText: '#ffffff',
        },
        action: {
          selected: 'rgba(100, 108, 255, 0.16)',
          selectedOpacity: 0.16,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#646cff',
          mainChannel: '100 108 255',
          light: '#8187ff',
          dark: '#4651cc',
          contrastText: '#ffffff',
        },
        action: {
          selected: 'rgba(100, 108, 255, 0.24)',
          selectedOpacity: 0.24,
        },
      },
    },
  },
  components: {
    MuiButton: {
      variants: [
        // Theme merging replaces arrays, so keep the base theme's button variants and add this theme's
        // after them, where they win as the old combined keys did.
        ...(AcrylicBaseTheme.components?.MuiButton?.variants ?? []),
        // MUI v9 no longer applies combined keys such as `containedPrimary`, so each variant and colour pair
        // is matched here.
        {
          props: { variant: 'contained', color: 'primary' },
          style: () => ({
            '&:not(:disabled)': {
              background: 'linear-gradient(77.74deg, #5567d5 11.16%, #7155d5ff 99.55%) !important',
              color: '#fff !important',
              '&:hover': {
                background: 'linear-gradient(77.74deg, #5567d5 11.16%, #7155d5ff 99.55%) !important',
                opacity: 0.9,
                color: '#fff !important',
              },
            },
          }),
        },
      ],
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(100, 108, 255, 0.16)',
            '&:hover': {
              backgroundColor: 'rgba(100, 108, 255, 0.24)',
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "html[data-color-scheme='dark'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: `
            radial-gradient(circle at 65% 30%, rgb(85 103 213 / 20%) 10%, rgba(0, 0, 0, 0) 60% 40%),
            radial-gradient(circle at 15% 50%, rgb(113 85 213 / 25%) 1%, rgba(0, 0, 0, 0) 40% 70%),
            radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 0%, var(--oxygen-palette-background-default) 100%)
          `,
          backgroundBlendMode: 'screen',
        },
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: `
            radial-gradient(circle at 65% 30%, rgba(100, 108, 255, 0.12) 10%, rgba(255, 255, 255, 0) 40% 40%),
            radial-gradient(circle at 15% 50%, rgba(113, 85, 213, 0.15) 1%, rgba(255, 255, 255, 0) 40% 70%),
            radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, var(--oxygen-palette-background-default) 100%)
          `,
          backgroundBlendMode: 'normal',
        },
      },
    },
  },
};

// Add custom gradient property
const acrylicPurpleGradient = {
  gradient: {
    primary: 'linear-gradient(77.74deg, #5567d5 11.16%, #7155d5ff 99.55%)',
  },
};

const AcrylicPurpleTheme = createOxygenTheme(AcrylicPurpleThemeConfig, createOxygenTheme(AcrylicBaseTheme));

Object.assign(AcrylicPurpleTheme, acrylicPurpleGradient);
if (AcrylicPurpleTheme.vars) {
  Object.assign(AcrylicPurpleTheme.vars, acrylicPurpleGradient);
}

export default AcrylicPurpleTheme;
