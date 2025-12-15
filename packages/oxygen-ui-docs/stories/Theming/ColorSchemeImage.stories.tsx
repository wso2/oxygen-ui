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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorSchemeImage, ColorSchemeToggle, Stack, Typography, Paper, Box } from '@wso2/oxygen-ui';

const meta: Meta<typeof ColorSchemeImage> = {
  title: 'Theming/ColorSchemeImage',
  component: ColorSchemeImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that automatically switches images based on the current color scheme (light/dark mode). ' +
          'Useful for displaying theme-aware logos, illustrations, or any visual content.\n\n' +
          '**Features:**\n' +
          '- Automatic image switching based on color scheme\n' +
          '- Support for different alt text per mode\n' +
          '- Customizable width and height\n' +
          '- Smooth transitions between images\n' +
          '- Extends MUI Box props\n\n' +
          '**Usage:**\n' +
          '```tsx\n' +
          '<ColorSchemeImage\n' +
          '  src={{\n' +
          '    light: "/logo-light.png",\n' +
          '    dark: "/logo-dark.png"\n' +
          '  }}\n' +
          '  alt="Company Logo"\n' +
          '  width={200}\n' +
          '/>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorSchemeImage>;

export const Default: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 400 }}>
        Toggle the color scheme to see the illustration change
      </Typography>
      <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <ColorSchemeImage
          src={{
            light: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDAiIHI9IjI1IiBmaWxsPSIjRkZENTREIi8+CjxwYXRoIGQ9Ik0wIDIwMFExNTAgMTIwIDMwMCAyMDBWMjAwSDBaIiBmaWxsPSIjNEZBRjZGIi8+CjxwYXRoIGQ9Ik0wIDE4MFExNTAgMTAwIDMwMCAxODBWMjAwSDBWMTgwWiIgZmlsbD0iIzY2QkI2QSIvPgo8cmVjdCB4PSI4MCIgeT0iMTYwIiB3aWR0aD0iMTAiIGhlaWdodD0iNDAiIGZpbGw9IiM4RDZFNjMiLz4KPGNpcmNsZSBjeD0iODUiIGN5PSIxNDUiIHI9IjIwIiBmaWxsPSIjNjZCQjZBIi8+CjxyZWN0IHg9IjE4MCIgeT0iMTUwIiB3aWR0aD0iMTAiIGhlaWdodD0iNTAiIGZpbGw9IiM4RDZFNjMiLz4KPGNpcmNsZSBjeD0iMTg1IiBjeT0iMTM1IiByPSIyNSIgZmlsbD0iIzZDQjc1NCIvPgo8dGV4dCB4PSIxNTAiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMzMzMiIGZvbnQtd2VpZ2h0PSJib2xkIj5MaWdodCBNb2RlPC90ZXh0Pgo8L3N2Zz4=',
            dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUUxRTFFIi8+CjxjaXJjbGUgY3g9IjI0MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iI0YwRjBGMCIvPgo8Y2lyY2xlIGN4PSIyNDUiIGN5PSI0NSIgcj0iMTgiIGZpbGw9IiMxRTFFMUUiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSI2MCIgcj0iMiIgZmlsbD0iI0YwRjBGMCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI0MCIgcj0iMSIgZmlsbD0iI0YwRjBGMCIvPgo8Y2lyY2xlIGN4PSIyNzAiIGN5PSI5MCIgcj0iMS41IiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiNGMEYwRjAiLz4KPHBhdGggZD0iTTAgMjAwUTE1MCAxMjAgMzAwIDIwMFYyMDBIMFoiIGZpbGw9IiMyQzJDNTQiLz4KPHBhdGggZD0iTTAgMTgwUTE1MCAxMDAgMzAwIDE4MFYyMDBIMFYxODBaIiBmaWxsPSIjMzQzNDY0Ii8+CjxyZWN0IHg9IjgwIiB5PSIxNjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzRBNEE0QSIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjE0NSIgcj0iMjAiIGZpbGw9IiMzNDM0NjQiLz4KPHJlY3QgeD0iMTgwIiB5PSIxNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzRBNEE0QSIvPgo8Y2lyY2xlIGN4PSIxODUiIGN5PSIxMzUiIHI9IjI1IiBmaWxsPSIjMkMyQzU0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0YwRjBGMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkRhcmsgTW9kZTwvdGV4dD4KPC9zdmc+',
          }}
          alt="Theme-aware landscape illustration"
          width={500}
          height={333}
        />
      </Paper>
      <ColorSchemeToggle />
    </Stack>
  ),
};
