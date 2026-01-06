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
  IconButton,
  Grid,
} from '@wso2/oxygen-ui'
import { ArrowLeft, Plus, FileText, Download, BookOpen } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'

interface QuickStartCard {
  icon: JSX.Element
  title: string
  description: string
  action: string
  onClick: () => void
}

export default function EmptyComponentList(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const quickStartCards: QuickStartCard[] = [
    {
      icon: <Plus size={32} />,
      title: 'Create Component',
      description: 'Start building your authentication flow from scratch',
      action: 'Create New',
      onClick: () => navigate(`/projects/${id}/components/new`),
    },
    {
      icon: <Download size={32} />,
      title: 'Import Component',
      description: 'Import existing components from templates or files',
      action: 'Import',
      onClick: () => console.log('Import component'),
    },
    {
      icon: <FileText size={32} />,
      title: 'Use Template',
      description: 'Get started quickly with pre-built component templates',
      action: 'Browse Templates',
      onClick: () => console.log('Browse templates'),
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Documentation',
      description: 'Learn how to create and configure authentication components',
      action: 'Read Docs',
      onClick: () => console.log('Open documentation'),
    },
  ]

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate(`/projects/${id}`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Components</Typography>
          <Typography variant="body2" color="text.secondary">
            No components yet in this project
          </Typography>
        </Box>
      </Box>

      {/* Empty State */}
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <FileText size={60} style={{ opacity: 0.5 }} />
        </Box>

        <Typography variant="h5" gutterBottom>
          No Components Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Components are the building blocks of your authentication flows. Create your first component to start
          building secure authentication experiences for your users.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<Plus size={20} />}
          onClick={() => navigate(`/projects/${id}/components/new`)}
          sx={{ mb: 6 }}
        >
          Create Your First Component
        </Button>
      </Box>

      {/* Quick Start Cards */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Quick Start
        </Typography>

        <Grid container spacing={3}>
          {quickStartCards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 1,
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={card.onClick}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {card.description}
                  </Typography>
                  <Button size="small" variant="text">
                    {card.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Help Section */}
      <Card variant="outlined" sx={{ mt: 4, bgcolor: 'action.hover' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BookOpen size={24} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Need Help Getting Started?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check out our comprehensive guides and tutorials to learn more about building authentication
                components.
              </Typography>
            </Box>
            <Button variant="outlined">View Documentation</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
