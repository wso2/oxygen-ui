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
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Box, Backdrop } from '@wso2/oxygen-ui';
import { Copy, Save, Printer, Share, Zap } from '@wso2/oxygen-ui-icons-react';

/**
 * Speed Dial displays a floating action button that reveals related actions.
 * 
 * Read more at: https://mui.com/material-ui/react-speed-dial/
 */
const meta: Meta<typeof SpeedDial> = {
  title: 'Navigation/Speed Dial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI Speed Dial is a direct import of MUI Speed Dial. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-speed-dial/](https://mui.com/material-ui/react-speed-dial/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpeedDial>;

const actions = [
  { icon: <Copy />, name: 'Copy' },
  { icon: <Save />, name: 'Save' },
  { icon: <Printer />, name: 'Print' },
  { icon: <Share />, name: 'Share' },
];

/**
 * Basic speed dial
 */
export const Basic: Story = {
  render: () => (
    <Box sx={{ height: 320, position: 'relative', width: 320 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  ),
};

/**
 * Speed dial with custom icon
 */
export const CustomIcon: Story = {
  render: () => (
    <Box sx={{ height: 320, position: 'relative', width: 320 }}>
      <SpeedDial
        ariaLabel="SpeedDial custom icon"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<Zap />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  ),
};

/**
 * Speed dial with different directions
 */
export const Directions: Story = {
  render: () => (
    <Box sx={{ height: 380, position: 'relative', width: 600 }}>
      <SpeedDial
        ariaLabel="SpeedDial up"
        sx={{ position: 'absolute', bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <SpeedDial
        ariaLabel="SpeedDial right"
        sx={{ position: 'absolute', bottom: 16, left: 200 }}
        icon={<SpeedDialIcon />}
        direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <SpeedDial
        ariaLabel="SpeedDial down"
        sx={{ position: 'absolute', top: 16, right: 200 }}
        icon={<SpeedDialIcon />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <SpeedDial
        ariaLabel="SpeedDial left"
        sx={{ position: 'absolute', top: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  ),
};

/**
 * Speed dial with controlled open state
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box sx={{ height: 320, position: 'relative', width: 320 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial controlled"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setOpen(false)}
            />
          ))}
        </SpeedDial>
      </Box>
    );
  },
};

/**
 * Speed dial with tooltip placement
 */
export const TooltipPlacement: Story = {
  render: () => (
    <Box sx={{ height: 320, position: 'relative', width: 320 }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Box>
  ),
};
