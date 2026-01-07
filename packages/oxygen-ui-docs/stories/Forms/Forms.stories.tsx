/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Stack,
  Tooltip,
  Container,
  Link,
  Paper,
  Alert,
  CodeBlock,
} from '@wso2/oxygen-ui'
import {
  CircleQuestionMark,
  PencilIcon,
  GitBranchIcon,
  BoxIcon,
  ArrowRightIcon,
  Calculator,
  ExternalLinkIcon,
  WSO2,
  AxeIcon,
  Circle,
  GitHub,
} from '@wso2/oxygen-ui-icons-react'
import { Form } from '@wso2/oxygen-ui'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/**
 * Comprehensive form templates and patterns for various use cases.
 * This collection includes creation flows, clickable cards, source selection interfaces, and form sections.
 *
 * Built using MUI components like TextField, Select, Button, Card, and Stack for layout.
 * Read more at: https://mui.com/material-ui/getting-started/
 */
const meta: Meta = {
  title: 'Templates/Forms',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive collection of form templates and patterns. \n\n' +
          'Includes multi-section forms, clickable cards, source selection interfaces, and more. \n\n' +
          'Built using MUI TextField, Select, Button, Card, and Stack components for clean layout organization.',
      },
    },
  },
  tags: ['autodocs'],
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

// Sample App Card Component
const SampleAppCard = ({
  icon,
  title,
  subtitle,
  description,
  onQuickDeploy,
  onViewSource,
  hasQuickDeploy = true,
}: {
  icon?: React.ReactNode
  title: string
  subtitle: string
  description: string
  onQuickDeploy?: () => void
  onViewSource?: () => void
  hasQuickDeploy?: boolean
}) => (
  <Form.CardButton>
    <Form.CardContent>
      <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
        {<Box>{icon}</Box>}
        <Stack spacing={1}>
          <Typography
            variant="h6"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            maxWidth="70%"
          >
            {title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="caption">{description}</Typography>
    </Form.CardContent>
    <Form.CardActions>
      {hasQuickDeploy && (
        <Button variant="outlined" size="small" onClick={onQuickDeploy}>
          Quick Deploy
        </Button>
      )}
      <Button
        variant="text"
        size="small"
        endIcon={<ExternalLinkIcon size={16} />}
        onClick={onViewSource}
      >
        Source
      </Button>
    </Form.CardActions>
  </Form.CardButton>
)

/**
 * Create Service Form - A comprehensive multi-section form for service creation flows
 */
export const CreateServiceForm: Story = {
  render: () => {
    const [organization, setOrganization] = useState('rasika2012')
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
            <Form.SelectInput
              label="Organization"
              name="organization"
              value={organization}
              onChange={e => setOrganization(e.target.value as string)}
            >
              <Form.MenuItem value="wso2">wso2</Form.MenuItem>
              <Form.MenuItem value="asgardeo">asgardeo</Form.MenuItem>
            </Form.SelectInput>
            <Form.SelectInput
              label="Repository"
              name="repository"
              value={repository}
              onChange={e => setRepository(e.target.value as string)}
            >
              <Form.MenuItem value="banking-app">banking-app</Form.MenuItem>
              <Form.MenuItem value="ecommerce-service">ecommerce-service</Form.MenuItem>
              <Form.MenuItem value="auth-service">auth-service</Form.MenuItem>
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
        {/* Build Details Section */}
        <Form.Section>
          <Form.Subheader>Build Details</Form.Subheader>
          <Form.Body>Build Presets</Form.Body>
          <Form.Stack spacing={2}>
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

/**
 * Form Section - A simple section component example
 */
export const Section: Story = {
  render: () => {
    return (
      <Form.Section>
        <Form.Header>Create a Service</Form.Header>
        <Form.Stack>
          <Form.Subheader>Repository Details</Form.Subheader>
          <Form.Body>Configure your repository settings for deployment</Form.Body>
        </Form.Stack>
      </Form.Section>
    )
  },
}

/**
 * Clickable Card - Default simple card with icon and action
 */
export const ClickableCard: Story = {
  render: () => (
    <Form.CardButton>
      <Form.CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <WSO2 size={24} />
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              Service
            </Typography>
            <Form.DisappearingCardButtonContent>
              <Tooltip title="What is this?">
                <CircleQuestionMark size={16} />
              </Tooltip>
            </Form.DisappearingCardButtonContent>
          </Stack>
        }
      />
      <Form.CardContent>
        <Typography variant="caption">
          A backend component that exposes logic via REST, gRPC, or GraphQL endpoints.
        </Typography>
      </Form.CardContent>
      <Form.CardActions>
        <Button variant="outlined" size="small" endIcon={<ArrowRightIcon size={16} />}>
          Select
        </Button>
      </Form.CardActions>
    </Form.CardButton>
  ),
}

/**
 * Clickable Card with Multiple Actions
 */
export const ClickableCardWithMultipleActions: Story = {
  render: () => (
    <Form.CardButton>
      <CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Calculator size={48} />
            <Stack direction="column">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="h5"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  maxWidth="70%"
                >
                  Reading List REST Service in Go
                </Typography>
                <Form.DisappearingCardButtonContent>
                  <Tooltip title="What is this?">
                    <CircleQuestionMark size={16} />
                  </Tooltip>
                </Form.DisappearingCardButtonContent>
              </Stack>
              <Typography variant="caption" color="textPrimary">
                Service &nbsp;
                <Typography variant="caption" color="textSecondary">
                  (Docker)
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        }
      />
      <CardContent>
        <Typography variant="caption">A simple REST API service written in Go</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small">
          Quick Deploy
        </Button>
        <Button variant="text" size="small" endIcon={<ExternalLinkIcon size={16} />}>
          Source
        </Button>
      </CardActions>
    </Form.CardButton>
  ),
}

/**
 * Source Selection - Full page template for selecting deployment source
 */
export const SourceSelection: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Create a Web Application
            </Typography>
            <Typography variant="body1">
              Connect your source code from an existing Git Repository or select one of our samples.
            </Typography>
          </Box>
          {/* Main Content */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Left Column - Connect Options */}
            <Box sx={{ flex: { xs: '1', md: '0 0 40%' } }}>
              <Stack spacing={2}>
                {/* Git Repository Section */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Connect a Git Repository
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<GitHub size={24} />}
                      onClick={() => console.log('Connect GitHub')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      Continue With GitHub
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GitHub size={24} />}
                      onClick={() => console.log('Use Public Repo')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      Use Public GitHub Repository
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<BoxIcon size={24} />}
                      onClick={() => console.log('Different Provider')}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      Different Provider
                    </Button>
                  </Stack>
                </Box>
                {/* Docker Image Section */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Connect a Docker Image
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<BoxIcon size={24} />}
                    onClick={() => console.log('Container Registry')}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    Container Registry
                  </Button>
                </Box>
              </Stack>
            </Box>

            {/* Right Column - Sample Applications */}
            <Paper sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Get started with a sample</Typography>
                </Stack>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <SampleAppCard
                    icon={<BoxIcon size={32} />}
                    title="Angular Single Page Application"
                    subtitle="Web Application (Angular)"
                    description="Simple Angular Single Page Web Application"
                    onQuickDeploy={() => console.log('Deploy Angular')}
                    onViewSource={() => console.log('View Angular Source')}
                  />

                  <SampleAppCard
                    icon={<Circle size={32} />}
                    title="Vue Single Page Application"
                    subtitle="Web Application (Vue)"
                    description="Simple Vue Single Page Web Application"
                    onQuickDeploy={() => console.log('Deploy Vue')}
                    onViewSource={() => console.log('View Vue Source')}
                  />

                  <SampleAppCard
                    icon={<AxeIcon size={32} />}
                    title="React Single Page Application"
                    subtitle="Web Application (React)"
                    description="Simple React Single Page Web Application"
                    onQuickDeploy={() => console.log('Deploy React')}
                    onViewSource={() => console.log('View React Source')}
                  />

                  <SampleAppCard
                    icon={<BoxIcon size={32} />}
                    title="Hello World Web in PHP"
                    subtitle="Web Application (PHP)"
                    description="A Hello World web app created using PHP"
                    hasQuickDeploy={false}
                    onViewSource={() => console.log('View PHP Source')}
                  />
                </Box>

                <Box>
                  <Link
                    href="#"
                    underline="hover"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      console.log('View All Samples')
                    }}
                  >
                    View All Samples
                  </Link>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  ),
}

// ========================================
// Individual Component Stories
// ========================================

/**
 * TextInput - Basic text input with label
 */
export const TextInputBasic: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.TextInput
          label="Display Name"
          name="displayName"
          placeholder="Enter display name"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Box>
    )
  },
}

/**
 * TextInput - With icon adornment
 */
export const TextInputWithAdornment: Story = {
  render: () => {
    const [value, setValue] = useState('/')
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.TextInput
          label="Component Directory"
          name="componentDirectory"
          value={value}
          onChange={e => setValue(e.target.value)}
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
      </Box>
    )
  },
}

/**
 * TextInput - Multiline textarea
 */
export const TextInputMultiline: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.TextInput
          label="Description"
          name="description"
          placeholder="Enter description here"
          value={value}
          onChange={e => setValue(e.target.value)}
          multiline
          minRows={3}
        />
      </Box>
    )
  },
}

/**
 * SelectInput - Basic select dropdown
 */
export const SelectInputBasic: Story = {
  render: () => {
    const [value, setValue] = useState('wso2')
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.SelectInput
          label="Organization"
          name="organization"
          value={value}
          onChange={e => setValue(e.target.value as string)}
        >
          <Form.MenuItem value="wso2">wso2</Form.MenuItem>
          <Form.MenuItem value="asgardeo">asgardeo</Form.MenuItem>
          <Form.MenuItem value="choreo">choreo</Form.MenuItem>
        </Form.SelectInput>
      </Box>
    )
  },
}

/**
 * SelectInput - With icon adornment
 */
export const SelectInputWithIcon: Story = {
  render: () => {
    const [value, setValue] = useState('main')
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.SelectInput
          label="Branch"
          name="branch"
          value={value}
          onChange={e => setValue(e.target.value as string)}
          startAdornment={
            <InputAdornment position="start">
              <GitBranchIcon size={16} />
            </InputAdornment>
          }
        >
          <Form.MenuItem value="main">main</Form.MenuItem>
          <Form.MenuItem value="develop">develop</Form.MenuItem>
          <Form.MenuItem value="staging">staging</Form.MenuItem>
          <Form.MenuItem value="production">production</Form.MenuItem>
        </Form.SelectInput>
      </Box>
    )
  },
}

/**
 * AutocompleteInput - Basic autocomplete with search
 */
export const AutocompleteInputBasic: Story = {
  render: () => {
    const options = ['React', 'Vue', 'Angular', 'Svelte', 'Ember', 'Backbone']
    const [value, setValue] = useState<string | null>(null)
    
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.AutocompleteInput
          label="Framework"
          name="framework"
          placeholder="Select a framework"
          options={options}
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        />
      </Box>
    )
  },
}

/**
 * AutocompleteInput - Multiple selection
 */
export const AutocompleteInputMultiple: Story = {
  render: () => {
    const options = ['Python', 'Java', 'JavaScript', 'Go', 'Rust', 'C++', 'Ruby', 'PHP']
    const [value, setValue] = useState<string[]>([])
    
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Form.AutocompleteInput
          label="Programming Languages"
          name="languages"
          placeholder="Select languages"
          options={options}
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          multiple
        />
      </Box>
    )
  },
}

/**
 * Typography - Header component (h4 variant)
 */
export const TypographyHeader: Story = {
  render: () => (
    <Form.Header>Create a Service</Form.Header>
  ),
}

/**
 * Typography - Subheader component (h5 variant)
 */
export const TypographySubheader: Story = {
  render: () => (
    <Form.Subheader>Repository Details</Form.Subheader>
  ),
}

/**
 * Typography - Body component (body2 variant)
 */
export const TypographyBody: Story = {
  render: () => (
    <Form.Body>Configure your repository settings for deployment</Form.Body>
  ),
}

/**
 * Stack - Vertical layout with spacing
 */
export const StackVertical: Story = {
  render: () => (
    <Form.Stack>
      <Form.Header>Title</Form.Header>
      <Form.Subheader>Subtitle</Form.Subheader>
      <Form.Body>This is body text with consistent spacing between elements.</Form.Body>
      <Button variant="contained">Action Button</Button>
    </Form.Stack>
  ),
}

/**
 * Stack - Horizontal layout
 */
export const StackHorizontal: Story = {
  render: () => {
    const [org, setOrg] = useState('wso2')
    const [repo, setRepo] = useState('banking-app')
    
    return (
      <Form.Stack direction="row" sx={{ maxWidth: 800 }}>
        <Form.SelectInput
          label="Organization"
          name="organization"
          value={org}
          onChange={e => setOrg(e.target.value as string)}
        >
          <Form.MenuItem value="wso2">wso2</Form.MenuItem>
          <Form.MenuItem value="asgardeo">asgardeo</Form.MenuItem>
        </Form.SelectInput>
        <Form.SelectInput
          label="Repository"
          name="repository"
          value={repo}
          onChange={e => setRepo(e.target.value as string)}
        >
          <Form.MenuItem value="banking-app">banking-app</Form.MenuItem>
          <Form.MenuItem value="ecommerce-service">ecommerce-service</Form.MenuItem>
        </Form.SelectInput>
      </Form.Stack>
    )
  },
}

/**
 * CardButton - Basic selectable card
 */
export const CardButtonBasic: Story = {
  render: () => {
    const [selected, setSelected] = useState(false)
    
    return (
      <Box sx={{ maxWidth: 200 }}>
        <Form.CardButton
          onClick={() => setSelected(!selected)}
          selected={selected}
        >
          <Form.CardHeader
            title={
              <Form.Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <BoxIcon size={32} />
                <Form.Body>Python</Form.Body>
              </Form.Stack>
            }
          />
        </Form.CardButton>
      </Box>
    )
  },
}

/**
 * CardButton - Grid of selectable cards
 */
export const CardButtonGrid: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    const options = [
      { id: 'python', label: 'Python' },
      { id: 'java', label: 'Java' },
      { id: 'nodejs', label: 'NodeJS' },
      { id: 'go', label: 'Go' },
    ]
    
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, maxWidth: 600 }}>
        {options.map(option => (
          <Form.CardButton
            key={option.id}
            onClick={() => setSelected(option.id)}
            sx={{ width: 150 }}
            selected={selected === option.id}
          >
            <Form.CardHeader
              title={
                <Form.Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <BoxIcon size={24} />
                  <Form.Body>{option.label}</Form.Body>
                </Form.Stack>
              }
            />
          </Form.CardButton>
        ))}
      </Box>
    )
  },
}

// ========================================
// React Hook Form + Yup Validation Example
// ========================================

/**
 * Form Validation with React Hook Form and Yup
 * 
 * This example demonstrates how to integrate react-hook-form with yup validation schema.
 * 
 * **Key Concepts:**
 * 
 * 1. **Yup Schema Definition**: Define validation rules using yup schema
 * 2. **useForm Hook**: Initialize form with yupResolver for validation
 * 3. **Controller Component**: Wrap custom components to integrate with react-hook-form
 * 4. **Error Handling**: Display validation errors from form state
 * 5. **Form Submission**: Handle validated form data on submit
 * 
 * **Installation Required:**
 * ```bash
 * npm install react-hook-form yup @hookform/resolvers
 * ```
 * 
 * **Learn More:**
 * - React Hook Form: https://react-hook-form.com/
 * - Yup Validation: https://github.com/jquense/yup
 */
export const FormValidationExample: Story = {
  render: () => {
    // Define validation schema using Yup
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
      username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .required('Username is required'),
      password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        )
        .required('Password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      organization: yup
        .string()
        .required('Organization is required'),
      frameworks: yup
        .array()
        .min(1, 'Select at least one framework')
        .required('Frameworks are required'),
      agreeToTerms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
    })

    // Initialize react-hook-form with yup resolver
    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting, isValid },
      reset,
    } = useForm({
      resolver: yupResolver(validationSchema),
      mode: 'onChange', // Validate on change
      defaultValues: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        organization: '',
        frameworks: [],
        agreeToTerms: false,
      },
    })

    const [submittedData, setSubmittedData] = useState<any>(null)

    // Handle form submission
    const onSubmit = (data: any) => {
      console.log('Form submitted with data:', data)
      setSubmittedData(data)
      // Simulate API call
      setTimeout(() => {
        alert('Registration successful!')
        reset()
        setSubmittedData(null)
      }, 1000)
    }

    const frameworkOptions = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js']

    return (
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
        <Form.Stack spacing={3}>
          <Box>
            <Form.Header>User Registration Form</Form.Header>
            <Form.Body>
              Example of form validation using React Hook Form and Yup validation schema
            </Form.Body>
          </Box>

          <Form.Section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Stack spacing={3}>
                {/* Email Input */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Form.TextInput
                      {...field}
                      label="Email Address"
                      placeholder="user@example.com"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                {/* Username Input */}
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Form.TextInput
                      {...field}
                      label="Username"
                      placeholder="Enter username"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />

                {/* Password Inputs */}
                <Form.Stack direction="row" spacing={2}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Form.TextInput
                        {...field}
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Form.TextInput
                        {...field}
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                      />
                    )}
                  />
                </Form.Stack>

                {/* Organization Select */}
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <Form.SelectInput
                        {...field}
                        label="Organization"
                        error={!!errors.organization}
                      >
                        <Form.MenuItem value="">Select an organization</Form.MenuItem>
                        <Form.MenuItem value="wso2">WSO2</Form.MenuItem>
                        <Form.MenuItem value="asgardeo">Asgardeo</Form.MenuItem>
                        <Form.MenuItem value="choreo">Choreo</Form.MenuItem>
                      </Form.SelectInput>
                      {errors.organization && (
                        <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                          {errors.organization?.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />

                {/* Frameworks Autocomplete */}
                <Controller
                  name="frameworks"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Box>
                      <Form.AutocompleteInput
                        label="Frameworks"
                        name="frameworks"
                        placeholder="Select frameworks"
                        options={frameworkOptions}
                        value={value}
                        onChange={(_, newValue) => onChange(newValue)}
                        multiple
                      />
                      {errors.frameworks && (
                        <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                          {errors.frameworks?.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />

                {/* Form Actions */}
                <Form.Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="text"
                    size="large"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                  </Button>
                </Form.Stack>
              </Form.Stack>
            </form>
          </Form.Section>

          {/* Display submitted data */}
          {submittedData && (
            <Alert severity="success">
              <Typography variant="h6" gutterBottom>
                Form Submitted Successfully!
              </Typography>
              <Typography variant="body2" component="pre" sx={{ mt: 1 }}>
                {JSON.stringify(submittedData, null, 2)}
              </Typography>
            </Alert>
          )}

          {/* Code Example Documentation */}
          <Form.Section>
            <Form.Subheader>Code Example</Form.Subheader>
            <CodeBlock
              language="typescript"
              code={`// 1. Define Yup validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, 'Must contain uppercase, lowercase, and number')
    .required('Password is required'),
})

// 2. Initialize useForm with yupResolver
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
  mode: 'onChange',
  defaultValues: {
    email: '',
    username: '',
    password: '',
  },
})

// 3. Wrap form inputs with Controller
<Controller
  name="email"
  control={control}
  render={({ field }) => (
    <Form.TextInput
      {...field}
      label="Email"
      error={!!errors.email}
      helperText={errors.email?.message}
    />
  )}
/>

// 4. Handle form submission
const onSubmit = (data) => {
  console.log('Valid form data:', data)
  // Process form data
}

<form onSubmit={handleSubmit(onSubmit)}>
  {/* Form fields */}
  <Button type="submit">Submit</Button>
</form>`}
            />
          </Form.Section>

          {/* Best Practices */}
          <Form.Section>
            <Form.Subheader>Best Practices</Form.Subheader>
            <Stack spacing={1}>
              <Typography variant="body2">
                • <strong>Validation Mode:</strong> Use <code>mode: 'onChange'</code> for real-time validation
                or <code>mode: 'onBlur'</code> for validation on field blur
              </Typography>
              <Typography variant="body2">
                • <strong>Error Display:</strong> Always show clear, user-friendly error messages
              </Typography>
              <Typography variant="body2">
                • <strong>Submit Button:</strong> Disable submit button when form is invalid or submitting
              </Typography>
              <Typography variant="body2">
                • <strong>Default Values:</strong> Always provide default values to avoid uncontrolled component warnings
              </Typography>
              <Typography variant="body2">
                • <strong>Schema Reusability:</strong> Define validation schemas separately for reuse across forms
              </Typography>
              <Typography variant="body2">
                • <strong>Custom Validation:</strong> Use <code>.test()</code> method in Yup for complex custom validations
              </Typography>
            </Stack>
          </Form.Section>
        </Form.Stack>
      </Box>
    )
  },
}

