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

import { useState, useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  ListingTable,
  Menu,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  TablePagination,
} from '@wso2/oxygen-ui'
import type { ListingTableDensity, ListingTableSortDirection } from '@wso2/oxygen-ui'
import { Plus, MoreVertical, Filter, Download, ArrowLeft, FileText, Key, Shield, RefreshCw, Lock, Inbox } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'

interface Component {
  id: string
  name: string
  type: string
  category: string
  status: 'active' | 'inactive' | 'draft'
  lastModified: string
  author: string
  description: string
}

const mockComponents: Component[] = [
  {
    id: '1',
    name: 'Basic Login Flow',
    type: 'Authentication',
    category: 'Login Flow',
    status: 'active',
    lastModified: '2 hours ago',
    author: 'John Doe',
    description: 'Standard username/password authentication flow',
  },
  {
    id: '2',
    name: 'Social Sign Up',
    type: 'Registration',
    category: 'Sign Up Flow',
    status: 'active',
    lastModified: '1 day ago',
    author: 'Jane Smith',
    description: 'Registration via social identity providers',
  },
  {
    id: '3',
    name: 'Password Reset',
    type: 'Recovery',
    category: 'Password Management',
    status: 'active',
    lastModified: '3 days ago',
    author: 'Mike Johnson',
    description: 'Email-based password recovery flow',
  },
  {
    id: '4',
    name: 'MFA Setup',
    type: 'Multi-Factor Authentication',
    category: 'Login Flow',
    status: 'inactive',
    lastModified: '1 week ago',
    author: 'Sarah Wilson',
    description: 'Configure TOTP and SMS verification',
  },
  {
    id: '5',
    name: 'OAuth Integration',
    type: 'Authorization',
    category: 'Enterprise SSO',
    status: 'draft',
    lastModified: '2 weeks ago',
    author: 'John Doe',
    description: 'OAuth 2.0 authorization code flow',
  },
  {
    id: '6',
    name: 'SAML SSO',
    type: 'Authentication',
    category: 'Enterprise SSO',
    status: 'active',
    lastModified: '4 days ago',
    author: 'Alice Brown',
    description: 'SAML 2.0 single sign-on integration',
  },
  {
    id: '7',
    name: 'Email Verification',
    type: 'Registration',
    category: 'Sign Up Flow',
    status: 'active',
    lastModified: '5 days ago',
    author: 'Bob Williams',
    description: 'Email confirmation during registration',
  },
  {
    id: '8',
    name: 'Account Lockout',
    type: 'Multi-Factor Authentication',
    category: 'Security',
    status: 'active',
    lastModified: '6 days ago',
    author: 'Charlie Davis',
    description: 'Brute force protection with account lockout',
  },
  {
    id: '9',
    name: 'Session Management',
    type: 'Authorization',
    category: 'Security',
    status: 'active',
    lastModified: '1 week ago',
    author: 'Diana Martinez',
    description: 'User session timeout and invalidation',
  },
  {
    id: '10',
    name: 'Magic Link Login',
    type: 'Authentication',
    category: 'Passwordless',
    status: 'draft',
    lastModified: '2 weeks ago',
    author: 'Edward Lee',
    description: 'Passwordless authentication via email link',
  },
  {
    id: '11',
    name: 'Biometric Auth',
    type: 'Multi-Factor Authentication',
    category: 'Passwordless',
    status: 'inactive',
    lastModified: '3 weeks ago',
    author: 'Fiona Garcia',
    description: 'WebAuthn fingerprint and face recognition',
  },
  {
    id: '12',
    name: 'API Key Management',
    type: 'Authorization',
    category: 'API Security',
    status: 'active',
    lastModified: '4 days ago',
    author: 'George Taylor',
    description: 'Generate and manage API access keys',
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Authentication':
      return <Key size={20} />
    case 'Authorization':
      return <Shield size={20} />
    case 'Registration':
      return <FileText size={20} />
    case 'Recovery':
      return <RefreshCw size={20} />
    case 'Multi-Factor Authentication':
      return <Lock size={20} />
    default:
      return <FileText size={20} />
  }
}

export default function ComponentList(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // Table state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [density, setDensity] = useState<ListingTableDensity>('standard')
  const [sortField, setSortField] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<ListingTableSortDirection>('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, componentId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedComponent(componentId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedComponent(null)
  }

  const handleSortChange = (field: string, direction: ListingTableSortDirection) => {
    setSortField(field)
    setSortDirection(direction)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setPage(0)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredComponents = useMemo(() => {
    const result = mockComponents.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = filterType === 'all' || component.type === filterType
      const matchesStatus = filterStatus === 'all' || component.status === filterStatus

      return matchesSearch && matchesType && matchesStatus
    })

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField as keyof Component]
      const bVal = b[sortField as keyof Component]
      const comparison = String(aVal).localeCompare(String(bVal))
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [searchQuery, filterType, filterStatus, sortField, sortDirection])

  const paginatedComponents = useMemo(() => {
    return filteredComponents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [filteredComponents, page, rowsPerPage])

  const getStatusColor = (status: Component['status']) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'default'
      case 'draft':
        return 'warning'
      default:
        return 'default'
    }
  }

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
            Manage authentication components for your project
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<Download size={18} />}>
          Export
        </Button>
        <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => navigate(`/projects/${id}/components/new`)}>
          New Component
        </Button>
      </Box>

      {/* Filters */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'end' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <FormLabel>Type</FormLabel>
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Authentication">Authentication</MenuItem>
                <MenuItem value="Authorization">Authorization</MenuItem>
                <MenuItem value="Registration">Registration</MenuItem>
                <MenuItem value="Recovery">Recovery</MenuItem>
                <MenuItem value="Multi-Factor Authentication">MFA</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <FormLabel>Status</FormLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" startIcon={<Filter size={18} />}>
              More Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Components Table using ListingTable with Provider */}
      <ListingTable.Provider
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        density={density}
        onDensityChange={setDensity}
      >
        <ListingTable.Container disablePaper>
          <ListingTable.Toolbar
            showSearch
            searchPlaceholder="Search components..."
            actions={<ListingTable.DensityControl />}
          />
          <ListingTable variant="card" density={density}>
            <ListingTable.Head>
              <ListingTable.Row>
                <ListingTable.Cell>
                  <ListingTable.SortLabel field="name">Name</ListingTable.SortLabel>
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <ListingTable.SortLabel field="type">Type</ListingTable.SortLabel>
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <ListingTable.SortLabel field="category">Category</ListingTable.SortLabel>
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <ListingTable.SortLabel field="status">Status</ListingTable.SortLabel>
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <ListingTable.SortLabel field="author">Author</ListingTable.SortLabel>
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <ListingTable.SortLabel field="lastModified">Last Modified</ListingTable.SortLabel>
                </ListingTable.Cell>
                <ListingTable.Cell align="right">Actions</ListingTable.Cell>
              </ListingTable.Row>
            </ListingTable.Head>
            <ListingTable.Body>
              {paginatedComponents.length === 0 ? (
                <ListingTable.Row>
                  <ListingTable.Cell colSpan={7}>
                    <ListingTable.EmptyState
                      illustration={<Inbox size={64} />}
                      title="No components found"
                      description={
                        searchQuery || filterType !== 'all' || filterStatus !== 'all'
                          ? 'Try adjusting your search or filter criteria'
                          : 'Get started by creating your first authentication component'
                      }
                      action={
                        !searchQuery && filterType === 'all' && filterStatus === 'all' ? (
                          <Button
                            variant="contained"
                            startIcon={<Plus size={16} />}
                            onClick={() => navigate(`/projects/${id}/components/new`)}
                          >
                            Create Component
                          </Button>
                        ) : undefined
                      }
                    />
                  </ListingTable.Cell>
                </ListingTable.Row>
              ) : (
                paginatedComponents.map((component) => (
                  <ListingTable.Row
                    key={component.id}
                    variant="card"
                    hover
                    clickable
                    onClick={() => navigate(`/projects/${id}/components/${component.id}`)}
                  >
                    <ListingTable.Cell>
                      <ListingTable.CellIcon
                        icon={getTypeIcon(component.type)}
                        primary={component.name}
                        secondary={component.description}
                      />
                    </ListingTable.Cell>
                    <ListingTable.Cell>
                      <Chip label={component.type} size="small" variant="outlined" />
                    </ListingTable.Cell>
                    <ListingTable.Cell>{component.category}</ListingTable.Cell>
                    <ListingTable.Cell>
                      <Chip label={component.status} size="small" color={getStatusColor(component.status)} />
                    </ListingTable.Cell>
                    <ListingTable.Cell>{component.author}</ListingTable.Cell>
                    <ListingTable.Cell>{component.lastModified}</ListingTable.Cell>
                    <ListingTable.Cell align="right">
                      <ListingTable.RowActions visibility="hover">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuOpen(e, component.id)
                          }}
                        >
                          <MoreVertical size={18} />
                        </IconButton>
                      </ListingTable.RowActions>
                    </ListingTable.Cell>
                  </ListingTable.Row>
                ))
              )}
            </ListingTable.Body>
          </ListingTable>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredComponents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ListingTable.Container>
      </ListingTable.Provider>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            navigate(`/projects/${id}/components/${selectedComponent}`)
            handleMenuClose()
          }}
        >
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/projects/${id}/components/${selectedComponent}/edit`)
            handleMenuClose()
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleMenuClose}>Export</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}
