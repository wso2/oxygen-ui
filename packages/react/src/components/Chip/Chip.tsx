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

import MuiChip from '@mui/material/Chip';
import type {ChipProps as MuiChipProps, ChipTypeMap} from '@mui/material/Chip';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './chip.scss';

export type ChipProps<
  C extends ElementType = ElementType,
  D extends ElementType = ChipTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiChipProps<D, P>, 'component'>;

const COMPONENT_NAME: string = 'Chip';

/**
 * The Chips are compact elements that represent an input, attribute, or action.
 *
 * Demos:
 *
 * - [Chip (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-chip)
 * - [Chip (MUI)](https://mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [Chip API](https://mui.com/material-ui/api/chip/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Chip component.
 * @param ref - The ref to be forwarded to the MuiChip component.
 * @returns The rendered Chip component.
 */
const Chip: ForwardRefExoticComponent<ChipProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>({className, ...rest}: ChipProps<C>, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-chip', className);

    return <MuiChip ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<ChipProps> & WithWrapperProps;

Chip.displayName = composeComponentDisplayName(COMPONENT_NAME);
Chip.muiName = COMPONENT_NAME;

export default Chip;
