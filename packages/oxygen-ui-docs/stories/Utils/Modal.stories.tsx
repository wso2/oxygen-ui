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
import { Modal, Box, Button, Typography } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.
 * It renders its children node in front of a backdrop component.
 * 
 * This is a direct import of MUI modal component. 
 * Read more at: https://mui.com/material-ui/react-modal/
 */
const meta: Meta<typeof Modal> = {
  title: 'Utils/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI modal component is a direct import of MUI modal component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-modal/](https://mui.com/material-ui/react-modal/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Modal Title
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              This is a basic modal with some content.
            </Typography>
          </Box>
        </Modal>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Confirm Action
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Are you sure you want to proceed with this action?
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  },
};

export const Nested: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [childOpen, setChildOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="parent-modal-title"
        >
          <Box sx={modalStyle}>
            <Typography id="parent-modal-title" variant="h6" component="h2">
              Parent Modal
            </Typography>
            <Typography sx={{ mt: 2 }}>
              This is the parent modal content.
            </Typography>
            <Button onClick={() => setChildOpen(true)} sx={{ mt: 2 }}>
              Open Child Modal
            </Button>
            <Modal
              open={childOpen}
              onClose={() => setChildOpen(false)}
              aria-labelledby="child-modal-title"
            >
              <Box sx={{ ...modalStyle, width: 300 }}>
                <Typography id="child-modal-title" variant="h6" component="h2">
                  Child Modal
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  This is a nested modal.
                </Typography>
                <Button onClick={() => setChildOpen(false)} sx={{ mt: 2 }}>
                  Close
                </Button>
              </Box>
            </Modal>
          </Box>
        </Modal>
      </>
    );
  },
};
