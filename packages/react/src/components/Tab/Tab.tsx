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

import MuiTab, {TabProps as MuiTabProps} from '@mui/material/Tab';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './tab.scss';

export type TabProps = MuiTabProps;

const COMPONENT_NAME: string = 'Tab';

const Tab: ForwardRefExoticComponent<TabProps> & WithWrapperProps = forwardRef(
  (props: TabProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-tab', className);

    return <MuiTab className={classes} ref={ref} {...rest} />;
  },
) as ForwardRefExoticComponent<TabProps> & WithWrapperProps;

Tab.displayName = composeComponentDisplayName(COMPONENT_NAME);
Tab.muiName = COMPONENT_NAME;

export default Tab;
