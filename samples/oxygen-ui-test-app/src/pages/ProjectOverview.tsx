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

import type { JSX } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Divider,
  Grid,
  Avatar,
  SearchBar,
  Charts,
  PageTitle,
  ListingTable,
  Chip,
} from '@wso2/oxygen-ui'
import { Clock, Plus, RefreshCw, Info, Link as LinkIcon } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'

interface Component {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive'
  lastModified: string
}

type McpServer = {
  id: string
  action: string
  user: string
  timestamp: string
}

const mockComponents: Component[] = [
  {
    id: '1',
    name: 'User Authentication API',
    type: 'HTTP',
    status: 'active',
    lastModified: '2 months ago',
  },
  {
    id: '2',
    name: 'Order Management API',
    type: 'HTTP',
    status: 'active',
    lastModified: '3 months ago',
  },
  {
    id: '3',
    name: 'Product Catalog API',
    type: 'HTTP',
    status: 'active',
    lastModified: '3 months ago',
  },
  {
    id: '4',
    name: 'Payment Processing API',
    type: 'HTTP',
    status: 'inactive',
    lastModified: '5 months ago',
  },
]

const mockActivity: McpServer[] = [
  { id: '1', action: 'Customer Support MCP', user: 'System', timestamp: '2 months ago' },
  { id: '2', action: 'Order Processing MCP', user: 'System', timestamp: '3 months ago' },
  { id: '3', action: 'Fraud Detection MCP', user: 'System', timestamp: '5 months ago' },
  { id: '4', action: 'Notification Dispatcher MCP', user: 'System', timestamp: '7 months ago' },
]

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490]
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const { LineChart } = Charts

function LastUpdatedCell({ value }: { value: string }): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1,
        minWidth: 0,
      }}
    >
      <Clock size={16} />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {value}
      </Typography>
    </Box>
  )
}

export default function ProjectOverview(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const projectName = 'E-Commerce Platform'
  const projectDescription = 'Complete authentication and user management system for e-commerce'
  const projectLetter = (projectName?.trim()?.[0] ?? 'P').toUpperCase()

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <PageTitle>
          <PageTitle.Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            {projectLetter}
          </PageTitle.Avatar>
          <PageTitle.Header>{projectName}</PageTitle.Header>
          <PageTitle.SubHeader>{projectDescription}</PageTitle.SubHeader>
          <PageTitle.Link href="#" icon={<LinkIcon size={14} />}>
            Link a Repository
          </PageTitle.Link>
        </PageTitle>

        <Divider sx={{ mt: 2 }} />

        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, md: 10 }}>
                <SearchBar fullWidth />
              </Grid>

              <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{ height: 40 }}
                >
                  Create
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                API Proxies
              </Typography>
              <ListingTable.Container sx={{ width: '100%' }} disablePaper>
                <ListingTable variant="card" density="standard">
                  <ListingTable.Head>
                    <ListingTable.Row>
                      <ListingTable.Cell>Name</ListingTable.Cell>
                      <ListingTable.Cell>Description</ListingTable.Cell>
                      <ListingTable.Cell>Type</ListingTable.Cell>
                      <ListingTable.Cell align="right">Last Updated</ListingTable.Cell>
                    </ListingTable.Row>
                  </ListingTable.Head>

                  <ListingTable.Body>
                    {mockComponents.map(component => (
                      <ListingTable.Row
                        key={component.id}
                        variant="card"
                        hover
                        clickable
                        onClick={() => navigate(`/projects/${id}/components/${component.id}`)}
                      >
                        <ListingTable.Cell>
                          <ListingTable.CellIcon
                            icon={
                              <Avatar
                                sx={{
                                  width: 28,
                                  height: 28,
                                  bgcolor: 'action.hover',
                                  color: 'text.primary',
                                }}
                              >
                                {(component.name?.trim()?.[0] ?? 'A').toUpperCase()}
                              </Avatar>
                            }
                            primary={component.name}
                          />
                        </ListingTable.Cell>

                        <ListingTable.Cell>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 420,
                            }}
                          >
                            This is a sample proxy that manages a list of reading items.
                          </Typography>
                        </ListingTable.Cell>

                        <ListingTable.Cell>
                          <Chip label={component.type ?? 'HTTP'} size="small" variant="outlined" />
                        </ListingTable.Cell>

                        <ListingTable.Cell align="right">
                          <LastUpdatedCell value={component.lastModified} />
                        </ListingTable.Cell>
                      </ListingTable.Row>
                    ))}
                  </ListingTable.Body>
                </ListingTable>
              </ListingTable.Container>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                MCP Servers
              </Typography>

              <ListingTable.Container sx={{ width: '100%' }} disablePaper>
                <ListingTable variant="card" density="standard">
                  <ListingTable.Head>
                    <ListingTable.Row>
                      <ListingTable.Cell>Name</ListingTable.Cell>
                      <ListingTable.Cell>Description</ListingTable.Cell>
                      <ListingTable.Cell>Last Updated</ListingTable.Cell>
                    </ListingTable.Row>
                  </ListingTable.Head>

                  <ListingTable.Body>
                    {mockActivity.slice(0, 3).map(server => (
                      <ListingTable.Row
                        key={server.id}
                        variant="card"
                        hover
                        clickable
                        onClick={() => navigate(`/projects/${id}/components/${server.id}`)}
                      >
                        <ListingTable.Cell>
                          <ListingTable.CellIcon
                            icon={
                              <Avatar
                                sx={{
                                  width: 28,
                                  height: 28,
                                  bgcolor: 'action.hover',
                                  color: 'text.primary',
                                }}
                              >
                                {(server.action?.trim()?.[0] ?? 'M').toUpperCase()}
                              </Avatar>
                            }
                            primary={server.action}
                          />
                        </ListingTable.Cell>

                        <ListingTable.Cell>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 420,
                            }}
                          >
                            This is a sample proxy that manages a list of reading items.
                          </Typography>
                        </ListingTable.Cell>

                        <ListingTable.Cell>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <LastUpdatedCell value={server.timestamp} />
                          </Box>
                        </ListingTable.Cell>
                      </ListingTable.Row>
                    ))}
                  </ListingTable.Body>
                </ListingTable>
              </ListingTable.Container>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={2}>
              <Card variant="outlined" sx={{ borderRadius: 0.8 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Analytics
                    </Typography>
                    <IconButton size="small">
                      <RefreshCw size={18} />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      height: 220,
                      borderRadius: 0.8,
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'background.default',
                      paddingTop: 1,
                    }}
                  >
                    <LineChart
                      width={400}
                      height={200}
                      series={[
                        { data: pData, label: 'Product A' },
                        { data: uData, label: 'Product B' },
                      ]}
                      xAxis={[{ scaleType: 'point', data: xLabels }]}
                    />
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 0.8 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    API Proxies
                  </Typography>

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        HTTP
                      </Typography>
                      <Typography variant="caption">4</Typography>
                    </Box>

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        Service
                      </Typography>
                      <Typography variant="caption">1</Typography>
                    </Box>

                    <Divider />

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.5 }}>
                      MCP Servers
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        MCP Servers
                      </Typography>
                      <Typography variant="caption">3</Typography>
                    </Box>

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        Total
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        8
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 0.8 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Contributors
                    </Typography>
                    <Info size={16} />
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>J</Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
