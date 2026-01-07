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
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Switch,
  FormControlLabel,
  Divider,
} from '@wso2/oxygen-ui'
import { ArrowLeft, Save, Eye } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'
import { useState } from 'react'

const steps = ['Basic Information', 'Configuration', 'Review']

export default function ComponentCreate(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [activeStep, setActiveStep] = useState(0)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    category: '',
    enabled: true,
    requireAuth: false,
    timeout: '30',
    retryAttempts: '3',
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.checked })
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    navigate(`/projects/${id}`)
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate(`/projects/${id}`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Create New Component</Typography>
          <Typography variant="body2" color="text.secondary">
            Configure your authentication component
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<Eye size={18} />}>
          Preview
        </Button>
      </Box>

      {/* Stepper */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card variant="outlined">
        <CardContent>
          {activeStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6">Basic Information</Typography>
              <Divider />

              <FormControl required>
                <FormLabel>Component Name</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter component name"
                  value={formData.name}
                  onChange={handleChange('name')}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Description</FormLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Describe the purpose of this component"
                  value={formData.description}
                  onChange={handleChange('description')}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Component Type</FormLabel>
                <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <MenuItem value="">Select type</MenuItem>
                  <MenuItem value="authentication">Authentication</MenuItem>
                  <MenuItem value="authorization">Authorization</MenuItem>
                  <MenuItem value="registration">Registration</MenuItem>
                  <MenuItem value="recovery">Recovery</MenuItem>
                  <MenuItem value="mfa">Multi-Factor Authentication</MenuItem>
                </Select>
              </FormControl>

              <FormControl required>
                <FormLabel>Category</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <MenuItem value="">Select category</MenuItem>
                  <MenuItem value="login">Login Flow</MenuItem>
                  <MenuItem value="signup">Sign Up Flow</MenuItem>
                  <MenuItem value="password">Password Management</MenuItem>
                  <MenuItem value="social">Social Login</MenuItem>
                  <MenuItem value="enterprise">Enterprise SSO</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6">Configuration</Typography>
              <Divider />

              <FormControlLabel
                control={<Switch checked={formData.enabled} onChange={handleSwitchChange('enabled')} />}
                label="Enable component"
              />

              <FormControlLabel
                control={<Switch checked={formData.requireAuth} onChange={handleSwitchChange('requireAuth')} />}
                label="Require authentication"
              />

              <FormControl>
                <FormLabel>Timeout (seconds)</FormLabel>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="30"
                  value={formData.timeout}
                  onChange={handleChange('timeout')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Retry Attempts</FormLabel>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="3"
                  value={formData.retryAttempts}
                  onChange={handleChange('retryAttempts')}
                />
              </FormControl>

              <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Advanced configuration options will be available after component creation.
                </Typography>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6">Review</Typography>
              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Component Name
                </Typography>
                <Typography variant="body1">{formData.name || 'Not specified'}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">{formData.description || 'Not specified'}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1">{formData.type || 'Not specified'}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body1">{formData.category || 'Not specified'}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Configuration
                </Typography>
                <Typography variant="body2">Enabled: {formData.enabled ? 'Yes' : 'No'}</Typography>
                <Typography variant="body2">Require Authentication: {formData.requireAuth ? 'Yes' : 'No'}</Typography>
                <Typography variant="body2">Timeout: {formData.timeout} seconds</Typography>
                <Typography variant="body2">Retry Attempts: {formData.retryAttempts}</Typography>
              </Box>
            </Box>
          )}
        </CardContent>

        {/* Actions */}
        <Divider />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSubmit}>
                Create Component
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
