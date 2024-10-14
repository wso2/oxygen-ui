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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {TypographyTypeMap} from '../Typography';
import Typography, {TypographyProps} from '../Typography/Typography';
import './code.scss';

export type CodeProps<C extends ElementType = ElementType> = TypographyProps<C> & {
  /**
   * Shows the code block with a filled background.
   * @default true
   */
  filled?: boolean;
  /**
   * Renders the code block with an outline.
   * @default false
   */
  outlined?: boolean;
};

/**
 * The Code can represent an inline or block code without syntax highlight.
 *
 * Demos:
 *
 * - [Code (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-code)
 *
 * API:
 *
 * - inherits [Typography API](https://mui.com/material-ui/api/typography/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Code component.
 * @param ref - The ref to be forwarded to the Typography component.
 * @returns The rendered Code component.
 */
const Code: OverridableComponent<TypographyTypeMap<CodeProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, children, filled = true, outlined = false, ...rest}: CodeProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-code', {filled, outlined}, className);

    return (
      <Typography ref={ref} component="code" className={classes} {...rest}>
        {children}
      </Typography>
    );
  },
) as OverridableComponent<TypographyTypeMap<CodeProps>>;

export default Code;
