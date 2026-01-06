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
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
} from '@wso2/oxygen-ui'
import { Search, Plus, MoreVertical, Filter, Download, ArrowLeft } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'
import { useState } from 'react'

interface Component {
  id: string
  name: string
  type: string
  category: string
  status: 'active' | 'inactive' | 'draft'
  lastModified: string
  author: string
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
  },
  {
    id: '2',
    name: 'Social Sign Up',
    type: 'Registration',
    category: 'Sign Up Flow',
    status: 'active',
    lastModified: '1 day ago',
    author: 'Jane Smith',
  },
  {
    id: '3',
    name: 'Password Reset',
    type: 'Recovery',
    category: 'Password Management',
    status: 'active',
    lastModified: '3 days ago',
    author: 'Mike Johnson',
  },
  {
    id: '4',
    name: 'MFA Setup',
    type: 'Multi-Factor Authentication',
    category: 'Login Flow',
    status: 'inactive',
    lastModified: '1 week ago',
    author: 'Sarah Wilson',
  },
  {
    id: '5',
    name: 'OAuth Integration',
    type: 'Authorization',
    category: 'Enterprise SSO',
    status: 'draft',
    lastModified: '2 weeks ago',
    author: 'John Doe',
  },
]

export default function ComponentList(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
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

  const filteredComponents = mockComponents.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === 'all' || component.type === filterType
    const matchesStatus = filterStatus === 'all' || component.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

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
            <Box sx={{ flexGrow: 1, minWidth: 250 }}>
              <TextField
                fullWidth
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Components Table */}
      <Card variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComponents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Typography variant="body2" color="text.secondary">
                      No components found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredComponents.map((component) => (
                  <TableRow
                    key={component.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/projects/${id}/components/${component.id}`)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {component.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{component.type}</TableCell>
                    <TableCell>{component.category}</TableCell>
                    <TableCell>
                      <Chip label={component.status} size="small" color={getStatusColor(component.status)} />
                    </TableCell>
                    <TableCell>{component.author}</TableCell>
                    <TableCell>{component.lastModified}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMenuOpen(e, component.id)
                        }}
                      >
                        <MoreVertical size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

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
