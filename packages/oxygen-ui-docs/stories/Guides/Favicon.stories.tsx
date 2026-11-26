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
import { Stack, Typography, CodeBlock, Box, Divider, Button } from '@wso2/oxygen-ui';
import { Download } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

// Served from .storybook/public. Relative so it also works when Storybook is hosted under a sub path.
const FAVICON_DIR = './favicon';

// Same names as other Choreo Labs apps, so teams don't mix up the files. Previews sit on their theme's
// background because the white mark would be invisible on this page.
const FAVICONS = [
  { file: 'favicon-light.ico', theme: 'light', mark: 'Black', background: '#ffffff' },
  { file: 'favicon.ico', theme: 'dark', mark: 'White', background: '#202124' },
];

const USAGE_SNIPPET = `<link id="app-favicon" rel="icon" href="/favicon-light.ico" sizes="any" />
<script>
  (function () {
    var link = document.getElementById('app-favicon');
    var query = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (!link || !query) return;
    var apply = function () {
      link.setAttribute('href', query.matches ? '/favicon.ico' : '/favicon-light.ico');
    };
    apply();
    if (query.addEventListener) query.addEventListener('change', apply);
    else if (query.addListener) query.addListener(apply);
  })();
</script>`;

/**
 * How to add the favicon to your application, with the light and dark icon files to download.
 */
const meta: Meta = {
  title: 'Guides/Favicon',
  parameters: {
    a11y: {
      // Known WCAG AA exception: the brand primary color (#FF7300) does not
      // meet the 4.5:1 text-contrast requirement in the default themes.
      // Tracked in https://github.com/wso2/oxygen-ui/issues/558 — remove
      // this override once the palette decision lands.
      options: {
        rules: { 'color-contrast': { enabled: false } },
      },
    },
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
          <Typography variant="body2" gutterBottom>
            Use both. Each file is named for the browser theme it&apos;s shown in.
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {FAVICONS.map(({ file, theme, mark, background }) => (
              <Stack key={file} direction="row" spacing={3} alignItems="center">
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-end"
                  sx={{ p: 1.5, borderRadius: 1, border: 1, borderColor: 'divider', bgcolor: background }}
                >
                  {[32, 16].map((size) => (
                    <Box
                      key={size}
                      component="img"
                      src={`${FAVICON_DIR}/${file}`}
                      alt={`${mark} favicon at ${size} by ${size} pixels`}
                      width={size}
                      height={size}
                    />
                  ))}
                </Stack>
                <Box>
                  <Button
                    variant="contained"
                    startIcon={<Download size={16} />}
                    href={`${FAVICON_DIR}/${file}`}
                    download={file}
                  >
                    Download {file}
                  </Button>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    {mark} mark, for {theme} browser themes. Sizes from 16×16 to 256×256.
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            How to use
          </Typography>
          <Box component="ol" sx={{ pl: 3, mt: 0, '& li': { mb: 1 } }}>
            <li>
              <Typography variant="body2">
                Put both files in your app&apos;s static folder, for example <code>public/</code> in Vite.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Add this to the <code>&lt;head&gt;</code> of <code>index.html</code>, in place of any other
                favicon tag.
              </Typography>
            </li>
          </Box>
          <CodeBlock language="markup" code={USAGE_SNIPPET} />
          <Typography variant="body2" sx={{ mt: 2 }}>
            The script picks the file for the browser theme when the page loads and switches it when the theme
            changes, without a refresh. A script is used because browsers don&apos;t agree on{' '}
            <code>media</code> for icon links. Without JavaScript, the light-theme file is shown. If your app is
            served under a sub path, add it to both file paths. Check the tab in light and dark mode in each
            browser your app supports.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Rules
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Use both files as provided. Do not recolor, crop, or add a background.</Typography></li>
            <li><Typography variant="body2">Remove the framework&apos;s default favicon (for example <code>vite.svg</code>).</Typography></li>
            <li><Typography variant="body2">Pair it with a consistent tab title. See the Browser Tab Title guide.</Typography></li>
          </Box>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
