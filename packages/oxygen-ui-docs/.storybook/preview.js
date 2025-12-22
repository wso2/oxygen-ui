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
// importing from path to avoid preview break on change
import {
  OxygenUIThemeProvider,
  OxygenTheme,
  AsgardeoTheme,
  ChoreoTheme,
  ClassicTheme,
  HighContrastTheme,
} from "@wso2/oxygen-ui";
import './docs.css';

const preview = {
  globalTypes: {
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
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'radial',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'asgardeo', title: 'Asgardeo' },
          { value: 'choreo', title: 'Choreo' },
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
      const mode = context.globals.colorScheme ?? 'light';
      const themeKey = context.globals.theme ?? 'radial';

      const themes = [
        { key: 'default', label: 'Default', theme: OxygenTheme },
        { key: 'asgardeo', label: 'Asgardeo', theme: AsgardeoTheme },
        { key: 'choreo', label: 'Choreo', theme: ChoreoTheme },
        { key: 'classic', label: 'Classic', theme: ClassicTheme },
        { key: 'highContrast', label: 'High Contrast', theme: HighContrastTheme },
      ];

      React.useEffect(() => {
        document.documentElement.setAttribute('data-color-scheme', mode);
        document.body.setAttribute('data-color-scheme', mode);
        document.documentElement.style.colorScheme = mode;
      }, [mode]);

      return (
        <OxygenUIThemeProvider
          themes={themes}
          initialTheme={themeKey}
          key={themeKey}
        >
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
