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
import MuiPaper from '@mui/material/Paper';
import type {PaperProps as MuiPaperProps, PaperTypeMap} from '@mui/material/Paper';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ReactElement, Ref, ElementType} from 'react';

export type PaperProps<
  C extends ElementType = ElementType,
  D extends ElementType = PaperTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiPaperProps<D, P>, 'component'>;

/**
 * The Paper component is a container for displaying content on an elevated surface.
 *
 * Demos:
 *
 * - [Card (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-card)
 * - [Card (MUI)](https://mui.com/material-ui/react-card/)
 * - [Paper (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-paper)
 * - [Paper](https://mui.com/material-ui/react-paper/)
 *
 * API:
 *
 * - [Paper API](https://mui.com/material-ui/api/paper/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Paper component.
 * @param ref - The ref to be forwarded to the MuiPaper component.
 * @returns The rendered Paper component.
 */
const Paper: OverridableComponent<PaperTypeMap<PaperProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: PaperProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => (
    <MuiPaper
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-paper',
        'OxygenPaper-root',
        className,
      )}
      {...rest}
      ref={ref}
    />
  ),
) as OverridableComponent<PaperTypeMap<PaperProps>>;

export default Paper;
