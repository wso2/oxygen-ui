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

import {DataGrid as MuiXDataGrid} from '@mui/x-data-grid';
import type {GridValidRowModel as MuiXGridValidRowModel, DataGridProps as MuiXDataGridProps} from '@mui/x-data-grid';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, Ref, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './data-grid.scss';

export type DataGridProps<R extends MuiXGridValidRowModel = any> = MuiXDataGridProps<R>;

const COMPONENT_NAME: string = 'DataGrid';

/**
 * The Data Grid component is built with React and TypeScript to provide a smooth UX for manipulating
 * an unlimited set of data. It features an intuitive API for real-time updates as well as theming
 * and custom templates—all with blazing-fast performance.
 *
 * Demos:
 *
 * - [Data Grid (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/data-display-datagrid)
 * - [Data Grid (MUI X)](https://mui.com/x/react-data-grid/)
 *
 * API:
 *
 * - [DataGrid API](https://mui.com/x/api/data-grid/data-grid/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the DataGrid component.
 * @param ref - The ref to be forwarded to the MuiDataGrid component.
 * @returns The rendered DataGrid component.
 */
const DataGrid: ForwardRefExoticComponent<DataGridProps> & WithWrapperProps = forwardRef(
  ({className, ...rest}: DataGridProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-data-grid', className);

    return <MuiXDataGrid ref={ref} className={classes} {...rest} />;
  },
) as ForwardRefExoticComponent<DataGridProps> & WithWrapperProps;

DataGrid.displayName = composeComponentDisplayName(COMPONENT_NAME);
DataGrid.muiName = COMPONENT_NAME;

export default DataGrid;
