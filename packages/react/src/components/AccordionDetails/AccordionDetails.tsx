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

import MuiAccordionDetails from '@mui/material/AccordionDetails';
import type {AccordionDetailsProps as MuiAccordionDetailsProps} from '@mui/material/AccordionDetails';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, MutableRefObject} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type AccordionDetailsProps = MuiAccordionDetailsProps;

const COMPONENT_NAME: string = 'AccordionDetails';

/**
 * The Accordion Details component is the wrapper for the Accordion content.
 *
 * Demos:
 *
 * - [Accordion (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-accordion)
 * - [Accordion (MUI)](https://mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionDetails API](https://mui.com/material-ui/api/accordion-details/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the AccordionDetails component.
 * @param ref - The ref to be forwarded to the MuiAccordionDetails component.
 * @returns The rendered AccordionDetails component.
 */
const AccordionDetails: ForwardRefExoticComponent<AccordionDetailsProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: AccordionDetailsProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-accordion-details', className);

    return <MuiAccordionDetails ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<AccordionDetailsProps> & WithWrapperProps;

AccordionDetails.displayName = composeComponentDisplayName(COMPONENT_NAME);
AccordionDetails.muiName = COMPONENT_NAME;

export default AccordionDetails;
