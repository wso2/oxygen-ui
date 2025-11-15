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
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@wso2/oxygen-ui';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI dialog component is a direct import of MUI dialog component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-dialog/](https://mui.com/material-ui/react-dialog/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a basic dialog with a title, content, and actions.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

export const Alert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Open Alert Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Delete Item?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

export const FullScreen: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Full Screen Dialog
        </Button>
        <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Full Screen Dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This dialog takes up the full screen on all devices.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

export const MaxWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Large Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Large Dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This dialog has a maximum width set to medium (md) and full width enabled.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};

export const ScrollablePaper: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Scrollable Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} scroll="paper">
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              {[...Array(50)].map((_, index) => (
                <p key={index}>
                  This is line {index + 1} of scrollable content inside the dialog.
                </p>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};
