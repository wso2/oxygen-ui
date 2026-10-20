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
import { Chip, Stack, TimeRangeFilter, Typography } from '@wso2/oxygen-ui';
import type { TimeRange } from '@wso2/oxygen-ui';
import React from 'react';

const DAY_MS = 24 * 60 * 60 * 1000;

const formatUtc = (date: Date) =>
  `${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 16)}`;

/**
 * TimeRangeFilter is a button that opens a list of quick time ranges, with the fields of a custom range beside it.
 */
const meta: Meta<typeof TimeRangeFilter> = {
  title: 'App Elements/Time Range Filter',
  component: TimeRangeFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The TimeRangeFilter component lets users pick the period a list or log covers. It reports the
chosen range through \`onChange\`; your app decides what to fetch and when to clear the range.

The button does not show the selected range, so show it yourself, for example in a chip or as text
beside the button, as the examples below do.

### Features
- **Presets**: Last hour, Last 24 hours, Last 7 days and Last 30 days by default, or your own list. Choosing one applies it
- **Custom range**: Choosing Custom shows a Select date range panel beside the list, with a date field and a time field (to the second) for the start and for the end, read as UTC. Apply uses it, and Cancel closes without applying
- **Limits**: A custom range is only applied when the end is after the start, and, when you set \`maxRangeMs\`, within that length
- **Reopen from elsewhere**: Control the picker with \`open\`, \`onOpen\`, \`onClose\` and \`anchorEl\`, so a chip can reopen it
- **Localizable**: Every visible string is a prop

### Usage
\`\`\`tsx
import { TimeRangeFilter } from '@wso2/oxygen-ui';
import type { TimeRange } from '@wso2/oxygen-ui';

const [range, setRange] = React.useState<TimeRange | null>(null);

<TimeRangeFilter value={range} onChange={setRange} maxRangeMs={30 * 24 * 60 * 60 * 1000} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: { control: false, description: 'The selected range, or null when none is selected. The button does not display it, so show it elsewhere' },
    onChange: { control: false, description: 'Called with the new range' },
    presets: { control: false, description: 'Presets listed before the custom range' },
    maxRangeMs: { control: 'number', description: 'Longest custom range, in milliseconds' },
    label: { control: 'text', description: 'Text of the trigger button' },
    customRangeLabel: { control: 'text', description: 'Text of the list item that shows the custom range fields' },
    panelTitle: { control: 'text', description: 'Heading of the custom range fields' },
    fromLabel: { control: 'text', description: 'Label of the start of the custom range' },
    untilLabel: { control: 'text', description: 'Label of the end of the custom range' },
    dateLabel: { control: 'text', description: 'Label of each date field' },
    timeLabel: { control: 'text', description: 'Label of each time field' },
    cancelLabel: { control: 'text', description: 'Text of the button that closes without applying' },
    applyLabel: { control: 'text', description: 'Text of the apply button' },
    invalidRangeLabel: { control: 'text', description: 'Error for an invalid custom range' },
    rangeTooLongLabel: { control: 'text', description: 'Error for a custom range longer than maxRangeMs. Names the limit by default' },
    disabled: { control: 'boolean', description: 'Disables the trigger button' },
  },
};

export default meta;
type Story = StoryObj<typeof TimeRangeFilter>;

/**
 * Pick a preset or a custom range. The selected range is shown beside the button.
 */
export const Default: Story = {
  render: () => {
    const [range, setRange] = React.useState<TimeRange | null>(null);

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <TimeRangeFilter value={range} onChange={setRange} maxRangeMs={30 * DAY_MS} />
        <Typography variant="body2" color="text.secondary">
          {range ? `${formatUtc(range.start)} to ${formatUtc(range.end)} UTC` : 'No range selected'}
        </Typography>
      </Stack>
    );
  },
};

/**
 * Pass your own presets, and translate every label.
 */
export const CustomPresetsAndLabels: Story = {
  render: () => {
    const [range, setRange] = React.useState<TimeRange | null>(null);

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <TimeRangeFilter
          value={range}
          onChange={setRange}
          label="Periode"
          customRangeLabel="Eigener Zeitraum…"
          panelTitle="Zeitraum wählen"
          fromLabel="Beginn (UTC)"
          untilLabel="Ende (UTC)"
          dateLabel="Datum"
          timeLabel="Uhrzeit"
          applyLabel="Anwenden"
          cancelLabel="Abbrechen"
          invalidRangeLabel="Wählen Sie einen gültigen Zeitraum."
          presets={[
            { id: '15m', label: 'Letzte 15 Minuten', durationMs: 15 * 60 * 1000 },
            { id: '1d', label: 'Letzter Tag', durationMs: DAY_MS },
          ]}
        />
        <Typography variant="body2" color="text.secondary">
          {range ? `${formatUtc(range.start)} bis ${formatUtc(range.end)} UTC` : 'Kein Zeitraum'}
        </Typography>
      </Stack>
    );
  },
};

/**
 * With a one-day limit, longer custom ranges are rejected.
 */
export const WithMaxRange: Story = {
  render: () => {
    const [range, setRange] = React.useState<TimeRange | null>(null);

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <TimeRangeFilter
          value={range}
          onChange={setRange}
          maxRangeMs={DAY_MS}
          invalidRangeLabel="Choose a range of at most 24 hours."
        />
        <Typography variant="body2" color="text.secondary">
          {range ? `${formatUtc(range.start)} to ${formatUtc(range.end)} UTC` : 'No range selected'}
        </Typography>
      </Stack>
    );
  },
};

/**
 * The button can be disabled, for example while data is loading.
 */
export const Disabled: Story = {
  args: {
    value: null,
    onChange: () => undefined,
    disabled: true,
  },
};

/**
 * Clicking the chip reopens the picker under the chip: the page controls `open` and `anchorEl`.
 * Removing the chip clears the range.
 */
export const WithChip: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
    const [range, setRange] = React.useState<TimeRange | null>(() => ({
      start: new Date(Date.now() - DAY_MS),
      end: new Date(),
    }));

    return (
      <Stack spacing={2} sx={{ minWidth: 420 }}>
        <Stack direction="row" spacing={1} sx={{ minHeight: 32 }}>
          {range && (
            <Chip
              variant="outlined"
              label={`Time: ${formatUtc(range.start)} to ${formatUtc(range.end)}`}
              onClick={(event) => {
                setAnchor(event.currentTarget);
                setOpen(true);
              }}
              onDelete={() => setRange(null)}
            />
          )}
        </Stack>
        <Stack direction="row">
          <TimeRangeFilter
            value={range}
            onChange={setRange}
            open={open}
            anchorEl={anchor}
            onOpen={() => {
              setAnchor(null);
              setOpen(true);
            }}
            onClose={() => setOpen(false)}
          />
        </Stack>
      </Stack>
    );
  },
};
