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
import { Stack, Typography, CodeBlock, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@wso2/oxygen-ui';
import React from 'react';
import CenterContentLayout from '../layouts/CenterContentLayout';

/**
 * How Oxygen UI supports building accessible applications, and what your
 * application is responsible for.
 */
const meta: Meta = {
  title: 'Accessibility',
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

const keyboardMap: Array<{ component: string; interaction: string }> = [
  { component: 'UserMenu', interaction: 'Enter/Space on the trigger opens the menu with focus inside; Arrow keys move between items; Escape closes and returns focus to the trigger.' },
  { component: 'ComplexSelect', interaction: 'Standard MUI Select behavior: Enter/Space/Arrow keys open the listbox; Arrow keys navigate options; Enter selects; Escape closes.' },
  { component: 'AppBreadcrumbs', interaction: 'Tab reaches each crumb and the "…" overflow button; Enter/Space on "…" opens the hidden-crumbs menu (Arrow keys + Escape supported).' },
  { component: 'Sidebar', interaction: 'Tab/Arrow through items; Enter/Space activates or expands. When collapsed, Enter/Space on a parent opens the nested-items popover.' },
  { component: 'Header.Toggle', interaction: 'Enter/Space toggles the sidebar; the button exposes aria-expanded for the current state.' },
  { component: 'NotificationPanel', interaction: 'Renders in an MUI Drawer: focus moves into the panel on open, Escape closes it. Tabs inside follow Arrow-key navigation.' },
  { component: 'ListingTable', interaction: 'Sort headers are focusable buttons (Enter/Space toggles sort). The DataGrid variant supports full MUI DataGrid keyboard navigation with a visible focus ring.' },
  { component: 'SearchBarWithAdvancedFilter', interaction: 'Filter button is labeled and opens an MUI Popover with focus management; Escape closes it.' },
];

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Accessibility
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Oxygen UI builds on Material UI and targets WCAG 2.1 AA. Wrapper components preserve MUI's
            keyboard and screen reader behavior, and every story in this Storybook is checked with
            axe-core (see the Accessibility panel below any story). This page documents what the library
            guarantees and what your application must provide.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Accessible Names You Must Provide
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Components with visible text label themselves. Icon-only or label-less usage needs a name from you:
          </Typography>
          <CodeBlock
            language="tsx"
            code={`// Icon-only buttons: always pass aria-label
<IconButton aria-label="Delete user"><TrashIcon /></IconButton>

// ComplexSelect without a label prop
<ComplexSelect slotProps={{ input: { 'aria-label': 'Organization' } }} ... />

// Standalone Checkbox / Switch / Slider (no FormControlLabel)
<Checkbox slotProps={{ input: { 'aria-label': 'Select row' } }} />
<Switch slotProps={{ input: { 'aria-label': 'Enable notifications' } }} />
<Slider aria-label="Volume" />

// Progress indicators
<CircularProgress aria-label="Loading results" />

// Clickable Header.Brand
<Header.Brand onClick={goHome} aria-label="Go to home">...</Header.Brand>`}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <code>ColorSchemeToggle</code>, <code>Header.Toggle</code>, <code>UserMenu.Trigger</code>,
            notification close/dismiss buttons, and <code>SearchBar</code> ship with sensible default
            labels that you can override via <code>aria-label</code> props.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Keyboard Interactions
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label="Keyboard interactions per component">
              <TableHead>
                <TableRow>
                  <TableCell>Component</TableCell>
                  <TableCell>Keyboard behavior</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keyboardMap.map((row) => (
                  <TableRow key={row.component}>
                    <TableCell sx={{ whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                      <code>{row.component}</code>
                    </TableCell>
                    <TableCell>{row.interaction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Color Contrast and Themes
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <ul>
              <li>
                All shipped themes define light and dark color schemes. <code>HighContrastTheme</code> provides
                a maximum-contrast palette for users who need it — offer it via <code>ThemeSwitcher</code>.
              </li>
              <li>
                <strong>Known exception:</strong> the brand primary <code>#FF7300</code> in the Classic and WSO2
                themes does not reach the 4.5:1 ratio required for normal-size text. Avoid orange text on light
                backgrounds for essential content, or use a theme/palette override until the tracked palette
                update lands.
              </li>
              <li>
                Focus indicators are never suppressed by the themes; MUI's <code>:focus-visible</code> styling
                applies everywhere, and the ListingTable DataGrid draws an explicit focus ring.
              </li>
            </ul>
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Reduced Motion
          </Typography>
          <Typography variant="body2" color="text.secondary">
            When the operating system requests reduced motion (<code>prefers-reduced-motion: reduce</code>),
            the base theme collapses all CSS transitions and animations, and <code>ParticleBackground</code>
            renders a single static frame instead of animating. No configuration is required.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Forms and Validation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <code>Form.ElementWrapper</code> links its label to the wrapped field automatically — including
            MUI <code>Select</code>, which cannot be labeled with <code>htmlFor</code> alone. For error
            messages, use the field's <code>error</code> and <code>helperText</code> props so the message is
            associated via <code>aria-describedby</code> and announced when the field is focused.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Audit and Workflow
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The complete WCAG 2.1 AA audit report, tracked findings, and the CI accessibility gate are
            documented in <code>packages/oxygen-ui-docs/ACCESSIBILITY.md</code> in the repository. Contributors should
            read the Accessibility Policy under "How To Contribute".
          </Typography>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
