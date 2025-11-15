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
import { Snackbar, Button, Alert } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Snackbar component provides brief messages about app processes.
 * It appears temporarily at the bottom of the screen.
 * 
 * This is a direct import of MUI snackbar component. 
 * Read more at: https://mui.com/material-ui/react-snackbar/
 */
const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI snackbar component is a direct import of MUI snackbar component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-snackbar/](https://mui.com/material-ui/react-snackbar/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Snackbar</Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="This is a snackbar message"
        />
      </>
    );
  },
};

export const WithAlert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained">
          Show Success Snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    return (
      <>
        <Button onClick={() => setOpen('top-left')} sx={{ m: 1 }}>Top Left</Button>
        <Button onClick={() => setOpen('top-center')} sx={{ m: 1 }}>Top Center</Button>
        <Button onClick={() => setOpen('top-right')} sx={{ m: 1 }}>Top Right</Button>
        <Button onClick={() => setOpen('bottom-left')} sx={{ m: 1 }}>Bottom Left</Button>
        <Button onClick={() => setOpen('bottom-center')} sx={{ m: 1 }}>Bottom Center</Button>
        <Button onClick={() => setOpen('bottom-right')} sx={{ m: 1 }}>Bottom Right</Button>
        
        <Snackbar
          open={open === 'top-left'}
          autoHideDuration={2000}
          onClose={() => setOpen(null)}
          message="Top Left"
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        />
        <Snackbar
          open={open === 'top-center'}
          autoHideDuration={2000}
          onClose={() => setOpen(null)}
          message="Top Center"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <Snackbar
          open={open === 'top-right'}
          autoHideDuration={2000}
          onClose={() => setOpen(null)}
          message="Top Right"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
        <Snackbar
          open={open === 'bottom-left'}
          autoHideDuration={2000}
          onClose={() => setOpen(null)}
          message="Bottom Left"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
        <Snackbar
          open={open === 'bottom-center'}
          autoHideDuration={2000}
          onClose={() => setOpen(null)}
          message="Bottom Center"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
        <Snackbar
          open={open === 'bottom-right'}
          autoHideDuration={2000}
          onClose={() => setOpen(null)}
          message="Bottom Right"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const action = (
      <Button color="secondary" size="small" onClick={() => setOpen(false)}>
        UNDO
      </Button>
    );
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained">
          Show Snackbar with Action
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          message="Item deleted"
          action={action}
        />
      </>
    );
  },
};
