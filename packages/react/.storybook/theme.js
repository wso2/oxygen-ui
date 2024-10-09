/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import {themes as defaultThemes} from '@storybook/theming';
import defaultTheme from '../src/theme/default-theme';

const commons = {
  colorSecondary: '#FF7300',
  brandTitle: 'Oxygen UI | React',
  brandTarget: '_self',
};

/**
 * Get moderated themes for the Storybook.
 * @see {@link https://storybook.js.org/docs/react/configure/theming}
 */
export const themes = {
  dark: {
    ...defaultThemes.dark,
    appBg: '#121212',
    appContentBg: '#2a2a2a',
    brandImage: './assets/images/oxygen-ui-react-logo.svg',
    barSelectedColor: '#FF7300',
    ...commons,
  },
  light: {
    ...defaultThemes.light,
    brandImage: './assets/images/oxygen-ui-react-logo-inverted.svg',
    appBg: '#f1f1f1',
    ...commons,
  },
  normal: {
    ...defaultThemes.normal,
    brandImage: './assets/images/oxygen-ui-react-inverted.svg',
    appBg: '#f1f1f1',
    ...commons,
  },
};

/**
 * Get theme available storybook manager themes in the runtime.
 */
export function getManagerThemesRuntime() {
  return JSON.parse(window.localStorage.getItem('sb-addon-themes-3'));
};

/**
 * Get the currently active theme available storybook manager in the runtime.
 */
export const getActiveManagerThemeRuntime = () => {
  return getManagerThemesRuntime().current;
};

/**
 * Get the active Oxygen UI theme in the runtime.
 */
export const getOxygenThemeRuntime = () => {
  const activeTheme = localStorage.getItem('oxygen-mode');
  return {
    name: activeTheme,
    theme: defaultTheme.colorSchemes[activeTheme],
  };
};

/**
 * Get the set of Oxygen UI themes defined in the default theme.
 */
export const getOxygenThemes = () => {
  return defaultTheme.colorSchemes;
};
