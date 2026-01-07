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

import { Box, Button, Form, IconButton, InputAdornment } from '@wso2/oxygen-ui'
import type { JSX } from 'react'
import { useState } from 'react'
import { BoxIcon, CheckIcon, CircleQuestionMark, GitBranchIcon, PencilIcon } from '@wso2/oxygen-ui-icons-react'

export default function IntegrationWizard(): JSX.Element {
  // Form state
  const [organization, setOrganization] = useState('wso2-oxigen')
  const [repository, setRepository] = useState('')
  const [branch, setBranch] = useState('main')
  const [componentDirectory, setComponentDirectory] = useState('/')
  const [displayName, setDisplayName] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const buildPresets = [
    { id: 'python', label: 'Python' },
    { id: 'java', label: 'Java' },
    { id: 'nodejs', label: 'NodeJS' },
    { id: 'go', label: 'Go' },
    { id: 'dotnet', label: '.NET' },
    { id: 'ballerina', label: 'Ballerina' },
    { id: 'php', label: 'PHP' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'docker', label: 'Docker' },
    { id: 'wso2mi', label: 'WSO2 MI' },
    { id: 'prismmock', label: 'Prism Mock' },
  ]

  const handleDeploy = () => {
    console.log('Deploying integration...', {
      organization,
      repository,
      branch,
      componentDirectory,
      displayName,
      name,
      description,
      selectedPreset,
    })
    alert('Integration deployed successfully!')
  }

  return (
    <Form.Stack spacing={4}>
      {/* Repository Details Section */}
      <Form.Section>
        <Form.Subheader>Repository Details</Form.Subheader>
        <Form.Body>Configure your repository settings for deployment</Form.Body>
        <Form.Stack direction="row">
          <Form.SelectInput
            label="Organization"
            name="organization"
            value={organization}
            onChange={e => setOrganization(e.target.value as string)}
          >
            <Form.MenuItem value="wso2-oxigen">wso2-oxigen</Form.MenuItem>
            <Form.MenuItem value="wso2">wso2</Form.MenuItem>
            <Form.MenuItem value="asgardeo">asgardeo</Form.MenuItem>
          </Form.SelectInput>
          <Form.SelectInput
            label="Repository"
            name="repository"
            value={repository}
            onChange={e => setRepository(e.target.value as string)}
          >
            <Form.MenuItem value="">Select a repository</Form.MenuItem>
            <Form.MenuItem value="integration-app">integration-app</Form.MenuItem>
            <Form.MenuItem value="banking-integration">banking-integration</Form.MenuItem>
            <Form.MenuItem value="ecommerce-integration">ecommerce-integration</Form.MenuItem>
          </Form.SelectInput>
          <Form.SelectInput
            label="Branch"
            name="branch"
            value={branch}
            onChange={e => setBranch(e.target.value as string)}
            startAdornment={
              <InputAdornment position="start">
                <GitBranchIcon size={16} />
              </InputAdornment>
            }
          >
            <Form.MenuItem value="main">main</Form.MenuItem>
            <Form.MenuItem value="develop">develop</Form.MenuItem>
            <Form.MenuItem value="staging">staging</Form.MenuItem>
          </Form.SelectInput>
          <Form.TextInput
            label="Component Directory"
            name="componentDirectory"
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
          />
        </Form.Stack>
      </Form.Section>

      {/* Component Details Section */}
      <Form.Section>
        <Form.Subheader>Component Details</Form.Subheader>
        <Form.Body>Provide information about your integration component</Form.Body>
        <Form.Stack direction="row" spacing={2}>
          <Form.TextInput
            label="Display Name"
            name="displayName"
            placeholder="Enter display name here"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <Form.TextInput
            label="Name"
            name="name"
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
          />
          <Form.TextInput
            label="Description"
            name="description"
            placeholder="Enter description here"
            value={description}
            onChange={e => setDescription(e.target.value)}
            multiline
            minRows={1}
          />
        </Form.Stack>
      </Form.Section>

      {/* Build Configuration Section */}
      <Form.Section>
        <Form.Subheader>Build Configuration</Form.Subheader>
        <Form.Body>Select a build preset for your integration</Form.Body>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {buildPresets.map(preset => (
            <Form.CardButton
              key={preset.id}
              onClick={() => setSelectedPreset(preset.id)}
              sx={{ width: 200 }}
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
                    <BoxIcon size={32} />
                    <Form.Body>{preset.label}</Form.Body>
                  </Form.Stack>
                }
              />
            </Form.CardButton>
          ))}
        </Box>
      </Form.Section>

      {/* Action Buttons */}
      <Form.Stack direction="row">
        <Button variant="text" size="large">
          Cancel
        </Button>
        <Button variant="contained" endIcon={<CheckIcon size={16} />} size="large" onClick={handleDeploy}>
          Deploy Integration
        </Button>
      </Form.Stack>
    </Form.Stack>
  )
}
