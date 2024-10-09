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

import {DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps} from '@mui/x-data-grid';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './data-grid.scss';

export type DataGridProps = MuiDataGridProps;

const COMPONENT_NAME: string = 'DataGrid';

const DataGrid: FC<DataGridProps> & WithWrapperProps = (props: DataGridProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-data-grid', className);

  return <MuiDataGrid className={classes} {...rest} />;
};

DataGrid.displayName = composeComponentDisplayName(COMPONENT_NAME);
DataGrid.muiName = COMPONENT_NAME;
DataGrid.defaultProps = {};

export default DataGrid;
