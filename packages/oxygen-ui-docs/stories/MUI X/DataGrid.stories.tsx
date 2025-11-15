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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '@wso2/oxygen-ui';

const { DataGrid: DataGridComponent } = DataGrid;

const meta: Meta<typeof DataGridComponent> = {
  title: 'MUI X/DataGrid',
  component: DataGridComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI data grid component is a direct import of MUI X DataGrid. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/x/react-data-grid/](https://mui.com/x/react-data-grid/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGridComponent>;

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number' as const,
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_value: unknown, row: { firstName?: string | null; lastName?: string | null }) => 
      `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const Default: Story = {
  render: () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridComponent rows={rows} columns={columns} />
    </div>
  ),
};

export const WithCheckboxSelection: Story = {
  render: () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridComponent
        rows={rows}
        columns={columns}
        checkboxSelection
      />
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridComponent
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  ),
};

export const Sortable: Story = {
  render: () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridComponent
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'age', sort: 'desc' }],
          },
        }}
      />
    </div>
  ),
};

export const DisableRowSelectionOnClick: Story = {
  render: () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridComponent
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridComponent
        rows={[]}
        columns={columns}
        loading
      />
    </div>
  ),
};
