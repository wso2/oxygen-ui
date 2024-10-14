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

import MuiAccordionSummary from '@mui/material/AccordionSummary';
import type {
  AccordionSummaryProps as MuiAccordionSummaryProps,
  AccordionSummaryTypeMap,
} from '@mui/material/AccordionSummary';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, ElementType, Ref} from 'react';

export type AccordionSummaryProps<
  C extends ElementType = ElementType,
  D extends ElementType = AccordionSummaryTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiAccordionSummaryProps<D, P>, 'component'>;

/**
 * The Accordion Summary component is the wrapper for the Accordion header, which expands or collapses the content when clicked.
 *
 * Demos:
 *
 * - [Accordion (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-accordion)
 * - [Accordion (MUI)](https://mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionSummary API](https://mui.com/material-ui/api/accordion-summary/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 *
 * @remarks
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the AccordionSummary component.
 * @param ref - The ref to be forwarded to the MuiAccordionSummary component.
 * @returns The rendered AccordionSummary component.
 */
const AccordionSummary: OverridableComponent<AccordionSummaryTypeMap<AccordionSummaryProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: AccordionSummaryProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-accordion-summary', className);

    return <MuiAccordionSummary ref={ref} className={classes} {...rest} />;
  },
) as OverridableComponent<AccordionSummaryTypeMap<AccordionSummaryProps>>;

export default AccordionSummary;
