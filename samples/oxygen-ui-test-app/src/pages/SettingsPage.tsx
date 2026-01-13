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
  Tabs,
  Tab,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  PageTitle,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  Grid,
  Avatar,
  ThemeSwitcher,
} from '@wso2/oxygen-ui'
import {
  Save,
  Building2,
  Bell,
  Shield,
  Key,
  Trash2,
  Palette,
  Users,
  CreditCard,
} from '@wso2/oxygen-ui-icons-react'
import { useState, type JSX } from 'react'

export default function SettingsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0)
  const [hasChanges, setHasChanges] = useState(false)

  // Settings state
  const [generalSettings, setGeneralSettings] = useState({
    organizationName: 'Acme Corporation',
    displayName: 'ACME',
    description: 'Leading provider of innovative software solutions',
    website: 'https://acme.com',
    industry: 'technology',
    size: '50-200',
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'utc',
    dateFormat: 'MM/DD/YYYY',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackNotifications: false,
    securityAlerts: true,
    billingAlerts: true,
    weeklyReports: false,
    productUpdates: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    requireTwoFactor: true,
    sessionTimeout: '30',
    ipWhitelist: false,
    allowedDomains: '@acme.com',
  })

  const handleSave = () => {
    console.log('Saving settings...')
    setHasChanges(false)
  }

  const handleChange = () => {
    setHasChanges(true)
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle>
            <PageTitle.Header>Organization Settings</PageTitle.Header>
            <PageTitle.SubHeader>Manage your organization preferences and configuration</PageTitle.SubHeader>
          </PageTitle>
        </Box>
        {hasChanges && (
          <Button variant="contained" startIcon={<Save size={18} />} onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </Box>

      {hasChanges && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have unsaved changes. Make sure to save before leaving this page.
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Card variant="outlined" sx={{ width: 280, height: 'fit-content'}}>
          <CardContent sx={{ p: 3 }}>
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
            >
              <Tab icon={<Building2 size={18} />} iconPosition="start" label="General" />
              <Tab icon={<Palette size={18} />} iconPosition="start" label="Appearance" />
              <Tab icon={<Bell size={18} />} iconPosition="start" label="Notifications" />
              <Tab icon={<Shield size={18} />} iconPosition="start" label="Security" />
              <Tab icon={<Users size={18} />} iconPosition="start" label="Members" />
              <Tab icon={<Key size={18} />} iconPosition="start" label="API Keys" />
              <Tab icon={<CreditCard size={18} />} iconPosition="start" label="Billing" />
              <Tab icon={<Trash2 size={18} />} iconPosition="start" label="Danger Zone" />
            </Tabs>
          </CardContent>
        </Card>

        {/* Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* General Settings */}
          {activeTab === 0 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Organization Information
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                      Organization Logo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: 'primary.main',
                          fontSize: '2rem',
                        }}
                      >
                        AC
                      </Avatar>
                      <Box>
                        <Button variant="outlined" size="small" sx={{ mb: 1 }}>
                          Change Logo
                        </Button>
                        <Typography variant="caption" display="block" color="text.secondary">
                          Recommended: Square image, at least 200x200px
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <FormControl>
                    <FormLabel>Organization Name</FormLabel>
                    <TextField
                      fullWidth
                      value={generalSettings.organizationName}
                      onChange={(e) => {
                        setGeneralSettings({ ...generalSettings, organizationName: e.target.value })
                        handleChange()
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Display Name</FormLabel>
                    <TextField
                      fullWidth
                      value={generalSettings.displayName}
                      onChange={(e) => {
                        setGeneralSettings({ ...generalSettings, displayName: e.target.value })
                        handleChange()
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={generalSettings.description}
                      onChange={(e) => {
                        setGeneralSettings({ ...generalSettings, description: e.target.value })
                        handleChange()
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Website</FormLabel>
                    <TextField
                      fullWidth
                      type="url"
                      value={generalSettings.website}
                      onChange={(e) => {
                        setGeneralSettings({ ...generalSettings, website: e.target.value })
                        handleChange()
                      }}
                    />
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <FormLabel>Industry</FormLabel>
                        <Select
                          value={generalSettings.industry}
                          onChange={(e) => {
                            setGeneralSettings({ ...generalSettings, industry: e.target.value })
                            handleChange()
                          }}
                        >
                          <MenuItem value="technology">Technology</MenuItem>
                          <MenuItem value="finance">Finance</MenuItem>
                          <MenuItem value="healthcare">Healthcare</MenuItem>
                          <MenuItem value="education">Education</MenuItem>
                          <MenuItem value="retail">Retail</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <FormLabel>Company Size</FormLabel>
                        <Select
                          value={generalSettings.size}
                          onChange={(e) => {
                            setGeneralSettings({ ...generalSettings, size: e.target.value })
                            handleChange()
                          }}
                        >
                          <MenuItem value="1-10">1-10 employees</MenuItem>
                          <MenuItem value="11-50">11-50 employees</MenuItem>
                          <MenuItem value="50-200">50-200 employees</MenuItem>
                          <MenuItem value="201-500">201-500 employees</MenuItem>
                          <MenuItem value="500+">500+ employees</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 1 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Appearance Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <ThemeSwitcher />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Select
                      value={appearanceSettings.language}
                      onChange={(e) => {
                        setAppearanceSettings({ ...appearanceSettings, language: e.target.value })
                        handleChange()
                      }}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="ja">Japanese</MenuItem>
                      <MenuItem value="zh">Chinese</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      value={appearanceSettings.timezone}
                      onChange={(e) => {
                        setAppearanceSettings({ ...appearanceSettings, timezone: e.target.value })
                        handleChange()
                      }}
                    >
                      <MenuItem value="utc">UTC</MenuItem>
                      <MenuItem value="est">Eastern Time (EST)</MenuItem>
                      <MenuItem value="pst">Pacific Time (PST)</MenuItem>
                      <MenuItem value="cet">Central European Time (CET)</MenuItem>
                      <MenuItem value="jst">Japan Standard Time (JST)</MenuItem>
                      <MenuItem value="ist">India Standard Time (IST)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Date Format</FormLabel>
                    <Select
                      value={appearanceSettings.dateFormat}
                      onChange={(e) => {
                        setAppearanceSettings({ ...appearanceSettings, dateFormat: e.target.value })
                        handleChange()
                      }}
                    >
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      These preferences will be applied across your organization for all members.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 2 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Notification Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked,
                          })
                          handleChange()
                        }}
                      />
                    }
                    label="Email Notifications"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mt: -1 }}>
                    Receive email notifications for organization events
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.slackNotifications}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            slackNotifications: e.target.checked,
                          })
                          handleChange()
                        }}
                      />
                    }
                    label="Slack Notifications"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mt: -1 }}>
                    Send notifications to your Slack workspace
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2">Notification Types</Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.securityAlerts}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            securityAlerts: e.target.checked,
                          })
                          handleChange()
                        }}
                      />
                    }
                    label="Security Alerts"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mt: -1 }}>
                    Get notified about security events and suspicious activities
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.billingAlerts}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            billingAlerts: e.target.checked,
                          })
                          handleChange()
                        }}
                      />
                    }
                    label="Billing Alerts"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mt: -1 }}>
                    Receive alerts about billing and subscription changes
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            weeklyReports: e.target.checked,
                          })
                          handleChange()
                        }}
                      />
                    }
                    label="Weekly Reports"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mt: -1 }}>
                    Get weekly summary reports of organization activity
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.productUpdates}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            productUpdates: e.target.checked,
                          })
                          handleChange()
                        }}
                      />
                    }
                    label="Product Updates"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mt: -1 }}>
                    Stay informed about new features and improvements
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 3 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Security Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.requireTwoFactor}
                          onChange={(e) => {
                            setSecuritySettings({
                              ...securitySettings,
                              requireTwoFactor: e.target.checked,
                            })
                            handleChange()
                          }}
                        />
                      }
                      label="Require Two-Factor Authentication"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Require all members to enable 2FA for enhanced security
                    </Typography>
                  </Box>

                  <FormControl>
                    <FormLabel>Session Timeout (minutes)</FormLabel>
                    <TextField
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => {
                        setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })
                        handleChange()
                      }}
                      helperText="Automatically log out users after this period of inactivity"
                    />
                  </FormControl>

                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.ipWhitelist}
                          onChange={(e) => {
                            setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.checked })
                            handleChange()
                          }}
                        />
                      }
                      label="Enable IP Whitelist"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                      Restrict access to specific IP addresses
                    </Typography>
                  </Box>

                  <FormControl>
                    <FormLabel>Allowed Email Domains</FormLabel>
                    <TextField
                      value={securitySettings.allowedDomains}
                      onChange={(e) => {
                        setSecuritySettings({ ...securitySettings, allowedDomains: e.target.value })
                        handleChange()
                      }}
                      helperText="Comma-separated list of allowed email domains (e.g., @acme.com, @example.com)"
                    />
                  </FormControl>

                  <Alert severity="info">
                    <Typography variant="body2">
                      Strong security settings help protect your organization from unauthorized access.
                    </Typography>
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Members */}
          {activeTab === 4 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" gutterBottom>Team Members</Typography>
                  <Button variant="contained" size="small" startIcon={<Users size={18} />}>
                    Invite Member
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>JD</Avatar>
                    <ListItemText
                      primary="John Doe"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="body2">john.doe@acme.com</Typography>
                          <Chip label="Owner" size="small" color="primary" />
                        </Box>
                      }
                    />
                    <Button size="small" variant="outlined" disabled>
                      Remove
                    </Button>
                  </ListItem>

                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>JS</Avatar>
                    <ListItemText
                      primary="Jane Smith"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="body2">jane.smith@acme.com</Typography>
                          <Chip label="Admin" size="small" color="success" />
                        </Box>
                      }
                    />
                    <Button size="small" variant="outlined" color="error">
                      Remove
                    </Button>
                  </ListItem>

                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>MB</Avatar>
                    <ListItemText
                      primary="Mike Brown"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="body2">mike.brown@acme.com</Typography>
                          <Chip label="Member" size="small" />
                        </Box>
                      }
                    />
                    <Button size="small" variant="outlined" color="error">
                      Remove
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          )}

          {/* API Keys */}
          {activeTab === 5 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" gutterBottom>API Keys</Typography>
                  <Button variant="contained" size="small">
                    Generate New Key
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 2,
                    }}
                  >
                    <ListItemText
                      primary="Production API Key"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="body2" fontFamily="monospace">
                            sk_prod_••••••••••••••••
                          </Typography>
                          <Chip label="Active" size="small" color="success" />
                        </Box>
                      }
                    />
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                      Copy
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Revoke
                    </Button>
                  </ListItem>

                  <ListItem
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText
                      primary="Development API Key"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="body2" fontFamily="monospace">
                            sk_dev_••••••••••••••••
                          </Typography>
                          <Chip label="Active" size="small" color="success" />
                        </Box>
                      }
                    />
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                      Copy
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Revoke
                    </Button>
                  </ListItem>
                </List>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    Keep your API keys secure. Never share them in public repositories or client-side code.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Billing */}
          {activeTab === 6 && (
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Billing & Subscription
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Current Plan
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: 'primary.main',
                        borderRadius: 1,
                        bgcolor: 'action.hover',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6">Enterprise Plan</Typography>
                          <Typography variant="body2" color="text.secondary">
                            For large organizations with advanced needs
                          </Typography>
                        </Box>
                        <Typography variant="h5" color="primary">
                          $99/month
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Chip label="Active" color="success" size="small" sx={{ mr: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          Next billing date: January 1, 2026
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Payment Method
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CreditCard size={24} />
                        <Box>
                          <Typography variant="body1">•••• •••• •••• 4242</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Expires 12/2026
                          </Typography>
                        </Box>
                      </Box>
                      <Button variant="outlined" size="small">
                        Update
                      </Button>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Billing History
                    </Typography>
                    <List sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                      <ListItem>
                        <ListItemText primary="December 2025" secondary="$99.00 - Paid" />
                        <Button size="small" variant="text">
                          View Invoice
                        </Button>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText primary="November 2025" secondary="$99.00 - Paid" />
                        <Button size="small" variant="text">
                          View Invoice
                        </Button>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText primary="October 2025" secondary="$99.00 - Paid" />
                        <Button size="small" variant="text">
                          View Invoice
                        </Button>
                      </ListItem>
                    </List>
                  </Box>

                  <Box>
                    <Button variant="outlined" color="warning">
                      Change Plan
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Danger Zone */}
          {activeTab === 7 && (
            <Card variant="outlined" sx={{ borderColor: 'error.main' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }} color="error">
                  Danger Zone
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Alert severity="error">
                    <Typography variant="body2">
                      Actions in this section are permanent and cannot be undone. Proceed with caution.
                    </Typography>
                  </Alert>

                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Transfer Organization Ownership
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Transfer ownership of this organization to another member
                    </Typography>
                    <Button variant="outlined" color="warning">
                      Transfer Ownership
                    </Button>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Delete Organization
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Permanently delete this organization and all its data, including all projects, members,
                      and settings. This action cannot be undone.
                    </Typography>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>Warning:</strong> This will delete all data associated with this organization.
                        Make sure you have exported any important data before proceeding.
                      </Typography>
                    </Alert>
                    <Button variant="contained" color="error" startIcon={<Trash2 size={18} />}>
                      Delete Organization
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  )
}
