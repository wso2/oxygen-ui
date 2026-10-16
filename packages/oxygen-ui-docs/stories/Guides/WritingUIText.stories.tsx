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
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography, CodeBlock, Box, Divider } from '@wso2/oxygen-ui';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * How to capitalize titles, action text, and content across your application.
 */
const meta: Meta = {
  title: 'Guides/Writing UI Text',
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
          <Typography variant="h2" gutterBottom>
            Writing UI text
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use sentence case for all text in the UI: titles, action text, and content. Sentence case
            is easier to read and keeps products built with Oxygen UI consistent.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Sentence case
          </Typography>
          <Typography variant="body2" gutterBottom>
            Capitalize only the first word and any proper nouns, product names, or acronyms.
          </Typography>
          <CodeBlock
            language="markup"
            code={`✓ Create new project
✗ Create New Project
✗ CREATE NEW PROJECT`}
          />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Examples
          </Typography>
          <CodeBlock
            language="markup"
            code={`Titles        User management, API keys, Billing details
Action text   Create project, Save changes, Copy link
Content       Last modified, Search by name, No applications yet`}
          />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Rules
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Apply sentence case to titles, headings, buttons, links, menu items, tabs, labels, placeholders, table columns, tooltips, and messages.</Typography></li>
            <li><Typography variant="body2">Keep proper nouns, product names, and acronyms as they are written: <code>Connect to GitHub</code>, <code>Generate API key</code>.</Typography></li>
            <li><Typography variant="body2">Write the text in sentence case in the source. Do not change its case with CSS such as <code>textTransform: &apos;uppercase&apos;</code>.</Typography></li>
          </Box>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
