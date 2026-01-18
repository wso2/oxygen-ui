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

import { Box, Button, Form, IconButton, InputAdornment, TextField, Select, MenuItem } from '@wso2/oxygen-ui';
import type { JSX } from 'react';
import { useState } from 'react';
import { BoxIcon, CheckIcon, CircleQuestionMark, GitBranchIcon, PencilIcon } from '@wso2/oxygen-ui-icons-react';

export default function IntegrationWizard(): JSX.Element {
  // Form state
  const [organization, setOrganization] = useState('wso2-oxigen');
  const [repository, setRepository] = useState('');
  const [branch, setBranch] = useState('main');
  const [componentDirectory, setComponentDirectory] = useState('/');
  const [displayName, setDisplayName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

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
  ];

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
    alert('Integration deployed successfully!');
  };

  return (
    <Form.Stack spacing={4}>
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
              <MenuItem value="wso2-oxigen">wso2-oxigen</MenuItem>
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
              <MenuItem value="">Select a repository</MenuItem>
              <MenuItem value="integration-app">integration-app</MenuItem>
              <MenuItem value="banking-integration">banking-integration</MenuItem>
              <MenuItem value="ecommerce-integration">ecommerce-integration</MenuItem>
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
        <Form.Body>Provide information about your integration component</Form.Body>
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

      {/* Build Configuration Section */}
      <Form.Section>
        <Form.Subheader>Build Configuration</Form.Subheader>
        <Form.Body>Select a build preset for your integration</Form.Body>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {buildPresets.map(preset => (
            <Form.CardButton
              key={preset.id}
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
