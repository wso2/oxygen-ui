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

import React from "react";
import Theme from "../packages/oxygen-ui/src/styles/OxygenTheme/OxygenTheme";
import { ThemeProvider } from '@mui/material/styles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import './docs.css';

export const globalTypes = {
  colorScheme: {
    name: 'Color Scheme',
    description: 'Global color scheme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const mode = context.globals.colorScheme || 'light';
    
    // Apply color scheme to the document for docs page
    React.useEffect(() => {
      document.documentElement.setAttribute('data-color-scheme', mode);
      document.body.setAttribute('data-color-scheme', mode);
      // Also update the CSS variable for background
      document.documentElement.style.colorScheme = mode;
    }, [mode]);
    
    return (
      <CssVarsProvider theme={Theme} defaultMode={mode} mode={mode} key={mode}>
        <ThemeProvider theme={Theme}>
          <Story />
        </ThemeProvider>
      </CssVarsProvider>
    );
  },
];

export const parameters = {
  backgrounds: {
    disable: true, // Disable Storybook's default backgrounds since we're using theme
  },
  docs: {
    toc: true,
  },
};
