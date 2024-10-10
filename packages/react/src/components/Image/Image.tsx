/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ImgHTMLAttributes, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

const COMPONENT_NAME: string = 'Image';

/**
 * The Footers display a set of links and a copyright at the bottom of the application.
 *
 * TODO: Refer improvement issue if this Image component is required.
 * @see {@link https://github.com/wso2/oxygen-ui/issues/65}
 *
 * Demos:
 *
 * - [Image (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-image)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the Image component.
 * @param ref - The ref to be forwarded to the img component.
 * @returns The rendered Image component.
 */
const Image: ForwardRefExoticComponent<ImageProps> & WithWrapperProps = forwardRef(
  ({className, alt, ...rest}: ImageProps, ref: MutableRefObject<HTMLImageElement>): ReactElement => {
    const classes: string = clsx('oxygen-image', className);

    return <img ref={ref} className={classes} alt={alt} {...rest} />;
  },
) as ForwardRefExoticComponent<ImageProps> & WithWrapperProps;

Image.displayName = composeComponentDisplayName(COMPONENT_NAME);
Image.muiName = COMPONENT_NAME;

export default Image;
