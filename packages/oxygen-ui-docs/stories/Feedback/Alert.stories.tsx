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
import { Alert, AlertTitle, Stack, Button } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Alert component displays important messages to the user.
 * It supports different severity levels and can include actions.
 * 
 * This is a direct import of MUI alert component. 
 * Read more at: https://mui.com/material-ui/react-alert/
 */
const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI alert component is a direct import of MUI alert component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-alert/](https://mui.com/material-ui/react-alert/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Severities: Story = {
  render: () => (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success" variant="filled">
        This is a filled success alert.
      </Alert>
      <Alert severity="info" variant="outlined">
        This is an outlined info alert.
      </Alert>
      <Alert severity="warning" variant="standard">
        This is a standard warning alert.
      </Alert>
    </Stack>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert with a title — check it out!
      </Alert>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert with a title — check it out!
      </Alert>
    </Stack>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert 
        severity="warning"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a warning alert with an action button.
      </Alert>
      <Alert 
        severity="info"
        onClose={() => alert('Close clicked!')}
      >
        This is an info alert with a close button.
      </Alert>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" color="error">Error severity</Alert>
      <Alert severity="warning" color="warning">Warning severity</Alert>
      <Alert severity="info" color="info">Info severity</Alert>
      <Alert severity="success" color="success">Success severity</Alert>
    </Stack>
  ),
};
