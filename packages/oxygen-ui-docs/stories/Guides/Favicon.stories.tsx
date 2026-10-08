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
import { Stack, Typography, CodeBlock, Box, Divider, Button } from '@wso2/oxygen-ui';
import { Download } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

// Served from .storybook/public. Relative so it also works when Storybook is hosted under a sub path.
const FAVICON_URL = './favicon/favicon.ico';

/**
 * How to add the favicon to your application, with the icon file to download.
 */
const meta: Meta = {
  title: 'Guides/Favicon',
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
            Favicon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The favicon is the small icon shown in the browser tab, bookmarks, and history. Use the same
            favicon on every page so users can spot your application among their open tabs.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Download
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <Box component="img" src={FAVICON_URL} alt="Favicon at 32 by 32 pixels" width={32} height={32} />
              <Box component="img" src={FAVICON_URL} alt="Favicon at 16 by 16 pixels" width={16} height={16} />
            </Stack>
            <Box>
              <Button
                variant="contained"
                startIcon={<Download size={16} />}
                href={FAVICON_URL}
                download="favicon.ico"
              >
                Download favicon.ico
              </Button>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                One ICO file with 16×16 and 32×32 sizes.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Usage
          </Typography>
          <Typography variant="body2" gutterBottom>
            Put <code>favicon.ico</code> in your app&apos;s static folder (for example <code>public/</code> in
            Vite), then reference it from the <code>&lt;head&gt;</code> of <code>index.html</code>:
          </Typography>
          <CodeBlock
            language="markup"
            code={`<head>
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <title>Acme Console</title>
</head>`}
          />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Rules
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Set the favicon once in <code>index.html</code>, not per page.</Typography></li>
            <li><Typography variant="body2">Use the file as provided. Do not recolor, crop, or add a background.</Typography></li>
            <li><Typography variant="body2">Do not leave the default framework favicon (for example <code>vite.svg</code>) in place.</Typography></li>
            <li><Typography variant="body2">Pair it with a consistent tab title. See the Browser Tab Title guide.</Typography></li>
          </Box>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
