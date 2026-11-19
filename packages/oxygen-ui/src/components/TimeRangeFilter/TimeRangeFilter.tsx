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

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ChevronDown } from '@wso2/oxygen-ui-icons-react';
import type { Locale } from 'date-fns';
import {
  CUSTOM_ID,
  DAY_MS,
  DEFAULT_PRESETS,
  checkCustomRange,
  describeSpan,
  instantOf,
  resolveActiveId,
  toRangeEnd,
  type RangeEnd,
  type Selection,
  type TimeRange,
  type TimeRangePreset,
} from './range';

export type { TimeRange, TimeRangePreset } from './range';

/**
 * Props for the TimeRangeFilter component
 */
export interface TimeRangeFilterProps extends Omit<ButtonProps, 'onChange' | 'value' | 'children'> {
  /**
   * The selected range, or `null` when no range is selected. The button does not display it, so show
   * it elsewhere (for example in a chip).
   */
  value: TimeRange | null;
  /**
   * Called with the new range when the user picks a preset or applies a custom range.
   * Clearing the range is up to the consumer (for example, from the remove icon of a chip).
   */
  onChange: (range: TimeRange) => void;
  /**
   * Presets listed before the custom range.
   * @default Last hour, Last 24 hours, Last 7 days, Last 30 days
   */
  presets?: TimeRangePreset[];
  /**
   * Longest range, in milliseconds, that a custom range may span. Unlimited when omitted.
   */
  maxRangeMs?: number;
  /**
   * Text of the trigger button.
   * @default 'Time range'
   */
  label?: string;
  /**
   * Text of the list item that shows the custom range fields.
   * @default 'Custom'
   */
  customRangeLabel?: string;
  /**
   * Heading of the custom range fields.
   * @default 'Select date range'
   */
  panelTitle?: string;
  /**
   * Label of the custom range start. Custom values are read as UTC.
   * @default 'Start from (UTC)'
   */
  fromLabel?: string;
  /**
   * Label of the custom range end. Custom values are read as UTC.
   * @default 'End on (UTC)'
   */
  untilLabel?: string;
  /**
   * Label of each date field.
   * @default 'Date'
   */
  dateLabel?: string;
  /**
   * Label of each time field.
   * @default 'Time'
   */
  timeLabel?: string;
  /**
   * Text of the button that applies a custom range.
   * @default 'Apply'
   */
  applyLabel?: string;
  /**
   * Text of the button that closes the picker without applying a custom range.
   * @default 'Cancel'
   */
  cancelLabel?: string;
  /**
   * Error shown when the custom range is empty or reversed, or a date or time is missing.
   * @default 'Choose a valid time range.'
   */
  invalidRangeLabel?: string;
  /**
   * Error shown when the custom range is longer than `maxRangeMs`. The default names the limit, for
   * example 'Choose a range of at most 30 days.'; set it to translate that text.
   */
  rangeTooLongLabel?: string;
  /**
   * The date-fns locale of the date and time fields and their calendars, for example `fr` from
   * `date-fns/locale`. It sets the month names, the first day of the week and the like. The pickers
   * are in English when it is not set.
   */
  adapterLocale?: Locale;
  /**
   * Text of the pickers' own controls (the calendar buttons, and the OK and Cancel of the dialog
   * shown on touch screens), for example `frFR.components.MuiLocalizationProvider.defaultProps.localeText`
   * from `@mui/x-date-pickers/locales`.
   */
  localeText?: LocalizationProviderProps<Locale>['localeText'];
  /**
   * Format of the date fields, as a date-fns format string.
   * @default 'dd MMM, yyyy'
   */
  dateFormat?: string;
  /**
   * Format of the time fields, as a date-fns format string. Keep the seconds in it: the fields pick
   * the hour, the minute and the second.
   * @default 'HH:mm:ss'
   */
  timeFormat?: string;
  /**
   * Whether the picker is open. Set it, with `onOpen` and `onClose`, to control the picker, for
   * example to reopen it from a chip that shows the range. Leave it out and the picker opens and
   * closes itself.
   */
  open?: boolean;
  /**
   * Called when the trigger button asks to open the picker.
   */
  onOpen?: () => void;
  /**
   * Called when the picker asks to close: after a choice is applied, on Cancel, on Escape, and on a
   * click outside.
   */
  onClose?: () => void;
  /**
   * The element the open picker is placed under. Defaults to the trigger button. Set it when the
   * picker is opened from somewhere else, such as a chip.
   */
  anchorEl?: HTMLElement | null;
}

/**
 * The theme's paper is translucent and blurs what is behind it. The picker opens over a list of
 * text, which would show through, so its popup, and the popup of each field (a popper on a desktop,
 * a dialog on a touch screen), get an opaque ground in the same color.
 */
const solidPaperSx: SxProps<Theme> = theme => {
  const palette = (theme.vars ?? theme).palette;
  const channel = (palette.background as { paperChannel?: string }).paperChannel;
  return {
    backgroundColor: channel ? `rgb(${channel})` : palette.background.default,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
  };
};

/**
 * TimeRangeFilter component - A button that opens a list of quick time ranges and, beside it, the
 * fields of a custom range.
 *
 * Custom ranges are entered and read as UTC. The component never fetches data or clears the
 * range itself; it reports choices through `onChange`.
 *
 * The button does not show the selected range: its text stays the same after a choice. Show the
 * range yourself, for example in a chip or as text beside the button, so readers can see which
 * range is applied.
 *
 * @example
 * ```tsx
 * const [range, setRange] = React.useState<TimeRange | null>(null);
 *
 * <TimeRangeFilter value={range} onChange={setRange} maxRangeMs={30 * 24 * 60 * 60 * 1000} />
 * ```
 *
 * @example
 * ```tsx
 * // Reopen the picker from a chip: control `open` and `anchorEl`
 * const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
 * const [open, setOpen] = React.useState(false);
 *
 * <TimeRangeFilter
 *   value={range}
 *   onChange={setRange}
 *   open={open}
 *   anchorEl={anchor}
 *   onOpen={() => { setAnchor(null); setOpen(true); }}
 *   onClose={() => setOpen(false)}
 * />
 * <Chip
 *   label="Time: Last 24 hours"
 *   onClick={(event) => { setAnchor(event.currentTarget); setOpen(true); }}
 *   onDelete={() => setRange(null)}
 * />
 * ```
 */
const TimeRangeFilter = React.forwardRef<HTMLButtonElement, TimeRangeFilterProps>(
  (
    {
      value,
      onChange,
      presets = DEFAULT_PRESETS,
      maxRangeMs,
      label = 'Time range',
      customRangeLabel = 'Custom',
      panelTitle = 'Select date range',
      fromLabel = 'Start from (UTC)',
      untilLabel = 'End on (UTC)',
      dateLabel = 'Date',
      timeLabel = 'Time',
      applyLabel = 'Apply',
      cancelLabel = 'Cancel',
      invalidRangeLabel = 'Choose a valid time range.',
      rangeTooLongLabel,
      adapterLocale,
      localeText,
      dateFormat = 'dd MMM, yyyy',
      timeFormat = 'HH:mm:ss',
      open: openProp,
      onOpen,
      onClose,
      anchorEl,
      onClick,
      sx,
      ...buttonProps
    },
    ref,
  ) => {
    const panelId = React.useId();
    const panelHeadingId = React.useId();
    const fromHeadingId = React.useId();
    const untilHeadingId = React.useId();
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const setTriggerRef = (element: HTMLButtonElement | null) => {
      triggerRef.current = element;
      if (typeof ref === 'function') ref(element);
      else if (ref) ref.current = element;
    };
    // The picker controls itself unless `open` is given.
    const [ownOpen, setOwnOpen] = React.useState(false);
    const open = openProp ?? ownOpen;
    const [customOpen, setCustomOpen] = React.useState(false);
    const [selection, setSelection] = React.useState<Selection | null>(null);
    // The custom range being edited, as dates in the pickers' (local) terms; see `toPickerDate`.
    const [from, setFrom] = React.useState<RangeEnd>({ date: null, time: null });
    const [until, setUntil] = React.useState<RangeEnd>({ date: null, time: null });
    const [error, setError] = React.useState('');

    // Highlight the choice made here while it still matches the value. Otherwise (a range the
    // consumer set, or one it changed since) pick the preset of the same length that ends about now,
    // or custom. A fixed past range is custom, whatever its length.
    const activeId = resolveActiveId(value, selection, presets, Date.now());

    const close = () => {
      if (openProp === undefined) setOwnOpen(false);
      onClose?.();
    };

    // Each time the picker opens, the custom fields start from the current range (or the last day),
    // and are shown at once when the current range is a custom one.
    const prepare = () => {
      const end = value?.end ?? new Date();
      const start = value?.start ?? new Date(end.getTime() - DAY_MS);
      setFrom(toRangeEnd(start));
      setUntil(toRangeEnd(end));
      setError('');
      setCustomOpen(activeId === CUSTOM_ID);
    };
    const latestPrepare = React.useRef(prepare);
    // Kept current in an effect, not during render. It is declared before the effect below so it
    // has run by the time that one reads it.
    React.useLayoutEffect(() => {
      latestPrepare.current = prepare;
    });
    const wasOpen = React.useRef(false);
    React.useLayoutEffect(() => {
      if (open && !wasOpen.current) latestPrepare.current();
      wasOpen.current = open;
    }, [open]);

    // Editing a field clears the message about the last attempt.
    const editFrom = (next: RangeEnd) => {
      setFrom(next);
      setError('');
    };
    const editUntil = (next: RangeEnd) => {
      setUntil(next);
      setError('');
    };

    const applyPreset = (preset: TimeRangePreset) => {
      const end = new Date();
      const start = new Date(end.getTime() - preset.durationMs);
      setSelection({ id: preset.id, start: start.getTime(), end: end.getTime() });
      close();
      onChange({ start, end });
    };

    const applyCustomRange = () => {
      const start = instantOf(from);
      const end = instantOf(until);
      const problem = checkCustomRange(start, end, maxRangeMs);
      if (problem === 'invalid' || !start || !end) {
        setError(invalidRangeLabel);
        return;
      }
      if (problem === 'too-long') {
        setError(rangeTooLongLabel ?? `Choose a range of at most ${describeSpan(maxRangeMs as number)}.`);
        return;
      }
      setError('');
      setSelection({ id: CUSTOM_ID, start: start.getTime(), end: end.getTime() });
      close();
      onChange({ start, end });
    };

    /** One end of the custom range: a heading, a date field and a time field. */
    const rangeEnd = (
      heading: string,
      headingId: string,
      end: RangeEnd,
      setEnd: (next: RangeEnd) => void,
    ) => (
      <Box role="group" aria-labelledby={headingId}>
        <Typography id={headingId} variant="body2" sx={{ mb: 1 }}>
          {heading}
        </Typography>
        <Stack direction="row" sx={{ gap: 1 }}>
          {/* Each field keeps its own value, so clearing one does not empty the other. They are combined on Apply. */}
          <DatePicker
            label={dateLabel}
            format={dateFormat}
            value={end.date}
            onChange={(next) => setEnd({ ...end, date: next })}
            slotProps={{
              textField: { size: 'small', sx: { flex: 1, minWidth: 150 } },
              desktopPaper: { sx: solidPaperSx },
              mobilePaper: { sx: solidPaperSx },
            }}
          />
          <TimePicker
            label={timeLabel}
            ampm={false}
            views={['hours', 'minutes', 'seconds']}
            format={timeFormat}
            value={end.time}
            onChange={(next) => setEnd({ ...end, time: next })}
            slotProps={{
              textField: { size: 'small', sx: { width: 130 } },
              desktopPaper: { sx: solidPaperSx },
              mobilePaper: { sx: solidPaperSx },
            }}
          />
        </Stack>
      </Box>
    );

    return (
      <>
        <Button
          size="small"
          variant="text"
          color="inherit"
          {...buttonProps}
          // Control text is in sentence case, whatever the theme does to buttons.
          sx={[{ textTransform: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
          ref={setTriggerRef}
          aria-haspopup="dialog"
          aria-expanded={open}
          endIcon={<ChevronDown size={14} />}
          onClick={(event) => {
            onClick?.(event);
            if (openProp === undefined) setOwnOpen(true);
            onOpen?.();
          }}
        >
          {label}
        </Button>

        <Popover
          anchorEl={anchorEl ?? triggerRef.current}
          open={open}
          onClose={close}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          slotProps={{ paper: { sx: solidPaperSx, role: 'dialog', 'aria-label': label } }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <MenuList aria-label={label} autoFocusItem={open} sx={{ minWidth: 180, py: 1, alignSelf: 'flex-start' }}>
              {presets.map((preset) => (
                <MenuItem
                  key={preset.id}
                  selected={activeId === preset.id && !customOpen}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </MenuItem>
              ))}
              <MenuItem
                selected={activeId === CUSTOM_ID || customOpen}
                aria-controls={customOpen ? panelId : undefined}
                aria-expanded={customOpen}
                onClick={() => setCustomOpen(true)}
              >
                {customRangeLabel}
              </MenuItem>
            </MenuList>

            {customOpen && (
              <Stack
                id={panelId}
                role="group"
                aria-labelledby={panelHeadingId}
                // Below the list when the two wrap on a narrow screen, beside it from `sm` up.
                sx={{
                  gap: 2,
                  p: 2,
                  width: 380,
                  maxWidth: '100%',
                  borderTop: { xs: 1, sm: 0 },
                  borderLeft: { xs: 0, sm: 1 },
                  borderColor: 'divider',
                }}
              >
                <Typography id={panelHeadingId} variant="subtitle2">
                  {panelTitle}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale} localeText={localeText}>
                  {rangeEnd(fromLabel, fromHeadingId, from, editFrom)}
                  {rangeEnd(untilLabel, untilHeadingId, until, editUntil)}
                </LocalizationProvider>
                {error && <Alert severity="error">{error}</Alert>}
                <Stack direction="row" sx={{ justifyContent: 'flex-end', gap: 1 }}>
                  <Button variant="outlined" color="inherit" onClick={close} sx={{ textTransform: 'none' }}>
                    {cancelLabel}
                  </Button>
                  <Button variant="contained" onClick={applyCustomRange} sx={{ textTransform: 'none' }}>
                    {applyLabel}
                  </Button>
                </Stack>
              </Stack>
            )}
          </Box>
        </Popover>
      </>
    );
  },
);

TimeRangeFilter.displayName = 'TimeRangeFilter';

export default TimeRangeFilter;
