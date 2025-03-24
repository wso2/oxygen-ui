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

import MuiPopover from '@mui/material/Popover';
import type {PopoverProps as MuiPopoverProps} from '@mui/material/Popover';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType, ForwardRefExoticComponent} from 'react';

export type PopoverProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiPopoverProps, 'component'>;

/**
 * A Popover can be used to display some content on top of another.
 *
 * Demos:
 *
 * - [Menu (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-menu)
 * - [Menu (MUI)](https://mui.com/material-ui/react-menu/)
 * - [Popover (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/utils-popover)
 * - [Popover (MUI)](https://mui.com/material-ui/react-popover/)
 *
 * API:
 *
 * - [Popover API](https://mui.com/material-ui/api/popover/)
 * - inherits [Modal API](https://mui.com/material-ui/api/modal/)
 *
 * @remarks
 * - ✔️ Props of the [Modal](https://mui.com/material-ui/api/modal/) component are also available.
 * - FIXME: ⚠️ `component` prop is temporarily not supported due to https://github.com/wso2/oxygen-ui/issues/283
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Popover component.
 * @param ref - The ref to be forwarded to the MuiPopover component.
 * @returns The rendered Popover component.
 */
const Popover: ForwardRefExoticComponent<PopoverProps> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: PopoverProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => (
    <MuiPopover
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-popover',
        'OxygenPopover-root',
        className,
      )}
      {...rest}
      ref={ref}
    />
  ),
) as ForwardRefExoticComponent<PopoverProps>;

export default Popover;
