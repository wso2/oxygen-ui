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

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Tooltip,
  Form,
} from '@wso2/oxygen-ui'
import {
  CircleQuestionMark,
  ArrowRightIcon,
  Calculator,
  ExternalLinkIcon,
  WSO2,
} from '@wso2/oxygen-ui-icons-react'

/**
 * Clickable card components for interactive selection interfaces.
 * Built using Form.CardButton with support for icons, actions, and hover states.
 */
const meta: Meta = {
  title: 'Surfaces/ClickableCard',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive clickable cards for selection interfaces. \n\n' +
          'Features hover effects, optional icons, and action buttons. Perfect for creating selection flows and option pickers.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

/**
 * Clickable Card - Default simple card with icon and action
 */
export const Default: Story = {
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
export const WithMultipleActions: Story = {
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
