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

import {PropsWithChildren, ReactNode} from 'react';
import {addParameters, Story, StoryContext} from '@storybook/react';
import {DocsContainer, DocsContainerProps, DocsPage} from '@storybook/addon-docs';
import {themes} from './theme';
import ThemeProvider from '../src/theme/ThemeProvider';
import {extendTheme} from '../src/theme';

/**
 * Wrapper for all the required providers.
 *
 * @param Story - Story component.
 * @param context - Story context.
 * @returns Stroy wrapped in providers.
 */
const withProviders = (Story: Story, context: StoryContext) => {
  return (
    <ThemeProvider
      theme={extendTheme({
        typography: {
          fontFamily: 'Gilmer',
        },
      })}
    >
      <Story {...context} />
    </ThemeProvider>
  );
};

addParameters({
  darkMode: {
    current: 'dark',
    // Override the default dark theme
    dark: themes.dark,
    // Override the default light theme
    light: themes.light,
    normal: themes.normal,
  },
  layout: 'fullscreen',
  controls: {
    expanded: true,
    sort: 'requiredFirst',
  },
  docs: {
    inlineStories: true,
    container: (props: PropsWithChildren<DocsContainerProps>): any => {
      const {context, children} = props;

      return <DocsContainer context={context}>{children}</DocsContainer>;
    },
    page: DocsPage,
    theme: themes.dark,
  },
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': {
      index: -1,
    },
    canvas: {title: 'Sandbox'},
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Foundations',
        'Inputs',
        'Buttons',
        'Navigation',
        'Data Display',
        'Layout',
        'Patters',
        'Theme',
        '*',
      ],
    },
  },
});

export const decorators = [withProviders];
