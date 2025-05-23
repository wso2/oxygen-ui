/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

/* eslint-disable sort-keys */
import {
  ChoreoOxygenColorsPrimaryDark,
  ChoreoOxygenColorsPrimaryDefault,
  ChoreoOxygenColorsPrimaryLight,
} from '@oxygen-ui/primitives/design-tokens/web/choreo/es/tokens.es6';
import {extendTheme, Theme} from '@oxygen-ui/react';

const ChoreoTheme: Theme = extendTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          height: 'auto',
          borderRadius: 4,
          backgroundColor: '#40404B',
          boxShadow: '0 1px 10px 0 rgba(0,0,0,0.22)',
          fontSize: 12,
          color: '#FFFFFF',
          fontWeight: 400,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(230,231,235,0.9)',
        },
      },
    },
    MuiAppBar: {
      // TODO: Need to fix and test.
      colorPrimary: {
        backgroundColor: '#ffffff',
        color: '#222228',
        '& .MuiIconButton-root': {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--oxygen-shape-borderRadius)',
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10.5px 14px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 6px 20px 0 rgb(0 0 0 / 2%)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gilmer';
          src: url('assets/brands/choreo/fonts/Gilmer/gilmer-regular.eot');
          src:
              url('assets/brands/choreo/fonts/Gilmer/gilmer-regular.eot?#iefix') format('embedded-opentype'),
              url('assets/brands/choreo/fonts/Gilmer/gilmer-regular.woff2') format('woff2'),
              url('assets/brands/choreo/fonts/Gilmer/gilmer-regular.woff') format('woff'),
              url('assets/brands/choreo/fonts/Gilmer/gilmer-regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
            font-family: 'Gilmer';
            src: url('assets/brands/choreo/fonts/Gilmer/gilmer-medium.eot');
            src:
                url('assets/brands/choreo/fonts/Gilmer/gilmer-medium.eot?#iefix') format('embedded-opentype'),
                url('assets/brands/choreo/fonts/Gilmer/gilmer-medium.woff2') format('woff2'),
                url('assets/brands/choreo/fonts/Gilmer/gilmer-medium.woff') format('woff'),
                url('assets/brands/choreo/fonts/Gilmer/gilmer-medium.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
        }

        @font-face {
            font-family: 'Gilmer';
            src: url('assets/brands/choreo/fonts/Gilmer/gilmer-bold.eot');
            src:
                url('assets/brands/choreo/fonts/Gilmer/gilmer-bold.eot?#iefix') format('embedded-opentype'),
                url('assets/brands/choreo/fonts/Gilmer/gilmer-bold.woff2') format('woff2'),
                url('assets/brands/choreo/fonts/Gilmer/gilmer-bold.woff') format('woff'),
                url('assets/brands/choreo/fonts/Gilmer/gilmer-bold.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
        }
      `,
    },
  },
  typography: {
    fontFamily: 'Gilmer',
    // TODO: Fix these.
    // h1: {
    //   fontSize: 43,
    //   fontWeight: 'bold',
    //   fontStretch: 'normal',
    //   fontStyle: 'normal',
    //   lineHeight: 1.38,
    //   letterSpacing: 'normal',
    // },
    // h2: {
    //   fontSize: 29,
    //   fontWeight: 'bold',
    //   fontStretch: 'normal',
    //   fontStyle: 'normal',
    //   lineHeight: 1.41,
    //   letterSpacing: 'normal',
    // },
    // h3: {
    //   fontSize: 22,
    //   fontWeight: 'medium',
    //   fontStretch: 'normal',
    //   fontStyle: 'normal',
    //   lineHeight: 1.41,
    //   letterSpacing: 'normal',
    // },
    // h4: {
    //   fontSize: 15,
    //   fontWeight: 'medium',
    //   fontStretch: 'normal',
    //   fontStyle: 'normal',
    //   lineHeight: 'normal',
    //   letterSpacing: 'normal',
    // },
    // h5: {
    //   fontSize: 13,
    //   fontWeight: 'medium',
    //   fontStretch: 'normal',
    //   fontStyle: 'normal',
    //   lineHeight: 1.08,
    //   letterSpacing: 'normal',
    // },
    // h6: {
    //   fontSize: 12,
    //   fontWeight: 'medium',
    //   fontStretch: 'normal',
    //   fontStyle: 'normal',
    //   lineHeight: 1.08,
    //   letterSpacing: 'normal',
    // },
    subtitle1: {
      fontSize: 16,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.6,
      letterSpacing: 'normal',
    },
    subtitle2: {
      fontSize: 15,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.71,
      letterSpacing: 'normal',
    },
    overline: {
      fontSize: 14,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.71,
      letterSpacing: 'normal',
      textTransform: 'none',
    },
    body1: {
      fontSize: 13,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.85,
      letterSpacing: 'normal',
    },
    body2: {
      fontSize: 12,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 2,
      letterSpacing: 'normal',
    },
    caption: {
      fontSize: 11,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 2,
      letterSpacing: 'normal',
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      disableFocusRipple: true,
    },
    MuiDialog: {
      transitionDuration: {
        enter: 550,
        exit: 450,
      },
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  custom: {
    drawer: {
      width: 240,
    },
    indigo: {
      '100': '#f0f1fb',
      '200': '#ccd1f2',
    },
    blue: {
      '500': '#0095ff',
    },
    red: {
      '100': '#f8c2c2',
    },
    green: {
      '100': '#bde9d3',
    },
    mint: {
      '500': '#58cabb',
    },
    navy: {
      '500': '#2366cc',
    },
    violet: {
      '500': '#745bcc',
    },
    purple: {
      '500': '#d500f9',
    },
    component: {
      observe: {
        error: '#EA4C4D',
        info: '#53C08A',
        warn: '#FF9D52',
        secondary: '#0095FF',
        errorText: '#F99192',
        primaryText: '#AAB4EB',
        successText: '#92D9B6',
        secondaryText: '#8ACBFF',
        perc99: '#745BCC',
        perc95: '#2366CC',
        perc50: '#0095FF',
        meanLatency: '#58CABB',
        percToolTipText: '#F1F1F1',
        borderColors: {
          '100': '#D8DBE3',
          '200': '#CBCEDB',
          '300': '#ECEDF8',
          '400': '#E4E8EE',
        },
        backgroundColors: {
          light: '#FFFFFF',
          dark: '#F5F5F9',
          green: '#019E67',
          filters: {
            selected: '#F4F5F7',
            list: '#DCDEE5',
          },
        },
        texts: {
          filters: '#40404B',
        },
        shadows: {
          filters: '#E6E7EC',
          appBar: '#E1E2E7',
          green: '#2FA86C',
        },
      },
    },
    footer: {
      background: {
        light: '#f7f8fb',
        dark: '#000000',
      },
      borderColor: {
        light: '#e4e8ee7d',
        dark: '#010101',
      },
    },
    login: {
      bannerBackground: '#F0F1FB',
      border: '1px dashed #CCD1F2',
    },
  },
  colorSchemes: {
    light: {
      brand: {
        logo: {
          main: `${process.env.PUBLIC_URL}/assets/brands/choreo/images/choreo-logo.svg`,
        },
      },
      palette: {
        common: {
          black: '#1d2028',
          white: '#ffffff',
        },
        gradients: {
          primary: {
            stop1: ChoreoOxygenColorsPrimaryDefault,
            stop2: ChoreoOxygenColorsPrimaryDefault,
          },
        },
        primary: {
          light: ChoreoOxygenColorsPrimaryLight,
          main: ChoreoOxygenColorsPrimaryDefault,
          dark: ChoreoOxygenColorsPrimaryDark,
        },
        secondary: {
          light: '#f7f8fb',
          main: '#8d91a3',
          dark: '#40404b',
        },
        error: {
          light: '#fceded',
          main: '#fe523c',
          dark: '#d64733',
        },
        warning: {
          light: '#fff5eb',
          main: '#ffcc8c',
          dark: '#ff9d52',
        },
        success: {
          light: '#effdf2',
          main: '#36b475',
          dark: '#05a26b',
        },
        grey: {
          '100': '#e6e7ec',
          '200': '#cbcedb',
        },
      },
    },
    dark: {
      brand: {
        logo: {
          main: `${process.env.PUBLIC_URL}/assets/brands/choreo/images/choreo-logo-inverted.svg`,
        },
      },
      palette: {
        common: {
          black: '#000000',
          white: '#FFFFFF',
        },
        gradients: {
          primary: {
            stop1: '#404c9a',
            stop2: '#404c9a',
          },
        },
        primary: {
          light: '#AEBAFE',
          main: '#404c9a',
          dark: '#353d6f',
          contrastText: '#ffffff',
        },
        secondary: {
          light: '#f7f8fb',
          main: '#ccd1f2',
        },
        error: {
          light: '#FAE8E8',
          main: '#FD6B6B',
        },
        success: {
          light: '#E1F4ED',
          main: '#36B475',
        },
        grey: {
          '100': '#eff1f5',
          '200': '#e6e7ec',
          '210': '#dcdee4',
          '300': '#8d91a3',
          '400': '#7e7e7e',
          '500': '#222228',
          '600': '#181c20',
          '700': '#1d2028',
        },
      },
    },
  },
});

export default ChoreoTheme;
