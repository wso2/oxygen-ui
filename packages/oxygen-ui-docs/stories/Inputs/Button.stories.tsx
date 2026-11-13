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
import { Button, Stack, CircularProgress, useTheme } from '@wso2/oxygen-ui';
import { ArrowRight, Download, Plus, Trash2 } from '@wso2/oxygen-ui-icons-react';
import React from 'react';

/**
 * The Button component triggers user actions such as submitting a form, opening a dialog, or performing navigation.
 * It supports different variants, colors, and sizes to suit various use cases and design contexts.
 * 
 * This is a direct import of MUI button component. 
 * Read more at: https://mui.com/material-ui/react-button/
 */
const meta = {
  component: Button,
  title: 'Inputs/Button',
  tags: ['autodocs'],
  parameters: {
    a11y: {
      // Known WCAG AA exception: the brand primary color (#FF7300) does not
      // meet the 4.5:1 text-contrast requirement in the default themes.
      // Tracked in https://github.com/wso2/oxygen-ui/issues/558 — remove
      // this override once the palette decision lands.
      options: {
        rules: { 'color-contrast': { enabled: false } },
      },
    },
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI button component is a direct import of MUI button component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-button/](https://mui.com/material-ui/react-button/)',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variations – variant, color, size
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="subtle">Subtle</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The `subtle` variant is styled by the default theme only: an Action orange fill with a white label.',
      },
    },
  },
};

const colors = ['primary', 'secondary', 'accent', 'error', 'success'] as const;
const colorVariants = ['contained', 'outlined', 'text'] as const;
const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const ColorVariants: Story = {
  render: () => (
    <Stack direction="column" spacing={2}>
      {colorVariants.map((variant) => (
        <Stack key={variant} direction="row" spacing={2}>
          {colors.map((color) => (
            <Button key={color} variant={variant} color={color}>
              {capitalize(color)} {capitalize(variant)}
            </Button>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Every variant in each color. The `accent` color is defined by the default theme only. ' +
          'Use `error` for destructive actions such as delete; `success` is shown for completeness.',
      },
    },
  },
};

// Icon sizes that sit well with each button size's label
const iconSize = { small: 16, medium: 18, large: 20 } as const;

export const WithIcons: Story = {
  render: () => (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" startIcon={<Plus size={iconSize.medium} />}>Create project</Button>
        <Button variant="contained" endIcon={<ArrowRight size={iconSize.medium} />}>Talk to us</Button>
        <Button variant="outlined" startIcon={<Download size={iconSize.medium} />}>Download</Button>
        <Button variant="outlined" color="secondary" endIcon={<ArrowRight size={iconSize.medium} />}>All reports</Button>
        <Button variant="outlined" color="error" startIcon={<Trash2 size={iconSize.medium} />}>Delete</Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="text" startIcon={<Plus size={iconSize.medium} />}>Add member</Button>
        <Button variant="text" endIcon={<ArrowRight size={iconSize.medium} />}>Learn more</Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Button key={size} variant="contained" size={size} startIcon={<Plus size={iconSize[size]} />}>
            Create project
          </Button>
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pass an icon from `@wso2/oxygen-ui-icons-react` as `startIcon` or `endIcon`, and set its `size` to match the button: ' +
          '16 for small, 18 for medium and 20 for large. Use a trailing arrow for actions that move the user forward. ' +
          'For a button with only an icon, use `IconButton` with an `aria-label`.',
      },
    },
  },
};

export const SizeVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" size="small">Small</Button>
      <Button variant="contained" size="medium">Medium</Button>
      <Button variant="contained" size="large">Large</Button>
    </Stack>
  ),
};

export const States: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <Stack direction="column" spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained">Default</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button
            variant="contained"
            startIcon={<CircularProgress color="inherit" size={16} />}
            disabled
          >
            Loading
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined">Default</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button
            variant="outlined"
            startIcon={<CircularProgress color="inherit" size={16} />}
            disabled
          >
            Loading
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="text">Default</Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
          <Button
            variant="text"
            startIcon={<CircularProgress color="inherit" size={16} />}
            disabled
          >
            Loading
          </Button>
        </Stack>
      </Stack>
    );
  },
};
