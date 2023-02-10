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
import darkTokens from '@oxygen-ui/primitives/dist/design-tokens/web/oxygen/es/dark.tokens';
import lightTokens from '@oxygen-ui/primitives/dist/design-tokens/web/oxygen/es/tokens';
import {RecursivePartial, Theme} from '../models';

export const DEFAULT_THEME_OPTIONS: RecursivePartial<Theme> = {
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: darkTokens.OxygenOxygenColorsPrimaryDefault,
        },
      },
    },
    light: {
      palette: {
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
  cssVarPrefix: 'oxygen',
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
