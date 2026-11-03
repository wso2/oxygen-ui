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
import {
  Stack,
  Typography,
  CodeBlock,
  Box,
  Divider,
  ListingTable,
  Button,
  PageTitle,
  Paper,
  SearchBar,
  ToggleButton,
  ToggleButtonGroup,
} from '@wso2/oxygen-ui';
import { ChevronDown, LayoutGrid, List as ListIcon } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * Where the search field goes on list and grid pages, and how wide it should be.
 */
const meta: Meta = {
  title: 'Guides/Search Placement',
  parameters: {
    a11y: {
      // The brand orange fails contrast until the palette is fixed (#558)
      options: {
        rules: { 'color-contrast': { enabled: false } },
      },
    },
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

interface RuleTableProps {
  headers: string[];
  rows: string[][];
}

function RuleTable({ headers, rows }: RuleTableProps) {
  return (
    <ListingTable.Container>
      <ListingTable variant="table" density="compact">
        <ListingTable.Head>
          <ListingTable.Row>
            {headers.map((header) => (
              <ListingTable.Cell key={header}>{header}</ListingTable.Cell>
            ))}
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {rows.map((row) => (
            <ListingTable.Row key={row[0]}>
              {row.map((cell, index) => (
                <ListingTable.Cell key={headers[index]}>{cell}</ListingTable.Cell>
              ))}
            </ListingTable.Row>
          ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}

interface GuideSectionProps {
  title: string;
  children: React.ReactNode;
}

function GuideSection({ title, children }: GuideSectionProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={1.5}>{children}</Stack>
    </Box>
  );
}

function ListPageSample() {
  const [view, setView] = React.useState('grid');

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <PageTitle sx={{ mb: 3 }}>
        <PageTitle.Header>Projects</PageTitle.Header>
        <PageTitle.SubHeader>Manage your development projects</PageTitle.SubHeader>
        <PageTitle.Actions>
          <Button variant="outlined">Import</Button>
          <Button variant="contained">Create project</Button>
        </PageTitle.Actions>
      </PageTitle>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap', rowGap: 2 }}>
        <SearchBar width="standard" placeholder="Search projects" />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" endIcon={<ChevronDown size={16} />}>
          Sort: Last updated
        </Button>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={view}
          onChange={(_, value: string | null) => value && setView(value)}
          aria-label="View"
        >
          <ToggleButton value="grid" aria-label="Grid view">
            <LayoutGrid size={18} />
          </ToggleButton>
          <ToggleButton value="list" aria-label="List view">
            <ListIcon size={18} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Paper>
  );
}

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Search placement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search goes in a toolbar row below the page header, sized to what users type. This
            covers list and grid pages, such as a projects page with cards. For data tables, follow
            the Table Toolbar guide, which uses the same left placement.
          </Typography>
        </Box>

        <ListPageSample />

        <Divider />

        <GuideSection title="Anatomy">
          <Typography variant="body2">
            The page header holds the title and page-level actions. The toolbar row below it holds
            search on the left and display controls on the right.
          </Typography>
          <CodeBlock
            language="markup"
            code={`[Title]                                  [Secondary] [Primary]
[Search] ························ [Sort ▾] [Grid | List]`}
          />
          <Typography variant="body2">
            Use this layout on every list and grid page, so users find search in the same place.
          </Typography>
        </GuideSection>

        <GuideSection title="Width">
          <Typography variant="body2">
            Size the field to the expected query, not to the page. Names of projects, users, and
            other resources are short, so a 400px field (about 30 visible characters) fits almost
            every query. Use the standard width so search is the same size across the product.
          </Typography>
          <CodeBlock language="tsx" code={`<SearchBar width="standard" placeholder="Search projects" />`} />
          <RuleTable
            headers={['Screen', 'Width', 'Why']}
            rows={[
              ['Desktop and tablet', '400px (width="standard")', 'Fits the query without leaving empty space in the field.'],
              ['Narrow screens', 'Shrinks to the container', 'The standard width never overflows a narrower container.'],
            ]}
          />
          <Typography variant="body2">
            A full width field on desktop looks like the main feature of the page and leaves most
            of the field empty.
          </Typography>
        </GuideSection>

        <GuideSection title="Placement rules">
          <RuleTable
            headers={['Element', 'Position', 'Rules']}
            rows={[
              [
                'Search',
                'Toolbar row, left',
                'Always visible; never collapsed to an icon on desktop. The placeholder names what is searched ("Search projects").',
              ],
              [
                'Sort',
                'Toolbar row, right',
                'The label shows the current value ("Sort: Last updated").',
              ],
              [
                'Grid / list toggle',
                'Toolbar row, rightmost',
                'Segmented control with an accessible label on each option. Changes how items display, never which items appear.',
              ],
              [
                'Page-level actions',
                'Page header, right',
                'Not in the search toolbar. See the Page Title component for action placement.',
              ],
            ]}
          />
        </GuideSection>

        <Divider />

        <GuideSection title="Do and don't">
          <RuleTable
            headers={['Do', "Don't"]}
            rows={[
              ['Use width="standard" for list and grid page search', 'Use fullWidth or a custom width'],
              ['Put search on the left of a toolbar row', 'Put search in the page header next to the title'],
              ['Put sort and view toggles on the right of the same row', 'Stack sort and view toggles on their own row'],
              ['Name what is searched in the placeholder', 'Use a bare "Search" placeholder when the page lists one object type'],
              ['Keep page-level actions in the page header', 'Mix Create or Import buttons into the search toolbar'],
            ]}
          />
        </GuideSection>
      </Stack>
    </CenterContentLayout>
  ),
};
