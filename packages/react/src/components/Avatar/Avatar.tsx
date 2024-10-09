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

import MuiAvatar, {AvatarProps as MuiAvatarProps} from '@mui/material/Avatar';
import clsx from 'clsx';
import {ElementType, FC, ReactElement, useMemo} from 'react';
import usePastelColorGenerator from '../../hooks/use-pastel-color-generator';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './avatar.scss';

export type AvatarProps<C extends ElementType = ElementType> = {
  /**
   * Text for the random background color generator.
   */
  backgroundColorRandomizer?: string;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
  /**
   * If `true`, the background color will be randomly generated.
   */
  randomBackgroundColor?: boolean;
} & Omit<MuiAvatarProps, 'component'>;

const COMPONENT_NAME: string = 'Avatar';

const Avatar: FC<AvatarProps> & WithWrapperProps = <C extends ElementType>({
  className,
  children,
  component,
  randomBackgroundColor,
  backgroundColorRandomizer,
  ...rest
}: AvatarProps<C>): ReactElement => {
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

export default Avatar;
