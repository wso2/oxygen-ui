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

import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import type { BoxProps } from '@mui/material'

/**
 * Visual status of a trial, derived from the days remaining.
 */
export type TrialBadgeStatus = 'active' | 'ending-soon' | 'critical' | 'expired'

/**
 * Props for the TrialBadge component
 */
export interface TrialBadgeProps extends Omit<BoxProps, 'children'> {
  /**
   * Number of days left in the trial. Values below 0 are treated as 0 (expired).
   */
  daysLeft: number
  /**
   * Total length of the trial in days. Used to compute the progress ring.
   * @default 14
   */
  totalDays?: number
  /**
   * Days left at or below which the badge switches to the "ending soon" state.
   * @default 7
   */
  endingSoonThreshold?: number
  /**
   * Days left at or below which the badge switches to the "critical" state
   * and shows the upgrade link.
   * @default 3
   */
  criticalThreshold?: number
  /**
   * Called when the badge is clicked. When set (or when `upgradeHref` is set) the whole
   * badge is rendered as a button.
   */
  onUpgrade?: React.MouseEventHandler<HTMLElement>
  /**
   * When set, the whole badge renders as an anchor pointing to this URL.
   */
  upgradeHref?: string
  /**
   * Whether to show the "Upgrade now" text in the critical and expired states.
   * @default true
   */
  showUpgrade?: boolean
  /**
   * Primary line while the trial is running. Receives the days left.
   * @default (days) => `${days} day(s) left`
   */
  getTitle?: (daysLeft: number) => React.ReactNode
  /**
   * Primary line once the trial has expired.
   * @default 'Trial expired'
   */
  expiredLabel?: React.ReactNode
  /**
   * Secondary line while no upgrade prompt is shown.
   * @default 'of free trial'
   */
  subtitle?: React.ReactNode
  /**
   * Text of the upgrade link.
   * @default 'Upgrade now'
   */
  upgradeLabel?: React.ReactNode
}

/**
 * Resolve the status of a trial from the days left and thresholds.
 */
export function getTrialBadgeStatus(
  daysLeft: number,
  endingSoonThreshold = 7,
  criticalThreshold = 3
): TrialBadgeStatus {
  if (daysLeft <= 0) return 'expired'
  if (daysLeft <= criticalThreshold) return 'critical'
  if (daysLeft <= endingSoonThreshold) return 'ending-soon'
  return 'active'
}

const STATUS_COLOR = {
  active: 'primary',
  'ending-soon': 'warning',
  critical: 'error',
  expired: 'error',
} as const

const RING_SIZE = 36
const RING_THICKNESS = 3.5

/**
 * TrialBadge component - A compact pill showing the remaining days of a free trial.
 * The color changes with the time left, and in the last days (and after expiry)
 * the second line becomes an "Upgrade now" link.
 *
 * @example
 * ```tsx
 * <TrialBadge daysLeft={12} />
 * ```
 *
 * @example
 * ```tsx
 * <TrialBadge daysLeft={2} onUpgrade={() => navigate('/billing')} />
 * ```
 */
const TrialBadge: React.FC<TrialBadgeProps> = ({
  daysLeft,
  totalDays = 14,
  endingSoonThreshold = 7,
  criticalThreshold = 3,
  onUpgrade,
  upgradeHref,
  showUpgrade = true,
  getTitle = days => `${days} ${days === 1 ? 'day' : 'days'} left`,
  expiredLabel = 'Trial expired',
  subtitle = 'of free trial',
  upgradeLabel = 'Upgrade now',
  sx,
  ...props
}) => {
  const days = Math.max(0, Math.floor(Number.isFinite(daysLeft) ? daysLeft : 0))
  const status = getTrialBadgeStatus(days, endingSoonThreshold, criticalThreshold)
  const color = STATUS_COLOR[status]
  const isExpired = status === 'expired'
  const upgradeVisible = showUpgrade && (status === 'critical' || isExpired)
  const progress = totalDays > 0 ? Math.min(100, Math.max(0, (days / totalDays) * 100)) : 0

  const interactive = Boolean(onUpgrade || upgradeHref)
  const interactiveProps = interactive
    ? upgradeHref
      ? { component: 'a', href: upgradeHref, onClick: onUpgrade }
      : { component: 'button', type: 'button', onClick: onUpgrade }
    : { role: 'group' }

  return (
    <Box
      {...interactiveProps}
      data-status={status}
      sx={[
        theme => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          py: 0.75,
          pl: 0.75,
          pr: 2,
          borderRadius: 999,
          border: '1px solid',
          borderColor: `${theme.palette[color].main}`,
          bgcolor: `color-mix(in srgb, ${theme.palette[color].main} 12%, transparent)`,
          color: 'text.primary',
          font: 'inherit',
          textAlign: 'left',
          textDecoration: 'none',
          ...(interactive && {
            cursor: 'pointer',
            transition: 'background-color 150ms',
            '&:hover': {
              bgcolor: `color-mix(in srgb, ${theme.palette[color].main} 20%, transparent)`,
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: theme.palette[color].main,
              outlineOffset: 2,
            },
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <Box aria-hidden="true" sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={RING_SIZE}
          thickness={RING_THICKNESS}
          sx={{ color: `${color}.main`, opacity: 0.25 }}
        />
        {!isExpired && (
          <CircularProgress
            variant="determinate"
            value={progress}
            size={RING_SIZE}
            thickness={RING_THICKNESS}
            sx={{ color: `${color}.main`, position: 'absolute', left: 0 }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1 }}>
            {days}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {isExpired ? expiredLabel : getTitle(days)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            lineHeight: 1.2,
            fontWeight: upgradeVisible ? 600 : 400,
            color: status === 'active' ? 'text.secondary' : `${color}.main`,
          }}
        >
          {upgradeVisible ? <>{upgradeLabel} →</> : subtitle}
        </Typography>
      </Box>
    </Box>
  )
}

TrialBadge.displayName = 'TrialBadge'

export default TrialBadge
