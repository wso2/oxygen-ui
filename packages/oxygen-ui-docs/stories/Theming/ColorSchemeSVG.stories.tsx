/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import type {Meta, StoryObj} from '@storybook/react';
import {ColorSchemeSVG, ColorSchemeToggle, Stack, Typography, Paper, Box, Divider} from '@wso2/oxygen-ui';

// Example SVG component (simulating an imported SVG with ?react)
// This demonstrates how an imported SVG file would look with theme color attributes
const ExampleSVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Dashboard illustration with theme colors */}
    <rect fill="background" width="400" height="250" rx="8" />
    
    {/* Header bar */}
    <rect fill="primary" width="400" height="50" rx="8" />
    <circle fill="surface" cx="30" cy="25" r="12" />
    <rect fill="surface" x="60" y="18" width="100" height="14" rx="4" />
    
    {/* Main content cards */}
    <rect fill="surface" x="20" y="70" width="170" height="160" rx="6" />
    <rect fill="surface" x="210" y="70" width="170" height="160" rx="6" />
    
    {/* Card 1 content */}
    <circle fill="success" cx="50" cy="100" r="20" />
    <rect fill="text-secondary" x="80" y="92" width="80" height="8" rx="4" />
    <rect fill="text-disabled" x="80" y="105" width="60" height="6" rx="3" />
    <rect fill="accent" x="30" y="140" width="150" height="6" rx="3" />
    <rect fill="accent" x="30" y="155" width="120" height="6" rx="3" />
    <rect fill="muted" x="30" y="170" width="100" height="6" rx="3" />
    
    {/* Card 2 content */}
    <circle fill="warning" cx="240" cy="100" r="20" />
    <rect fill="text-secondary" x="270" y="92" width="80" height="8" rx="4" />
    <rect fill="text-disabled" x="270" y="105" width="60" height="6" rx="3" />
    
    {/* Progress bars in card 2 */}
    <rect fill="muted" x="220" y="140" width="150" height="8" rx="4" />
    <rect fill="primary" x="220" y="140" width="100" height="8" rx="4" />
    <rect fill="muted" x="220" y="160" width="150" height="8" rx="4" />
    <rect fill="secondary" x="220" y="160" width="120" height="8" rx="4" />
    <rect fill="muted" x="220" y="180" width="150" height="8" rx="4" />
    <rect fill="info" x="220" y="180" width="80" height="8" rx="4" />
    
    {/* Footer icons */}
    <circle stroke="primary" strokeWidth="2" fill="none" cx="350" cy="215" r="12" />
    <circle stroke="error" strokeWidth="2" fill="none" cx="320" cy="215" r="12" />
  </svg>
);

const meta: Meta<typeof ColorSchemeSVG> = {
  title: 'Theming/ColorSchemeSVG',
  component: ColorSchemeSVG,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A theme-aware SVG component that applies color scheme to SVG elements. ' +
          'Automatically adapts colors to light and dark modes using attribute-based selectors.\n\n' +
          '**Usage Pattern:**\n' +
          'Use `fill="primary"` or `stroke="primary"` attributes (similar to `currentColor`)\n\n' +
          '**Supported Color Values:**\n' +
          '- `primary`, `secondary`, `accent`, `muted` - Theme colors\n' +
          '- `text-primary`, `text-secondary`, `text-disabled` - Text colors\n' +
          '- `background`, `surface` - Background colors\n' +
          '- `error`, `warning`, `info`, `success` - Status colors\n' +
          '- `border` - Divider color (stroke only)\n' +
          '- `highlight`, `hover` - Action colors (fill only)\n\n' +
          '**Usage Examples:**\n' +
          '```tsx\n' +
          '// With inline SVG elements\n' +
          '<ColorSchemeSVG width={200} height={100} viewBox="0 0 200 100">\n' +
          '  <rect fill="primary" x="0" y="0" width="100" height="100" />\n' +
          '  <circle stroke="secondary" fill="none" strokeWidth="2" cx="150" cy="50" r="40" />\n' +
          '</ColorSchemeSVG>\n\n' +
          '// With imported SVG component\n' +
          'import Logo from "./logo.svg?react";\n' +
          '<ColorSchemeSVG svg={Logo} width={200} />\n' +
          '```\n\n' +
          '**Note:** For imported SVG files, edit the source SVG to use theme color values (e.g., `fill="primary"`) instead of hex colors.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorSchemeSVG>;

export const Default: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', maxWidth: 400}}>
        Toggle the color scheme to see the SVG colors adapt
      </Typography>
      <Paper elevation={2} sx={{p: 3, bgcolor: 'background.paper'}}>
        <ColorSchemeSVG width={400} height={200} viewBox="0 0 400 200">
          <rect fill="background" width="400" height="200" />
          <circle fill="primary" cx="100" cy="100" r="40" />
          <rect fill="secondary" x="180" y="60" width="80" height="80" />
          <path fill="accent" d="M300 100 L340 60 L340 140 Z" />
          <circle stroke="primary" strokeWidth="3" fill="none" cx="100" cy="100" r="45" />
          <text fill="text-primary" x="200" y="180" textAnchor="middle" fontSize="14" fontWeight="bold">
            Theme-aware SVG
          </text>
        </ColorSchemeSVG>
      </Paper>
      <ColorSchemeToggle />
    </Stack>
  ),
};

export const WithSVGComponent: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', maxWidth: 400}}>
        Dashboard illustration using imported SVG component with theme color attributes
      </Typography>
      <Paper elevation={2} sx={{p: 3, bgcolor: 'background.paper'}}>
        <ColorSchemeSVG svg={ExampleSVGComponent} height={250} width={400} />
      </Paper>
      <ColorSchemeToggle />
    </Stack>
  ),
};

export const AllColorValues: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center" sx={{width: '100%', maxWidth: 800}}>
      <Typography variant="h5" fontWeight={600}>
        Available Color Values
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center'}}>
        Toggle between light and dark mode to see all available color values
      </Typography>

      <Paper elevation={2} sx={{p: 3, bgcolor: 'background.paper', width: '100%'}}>
        <Stack spacing={3}>
          {/* Theme Colors */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Theme Colors
            </Typography>
            <ColorSchemeSVG width="100%" height={60}>
              <rect fill="primary" x="0" y="10" width="80" height="40" />
              <rect fill="secondary" x="100" y="10" width="80" height="40" />
              <rect fill="accent" x="200" y="10" width="80" height="40" />
              <rect fill="muted" x="300" y="10" width="80" height="40" />
              <text x="40" y="35" textAnchor="middle" fontSize="10" fill="white">
                primary
              </text>
              <text x="140" y="35" textAnchor="middle" fontSize="10" fill="white">
                secondary
              </text>
              <text x="240" y="35" textAnchor="middle" fontSize="10" fill="white">
                accent
              </text>
              <text x="340" y="35" textAnchor="middle" fontSize="10" fill="white">
                muted
              </text>
            </ColorSchemeSVG>
          </Box>

          <Divider />

          {/* Status Colors */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Status Colors
            </Typography>
            <ColorSchemeSVG width="100%" height={60}>
              <rect fill="success" x="0" y="10" width="80" height="40" />
              <rect fill="error" x="100" y="10" width="80" height="40" />
              <rect fill="warning" x="200" y="10" width="80" height="40" />
              <rect fill="info" x="300" y="10" width="80" height="40" />
              <text x="40" y="35" textAnchor="middle" fontSize="10" fill="white">
                success
              </text>
              <text x="140" y="35" textAnchor="middle" fontSize="10" fill="white">
                error
              </text>
              <text x="240" y="35" textAnchor="middle" fontSize="10" fill="white">
                warning
              </text>
              <text x="340" y="35" textAnchor="middle" fontSize="10" fill="white">
                info
              </text>
            </ColorSchemeSVG>
          </Box>

          <Divider />

          {/* Text Colors */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Text Colors
            </Typography>
            <ColorSchemeSVG width="100%" height={60}>
              <rect fill="background" width="100%" height="60" />
              <text fill="text-primary" x="50" y="25" fontSize="14" fontWeight="bold">
                text-primary
              </text>
              <text fill="text-secondary" x="50" y="45" fontSize="12">
                text-secondary
              </text>
              <text fill="text-disabled" x="250" y="35" fontSize="12">
                text-disabled
              </text>
            </ColorSchemeSVG>
          </Box>

          <Divider />

          {/* Stroke Variants */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Stroke Variants
            </Typography>
            <ColorSchemeSVG width="100%" height={60}>
              <circle stroke="primary" fill="none" cx="50" cy="30" r="20" strokeWidth="2" />
              <circle stroke="secondary" fill="none" cx="150" cy="30" r="20" strokeWidth="2" />
              <circle stroke="muted" fill="none" cx="250" cy="30" r="20" strokeWidth="2" />
              <text x="50" y="58" textAnchor="middle" fontSize="8" fill="text-secondary">
                stroke-primary
              </text>
              <text x="150" y="58" textAnchor="middle" fontSize="8" fill="text-secondary">
                stroke-secondary
              </text>
              <text x="250" y="58" textAnchor="middle" fontSize="8" fill="text-secondary">
                stroke-muted
              </text>
            </ColorSchemeSVG>
          </Box>
        </Stack>
      </Paper>

      <ColorSchemeToggle />
    </Stack>
  ),
};

export const ComplexIllustration: Story = {
  render: () => (
    <Stack spacing={3} alignItems="center">
      <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', maxWidth: 500}}>
        A more complex example showing how multiple color classes work together
      </Typography>
      <Paper elevation={2} sx={{p: 4, bgcolor: 'background.paper'}}>
        <ColorSchemeSVG width={500} height={300} viewBox="0 0 500 300">
          {/* Sky/Background */}
          <rect fill="background" width="500" height="300" />

          {/* Sun/Moon */}
          <circle fill="warning" cx="80" cy="60" r="30" />

          {/* Mountains */}
          <path fill="muted" d="M0 200 L100 120 L200 200 Z" />
          <path fill="primary" d="M150 200 L250 100 L350 200 Z" />
          <path fill="secondary" d="M300 200 L400 140 L500 200 Z" />

          {/* Ground */}
          <rect fill="success" y="200" width="500" height="100" />

          {/* Tree trunk */}
          <rect stroke="muted" fill="none" x="100" y="220" width="15" height="50" strokeWidth="2" />

          {/* Tree foliage */}
          <circle fill="accent" cx="107" cy="210" r="25" />

          {/* Building */}
          <rect fill="surface" x="350" y="180" width="60" height="70" />
          <rect fill="info" x="360" y="190" width="15" height="15" />
          <rect fill="info" x="385" y="190" width="15" height="15" />
          <rect fill="info" x="360" y="215" width="15" height="15" />
          <rect fill="info" x="385" y="215" width="15" height="15" />

          {/* Title */}
          <text fill="text-primary" x="250" y="280" textAnchor="middle" fontSize="16" fontWeight="bold">
            Theme-Aware Scene
          </text>
        </ColorSchemeSVG>
      </Paper>
      <ColorSchemeToggle />
    </Stack>
  ),
};
