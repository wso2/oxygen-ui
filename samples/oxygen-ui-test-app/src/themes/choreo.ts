/*
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { OxygenTheme, extendTheme } from "@wso2/oxygen-ui";

const primitives = {
  primary: {
    gradientColor: 'linear-gradient(77.74deg, #5567d5 11.16%, #7155d5ff 99.55%)',
    gradientColorHover: 'linear-gradient(77.74deg, #5567d5 11.16%, #7155d5ff 99.55%)',
  },
}

/**
 * Choreo theme.
 */
const ChoreoTheme = extendTheme({
  ...OxygenTheme,
  colorSchemes: {
    ...OxygenTheme.colorSchemes,
    light: {
      palette: {
        ...(OxygenTheme.colorSchemes?.light?.palette || {}),
        primary: {
          main: '#646cff',
          contrastText: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        ...(OxygenTheme.colorSchemes?.dark?.palette || {}),
        primary: {
          main: '#646cff',
          contrastText: '#ffffff',
        },
      },
    },
  },
  components: {
    ...OxygenTheme.components,
    MuiCssBaseline: {
      ...(OxygenTheme.components?.MuiCssBaseline || {}),
      styleOverrides: {
        ...(typeof OxygenTheme.components?.MuiCssBaseline?.styleOverrides === 'object' 
          ? OxygenTheme.components.MuiCssBaseline.styleOverrides 
          : {}),
        "html[data-color-scheme='dark'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: `
            radial-gradient(circle at 65% 30%, rgba(0, 0, 0, 0) 60% 40%),
            radial-gradient(circle at 15% 50%, rgba(74, 41, 165, 0.32) 1%, rgba(0, 0, 0, 0) 40% 70%),
            radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 0%, var(--oxygen-palette-background-default) 100%)
          `,
          backgroundBlendMode: 'screen',
        },
        "html[data-color-scheme='light'] body": {
          backgroundAttachment: 'fixed',
          backgroundImage: `
            radial-gradient(circle at 65% 30%, rgba(255, 255, 255, 0) 40% 40%),
            radial-gradient(circle at 15% 50%, rgba(74, 41, 165, 0.1) 1%, rgba(255, 255, 255, 0) 40% 70%),
            radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, var(--oxygen-palette-background-default) 100%)
          `,
          backgroundBlendMode: 'normal',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        ...(OxygenTheme.components?.MuiButton?.styleOverrides || {}),
        containedPrimary: {
          '&:not(:disabled)': {
            background: primitives.primary.gradientColor,
            color: '#fff',
            '&:hover': {
              background: primitives.primary.gradientColorHover,
              color: '#fff',
            },
          }
        },
      },
    },
  },
});

export default ChoreoTheme;
