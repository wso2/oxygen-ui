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

import {ModalTypeMap} from '@mui/material/Modal';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiPopover from '@mui/material/Popover';
import type {PopoverProps as MuiPopoverProps} from '@mui/material/Popover';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type PopoverProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiPopoverProps, 'component'>;

const COMPONENT_NAME: string = 'Popover';

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
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Popover component.
 * @param ref - The ref to be forwarded to the MuiPopover component.
 * @returns The rendered Popover component.
 */
const Popover: OverridableComponent<ModalTypeMap<ModalTypeMap['defaultComponent'], PopoverProps>> & WithWrapperProps =
  forwardRef(
    <C extends ElementType = ElementType>(
      {className, ...rest}: PopoverProps<C>,
      ref: Ref<HTMLDivElement>,
    ): ReactElement => {
      const classes: string = clsx('oxygen-popover', className);

      return <MuiPopover className={classes} {...rest} ref={ref} />;
    },
  ) as OverridableComponent<ModalTypeMap<ModalTypeMap['defaultComponent'], PopoverProps>> & WithWrapperProps;

Popover.displayName = composeComponentDisplayName(COMPONENT_NAME);
Popover.muiName = COMPONENT_NAME;

export default Popover;
