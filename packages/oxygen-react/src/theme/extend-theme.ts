import {CssVarsTheme, experimental_extendTheme as mui_extendTheme, Theme} from '@mui/material/styles';
import defaultTheme from './default-theme';

export default function extendTheme(...args: any): Omit<Theme, 'palette'> & CssVarsTheme {
  return mui_extendTheme(defaultTheme, ...args);
}
