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
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { createSvgIcon } from '@mui/material/utils';

/**
 * Props for the chip that shows one applied filter in the toolbar of a LogViewer.
 */
interface LogFilterChipProps {
  /** Name of the filter, shown before the value (e.g. "Status"). */
  name: string;
  /** Current value of the filter (e.g. "Failed"). */
  value: React.ReactNode;
  /** Called when the chip is clicked, to reopen the picker of this filter. */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Called when the remove icon is clicked, or Backspace or Delete is pressed on the focused chip. */
  onRemove?: () => void;
  /**
   * The action of the chip while it can be clicked to change the filter. Its accessible name is the text
   * the chip shows, then this: `Status: Failed, Change status filter`. A value that is not text cannot be
   * put into a name, so then this alone is the name.
   * @default `Change ${name} filter`, with the name in lower case
   */
  changeLabel?: string;
  /**
   * Accessible name of the remove icon.
   * @default `Remove ${name} filter`, with the name in lower case
   */
  removeLabel?: string;
}

/**
 * The standard chip delete icon (a filled circle with a cross), the same one `Chip` draws when it
 * is only given `onDelete`. It is redrawn here so it can have an accessible name, which the
 * default does not.
 */
const CancelIcon = createSvgIcon(
  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />,
  'Cancel'
);

interface RemoveIconProps {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

/**
 * MUI clones the delete icon and injects `className` and `onClick`, so both are passed through.
 */
const RemoveIcon: React.FC<RemoveIconProps> = ({ label, ...props }) => (
  <CancelIcon {...props} role="button" aria-label={label} aria-hidden={false} />
);

/**
 * The accessible name of a chip that can be clicked. It starts with the text the chip shows, so voice control
 * that says what it sees finds it, and it holds the value, which a name of the action alone would hide from a
 * screen reader. A value that is not text cannot be put into a name, so the action stays alone then.
 */
const openName = (name: string, value: React.ReactNode, changeLabel: string): string =>
  typeof value === 'string' || typeof value === 'number' ? `${name}: ${value}, ${changeLabel}` : changeLabel;

/**
 * An applied filter as a removable `name: value` chip, built on the standard `Chip`.
 */
const LogFilterChip: React.FC<LogFilterChipProps> = ({
  name,
  value,
  onOpen,
  onRemove,
  changeLabel = `Change ${name.toLowerCase()} filter`,
  removeLabel = `Remove ${name.toLowerCase()} filter`,
}) => (
  <Chip
    variant="outlined"
    size="small"
    sx={{ fontSize: '0.8125rem' }}
    clickable={Boolean(onOpen)}
    onClick={onOpen}
    aria-label={onOpen ? openName(name, value, changeLabel) : undefined}
    onDelete={onRemove}
    deleteIcon={onRemove ? <RemoveIcon label={removeLabel} /> : undefined}
    label={
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Box component="span">{name}:</Box>
        <Box component="span">{value}</Box>
      </Box>
    }
  />
);

LogFilterChip.displayName = 'LogFilterChip';

export default LogFilterChip;
