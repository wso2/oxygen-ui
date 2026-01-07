/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import {
  Title,
  Subtitle,
  Description,
  Controls,
  Stories,
} from '@storybook/addon-docs/blocks';
import React from "react";
import { addons } from 'storybook/internal/preview-api';
// importing from path to avoid preview break on change
import { useColorScheme } from '@mui/material/styles';
import {
  OxygenUIThemeProvider,
  useThemeSwitcher,
  AcrylicOrangeTheme,
  AcrylicPurpleTheme,
  ClassicTheme,
  HighContrastTheme,
} from "@wso2/oxygen-ui";
import './docs.css';

/**
 * Component to sync the Storybook toolbar color scheme with MUI's internal state.
 * This must be rendered inside the ThemeProvider.
 * Syncs both ways: toolbar -> component and component -> toolbar.
 */
function ColorSchemeSyncer({ mode, resolvedMode }) {
  const { mode: currentMode, setMode } = useColorScheme();
  const channel = addons.getChannel();
  const lastModeRef = React.useRef(mode);
  const lastCurrentModeRef = React.useRef(currentMode);
  const isUpdatingFromToolbarRef = React.useRef(false);

  // Update document attributes immediately when resolved mode changes
  React.useLayoutEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', resolvedMode);
    document.body.setAttribute('data-color-scheme', resolvedMode);
    document.documentElement.style.colorScheme = resolvedMode;
  }, [resolvedMode]);

  // Sync toolbar mode to MUI (when toolbar changes)
  React.useEffect(() => {
    if (mode !== lastModeRef.current) {
      lastModeRef.current = mode;
      isUpdatingFromToolbarRef.current = true;
      setMode(mode);
      // Reset flag after state update
      setTimeout(() => {
        isUpdatingFromToolbarRef.current = false;
      }, 0);
    }
  }, [mode, setMode]);

  // Sync MUI mode back to toolbar (when component changes internally)
  React.useEffect(() => {
    if (currentMode !== lastCurrentModeRef.current && currentMode !== mode && !isUpdatingFromToolbarRef.current) {
      lastCurrentModeRef.current = currentMode;
      channel.emit('updateGlobals', {
        globals: { colorScheme: currentMode },
      });
    }
  }, [currentMode, mode, channel]);

  return null;
}

/**
 * Component to sync the Storybook toolbar theme with OxygenUI's theme state.
 */
function ThemeSyncer({ themeKey }) {
  const { currentTheme, setTheme } = useThemeSwitcher();
  const channel = addons.getChannel();
  const lastThemeKeyRef = React.useRef(themeKey);
  const isUpdatingFromToolbarRef = React.useRef(false);
  const hasSyncedRef = React.useRef(false);

  // Sync toolbar theme to OxygenUI (when toolbar changes)
  React.useEffect(() => {
    if (themeKey !== lastThemeKeyRef.current) {
      lastThemeKeyRef.current = themeKey;
      isUpdatingFromToolbarRef.current = true;
      setTheme(themeKey);
      // Reset flag after state update
      setTimeout(() => {
        isUpdatingFromToolbarRef.current = false;
      }, 0);
    }
  }, [themeKey, setTheme]);

  // Sync OxygenUI theme back to toolbar on mount and when theme changes
  React.useEffect(() => {
    if (!isUpdatingFromToolbarRef.current && currentTheme !== themeKey) {
      // Only sync once on mount or when there's an actual mismatch
      if (!hasSyncedRef.current || currentTheme !== lastThemeKeyRef.current) {
        hasSyncedRef.current = true;
        channel.emit('updateGlobals', {
          globals: { theme: currentTheme },
        });
      }
    }
  }, [currentTheme, themeKey, channel]);

  return null;
}

const preview = {
  globalTypes: {
    colorScheme: {
      name: 'Color Scheme',
      description: 'Global color scheme for components',
      defaultValue: 'system',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'classic',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'acrylicOrange', title: 'Acrylic Orange' },
          { value: 'acrylicPurple', title: 'Acrylic Purple' },
          { value: 'classic', title: 'Classic' },
          { value: 'highContrast', title: 'High Contrast' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const mode = context.globals.colorScheme ?? 'dark';
      const themeKey = context.globals.theme ?? 'acrylicPurple';

      const themes = React.useMemo(() => [
        { key: 'acrylicOrange', label: 'Acrylic Orange', theme: AcrylicOrangeTheme },
        { key: 'acrylicPurple', label: 'Acrylic Purple', theme: AcrylicPurpleTheme },
        { key: 'classic', label: 'Classic', theme: ClassicTheme },
        { key: 'highContrast', label: 'High Contrast', theme: HighContrastTheme },
      ], []);

      // Resolve system mode to actual light/dark based on OS preference
      const resolvedMode = React.useMemo(() => 
        mode === 'system' 
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : mode,
        [mode]
      );

      return (
        <OxygenUIThemeProvider
          themes={themes}
          initialTheme={themeKey}
        >
          <ColorSchemeSyncer mode={mode} resolvedMode={resolvedMode} />
          <ThemeSyncer themeKey={themeKey} />
          <Story />
        </OxygenUIThemeProvider>
      );
    },
  ],

  parameters: {
    backgrounds: {
      disable: true,
    },

    options: {
      storySort: {
        order: ['Welcome', 'Inputs', 'DataDisplay', '*', 'Theming', 'Animations', 'Utils', 'MUI X'],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
