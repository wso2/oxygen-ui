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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { Clock } from '@wso2/oxygen-ui-icons-react';

/**
 * Props for the RelativeTime component
 */
export interface RelativeTimeProps {
  /**
   * The relative time text to display, provided by the consumer (e.g. "3 weeks ago").
   */
  time: React.ReactNode;
  /**
   * Optional operation shown before the time (e.g. "Created", "Updated", "Deleted").
   */
  action?: React.ReactNode;
  /**
   * Machine-readable date/time for the `<time>` element (e.g. an ISO 8601 string).
   */
  dateTime?: string;
  /**
   * Optional tooltip content, typically the full absolute date.
   */
  tooltip?: React.ReactNode;
  /**
   * Custom icon. Defaults to a clock icon.
   */
  icon?: React.ReactNode;
  /**
   * Hides the icon.
   * @default false
   */
  hideIcon?: boolean;
  /**
   * Size of the text and icon.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * Custom styles for the root element.
   */
  sx?: SxProps<Theme>;
}

const SIZES = {
  small: { variant: 'caption', iconSize: 14, gap: 0.5 },
  medium: { variant: 'body2', iconSize: 16, gap: 0.75 },
} as const;

/**
 * RelativeTime component - Displays a clock icon with an optional action and a relative time
 *
 * @example
 * ```tsx
 * <RelativeTime time="3 weeks ago" />
 * ```
 *
 * @example
 * ```tsx
 * <RelativeTime
 *   action="Updated"
 *   time="5 minutes ago"
 *   dateTime="2026-10-08T09:15:00Z"
 *   tooltip="October 8, 2026, 9:15 AM"
 * />
 * ```
 */
const RelativeTime: React.FC<RelativeTimeProps> = ({
  time,
  action,
  dateTime,
  tooltip,
  icon,
  hideIcon = false,
  size = 'medium',
  sx,
}) => {
  const { variant, iconSize, gap } = SIZES[size];

  const content = (
    <Box
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap,
          color: 'text.secondary',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!hideIcon && (
        <Box aria-hidden="true" sx={{ display: 'inline-flex', flexShrink: 0 }}>
          {icon ?? <Clock size={iconSize} />}
        </Box>
      )}
      <Typography variant={variant} component="span" color="inherit">
        {action && <>{action} </>}
        <time dateTime={dateTime}>{time}</time>
      </Typography>
    </Box>
  );

  if (!tooltip) {
    return content;
  }

  return (
    <Tooltip title={tooltip} describeChild>
      {/* tabIndex makes the tooltip reachable for keyboard users */}
      <Box component="span" tabIndex={0} sx={{ display: 'inline-flex' }}>
        {content}
      </Box>
    </Tooltip>
  );
};

RelativeTime.displayName = 'RelativeTime';

export default RelativeTime;
