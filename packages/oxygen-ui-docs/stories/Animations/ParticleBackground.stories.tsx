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

import { Controls, Description, Primary, Subtitle, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ParticleBackground, Box, Typography } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * ParticleBackground is an animated canvas component that renders an interactive particle network.
 * The particles respond to mouse movements and clicks, creating an engaging visual effect.
 * Perfect for hero sections, backgrounds, or any area where you want to add subtle animation.
 * 
 * Features:
 * - Automatically adapts to light/dark theme
 * - Responsive to screen size
 * - Interactive mouse effects (repel on hover, burst on click)
 * - Highly customizable
 */
const meta = {
  component: ParticleBackground,
  title: 'Animations/ParticleBackground',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An animated particle network background that responds to mouse interactions and adapts to theme changes.',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Controls />
          <Primary />
        </>
      ),
    },
  },
  argTypes: {
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Opacity of the canvas',
      table: {
        defaultValue: { summary: '0.5' },
      },
    },
    baseDensity: {
      control: { type: 'range', min: 0.05, max: 0.3, step: 0.01 },
      description: 'Particles per 10,000 px² (scales with screen size)',
      table: {
        defaultValue: { summary: '0.12' },
      },
    },
    maxSpeed: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
      description: 'Maximum speed in px per frame',
      table: {
        defaultValue: { summary: '0.3' },
      },
    },
    linkDist: {
      control: { type: 'range', min: 100, max: 300, step: 10 },
      description: 'Maximum distance to draw line between particles',
      table: {
        defaultValue: { summary: '210' },
      },
    },
    linkAlpha: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Base opacity of the lines',
      table: {
        defaultValue: { summary: '0.2' },
      },
    },
    mouseInfluence: {
      control: { type: 'range', min: 50, max: 200, step: 10 },
      description: 'Radius of mouse influence',
      table: {
        defaultValue: { summary: '110' },
      },
    },
    repelStrength: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
      description: 'How strong the repel effect is',
      table: {
        defaultValue: { summary: '0.35' },
      },
    },
    clickBurst: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Impulse strength on click',
      table: {
        defaultValue: { summary: '120' },
      },
    },
  },
} satisfies Meta<typeof ParticleBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <ParticleBackground {...args} />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Interactive Particle Background
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Move your mouse to repel particles • Click to create a burst effect
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    opacity: 0.5,
    baseDensity: 0.12,
    maxSpeed: 0.3,
    linkDist: 210,
    linkAlpha: 0.2,
    mouseInfluence: 110,
    repelStrength: 0.35,
    clickBurst: 120,
  },
};

export const Subtle: Story = {
  render: (args) => (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <ParticleBackground {...args} />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Subtle Animation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lower density and opacity for a more subtle effect
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    opacity: 0.3,
    baseDensity: 0.08,
    maxSpeed: 0.2,
    linkDist: 180,
    linkAlpha: 0.15,
    mouseInfluence: 110,
    repelStrength: 0.35,
    clickBurst: 120,
  },
};

export const Energetic: Story = {
  render: (args) => (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ParticleBackground {...args} />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Energetic Animation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Higher density and speed for a more dynamic effect
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    opacity: 0.7,
    baseDensity: 0.2,
    maxSpeed: 0.6,
    linkDist: 240,
    linkAlpha: 0.3,
    mouseInfluence: 150,
    repelStrength: 0.5,
    clickBurst: 200,
  },
};
