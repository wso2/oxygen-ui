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
  Alert,
  CodeBlock,
  Form,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
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
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

// ========================================
// Wizard Component Stories
// ========================================

/**
 * Wizard - Basic multi-step wizard
 */
export const WizardBasic: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0)

    const steps = [
      {
        label: 'Select Campaign Type',
        component: (
          <Form.Stack spacing={2} flexGrow={1}>
            <Form.Header>Select Campaign Type</Form.Header>
            <Form.Body>Choose the type of campaign you want to create</Form.Body>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ width: 200 }}>
                <Form.CardButton>
                  <Form.CardContent>
                    <Typography variant="h6">Email Campaign</Typography>
                    <Typography variant="caption">Send emails to your subscribers</Typography>
                  </Form.CardContent>
                </Form.CardButton>
              </Box>
              <Box sx={{ width: 200 }}>
                <Form.CardButton>
                  <Form.CardContent>
                    <Typography variant="h6">SMS Campaign</Typography>
                    <Typography variant="caption">Send SMS to your contacts</Typography>
                  </Form.CardContent>
                </Form.CardButton>
              </Box>
            </Box>
          </Form.Stack>
        ),
      },
      {
        label: 'Campaign Details',
        component: (
          <Form.Stack spacing={2} flexGrow={1}>
            <Form.Header>Campaign Details</Form.Header>
            <Form.ElementWrapper label="Campaign Name" name="campaignName">
              <TextField id="campaignName" placeholder="Enter campaign name" fullWidth />
            </Form.ElementWrapper>
            <Form.ElementWrapper label="Description" name="description">
              <TextField
                id="description"
                placeholder="Enter description"
                multiline
                minRows={3}
                fullWidth
              />
            </Form.ElementWrapper>
          </Form.Stack>
        ),
      },
      {
        label: 'Review & Launch',
        component: (
          <Form.Stack spacing={2} flexGrow={1}>
            <Form.Header>Review & Launch</Form.Header>
            <Form.Body>Review your campaign details before launching</Form.Body>
            <Alert severity="success">
              <Typography variant="body2">Your campaign is ready to launch!</Typography>
            </Alert>
          </Form.Stack>
        ),
      },
    ]

    return (
      <Box sx={{ maxWidth: 800, margin: 'auto' }}>
        <Form.Wizard
          steps={steps}
          activeStep={activeStep}
          actions={
            <Form.Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button
                variant="text"
                onClick={() => setActiveStep(prev => prev - 1)}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    alert('Campaign Launched!')
                    setActiveStep(0)
                  } else {
                    setActiveStep(prev => prev + 1)
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 'Launch' : 'Next'}
              </Button>
            </Form.Stack>
          }
        />
      </Box>
    )
  },
}

// ========================================
// React Hook Form + Yup Validation Example
// ========================================

/**
 * Form Validation with React Hook Form and Zod
 *
 * This example demonstrates how to integrate react-hook-form with zod validation schema.
 *
 * **Key Concepts:**
 *
 * 1. **Zod Schema Definition**: Define validation rules using zod schema
 * 2. **useForm Hook**: Initialize form with zodResolver for validation
 * 3. **Controller Component**: Wrap custom components to integrate with react-hook-form
 * 4. **Error Handling**: Display validation errors from form state
 * 5. **Form Submission**: Handle validated form data on submit
 *
 * **Installation Required:**
 * ```bash
 * npm install react-hook-form zod @hookform/resolvers
 * ```
 *
 * **Learn More:**
 * - React Hook Form: https://react-hook-form.com/
 * - Zod Validation: https://zod.dev/
 */
export const FormValidationExample: Story = {
  render: () => {
    // Define validation schema using Zod
    const validationSchema = z
      .object({
        email: z.string().min(1, 'Email is required').email('Invalid email format'),
        username: z
          .string()
          .min(1, 'Username is required')
          .min(3, 'Username must be at least 3 characters')
          .max(20, 'Username must not exceed 20 characters'),
        password: z
          .string()
          .min(1, 'Password is required')
          .min(8, 'Password must be at least 8 characters')
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
        organization: z.string().min(1, 'Organization is required'),
        frameworks: z.array(z.string()).min(1, 'Select at least one framework'),
        agreeToTerms: z
          .boolean()
          .refine(val => val === true, 'You must accept the terms and conditions'),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
      })

    // Initialize react-hook-form with zod resolver
    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting, isValid },
      reset,
    } = useForm<z.infer<typeof validationSchema>>({
      resolver: zodResolver(validationSchema),
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
                    <Form.ElementWrapper label="Email Address" name="email">
                      <TextField
                        {...field}
                        id="email"
                        placeholder="user@example.com"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                      />
                    </Form.ElementWrapper>
                  )}
                />

                {/* Username Input */}
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Form.ElementWrapper label="Username" name="username">
                      <TextField
                        {...field}
                        id="username"
                        placeholder="Enter username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        fullWidth
                      />
                    </Form.ElementWrapper>
                  )}
                />

                {/* Password Inputs */}
                <Form.Stack direction="row" spacing={2}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Form.ElementWrapper label="Password" name="password">
                        <TextField
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          fullWidth
                        />
                      </Form.ElementWrapper>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Form.ElementWrapper label="Confirm Password" name="confirmPassword">
                        <TextField
                          {...field}
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                          fullWidth
                        />
                      </Form.ElementWrapper>
                    )}
                  />
                </Form.Stack>

                {/* Organization Select */}
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <Form.ElementWrapper label="Organization" name="organization">
                        <Select
                          {...field}
                          id="organization"
                          error={!!errors.organization}
                          fullWidth
                        >
                          <MenuItem value="">Select an organization</MenuItem>
                          <MenuItem value="wso2">WSO2</MenuItem>
                          <MenuItem value="asgardeo">Asgardeo</MenuItem>
                          <MenuItem value="choreo">Choreo</MenuItem>
                        </Select>
                      </Form.ElementWrapper>
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
                      <Form.ElementWrapper label="Frameworks" name="frameworks">
                        <Autocomplete
                          id="frameworks"
                          options={frameworkOptions}
                          value={value}
                          onChange={(_, newValue) => onChange(newValue)}
                          multiple
                          renderInput={params => <TextField {...params} placeholder="Select frameworks" />}
                          fullWidth
                        />
                      </Form.ElementWrapper>
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
              code={`// 1. Define Zod validation schema
import { z } from 'zod'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/, 'Must contain uppercase, lowercase, and number'),
})

// 2. Initialize useForm with zodResolver
import { zodResolver } from '@hookform/resolvers/zod'

const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(validationSchema),
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
    <Form.ElementWrapper label="Email" name="email">
      <TextField
        {...field}
        id="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
    </Form.ElementWrapper>
  )}
/>

// 4. Handle form submission
const onSubmit = (data: z.infer<typeof validationSchema>) => {
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
                • <strong>Validation Mode:</strong> Use <code>mode: 'onChange'</code> for real-time
                validation or <code>mode: 'onBlur'</code> for validation on field blur
              </Typography>
              <Typography variant="body2">
                • <strong>Error Display:</strong> Always show clear, user-friendly error messages
              </Typography>
              <Typography variant="body2">
                • <strong>Submit Button:</strong> Disable submit button when form is invalid or
                submitting
              </Typography>
              <Typography variant="body2">
                • <strong>Default Values:</strong> Always provide default values to avoid
                uncontrolled component warnings
              </Typography>
              <Typography variant="body2">
                • <strong>Schema Reusability:</strong> Define validation schemas separately for
                reuse across forms
              </Typography>
              <Typography variant="body2">
                • <strong>Custom Validation:</strong> Use <code>.refine()</code> or{' '}
                <code>.superRefine()</code> methods in Zod for complex custom validations
              </Typography>
            </Stack>
          </Form.Section>
        </Form.Stack>
      </Box>
    )
  },
}
