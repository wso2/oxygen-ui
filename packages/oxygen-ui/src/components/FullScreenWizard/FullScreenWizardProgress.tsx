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
import LinearProgress from '@mui/material/LinearProgress';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { resolveLabel, useFullScreenWizard } from './context';

/**
 * Theme tokens used in this component:
 *
 * Colors:
 * - `primary` (or the `color` prop) - Bar color, and the filled segments in the segmented variant
 * - `divider` - Empty segments in the segmented variant
 *
 * Spacing (segmented variant):
 * - `spacing(0.5)` - Segment height and the gap between segments
 * - `spacing(2)` / `spacing(3)` / `spacing(4)` - Horizontal inset on xs / from sm / from md up,
 *   matching the header so the segments line up with it
 *
 * The bar spans the full width of the wizard and never shrinks.
 */

/**
 * Styled progress bar for the wizard.
 */
const FullScreenWizardProgressRoot = styled(LinearProgress, {
  name: 'MuiFullScreenWizard',
  slot: 'Progress',
})({
  flexShrink: 0,
});

type ProgressColor = Exclude<LinearProgressProps['color'], undefined | 'inherit'>;

/**
 * Styled row of segments, one per step.
 */
const FullScreenWizardProgressSegments = styled('div', {
  name: 'MuiFullScreenWizard',
  slot: 'ProgressSegments',
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  flexShrink: 0,
  padding: theme.spacing(2, 2, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 3, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 4, 0),
  },
}));

/**
 * Styled single segment.
 */
const FullScreenWizardProgressSegment = styled('span', {
  name: 'MuiFullScreenWizard',
  slot: 'ProgressSegment',
})<{ ownerState: { filled: boolean; color: ProgressColor } }>(({ theme, ownerState }) => ({
  flex: 1,
  height: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: ownerState.filled
    ? (theme.vars || theme).palette[ownerState.color].main
    : (theme.vars || theme).palette.divider,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.short,
  }),
}));

/**
 * Props for the FullScreenWizard.Progress component.
 */
export interface FullScreenWizardProgressProps
  extends Omit<LinearProgressProps, 'variant' | 'value' | 'valueBuffer'> {
  /** Progress through the wizard, from 0 to 100. Values outside the range are clamped. */
  value: number;
  /**
   * Text read by screen readers in place of the percentage, e.g. "Step 2 of 3".
   */
  valueText?: string;
  /**
   * Accessible name of the progress bar.
   * @default 'Progress'
   */
  progressLabel?: string;
  /**
   * `bar` is a thin bar across the full width. `segmented` shows one segment
   * per step, inset to line up with the header; it needs `steps`.
   * @default 'bar'
   */
  variant?: 'bar' | 'segmented';
  /** Number of segments in the `segmented` variant, usually the number of steps */
  steps?: number;
}

/**
 * FullScreenWizard.Progress - Determinate progress indicator along the top of the wizard.
 *
 * Leave it out for a single-step form. Both variants render a `progressbar`
 * with the same value, name and value text.
 *
 * @example
 * ```tsx
 * <FullScreenWizard.Progress
 *   value={wizard.progress}
 *   valueText={`Step ${wizard.activeIndex + 1} of ${wizard.count}`}
 * />
 *
 * <FullScreenWizard.Progress variant="segmented" steps={wizard.count} value={wizard.progress} />
 * ```
 */
export const FullScreenWizardProgress = React.forwardRef<HTMLDivElement, FullScreenWizardProgressProps>(
  function FullScreenWizardProgress(
    {
  value,
  valueText,
  progressLabel,
  variant = 'bar',
  steps = 0,
  color = 'primary',
  classes,
  ...props
    },
    ref
  ) {
  useFullScreenWizard('FullScreenWizard.Progress');
  const clampedValue = Math.min(100, Math.max(0, value));
  const label = resolveLabel(progressLabel, 'Progress');

  if (variant === 'segmented') {
    const segmentCount = Math.max(0, Math.floor(steps));
    const filledCount = Math.round((clampedValue / 100) * segmentCount);
    return (
      <FullScreenWizardProgressSegments
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clampedValue)}
        aria-valuetext={valueText}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {Array.from({ length: segmentCount }, (_, index) => (
          <FullScreenWizardProgressSegment
            key={index}
            ownerState={{ filled: index < filledCount, color: color === 'inherit' ? 'primary' : color }}
          />
        ))}
      </FullScreenWizardProgressSegments>
    );
  }

  return (
    <FullScreenWizardProgressRoot
      ref={ref}
      aria-label={label}
      aria-valuetext={valueText}
      color={color}
      classes={classes}
      {...props}
      variant="determinate"
      value={clampedValue}
    />
  );
  }
);

FullScreenWizardProgress.displayName = 'FullScreenWizard.Progress';

export default FullScreenWizardProgress;
