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

import { extendTheme, type Theme, type Shadows } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ChevronDown, X } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import { pxToRem } from '../../utils';

// Define custom theme properties interface
interface CustomThemeProperties {
  blur: {
    light: string;
    medium: string;
    heavy: string;
  };
  border: {
    width: string;
    style: string;
  };
  gradient: {
    primary: string;
  };
  paperTransparent: {
    light: string;
    dark: string;
  };
  syntax: {
    light: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      function: string;
      number: string;
      operator: string;
    };
    dark: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      function: string;
      number: string;
      operator: string;
    };
  };
}

// Extend MUI Theme to include custom properties
declare module '@mui/material/styles' {
  interface Theme extends CustomThemeProperties {}
  
  interface ThemeOptions extends Partial<CustomThemeProperties> {}
  
  interface ThemeVars extends CustomThemeProperties {}
}

export interface OxygenTheme extends Theme, CustomThemeProperties {}

const OxygenThemeBase = extendTheme({
  cssVarPrefix: 'oxygen',
  colorSchemeSelector: 'data-color-scheme',
  typography: {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeightRegular: 400,
    fontSize: 14,
    h1: {
      fontSize: pxToRem(36),
      fontWeight: 400,
    },
    h2: {
      fontSize: pxToRem(30),
      fontWeight: 400,
    },
    h3: {
      fontSize: pxToRem(24),
      fontWeight: 400,
    },
    h4: {
      fontSize: pxToRem(18),
      fontWeight: 400,
    },
    h5: {
      fontSize: pxToRem(16),
      fontWeight: 400,
    },
    h6: {
      fontSize: pxToRem(14),
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: pxToRem(18),
    },
    subtitle2: {
      fontSize: pxToRem(14),
      fontWeight: 400,
    },
    body1: {
      fontSize: pxToRem(14),
    },
    body2: {
      fontSize: pxToRem(12),
      fontWeight: 400,
    },
    caption: {
      fontSize: pxToRem(11),
      fontWeight: 400,
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff7300',
          contrastText: '#ffffff',
        },
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#ff7300',
          contrastText: '#ffffff',
        },
        background: {
          default: '#121212',
          paper: '#121212',
        },
      },
    },
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: React.createElement(ChevronDown),
        clearIcon: React.createElement(X),
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        IconComponent: ChevronDown
      },
      styleOverrides: {
        icon: {
          top: '50%',
          transform: 'translateY(-50%)',
          marginTop: 0,
        },
        select: {
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '&.MuiTabs-vertical': {
            alignItems: 'flex-start',
          },
        },
        flexContainer: {
          '&.MuiTabs-flexContainerVertical': {
            alignItems: 'flex-start',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          textTransform: 'none',
          fontWeight: 400,
          fontSize: theme.typography.body1.fontSize,
          '&.MuiTab-root': {
            minHeight: 48,
            padding: '8px 16px',
          },
          '.MuiTabs-vertical &': {
            width: '100%',
            minHeight: 40,
            padding: '8px 16px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'left',
          },
        }),
      },
    },
  },
});

// Add custom properties to the theme and theme.vars
const customProperties = {
  blur: {
    light: 'blur(3px)',
    medium: 'blur(10px)',
    heavy: 'blur(20px)',
  },
  border: {
    width: '1px',
    style: 'solid',
  },
  gradient: {
    primary: 'linear-gradient(90deg, #F47B20 0%, #EF4223 100%)',
  },
  syntax: {
    light: {
      background: '#f5f5f5',
      text: '#24292e',
      comment: '#6a737d',
      keyword: '#d73a49',
      string: '#032f62',
      function: '#6f42c1',
      number: '#005cc5',
      operator: '#d73a49',
    },
    dark: {
      background: '#1e1e1e',
      text: '#d4d4d4',
      comment: '#6a9955',
      keyword: '#569cd6',
      string: '#ce9178',
      function: '#dcdcaa',
      number: '#b5cea8',
      operator: '#d4d4d4',
    },
  },
};

Object.assign(OxygenThemeBase, customProperties);

// Ensure vars object exists before assigning
if (OxygenThemeBase.vars) {
  Object.assign(OxygenThemeBase.vars, customProperties);
}

export default OxygenThemeBase as OxygenTheme;
