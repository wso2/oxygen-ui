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

import type { Meta, StoryObj } from '@storybook/react';
import { Container, Box } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Container component centers content horizontally and provides max-width constraints.
 * It's the most basic layout element in Material-UI.
 * 
 * This is a direct import of MUI container component. 
 * Read more at: https://mui.com/material-ui/react-container/
 */
const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Oxygen UI container component is a direct import of MUI container component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-container/](https://mui.com/material-ui/react-container/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Container>
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
        Default Container
      </Box>
    </Container>
  ),
};

export const MaxWidth: Story = {
  render: () => (
    <>
      <Container maxWidth="xs" sx={{ mb: 2 }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          maxWidth=&quot;xs&quot;
        </Box>
      </Container>
      <Container maxWidth="sm" sx={{ mb: 2 }}>
        <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 2 }}>
          maxWidth=&quot;sm&quot;
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mb: 2 }}>
        <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 2 }}>
          maxWidth=&quot;md&quot;
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Box sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', p: 2 }}>
          maxWidth=&quot;lg&quot;
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: 'error.main', color: 'error.contrastText', p: 2 }}>
          maxWidth=&quot;xl&quot;
        </Box>
      </Container>
    </>
  ),
};

export const Fixed: Story = {
  render: () => (
    <Container fixed>
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
        Fixed Container
      </Box>
    </Container>
  ),
};

export const DisableGutters: Story = {
  render: () => (
    <Container disableGutters>
      <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 2 }}>
        Container without gutters
      </Box>
    </Container>
  ),
};
