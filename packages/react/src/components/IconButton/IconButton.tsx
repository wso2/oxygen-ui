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

import MuiIconButton, {IconButtonProps as MuiIconButtonProps} from '@mui/material/IconButton';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './icon-button.scss';

export type IconButtonProps = MuiIconButtonProps;

const COMPONENT_NAME: string = 'IconButton';

const IconButton: FC<IconButtonProps> & WithWrapperProps = (props: IconButtonProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-icon-button', className);

  return <MuiIconButton className={classes} {...rest} />;
};

IconButton.displayName = composeComponentDisplayName(COMPONENT_NAME);
IconButton.muiName = COMPONENT_NAME;
IconButton.defaultProps = {};

export default IconButton;
