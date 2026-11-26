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

// Import from storybook internals for Storybook 10
import { addons } from 'storybook/internal/manager-api';
import { themes } from 'storybook/internal/theming';

const getThemeMode = () => {
  try {
    return localStorage.getItem('mui-mode') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

const applyTheme = (mode) => {
  addons.setConfig({
    theme: {
      ...(mode === 'light' ? themes.light : themes.dark),
      appBg: (mode === 'light' ? '#ffffff' : '#050A1C'),
      barBg: (mode === 'light' ? '#f0f0f0' : '#050A1C'),
      brandTitle: 'Choreo Oxygen UI',
      brandUrl: 'https://github.com/wso2/oxygen-ui',
      brandImage: (mode === 'light' ? './oxygen-ui-logo.svg' : './oxygen-ui-logo-inverted.svg')
    }
  });
};

// Apply initial theme
let currentMode = getThemeMode();
applyTheme(currentMode);

// Poll for changes in localStorage (checks every 500ms)
setInterval(() => {
  const newMode = getThemeMode();
  if (newMode !== currentMode) {
    currentMode = newMode;
    applyTheme(currentMode);
  }
}, 500);

// Also listen for storage events (works across tabs)
window.addEventListener('storage', (e) => {
  if (e.key === 'mui-mode') {
    const newMode = getThemeMode();
    if (newMode !== currentMode) {
      currentMode = newMode;
      applyTheme(currentMode);
    }
  }
});

// The white mark disappears on light tabs and the black one on dark tabs, so the icon follows the
// browser theme. Done in script because browsers disagree on `media` for icon links.
const browserDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
const applyFavicon = () => {
  document
    .querySelector('link[rel="icon"]')
    ?.setAttribute('href', browserDarkMode.matches ? './favicon.ico' : './favicon-light.ico');
};
applyFavicon();
browserDarkMode.addEventListener('change', applyFavicon);
