/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';
import Avatar from '../Avatar';
import type {AvatarProps} from '../Avatar';
import type {BadgeProps} from '../Badge';
import Badge from '../Badge';
import Box from '../Box';
import type {CircularProgressProps} from '../CircularProgress';
import CircularProgress from '../CircularProgress';
import './circular-progress-avatar.scss';

export type CircularProgressAvatarProps = Omit<CircularProgressProps, 'value'> & {
  /**
   * Props sent to the Avatar component.
   */
  avatarOptions?: Omit<AvatarProps, 'variant'>;
  /**
   * Props sent to the Badge component.
   */
  badgeOptions?: Omit<BadgeProps, 'overlap' | 'anchorOrigin' | 'showZero'>;
  /**
   * Value prop sent to CircularProgress component.
   */
  progress?: number;
};

/**
 * The Circular Progress Avatar is a Avatar variant with a circular progress and a badge.
 *
 * Demos:
 *
 * // TODO: Move this demo to the Progress demo.
 * - [Circular Progress Avatar (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-circular-progress-avatar)
 *
 * API:
 *
 * - [CircularProgress API](https://mui.com/material-ui/api/circular-progress/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the CircularProgressAvatar component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered CircularProgressAvatar component.
 */
const CircularProgressAvatar: ForwardRefExoticComponent<CircularProgressAvatarProps> = forwardRef(
  (
    {className, progress, badgeOptions, avatarOptions, ...rest}: CircularProgressAvatarProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-circular-progress-avatar', className);

    return (
      <Box ref={ref} className={classes} role="presentation">
        <Badge
          className="oxygen-badge"
          overlap="circular"
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          {...badgeOptions}
        >
          <Avatar {...avatarOptions} />
          <CircularProgress
            aria-label="progress"
            size={90}
            className="oxygen-circular-progress"
            variant="determinate"
            value={progress}
            {...rest}
          />
          <CircularProgress
            aria-label="progress"
            size={90}
            className="oxygen-circular-progress frame"
            variant="determinate"
            value={100}
            {...rest}
          />
        </Badge>
      </Box>
    );
  },
) as ForwardRefExoticComponent<CircularProgressAvatarProps>;

export default CircularProgressAvatar;
