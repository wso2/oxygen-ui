/*
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider, Theme, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import OxygenTheme, { RadialBodyBackgroundDesign } from '../../styles/OxygenTheme/OxygenTheme';

interface OxygenUIThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
  radialBackground?: boolean;
}

export default function OxygenUIThemeProvider({
  children,
  theme,
  radialBackground = false
}: OxygenUIThemeProviderProps) {

  const resolvedTheme = useMemo(() => {
    if (theme) return theme;

    if (!radialBackground) return OxygenTheme;

    // Create a new Oxygen UI theme with CssBaseline overrides with radial background
    return createTheme(OxygenTheme, RadialBodyBackgroundDesign);
  }, [theme, radialBackground]);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={resolvedTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
