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
import { useMediaQuery, useTheme, Typography, Box } from '@wso2/oxygen-ui';

/**
 * useMediaQuery is a CSS media query hook for React.
 * 
 * Read more at: https://mui.com/material-ui/react-use-media-query/
 */
const meta: Meta = {
  title: 'Utils/useMediaQuery',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI useMediaQuery is a direct import of MUI useMediaQuery hook. This hook listens for matches to a CSS media query and returns true or false based on whether the query matches. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-use-media-query/](https://mui.com/material-ui/react-use-media-query/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Basic media query
 */
export const Basic: Story = {
  render: () => {
    const matches = useMediaQuery('(min-width:600px)');

    return (
      <Box sx={{ p: 2 }}>
        <Typography>
          {matches ? 'Screen is 600px or wider' : 'Screen is narrower than 600px'}
        </Typography>
      </Box>
    );
  },
};

/**
 * Using theme breakpoints
 */
export const WithTheme: Story = {
  render: () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.up('xs'));
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
    const matchesXL = useMediaQuery(theme.breakpoints.up('xl'));

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Breakpoint Matches:
        </Typography>
        <Typography>XS (0px+): {matchesXS ? '✅' : '❌'}</Typography>
        <Typography>SM (600px+): {matchesSM ? '✅' : '❌'}</Typography>
        <Typography>MD (900px+): {matchesMD ? '✅' : '❌'}</Typography>
        <Typography>LG (1200px+): {matchesLG ? '✅' : '❌'}</Typography>
        <Typography>XL (1536px+): {matchesXL ? '✅' : '❌'}</Typography>
      </Box>
    );
  },
};

/**
 * Responsive design example
 */
export const ResponsiveDesign: Story = {
  render: () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
      <Box sx={{ p: 2, minWidth: 300 }}>
        <Typography variant="h6" gutterBottom>
          Device Type Detection
        </Typography>
        {isMobile && <Typography>📱 Mobile View (0-600px)</Typography>}
        {isTablet && <Typography>📱 Tablet View (600-900px)</Typography>}
        {isDesktop && <Typography>🖥️ Desktop View (900px+)</Typography>}
      </Box>
    );
  },
};

/**
 * Orientation detection
 */
export const Orientation: Story = {
  render: () => {
    const isPortrait = useMediaQuery('(orientation: portrait)');
    const isLandscape = useMediaQuery('(orientation: landscape)');

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Screen Orientation
        </Typography>
        {isPortrait && <Typography>📱 Portrait Mode</Typography>}
        {isLandscape && <Typography>🖥️ Landscape Mode</Typography>}
      </Box>
    );
  },
};

/**
 * Dark mode preference detection
 */
export const PrefersDarkMode: Story = {
  render: () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Color Scheme Preference
        </Typography>
        {prefersDarkMode && <Typography>🌙 Prefers Dark Mode</Typography>}
        {prefersLightMode && <Typography>☀️ Prefers Light Mode</Typography>}
      </Box>
    );
  },
};

/**
 * Custom media queries
 */
export const CustomQueries: Story = {
  render: () => {
    const isRetina = useMediaQuery('(min-resolution: 2dppx)');
    const isPrint = useMediaQuery('print');
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Advanced Media Queries
        </Typography>
        <Typography>Retina Display: {isRetina ? '✅' : '❌'}</Typography>
        <Typography>Print Mode: {isPrint ? '✅' : '❌'}</Typography>
        <Typography>Prefers Reduced Motion: {prefersReducedMotion ? '✅' : '❌'}</Typography>
      </Box>
    );
  },
};
