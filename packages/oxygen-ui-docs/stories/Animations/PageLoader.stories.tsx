/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Box, Button, Chip, PageLoader, PageLoaderIcon, Stack, Typography } from '@wso2/oxygen-ui';
import type { PageLoaderPhase } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * PageLoader shows an animated icon in the middle of the page while a background task runs.
 *
 * 1. While `loading` is `true`, the icon animates.
 * 2. When `loading` turns `false`, the icon finishes its current move and comes to rest.
 * 3. The title slides out to the right of the icon, pushing it left until the full logo is centred.
 * 4. After `holdDuration`, `onComplete` fires, the overlay fades out and `children` are shown.
 *
 * The loader covers the viewport by default. Set `fullScreen={false}` to fill a positioned
 * parent instead, as the examples on this page do.
 */
const meta: Meta<typeof PageLoader> = {
  title: 'Animations/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    loading: { control: 'boolean' },
    title: { control: 'text' },
    size: { control: { type: 'number', min: 16, max: 160 } },
    revealDuration: { control: { type: 'number', min: 0, step: 100 } },
    holdDuration: { control: { type: 'number', min: 0, step: 100 } },
    exitDuration: { control: { type: 'number', min: 0, step: 100 } },
    fullScreen: { control: 'boolean' },
    loadingLabel: { control: 'text' },
    onComplete: { action: 'complete' },
    onPhaseChange: { action: 'phase' },
  },
  args: {
    size: 48,
    revealDuration: 700,
    holdDuration: 600,
    exitDuration: 400,
    fullScreen: false,
    loadingLabel: 'Loading',
  },
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

const Stage: React.FC<{ children: React.ReactNode; height?: number }> = ({ children, height = 360 }) => (
  <Box
    sx={{
      position: 'relative',
      height,
      overflow: 'hidden',
      border: 1,
      borderColor: 'divider',
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);

const AppContent: React.FC = () => (
  <Stack spacing={1} sx={{ p: 3 }}>
    <Typography variant="h5">Welcome back</Typography>
    <Typography color="text.secondary">
      The loader has finished and the page content is shown.
    </Typography>
  </Stack>
);

/** Fakes a background task that takes `duration` ms, and can be replayed. */
const useFakeTask = (duration: number) => {
  const [run, setRun] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration, run]);

  return { loading, run, replay: () => setRun(r => r + 1) };
};

/**
 * A background task finishes after 2.5 seconds, then the logo is revealed and the
 * page content is shown. Use **Replay** to run it again.
 */
export const Default: Story = {
  render: function Render(args) {
    const { loading, run, replay } = useFakeTask(2500);
    const [completedAt, setCompletedAt] = React.useState<string | null>(null);

    return (
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={() => { setCompletedAt(null); replay(); }}>
            Replay
          </Button>
          <Typography variant="body2" color="text.secondary">
            {completedAt ? `onComplete fired at ${completedAt}` : 'Waiting for onComplete…'}
          </Typography>
        </Stack>
        <Stage>
          <PageLoader
            key={run}
            {...args}
            loading={loading}
            onComplete={() => {
              args.onComplete?.();
              setCompletedAt(new Date().toLocaleTimeString());
            }}
          >
            <AppContent />
          </PageLoader>
        </Stage>
      </Stack>
    );
  },
};

/**
 * Drive `loading` yourself. The loader stays on the animated icon until you finish the task.
 * The chip shows the current phase from `onPhaseChange`.
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [run, setRun] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [phase, setPhase] = React.useState<PageLoaderPhase>('loading');

    return (
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained" disabled={!loading} onClick={() => setLoading(false)}>
            Finish loading
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setLoading(true);
              setRun(r => r + 1);
            }}
          >
            Reset
          </Button>
          <Chip label={phase} size="small" />
        </Stack>
        <Stage>
          <PageLoader
            key={run}
            {...args}
            loading={loading}
            onPhaseChange={p => {
              args.onPhaseChange?.(p);
              setPhase(p);
            }}
          >
            <AppContent />
          </PageLoader>
        </Stage>
      </Stack>
    );
  },
};

/**
 * By default the Oxygen UI wordmark is revealed. Pass your product name as `title` to show it
 * instead, sized and tracked to match the wordmark, and change `size` to scale the icon and
 * title together.
 */
export const CustomTitleAndSize: Story = {
  args: { title: 'Identity Console', size: 72 },
  render: Default.render,
};

/**
 * `fullScreen` (the default) covers the viewport above everything else. Wrap your app in it
 * and set `loading` to `false` when your startup work is done.
 *
 * ```tsx
 * const [loading, setLoading] = useState(true);
 *
 * useEffect(() => {
 *   Promise.all([loadUser(), loadConfig()]).finally(() => setLoading(false));
 * }, []);
 *
 * return (
 *   <PageLoader loading={loading} onComplete={() => console.log('ready')}>
 *     <App />
 *   </PageLoader>
 * );
 * ```
 */
export const FullScreen: Story = {
  args: { fullScreen: true },
  render: function Render(args) {
    const [run, setRun] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const start = () => {
      setRun(r => r + 1);
      setOpen(true);
      setLoading(true);
      setTimeout(() => setLoading(false), 2500);
    };

    return (
      <Stack spacing={2} alignItems="flex-start">
        <Button variant="contained" onClick={start}>
          Show full screen loader
        </Button>
        <Typography variant="body2" color="text.secondary">
          The task finishes after 2.5 seconds.
        </Typography>
        {open && (
          <PageLoader
            key={run}
            {...args}
            loading={loading}
            onPhaseChange={p => {
              args.onPhaseChange?.(p);
              if (p === 'done') setOpen(false);
            }}
          />
        )}
      </Stack>
    );
  },
};

/**
 * The animated mark is exported on its own as `PageLoaderIcon`, for inline loading states.
 * It uses `currentColor`, so set `color` to change it.
 */
export const Icon: StoryObj<typeof PageLoaderIcon> = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <PageLoaderIcon size={24} />
      <PageLoaderIcon size={48} />
      <Box sx={{ color: 'primary.main', display: 'flex' }}>
        <PageLoaderIcon size={72} />
      </Box>
    </Stack>
  ),
};
