import {CssVarsTheme, Theme as MuiTheme} from '@mui/material/styles';

export type ColorScheme = 'light' | 'dark' | string;

export type Theme = Omit<MuiTheme, 'palette'> & CssVarsTheme;
