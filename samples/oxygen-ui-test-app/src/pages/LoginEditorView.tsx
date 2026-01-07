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
  IconButton,
  Tabs,
  Tab,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
} from '@wso2/oxygen-ui'
import { ArrowLeft, Save, Eye, Code, Settings, Play, Undo, Redo } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useParams } from 'react-router'
import type { JSX } from 'react'
import { useState } from 'react'

export default function LoginEditorView(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string; }>()
  const [activeTab, setActiveTab] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)

  // Editor state
  const [formConfig, setFormConfig] = useState({
    title: 'Sign In',
    subtitle: 'Welcome back! Please sign in to continue',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    submitButton: 'Sign In',
    showRememberMe: true,
    showForgotPassword: true,
    allowSignUp: true,
    enableSocialLogin: true,
  })

  const [codeContent] = useState(`{
  "type": "authentication",
  "flow": "login",
  "components": [
    {
      "type": "text_input",
      "id": "username",
      "label": "Username",
      "required": true,
      "validation": {
        "type": "email"
      }
    },
    {
      "type": "password_input",
      "id": "password",
      "label": "Password",
      "required": true,
      "minLength": 8
    },
    {
      "type": "button",
      "id": "submit",
      "label": "Sign In",
      "action": "authenticate"
    }
  ],
  "options": {
    "rememberMe": true,
    "forgotPassword": true,
    "socialLogin": ["google", "github"]
  }
}`)

  const handleSave = () => {
    console.log('Saving changes...', formConfig)
  }

  const handleTest = () => {
    console.log('Testing login flow...')
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
        }}
      >
        <IconButton onClick={() => navigate(`/projects/${id}`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Login Flow Editor</Typography>
          <Typography variant="caption" color="text.secondary">
            Basic Login Flow
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" title="Undo">
            <Undo size={18} />
          </IconButton>
          <IconButton size="small" title="Redo">
            <Redo size={18} />
          </IconButton>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Button variant="outlined" startIcon={<Play size={18} />} onClick={handleTest}>
          Test
        </Button>
        <Button
          variant="outlined"
          startIcon={<Eye size={18} />}
          onClick={() => setPreviewMode(!previewMode)}
        >
          {previewMode ? 'Edit' : 'Preview'}
        </Button>
        <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
          Save
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Editor */}
        <Box
          sx={{
            width: previewMode ? '0%' : '50%',
            borderRight: 1,
            borderColor: 'divider',
            overflow: 'auto',
            transition: 'width 0.3s',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
              <Tab label="Visual Editor" icon={<Settings size={16} />} iconPosition="start" />
              <Tab label="Code Editor" icon={<Code size={16} />} iconPosition="start" />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6">Form Configuration</Typography>

                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <TextField
                    fullWidth
                    value={formConfig.title}
                    onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Subtitle</FormLabel>
                  <TextField
                    fullWidth
                    value={formConfig.subtitle}
                    onChange={(e) => setFormConfig({ ...formConfig, subtitle: e.target.value })}
                  />
                </FormControl>

                <Divider />

                <Typography variant="subtitle1">Field Labels</Typography>

                <FormControl>
                  <FormLabel>Username Field</FormLabel>
                  <TextField
                    fullWidth
                    value={formConfig.usernameLabel}
                    onChange={(e) => setFormConfig({ ...formConfig, usernameLabel: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Password Field</FormLabel>
                  <TextField
                    fullWidth
                    value={formConfig.passwordLabel}
                    onChange={(e) => setFormConfig({ ...formConfig, passwordLabel: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Submit Button</FormLabel>
                  <TextField
                    fullWidth
                    value={formConfig.submitButton}
                    onChange={(e) => setFormConfig({ ...formConfig, submitButton: e.target.value })}
                  />
                </FormControl>

                <Divider />

                <Typography variant="subtitle1">Options</Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={formConfig.showRememberMe}
                      onChange={(e) => setFormConfig({ ...formConfig, showRememberMe: e.target.checked })}
                    />
                  }
                  label="Show Remember Me"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formConfig.showForgotPassword}
                      onChange={(e) => setFormConfig({ ...formConfig, showForgotPassword: e.target.checked })}
                    />
                  }
                  label="Show Forgot Password"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formConfig.allowSignUp}
                      onChange={(e) => setFormConfig({ ...formConfig, allowSignUp: e.target.checked })}
                    />
                  }
                  label="Allow Sign Up"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formConfig.enableSocialLogin}
                      onChange={(e) => setFormConfig({ ...formConfig, enableSocialLogin: e.target.checked })}
                    />
                  }
                  label="Enable Social Login"
                />
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">JSON Configuration</Typography>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select defaultValue="json">
                      <MenuItem value="json">JSON</MenuItem>
                      <MenuItem value="yaml">YAML</MenuItem>
                      <MenuItem value="xml">XML</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'grey.900',
                    color: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    overflow: 'auto',
                    maxHeight: 'calc(100vh - 300px)',
                    whiteSpace: 'pre',
                  }}
                >
                  {codeContent}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Right Panel - Preview */}
        <Box
          sx={{
            width: previewMode ? '100%' : '50%',
            overflow: 'auto',
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s',
          }}
        >
          <Card sx={{ width: '100%', maxWidth: 450, m: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                {formConfig.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {formConfig.subtitle}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl>
                  <FormLabel>{formConfig.usernameLabel}</FormLabel>
                  <TextField fullWidth placeholder={`Enter your ${formConfig.usernameLabel.toLowerCase()}`} />
                </FormControl>

                <FormControl>
                  <FormLabel>{formConfig.passwordLabel}</FormLabel>
                  <TextField
                    fullWidth
                    type="password"
                    placeholder={`Enter your ${formConfig.passwordLabel.toLowerCase()}`}
                  />
                </FormControl>

                {formConfig.showRememberMe && (
                  <FormControlLabel control={<Switch size="small" />} label="Remember me" />
                )}

                <Button variant="contained" fullWidth size="large">
                  {formConfig.submitButton}
                </Button>

                {formConfig.showForgotPassword && (
                  <Button variant="text" size="small" fullWidth>
                    Forgot password?
                  </Button>
                )}

                {formConfig.enableSocialLogin && (
                  <>
                    <Divider sx={{ my: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        OR
                      </Typography>
                    </Divider>

                    <Grid container spacing={1}>
                      <Grid size={6}>
                        <Button variant="outlined" fullWidth>
                          Google
                        </Button>
                      </Grid>
                      <Grid size={6}>
                        <Button variant="outlined" fullWidth>
                          GitHub
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}

                {formConfig.allowSignUp && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{' '}
                      <Button variant="text" size="small">
                        Sign up
                      </Button>
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Status Bar */}
      <Box
        sx={{
          p: 1,
          px: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip label="Unsaved changes" size="small" color="warning" />
          <Typography variant="caption" color="text.secondary">
            Last saved: 2 minutes ago
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Ready
        </Typography>
      </Box>
    </Box>
  )
}
