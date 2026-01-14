---
name: oxygen-ui-claude-skill
description: |
  WSO2 Oxygen UI design system and React component library guide. Use when helping developers:
  (1) Set up or integrate @wso2/oxygen-ui in React projects
  (2) Migrate from @mui/material or lucide-react to Oxygen UI
  (3) Use Oxygen UI components (AppShell, Header, Sidebar, Layout, Form, ListingTable)
  (4) Configure theming (OxygenUIThemeProvider, themes, dark mode)
  (5) Use @wso2/oxygen-ui-icons-react icons
  (6) Set up ESLint plugin for import enforcement
  (7) Build forms with Form compound component
  (8) Create data tables with ListingTable component
---

# Oxygen UI Guide

WSO2 Oxygen UI is a React component library built on Material-UI v7. It provides themed MUI components, custom layout components, and an icon library.

## Packages

| Package | Description |
|---------|-------------|
| `@wso2/oxygen-ui` | Main component library (re-exports MUI + custom components) |
| `@wso2/oxygen-ui-icons-react` | Icon library (re-exports lucide-react + WSO2 icons) |
| `@wso2/eslint-plugin-oxygen-ui` | ESLint plugin to enforce Oxygen UI imports |

## Installation

```bash
# Core packages
pnpm add @wso2/oxygen-ui @wso2/oxygen-ui-icons-react

# Peer dependencies
pnpm add @emotion/react @emotion/styled date-fns
```

## Quick Start

```tsx
import { OxygenUIThemeProvider, Button, Box } from '@wso2/oxygen-ui';
import { Settings, User } from '@wso2/oxygen-ui-icons-react';

function App() {
  return (
    <OxygenUIThemeProvider>
      <Box sx={{ p: 2 }}>
        <Button startIcon={<Settings />}>Settings</Button>
      </Box>
    </OxygenUIThemeProvider>
  );
}
```

## Import Patterns

### Components
```tsx
// All MUI components available directly
import { Box, Stack, Button, Typography, TextField } from '@wso2/oxygen-ui';

// Custom Oxygen components
import {
  OxygenUIThemeProvider,
  AppShell,
  Header,
  Sidebar,
  Layout,
  Form,
  ListingTable,
  SearchBar,
  ColorSchemeToggle,
  ThemeSwitcher,
  CodeBlock
} from '@wso2/oxygen-ui';
```

### MUI X Components (Namespaced)
```tsx
import { DataGrid, Charts, DatePickers, TreeView, AdapterDateFns } from '@wso2/oxygen-ui';

// Usage
const { DataGrid: DataGridComponent } = DataGrid;
const { BarChart } = Charts;
const { DatePicker } = DatePickers;
const { SimpleTreeView } = TreeView;
```

### Icons
```tsx
import { Bell, Search, Settings, ChevronDown } from '@wso2/oxygen-ui-icons-react';
// Custom WSO2 icons
import { WSO2, Facebook, Google, GitHub } from '@wso2/oxygen-ui-icons-react';

// Icon props: size, color, strokeWidth
<Bell size={20} color="primary" />
```

## Provider Setup

### Basic
```tsx
<OxygenUIThemeProvider>
  <App />
</OxygenUIThemeProvider>
```

### With Theme Switching
```tsx
import {
  OxygenUIThemeProvider,
  AcrylicOrangeTheme,
  AcrylicPurpleTheme,
  ClassicTheme,
  HighContrastTheme
} from '@wso2/oxygen-ui';

<OxygenUIThemeProvider
  themes={[
    { key: 'orange', label: 'Acrylic Orange', theme: AcrylicOrangeTheme },
    { key: 'purple', label: 'Acrylic Purple', theme: AcrylicPurpleTheme },
    { key: 'classic', label: 'Classic', theme: ClassicTheme },
    { key: 'highContrast', label: 'High Contrast', theme: HighContrastTheme },
  ]}
  initialTheme="orange"
>
  <App />
</OxygenUIThemeProvider>
```

## Layout Components

### AppShell (Compound Pattern)
```tsx
import { AppShell, Header, Sidebar, Footer } from '@wso2/oxygen-ui';

<AppShell>
  <AppShell.Navbar>
    <Header>
      <Header.Toggle />
      <Header.Brand>
        <Header.BrandLogo src="/logo.svg" />
        <Header.BrandTitle>My App</Header.BrandTitle>
      </Header.Brand>
      <Header.Spacer />
      <Header.Actions>
        <ColorSchemeToggle />
      </Header.Actions>
    </Header>
  </AppShell.Navbar>

  <AppShell.Sidebar>
    <Sidebar>
      <Sidebar.Nav>
        <Sidebar.Item>
          <Sidebar.ItemIcon><Home /></Sidebar.ItemIcon>
          <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
        </Sidebar.Item>
      </Sidebar.Nav>
    </Sidebar>
  </AppShell.Sidebar>

  <AppShell.Main>
    {/* Page content */}
  </AppShell.Main>

  <AppShell.Footer>
    <Footer />
  </AppShell.Footer>
</AppShell>
```

### Layout Primitive
```tsx
import { Layout } from '@wso2/oxygen-ui';

<Layout>
  <Layout.Navbar>{/* Header */}</Layout.Navbar>
  <Layout.Sidebar>{/* Sidebar */}</Layout.Sidebar>
  <Layout.Content>{/* Main */}</Layout.Content>
</Layout>
```

## Form Component

Compound component for building forms with consistent styling.

```tsx
import { Form } from '@wso2/oxygen-ui';

<Form.Section>
  <Form.Header>Create User</Form.Header>
  <Form.Subheader>Enter user details</Form.Subheader>

  <Form.Stack>
    <Form.TextInput label="Name" name="name" required />
    <Form.TextInput label="Email" name="email" type="email" />
    <Form.SelectInput label="Role" name="role">
      <Form.MenuItem value="admin">Admin</Form.MenuItem>
      <Form.MenuItem value="user">User</Form.MenuItem>
    </Form.SelectInput>
    <Form.AutocompleteInput
      label="Team"
      name="team"
      options={teams}
      getOptionLabel={(o) => o.name}
    />
  </Form.Stack>
</Form.Section>

{/* Multi-step wizard */}
<Form.Wizard
  steps={[
    { label: 'Basic Info', component: <Step1 /> },
    { label: 'Settings', component: <Step2 /> },
    { label: 'Review', component: <Step3 /> },
  ]}
  activeStep={currentStep}
  actions={<Button onClick={next}>Next</Button>}
/>
```

## ListingTable Component

Data table with sorting, search, density controls, and card variant.

```tsx
import { ListingTable, useListingTable } from '@wso2/oxygen-ui';

<ListingTable.Provider
  searchValue={search}
  onSearchChange={setSearch}
  sortField={sortField}
  sortDirection={sortDirection}
  onSortChange={handleSort}
>
  <ListingTable.Container>
    <ListingTable.Toolbar showSearch actions={<Button>Add New</Button>} />

    <ListingTable variant="table" density="standard" striped>
      <ListingTable.Head>
        <ListingTable.Row>
          <ListingTable.Cell>
            <ListingTable.SortLabel field="name">Name</ListingTable.SortLabel>
          </ListingTable.Cell>
          <ListingTable.Cell>Status</ListingTable.Cell>
          <ListingTable.Cell>Actions</ListingTable.Cell>
        </ListingTable.Row>
      </ListingTable.Head>
      <ListingTable.Body>
        {data.map(row => (
          <ListingTable.Row key={row.id} clickable>
            <ListingTable.Cell>
              <ListingTable.CellIcon icon={<User />} primary={row.name} secondary={row.email} />
            </ListingTable.Cell>
            <ListingTable.Cell>{row.status}</ListingTable.Cell>
            <ListingTable.Cell>
              <ListingTable.RowActions>
                <IconButton><Edit /></IconButton>
                <IconButton><Trash /></IconButton>
              </ListingTable.RowActions>
            </ListingTable.Cell>
          </ListingTable.Row>
        ))}
      </ListingTable.Body>
    </ListingTable>

    {data.length === 0 && (
      <ListingTable.EmptyState
        title="No users found"
        description="Create your first user"
        action={<Button>Add User</Button>}
      />
    )}
  </ListingTable.Container>
</ListingTable.Provider>
```

## Hooks

```tsx
import { useThemeSwitcher, useAppShell, useNotifications, useListingTable } from '@wso2/oxygen-ui';

// Theme switching
const { theme, setTheme, themes } = useThemeSwitcher();

// App shell state
const { state, actions } = useAppShell();

// Notifications
const { notifications, addNotification, removeNotification } = useNotifications();

// ListingTable context (when inside Provider)
const tableContext = useListingTable();
```

## Dark Mode

```tsx
// Toggle component
import { ColorSchemeToggle } from '@wso2/oxygen-ui';
<ColorSchemeToggle />

// Adaptive images
import { ColorSchemeImage } from '@wso2/oxygen-ui';
<ColorSchemeImage
  light="/images/logo.svg"
  dark="/images/logo-dark.svg"
/>
```

## References

- **Components**: See [references/components.md](references/components.md) for full component API
- **Theming**: See [references/theming.md](references/theming.md) for theme customization
- **Migration**: See [references/migration.md](references/migration.md) for migrating from MUI
