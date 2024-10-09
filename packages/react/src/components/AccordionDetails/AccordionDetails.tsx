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

import MuiAccordionDetails, {AccordionDetailsProps as MuiAccordionDetailsProps} from '@mui/material/AccordionDetails';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, ReactElement, MutableRefObject} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export type AccordionDetailsProps = MuiAccordionDetailsProps;

const COMPONENT_NAME: string = 'AccordionDetails';

const AccordionDetails: ForwardRefExoticComponent<AccordionDetailsProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: AccordionDetailsProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-accordion-details', className);

    return <MuiAccordionDetails className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<AccordionDetailsProps> & WithWrapperProps;

AccordionDetails.displayName = composeComponentDisplayName(COMPONENT_NAME);
AccordionDetails.muiName = COMPONENT_NAME;

export default AccordionDetails;
