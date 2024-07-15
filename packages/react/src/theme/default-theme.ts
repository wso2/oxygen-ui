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
          Code: {
            background: '#2c2e33',
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
          Code: {
            background: '#eef0f1',
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
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: 'var(--oxygen-palette-error-main)',
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
        'background-clip': 'text',
        'beta-background': 'linear-gradient(131deg, rgba(143, 197, 246, 0.40) 0%, rgba(72, 141, 180, 0.40) 100%)',
        'beta-border-color': '#488DB4',
        'beta-text-color': 'linear-gradient(93deg, #488DB4 0%, #1F3D4E 100%)',
        border: '1px solid',
        'border-radius': '8px',
        'coming-soon-background': 'linear-gradient(131deg, rgba(140, 140, 140, 0.40) 0%, rgba(64, 64, 64, 0.40) 100%)',
        'coming-soon-border-color': '#868686',
        'coming-soon-text-color': 'linear-gradient(93deg, #868686 0%, #202020 100%)',
        'default-background': 'var(--oxygen-palette-primary-main)',
        'default-text-color': 'var(--oxygen-palette-primary-contrastText)',
        'experimental-background':
          'linear-gradient(131deg, rgba(233, 95, 255, 0.40) 0%, rgba(140, 57, 153, 0.40) 100%)',
        'experimental-border-color': '#8C3999',
        'experimental-text-color': 'linear-gradient(93deg, #8C3999 0%, #2F1333 100%)',
        'font-weight': '900',
        'line-height': '20px',
        'new-background': 'linear-gradient(131deg, rgba(117, 237, 161, 0.40) 28.46%, rgba(52, 146, 86, 0.40) 119.09%)',
        'new-border-color': '#349256',
        'new-text-color': 'linear-gradient(93deg, #349256 28.46%, #102C1A 119.09%)',
        'premium-background':
          'linear-gradient(131deg, rgba(224, 184, 52, 0.40) 25.98%, rgba(181, 138, 0, 0.40) 112.91%)',
        'premium-border-color': '#928934',
        'premium-text-color': 'linear-gradient(93deg, #928934 28.46%, #2C2910 119.09%)',
        'text-fill-color': 'transparent',
        'text-transform': 'uppercase',
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
        width: '315px',
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
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(21, 21, 21, 0.08), 0px 1px 1px 0px rgba(21, 21, 21, 0.06), 0px 1px 3px 0px rgba(21, 21, 21, 0.04)',
    '0px 3px 1px -2px rgba(21, 21, 21, 0.08), 0px 2px 2px 0px rgba(21, 21, 21, 0.06), 0px 1px 5px 0px rgba(21, 21, 21, 0.04)',
    '0px 3px 3px -2px rgba(21, 21, 21, 0.08), 0px 3px 4px 0px rgba(21, 21, 21, 0.06), 0px 1px 8px 0px rgba(21, 21, 21, 0.04)',
    '0px 2px 4px -1px rgba(21, 21, 21, 0.08), 0px 4px 5px 0px rgba(21, 21, 21, 0.06), 0px 1px 10px 0px rgba(21, 21, 21, 0.04)',
    '0px 3px 5px -1px rgba(21, 21, 21, 0.08), 0px 5px 8px 0px rgba(21, 21, 21, 0.06), 0px 1px 14px 0px rgba(21, 21, 21, 0.04)',
    '0px 3px 5px -1px rgba(21, 21, 21, 0.08), 0px 6px 10px 0px rgba(21, 21, 21, 0.06), 0px 1px 18px 0px rgba(21, 21, 21, 0.04)',
    '0px 4px 5px -2px rgba(21, 21, 21, 0.08), 0px 7px 10px 1px rgba(21, 21, 21, 0.06), 0px 2px 16px 1px rgba(21, 21, 21, 0.04)',
    '0px 5px 5px -3px rgba(21, 21, 21, 0.08), 0px 8px 10px 1px rgba(21, 21, 21, 0.06), 0px 3px 14px 2px rgba(21, 21, 21, 0.04)',
    '0px 5px 6px -3px rgba(21, 21, 21, 0.08), 0px 9px 12px 1px rgba(21, 21, 21, 0.06), 0px 3px 16px 2px rgba(21, 21, 21, 0.04)',
    '0px 6px 6px -3px rgba(21, 21, 21, 0.08), 0px 10px 14px 1px rgba(21, 21, 21, 0.06), 0px 4px 18px 3px rgba(21, 21, 21, 0.04)',
    '0px 6px 7px -4px rgba(21, 21, 21, 0.08), 0px 11px 15px 1px rgba(21, 21, 21, 0.06), 0px 4px 20px 3px rgba(21, 21, 21, 0.04)',
    '0px 7px 8px -4px rgba(21, 21, 21, 0.08), 0px 12px 17px 2px rgba(21, 21, 21, 0.06), 0px 5px 22px 4px rgba(21, 21, 21, 0.04)',
    '0px 7px 8px -4px rgba(21, 21, 21, 0.08), 0px 13px 19px 2px rgba(21, 21, 21, 0.06), 0px 5px 24px 4px rgba(21, 21, 21, 0.04)',
    '0px 7px 9px -4px rgba(21, 21, 21, 0.08), 0px 14px 21px 2px rgba(21, 21, 21, 0.06), 0px 5px 26px 4px rgba(21, 21, 21, 0.04)',
    '0px 8px 9px -5px rgba(21, 21, 21, 0.08), 0px 15px 22px 2px rgba(21, 21, 21, 0.06), 0px 6px 28px 5px rgba(21, 21, 21, 0.04)',
    '0px 8px 10px -5px rgba(21, 21, 21, 0.08), 0px 16px 24px 2px rgba(21, 21, 21, 0.06), 0px 6px 30px 5px rgba(21, 21, 21, 0.04)',
    '0px 8px 11px -5px rgba(21, 21, 21, 0.08), 0px 17px 26px 2px rgba(21, 21, 21, 0.06), 0px 6px 32px 5px rgba(21, 21, 21, 0.04)',
    '0px 9px 11px -5px rgba(21, 21, 21, 0.08), 0px 18px 28px 2px rgba(21, 21, 21, 0.06), 0px 7px 34px 6px rgba(21, 21, 21, 0.04)',
    '0px 9px 12px -6px rgba(21, 21, 21, 0.08), 0px 19px 29px 2px rgba(21, 21, 21, 0.06), 0px 7px 36px 6px rgba(21, 21, 21, 0.04)',
    '0px 10px 13px -6px rgba(21, 21, 21, 0.08), 0px 20px 31px 3px rgba(21, 21, 21, 0.06), 0px 8px 38px 7px rgba(21, 21, 21, 0.04)',
    '0px 10px 13px -6px rgba(21, 21, 21, 0.08), 0px 21px 33px 3px rgba(21, 21, 21, 0.06), 0px 8px 40px 7px rgba(21, 21, 21, 0.04)',
    '0px 10px 14px -6px rgba(21, 21, 21, 0.08), 0px 22px 35px 3px rgba(21, 21, 21, 0.06), 0px 8px 42px 7px rgba(21, 21, 21, 0.04)',
    '0px 11px 14px -7px rgba(21, 21, 21, 0.08), 0px 23px 36px 3px rgba(21, 21, 21, 0.06), 0px 9px 44px 8px rgba(21, 21, 21, 0.04)',
  ],
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
