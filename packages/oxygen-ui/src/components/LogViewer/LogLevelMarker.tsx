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
import Chip from '@mui/material/Chip';
import type { Theme } from '@mui/material/styles';
import type { LogLevel } from './types';

interface LevelStyle {
  color: 'default' | 'info' | 'warning' | 'error';
  /** A heavier border, for the level that must stand out without being filled. */
  strong?: boolean;
}

/**
 * One look per level. Trace and debug are quiet, info is informational, warn is a warning, and
 * error and fatal are errors. No marker is filled: fatal stands out from error by its heavier border.
 */
const LEVEL_STYLES: Record<LogLevel, LevelStyle> = {
  trace: { color: 'default' },
  debug: { color: 'default' },
  info: { color: 'info' },
  warn: { color: 'warning' },
  error: { color: 'error' },
  fatal: { color: 'error', strong: true },
};

/**
 * The text each level is shown as.
 */
export const DEFAULT_LEVEL_LABELS: Record<LogLevel, string> = {
  trace: 'Trace',
  debug: 'Debug',
  info: 'Info',
  warn: 'Warn',
  error: 'Error',
  fatal: 'Fatal',
};

export interface LogLevelMarkerProps {
  level: LogLevel;
  label: string;
}

/**
 * The marker shown before a log line. It always has text, so severity is never shown by color
 * alone. It is a span, because it sits inside a button.
 */
const LogLevelMarker: React.FC<LogLevelMarkerProps> = ({ level, label }) => {
  const { color, strong } = LEVEL_STYLES[level];
  return (
    <Chip
      component="span"
      size="small"
      variant="outlined"
      color={color}
      label={label}
      data-level={level}
      sx={(theme: Theme) => ({
        height: 18,
        minWidth: 56,
        fontFamily: 'inherit',
        fontSize: '0.6875rem',
        fontWeight: 600,
        verticalAlign: 'baseline',
        ...(strong && { borderWidth: '2px' }),
        // The main color of info and warning is too light for text on a white page (below 4.5:1), so the
        // text takes the darker shade in the light scheme. The border keeps the main color. `palette.mode` is
        // the mode of the default scheme, not the active one, so the scheme is chosen with `applyStyles` and the
        // colors come from `theme.vars`, which follow the active scheme.
        ...(color !== 'default' && {
          color: (theme.vars || theme).palette[color].main,
          ...theme.applyStyles('light', { color: (theme.vars || theme).palette[color].dark }),
        }),
        '& .MuiChip-label': { px: 0.75, textAlign: 'center', flex: 1 },
      })}
    />
  );
};

LogLevelMarker.displayName = 'LogLevelMarker';

export default LogLevelMarker;
