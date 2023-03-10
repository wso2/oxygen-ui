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

import {BoxProps as MuiBoxProps} from '@mui/material';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box from '../Box';
import './tab-panel.scss';

export interface TabPanelProps extends MuiBoxProps {
  /*
   * The index of the corresponding `TabPanel`.
   */
  index: number;
  /*
   * The value of the selected `TabPanel`.
   */
  value: number;
}

const COMPONENT_NAME: string = 'TabPanel';

const TabPanel: ForwardRefExoticComponent<TabPanelProps> & WithWrapperProps = forwardRef(
  (props: TabPanelProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, children, value, index, ...rest} = props;

    const classes: string = clsx('oxygen-tab-panel', className);

    return (
      <Box className={classes} ref={ref} role="tabpanel" hidden={value !== index} {...rest}>
        {value === index && <Box>{children}</Box>}
      </Box>
    );
  },
) as ForwardRefExoticComponent<TabPanelProps> & WithWrapperProps;

TabPanel.displayName = composeComponentDisplayName(COMPONENT_NAME);
TabPanel.muiName = COMPONENT_NAME;

export default TabPanel;
