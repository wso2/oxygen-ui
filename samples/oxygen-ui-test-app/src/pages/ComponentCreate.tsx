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

import { Button, Divider, Form, PageTitle, PageContent, Stack } from '@wso2/oxygen-ui'
import { useState, type JSX } from 'react'
import { Link as NavigateLink, useParams } from 'react-router'
import { ExternalLinkIcon, Import, Network, WSO2 } from '@wso2/oxygen-ui-icons-react'
import {
  IntegrationTypeCard,
  IntegrationWizard,
  SampleAppCard,
  SampleIntegrationsSection,
} from '../components/ComponentCreate'

export default function ComponentCreate(): JSX.Element {
  const { orgId, id } = useParams<{ orgId: string; id?: string }>()

  const [page, setPage] = useState<'select-type' | 'configuration'>('select-type')

  if (page === 'select-type') {
    return (
      <PageContent>
        <PageTitle>
          <PageTitle.BackButton component={<NavigateLink to={`/o/${orgId}/projects/${id}`} />} />
          <PageTitle.Header>Get started  with your Integration</PageTitle.Header>
          <PageTitle.SubHeader>Follow the steps below to create a new integration</PageTitle.SubHeader>
        </PageTitle>

        <Stack maxWidth="xl" mx="auto" spacing={2}>
          <Stack direction="row" spacing={2}>
            <Form.Stack direction="row" width="md">
              <IntegrationTypeCard
                icon={Network}
                title="Create a new Integration"
                description="Start developing in a complete, browser-based development environment."
                tooltipText="What is this?"
                onClick={() => setPage('configuration')}
              />
              <IntegrationTypeCard
                icon={Import}
                title="Import an Integration"
                description="Connect your existing code repository, and start building instantly"
                tooltipText="What is this?"
              />
            </Form.Stack>
            <Divider orientation="vertical" flexItem />
            <SampleIntegrationsSection>
              <SampleAppCard
                title="Sample Integration 1"
                subtitle="Sample Integration 1"
                description="Sample Integration 1"
                icon={<WSO2 />}
              />
              <SampleAppCard
                title="Sample Integration 2"
                subtitle="Sample Integration 2"
                description="Sample Integration 2"
                icon={<WSO2 />}
              />
              <SampleAppCard
                title="Sample Integration 2"
                subtitle="Sample Integration 2"
                description="Sample Integration 2"
                icon={<WSO2 />}
              />
              <Form.CardButton alignItems="center" sx={{ width: 280 }}>
                <Button variant="text" size="small" endIcon={<ExternalLinkIcon size={16} />}>
                  View more samples..
                </Button>
              </Form.CardButton>
            </SampleIntegrationsSection>
          </Stack>
        </Stack>
      </PageContent>
    )
  }

  return (
    <PageContent>
      <PageTitle>
        <PageTitle.BackButton onClick={() => setPage('select-type')} />
        <PageTitle.Header>Import your Integration</PageTitle.Header>
        <PageTitle.SubHeader>Follow the steps below to import your integration</PageTitle.SubHeader>
      </PageTitle>
      <IntegrationWizard />
    </PageContent>
  )
}
