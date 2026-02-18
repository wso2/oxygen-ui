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

import {Description, Primary, Subtitle, Title} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography, CodeBlock, Box, Divider, Paper, Chip } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * Everything you need to install, integrate, and start building with Oxygen UI — including
 * how to supercharge your workflow with AI-assisted UI generation.
 */
const meta: Meta = {
  title: 'Getting Started',
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

/**
 * Install the Oxygen UI packages you need. The core library ships components and themes.
 * Add the icons and charts packages for a complete UI toolkit.
 */
export const Installation: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Installation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Oxygen UI is split into focused packages. Install only what your project needs.
        </Typography>
      </Box>

      <Divider />

      {/* Core */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
            Core — <code>@wso2/oxygen-ui</code>
          </Typography>
          <Chip label="required" size="small" color="primary" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Components, themes, layouts, hooks, and utilities — everything built on top of MUI v7.
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          npm
        </Typography>
        <CodeBlock
          language="bash"
          code="npm install @wso2/oxygen-ui"
        />

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          pnpm
        </Typography>
        <CodeBlock
          language="bash"
          code="pnpm add @wso2/oxygen-ui"
        />

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          yarn
        </Typography>
        <CodeBlock
          language="bash"
          code="yarn add @wso2/oxygen-ui"
        />
      </Box>

      <Divider />

      {/* Icons */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
            Icons — <code>@wso2/oxygen-ui-icons-react</code>
          </Typography>
          <Chip label="recommended" size="small" color="success" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          A curated icon set powered by Lucide. Used throughout Oxygen UI components for
          navigation, actions, and status indicators.
        </Typography>
        <CodeBlock
          language="bash"
          code={`npm install @wso2/oxygen-ui-icons-react
# or
pnpm add @wso2/oxygen-ui-icons-react`}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Import icons directly by name:
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { Home, Settings, Bell, User } from '@wso2/oxygen-ui-icons-react';

<Home size={20} />
<Settings size={16} />
<Bell size={20} />`}
        />
      </Box>

      <Divider />

      {/* Charts */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
            Charts — <code>@wso2/oxygen-ui-charts-react</code>
          </Typography>
          <Chip label="optional" size="small" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Theme-aware chart components built on Recharts. Includes bar, line, area, pie,
          radar, and radial bar charts that automatically inherit your Oxygen UI theme.
        </Typography>
        <CodeBlock
          language="bash"
          code={`npm install @wso2/oxygen-ui-charts-react
# or
pnpm add @wso2/oxygen-ui-charts-react`}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Import chart components:
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { BarChart, LineChart, PieChart, AreaChart } from '@wso2/oxygen-ui-charts-react';`}
        />
      </Box>
    </Stack>
  ),
};

/**
 * Get up and running in minutes. Wrap your app with `OxygenUIThemeProvider` and compose
 * a full application shell using the `AppShell` compound component.
 */
export const Integrate: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Integrate
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Two steps: add the theme provider, then optionally scaffold the app layout with
          <code> AppShell</code>.
        </Typography>
      </Box>

      <Divider />

      {/* Step 1: Provider */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 1 — Wrap your app with the Theme Provider
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <code>OxygenUIThemeProvider</code> applies the design system globally. Place it at your
          application root — it handles theme injection, CSS baseline reset, and color scheme
          management.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// main.tsx (or index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { OxygenUIThemeProvider, OxygenTheme } from '@wso2/oxygen-ui';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OxygenUIThemeProvider theme={OxygenTheme}>
      <App />
    </OxygenUIThemeProvider>
  </React.StrictMode>
);`}
        />
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Available built-in themes
          </Typography>
          <Stack spacing={0.5}>
            {[
              ['OxygenTheme', 'Default theme — recommended starting point'],
              ['AcrylicOrangeTheme', 'Warm orange accent'],
              ['AcrylicPurpleTheme', 'Rich purple accent'],
              ['ChoreoTheme', 'Choreo product theme with indigo-violet gradient'],
              ['ClassicTheme', 'Traditional, conservative styling'],
              ['HighContrastTheme', 'Accessibility-focused high contrast'],
              ['PaleGrayTheme', 'Soft neutral gray palette'],
              ['PaleIndigoTheme', 'Muted indigo tones'],
            ].map(([name, description]) => (
              <Stack key={name} direction="row" spacing={1} alignItems="baseline">
                <Typography variant="body2" component="code" sx={{ minWidth: 180 }}>
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>

      <Divider />

      {/* Step 2: AppShell */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 2 — Scaffold your layout with AppShell
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <code>AppShell</code> is a compound component that composes a full application
          shell — collapsible sidebar, top navigation bar, and main content area — with a
          children-only API. No prop drilling required.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// App.tsx
import {
  AppShell,
  Header,
  Sidebar,
  Box,
  Typography,
} from '@wso2/oxygen-ui';
import { Home, Settings } from '@wso2/oxygen-ui-icons-react';

export default function App() {
  return (
    <AppShell>
      {/* ── Top navigation bar ── */}
      <AppShell.Navbar>
        <Header>
          <Header.Toggle />
          <Header.Brand>
            <Header.BrandTitle>My App</Header.BrandTitle>
          </Header.Brand>
          <Header.Spacer />
        </Header>
      </AppShell.Navbar>

      {/* ── Collapsible sidebar ── */}
      <AppShell.Sidebar>
        <Sidebar>
          <Sidebar.Nav>
            <Sidebar.Category>
              <Sidebar.Item id="home">
                <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
                <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
              </Sidebar.Item>
              <Sidebar.Item id="settings">
                <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
                <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
              </Sidebar.Item>
            </Sidebar.Category>
          </Sidebar.Nav>
        </Sidebar>
      </AppShell.Sidebar>

      {/* ── Main content ── */}
      <AppShell.Content>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">Hello, Oxygen UI 👋</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Your application content goes here.
          </Typography>
        </Box>
      </AppShell.Content>
    </AppShell>
  );
}`}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Browse the <strong>App Elements → App Shell</strong> story for an interactive
          playground with the full compound component API, including notifications,
          user menus, context switchers, and footers.
        </Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Oxygen UI ships built-in documentation for AI coding assistants. Run a single command
 * to install guidelines, patterns, and invokable skills that let your AI agent generate
 * production-quality Oxygen UI code out of the box.
 */
export const UseAIToGenerateUIs: Story = {
  name: 'Use AI to Generate UIs',
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Use AI to Generate UIs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Oxygen UI packages AI documentation and invokable skills alongside the library.
          A single <code>init</code> command wires them into your project so any AI assistant
          can generate accurate, theme-aware Oxygen UI code immediately.
        </Typography>
      </Box>

      <Divider />

      {/* Init command */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 1 — Run the init command
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Run this once from your project root. The interactive prompt will ask which AI
          assistant you use and copy the right documentation to your workspace.
        </Typography>
        <CodeBlock
          language="bash"
          code="npx @wso2/oxygen-ui init"
        />

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
          Or pass a flag to skip the prompt:
        </Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Claude Code (recommended — includes invokable skills)
            </Typography>
            <CodeBlock
              language="bash"
              code="npx @wso2/oxygen-ui init --claude"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Any other AI assistant (Copilot, Cursor, Windsurf, etc.)
            </Typography>
            <CodeBlock
              language="bash"
              code="npx @wso2/oxygen-ui init --agents"
            />
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* What gets installed */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 2 — What gets installed
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The command copies AI-optimised documentation into your project so your AI
          assistant picks it up automatically.
        </Typography>

        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Universal mode (<code>AGENTS.md</code> / <code>.ai/</code>)
            </Typography>
            <Stack spacing={0.5}>
              {[
                ['.ai/oxygen-ui/components.md', 'Full component API reference'],
                ['.ai/oxygen-ui/patterns.md', 'Common UI patterns and compositions'],
                ['.ai/oxygen-ui/theming.md', 'Theme customisation guide'],
                ['.ai/oxygen-ui/migration.md', 'Upgrade and migration notes'],
                ['AGENTS.md', 'Root import reference for AI agents'],
              ].map(([file, desc]) => (
                <Stack key={file} direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="body2" component="code" sx={{ minWidth: 230 }}>
                    {file}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {desc}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Claude Code mode (above + invokable skills in <code>.claude/</code>)
            </Typography>
            <Stack spacing={0.5}>
              {[
                ['.claude/skills/oxygen-layout/', 'Scaffold AppShell layouts on demand'],
                ['.claude/skills/oxygen-component/', 'Generate custom themed components'],
                ['.claude/skills/oxygen-form/', 'Build forms with Form.Wizard and Form.Section'],
                ['.claude/skills/oxygen-migrate/', 'Migrate from MUI to Oxygen UI'],
                ['.claude/skills/oxygen-sync/', 'Sync docs to latest package version'],
              ].map(([skill, desc]) => (
                <Stack key={skill} direction="row" spacing={1} alignItems="baseline">
                  <Typography variant="body2" component="code" sx={{ minWidth: 230 }}>
                    {skill}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {desc}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Box>

      <Divider />

      {/* Example prompts */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Step 3 — Ask your AI to build UIs
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Once the documentation is in place, your AI assistant knows the full Oxygen UI API.
          Try prompts like these:
        </Typography>

        <Stack spacing={1.5}>
          {[
            'Create an AppShell layout with a sidebar, header with user menu, and a dashboard page showing stat cards.',
            'Build a user management page with a ListingTable, search bar, and a "Create User" dialog using Form.Wizard.',
            'Add a BarChart showing monthly signups using @wso2/oxygen-ui-charts-react.',
            'Switch my app to the ChoreoTheme and add a ColorSchemeToggle to the header.',
          ].map((prompt, i) => (
            <Paper
              key={i}
              variant="outlined"
              sx={{
                p: 1.5,
                borderStyle: 'dashed',
                bgcolor: 'action.hover',
              }}
            >
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                "{prompt}"
              </Typography>
            </Paper>
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          For Claude Code users, skills can also be invoked directly — for example{' '}
          <Typography
            component="code"
            variant="body2"
            sx={{ bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5 }}
          >
            /oxygen-layout
          </Typography>{' '}
          scaffolds a full AppShell in one shot.
        </Typography>
      </Box>
    </Stack>
  ),
};
