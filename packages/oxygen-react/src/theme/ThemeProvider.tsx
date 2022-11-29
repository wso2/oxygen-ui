import React, {ReactElement} from 'react';
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import {CssBaseline, StyledEngineProvider} from '@mui/material';
import {ThemeProviderProps as MuiThemeProviderProps} from '@mui/material/styles/ThemeProvider';
import defaultTheme from './default-theme';

export type ThemeProviderProps = Partial<MuiThemeProviderProps>;

const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const {children, theme, ...rest} = props;
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={(theme as any) ?? defaultTheme} {...rest}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
