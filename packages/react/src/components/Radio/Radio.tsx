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

import MuiRadio from '@mui/material/Radio';
import type {RadioProps as MuiRadioProps} from '@mui/material/Radio';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, MutableRefObject, ElementType} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type RadioProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiRadioProps, 'component'>;

const COMPONENT_NAME: string = 'Radio';

/**
 * A Radio component is used to allow users to select a single option from a list of options.
 *
 * Demos:
 *
 * - [Radio Group (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-radio-group)
 * - [Radio Group (MUI)](https://mui.com/material-ui/react-radio-button/)
 *
 * API:
 *
 * - [Radio API](https://mui.com/material-ui/api/radio/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Radio component.
 * @param ref - The ref to be forwarded to the MuiRadio component.
 * @returns The rendered Radio component.
 */
const Radio: ForwardRefExoticComponent<RadioProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: RadioProps<C>,
    ref: MutableRefObject<HTMLButtonElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-radio', className);

    return <MuiRadio className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<RadioProps> & WithWrapperProps;

Radio.displayName = composeComponentDisplayName(COMPONENT_NAME);
Radio.muiName = COMPONENT_NAME;

export default Radio;
