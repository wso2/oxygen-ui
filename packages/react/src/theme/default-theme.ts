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

export const DEFAULT_THEME_OPTIONS: RecursivePartial<Theme> = {
  colorSchemes: {
    dark: {
      palette: {
        customComponents: {
          Footer: {
            background: '#000000',
          },
          Navbar: {
            background: '#262626',
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
          Footer: {
            background: '#f7f8fb',
          },
          Navbar: {
            background: '#fbfbfb',
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
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: `linear-gradient(270deg, var(--oxygen-palette-primary-gradient-stop2),
            var(--oxygen-palette-primary-gradient-stop1))`,
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
          padding: '8px 16px',
        },
      },
    },
  },
  cssVarPrefix: 'oxygen',
  customComponents: {
    Navbar: {
      properties: {
        'min-height': '64px',
        'mini-variant-width': '72px',
        width: '240px',
      },
    },
  },
  shape: {
    // TODO: Is `Lg` the default?
    borderRadius: lightTokens.OxygenOxygenBorderRadiusLg,
  },
  typography: {
    body1: {
      fontSize: '0.875rem',
      fontWeight: 'normal',
    },
    button: {
      textTransform: 'none',
    },
    // TODO: Need a token for this.
    fontFamily: 'Gilmer',
  },
};

const defaultTheme: Theme = extendTheme(DEFAULT_THEME_OPTIONS as Theme);

export default defaultTheme;
