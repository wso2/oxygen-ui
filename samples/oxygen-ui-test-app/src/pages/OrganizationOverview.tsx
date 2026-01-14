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
  CardActions,
  Grid,
  PageContent,
  PageTitle,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
} from '@wso2/oxygen-ui'
import { Search, Plus, MoreVertical, Folder } from '@wso2/oxygen-ui-icons-react'
import { useNavigate } from 'react-router'
import type { JSX } from 'react'
import { useState } from 'react'
import { mockProjects } from '../mock-data'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'archived' | 'draft'
  componentsCount: number
  lastUpdated: string
}

export default function OrganizationOverview(): JSX.Element {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = mockProjects.filter(project => {
    const name = project.name.toLowerCase()
    const desc = (project.description ?? '').toLowerCase()
    const q = searchQuery.toLowerCase()

    return name.includes(q) || desc.includes(q)
  })

  const getStatusColor = (status?: Project['status']) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'draft':
        return 'warning'
      case 'archived':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <PageContent>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle>
            <PageTitle.Header>Projects</PageTitle.Header>
            <PageTitle.SubHeader>Manage your authentication projects and flows</PageTitle.SubHeader>
          </PageTitle>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => navigate('/projects/new')}
        >
          New Project
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search projects..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Folder size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Typography variant="h6" gutterBottom>
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchQuery ? 'Try adjusting your search' : 'Create your first project to get started'}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => navigate('/projects/new')}
            >
              Create Project
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map(project => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <Card
                variant="outlined"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" component="div">
                      {project.name}
                    </Typography>
                    <IconButton size="small">
                      <MoreVertical size={18} />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {project.description ?? 'No description'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={project.status}
                      size="small"
                      color={getStatusColor(project.status)}
                    />
                    <Chip
                      label={`${project.componentsCount} components`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Updated {project.lastUpdated}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/projects/${project.id}`)}>
                    View Details
                  </Button>
                  <Button size="small" variant="text">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContent>
  )
}
