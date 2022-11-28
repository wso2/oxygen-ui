/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import React, {PropsWithChildren, ReactNode} from 'react';
import {addParameters, Story, StoryContext} from '@storybook/react';
import {DocsContainer, DocsContainerProps, DocsPage} from '@storybook/addon-docs';
import {themes} from './theme';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import {CssBaseline, StyledEngineProvider} from '@mui/material';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#47EBD8',
          contrastText: "#fff"
        },
        secondary: {
          main: '#F7F8FB',
          contrastText: "#40404B"
        }
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#47EBD8',
        },
      },
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            textTransform: 'none'
          },
        },
        {
          props: { variant: 'secondary', color: 'secondary' },
          style: {
            textTransform: 'none'
          },
        }
      ],
    },
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif'
    ].join(','),
    button: {
      textTransform: 'none'
    }
  }
});

/**
 * Wrapper for all the required providers.
 *
 * @param Story - Story component.
 * @param context - Story context.
 * @returns Stroy wrapped in providers.
 */
const withProviders = (Story: Story, context: StoryContext) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </CssVarsProvider>
    </StyledEngineProvider>
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
  layout: 'centered',
  controls: {
    expanded: true,
    sort: 'requiredFirst',
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#1e1e1e',
      },
    ],
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
      order: ['Introduction', 'Inputs', '*', 'Accessibility', 'Hooks'],
    },
  },
});

export const decorators = [withProviders];
