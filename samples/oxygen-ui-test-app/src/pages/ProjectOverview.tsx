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

import type { JSX, ReactNode } from 'react'
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
} from '@wso2/oxygen-ui'
import { Clock, Plus, RefreshCw, Info, Link as LinkIcon } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import { mockComponents, mockMcpServers } from '../mock-data'

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

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490]
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const { LineChart } = Charts

type OverviewColumn<T> = {
  header: ReactNode
  render: (row: T) => ReactNode
  headerSx?: Record<string, string | number>
  cellSx?: Record<string, string | number>
}

type OverviewTableSectionProps<T extends { id: string }> = {
  title: string
  gridTemplateColumns: string
  columns: OverviewColumn<T>[]
  rows: T[]
  onRowClick?: (row: T) => void
  emptyText?: string
  avatarSize?: number
  getPrimaryText: (row: T) => string
  getAvatarText?: (row: T) => string
}

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

function OverviewTableSection<T extends { id: string }>(
  props: OverviewTableSectionProps<T>
): JSX.Element {
  const {
    title,
    gridTemplateColumns,
    columns,
    rows,
    onRowClick,
    emptyText = 'No items available.',
    avatarSize = 30,
    getPrimaryText,
    getAvatarText,
  } = props

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns,
          px: 2.5,
          py: 1.25,
          color: 'text.secondary',
          typography: 'caption',
          alignItems: 'center',
          columnGap: 1,
        }}
      >
        {columns.map((c, idx) => (
          <Box
            key={idx}
            sx={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ...c.headerSx,
            }}
          >
            {c.header}
          </Box>
        ))}
      </Box>

      {rows.length === 0 ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 2, py: 2, display: 'block' }}
        >
          {emptyText}
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {rows.map(row => {
            const primary = getPrimaryText(row)
            const avatarText = (getAvatarText?.(row) ?? primary?.trim()?.[0] ?? '?').toUpperCase()

            return (
              <Card
                key={row.id}
                variant="outlined"
                sx={{
                  borderRadius: 0.8,
                  borderColor: 'divider',
                  cursor: onRowClick ? 'pointer' : 'default',
                  overflow: 'hidden',
                  '&:hover': onRowClick ? { bgcolor: 'action.hover' } : undefined,
                }}
                onClick={() => onRowClick?.(row)}
              >
                <CardContent style={{ padding: 0 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns,
                      alignItems: 'center',
                      columnGap: 3,
                      minWidth: 0,
                      width: '100%',
                      boxSizing: 'border-box',
                      p: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: avatarSize + 14,
                          height: avatarSize + 14,
                          bgcolor: 'action.hover',
                          color: 'text.primary',
                          fontSize: 18,
                          flex: '0 0 auto',
                        }}
                      >
                        {avatarText}
                      </Avatar>

                      <Typography
                        variant="caption"
                        sx={{
                          minWidth: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {primary}
                      </Typography>
                    </Box>

                    {columns.slice(1).map((c, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          minWidth: 0,
                          overflow: 'hidden',
                          ...c.cellSx,
                        }}
                      >
                        {c.render(row)}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      )}
    </Box>
  )
}

export default function ProjectOverview(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const projectName = 'E-Commerce Platform'
  const projectDescription = 'Complete authentication and user management system for e-commerce'
  const projectLetter = (projectName?.trim()?.[0] ?? 'P').toUpperCase()

  const renderDescription = () => (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 0,
        display: 'block',
      }}
    >
      This is a sample proxy that manages a list of reading items.
    </Typography>
  )

  const apiProxyColumns: OverviewColumn<Component>[] = [
    { header: 'Name', render: row => row.name },
    { header: 'Description', render: () => renderDescription() },
    {
      header: 'Type',
      render: row => (
        <Typography
          variant="caption"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {row.type ?? 'HTTP'}
        </Typography>
      ),
      cellSx: { minWidth: 0 },
    },
    {
      header: 'Last Updated',
      headerSx: { textAlign: 'right' },
      cellSx: { textAlign: 'right' },
      render: row => <LastUpdatedCell value={row.lastModified} />,
    },
  ]

  const mcpColumns: OverviewColumn<McpServer>[] = [
    { header: 'Name', render: row => row.action },
    { header: 'Description', render: () => renderDescription() },
    {
      header: 'Last Updated',
      headerSx: { textAlign: 'right' },
      cellSx: { textAlign: 'right' },
      render: row => <LastUpdatedCell value={row.timestamp} />,
    },
  ]

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

            <OverviewTableSection<Component>
              title="API Proxies"
              gridTemplateColumns="minmax(0, 2.2fr) minmax(0, 2fr) minmax(0, 0.6fr) minmax(0, 1fr)"
              columns={apiProxyColumns}
              rows={mockComponents}
              getPrimaryText={row => row.name}
              getAvatarText={row => row.name?.[0] ?? 'A'}
              onRowClick={row => navigate(`/projects/${id}/components/${row.id}`)}
            />

            <OverviewTableSection<McpServer>
              title="MCP Servers"
              gridTemplateColumns="minmax(0, 2.2fr) minmax(0, 2fr) minmax(0, 1fr)"
              columns={mcpColumns}
              rows={mockMcpServers.slice(0, 3)}
              getPrimaryText={row => row.action}
              getAvatarText={row => row.action?.[0] ?? 'M'}
              onRowClick={row => navigate(`/projects/${id}/components/${row.id}`)}
            />
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
