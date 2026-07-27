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
import { Backdrop, Button, CircularProgress } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Backdrop component provides emphasis on a particular element or parts of it.
 * It signals a state change within the application and can be used for creating loaders, dialogs, and more.
 * 
 * This is a direct import of MUI backdrop component. 
 * Read more at: https://mui.com/material-ui/react-backdrop/
 */
const meta: Meta<typeof Backdrop> = {
  title: 'Feedback/Backdrop',
  component: Backdrop,
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
        component: 'Oxygen UI backdrop component is a direct import of MUI backdrop component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-backdrop/](https://mui.com/material-ui/react-backdrop/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, flexDirection: 'column', gap: 2 }}
        >
          <CircularProgress color="inherit" />
          <div>Loading...</div>
        </Backdrop>
      </>
    );
  },
};

export const Invisible: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Invisible Backdrop</Button>
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          invisible
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
      </>
    );
  },
};
