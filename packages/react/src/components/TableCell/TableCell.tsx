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

import MuiTableCell, {TableCellProps as MuiTableCellProps} from '@mui/material/TableCell';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, ReactElement, Ref} from 'react';

export type TableCellProps<C extends ElementType = ElementType> = {
  /**
   * Additional class names for the TableCell.
   */
  className?: string;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
} & Omit<MuiTableCellProps, 'td'>;

/**
 * The TableCell component lets display a cell of the Table
 *
 *
 * API:
 * - [TableCell API](https://mui.com/material-ui/api/table-cell/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the TableCell component.
 * @param ref - The ref to be forwarded to the MuiTableCell component.
 * @returns The rendered TableCell component.
 */
const TableCell: ForwardRefExoticComponent<TableCellProps> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, ...rest}: TableCellProps<C>,
    ref: Ref<HTMLTableCellElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-table-cell', className);

    return <MuiTableCell ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<TableCellProps>;

export default TableCell;
