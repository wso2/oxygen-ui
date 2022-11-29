import {CssVarsTheme, experimental_extendTheme as extendTheme, Theme} from '@mui/material/styles';

const defaultTheme: Omit<Theme, 'palette'> & CssVarsTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#47EBD8',
        },
      },
    },
    light: {
      palette: {
        primary: {
          contrastText: '#fff',
          main: '#47EBD8',
        },
        secondary: {
          contrastText: '#40404B',
          main: '#F7F8FB',
        },
      },
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            color: 'primary',
            variant: 'contained',
          },
          style: {
            textTransform: 'none',
          },
        },
        {
          props: {color: 'secondary', variant: 'secondary'},
          style: {
            textTransform: 'none',
          },
        },
      ],
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});

export default defaultTheme;
