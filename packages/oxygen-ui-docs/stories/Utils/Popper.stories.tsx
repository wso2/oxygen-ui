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
import { Popper, Button, Box, Fade, Paper, Typography } from '@wso2/oxygen-ui';

/**
 * Popper is a utility component for positioning content relative to an anchor element.
 * 
 * Read more at: https://mui.com/material-ui/react-popper/
 */
const meta: Meta<typeof Popper> = {
  title: 'Utils/Popper',
  component: Popper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI Popper is a direct import of MUI Popper. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-popper/](https://mui.com/material-ui/react-popper/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popper>;

/**
 * Basic popper
 */
export const Basic: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Toggle Popper
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            The content of the Popper.
          </Box>
        </Popper>
      </div>
    );
  },
};

/**
 * Popper with transitions
 */
export const WithTransitions: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((previousOpen) => !previousOpen);
    };

    const id = open ? 'transitions-popper' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Toggle Popper
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ p: 2 }}>
                <Typography>The content of the Popper with fade transition.</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  },
};

/**
 * Popper with different placements
 */
export const Placement: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');

    const handleClick = (newPlacement: 'top' | 'bottom' | 'left' | 'right') => (
      event: React.MouseEvent<HTMLElement>,
    ) => {
      setAnchorEl(event.currentTarget);
      setPlacement(newPlacement);
    };

    const open = Boolean(anchorEl);

    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button onClick={handleClick('top')}>Top</Button>
        <Button onClick={handleClick('bottom')}>Bottom</Button>
        <Button onClick={handleClick('left')}>Left</Button>
        <Button onClick={handleClick('right')}>Right</Button>
        <Popper open={open} anchorEl={anchorEl} placement={placement}>
          <Paper sx={{ p: 1 }}>Popper content - {placement}</Paper>
        </Popper>
      </Box>
    );
  },
};

/**
 * Popper with arrow
 */
export const WithArrow: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'arrow-popper' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Toggle Popper
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="top"
          modifiers={[
            {
              name: 'arrow',
              enabled: true,
              options: {
                element: arrowRef,
              },
            },
          ]}
        >
          <Box
            sx={{
              position: 'relative',
              mt: '10px',
              '&::before': {
                backgroundColor: 'background.paper',
                content: '""',
                display: 'block',
                position: 'absolute',
                width: 12,
                height: 12,
                bottom: -6,
                transform: 'rotate(45deg)',
                left: 'calc(50% - 6px)',
              },
            }}
          >
            <Paper sx={{ p: 2 }}>
              <Typography>Popper with arrow</Typography>
            </Paper>
            <span ref={setArrowRef} />
          </Box>
        </Popper>
      </div>
    );
  },
};

/**
 * Positioned popper
 */
export const Positioned: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
      <Box sx={{ width: 500 }}>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <Paper sx={{ p: 2, maxWidth: 300 }}>
            <Typography>
              This popper is positioned at the bottom-start of the button.
            </Typography>
          </Paper>
        </Popper>
        <Button variant="contained" onClick={handleClick}>
          Bottom Start Popper
        </Button>
      </Box>
    );
  },
};
