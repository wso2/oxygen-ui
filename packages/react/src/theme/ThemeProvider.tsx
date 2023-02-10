/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {CssBaseline, StyledEngineProvider} from '@mui/material';
import {Experimental_CssVarsProvider as CssVarsProvider, SupportedColorScheme} from '@mui/material/styles';
import {CssVarsProviderConfig} from '@mui/system';
import {PropsWithChildren, ReactElement} from 'react';
import defaultTheme from './default-theme';

export type ThemeProviderProps = Partial<CssVarsProviderConfig<SupportedColorScheme>> & {
  /**
   * The node used to attach the color-scheme attribute
   * @default document
   */
  colorSchemeNode?: Element | null | undefined;
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
  theme?:
    | {
        colorSchemes: Record<SupportedColorScheme, Record<string, any>>;
        cssVarPrefix?: string | undefined;
      }
    | undefined;
};

const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>): ReactElement => {
  const {children, theme, ...rest} = props;
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider
        modeStorageKey="oxygen-mode"
        colorSchemeStorageKey="oxygen-color-scheme"
        theme={theme ?? defaultTheme}
        {...rest}
      >
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
