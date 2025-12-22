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
  Divider,
} from '@wso2/oxygen-ui';
import React from 'react';

const meta: Meta = {
  title: 'Templates/Dashboard',
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
          <Typography variant="h4">Dashboard</Typography>
          <Button variant="contained" color="primary">
            New Item
          </Button>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          overflow: 'auto',
        }}
      >
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h4">2,543</Typography>
                <Typography variant="caption" color="success.main">
                  +12.5% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Active Sessions
                </Typography>
                <Typography variant="h4">1,823</Typography>
                <Typography variant="caption" color="success.main">
                  +8.2% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h4">$45.2K</Typography>
                <Typography variant="caption" color="error.main">
                  -3.1% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Conversion Rate
                </Typography>
                <Typography variant="h4">3.24%</Typography>
                <Typography variant="caption" color="success.main">
                  +0.8% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Recent Activity
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                
                <Stack spacing={2}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Box key={item}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body1">User Action {item}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item} hour{item > 1 ? 's' : ''} ago
                          </Typography>
                        </Box>
                        <Button size="small" variant="outlined">
                          View
                        </Button>
                      </Stack>
                      {item < 5 && <Divider sx={{ marginTop: 2 }} />}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                
                <Stack spacing={2}>
                  <Button fullWidth variant="outlined">
                    Create New User
                  </Button>
                  <Button fullWidth variant="outlined">
                    Export Data
                  </Button>
                  <Button fullWidth variant="outlined">
                    View Reports
                  </Button>
                  <Button fullWidth variant="outlined">
                    Settings
                  </Button>
                </Stack>

                <Divider sx={{ marginY: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Recent Notifications
                </Typography>
                <Stack spacing={1.5} sx={{ marginTop: 2 }}>
                  {[1, 2, 3].map((item) => (
                    <Box key={item}>
                      <Typography variant="body2">
                        Notification message {item}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item * 5} minutes ago
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ),
};
