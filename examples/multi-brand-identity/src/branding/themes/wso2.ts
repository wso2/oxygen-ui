import {extendTheme} from '@oxygen/react';

export const wso2Theme = extendTheme({
  colorSchemes: {
    dark: {
      brand: {
        logo: {
          main: `${process.env.PUBLIC_URL}/assets/brands/wso2/images/wso2-logo-inverted.svg`,
        },
      },
      palette: {
        primary: {
          main: '#ff5000',
        },
      },
    },
    light: {
      brand: {
        logo: {
          main: `${process.env.PUBLIC_URL}/assets/brands/wso2/images/wso2-logo.svg`,
        },
      },
      palette: {
        primary: {
          main: '#ff5000',
        },
      },
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '0.67857143em 1em',
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
