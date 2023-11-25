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

import MuiAvatar, {AvatarProps as MuiAvatarProps} from '@mui/material/Avatar';
import clsx from 'clsx';
import {ElementType, FC, ReactElement, useMemo} from 'react';
import usePastelColorGenerator from 'src/hooks/use-pastel-color-generator';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './avatar.scss';

export type AvatarProps<C extends ElementType = ElementType> = {
  backgroundColorRandomizer?: string;
  component?: C;
  randomBackgroundColor?: boolean;
} & Omit<MuiAvatarProps<C>, 'component'>;

const COMPONENT_NAME: string = 'Avatar';

const Avatar: FC<AvatarProps> & WithWrapperProps = <C extends ElementType>(props: AvatarProps<C>): ReactElement => {
  const {className, children, component, randomBackgroundColor, backgroundColorRandomizer, ...rest} = props;

  const colorRandomizer: string = useMemo(() => {
    if (backgroundColorRandomizer) {
      return backgroundColorRandomizer;
    }

    if (typeof children === 'string') {
      return children;
    }

    return '';
  }, [children, backgroundColorRandomizer]);

  const {color} = usePastelColorGenerator(colorRandomizer);

  const classes: string = clsx('oxygen-avatar', className);

  return (
    <MuiAvatar
      component={component}
      className={classes}
      sx={{bgcolor: randomBackgroundColor ? color : undefined}}
      {...rest}
    >
      {children}
    </MuiAvatar>
  );
};

Avatar.displayName = composeComponentDisplayName(COMPONENT_NAME);
Avatar.muiName = COMPONENT_NAME;
Avatar.defaultProps = {};

export default Avatar;
