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

import { Box, Form, Stack, Tooltip, Typography } from '@wso2/oxygen-ui'
import { CircleQuestionMark, type LucideIcon } from '@wso2/oxygen-ui-icons-react'
import type { JSX } from 'react'

export interface IntegrationTypeCardProps {
  icon: LucideIcon
  title: string
  description: string
  tooltipText?: string
  onClick?: () => void
}

export default function IntegrationTypeCard({
  icon,
  title,
  description,
  tooltipText,
  onClick,
}: IntegrationTypeCardProps): JSX.Element {
  const Icon = icon
  return (
    <Form.CardButton
      onClick={onClick}
      sx={{
        width: '340px',
        '& .integration-type-card-icon': {
          transition: 'all 0.3s ease',
        },
        '&:hover': {
          '.integration-type-card-icon': {
            color: 'primary.main',
          },
        },
      }}
    >
      <Form.CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Form.Header>{title}</Form.Header>
            {tooltipText && (
              <Form.DisappearingCardButtonContent>
                <Tooltip title={tooltipText}>
                  <CircleQuestionMark size={16} />
                </Tooltip>
              </Form.DisappearingCardButtonContent>
            )}
          </Stack>
        }
      />
      <Form.CardContent>
        <Box display="flex" py={2} justifyContent="center" alignItems="center">
          <Icon size={200} className="integration-type-card-icon" />
        </Box>
        <Typography variant="caption">{description}</Typography>
      </Form.CardContent>
    </Form.CardButton>
  )
}
