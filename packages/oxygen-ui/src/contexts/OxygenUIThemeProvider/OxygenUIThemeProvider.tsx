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

import { ThemeProvider, StyledEngineProvider, Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ReactNode, createContext, useContext, useState } from 'react';
import OxygenTheme from '../../styles/OxygenTheme/OxygenTheme';
import OxygenThemeWithRadialBackground from '../../styles/OxygenTheme/OxygenThemeWithRadialBackground';

export interface ThemeOption {
  /**
   * Unique key for the theme
   */
  key: string;
  /**
   * Display label for the theme
   */
  label: string;
  /**
   * The theme object
   */
  theme: Theme;
}

export interface ThemeSwitcherContextValue {
  /**
   * The current active theme object
   */
  theme: Theme;
  /**
   * The current theme key
   */
  currentTheme: string;
  /**
   * All available theme options
   */
  themes: ThemeOption[];
  /**
   * Function to switch to a specific theme by key
   */
  setTheme: (themeKey: string) => void;
  /**
   * Check if a specific theme is active
   */
  isActive: (themeKey: string) => boolean;
}

// Default theme options
const defaultThemes: ThemeOption[] = [
  {
    key: 'default',
    label: 'Default',
    theme: OxygenTheme,
  },
  {
    key: 'radial',
    label: 'Radial Background',
    theme: OxygenThemeWithRadialBackground,
  },
];

// Context for theme switching
const ThemeSwitcherContext = createContext<ThemeSwitcherContextValue | null>(null);

/**
 * Hook to access theme switcher context
 */
export const useThemeSwitcher = () => {
  const context = useContext(ThemeSwitcherContext);
  if (!context) {
    throw new Error('useThemeSwitcher must be used within OxygenUIThemeProvider with themes prop');
  }
  return context;
};

interface OxygenUIThemeProviderProps {
  children: ReactNode;
  /**
   * Optional single theme object. If provided, theme switching will be disabled.
   * Use this for simple single-theme applications.
   */
  theme?: Theme;
  /**
   * Array of theme options for theme switching.
   * If provided, enables theme switching functionality.
   * Takes precedence over the `theme` prop.
   */
  themes?: ThemeOption[];
  /**
   * Initial theme key when using theme switching.
   * Defaults to the first theme in the themes array.
   */
  initialTheme?: string;
}

export default function OxygenUIThemeProvider({
  children,
  theme,
  themes,
  initialTheme,
}: OxygenUIThemeProviderProps) {
  // Use theme switching mode if themes array is provided
  const useThemeSwitching = !!themes;
  const themeOptions = themes || defaultThemes;
  
  const [currentThemeKey, setCurrentThemeKey] = useState<string>(
    initialTheme || themeOptions[0]?.key || 'default'
  );

  // Determine which theme to use
  let resolvedTheme: Theme;
  if (useThemeSwitching) {
    resolvedTheme = themeOptions.find((t) => t.key === currentThemeKey)?.theme || themeOptions[0]?.theme;
  } else {
    resolvedTheme = theme || OxygenTheme;
  }

  const setTheme = (themeKey: string) => {
    if (themeOptions.some((t) => t.key === themeKey)) {
      setCurrentThemeKey(themeKey);
    }
  };

  const isActive = (themeKey: string) => currentThemeKey === themeKey;

  const contextValue: ThemeSwitcherContextValue = {
    theme: resolvedTheme,
    currentTheme: currentThemeKey,
    themes: themeOptions,
    setTheme,
    isActive,
  };

  const content = (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={resolvedTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );

  // Only provide context if theme switching is enabled
  if (useThemeSwitching) {
    return (
      <ThemeSwitcherContext.Provider value={contextValue}>
        {content}
      </ThemeSwitcherContext.Provider>
    );
  }

  return content;
}
