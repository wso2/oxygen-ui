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
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  Divider,
  PageContent,
} from '@wso2/oxygen-ui'
import {
  Search,
  Download,
  RefreshCw,
  Filter,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
} from '@wso2/oxygen-ui-icons-react'
import { useNavigate } from 'react-router'
import type { JSX } from 'react'
import { useState } from 'react'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  component: string
  message: string
  details?: string
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2026-01-05 14:32:15',
    level: 'success',
    component: 'Authentication',
    message: 'User login successful',
    details: 'User: john.doe@example.com, IP: 192.168.1.100',
  },
  {
    id: '2',
    timestamp: '2026-01-05 14:30:42',
    level: 'warning',
    component: 'MFA',
    message: 'Multiple failed MFA attempts detected',
    details: 'User: jane.smith@example.com, Attempts: 3',
  },
  {
    id: '3',
    timestamp: '2026-01-05 14:28:10',
    level: 'error',
    component: 'Password Reset',
    message: 'Password reset token expired',
    details: 'Token ID: abc123xyz, User: mike.johnson@example.com',
  },
  {
    id: '4',
    timestamp: '2026-01-05 14:25:33',
    level: 'info',
    component: 'Registration',
    message: 'New user registration initiated',
    details: 'Email: sarah.wilson@example.com',
  },
  {
    id: '5',
    timestamp: '2026-01-05 14:22:18',
    level: 'success',
    component: 'OAuth',
    message: 'OAuth token refreshed successfully',
    details: 'Client ID: client_12345',
  },
  {
    id: '6',
    timestamp: '2026-01-05 14:20:05',
    level: 'error',
    component: 'Authentication',
    message: 'Invalid credentials provided',
    details: 'User: unknown@example.com, IP: 192.168.1.105',
  },
  {
    id: '7',
    timestamp: '2026-01-05 14:18:50',
    level: 'info',
    component: 'Session',
    message: 'User session created',
    details: 'Session ID: sess_7890, User: john.doe@example.com',
  },
  {
    id: '8',
    timestamp: '2026-01-05 14:15:22',
    level: 'warning',
    component: 'Rate Limit',
    message: 'Rate limit threshold approaching',
    details: 'IP: 192.168.1.100, Current: 85%, Limit: 100 req/min',
  },
]

export default function LogView(): JSX.Element {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [componentFilter, setComponentFilter] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [expandedLog, setExpandedLog] = useState<string | null>(null)

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    const matchesComponent = componentFilter === 'all' || log.component === componentFilter

    return matchesSearch && matchesLevel && matchesComponent
  })

  const getLevelIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return <CheckCircle size={18} />
      case 'warning':
        return <AlertTriangle size={18} />
      case 'error':
        return <AlertCircle size={18} />
      case 'info':
        return <Info size={18} />
      default:
        return <Info size={18} />
    }
  }

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return 'success'
      case 'warning':
        return 'warning'
      case 'error':
        return 'error'
      case 'info':
        return 'info'
      default:
        return 'default'
    }
  }

  const handleRefresh = () => {
    console.log('Refreshing logs...')
  }

  const handleExport = () => {
    console.log('Exporting logs...')
  }

  return (
    <PageContent>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate(`/analytics`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Activity Logs</Typography>
          <Typography variant="body2" color="text.secondary">
            View and monitor authentication events and system activities
          </Typography>
        </Box>
        <FormControlLabel
          control={<Switch checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />}
          label="Auto-refresh"
        />
        <Button variant="outlined" startIcon={<RefreshCw size={18} />} onClick={handleRefresh}>
          Refresh
        </Button>
        <Button variant="outlined" startIcon={<Download size={18} />} onClick={handleExport}>
          Export
        </Button>
      </Box>

      {/* Filters */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'end' }}>
            <Box sx={{ flexGrow: 1, minWidth: 250 }}>
              <TextField
                fullWidth
                placeholder="Search logs..."
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

            <FormControl sx={{ minWidth: 150 }}>
              <FormLabel>Level</FormLabel>
              <Select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="info">Info</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="error">Error</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <FormLabel>Component</FormLabel>
              <Select value={componentFilter} onChange={(e) => setComponentFilter(e.target.value)}>
                <MenuItem value="all">All Components</MenuItem>
                <MenuItem value="Authentication">Authentication</MenuItem>
                <MenuItem value="MFA">MFA</MenuItem>
                <MenuItem value="Password Reset">Password Reset</MenuItem>
                <MenuItem value="Registration">Registration</MenuItem>
                <MenuItem value="OAuth">OAuth</MenuItem>
                <MenuItem value="Session">Session</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" startIcon={<Filter size={18} />}>
              Advanced
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card variant="outlined">
        <CardContent sx={{ p: 0 }}>
          {filteredLogs.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="body2" color="text.secondary">
                No logs found matching your filters
              </Typography>
            </Box>
          ) : (
            <Box>
              {filteredLogs.map((log, index) => (
                <Box key={log.id}>
                  <Box
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                      <Box sx={{ color: `${getLevelColor(log.level)}.main`, mt: 0.5 }}>
                        {getLevelIcon(log.level)}
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip label={log.level} size="small" color={getLevelColor(log.level)} />
                          <Chip label={log.component} size="small" variant="outlined" />
                          <Typography variant="caption" color="text.secondary">
                            {log.timestamp}
                          </Typography>
                        </Box>

                        <Typography variant="body2" fontWeight={500}>
                          {log.message}
                        </Typography>

                        {expandedLog === log.id && log.details && (
                          <Box
                            sx={{
                              mt: 2,
                              p: 2,
                              bgcolor: 'action.hover',
                              borderRadius: 1,
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                            }}
                          >
                            {log.details}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {index < filteredLogs.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Stats Footer */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredLogs.length} of {mockLogs.length} logs
        </Typography>
      </Box>
    </PageContent>
  )
}
