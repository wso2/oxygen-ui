/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Description, Primary, Subtitle, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography, CodeBlock, Box, Divider, ListingTable, Chip } from '@wso2/oxygen-ui';
import type { ListingTableDataGridProps } from '@wso2/oxygen-ui';
import { Folder } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * When to use the listing table, card table, and data table.
 */
const meta: Meta = {
  title: 'Guides/Choosing a Table',
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

interface TableSectionProps {
  title: string;
  purpose: string;
  whenToUse: string[];
  examples: string;
  sample: React.ReactNode;
}

function TableSection({ title, purpose, whenToUse, examples, sample }: TableSectionProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {purpose}
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 1.5 }}>
        When to use
      </Typography>
      <Box component="ul" sx={{ pl: 3, m: 0 }}>
        {whenToUse.map((item) => (
          <li key={item}><Typography variant="body2">{item}</Typography></li>
        ))}
      </Box>
      <Typography variant="subtitle2" sx={{ mt: 1.5 }}>
        Examples
      </Typography>
      <Typography variant="body2">{examples}</Typography>
      <Typography variant="subtitle2" sx={{ mt: 1.5, mb: 1 }}>
        Sample
      </Typography>
      {sample}
    </Box>
  );
}

const apiKeys = [
  { id: 1, name: 'Production key', environment: 'Production', status: 'Active', lastUsed: '2 hours ago' },
  { id: 2, name: 'Staging key', environment: 'Staging', status: 'Active', lastUsed: '1 day ago' },
  { id: 3, name: 'Old test key', environment: 'Development', status: 'Revoked', lastUsed: '3 months ago' },
];

function ListingTableSample() {
  return (
    <ListingTable.Container>
      <ListingTable variant="table" density="compact">
        <ListingTable.Head>
          <ListingTable.Row>
            <ListingTable.Cell>Name</ListingTable.Cell>
            <ListingTable.Cell>Environment</ListingTable.Cell>
            <ListingTable.Cell>Status</ListingTable.Cell>
            <ListingTable.Cell>Last used</ListingTable.Cell>
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {apiKeys.map((key) => (
            <ListingTable.Row key={key.id} hover>
              <ListingTable.Cell>{key.name}</ListingTable.Cell>
              <ListingTable.Cell>{key.environment}</ListingTable.Cell>
              <ListingTable.Cell>
                <Chip
                  label={key.status}
                  size="small"
                  variant="outlined"
                  color={key.status === 'Active' ? 'success' : 'default'}
                />
              </ListingTable.Cell>
              <ListingTable.Cell>{key.lastUsed}</ListingTable.Cell>
            </ListingTable.Row>
          ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}

const projects = [
  { id: 1, name: 'Customer portal', description: 'Self-service portal for customers', components: 6 },
  { id: 2, name: 'Payments', description: 'Payment processing services', components: 4 },
  { id: 3, name: 'Internal tools', description: 'Admin and reporting apps', components: 3 },
];

function CardTableSample() {
  return (
    <ListingTable.Container disablePaper>
      <ListingTable variant="card">
        <ListingTable.Head>
          <ListingTable.Row>
            <ListingTable.Cell>Project</ListingTable.Cell>
            <ListingTable.Cell>Components</ListingTable.Cell>
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {projects.map((project) => (
            <ListingTable.Row key={project.id} variant="card" hover clickable>
              <ListingTable.Cell>
                <ListingTable.CellIcon
                  icon={<Folder size={20} />}
                  primary={project.name}
                  secondary={project.description}
                />
              </ListingTable.Cell>
              <ListingTable.Cell>{project.components}</ListingTable.Cell>
            </ListingTable.Row>
          ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}

const logColumns: ListingTableDataGridProps['columns'] = [
  { field: 'time', headerName: 'Time', flex: 1, minWidth: 160 },
  {
    field: 'level',
    headerName: 'Level',
    flex: 0.6,
    minWidth: 100,
    renderCell: ({ value }) => (
      <Chip label={value} size="small" variant="outlined" color={value === 'Error' ? 'error' : 'default'} />
    ),
  },
  { field: 'service', headerName: 'Service', flex: 1, minWidth: 130 },
  { field: 'message', headerName: 'Message', flex: 2, minWidth: 200 },
];

const logRows = [
  { id: 1, time: '2026-10-21 10:42:13', level: 'Info', service: 'order-service', message: 'Order created' },
  { id: 2, time: '2026-10-21 10:41:58', level: 'Error', service: 'payment-service', message: 'Payment gateway timeout' },
  { id: 3, time: '2026-10-21 10:41:30', level: 'Warning', service: 'auth-proxy', message: 'Token close to expiry' },
  { id: 4, time: '2026-10-21 10:40:05', level: 'Info', service: 'user-service', message: 'User signed in' },
  { id: 5, time: '2026-10-21 10:39:47', level: 'Info', service: 'order-service', message: 'Order shipped' },
  { id: 6, time: '2026-10-21 10:38:12', level: 'Error', service: 'inventory-service', message: 'Stock sync failed' },
];

function DataTableSample() {
  return (
    <ListingTable.Provider density="compact">
      <ListingTable.Container>
        <ListingTable.Toolbar showSearch searchPlaceholder="Search logs" />
        <ListingTable.DataGrid
          rows={logRows}
          columns={logColumns}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        />
      </ListingTable.Container>
    </ListingTable.Provider>
  );
}

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Choosing a table
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Oxygen UI has three table types, all built on <code>ListingTable</code>. Choose by what
            users do with the data.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Which one to use
          </Typography>
          <CodeBlock
            language="markup"
            code={`Listing table   Compare records across columns       variant="table" (default)
Card table      Open an item from a list             variant="card"
Data table      Filter and act on large datasets     ListingTable.DataGrid`}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Not sure? Use the listing table.
          </Typography>
        </Box>

        <TableSection
          title="Listing table"
          purpose="Show records in rows and columns so users can scan and compare values."
          whenToUse={[
            'Users compare values across rows, such as status, version, or last modified.',
            'The table is part of a page section, panel, or dialog.',
            'Sorting, search, and pagination are enough.',
          ]}
          examples="Organization members, API keys, environment variables, deployment history."
          sample={<ListingTableSample />}
        />

        <TableSection
          title="Card table"
          purpose="Show each item as a card so users can find it and open it."
          whenToUse={[
            'Each row is an item users click to open its own page.',
            'Rows have an icon, a name with a description, and a status.',
            'The table is the main content of the page and has only a few columns.',
          ]}
          examples="Projects, components in a project, organizations, integrations."
          sample={<CardTableSample />}
        />

        <TableSection
          title="Data table"
          purpose="Let users explore, filter, and act on large amounts of data."
          whenToUse={[
            'The dataset is large or loaded page by page from the server.',
            'Users need to filter by column, or resize, hide, or reorder columns.',
            'Users select many rows and run bulk actions.',
          ]}
          examples="Logs, usage and billing records, user management in an admin portal."
          sample={<DataTableSample />}
        />

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            For every table
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Put the name column first and actions last.</Typography></li>
            <li><Typography variant="body2">Show a loading state, an empty state, and a &quot;no results&quot; message for search.</Typography></li>
            <li><Typography variant="body2">Show status with a text label, not color alone.</Typography></li>
            <li><Typography variant="body2">Ask for confirmation before delete.</Typography></li>
          </Box>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
