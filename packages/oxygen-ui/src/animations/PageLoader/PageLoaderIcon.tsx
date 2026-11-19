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

/**
 * The ten poses an ellipse can take. Every ellipse walks the ring clockwise, one pose per
 * step, so the mark keeps the same shape at every step and only the ellipses change places.
 * Pose 3 is the hidden one on the right, where an ellipse fades out and the next fades in.
 */
const POSES: ReadonlyArray<readonly [cx: number, cy: number, rx: number, ry: number, opacity: number]> = [
  [742.48, 38.71, 223.72, 38.71, 1],
  [994.89, 214.11, 205.12, 81.09, 1],
  [1121.72, 446.86, 213.06, 96.05, 1],
  [1180, 700, 150, 8, 0],
  [1121.72, 954.99, 213.06, 96.05, 1],
  [994.89, 1187.74, 205.12, 81.09, 1],
  [742.48, 1363.14, 223.72, 38.71, 1],
  [287.14, 933.67, 173.98, 81.09, 1],
  [213.06, 700.92, 213.06, 96.05, 1],
  [287.14, 468.17, 173.98, 81.09, 1],
];

/** Length of one full loop, in seconds. */
export const PAGE_LOADER_ICON_CYCLE = 4.6;
/** Length of one step (a move followed by a hold), in seconds. */
export const PAGE_LOADER_ICON_STEP = PAGE_LOADER_ICON_CYCLE / POSES.length;
/** Part of each step spent moving; the rest is a hold where the mark is at rest. */
export const PAGE_LOADER_ICON_MOVE = 0.3;

const STEP_FRACTION = 1 / POSES.length;
const MOVE_FRACTION = PAGE_LOADER_ICON_MOVE / PAGE_LOADER_ICON_CYCLE;

const MOVE_SPLINE = '.25 .9 .3 1';
const HOLD_SPLINE = '0 0 1 1';
const SHRINK_SPLINE = '.45 0 .55 1';

/**
 * Legs 6 → 7 and 9 → 0 cross the gaps between the two arcs, so they are about twice as long as
 * the others but take the same time. Moving in a straight line, those ellipses ran into the one
 * leaving the slot ahead of them. To keep them clear, each one:
 * - bends outwards: one axis lags the other, so the path curves around the outside of the ring, and
 * - shrinks to `LONG_LEG_SHRINK` of its size at `LONG_LEG_SHRINK_AT` of the move, then grows back.
 * The poses at rest are unchanged, so the mark looks the same between moves.
 */
const LONG_LEG_SPLINES: Record<number, Partial<Record<'cx' | 'cy', string>>> = {
  6: { cy: '.7 0 .4 1' },
  9: { cx: '.4 .5 .3 1' },
};
const LONG_LEG_SHRINK = 0.5;
const LONG_LEG_SHRINK_AT = 0.3;

const ATTRIBUTES = ['cx', 'cy', 'rx', 'ry', 'opacity'] as const;
type Attribute = (typeof ATTRIBUTES)[number];

const round = (value: number): number => Number(value.toFixed(5));

interface Track {
  keyTimes: string;
  keySplines: string;
  values: string;
}

/** Keyframes for one attribute of the ellipse that starts at pose `start`: move, hold, move, hold... */
const trackFor = (start: number, attribute: Attribute): Track => {
  const index = ATTRIBUTES.indexOf(attribute);
  const keyTimes = [0];
  const keySplines: string[] = [];
  const values = [POSES[start][index]];

  for (let step = 0; step < POSES.length; step += 1) {
    const leg = (start + step) % POSES.length;
    const from = POSES[leg][index];
    const to = POSES[(leg + 1) % POSES.length][index];
    const stepStart = step * STEP_FRACTION;
    const longLeg = LONG_LEG_SPLINES[leg];

    if (longLeg && (attribute === 'rx' || attribute === 'ry')) {
      keyTimes.push(round(stepStart + MOVE_FRACTION * LONG_LEG_SHRINK_AT));
      values.push(round(Math.min(from, to) * LONG_LEG_SHRINK));
      keySplines.push(SHRINK_SPLINE, SHRINK_SPLINE);
    } else {
      const spline = longLeg && (attribute === 'cx' || attribute === 'cy') ? longLeg[attribute] : undefined;
      keySplines.push(spline ?? MOVE_SPLINE);
    }

    keyTimes.push(round(stepStart + MOVE_FRACTION), round(stepStart + STEP_FRACTION));
    values.push(to, to);
    keySplines.push(HOLD_SPLINE);
  }

  return { keyTimes: keyTimes.join(';'), keySplines: keySplines.join(';'), values: values.join(';') };
};

export interface PageLoaderIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Height of the icon in pixels. The width follows the aspect ratio.
   * @default 48
   */
  size?: number;
}

/**
 * The animated Oxygen UI mark: ten ellipses rotating around a ring.
 * Uses `currentColor`, so it follows the CSS `color` of its parent.
 */
const PageLoaderIcon = React.forwardRef<SVGSVGElement, PageLoaderIconProps>(
  ({ size = 48, ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-20 0 1375 1402"
      height={size}
      width={(size * 1375) / 1402}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g fill="currentColor">
        {POSES.map(([cx, cy, rx, ry, opacity], index) => (
          <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} opacity={opacity}>
            {ATTRIBUTES.map(attributeName => (
              <animate
                key={attributeName}
                attributeName={attributeName}
                dur={`${PAGE_LOADER_ICON_CYCLE}s`}
                repeatCount="indefinite"
                calcMode="spline"
                {...trackFor(index, attributeName)}
              />
            ))}
          </ellipse>
        ))}
      </g>
    </svg>
  ),
);

PageLoaderIcon.displayName = 'PageLoaderIcon';

export default PageLoaderIcon;
