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

import {styled} from '@mui/material/styles';
import MuiTableRow, {TableRowProps as MuiTableRowProps, TableRowTypeMap} from '@mui/material/TableRow';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, ReactElement, Ref} from 'react';

const TableRowWithoutBorder: typeof MuiTableRow = styled(MuiTableRow)(() => ({
  'td, th': {
    border: 0,
  },
}));

export type TableRowProps<
  C extends ElementType = ElementType,
  D extends ElementType = TableRowTypeMap['defaultComponent'],
  P = {},
> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
  /**
   * If `true`, the table row will not have a bottom border.
   * @default false
   * @optional
   * @type boolean
   */
  hideBorder?: boolean;
} & Omit<MuiTableRowProps<D, P>, 'component'>;

/**
 * The TableRow component lets display a row of data
 *
 *
 * API:
 * - [TableRow API](https://mui.com/material-ui/api/table-row/)
 *
 * @remarks
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Table component.
 * @param ref - The ref to be forwarded to the MuiTable component.
 * @returns The rendered Tablee component.
 */
const TableRow: ForwardRefExoticComponent<TableRowProps> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, hideBorder, ...rest}: TableRowProps<C>,
    ref: Ref<HTMLTableRowElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-table-row', className);

    if (hideBorder) {
      return <TableRowWithoutBorder ref={ref} className={classes} {...rest} />;
    }

    return <MuiTableRow ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<TableRowProps>;

export default TableRow;
