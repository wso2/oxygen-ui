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
import { ToggleButton, ToggleButtonGroup, Stack } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Toggle Button component allows users to toggle between different states or options.
 * It can be used individually or grouped together for multiple selections.
 * 
 * This is a direct import of MUI toggle button component. 
 * Read more at: https://mui.com/material-ui/react-toggle-button/
 */
const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Inputs/Toggle Button',
  component: ToggleButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI toggle button component is a direct import of MUI toggle button component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-toggle-button/](https://mui.com/material-ui/react-toggle-button/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

export const Default: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');
    return (
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={(e, newAlignment) => setAlignment(newAlignment)}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
        <ToggleButton value="justify">Justify</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [formats, setFormats] = useState<string[]>(['bold']);
    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
      setFormats(newFormats);
    };
    return (
      <ToggleButtonGroup value={formats} onChange={handleFormat}>
        <ToggleButton value="bold">Bold</ToggleButton>
        <ToggleButton value="italic">Italic</ToggleButton>
        <ToggleButton value="underlined">Underlined</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');
    return (
      <Stack spacing={2}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          color="primary"
          onChange={(e, newAlignment) => setAlignment(newAlignment)}
        >
          <ToggleButton value="left">Primary</ToggleButton>
          <ToggleButton value="center">Primary</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          color="secondary"
          onChange={(e, newAlignment) => setAlignment(newAlignment)}
        >
          <ToggleButton value="left">Secondary</ToggleButton>
          <ToggleButton value="center">Secondary</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          color="success"
          onChange={(e, newAlignment) => setAlignment(newAlignment)}
        >
          <ToggleButton value="left">Success</ToggleButton>
          <ToggleButton value="center">Success</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');
    return (
      <Stack spacing={2} alignItems="flex-start">
        <ToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={(e, newAlignment) => setAlignment(newAlignment)}
        >
          <ToggleButton value="left">Small</ToggleButton>
          <ToggleButton value="center">Small</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="medium"
          value={alignment}
          exclusive
          onChange={(e, newAlignment) => setAlignment(newAlignment)}
        >
          <ToggleButton value="left">Medium</ToggleButton>
          <ToggleButton value="center">Medium</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="large"
          value={alignment}
          exclusive
          onChange={(e, newAlignment) => setAlignment(newAlignment)}
        >
          <ToggleButton value="left">Large</ToggleButton>
          <ToggleButton value="center">Large</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');
    return (
      <ToggleButtonGroup
        orientation="vertical"
        value={alignment}
        exclusive
        onChange={(e, newAlignment) => setAlignment(newAlignment)}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <ToggleButtonGroup disabled value="left" exclusive>
      <ToggleButton value="left">Disabled</ToggleButton>
      <ToggleButton value="center">Disabled</ToggleButton>
      <ToggleButton value="right">Disabled</ToggleButton>
    </ToggleButtonGroup>
  ),
};
