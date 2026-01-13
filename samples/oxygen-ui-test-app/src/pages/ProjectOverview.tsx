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
  ListingTable,
} from '@wso2/oxygen-ui'
import {
  ArrowLeft,
  Settings,
  Plus,
  Activity,
  FileText,
  Users,
  Clock,
  Key,
  Shield,
  RefreshCw,
  Lock,
  Edit,
  ChevronRight,
} from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'
import { useState, useMemo } from 'react'

interface Component {
  id: string
  name: string
  type: 'Authentication' | 'Authorization' | 'Registration' | 'Recovery' | 'Security'
  status: 'active' | 'inactive'
  lastModified: string
}

const mockComponents: Component[] = [
  {
    id: '1',
    name: 'Basic Login Flow',
    type: 'Authentication',
    status: 'active',
    lastModified: '2 hours ago',
  },
  {
    id: '2',
    name: 'Social Sign Up',
    type: 'Registration',
    status: 'active',
    lastModified: '1 day ago',
  },
  {
    id: '3',
    name: 'Password Reset',
    type: 'Recovery',
    status: 'active',
    lastModified: '3 days ago',
  },
  { id: '4', name: 'MFA Setup', type: 'Security', status: 'inactive', lastModified: '1 week ago' },
  {
    id: '5',
    name: 'OAuth Integration',
    type: 'Authorization',
    status: 'active',
    lastModified: '5 days ago',
  },
  {
    id: '6',
    name: 'SAML SSO',
    type: 'Authentication',
    status: 'active',
    lastModified: '4 days ago',
  },
  {
    id: '7',
    name: 'Email Verification',
    type: 'Registration',
    status: 'active',
    lastModified: '5 days ago',
  },
  {
    id: '8',
    name: 'Account Lockout',
    type: 'Security',
    status: 'active',
    lastModified: '6 days ago',
  },
  {
    id: '9',
    name: 'Session Management',
    type: 'Authorization',
    status: 'active',
    lastModified: '1 week ago',
  },
  {
    id: '10',
    name: 'Magic Link Login',
    type: 'Authentication',
    status: 'inactive',
    lastModified: '2 weeks ago',
  },
  {
    id: '11',
    name: 'Biometric Auth',
    type: 'Security',
    status: 'inactive',
    lastModified: '3 weeks ago',
  },
  {
    id: '12',
    name: 'API Key Management',
    type: 'Authorization',
    status: 'active',
    lastModified: '4 days ago',
  },
]

const getTypeIcon = (type: Component['type']) => {
  switch (type) {
    case 'Authentication':
      return <Key size={18} />
    case 'Authorization':
      return <Shield size={18} />
    case 'Registration':
      return <FileText size={18} />
    case 'Recovery':
      return <RefreshCw size={18} />
    case 'Security':
      return <Lock size={18} />
    default:
      return <FileText size={18} />
  }
}

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
  const [sortField, setSortField] = useState<keyof Component>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const projectName = 'E-Commerce Platform'
  const projectDescription = 'Complete authentication and user management system for e-commerce'

  const handleSort = (field: keyof Component) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedComponents = useMemo(() => {
    return [...mockComponents].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      const comparison = String(aVal).localeCompare(String(bVal))
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [sortField, sortDirection])

  const displayedComponents = sortedComponents.slice(0, 4)

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
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => navigate(`/projects/${id}/components/new`)}
          >
            Add Component
          </Button>
          <Button variant="outlined" onClick={() => navigate(`/projects/${id}/components`)}>
            Manage Components
          </Button>
          <Button
            variant="outlined"
            startIcon={<Settings size={18} />}
            onClick={() => navigate(`/projects/${id}/settings`)}
          >
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
                  <Typography variant="h5">
                    {mockComponents.filter(c => c.status === 'active').length}
                  </Typography>
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
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <ListingTable.Container>
              <ListingTable density="compact">
                <ListingTable.Head>
                  <ListingTable.Row>
                    <ListingTable.Cell>
                      <ListingTable.SortLabel
                        active={sortField === 'name'}
                        direction={sortField === 'name' ? sortDirection : 'asc'}
                        onClick={() => handleSort('name')}
                      >
                        Name
                      </ListingTable.SortLabel>
                    </ListingTable.Cell>
                    <ListingTable.Cell>Type</ListingTable.Cell>
                    <ListingTable.Cell>
                      <ListingTable.SortLabel
                        active={sortField === 'status'}
                        direction={sortField === 'status' ? sortDirection : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </ListingTable.SortLabel>
                    </ListingTable.Cell>
                    <ListingTable.Cell>
                      <ListingTable.SortLabel
                        active={sortField === 'lastModified'}
                        direction={sortField === 'lastModified' ? sortDirection : 'asc'}
                        onClick={() => handleSort('lastModified')}
                      >
                        Last Modified
                      </ListingTable.SortLabel>
                    </ListingTable.Cell>
                    <ListingTable.Cell align="right">Actions</ListingTable.Cell>
                  </ListingTable.Row>
                </ListingTable.Head>
                <ListingTable.Body>
                  {displayedComponents.map(component => (
                    <ListingTable.Row
                      key={component.id}
                      hover
                      clickable
                      onClick={() => navigate(`/projects/${id}/components/${component.id}`)}
                    >
                      <ListingTable.Cell>
                        <ListingTable.CellIcon
                          icon={getTypeIcon(component.type)}
                          primary={component.name}
                        />
                      </ListingTable.Cell>
                      <ListingTable.Cell>
                        <Chip label={component.type} size="small" variant="outlined" />
                      </ListingTable.Cell>
                      <ListingTable.Cell>
                        <Chip
                          label={component.status}
                          size="small"
                          color={component.status === 'active' ? 'success' : 'default'}
                        />
                      </ListingTable.Cell>
                      <ListingTable.Cell>{component.lastModified}</ListingTable.Cell>
                      <ListingTable.Cell align="right">
                        <ListingTable.RowActions visibility="hover">
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.stopPropagation()
                              navigate(`/projects/${id}/components/${component.id}/edit`)
                            }}
                          >
                            <Edit size={16} />
                          </IconButton>
                        </ListingTable.RowActions>
                      </ListingTable.Cell>
                    </ListingTable.Row>
                  ))}
                </ListingTable.Body>
              </ListingTable>
            </ListingTable.Container>
            {mockComponents.length > 4 && (
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'right' }}>
                <Button
                  size="small"
                  endIcon={<ChevronRight size={16} />}
                  onClick={() => navigate(`/projects/${id}/components`)}
                >
                  View All Components ({mockComponents.length})
                </Button>
              </Box>
            )}
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
