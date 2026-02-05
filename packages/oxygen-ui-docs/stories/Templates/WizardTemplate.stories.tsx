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
  Typography,
} from '@wso2/oxygen-ui'

const meta: Meta = {
  title: 'Templates/Wizard',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
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
