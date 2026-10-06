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
          <Typography variant="h2" gutterBottom>
            Consistent Browser Tab Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The browser tab title tells users where they are, even when the tab is in the background,
            bookmarked, or listed in their browser history. Use the same format on every page.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Format
          </Typography>
          <CodeBlock language="text" code={`[Specific page/resource] | [Product]`} />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Examples
          </Typography>
          <CodeBlock
            language="text"
            code={`All Projects | Acme Console
Environments | Acme Cloud`}
          />
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
