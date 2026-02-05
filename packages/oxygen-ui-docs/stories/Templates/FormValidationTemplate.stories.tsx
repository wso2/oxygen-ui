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
  Box,
  Alert,
  Form,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  Typography,
} from '@wso2/oxygen-ui'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const meta: Meta = {
  title: 'Templates/Form Validation',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
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
              Example of form validation using React Hook Form and Zod validation schema
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
        </Form.Stack>
      </Box>
    )
  },
}
