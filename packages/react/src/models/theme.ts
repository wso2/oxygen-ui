import {CssVarsTheme, Theme as MuiTheme} from '@mui/material/styles';

export type Theme = Omit<MuiTheme, 'palette'> & CssVarsTheme;
