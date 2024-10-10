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

import MuiAccordion, {AccordionProps as MuiAccordionProps} from '@mui/material/Accordion';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './accordion.scss';

export type AccordionProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiAccordionProps, 'component'>;

const COMPONENT_NAME: string = 'Accordion';

/**
 * The Accordion component lets users show and hide sections of related content on a page.
 *
 * Demos:
 *
 * - [Accordion (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-accordion)
 * - [Accordion (MUI)](https://mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [Accordion API](https://mui.com/material-ui/api/accordion/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 *
 * @remarks
 * - ✔️ Props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Accordion component.
 * @param ref - The ref to be forwarded to the MuiAccordion component.
 * @returns The rendered Accordion component.
 */
const Accordion: ForwardRefExoticComponent<AccordionProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: AccordionProps<C>,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-accordion', className);

    return <MuiAccordion ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<AccordionProps> & WithWrapperProps;

Accordion.displayName = composeComponentDisplayName(COMPONENT_NAME);
Accordion.muiName = COMPONENT_NAME;

export default Accordion;
