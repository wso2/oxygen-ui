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
import { Box, Button, Card, CardContent, CircularProgress, LinearProgress, Popper, Typography } from '@mui/material'
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
   * Number of days left in the trial. Fractional values are allowed: the exact value drives
   * the status and ring, and the displayed count is rounded up. Values below 0 are treated as 0 (expired).
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
   * Called when the badge is clicked, in addition to any `onClick`. When set (or when
   * `upgradeHref` or `onClick` is set) the whole badge is rendered as a button.
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
  /**
   * Optional usage summary. When set, hovering or focusing the badge opens a panel listing
   * how much of each resource is used, with an upgrade button. When omitted, no panel is shown.
   */
  usage?: TrialBadgeUsage
}

/**
 * A resource listed in the usage panel, shown as `count/limit`.
 */
export interface TrialBadgeUsageItem {
  /**
   * Stable key for the row. Falls back to the label.
   */
  key?: string
  /**
   * Name of the resource, e.g. "REST APIs".
   */
  label: React.ReactNode
  /**
   * The count shown for this resource, out of `limit`. The bar and its color follow
   * `count / limit`: a higher share means more of the quota is taken, so it turns yellow and then red.
   */
  count: number
  /**
   * The total allowed for this resource.
   */
  limit: number
}

/**
 * A titled group of resources in the usage panel.
 */
export interface TrialBadgeUsageSection {
  /**
   * Stable key for the section. Falls back to the title.
   */
  key?: string
  /**
   * Heading of the section.
   */
  title: React.ReactNode
  /**
   * The resources to list. The section total is the sum of their counts and limits.
   */
  items: TrialBadgeUsageItem[]
  /**
   * Text after the section total, e.g. `left` gives "14 of 30 left".
   * The total is shown only when this is passed.
   */
  totalSuffix?: React.ReactNode
}

/**
 * Content of the usage panel shown when hovering or focusing the badge.
 * Pass `sections` for several titled groups, or `items` (with an optional `title`) for one.
 */
export interface TrialBadgeUsage {
  /**
   * Titled groups of resources. Takes precedence over `items`.
   */
  sections?: TrialBadgeUsageSection[]
  /**
   * The resources to list when there is a single group and no `sections`.
   */
  items?: TrialBadgeUsageItem[]
  /**
   * Heading of the single group made from `items`.
   * @default 'Components left'
   */
  title?: React.ReactNode
  /**
   * Text after the total of the single group made from `items`.
   * The total is shown only when this is passed.
   */
  totalSuffix?: React.ReactNode
  /**
   * Text shown at the bottom left of the panel. Pass `null` to hide it.
   * @default 'Unlimited on Pro'
   */
  footerText?: React.ReactNode
  /**
   * Label of the panel's upgrade button.
   * @default 'Upgrade'
   */
  upgradeLabel?: React.ReactNode
  /**
   * Called when the panel's upgrade button is clicked.
   */
  onUpgrade?: React.MouseEventHandler<HTMLElement>
  /**
   * When set, the panel's upgrade button renders as an anchor pointing to this URL.
   */
  upgradeHref?: string
  /**
   * Share (0-1) of the limit above which a bar turns yellow. At or below it the bar is green.
   * @default 0.5
   */
  warningThreshold?: number
  /**
   * Share (0-1) of the limit at or above which a bar turns red.
   * @default 0.75
   */
  criticalThreshold?: number
}

/**
 * Color tone of a quota, from the share of its limit that is taken.
 */
export type TrialBadgeUsageTone = 'error' | 'warning' | 'success'

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

// Sized so the badge is ~34px tall, level with the other header items (icon buttons, avatar).
const RING_SIZE = 28
const RING_THICKNESS = 4

const POPPER_OPTIONS = {
  // Fixed positioning keeps the panel from being clipped by an overflow-hidden header.
  strategy: 'fixed' as const,
  modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
}
const CLOSE_DELAY_MS = 120

const getUsageTone = (
  count: number,
  limit: number,
  warningThreshold: number,
  criticalThreshold: number
): TrialBadgeUsageTone => {
  // A limit of 0 means nothing is allowed, so any use is over the limit.
  const share = limit > 0 ? count / limit : 1
  if (share >= criticalThreshold) return 'error'
  if (share > warningThreshold) return 'warning'
  return 'success'
}

const sumOf = (items: TrialBadgeUsageItem[], pick: (item: TrialBadgeUsageItem) => number) =>
  items.reduce((sum, item) => sum + Math.max(0, pick(item)), 0)

/**
 * Panel listing the usage of each resource, in titled sections. Rendered next to the badge, not
 * inside it, so its button is not nested in the badge's own button.
 */
const TrialBadgeUsagePanel: React.FC<{ usage: TrialBadgeUsage }> = ({ usage }) => {
  const {
    footerText = 'Unlimited on Pro',
    upgradeLabel = 'Upgrade',
    onUpgrade,
    upgradeHref,
    warningThreshold = 0.5,
    criticalThreshold = 0.75,
  } = usage

  const sections: TrialBadgeUsageSection[] = usage.sections ?? [
    { title: usage.title ?? 'Components left', items: usage.items ?? [], totalSuffix: usage.totalSuffix },
  ]
  const allItems = ([] as TrialBadgeUsageItem[]).concat(...sections.map(section => section.items))
  // The button is colored by the combined share across every section.
  const totalTone = getUsageTone(
    sumOf(allItems, item => item.count),
    sumOf(allItems, item => item.limit),
    warningThreshold,
    criticalThreshold
  )
  const buttonLinkProps = upgradeHref ? { component: 'a' as const, href: upgradeHref } : {}
  const textOf = (node: React.ReactNode) => (typeof node === 'string' ? node : undefined)

  return (
    <Card
      role="group"
      aria-label={textOf(sections[0]?.title) ?? 'Usage'}
      sx={{
        position: 'relative',
        width: 280,
        overflow: 'visible',
        // Opaque, so the arrow can blend into the card instead of showing the page through it.
        backgroundColor: 'background.paper',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      {/* Arrow pointing at the badge: an outline triangle plus an inner one that inherits the card's background
          and also covers the card's top border underneath, so the arrow opens into the card. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -8,
          right: 22,
          width: 14,
          height: 7,
          bgcolor: 'divider',
          clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -7,
          right: 23,
          width: 12,
          height: 7,
          backgroundColor: 'inherit',
          backgroundImage: 'inherit',
          clipPath: 'polygon(50% 0, 0 6px, 0 100%, 100% 100%, 100% 6px)',
        }}
      />
      {sections.map((section, index) => {
        const sectionCount = sumOf(section.items, item => item.count)
        const sectionLimit = sumOf(section.items, item => item.limit)
        return (
          <CardContent
            key={section.key ?? textOf(section.title) ?? index}
            role="group"
            aria-label={textOf(section.title)}
            sx={{
              px: 2,
              py: 1.25,
              '&:last-child': { pb: 1.25 },
              borderTop: index > 0 ? '1px solid' : undefined,
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {section.title}
              </Typography>
              {section.totalSuffix ? (
                <Typography variant="body2" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {sectionCount}
                  </Box>{' '}
                  of {sectionLimit} {section.totalSuffix}
                </Typography>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {section.items.map((item, itemIndex) => {
                const count = Math.max(0, item.count)
                const tone = getUsageTone(count, item.limit, warningThreshold, criticalThreshold)
                const value = item.limit > 0 ? Math.min(100, (count / item.limit) * 100) : 0
                return (
                  <Box
                    key={item.key ?? textOf(item.label) ?? itemIndex}
                    data-tone={tone}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 32px',
                      alignItems: 'center',
                      columnGap: 1.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.75rem' }}>
                      {item.label}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={value}
                      color={tone}
                      aria-label={textOf(item.label) ?? 'Usage'}
                      sx={{ height: 4, borderRadius: 999, bgcolor: 'action.hover' }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textAlign: 'right', fontSize: '0.75rem' }}
                    >
                      <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {count}
                      </Box>
                      /{item.limit}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </CardContent>
        )
      })}
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: 2,
          py: 1.25,
          '&:last-child': { pb: 1.25 },
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {footerText}
        </Typography>
        <Button
          variant="contained"
          color={totalTone}
          data-tone={totalTone}
          size="small"
          disableElevation
          onClick={onUpgrade}
          {...buttonLinkProps}
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'none',
            color: 'common.black',
            whiteSpace: 'nowrap',
            py: 0.25,
            minHeight: 0,
          }}
        >
          {upgradeLabel} →
        </Button>
      </CardContent>
    </Card>
  )
}

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
  onClick,
  usage,
  sx,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [panelOpen, setPanelOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const openPanel = () => {
    clearTimeout(closeTimer.current)
    setPanelOpen(true)
  }
  // A short delay lets the pointer cross the gap between the badge and the panel.
  const closePanelSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setPanelOpen(false), CLOSE_DELAY_MS)
  }
  React.useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Keep the exact (possibly fractional) value for status and progress, and round up
  // only what is displayed, so 0.5 days left is not shown as an expired trial.
  const exactDays = Math.max(0, Number.isFinite(daysLeft) ? daysLeft : 0)
  const days = Math.ceil(exactDays)
  const status = getTrialBadgeStatus(exactDays, endingSoonThreshold, criticalThreshold)
  const color = STATUS_COLOR[status]
  const isExpired = status === 'expired'
  const upgradeVisible = showUpgrade && (status === 'critical' || isExpired)
  const progress = totalDays > 0 ? Math.min(100, Math.max(0, (exactDays / totalDays) * 100)) : 0

  const interactive = Boolean(onUpgrade || onClick || upgradeHref)
  // Call both handlers so a consumer-supplied onClick does not replace onUpgrade.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    onUpgrade?.(event)
  }
  const interactiveProps = interactive
    ? upgradeHref
      ? { component: 'a', href: upgradeHref, onClick: handleClick }
      : { component: 'button', type: 'button', onClick: handleClick }
    : { role: 'group', tabIndex: usage ? 0 : undefined } // focusable so keyboard users can open the usage panel

  const badge = (
    <Box
      {...interactiveProps}
      data-status={status}
      sx={[
        theme => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          py: 0.25,
          pl: 0.5,
          pr: 1.5,
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
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8125rem', lineHeight: 1.2 }}>
          {isExpired ? expiredLabel : getTitle(days)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.6875rem',
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

  if (!usage) return badge

  return (
    <Box
      ref={setAnchorEl}
      sx={{ display: 'inline-flex' }}
      onMouseEnter={openPanel}
      onMouseLeave={closePanelSoon}
      onFocus={openPanel}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closePanelSoon()
      }}
      onKeyDown={event => {
        if (event.key === 'Escape') setPanelOpen(false)
      }}
    >
      {badge}
      <Popper
        open={panelOpen}
        anchorEl={anchorEl}
        placement="bottom-end"
        disablePortal
        popperOptions={POPPER_OPTIONS}
        sx={theme => ({ zIndex: theme.zIndex.tooltip })}
      >
        <TrialBadgeUsagePanel usage={usage} />
      </Popper>
    </Box>
  )
}

TrialBadge.displayName = 'TrialBadge'

export default TrialBadge
