/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {Box, BoxProps} from '@mui/material';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export interface ImageProps extends BoxProps {
  /**
   * Alternative text for the image.
   */
  alt: string;
  /**
   * Source of the image.
   */
  src: string;
}

const COMPONENT_NAME: string = 'Image';

const Image: FC<ImageProps> & WithWrapperProps = (props: BoxProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-image', className);

  return <Box className={classes} component="img" {...rest} />;
};

Image.displayName = composeComponentDisplayName(COMPONENT_NAME);
Image.muiName = COMPONENT_NAME;

export default Image;
