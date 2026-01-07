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

import { Box, Button, Form, Stack, Typography } from '@wso2/oxygen-ui'
import { ExternalLinkIcon } from '@wso2/oxygen-ui-icons-react'
import type { JSX } from 'react'

export interface SampleAppCardProps {
  icon?: React.ReactNode
  title: string
  subtitle: string
  description: string
  onQuickDeploy?: () => void
  onViewSource?: () => void
  hasQuickDeploy?: boolean
}

export default function SampleAppCard({
  icon,
  title,
  subtitle,
  description,
  onQuickDeploy,
  onViewSource,
  hasQuickDeploy = true,
}: SampleAppCardProps): JSX.Element {
  return (
    <Form.CardButton sx={{ minWidth: '300px' }}>
      <Form.CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            {<Box>{icon}</Box>}
            <Form.Subheader>{title}</Form.Subheader>
          </Stack>
          <Typography variant="body2">{subtitle}</Typography>
          <Typography variant="caption">{description}</Typography>
        </Stack>
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
}
