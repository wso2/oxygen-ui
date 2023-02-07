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

import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiLink, {LinkProps as MuiLinkProps} from '@mui/material/Link';
import {composeComponentDisplayName} from '../../utils';
import {WithWrapperProps} from '../../models';

export type LinkProps = MuiLinkProps;

const COMPONENT_NAME: string = 'Link';

const Link: FC<LinkProps> & WithWrapperProps = (props: LinkProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-link', className);

  return <MuiLink className={classes} underline="hover" {...rest} />;
};

Link.displayName = composeComponentDisplayName(COMPONENT_NAME);
Link.muiName = COMPONENT_NAME;
Link.defaultProps = {};

export default Link;
