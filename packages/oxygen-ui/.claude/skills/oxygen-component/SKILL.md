---
name: oxygen-component
description: Generate Oxygen UI React components following best practices. Use when creating new components, data tables, cards, or UI elements with the Oxygen UI library.
---

# Generate Oxygen UI Component

## Instructions

1. Read `.claude/oxygen-ui/CLAUDE.md` for critical rules
2. Read `.claude/oxygen-ui/components.md` for API reference
3. Generate component using Oxygen UI patterns

## Critical Rules

- Import ALL components from `@wso2/oxygen-ui` (never from `@mui/material`)
- Import icons from `@wso2/oxygen-ui-icons-react`
- Use theme tokens via `sx` prop (e.g., `p: 2`, `bgcolor: 'background.paper'`)
- Never hardcode colors or spacing values
- For data tables, prefer `ListingTable` over MUI's `Table`
- For layouts, use `AppShell`, `Header`, `Sidebar`
- Write all UI text in sentence case (see below)

## UI Text

Write all titles, action text, and content in sentence case. Capitalize only the first word, proper nouns, product names, and acronyms.

```text
✓ Create project    ✓ API keys    ✓ Last modified
✗ Create Project    ✗ API Keys    ✗ LAST MODIFIED
```

- Applies to titles, headings, buttons, links, menu items, tabs, labels, placeholders, table columns, tooltips, and messages
- Write the text in sentence case in the source; never change case with `textTransform: 'uppercase'` or `'capitalize'`

## Choosing a Table

Pick the table type by what users do with the data:

| Type | Use when | Setup |
|------|----------|-------|
| Listing table (default) | Scanning and comparing records across columns; tables inside a page section, panel, or dialog | `<ListingTable variant="table">` |
| Card table | Top level listing of entities users click to open (projects, components); rich rows with few columns | `<ListingTable variant="card">`, `disablePaper` on `Container`, `variant="card" hover clickable` on each `Row` |
| Data table | Large or server-paginated data; column filtering, resizing, hiding, reordering; bulk selection | `<ListingTable.DataGrid>` inside `ListingTable.Provider` (`variant="data-grid-card"` on the Provider only for entity listings) |

- Default to the listing table when unsure
- Do not nest a card table inside a card, dialog, or drawer
- Do not use `striped` or `bordered` with the card variant
- Use one table type for the same kind of data across the product

## Table Toolbar

Every data table toolbar uses the same element order. Leave out elements a table doesn't need; never reorder the rest, except search and filters:

```text
[Scope] [Search] [Filters] ······ [View toggles] [Utility icons] [Secondary] [Primary]
[Applied filter chips] [Clear all]
```

**Search and filters swap by page context.** Put whichever users rely on more first, right after scope:

- Search first when users look up a specific item by name (users, resources)
- Filters first when users narrow by an attribute (logs by level, events by type)
- Scope always stays first; use the same order for the same kind of page across the product
- If the page's purpose doesn't make the choice clear, default to search first

- Scope control (time range, workspace, region) comes first; its label shows the value (`Time: Last 24 hours`); at most one per table; never shown as a chip
- Search is always visible; placeholder names what is searched (`Search by name`, `Search events`)
- Prefer column header filters; use toolbar filters only when no column matches; a filter lives in one place only; max 3 toolbar filters, the rest under `More filters`
- Right side order: view toggles (segmented control), utility icon buttons (export, column settings, refresh; refresh last), secondary actions (outlined or text, more than 2 go to an overflow menu), then one filled primary action rightmost
- Applied filters show as `Label: value` chips in a row below the toolbar; show `Clear all` at 2+ chips (clears filters only, not scope or search); hide the row when empty
- Put the result count in the footer next to pagination (`1–25 of 120`, or `25 events loaded` without pagination), never in the toolbar
- When rows are selected, a bulk actions bar replaces the toolbar: count and `Select all` on the left, actions on the right with destructive ones last and confirmed
- On narrow screens collapse in order: secondary actions, toolbar filters (into `Filters · 2`), view toggles and utility icons (refresh stays); scope, search, and primary action never collapse
- Icon buttons always have a `Tooltip` and an `aria-label`
- Use one date format across tables (`28 Oct 2026, 04:29 UTC`) and always show the time zone

```tsx
<ListingTable.Toolbar
  actions={
    <>
      <Tooltip title="Refresh">
        <IconButton size="small" aria-label="Refresh"><RefreshCw size={18} /></IconButton>
      </Tooltip>
      <Button variant="contained">Add user</Button>
    </>
  }
>
  <Button variant="outlined" endIcon={<ChevronDown size={16} />}>Region: All regions</Button>
  <TextField size="small" placeholder="Search by name" />
</ListingTable.Toolbar>
```

`ListingTable.Toolbar` renders `showSearch` before `children`, so when a table has a scope control or puts filters first, render search as a child in the right position instead of using `showSearch`.

## Component Template

```tsx
import { Box, Typography, Button } from '@wso2/oxygen-ui';
import { IconName } from '@wso2/oxygen-ui-icons-react';

interface MyComponentProps {
  // Define props
}

function MyComponent({ ...props }: MyComponentProps) {
  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
      {/* Component content */}
    </Box>
  );
}

export default MyComponent;
```

## Common Patterns

### Data Table Component

```tsx
import { ListingTable, Chip, IconButton } from '@wso2/oxygen-ui';
import { EditIcon, TrashIcon } from '@wso2/oxygen-ui-icons-react';

<ListingTable.Container>
  <ListingTable.Toolbar showSearch actions={<Button>Add item</Button>} />
  <ListingTable variant="card">
    <ListingTable.Head>
      <ListingTable.Row>
        <ListingTable.Cell>Name</ListingTable.Cell>
        <ListingTable.Cell>Status</ListingTable.Cell>
        <ListingTable.Cell align="right">Actions</ListingTable.Cell>
      </ListingTable.Row>
    </ListingTable.Head>
    <ListingTable.Body>
      {data.map((item) => (
        <ListingTable.Row key={item.id}>
          <ListingTable.Cell>{item.name}</ListingTable.Cell>
          <ListingTable.Cell>
            <Chip label={item.status} color="success" size="small" />
          </ListingTable.Cell>
          <ListingTable.Cell align="right">
            <IconButton size="small"><EditIcon size={18} /></IconButton>
            <IconButton size="small" color="error"><TrashIcon size={18} /></IconButton>
          </ListingTable.Cell>
        </ListingTable.Row>
      ))}
    </ListingTable.Body>
  </ListingTable>
</ListingTable.Container>
```

### Card Component

```tsx
import { Paper, Typography, Box, Button } from '@wso2/oxygen-ui';

<Paper sx={{ p: 3 }}>
  <Typography variant="h6" gutterBottom>Card title</Typography>
  <Typography color="text.secondary" sx={{ mb: 2 }}>
    Card description text
  </Typography>
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button variant="contained">Primary</Button>
    <Button variant="outlined">Secondary</Button>
  </Box>
</Paper>
```

### Dialog Component

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@wso2/oxygen-ui';

<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
  <DialogTitle>Dialog title</DialogTitle>
  <DialogContent>
    <DialogContentText>Dialog content goes here.</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button variant="contained" onClick={onConfirm}>Confirm</Button>
  </DialogActions>
</Dialog>
```

## MUI X Components (Use Namespaces)

```tsx
import { DataGrid, DatePickers, TreeView } from '@wso2/oxygen-ui';

// DataGrid
<DataGrid.DataGrid rows={rows} columns={columns} />

// DatePickers
<DatePickers.DatePicker value={date} onChange={setDate} />

// TreeView
<TreeView.SimpleTreeView>
  <TreeView.TreeItem itemId="1" label="Item 1" />
</TreeView.SimpleTreeView>
```

## Charts (Separate Package)

```tsx
// Charts are in a separate package built on Recharts
import { LineChart, BarChart, PieChart } from '@wso2/oxygen-ui-charts-react';

<LineChart series={series} />
<BarChart series={series} />
<PieChart series={series} />
```
