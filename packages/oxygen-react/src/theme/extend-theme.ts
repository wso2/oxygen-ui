import {CssVarsTheme, experimental_extendTheme as mui_extendTheme, Theme} from '@mui/material/styles';
import {deepmerge} from '@mui/utils';

export default function extendTheme(options: any, ...args: any): Omit<Theme, 'palette'> & CssVarsTheme {
  return mui_extendTheme(
    deepmerge(
      {
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
        cssVarPrefix: 'oxygen',
        shape: {
          borderRadius: 8,
        },
        typography: {
          button: {
            textTransform: 'none',
          },
          fontFamily: ['Inter', 'sans-serif'].join(','),
        },
      },
      options,
    ),
    ...args,
  );
}
