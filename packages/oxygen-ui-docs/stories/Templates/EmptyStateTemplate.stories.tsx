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

import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@wso2/oxygen-ui';
import React from 'react';

const meta: Meta = {
  title: 'Templates/Empty State',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Projects</Typography>
          <Button variant="contained" color="primary">
            New Project
          </Button>
        </Stack>
      </Box>

      {/* Empty State */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Stack spacing={3} alignItems="center" sx={{ maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h5">No projects yet</Typography>
          <Typography variant="body1" color="text.secondary">
            Get started by creating your first project. Projects help you organize and manage your work effectively.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Create Your First Project
          </Button>
        </Stack>
      </Box>
    </Box>
  ),
};
