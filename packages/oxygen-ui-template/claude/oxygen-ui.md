---
description: WSO2 Oxygen UI development skill - React component library patterns and best practices
---

# Oxygen UI Development Skill

This skill provides guidance for developing applications with WSO2 Oxygen UI.

## When to Use This Skill

Activate this skill when:
- Creating new React components using Oxygen UI
- Implementing layouts with AppShell, Header, Sidebar
- Working with themes and color schemes
- Adding icons from the Oxygen UI icon library
- Implementing forms and data grids

## Component Import Rules

ALWAYS import from `@wso2/oxygen-ui`, NEVER from `@mui/*` directly:

```tsx
// Correct
import {
  Button,
  TextField,
  Box,
  Stack,
  Typography,
  AppShell,
  Header,
  Sidebar,
  Footer,
  DataGrid,
  DatePicker
} from '@wso2/oxygen-ui';

// Icons
import { Settings, User, Home } from '@wso2/oxygen-ui-icons-react';

// Incorrect - will cause ESLint errors
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Settings } from 'lucide-react';
```

## Layout Patterns

### Basic App Layout with Sidebar

```tsx
import {
  AppShell,
  Header,
  Sidebar,
  Footer,
  useAppShell
} from '@wso2/oxygen-ui';
import { Home, Settings } from '@wso2/oxygen-ui-icons-react';
import { Outlet } from 'react-router';

function AppLayout() {
  const { state, actions } = useAppShell({ initialCollapsed: false });

  return (
    <AppShell>
      <AppShell.Navbar>
        <Header>
          <Header.Toggle
            collapsed={state.sidebarCollapsed}
            onToggle={actions.toggleSidebar}
          />
          <Header.Brand>
            <Header.BrandTitle>My App</Header.BrandTitle>
          </Header.Brand>
          <Header.Actions>
            <ColorSchemeToggle />
          </Header.Actions>
        </Header>
      </AppShell.Navbar>

      <AppShell.Sidebar>
        <Sidebar collapsed={state.sidebarCollapsed}>
          <Sidebar.Nav>
            <Sidebar.Item id="home">
              <Sidebar.ItemIcon><Home size={20} /></Sidebar.ItemIcon>
              <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
            </Sidebar.Item>
            <Sidebar.Item id="settings">
              <Sidebar.ItemIcon><Settings size={20} /></Sidebar.ItemIcon>
              <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
            </Sidebar.Item>
          </Sidebar.Nav>
        </Sidebar>
      </AppShell.Sidebar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <Footer companyName="My Company" version="1.0.0" />
      </AppShell.Footer>
    </AppShell>
  );
}
```

### Simple Content Layout

```tsx
import { Layout, Box, ColorSchemeToggle } from '@wso2/oxygen-ui';
import { Outlet } from 'react-router';

function DefaultLayout() {
  return (
    <Layout.Content>
      <Box sx={{ position: 'fixed', top: 16, right: 16 }}>
        <ColorSchemeToggle />
      </Box>
      <Outlet />
    </Layout.Content>
  );
}
```

## Theme Usage

```tsx
import {
  OxygenUIThemeProvider,
  AcrylicOrangeTheme,
  AcrylicPurpleTheme,
  ThemeSwitcher,
  ColorSchemeToggle
} from '@wso2/oxygen-ui';

// In main.tsx
<OxygenUIThemeProvider
  themes={[
    { key: 'orange', label: 'Orange Theme', theme: AcrylicOrangeTheme },
    { key: 'purple', label: 'Purple Theme', theme: AcrylicPurpleTheme },
  ]}
  initialTheme="orange"
>
  <App />
</OxygenUIThemeProvider>

// Theme switcher component (switches between themes)
<ThemeSwitcher />

// Color scheme toggle (light/dark mode)
<ColorSchemeToggle />
```

## Form Components

```tsx
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Stack
} from '@wso2/oxygen-ui';

function MyForm() {
  return (
    <Stack spacing={2}>
      <TextField label="Name" fullWidth />
      <TextField label="Email" type="email" fullWidth />
      <Select label="Country" fullWidth>
        <MenuItem value="us">United States</MenuItem>
        <MenuItem value="uk">United Kingdom</MenuItem>
      </Select>
      <FormControlLabel control={<Checkbox />} label="Subscribe" />
      <Button variant="contained">Submit</Button>
    </Stack>
  );
}
```

## Data Grid Usage

```tsx
import { DataGrid } from '@wso2/oxygen-ui';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
];

function DataTable({ rows }) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
    />
  );
}
```

## Icon Usage

Icons use the Lucide icon set. Always specify size:

```tsx
import { Settings, User, Bell, Home, Menu } from '@wso2/oxygen-ui-icons-react';

// In JSX - always specify size
<Settings size={20} />
<User size={24} />
<Bell size={16} />

// With additional styling
<Home size={20} style={{ color: 'currentColor' }} />
```

## Common Components Quick Reference

| Component | Import | Usage |
|-----------|--------|-------|
| Button | `@wso2/oxygen-ui` | `<Button variant="contained">Click</Button>` |
| TextField | `@wso2/oxygen-ui` | `<TextField label="Name" />` |
| Typography | `@wso2/oxygen-ui` | `<Typography variant="h1">Title</Typography>` |
| Box | `@wso2/oxygen-ui` | `<Box sx={{ p: 2 }}>Content</Box>` |
| Stack | `@wso2/oxygen-ui` | `<Stack spacing={2}>...</Stack>` |
| Card | `@wso2/oxygen-ui` | `<Card><CardContent>...</CardContent></Card>` |
| Link | `@wso2/oxygen-ui` | `<Link href="/path">Link</Link>` |

## Best Practices

1. **Always use oxygen-ui imports** - ESLint will enforce this
2. **Use the `sx` prop for styling** - Follows MUI patterns
3. **Prefer Stack and Box for layout** - Flexible and consistent
4. **Use Typography for text** - Ensures consistent typography
5. **Icons should have explicit size** - Prevents layout shifts
6. **Use theme colors** - `primary.main`, `text.secondary`, etc.
