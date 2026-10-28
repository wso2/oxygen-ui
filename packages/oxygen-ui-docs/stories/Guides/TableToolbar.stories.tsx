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
  Alert,
  AlertTitle,
  Stack,
  Typography,
  CodeBlock,
  Box,
  Divider,
  ListingTable,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@wso2/oxygen-ui';
import { ChevronDown, RefreshCw, Search } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * Where search, filters, and actions go in the toolbar above a data table.
 */
const meta: Meta = {
  title: 'Guides/Table Toolbar',
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

function BulletList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ pl: 3, m: 0 }}>
      {items.map((item) => (
        <li key={item}><Typography variant="body2">{item}</Typography></li>
      ))}
    </Box>
  );
}

function ToolbarSample() {
  return (
    <ListingTable.Container>
      <ListingTable.Toolbar
        sx={{ flexWrap: 'wrap' }}
        actions={
          <>
            <Tooltip title="Refresh">
              <IconButton size="small" aria-label="Refresh">
                <RefreshCw size={18} />
              </IconButton>
            </Tooltip>
            <Button variant="contained">Add user</Button>
          </>
        }
      >
        <Button variant="outlined" endIcon={<ChevronDown size={16} />}>
          Region: All regions
        </Button>
        <TextField
          size="small"
          placeholder="Search by name"
          // On narrow screens, search takes a full width row above the other controls
          sx={{ order: { xs: -1, sm: 0 }, flexBasis: { xs: '100%', sm: 'auto' } }}
          slotProps={{
            htmlInput: { 'aria-label': 'Search by name' },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} aria-hidden="true" />
                </InputAdornment>
              ),
            },
          }}
        />
      </ListingTable.Toolbar>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 2, py: 1.5 }}>
        <Chip label="Status: Active, Pending" size="small" onDelete={() => {}} />
        <Chip label="Role: Admin" size="small" onDelete={() => {}} />
        <Button size="small" variant="text">
          Clear all
        </Button>
      </Stack>
    </ListingTable.Container>
  );
}

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Table toolbar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Every data table uses one toolbar layout, so users find search, filters, and actions in
            the same place on every page. This covers the toolbar above any data table or list view.
            It does not cover page headers or form layouts.
          </Typography>
        </Box>

        <ToolbarSample />

        <Divider />

        <GuideSection title="Anatomy">
          <Typography variant="body2">
            The left zone narrows the rows. The right zone changes how data displays and acts on it.
            Applied filters show in a row below.
          </Typography>
          <CodeBlock
            language="markup"
            code={`[Scope] [Search] [Filters] ······ [View toggles] [Utility icons] [Secondary] [Primary]
[Applied filter chips] [Clear all]`}
          />
          <Typography variant="body2">
            If a table doesn&apos;t need an element, leave it out. The order of the remaining
            elements never changes, except for search and filters.
          </Typography>
          <Alert severity="info">
            <AlertTitle>Order search and filters by the page</AlertTitle>
            <Typography variant="body2" gutterBottom>
              Search and toolbar filters can swap places, depending on what the page is for and
              which one users rely on more. Put the more important one first, right after scope.
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              <li><Typography variant="body2">Search first when users look up a specific item by name, such as users or resources.</Typography></li>
              <li><Typography variant="body2">Filters first when users narrow by an attribute, such as logs by level or events by type.</Typography></li>
              <li><Typography variant="body2">Scope always stays first. Use the same order for the same kind of page across the product.</Typography></li>
            </Box>
          </Alert>
          <CodeBlock
            language="markup"
            code={`Search first    [Scope] [Search] [Filters] ······ [Actions]
Filters first   [Scope] [Filters] [Search] ······ [Actions]`}
          />
        </GuideSection>

        <GuideSection title="Placement rules">
          <RuleTable
            headers={['Element', 'Position', 'Rules']}
            rows={[
              [
                'Scope control (time range, workspace, region)',
                'First, left',
                'Changes the whole dataset. The label shows the current value ("Time: Last 24 hours"). Never shown as a removable chip.',
              ],
              [
                'Search',
                'Left, after scope (or after filters, see above)',
                'Always visible; never collapsed to an icon on desktop. The placeholder names what is searched ("Search by name").',
              ],
              [
                'Toolbar filters',
                'Left, after search (or after scope, see above)',
                'Dropdowns ordered by usage. The label shows the value when set ("Status: Active"). Show at most 3; put the rest under "More filters".',
              ],
              [
                'View toggles (UTC / Local, density, list / grid)',
                'Right, first',
                'Segmented control. Changes how data displays, never which rows appear.',
              ],
              [
                'Utility icons (export, column settings, refresh)',
                'Right, after toggles',
                'Icon buttons with tooltips, in this order: export, column settings, refresh.',
              ],
              [
                'Secondary actions',
                'Right, after utility icons',
                'Outlined or text buttons. Move more than 2 into an overflow menu.',
              ],
              ['Primary action', 'Rightmost', 'At most one filled button per table ("Add user").'],
            ]}
          />
          <Typography variant="body2">
            A table has at most one scope control. If a page needs two, talk to the design system
            team before building it.
          </Typography>
        </GuideSection>

        <GuideSection title="Filter types">
          <Typography variant="body2">
            Use column header filters by default. Use toolbar filters only when a filter has no
            matching column.
          </Typography>
          <RuleTable
            headers={['Type', 'Use when', 'Example']}
            rows={[
              ['Column header filter', 'The filter maps to a visible column', 'Status, role, created by'],
              [
                'Toolbar filter',
                'The filter has no matching visible column',
                'Tag, or owner on a table without an owner column',
              ],
            ]}
          />
          <BulletList
            items={[
              'Put each filter in one place only, never in both the column header and the toolbar.',
              'A column with an active filter shows a filled or accent colored filter icon.',
              'Header filter menus with more than 7 options include a search field and an "Any" option at the top.',
            ]}
          />
        </GuideSection>

        <GuideSection title="Applied filter chips and result count">
          <Typography variant="body2">
            Applied filters show as chips in a row below the toolbar, directly above the table.
          </Typography>
          <BulletList
            items={[
              'One chip per active filter: "Label: value". With several values: "Status: Active, Pending".',
              'Scope controls never appear as chips; their value already shows in the control label.',
              'Show "Clear all" when 2 or more chips are active. It clears filters only, not scope or search.',
              'Truncate long values with an ellipsis and show the full value in a tooltip.',
              'Hide the chip row when no filters are active.',
            ]}
          />
          <Typography variant="body2">
            The result count goes in the table footer, next to pagination (&quot;1–25 of 120&quot;).
            Tables without pagination, such as streamed logs, show it in the same place (&quot;25
            events loaded&quot;). Never place it among toolbar controls.
          </Typography>
        </GuideSection>

        <GuideSection title="Selection and bulk actions">
          <Typography variant="body2">
            When one or more rows are selected, a bulk actions bar replaces the toolbar in the same
            position.
          </Typography>
          <CodeBlock language="markup" code="[3 selected] [Select all 120] ······ [Export] [Delete] [×]" />
          <BulletList
            items={[
              'Left: the selected count, then "Select all" when more rows exist than are shown.',
              'Right: bulk actions, with destructive actions such as Delete last and styled as destructive.',
              '× or Esc clears the selection and restores the toolbar as it was.',
              'Destructive bulk actions always ask for confirmation.',
            ]}
          />
        </GuideSection>

        <GuideSection title="Responsive behavior">
          <Typography variant="body2">
            On narrow screens, controls collapse in this order so the most used ones stay visible
            longest:
          </Typography>
          <Box component="ol" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Secondary actions move into an overflow (⋯) menu.</Typography></li>
            <li><Typography variant="body2">Toolbar filters collapse into one &quot;Filters&quot; button with a count (&quot;Filters · 2&quot;).</Typography></li>
            <li><Typography variant="body2">View toggles and utility icons move into the overflow menu. Refresh stays visible.</Typography></li>
            <li><Typography variant="body2">Search takes a full width row on top; scope and the primary action share the row below.</Typography></li>
          </Box>
          <Typography variant="body2">
            The scope control, search, and primary action never collapse into a menu.
          </Typography>
        </GuideSection>

        <GuideSection title="Content and formatting">
          <RuleTable
            headers={['Item', 'Rule', 'Example']}
            rows={[
              ['Control labels', 'Sentence case; "Label: value" when set', 'Time: Last 24 hours'],
              ['Search placeholder', '"Search by" + field, or "Search" + object', 'Search by name, Search events'],
              ['Dates', 'One format across all tables', '28 Oct 2026, 04:29 UTC'],
              ['Precise timestamps (logs)', 'ISO-like and monospace, only where milliseconds matter', '2026-10-23 05:54:49.983 UTC'],
              ['Date ranges', 'An en dash in compact labels', '16 Oct – 23 Oct'],
              ['Time zone', 'Shown once per value or range; follows the UTC / Local toggle', '07:05 UTC'],
              ['Relative time', 'Paired with the absolute time', '2 hours ago · 28 Oct 2026, 04:29 UTC'],
            ]}
          />
          <Typography variant="body2">Icon buttons always have a tooltip and an accessible label.</Typography>
        </GuideSection>

        <GuideSection title="Examples">
          <Typography variant="subtitle2">Search first: users look up items by name</Typography>
          <CodeBlock
            language="markup"
            code={`[Search by name] [Status ▾] ··············· [⟳] [Add user]
Footer: Rows per page: 10 · 1–6 of 6`}
          />
          <Typography variant="body2">
            Filters that map to a column, such as role, stay as column header filters.
          </Typography>
          <Typography variant="subtitle2">Filters first: users narrow by attribute</Typography>
          <CodeBlock
            language="markup"
            code={`[Time: Last 7 days ▾] [Level ▾] [Type ▾] [Search events] ······ [UTC | Local] [⬇] [⟳]
[Level: Error ×]
Footer: 25 events loaded`}
          />
        </GuideSection>

        <Divider />

        <GuideSection title="Do and don't">
          <RuleTable
            headers={['Do', "Don't"]}
            rows={[
              ['Keep the element order fixed and leave out unused elements', 'Reorder elements other than search and filters'],
              ['Put whichever of search or filters matters more first, after scope', 'Put search on the right'],
              ['Show the scope value in its control label', 'Show scope as a removable chip'],
              ['Place chips below the toolbar', 'Place chips above the toolbar'],
              ['Put each filter in one place', 'Offer the same filter in the header and the toolbar'],
              ['Keep one primary action, rightmost', 'Use several filled buttons'],
              ['Show the result count in the footer', 'Mix status text with toolbar controls'],
              ['Use one date format and show the time zone', 'Mix date formats across tables'],
            ]}
          />
        </GuideSection>
      </Stack>
    </CenterContentLayout>
  ),
};
