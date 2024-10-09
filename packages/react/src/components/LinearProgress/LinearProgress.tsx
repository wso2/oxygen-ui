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

import MuiLinearProgress, {LinearProgressProps as MuiLinearProgressProps} from '@mui/material/LinearProgress';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type LinearProgressProps = MuiLinearProgressProps;

const COMPONENT_NAME: string = 'LinearProgress';

const LinearProgress: FC<LinearProgressProps> & WithWrapperProps = ({
  className,
  ...rest
}: LinearProgressProps): ReactElement => {
  const classes: string = clsx('oxygen-linear-progress', className);

  return <MuiLinearProgress aria-label="progress-bar" className={classes} {...rest} />;
};

LinearProgress.displayName = composeComponentDisplayName(COMPONENT_NAME);
LinearProgress.muiName = COMPONENT_NAME;

export default LinearProgress;
