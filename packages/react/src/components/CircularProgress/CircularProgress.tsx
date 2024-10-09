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

import MuiCircularProgress, {CircularProgressProps as MuiCircularProgressProps} from '@mui/material/CircularProgress';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './circular-progress.scss';

export type CircularProgressProps = MuiCircularProgressProps;

const COMPONENT_NAME: string = 'CircularProgress';

const CircularProgress: FC<CircularProgressProps> & WithWrapperProps = (props: CircularProgressProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-circular-progress', className);

  return <MuiCircularProgress aria-label="progress" className={classes} {...rest} />;
};

CircularProgress.displayName = composeComponentDisplayName(COMPONENT_NAME);
CircularProgress.muiName = COMPONENT_NAME;
CircularProgress.defaultProps = {};

export default CircularProgress;
