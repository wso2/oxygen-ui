import React, {PropsWithChildren, ReactElement} from 'react';
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import {CssBaseline, StyledEngineProvider} from '@mui/material';
import {CssVarsProviderConfig} from '@mui/system';
import defaultTheme from './default-theme';

export type ColorScheme = 'light' | 'dark';

export type ThemeProviderProps = Partial<CssVarsProviderConfig<ColorScheme>> & {
  /**
   * The node used to attach the color-scheme attribute
   * @default document
   */
  colorSchemeNode?: Document | HTMLElement | null;
  /**
   * The CSS selector for attaching the generated custom properties
   * @default ':root'
   */
  colorSchemeSelector?: string;
  /**
   * The document used to perform `disableTransitionOnChange` feature
   * @default document
   */
  documentNode?: Document | null;
  /**
   * The window that attaches the 'storage' event listener
   * @default window
   */
  storageWindow?: Window | null;
  theme?: {
    colorSchemes: Record<ColorScheme, Record<string, any>>;
    cssVarPrefix?: string;
  };
};

const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>): ReactElement => {
  const {children, theme, ...rest} = props;
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme ?? defaultTheme} {...rest}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
