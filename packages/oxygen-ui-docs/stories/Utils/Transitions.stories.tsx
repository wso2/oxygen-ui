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

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Collapse,
  Fade,
  Grow,
  Slide,
  Zoom,
  Box,
  Button,
  Paper,
  Switch,
  FormControlLabel,
} from '@wso2/oxygen-ui';
import { Package } from '@wso2/oxygen-ui-icons-react';

/**
 * Transitions help to make a UI expressive and easy to use.
 * 
 * Read more at: https://mui.com/material-ui/transitions/
 */
const meta: Meta = {
  title: 'Utils/Transitions',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI Transitions are direct imports of MUI Transitions. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/transitions/](https://mui.com/material-ui/transitions/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Package size={48} />
    </Box>
  </Paper>
);

/**
 * Collapse transition
 */
export const CollapseTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Collapse in={checked}>{icon}</Collapse>
        </Box>
      </Box>
    );
  },
};

/**
 * Fade transition
 */
export const FadeTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Fade in={checked}>{icon}</Fade>
        </Box>
      </Box>
    );
  },
};

/**
 * Grow transition
 */
export const GrowTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Grow in={checked}>{icon}</Grow>
        </Box>
      </Box>
    );
  },
};

/**
 * Slide transition
 */
export const SlideTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            {icon}
          </Slide>
        </Box>
      </Box>
    );
  },
};

/**
 * Zoom transition
 */
export const ZoomTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Zoom in={checked}>{icon}</Zoom>
        </Box>
      </Box>
    );
  },
};

/**
 * All transitions comparison
 */
export const AllTransitions: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box sx={{ width: 600 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show All"
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Box sx={{ mb: 1 }}>Fade</Box>
            <Fade in={checked}>{icon}</Fade>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>Grow</Box>
            <Grow in={checked}>{icon}</Grow>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>Zoom</Box>
            <Zoom in={checked}>{icon}</Zoom>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>Collapse</Box>
            <Collapse in={checked}>{icon}</Collapse>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>Slide</Box>
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
              {icon}
            </Slide>
          </Box>
        </Box>
      </Box>
    );
  },
};
