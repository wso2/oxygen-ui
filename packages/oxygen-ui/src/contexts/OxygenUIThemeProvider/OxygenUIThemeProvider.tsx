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
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import OxygenTheme from '../../styles/Themes/AcrylicBaseTheme';

const THEME_STORAGE_KEY = 'oxygen-theme';

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
   * The theme object or a string path to load the theme from.
   * If a string path is provided, the theme will be loaded asynchronously.
   */
  theme: Theme | string;
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
  }
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

/**
 * Validates if a theme URL is from the same origin.
 * Only allows relative paths and same-origin URLs for security.
 * 
 * @param url - URL to validate
 * @returns true if URL is same-origin
 */
function isSameOrigin(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.href);
    const currentOrigin = window.location.origin;

    // Check if same origin
    return urlObj.origin === currentOrigin;
  } catch {
    // Invalid URL
    return false;
  }
}

/**
 * Loads a single theme JavaScript file by fetching and evaluating it.
 * The theme file should export default with a partial theme config object.
 * 
 * **SECURITY**: Only relative paths and same-origin URLs are allowed.
 * External/cross-origin URLs are blocked for security.
 * 
 * @param themeUrl - URL to the theme JavaScript file (must be same-origin or relative)
 * @returns Promise resolving to the theme object
 */
async function loadThemeFile(themeUrl: string): Promise<Theme | null> {
  try {
    // Validate URL is same-origin
    if (!isSameOrigin(themeUrl)) {
      console.error(`Security Error: Theme URL "${themeUrl}" is not from the same origin. Only relative paths and same-origin URLs are allowed.`);
      return null;
    }

    const response = await fetch(themeUrl, {
      // Use same-origin credentials only
      credentials: 'same-origin',
      // Set appropriate headers
      headers: {
        'Accept': 'application/javascript, text/javascript',
      },
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch theme from ${themeUrl}: ${response.status} ${response.statusText}`);
      return null;
    }

    // Verify content type
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('javascript') && !contentType.includes('ecmascript')) {
      console.warn(`Invalid content type for theme file: ${contentType}`);
      return null;
    }

    const themeCode = await response.text();
    
    // Basic validation: check for suspicious patterns
    if (themeCode.includes('eval(') || themeCode.includes('Function(')) {
      console.error('Security Error: Theme code contains potentially dangerous eval() or Function() calls');
      return null;
    }

    // Limit code size to prevent DoS (500KB max)
    if (themeCode.length > 500000) {
      console.error('Security Error: Theme file too large');
      return null;
    }
    
    // Create a module environment to evaluate the theme code
    const moduleFunction = new Function(
      'exports',
      'module',
      'createOxygenTheme',
      `'use strict';\n${themeCode}\nreturn module.exports.default || exports.default;`
    );

    // Import createOxygenTheme utility
    const { createOxygenTheme } = await import('../../utils/createOxygenTheme');
    
    // Execute the theme code and get the partial config
    const themeConfig = moduleFunction({}, { exports: {} }, createOxygenTheme);
    
    // Validate the returned config is an object
    if (!themeConfig || typeof themeConfig !== 'object') {
      console.error('Invalid theme: theme file must export an object');
      return null;
    }

    // If the file already used createOxygenTheme, return as-is
    // Otherwise, pass it through createOxygenTheme
    if ('_cssVarsTemplate' in themeConfig) {
      return themeConfig as Theme;
    }
    
    const createdTheme = createOxygenTheme(themeConfig) as Theme;
    return createdTheme;
  } catch (error) {
    console.error(`Failed to load theme from ${themeUrl}:`, error);
    return null;
  }
}

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
  /**
   * Callback fired when themes are loaded and resolved.
   * Receives the array of resolved theme configurations.
   */
  onThemesLoaded?: (themes: ThemeOption[]) => void;
}

export default function OxygenUIThemeProvider({
  children,
  theme,
  themes,
  initialTheme,
  onThemesLoaded,
}: OxygenUIThemeProviderProps) {
  // State for managing dynamically loaded themes
  const [resolvedThemes, setResolvedThemes] = useState<ThemeOption[]>([]);
  const [themesLoaded, setThemesLoaded] = useState(false);

  // Resolve any string path themes to actual Theme objects
  useEffect(() => {
    const allThemes = themes || defaultThemes;
    
    // Check if any themes need to be loaded from paths
    const themesToLoad = allThemes.filter(t => typeof t.theme === 'string');
    
    if (themesToLoad.length === 0) {
      // No async loading needed, cast to proper type
      const resolvedThemeList = allThemes.map(t => ({
        key: t.key,
        label: t.label,
        theme: t.theme as Theme
      }));
      setResolvedThemes(resolvedThemeList);
      setThemesLoaded(true);
      if (onThemesLoaded) {
        onThemesLoaded(resolvedThemeList);
      }
      return;
    }

    // Load themes asynchronously
    Promise.all(
      allThemes.map(async (themeOption) => {
        if (typeof themeOption.theme === 'string') {
          const loadedTheme = await loadThemeFile(themeOption.theme);
          if (loadedTheme) {
            return { ...themeOption, theme: loadedTheme as Theme };
          } else {
            return null;
          }
        }
        return { ...themeOption, theme: themeOption.theme as Theme };
      })
    ).then((loaded) => {
      const validThemes = loaded.filter((t): t is { key: string; label: string; theme: Theme } => t !== null);
      setResolvedThemes(validThemes);
      setThemesLoaded(true);
      if (onThemesLoaded) {
        onThemesLoaded(validThemes);
      }
    });
  }, [themes, onThemesLoaded]);

  // Use theme switching mode if themes array is provided
  const useThemeSwitching = !!themes;
  
  // Use resolved themes
  const themeOptions = resolvedThemes.length > 0 ? resolvedThemes : (themes || defaultThemes);
  
  // Get initial theme from localStorage or prop
  const [currentThemeKey, setCurrentThemeKey] = useState<string>(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined' && useThemeSwitching) {
      try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme && themeOptions.some((t) => t.key === storedTheme)) {
          return storedTheme;
        }
      } catch (error) {
        // localStorage might be disabled
        console.warn('Failed to read theme from localStorage:', error);
      }
    }
    
    // Fall back to initialTheme prop or first theme
    return initialTheme || themeOptions[0]?.key || 'default';
  });

  // Persist theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && useThemeSwitching) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, currentThemeKey);
      } catch (error) {
        // localStorage might be disabled
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  }, [currentThemeKey, useThemeSwitching]);

  // Determine which theme to use
  let resolvedTheme: Theme;
  if (useThemeSwitching) {
    const selectedTheme = themeOptions.find((t) => t.key === currentThemeKey)?.theme || themeOptions[0]?.theme;
    resolvedTheme = (typeof selectedTheme === 'string' ? OxygenTheme : selectedTheme) as Theme;
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

  // Show loading state while themes are being resolved
  if (useThemeSwitching && !themesLoaded) {
    return null;
  }

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
