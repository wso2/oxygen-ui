/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import MuiTable, {TableProps as MuiTableProps, TableTypeMap} from '@mui/material/Table';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type TableProps<
  C extends ElementType = ElementType,
  D extends ElementType = TableTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiTableProps<D, P>, 'component'>;

/**
 * The Table component lets display sets of data
 *
 * Demos:
 *
 * - [Table (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-table)
 * - [Table (MUI)](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [Table API](https://mui.com/material-ui/api/table/)
 *
 * @remarks
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Table component.
 * @param ref - The ref to be forwarded to the MuiTable component.
 * @returns The rendered Table component.
 */
const Table: ForwardRefExoticComponent<TableProps> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: TableProps<C>,
    ref: Ref<HTMLTableElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-table', className);

    return <MuiTable ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<TableProps>;

export default Table;
