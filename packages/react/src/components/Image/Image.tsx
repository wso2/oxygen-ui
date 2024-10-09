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

import clsx from 'clsx';
import {FC, ImgHTMLAttributes, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

const COMPONENT_NAME: string = 'Image';

/**
 * TODO: Refer improvement issue if this Image component is required.
 * @see {@link https://github.com/wso2/oxygen-ui/issues/65}
 */
const Image: FC<ImageProps> & WithWrapperProps = ({className, alt, ...rest}: ImageProps): ReactElement => {
  const classes: string = clsx('oxygen-image', className);

  return <img className={classes} alt={alt} {...rest} />;
};

Image.displayName = composeComponentDisplayName(COMPONENT_NAME);
Image.muiName = COMPONENT_NAME;

export default Image;
