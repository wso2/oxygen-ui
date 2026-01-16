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
  PageContent,
  PageTitle,
  Typography,
  Chip,
  IconButton,
  SearchBarWithAdvancedFilter,
  ListingTable,
  Tooltip,
  Card,
  Grid,
} from '@wso2/oxygen-ui'
import {
  Plus,
  Folder,
  ExternalLink,
  Info,
  Edit,
  Trash2,
  SlidersHorizontal,
  Building2,
  ArrowRight,
} from '@wso2/oxygen-ui-icons-react'
import { useNavigate } from 'react-router'
import type { JSX } from 'react'
import { useMemo, useState } from 'react'
import type { AdvancedFilterState } from '@wso2/oxygen-ui/components/SearchBar/SearchBarWithAdvancedFilter'
import { mockOrganizations, mockExploreMoreSections } from '../mock-data'

interface Organization {
  id: string
  name: string
  orgId: string
  status: 'active' | 'inactive'
}

export default function Organizations(): JSX.Element {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const [advancedFilter, setAdvancedFilter] = useState<AdvancedFilterState>(
    {} as AdvancedFilterState
  )

  const filteredOrganizations = useMemo(() => {
    const q = searchValue.trim().toLowerCase()
    if (!q) return mockOrganizations

    return mockOrganizations.filter((org: Organization) => {
      const name = org.name.toLowerCase()
      const orgId = org.orgId.toLowerCase()
      return name.includes(q) || orgId.includes(q)
    })
  }, [searchValue])

  const getDotBg = (status: Organization['status']) =>
    status === 'active' ? 'success.main' : 'text.disabled'

  return (
    <PageContent>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle>
            <PageTitle.Header>Organizations</PageTitle.Header>
            <Box display="flex" alignItems="center">
              <PageTitle.SubHeader>Create and manage organizations</PageTitle.SubHeader>
              <Button variant="text" endIcon={<ExternalLink size={16} />}>
                Learn More
              </Button>
            </Box>
          </PageTitle>
        </Box>

        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => navigate('/organizations/new')}
        >
          New Organization
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <SearchBarWithAdvancedFilter
          value={searchValue}
          onChange={setSearchValue}
          advancedFilter={advancedFilter}
          onAdvancedFilterChange={setAdvancedFilter}
          attributeOptions={[]}
          conditionOptions={[]}
          fullWidth
        />
      </Box>
      {filteredOrganizations.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Folder size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Typography variant="h6" gutterBottom>
            No organizations found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchValue
              ? 'Try adjusting your search'
              : 'Create your first organization to get started'}
          </Typography>
          {!searchValue && (
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => navigate('/organizations/new')}
            >
              Create Organization
            </Button>
          )}
        </Box>
      ) : (
        <ListingTable.Container sx={{ width: '100%' }} disablePaper>
          <ListingTable variant="card" density="standard">
            <ListingTable.Body>
              {filteredOrganizations.map((org: Organization) => (
                <ListingTable.Row
                  key={org.id}
                  variant="card"
                  hover
                  clickable
                  onClick={() => navigate('/projects')}
                >
                  <ListingTable.Cell>
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                      <Box display="flex" alignItems="center" gap={2} minWidth={0}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'action.hover',
                            color: 'text.secondary',
                            flexShrink: 0,
                          }}
                        >
                          <Building2 size={22} />
                        </Box>

                        <Box minWidth={0}>
                          <Box display="flex" alignItems="center" gap={1} minWidth={0}>
                            <Typography variant="h6" sx={{ lineHeight: 1.2 }} noWrap>
                              {org.name}
                            </Typography>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: getDotBg(org.status),
                                flexShrink: 0,
                              }}
                            />
                          </Box>

                          <Box display="flex" alignItems="center" gap={1} mt={0.5} flexWrap="wrap">
                            <Typography variant="body2" color="text.secondary">
                              Organization Id:
                            </Typography>
                            <Chip label={org.orgId} size="small" variant="outlined" />
                          </Box>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={0.5} flexShrink={0}>
                        <Tooltip title="Info">
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.stopPropagation()
                              console.log('Info:', org.id)
                            }}
                          >
                            <Info size={18} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Settings">
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.stopPropagation()
                              console.log('Settings:', org.id)
                            }}
                          >
                            <SlidersHorizontal size={18} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.stopPropagation()
                              navigate(`/organizations/${org.id}/edit`)
                            }}
                          >
                            <Edit size={18} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={e => {
                              e.stopPropagation()
                              console.log('Delete:', org.id)
                            }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </ListingTable.Cell>
                </ListingTable.Row>
              ))}
            </ListingTable.Body>
          </ListingTable>
        </ListingTable.Container>
      )}

      {/* Explore More */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Explore More
        </Typography>

        <Card
          variant="outlined"
          sx={{
            p: 3,
          }}
        >
          <Grid container spacing={6}>
            {mockExploreMoreSections.map(section => {
              const SectionIcon = section.icon

              return (
                <Grid key={section.id} size={{ xs: 12, md: 4 }}>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <Box sx={{ color: 'primary.main', mt: 0.25 }}>
                      <SectionIcon size={34} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {section.title}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {section.items.map(item => (
                          <Button
                            key={item.id}
                            variant="text"
                            size="small"
                            startIcon={<ArrowRight size={16} />}
                            sx={{
                              justifyContent: 'flex-start',
                            }}
                            onClick={() => {
                              console.log('Explore item:', item.label)
                            }}
                          >
                            {item.label}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Card>
      </Box>
    </PageContent>
  )
}
