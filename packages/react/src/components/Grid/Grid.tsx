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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiGrid from '@mui/material/Unstable_Grid2';
import type {Grid2TypeMap, Grid2Props as MuiGridProps} from '@mui/material/Unstable_Grid2';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import './grid.scss';

export type GridProps<
  C extends ElementType = ElementType,
  D extends React.ElementType = Grid2TypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiGridProps<D, P>, 'component'>;

/**
 * The Grid adapts to screen size and orientation, ensuring consistency across layouts.
 *
 * Demos:
 *
 * - [Grid (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/layout-grid)
 * - [Grid (MUI)](https://mui.com/material-ui/react-grid2/)
 *
 * API:
 *
 * - [Grid API](https://mui.com/material-ui/api/grid-2/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the FormControl component.
 * @param ref - The ref to be forwarded to the MuiFormControl component.
 * @returns The rendered FormControl component.
 */
const Grid: OverridableComponent<Grid2TypeMap<GridProps>> = forwardRef(
  <C extends ElementType = ElementType>({className, ...rest}: GridProps<C>, ref: Ref<HTMLDivElement>): ReactElement => (
    <MuiGrid
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-grid',
        'OxygenGrid-root',
        className,
      )}
      {...rest}
    />
  ),
) as OverridableComponent<Grid2TypeMap<GridProps>>;

export default Grid;
