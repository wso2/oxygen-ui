/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import MuiTableContainer, {
  TableContainerProps as MuiTableContainerProps,
  TableContainerTypeMap,
} from '@mui/material/TableContainer';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type TableContainerProps<
  C extends ElementType = ElementType,
  D extends ElementType = TableContainerTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiTableContainerProps<D, P>, 'component'>;

/**
 * The TableContainer component lets display a container of the table
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableContainer API](https://mui.com/material-ui/api/table-container/)
 * @remarks
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Table component.
 * @param ref - The ref to be forwarded to the MuiTable component.
 * @returns The rendered Tablee component.
 */
const TableContainer: ForwardRefExoticComponent<TableContainerProps> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: TableContainerProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-table-container', className);

    return <MuiTableContainer ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<TableContainerProps>;

export default TableContainer;
