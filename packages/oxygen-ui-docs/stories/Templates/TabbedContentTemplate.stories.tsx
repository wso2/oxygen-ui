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
  Card,
  CardContent,
  Grid,
  Stack,
} from '@wso2/oxygen-ui';
import React from 'react';

const meta: Meta = {
  title: 'Templates/Tabbed Content',
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
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          overflow: 'auto',
        }}
      >
        {/* Tab-like Navigation */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button variant="contained" size="small">
            Overview
          </Button>
          <Button variant="outlined" size="small">
            Performance
          </Button>
          <Button variant="outlined" size="small">
            Users
          </Button>
          <Button variant="outlined" size="small">
            Settings
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Overview Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  This section displays comprehensive analytics data for your application.
                  Switch between tabs to view different metrics and insights.
                </Typography>
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'action.hover',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Chart Visualization Area
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ),
};
