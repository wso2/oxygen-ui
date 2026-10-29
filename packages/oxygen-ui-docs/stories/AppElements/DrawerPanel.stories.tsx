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

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Button,
  Chip,
  Divider,
  DrawerPanel,
  IconButton,
  RelativeTime,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@wso2/oxygen-ui';
import { GitBranch, GitCommitHorizontal, ListTree, Settings, Share2 } from '@wso2/oxygen-ui-icons-react';

/**
 * DrawerPanel is a compound component for slide-out side panels that show
 * details or secondary tasks without leaving the current page.
 */
const meta: Meta<typeof DrawerPanel> = {
  title: 'App Elements/Drawer Panel',
  component: DrawerPanel,
  tags: ['autodocs'],
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
      description: {
        component: `
The DrawerPanel component is a slide-out side panel with a title, an optional expand button and a close button.
Use it to show details or secondary tasks for an item (build details, log entries, resource settings) without leaving the current page.
For navigation menus, use the plain [Drawer](?path=/docs/navigation-drawer--docs) or [Sidebar](?path=/docs/app-elements-sidebar--docs) instead.

### Sub-components
- \`DrawerPanel.Header\` - Top row with the title and action buttons only; put metadata in the body
- \`DrawerPanel.Title\` - Panel heading with an optional \`icon\`; names the drawer for screen readers
- \`DrawerPanel.Actions\` - Right-aligned group of header actions
- \`DrawerPanel.ExpandButton\` - Toggles between \`width\` and \`expandedWidth\` (full width by default; hidden on mobile)
- \`DrawerPanel.CloseButton\` - Calls \`onClose\` (or its own \`onClick\`)
- \`DrawerPanel.Body\` - Scrollable main content
- \`DrawerPanel.Footer\` - Sticky footer for panel actions

### Usage
\`\`\`tsx
import { DrawerPanel } from '@wso2/oxygen-ui';

<DrawerPanel open={open} onClose={handleClose}>
  <DrawerPanel.Header>
    <DrawerPanel.Title icon={<ListTree size={20} />}>Build details</DrawerPanel.Title>
    <DrawerPanel.Actions>
      <DrawerPanel.ExpandButton />
      <DrawerPanel.CloseButton />
    </DrawerPanel.Actions>
  </DrawerPanel.Header>
  <DrawerPanel.Body>
    <RelativeTime action="Triggered" time="about 1 hour ago" />
    ...
  </DrawerPanel.Body>
</DrawerPanel>
\`\`\`

### Guidelines
- Write the title in sentence case and name the item it shows (\`Build details\`, not \`Details\`).
- Always include \`DrawerPanel.CloseButton\` and keep it rightmost; Escape and a backdrop click also close the panel.
- Add \`DrawerPanel.ExpandButton\` when the content benefits from more room (logs, tables, diffs). Skip it for short forms.
- Put extra header actions (share, settings) before the expand and close buttons, as icon buttons with a tooltip.
- Use \`DrawerPanel.Footer\` for actions that apply to the whole panel; put the primary action last.
- Do not nest a card table or another drawer inside the panel.

### Accessibility
- Opens in an MUI Drawer with focus management; Escape closes the panel.
- The drawer is labelled by \`DrawerPanel.Title\`. Pass \`aria-label\` when the panel has no title.
- The expand and close buttons have tooltips and accessible names; the expand label switches between \`Expand\` and \`Collapse\`.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DrawerPanel>;

const buildSteps = [
  { name: 'Checkout source', duration: '4s', status: 'Succeeded' },
  { name: 'Install dependencies', duration: '1m 12s', status: 'Succeeded' },
  { name: 'Run unit tests', duration: '2m 31s', status: 'Succeeded' },
  { name: 'Build container image', duration: '3m 05s', status: 'Succeeded' },
  { name: 'Push to registry', duration: '18s', status: 'Succeeded' },
];

const BuildMetadata = () => (
  <Stack direction="row" flexWrap="wrap" columnGap={3} rowGap={1} sx={{ mb: 3, color: 'text.secondary' }}>
    <RelativeTime action="Triggered" time="about 1 hour ago" dateTime="2026-10-29T09:12:00Z" />
    <Stack direction="row" spacing={0.75} alignItems="center">
      <GitBranch size={16} aria-hidden="true" />
      <Typography variant="body2">main</Typography>
    </Stack>
    <Stack direction="row" spacing={0.75} alignItems="center">
      <GitCommitHorizontal size={16} aria-hidden="true" />
      <Typography variant="body2">a3f9c21</Typography>
    </Stack>
  </Stack>
);

const BuildSteps = () => (
  <Stack divider={<Divider flexItem />}>
    {buildSteps.map((step) => (
      <Stack
        key={step.name}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 1.5 }}
      >
        <Typography variant="body2">{step.name}</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {step.duration}
          </Typography>
          <Chip label={step.status} color="success" size="small" variant="outlined" />
        </Stack>
      </Stack>
    ))}
  </Stack>
);

/**
 * Details panel with a title, expand button and close button in the header,
 * and build metadata at the top of the body.
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          View build details
        </Button>
        <DrawerPanel open={open} onClose={() => setOpen(false)}>
          <DrawerPanel.Header>
            <DrawerPanel.Title icon={<ListTree size={20} />}>Build details</DrawerPanel.Title>
            <DrawerPanel.Actions>
              <DrawerPanel.ExpandButton />
              <DrawerPanel.CloseButton />
            </DrawerPanel.Actions>
          </DrawerPanel.Header>
          <DrawerPanel.Body>
            <BuildMetadata />
            <Typography variant="subtitle2" gutterBottom>
              Steps
            </Typography>
            <BuildSteps />
          </DrawerPanel.Body>
        </DrawerPanel>
      </Box>
    );
  },
};

/**
 * Leave out `DrawerPanel.ExpandButton` when the content is short and does not
 * need more room. The close button stays.
 */
export const CloseOnly: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          View commit
        </Button>
        <DrawerPanel open={open} onClose={() => setOpen(false)} width={420}>
          <DrawerPanel.Header>
            <DrawerPanel.Title icon={<GitCommitHorizontal size={20} />}>Commit a3f9c21</DrawerPanel.Title>
            <DrawerPanel.Actions>
              <DrawerPanel.CloseButton />
            </DrawerPanel.Actions>
          </DrawerPanel.Header>
          <DrawerPanel.Body>
            <Typography variant="body2">Fix token refresh when the session expires during upload.</Typography>
          </DrawerPanel.Body>
        </DrawerPanel>
      </Box>
    );
  },
};

/**
 * Control the expanded state with `expanded` and `onExpandedChange`, for
 * example to remember the user's choice. Use `expandedWidth` to set how wide
 * the panel grows.
 */
export const ControlledExpand: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(true);

    return (
      <Stack spacing={1} alignItems="center">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          View build logs
        </Button>
        <Typography variant="caption" color="text.secondary">
          Expanded: {expanded ? 'yes' : 'no'}
        </Typography>
        <DrawerPanel
          open={open}
          onClose={() => setOpen(false)}
          expanded={expanded}
          onExpandedChange={setExpanded}
          expandedWidth={960}
        >
          <DrawerPanel.Header>
            <DrawerPanel.Title icon={<ListTree size={20} />}>Build logs</DrawerPanel.Title>
            <DrawerPanel.Actions>
              <DrawerPanel.ExpandButton expandLabel="Expand logs" collapseLabel="Collapse logs" />
              <DrawerPanel.CloseButton />
            </DrawerPanel.Actions>
          </DrawerPanel.Header>
          <DrawerPanel.Body>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: 2,
                borderRadius: 1,
                bgcolor: 'action.hover',
                fontFamily: 'monospace',
                fontSize: 'body2.fontSize',
                whiteSpace: 'pre-wrap',
              }}
            >
              {buildSteps.map((step) => `[${step.duration}] ${step.name} ... ${step.status}`).join('\n')}
            </Box>
          </DrawerPanel.Body>
        </DrawerPanel>
      </Stack>
    );
  },
};

/**
 * Put extra header actions before the expand and close buttons so the close
 * button always stays rightmost. Each icon button needs a tooltip and an
 * accessible name.
 */
export const WithHeaderActions: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          View build details
        </Button>
        <DrawerPanel open={open} onClose={() => setOpen(false)}>
          <DrawerPanel.Header>
            <DrawerPanel.Title icon={<ListTree size={20} />}>Build details</DrawerPanel.Title>
            <DrawerPanel.Actions>
              <Tooltip title="Copy link">
                <IconButton aria-label="Copy link">
                  <Share2 size={20} />
                </IconButton>
              </Tooltip>
              <DrawerPanel.ExpandButton />
              <DrawerPanel.CloseButton />
            </DrawerPanel.Actions>
          </DrawerPanel.Header>
          <DrawerPanel.Body>
            <BuildMetadata />
            <BuildSteps />
          </DrawerPanel.Body>
        </DrawerPanel>
      </Box>
    );
  },
};

/**
 * Use `DrawerPanel.Footer` for actions that apply to the whole panel. The
 * footer stays in place while the body scrolls; put the primary action last.
 */
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    return (
      <Box>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Edit build settings
        </Button>
        <DrawerPanel open={open} onClose={handleClose} width={480}>
          <DrawerPanel.Header>
            <DrawerPanel.Title icon={<Settings size={20} />}>Build settings</DrawerPanel.Title>
            <DrawerPanel.Actions>
              <DrawerPanel.CloseButton />
            </DrawerPanel.Actions>
          </DrawerPanel.Header>
          <DrawerPanel.Body>
            <Stack spacing={2}>
              <TextField label="Branch" defaultValue="main" size="small" fullWidth />
              <TextField label="Dockerfile path" defaultValue="./Dockerfile" size="small" fullWidth />
              <TextField label="Build timeout (minutes)" defaultValue="30" size="small" fullWidth />
            </Stack>
          </DrawerPanel.Body>
          <DrawerPanel.Footer>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Save
            </Button>
          </DrawerPanel.Footer>
        </DrawerPanel>
      </Box>
    );
  },
};
