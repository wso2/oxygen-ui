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

import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Button,
  IconButton,
  InputAdornment,
  Box,
  Form,
  TextField,
  Select,
  MenuItem,
  Typography,
  Stack,
} from '@wso2/oxygen-ui'
import {
  CircleQuestionMark,
  PencilIcon,
  GitBranchIcon,
  BoxIcon,
  ExternalLinkIcon,
} from '@wso2/oxygen-ui-icons-react'

const meta: Meta = {
  title: 'Templates/Create Service Form',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// Build preset data
const buildPresets = [
  { id: 'python', label: 'Python', icon: <BoxIcon size={32} /> },
  { id: 'java', label: 'Java', icon: <BoxIcon size={32} /> },
  { id: 'nodejs', label: 'NodeJS', icon: <BoxIcon size={32} /> },
  { id: 'go', label: 'Go', icon: <BoxIcon size={32} /> },
  { id: 'dotnet', label: '.NET', icon: <BoxIcon size={32} /> },
  { id: 'ballerina', label: 'Ballerina', icon: <BoxIcon size={32} /> },
  { id: 'php', label: 'PHP', icon: <BoxIcon size={32} /> },
  { id: 'ruby', label: 'Ruby', icon: <BoxIcon size={32} /> },
  { id: 'docker', label: 'Docker', icon: <BoxIcon size={32} /> },
  { id: 'wso2mi', label: 'WSO2 MI', icon: <BoxIcon size={32} /> },
  { id: 'prismmock', label: 'Prism Mock', icon: <BoxIcon size={32} /> },
]

export const Default: Story = {
  render: () => {
    const [organization, setOrganization] = useState('wso2-oxigen')
    const [repository, setRepository] = useState('banking-app')
    const [branch, setBranch] = useState('main')
    const [componentDirectory, setComponentDirectory] = useState('/')
    const [displayName, setDisplayName] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

    return (
      <Form.Stack spacing={4} sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <Form.Header>Create a Service</Form.Header>
        {/* Repository Details Section */}
        <Form.Section>
          <Form.Subheader>Repository Details</Form.Subheader>
          <Form.Body>Configure your repository settings for deployment</Form.Body>
          <Form.Stack direction="row">
            <Form.ElementWrapper label="Organization" name="organization">
              <Select
                id="organization"
                value={organization}
                onChange={e => setOrganization(e.target.value as string)}
                fullWidth
              >
                <MenuItem value="wso2">wso2</MenuItem>
                <MenuItem value="asgardeo">asgardeo</MenuItem>
              </Select>
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Repository" name="repository">
              <Select
                id="repository"
                value={repository}
                onChange={e => setRepository(e.target.value as string)}
                fullWidth
              >
                <MenuItem value="banking-app">banking-app</MenuItem>
                <MenuItem value="ecommerce-service">ecommerce-service</MenuItem>
                <MenuItem value="auth-service">auth-service</MenuItem>
              </Select>
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Branch" name="branch">
              <Select
                id="branch"
                value={branch}
                onChange={e => setBranch(e.target.value as string)}
                startAdornment={
                  <InputAdornment position="start">
                    <GitBranchIcon size={16} />
                  </InputAdornment>
                }
                fullWidth
              >
                <MenuItem value="main">main</MenuItem>
                <MenuItem value="develop">develop</MenuItem>
                <MenuItem value="staging">staging</MenuItem>
              </Select>
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Component Directory" name="componentDirectory">
              <TextField
                id="componentDirectory"
                value={componentDirectory}
                onChange={e => setComponentDirectory(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" edge="end">
                          <PencilIcon size={16} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
              />
            </Form.ElementWrapper>
          </Form.Stack>
        </Form.Section>
        {/* Component Details Section */}
        <Form.Section>
          <Form.Subheader>Component Details</Form.Subheader>
          <Form.Stack direction="row" spacing={2}>
            <Form.ElementWrapper label="Display Name" name="displayName">
              <TextField
                id="displayName"
                placeholder="Enter display name here"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                fullWidth
              />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Name" name="name">
              <TextField
                id="name"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <CircleQuestionMark size={16} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
              />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Description" name="description">
              <TextField
                id="description"
                placeholder="Enter description here"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                minRows={1}
                fullWidth
              />
            </Form.ElementWrapper>
          </Form.Stack>
        </Form.Section>
        {/* Build Details Section */}
        <Form.Section>
          <Form.Subheader>Build Details</Form.Subheader>
          <Form.Body>Build Presets</Form.Body>
          <Form.Stack spacing={2}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {buildPresets.map(preset => (
                <Form.CardButton
                  key={preset.id}
                  sx={{ width: 200 }}
                  onClick={() => setSelectedPreset(preset.id)}
                  selected={selectedPreset === preset.id}
                >
                  <Form.CardHeader
                    title={
                      <Form.Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {preset.icon}
                        <Form.Body>{preset.label}</Form.Body>
                      </Form.Stack>
                    }
                  />
                </Form.CardButton>
              ))}
            </Box>
          </Form.Stack>
        </Form.Section>
        {/* Action Buttons */}
        <Form.Stack direction="row">
          <Button variant="text" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large">
            Create and Deploy
          </Button>
        </Form.Stack>
      </Form.Stack>
    )
  },
}
