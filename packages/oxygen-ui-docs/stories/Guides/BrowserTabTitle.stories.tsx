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

import { Description, Primary, Subtitle, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Stack from '@wso2/oxygen-ui/Stack';
import Typography from '@wso2/oxygen-ui/Typography';
import CodeBlock from '@wso2/oxygen-ui/CodeBlock';
import Box from '@wso2/oxygen-ui/Box';
import Divider from '@wso2/oxygen-ui/Divider';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * How to write a consistent browser tab title for every page in your application.
 */
const meta: Meta = {
  title: 'Guides/Browser Tab Title',
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography sx={{ mb: '0.35em' }} variant="h2">
            Consistent Browser Tab Title
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            The browser tab title tells users where they are, even when the tab is in the background,
            bookmarked, or listed in their browser history. Use the same format on every page.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography sx={{ mb: '0.35em' }} variant="h6">
            Format
          </Typography>
          <CodeBlock language="markup" code={`[Specific page/resource] | [Product]`} />
        </Box>

        <Box>
          <Typography sx={{ mb: '0.35em' }} variant="h6">
            Examples
          </Typography>
          <CodeBlock
            language="markup"
            code={`All Projects | Acme Console
Environments | Acme Console`}
          />
        </Box>

        <Box>
          <Typography sx={{ mb: '0.35em' }} variant="h6">
            Rules
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Put the specific page or resource first and the product name last.</Typography></li>
            <li><Typography variant="body2">Separate them with <code> | </code> (space, pipe, space).</Typography></li>
            <li><Typography variant="body2">Use the same product name on every page.</Typography></li>
            <li><Typography variant="body2">On the product home or landing page, use the product name only: <code>Acme Console</code>.</Typography></li>
            <li><Typography variant="body2">For nested resources, go from most to least specific: <code>Environments | Payments API | Acme Console</code>.</Typography></li>
            <li><Typography variant="body2">For dynamic names, use the resource name once it loads; until then show the page type (<code>Project | Acme Console</code>), never <code>Loading...</code>.</Typography></li>
            <li><Typography variant="body2">On error pages, name the error: <code>Page Not Found | Acme Console</code>.</Typography></li>
          </Box>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
