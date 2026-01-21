/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  PageContent,
  PageTitle,
  StatCard,
  Charts,
} from '@wso2/oxygen-ui'
import { Activity, FileText, Users, Clock, Logs } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import { useState, type JSX } from 'react'

interface Component {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive'
  lastModified: string
}

const mockComponents: Component[] = [
  { id: '1', name: 'Login Flow', type: 'Authentication', status: 'active', lastModified: '2 hours ago' },
  { id: '2', name: 'Sign Up Flow', type: 'Registration', status: 'active', lastModified: '1 day ago' },
  { id: '3', name: 'Password Reset', type: 'Recovery', status: 'active', lastModified: '3 days ago' },
  { id: '4', name: 'MFA Configuration', type: 'Security', status: 'inactive', lastModified: '1 week ago' },
]

const mockActivity = [
  { id: '1', action: 'Updated Login Flow component', user: 'John Doe', timestamp: '2 hours ago' },
  { id: '2', action: 'Created new Sign Up Flow', user: 'Jane Smith', timestamp: '1 day ago' },
  { id: '3', action: 'Modified MFA settings', user: 'John Doe', timestamp: '2 days ago' },
  { id: '4', action: 'Added Password Reset flow', user: 'Mike Johnson', timestamp: '3 days ago' },
]

export default function AnalyticsOverview(): JSX.Element {
  const navigate = useNavigate()
  const { orgId } = useParams<{ orgId: string }>()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <PageContent>
      {/* Header */}
      <PageTitle>
        <PageTitle.Header>Analytics <Chip label="Active" size="small" color="success" /></PageTitle.Header>
        <PageTitle.SubHeader>Overview of activities</PageTitle.SubHeader>
        <PageTitle.Actions>
          <Button variant="outlined" startIcon={<Logs size={18} />} onClick={() => navigate(`/o/${orgId}/analytics/logs`)}>
            View logs
          </Button>
        </PageTitle.Actions>
      </PageTitle>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <StatCard
            value={mockComponents.length}
            label="Components"
            icon={<FileText size={24} />}
            iconColor="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <StatCard
            value={mockComponents.filter((c) => c.status === 'active').length}
            label="Active"
            icon={<Activity size={24} />}
            iconColor="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <StatCard
            value="3"
            label="Contributors"
            icon={<Users size={24} />}
            iconColor="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <StatCard
            value="2h"
            label="Last Updated"
            icon={<Clock size={24} />}
            iconColor="warning"
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Charts" />
          <Tab label="Activity" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  User Growth
                </Typography>
                <Charts.LineChart
                  dataset={[
                    { month: 'Jan', users: 120 },
                    { month: 'Feb', users: 180 },
                    { month: 'Mar', users: 240 },
                    { month: 'Apr', users: 320 },
                    { month: 'May', users: 420 },
                    { month: 'Jun', users: 580 },
                  ]}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[{ dataKey: 'users', label: 'Users' }]}
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Component Status
                </Typography>
                <Charts.BarChart
                  dataset={[
                    { status: 'Active', count: 3 },
                    { status: 'Inactive', count: 1 },
                    { status: 'Pending', count: 2 },
                  ]}
                  xAxis={[{ scaleType: 'band', dataKey: 'status' }]}
                  series={[{ dataKey: 'count', label: 'Count' }]}
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Traffic Distribution
                </Typography>
                <Charts.PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 45, label: 'Direct' },
                        { id: 1, value: 30, label: 'Organic' },
                        { id: 2, value: 15, label: 'Social' },
                        { id: 3, value: 10, label: 'Referral' },
                      ],
                    },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Monthly Revenue
                </Typography>
                <Charts.BarChart
                  dataset={[
                    { month: 'Jan', revenue: 4500 },
                    { month: 'Feb', revenue: 5200 },
                    { month: 'Mar', revenue: 6100 },
                    { month: 'Apr', revenue: 7300 },
                    { month: 'May', revenue: 8400 },
                    { month: 'Jun', revenue: 9800 },
                  ]}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[{ dataKey: 'revenue', label: 'Revenue ($)' }]}
                  height={300}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {mockActivity.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.user} • ${activity.timestamp}`}
                    />
                  </ListItem>
                  {index < mockActivity.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </PageContent>
  )
}
