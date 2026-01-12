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
import AcrylicBaseTheme from './AcrylicBaseTheme';
import type { OxygenTheme } from './OxygenThemeBase';

/**
 * AcrylicPurple Theme - Purple-blue gradient theme
 * Features: Purple-blue gradient, modern spacing, radial background
 */
const AcrylicPurpleThemeBase = extendTheme(AcrylicBaseTheme, {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#646cff',
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
      styleOverrides: {
        containedPrimary: () => ({
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
});

// Add custom gradient property
const acrylicPurpleGradient = {
  gradient: {
    primary: 'linear-gradient(77.74deg, #5567d5 11.16%, #7155d5ff 99.55%)',
  },
};

Object.assign(AcrylicPurpleThemeBase, acrylicPurpleGradient);
if (AcrylicPurpleThemeBase.vars) {
  Object.assign(AcrylicPurpleThemeBase.vars, acrylicPurpleGradient);
}

const AcrylicPurpleTheme = AcrylicPurpleThemeBase as OxygenTheme;

export default AcrylicPurpleTheme;
