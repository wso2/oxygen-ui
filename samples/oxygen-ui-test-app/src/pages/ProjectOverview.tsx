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
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@wso2/oxygen-ui'
import { ArrowLeft, Settings, Plus, Activity, FileText, Users, Clock } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'
import { useState } from 'react'

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

export default function ProjectOverview(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState(0)

  const projectName = 'E-Commerce Platform'
  const projectDescription = 'Complete authentication and user management system for e-commerce'

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <IconButton onClick={() => navigate('/projects')}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h4">{projectName}</Typography>
          <Chip label="Active" size="small" color="success" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
          {projectDescription}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2, ml: 6 }}>
          <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => navigate(`/projects/${id}/components/new`)}>
            Add Component
          </Button>
          <Button variant="outlined" startIcon={<Settings size={18} />} onClick={() => navigate(`/projects/${id}/settings`)}>
            Settings
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FileText size={24} color="primary" />
                <Box>
                  <Typography variant="h5">{mockComponents.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Components
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Activity size={24} color="success" />
                <Box>
                  <Typography variant="h5">{mockComponents.filter((c) => c.status === 'active').length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Users size={24} color="info" />
                <Box>
                  <Typography variant="h5">3</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contributors
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Clock size={24} color="warning" />
                <Box>
                  <Typography variant="h5">2h</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Components" />
          <Tab label="Activity" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Components
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {mockComponents.map((component, index) => (
                <Box key={component.id}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
                    }}
                    onClick={() => navigate(`/projects/${id}/components/${component.id}`)}
                  >
                    <ListItemText
                      primary={component.name}
                      secondary={`${component.type} • Modified ${component.lastModified}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={component.status}
                        size="small"
                        color={component.status === 'active' ? 'success' : 'default'}
                      />
                      <Button size="small" variant="text">
                        Edit
                      </Button>
                    </Box>
                  </ListItem>
                  {index < mockComponents.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
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

      {activeTab === 2 && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Project Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body2" color="text.secondary">
              Project settings configuration coming soon...
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
