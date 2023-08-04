/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {experimental_extendTheme as extendTheme} from '@mui/material/styles';
import lightTokens from '@oxygen-ui/primitives/dist/design-tokens/web/oxygen/es/tokens';
import {RecursivePartial, Theme} from '../models';

export const generateDefaultThemeOptions = (baseTheme: Theme): RecursivePartial<Theme> => ({
  colorSchemes: {
    dark: {
      palette: {
        customComponents: {
          AppShell: {
            Main: {
              background: 'var(--oxygen-palette-background-paper)',
            },
            MainWrapper: {
              background: 'var(--oxygen-palette-background-paper)',
            },
          },
          Footer: {
            background: '#000000',
          },
          Navbar: {
            background: '#262626',
            collapsibleItemBackground: '#f2f2f21f',
          },
        },
        gradients: {
          primary: {
            stop1: '#FE8655',
            stop2: '#FF6258',
          },
        },
        primary: {
          // TODO: Take this from `darkTokens.OxygenOxygenColorsPrimaryDefault`. ATM, colors are wrong.
          main: '#ff5100',
        },
      },
    },
    light: {
      palette: {
        customComponents: {
          AppShell: {
            Main: {
              background: 'var(--oxygen-palette-background-paper)',
            },
            MainWrapper: {
              background: 'var(--oxygen-palette-background-paper)',
            },
          },
          Footer: {
            background: '#f7f8fb',
          },
          Navbar: {
            background: '#fbfbfb',
            collapsibleItemBackground: '#f2f2f2',
          },
        },
        gradients: {
          primary: {
            stop1: '#FE8655',
            stop2: '#FF6258',
          },
        },
        primary: {
          contrastText: '#fff',
          main: lightTokens.OxygenOxygenColorsPrimaryDefault,
        },
        secondary: {
          // TODO: Need a dedicated variable for secondary button text.
          contrastText: lightTokens.OxygenOxygenColorsTextLight,
          main: lightTokens.OxygenOxygenColorsSecondaryDefault,
        },
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'var(--oxygen-palette-background-paper)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        containedPrimary: {
          background: `linear-gradient(270deg, var(--oxygen-palette-gradients-primary-stop2),
            var(--oxygen-palette-gradients-primary-stop1))`,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
        },
        containedSecondary: {
          '&:hover': {
            background: '#f7f8fb',
          },
          background: '#f7f8fb',
          border: '1px solid #e0e2e9',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          color: '#40404b',
        },
        root: {
          borderRadius: '22px',
          fontSize: '1rem',
          fontWeight: 400,
          padding: '8px 16px',
        },
        textSecondary: {
          '&:hover': {
            background: '#f7f8fb',
          },
          color: '#40404b',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: '#d7d9e3',
          padding: baseTheme.spacing(3),
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body3: 'span',
          body4: 'span',
          body5: 'span',
          display1: 'h1',
          display2: 'h1',
        },
      },
    },
  },
  cssVarPrefix: 'oxygen',
  customComponents: {
    AppShell: {
      properties: {
        mainBorderTopLeftRadius: '0px',
        navBarTopPosition: '56px',
        padding: baseTheme.spacing(3),
      },
    },
    Chip: {
      // TODO: Move these to color palette.
      properties: {
        'beta-background': '#2ab1da',
        'beta-text-color': 'var(--oxygen-palette-primary-contrastText)',
        'default-background': 'var(--oxygen-palette-primary-main)',
        'default-text-color': 'var(--oxygen-palette-primary-contrastText)',
        'experimental-background': '#a73fe3',
        'experimental-text-color': 'var(--oxygen-palette-primary-contrastText)',
        'new-background': '#3fb81f',
        'new-text-color': 'var(--oxygen-palette-primary-contrastText)',
        'premium-background': '#d2a600',
        'premium-text-color': 'var(--oxygen-palette-primary-contrastText)',
      },
    },
    Header: {
      properties: {
        'min-height': '56px',
      },
    },
    Navbar: {
      properties: {
        'mini-variant-width': '64px',
        width: '300px',
      },
    },
    Stepper: {
      properties: {
        'action-margin-bottom': baseTheme.spacing(4),
        'progress-gap': baseTheme.spacing(1),
        'right-button-gap': baseTheme.spacing(1),
      },
    },
  },
  shadows: ['0px 2px 20px 0px #1d20281a', ...baseTheme.shadows],
  shape: {
    // TODO: Is `Lg` the default?
    borderRadius: lightTokens.OxygenOxygenBorderRadiusLg,
  },
  typography: {
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: 'normal',
      lineHeight: '1.5',
    },
    body2: {
      color: '#5A5A72',
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: 'normal',
      lineHeight: '1.5',
    },
    body3: {
      color: '#73738C',
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: 'normal',
      lineHeight: '1.5',
    },
    body4: {
      color: '#73738C',
      fontSize: '0.625rem',
      fontWeight: 400,
      letterSpacing: 'normal',
      lineHeight: '1.5',
    },
    body5: {
      color: '#73738C',
      fontSize: '0.5rem',
      fontWeight: 400,
      letterSpacing: 'normal',
      lineHeight: '1.5',
    },
    button: {
      textTransform: 'none',
    },
    display1: {
      fontSize: '4.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: '1.25',
    },
    display2: {
      fontSize: '3.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: '1.25',
    },
    // TODO: Need a token for this.
    fontFamily: 'Gilmer',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: '1.25',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: '1.25',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 500,
      letterSpacing: 'normal',
      lineHeight: '1.25',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: 'normal',
      lineHeight: '1.5',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: 'normal',
      lineHeight: '1.25',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      letterSpacing: 'normal',
      lineHeight: '1.25',
    },
    subtitle2: {
      color: '#222228',
      fontSize: '0.875rem',
      fontWeight: 'normal',
    },
  },
});

export const baseTheme: Theme = extendTheme();
const defaultTheme: Theme = extendTheme(generateDefaultThemeOptions(baseTheme) as Theme);

export default defaultTheme;
