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

import MuiAvatar from '@mui/material/Avatar';
import type {AvatarProps as MuiAvatarProps, AvatarTypeMap} from '@mui/material/Avatar';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef, useMemo} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import usePastelColorGenerator from '../../hooks/use-pastel-color-generator';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './avatar.scss';

export type AvatarProps<
  C extends ElementType = ElementType,
  D extends ElementType = AvatarTypeMap['defaultComponent'],
  P = {},
> = {
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
} & Omit<MuiAvatarProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Avatar';

/**
 * The Alert component display brief messages for the user without interrupting their use of the app.
 *
 * Demos:
 *
 * - [Avatar (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-avatar)
 * - [Avatar (MUI)](https://mui.com/material-ui/react-avatar/)
 *
 * API:
 *
 * - [Avatar API](https://mui.com/material-ui/api/avatar/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Avatar component.
 * @param ref - The ref to be forwarded to the MuiAvatar component.
 * @returns The rendered Avatar component.
 */
const Avatar: OverridableComponent<AvatarTypeMap<AvatarProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, children, randomBackgroundColor, backgroundColorRandomizer, ...rest}: AvatarProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
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
      <MuiAvatar ref={ref} className={classes} sx={{bgcolor: randomBackgroundColor ? color : undefined}} {...rest}>
        {children}
      </MuiAvatar>
    );
  },
) as OverridableComponent<AvatarTypeMap<AvatarProps>> & WithWrapperProps;

Avatar.displayName = composeComponentDisplayName(COMPONENT_NAME);
Avatar.muiName = COMPONENT_NAME;

export default Avatar;
