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
import { Popover, Button, Typography, Box } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * A Popover can be used to display some content on top of another.
 * It's an alternative to inline modals or in-place messages.
 * 
 * This is a direct import of MUI popover component. 
 * Read more at: https://mui.com/material-ui/react-popover/
 */
const meta: Meta<typeof Popover> = {
  title: 'Utils/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI popover component is a direct import of MUI popover component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-popover/](https://mui.com/material-ui/react-popover/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <>
        <Button onClick={handleClick}>Open Popover</Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography>The content of the Popover.</Typography>
          </Box>
        </Popover>
      </>
    );
  },
};

export const AnchorOrigin: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [origin, setOrigin] = useState<{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }>({
      vertical: 'bottom',
      horizontal: 'left',
    });

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      vert: 'top' | 'bottom',
      horiz: 'left' | 'right'
    ) => {
      setAnchorEl(event.currentTarget);
      setOrigin({ vertical: vert, horizontal: horiz });
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button onClick={(e) => handleClick(e, 'top', 'left')}>Top-Left</Button>
        <Button onClick={(e) => handleClick(e, 'top', 'right')}>Top-Right</Button>
        <Button onClick={(e) => handleClick(e, 'bottom', 'left')}>Bottom-Left</Button>
        <Button onClick={(e) => handleClick(e, 'bottom', 'right')}>Bottom-Right</Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={origin}
        >
          <Box sx={{ p: 2 }}>
            <Typography>Popover content</Typography>
          </Box>
        </Popover>
      </Box>
    );
  },
};

export const MouseOver: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          Hover with a Popover.
        </Typography>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box sx={{ p: 1 }}>
            <Typography>I use Popover.</Typography>
          </Box>
        </Popover>
      </>
    );
  },
};
