/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {Badge, BadgeProps, CircularProgress, CircularProgressProps} from '@mui/material';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Avatar, {AvatarProps} from '../Avatar';
import Box from '../Box';
import './circular-progress-avatar.scss';

export interface CircularProgressAvatarProps extends Omit<CircularProgressProps, 'value'> {
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
}

const COMPONENT_NAME: string = 'CircularProgressAvatar';

const CircularProgressAvatar: FC<CircularProgressAvatarProps> & WithWrapperProps = (
  props: CircularProgressAvatarProps,
): ReactElement => {
  const {className, progress, badgeOptions, avatarOptions, ...rest} = props;

  const classes: string = clsx('oxygen-circular-progress-avatar', className);

  return (
    <Box className={classes} role="presentation">
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
};

CircularProgressAvatar.displayName = composeComponentDisplayName(COMPONENT_NAME);
CircularProgressAvatar.muiName = COMPONENT_NAME;
CircularProgressAvatar.defaultProps = {};

export default CircularProgressAvatar;
