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

import MuiTableBody, {TableBodyProps as MuiTableBodyProps, TableBodyTypeMap} from '@mui/material/TableBody';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type TableBodyProps<
  C extends ElementType = ElementType,
  D extends ElementType = TableBodyTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiTableBodyProps<D, P>, 'component'>;

/**
 * The TableBody component lets display a body of the Table
 *
 * API:
 * - [TableBody API](https://mui.com/material-ui/api/table-head/)
 *
 * @remarks
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the TableBody component.
 * @param ref - The ref to be forwarded to the MuiTable component.
 * @returns The rendered TableBody component.
 */
const TableBody: ForwardRefExoticComponent<TableBodyProps> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: TableBodyProps<C>,
    ref: Ref<HTMLTableSectionElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-table-body', className);

    return <MuiTableBody ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<TableBodyProps>;

export default TableBody;
