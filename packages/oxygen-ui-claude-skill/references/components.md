# Oxygen UI Components Reference

## Table of Contents
- [AppShell](#appshell)
- [Header](#header)
- [Sidebar](#sidebar)
- [NotificationPanel](#notificationpanel)
- [Layout](#layout)
- [Form](#form)
- [ListingTable](#listingtable)
- [SearchBar](#searchbar)
- [Utility Components](#utility-components)
- [Hooks](#hooks)

---

## AppShell

Compound component for building complete application layouts.

### Sub-components
| Component | Description |
|-----------|-------------|
| `AppShell.Navbar` | Top navigation slot |
| `AppShell.Sidebar` | Side navigation slot |
| `AppShell.Main` | Main content area |
| `AppShell.Footer` | Footer slot |
| `AppShell.NotificationPanel` | Notification panel slot |

### Example
```tsx
import { AppShell, Header, Sidebar } from '@wso2/oxygen-ui';
import { useAppShell } from '@wso2/oxygen-ui';

function App() {
  const { state, actions } = useAppShell();

  return (
    <AppShell>
      <AppShell.Navbar>
        <Header>...</Header>
      </AppShell.Navbar>
      <AppShell.Sidebar>
        <Sidebar collapsed={state.sidebarCollapsed}>...</Sidebar>
      </AppShell.Sidebar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
```

---

## Header

Top navigation bar with compound pattern.

### Sub-components
| Component | Description |
|-----------|-------------|
| `Header.Toggle` | Sidebar toggle button |
| `Header.Brand` | Brand container |
| `Header.BrandLogo` | Logo image (`src` prop) |
| `Header.BrandTitle` | Application title |
| `Header.Switchers` | Switcher controls container |
| `Header.Actions` | Action buttons container |
| `Header.Spacer` | Flexible spacer |

### Props
| Prop | Type | Description |
|------|------|-------------|
| `minimal` | `boolean` | Compact mode |
| `height` | `number` | Header height (default: 56) |

### Example
```tsx
<Header>
  <Header.Toggle onClick={() => toggleSidebar()} />
  <Header.Brand>
    <Header.BrandLogo src="/logo.svg" alt="Logo" />
    <Header.BrandTitle>My Application</Header.BrandTitle>
  </Header.Brand>
  <Header.Spacer />
  <Header.Switchers>
    <ThemeSwitcher />
  </Header.Switchers>
  <Header.Actions>
    <IconButton><Bell /></IconButton>
    <UserMenu />
  </Header.Actions>
</Header>
```

---

## Sidebar

Collapsible navigation sidebar.

### Constants
- `SIDEBAR_WIDTH`: 250px (expanded)
- `SIDEBAR_COLLAPSED_WIDTH`: 64px (collapsed)

### Sub-components
| Component | Description |
|-----------|-------------|
| `Sidebar.Nav` | Navigation container |
| `Sidebar.Category` | Navigation category group |
| `Sidebar.CategoryLabel` | Category label text |
| `Sidebar.Item` | Navigation item (clickable) |
| `Sidebar.ItemIcon` | Item icon |
| `Sidebar.ItemLabel` | Item label text |
| `Sidebar.ItemBadge` | Item badge (notifications) |
| `Sidebar.Footer` | Sidebar footer |
| `Sidebar.User` | User profile section |
| `Sidebar.UserAvatar` | User avatar |
| `Sidebar.UserDetails` | User info container |
| `Sidebar.UserName` | Username text |
| `Sidebar.UserEmail` | User email text |

### Props
| Prop | Type | Description |
|------|------|-------------|
| `collapsed` | `boolean` | Collapsed state |
| `width` | `number` | Custom width |

### Example
```tsx
<Sidebar collapsed={isCollapsed}>
  <Sidebar.Nav>
    <Sidebar.Category>
      <Sidebar.CategoryLabel>Main</Sidebar.CategoryLabel>
      <Sidebar.Item onClick={() => navigate('/home')} selected={isActive('/home')}>
        <Sidebar.ItemIcon><Home /></Sidebar.ItemIcon>
        <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
      </Sidebar.Item>
      <Sidebar.Item onClick={() => navigate('/settings')}>
        <Sidebar.ItemIcon><Settings /></Sidebar.ItemIcon>
        <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
        <Sidebar.ItemBadge>3</Sidebar.ItemBadge>
      </Sidebar.Item>
    </Sidebar.Category>
  </Sidebar.Nav>

  <Sidebar.Footer>
    <Sidebar.User>
      <Sidebar.UserAvatar src="/avatar.jpg" />
      <Sidebar.UserDetails>
        <Sidebar.UserName>John Doe</Sidebar.UserName>
        <Sidebar.UserEmail>john@example.com</Sidebar.UserEmail>
      </Sidebar.UserDetails>
    </Sidebar.User>
  </Sidebar.Footer>
</Sidebar>
```

---

## NotificationPanel

Notification management panel with compound pattern.

### Sub-components
| Component | Description |
|-----------|-------------|
| `NotificationPanel.Header` | Panel header |
| `NotificationPanel.HeaderIcon` | Header icon |
| `NotificationPanel.HeaderTitle` | Header title |
| `NotificationPanel.HeaderBadge` | Notification count badge |
| `NotificationPanel.HeaderClose` | Close button |
| `NotificationPanel.Tabs` | Tab navigation |
| `NotificationPanel.Actions` | Action buttons |
| `NotificationPanel.List` | Notification list |
| `NotificationPanel.Item` | Individual notification |
| `NotificationPanel.ItemIcon` | Notification icon |
| `NotificationPanel.ItemContent` | Notification content |
| `NotificationPanel.ItemTitle` | Notification title |
| `NotificationPanel.ItemMessage` | Notification message |
| `NotificationPanel.ItemTime` | Timestamp |
| `NotificationPanel.Empty` | Empty state |

### Example
```tsx
<NotificationPanel open={isOpen} onClose={() => setOpen(false)}>
  <NotificationPanel.Header>
    <NotificationPanel.HeaderIcon><Bell /></NotificationPanel.HeaderIcon>
    <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
    <NotificationPanel.HeaderBadge>{count}</NotificationPanel.HeaderBadge>
    <NotificationPanel.HeaderClose onClick={() => setOpen(false)} />
  </NotificationPanel.Header>

  <NotificationPanel.List>
    {notifications.map(n => (
      <NotificationPanel.Item key={n.id}>
        <NotificationPanel.ItemIcon><Info /></NotificationPanel.ItemIcon>
        <NotificationPanel.ItemContent>
          <NotificationPanel.ItemTitle>{n.title}</NotificationPanel.ItemTitle>
          <NotificationPanel.ItemMessage>{n.message}</NotificationPanel.ItemMessage>
          <NotificationPanel.ItemTime>{n.time}</NotificationPanel.ItemTime>
        </NotificationPanel.ItemContent>
      </NotificationPanel.Item>
    ))}
  </NotificationPanel.List>
</NotificationPanel>
```

---

## Layout

Base layout primitive for custom layouts.

### Sub-components
| Component | Description |
|-----------|-------------|
| `Layout.Navbar` | Navbar slot |
| `Layout.Sidebar` | Sidebar slot |
| `Layout.Content` | Main content slot |
| `Layout.Header` | Header slot |

### Example
```tsx
import { Layout } from '@wso2/oxygen-ui';

<Layout>
  <Layout.Navbar>
    <Header>...</Header>
  </Layout.Navbar>
  <Layout.Sidebar>
    <Sidebar>...</Sidebar>
  </Layout.Sidebar>
  <Layout.Content>
    <Box sx={{ p: 3 }}>
      {children}
    </Box>
  </Layout.Content>
</Layout>
```

---

## Form

Compound component for building forms with consistent styling.

### Sub-components

**Input Components:**
| Component | Description |
|-----------|-------------|
| `Form.TextInput` | Text field with label (wraps MUI TextField) |
| `Form.SelectInput` | Select dropdown with label |
| `Form.AutocompleteInput` | Autocomplete with label |
| `Form.MenuItem` | Menu item for SelectInput (re-export) |

**Layout Components:**
| Component | Description |
|-----------|-------------|
| `Form.Section` | Card-based container with spacing |
| `Form.Stack` | Vertical stack with default spacing |
| `Form.CardButton` | Interactive card with hover effects |
| `Form.DisappearingCardButtonContent` | Content that appears on CardButton hover |

**Typography Components:**
| Component | Description |
|-----------|-------------|
| `Form.Header` | h4 typography |
| `Form.Subheader` | h5 typography |
| `Form.Body` | body2 typography |

**Complex Components:**
| Component | Description |
|-----------|-------------|
| `Form.Wizard` | Multi-step form with stepper |
| `Form.CardHeader` | Card header (re-export) |
| `Form.CardContent` | Card content (re-export) |
| `Form.CardActions` | Card actions (re-export) |
| `Form.CardMedia` | Card media (re-export) |

### Props

**TextInput Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Field label |
| `name` | `string` | Yes | Field name |
| ...TextFieldProps | | | All MUI TextField props |

**SelectInput Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Field label |
| `name` | `string` | Yes | Field name |
| `children` | `ReactNode` | No | MenuItem children |

**AutocompleteInput Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Field label |
| `name` | `string` | Yes | Field name |
| `placeholder` | `string` | No | Placeholder text |
| ...AutocompleteProps | | | All MUI Autocomplete props |

**CardButton Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alignItems` | `'flex-start' \| 'center' \| 'flex-end'` | `'flex-start'` | Content alignment |
| `onClick` | `() => void` | | Click handler |
| `disabled` | `boolean` | | Disabled state |
| `selected` | `boolean` | | Selected state |

**Wizard Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `steps` | `{ label: string, component: ReactNode }[]` | Yes | Step configuration |
| `activeStep` | `number` | Yes | Current step index |
| `actions` | `ReactNode` | No | Action buttons |

### Example
```tsx
import { Form } from '@wso2/oxygen-ui';

<Form.Section>
  <Form.Header>User Registration</Form.Header>
  <Form.Subheader>Fill in your details</Form.Subheader>

  <Form.Stack>
    <Form.TextInput label="Full Name" name="fullName" required />
    <Form.TextInput label="Email" name="email" type="email" />

    <Form.SelectInput label="Country" name="country">
      <Form.MenuItem value="us">United States</Form.MenuItem>
      <Form.MenuItem value="uk">United Kingdom</Form.MenuItem>
    </Form.SelectInput>

    <Form.AutocompleteInput
      label="Skills"
      name="skills"
      multiple
      options={skillOptions}
      getOptionLabel={(option) => option.name}
    />
  </Form.Stack>
</Form.Section>

{/* Card selection */}
<Form.Stack direction="row" spacing={2}>
  <Form.CardButton selected={plan === 'free'} onClick={() => setPlan('free')}>
    <Form.Header>Free</Form.Header>
    <Form.Body>Basic features</Form.Body>
    <Form.DisappearingCardButtonContent>
      <Button>Select</Button>
    </Form.DisappearingCardButtonContent>
  </Form.CardButton>
</Form.Stack>

{/* Multi-step wizard */}
<Form.Wizard
  steps={[
    { label: 'Account', component: <AccountStep /> },
    { label: 'Profile', component: <ProfileStep /> },
    { label: 'Confirm', component: <ConfirmStep /> },
  ]}
  activeStep={step}
  actions={
    <>
      <Button onClick={handleBack} disabled={step === 0}>Back</Button>
      <Button onClick={handleNext}>
        {step === 2 ? 'Submit' : 'Next'}
      </Button>
    </>
  }
/>
```

---

## ListingTable

Data table component with sorting, search, filtering, and multiple variants.

### Sub-components

**Core Table:**
| Component | Description |
|-----------|-------------|
| `ListingTable` | Main table component |
| `ListingTable.Container` | Wrapper with Paper/elevation |
| `ListingTable.Head` | Table header |
| `ListingTable.Body` | Table body |
| `ListingTable.Footer` | Table footer |
| `ListingTable.Row` | Table row (clickable, card variant support) |
| `ListingTable.Cell` | Table cell (truncation, maxWidth) |

**Features:**
| Component | Description |
|-----------|-------------|
| `ListingTable.Provider` | Context provider for state management |
| `ListingTable.Toolbar` | Search and actions toolbar |
| `ListingTable.SortLabel` | Sortable column header |
| `ListingTable.DensityControl` | Row density toggle |
| `ListingTable.EmptyState` | Empty data display |
| `ListingTable.RowActions` | Row action buttons |
| `ListingTable.CellIcon` | Cell with icon and text |

### Props

**ListingTable Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'table' \| 'card'` | `'table'` | Display style |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'standard'` | Row padding |
| `striped` | `boolean` | | Alternating row colors |
| `bordered` | `boolean` | | Cell borders |

**ListingTable.Row Props:**
| Prop | Type | Description |
|------|------|-------------|
| `clickable` | `boolean` | Pointer cursor on hover |
| `variant` | `'table' \| 'card'` | Card variant has rounded borders |

**ListingTable.Cell Props:**
| Prop | Type | Description |
|------|------|-------------|
| `truncate` | `boolean` | Text overflow ellipsis |
| `maxWidth` | `number \| string` | Maximum cell width |

**ListingTable.Toolbar Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSearch` | `boolean` | | Show built-in search |
| `searchSlot` | `ReactNode` | | Custom search component |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `searchMinWidth` | `number` | `200` | Min search width |
| `searchMaxWidth` | `number` | `300` | Max search width |
| `actions` | `ReactNode` | | Right-aligned actions |

**ListingTable.SortLabel Props:**
| Prop | Type | Description |
|------|------|-------------|
| `field` | `string` | Column identifier for sorting |
| `active` | `boolean` | Active sort state |
| `direction` | `'asc' \| 'desc'` | Sort direction |
| `hideSortIcon` | `boolean` | Hide icon when inactive |

**ListingTable.EmptyState Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'No data available'` | Title text |
| `description` | `string` | | Subtitle |
| `illustration` | `ReactNode` | | Icon/image |
| `action` | `ReactNode` | | CTA button |
| `minHeight` | `number \| string` | `300` | Minimum height |

**ListingTable.CellIcon Props:**
| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Icon element |
| `primary` | `string` | Main text |
| `secondary` | `string` | Subtitle text |
| `iconPosition` | `'left' \| 'right'` | Icon position (default: left) |

### Context API (Provider Props)

**Search:**
- `searchValue?: string`
- `onSearchChange?: (value: string) => void`

**Sort:**
- `sortField?: string`
- `sortDirection?: 'asc' | 'desc'`
- `onSortChange?: (field: string, direction: 'asc' | 'desc') => void`

**Pagination:**
- `page?: number`
- `rowsPerPage?: number`
- `totalCount?: number`
- `onPageChange?: (page: number) => void`
- `onRowsPerPageChange?: (rowsPerPage: number) => void`

**Selection:**
- `selected?: readonly string[]`
- `onSelectionChange?: (selected: string[]) => void`
- `isSelected?: (id: string) => boolean`

**Density:**
- `density?: 'compact' | 'standard' | 'comfortable'`
- `onDensityChange?: (density) => void`

**Loading:**
- `loading?: boolean`

### Example
```tsx
import { ListingTable, useListingTable } from '@wso2/oxygen-ui';

function UsersTable() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <ListingTable.Provider
      searchValue={search}
      onSearchChange={setSearch}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={handleSort}
    >
      <ListingTable.Container>
        <ListingTable.Toolbar
          showSearch
          actions={
            <>
              <ListingTable.DensityControl />
              <Button variant="contained">Add User</Button>
            </>
          }
        />

        <ListingTable variant="table" density="standard" striped>
          <ListingTable.Head>
            <ListingTable.Row>
              <ListingTable.Cell>
                <ListingTable.SortLabel field="name">Name</ListingTable.SortLabel>
              </ListingTable.Cell>
              <ListingTable.Cell>
                <ListingTable.SortLabel field="email">Email</ListingTable.SortLabel>
              </ListingTable.Cell>
              <ListingTable.Cell>Status</ListingTable.Cell>
              <ListingTable.Cell>Actions</ListingTable.Cell>
            </ListingTable.Row>
          </ListingTable.Head>
          <ListingTable.Body>
            {users.map(user => (
              <ListingTable.Row key={user.id} clickable>
                <ListingTable.Cell>
                  <ListingTable.CellIcon
                    icon={<Avatar src={user.avatar} />}
                    primary={user.name}
                    secondary={user.role}
                  />
                </ListingTable.Cell>
                <ListingTable.Cell truncate maxWidth={200}>
                  {user.email}
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <Chip label={user.status} color={user.status === 'active' ? 'success' : 'default'} />
                </ListingTable.Cell>
                <ListingTable.Cell>
                  <ListingTable.RowActions>
                    <IconButton size="small"><Edit /></IconButton>
                    <IconButton size="small"><Trash2 /></IconButton>
                  </ListingTable.RowActions>
                </ListingTable.Cell>
              </ListingTable.Row>
            ))}
          </ListingTable.Body>
        </ListingTable>

        {users.length === 0 && (
          <ListingTable.EmptyState
            title="No users found"
            description="Add your first user to get started"
            illustration={<Users size={48} />}
            action={<Button variant="contained">Add User</Button>}
          />
        )}
      </ListingTable.Container>
    </ListingTable.Provider>
  );
}
```

### Card Variant
```tsx
<ListingTable variant="card" density="comfortable">
  <ListingTable.Body>
    {items.map(item => (
      <ListingTable.Row key={item.id} variant="card" clickable>
        {/* Card-style rows with rounded borders and acrylic background */}
      </ListingTable.Row>
    ))}
  </ListingTable.Body>
</ListingTable>
```

---

## SearchBar

Search input components with optional advanced filtering.

### SearchBar
Basic search input with search icon.

```tsx
import { SearchBar } from '@wso2/oxygen-ui';

<SearchBar
  placeholder="Search users..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  fullWidth
/>
```

### SearchBarWithAdvancedFilter
Search with popover for advanced filtering (attribute, condition, value).

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | Search text value |
| `onChange` | `(value: string) => void` | Yes | Search change handler |
| `advancedFilter` | `{ attribute, condition, value }` | Yes | Filter state |
| `onAdvancedFilterChange` | `(filter) => void` | Yes | Filter change handler |
| `attributeOptions` | `{ value, label }[]` | Yes | Attribute dropdown options |
| `conditionOptions` | `{ value, label }[]` | Yes | Condition dropdown options |
| `onAdvancedSearch` | `(payload) => void` | No | Advanced search callback |
| `placeholder` | `string` | No | Search placeholder |
| `popoverWidth` | `number` | No | Filter popover width |

```tsx
import { SearchBarWithAdvancedFilter } from '@wso2/oxygen-ui';

const [search, setSearch] = useState('');
const [filter, setFilter] = useState({ attribute: '', condition: '', value: '' });

<SearchBarWithAdvancedFilter
  value={search}
  onChange={setSearch}
  advancedFilter={filter}
  onAdvancedFilterChange={setFilter}
  attributeOptions={[
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'role', label: 'Role' },
  ]}
  conditionOptions={[
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
  ]}
  onAdvancedSearch={(payload) => {
    console.log('Search:', payload.searchText);
    console.log('Filter:', payload.attribute, payload.condition, payload.value);
  }}
  placeholder="Search by name"
/>
```

---

## Utility Components

### ColorSchemeToggle
Toggle between light/dark/system color schemes.

```tsx
import { ColorSchemeToggle } from '@wso2/oxygen-ui';

<ColorSchemeToggle />
```

### ColorSchemeImage
Display different images based on color scheme.

```tsx
import { ColorSchemeImage } from '@wso2/oxygen-ui';

<ColorSchemeImage
  light="/images/logo-light.svg"
  dark="/images/logo-dark.svg"
  alt="Logo"
/>
```

### ThemeSwitcher
Dropdown to switch between available themes.

```tsx
import { ThemeSwitcher } from '@wso2/oxygen-ui';

<ThemeSwitcher />
```

### CodeBlock
Syntax-highlighted code display (uses Prism.js).

```tsx
import { CodeBlock } from '@wso2/oxygen-ui';

<CodeBlock language="typescript">
{`const greeting = "Hello, World!";
console.log(greeting);`}
</CodeBlock>
```

### PageTitle
Page title with compound pattern.

```tsx
import { PageTitle } from '@wso2/oxygen-ui';

<PageTitle>
  <PageTitle.Avatar src="/icon.svg" />
  <PageTitle.Header>Page Title</PageTitle.Header>
  <PageTitle.SubHeader>Description text</PageTitle.SubHeader>
  <PageTitle.Link href="/docs">Documentation</PageTitle.Link>
</PageTitle>
```

### UserMenu
User profile dropdown menu.

```tsx
import { UserMenu } from '@wso2/oxygen-ui';

<UserMenu
  user={{ name: 'John Doe', email: 'john@example.com', avatar: '/avatar.jpg' }}
  onLogout={() => logout()}
/>
```

### NotificationBanner
Alert banner component.

```tsx
import { NotificationBanner } from '@wso2/oxygen-ui';

<NotificationBanner
  severity="warning"
  message="System maintenance scheduled"
  onClose={() => dismiss()}
/>
```

---

## Hooks

### useAppShell
Manage AppShell state (sidebar, notifications).

```tsx
import { useAppShell } from '@wso2/oxygen-ui';

const { state, actions } = useAppShell();

// State
state.sidebarCollapsed;  // boolean
state.sidebarOpen;       // boolean (mobile)
state.notificationsOpen; // boolean

// Actions
actions.toggleSidebar();
actions.setSidebarCollapsed(true);
actions.toggleNotifications();
```

### useThemeSwitcher
Access and control theme switching.

```tsx
import { useThemeSwitcher } from '@wso2/oxygen-ui';

const { theme, setTheme, themes } = useThemeSwitcher();

// Current theme key
console.log(theme); // 'acrylicOrange'

// Available themes
themes.forEach(t => console.log(t.key, t.label));

// Switch theme
setTheme('classic');
```

### useNotifications
Manage notification state.

```tsx
import { useNotifications } from '@wso2/oxygen-ui';

const { notifications, addNotification, removeNotification, clearAll } = useNotifications();

// Add notification
addNotification({
  id: 'unique-id',
  title: 'Success',
  message: 'Operation completed',
  type: 'success',
  timestamp: new Date()
});

// Remove notification
removeNotification('unique-id');

// Clear all
clearAll();
```

### useThemeContent
Get theme-aware content values.

```tsx
import { useThemeContent } from '@wso2/oxygen-ui';

const content = useThemeContent({
  light: 'Light mode content',
  dark: 'Dark mode content'
});
```

### useListingTable
Access ListingTable context (when inside Provider).

```tsx
import { useListingTable, useListingTableRequired } from '@wso2/oxygen-ui';

// Safe access (returns null if outside provider)
const context = useListingTable();

// Strict access (throws error if outside provider)
const context = useListingTableRequired();

// Context values
context?.searchValue;
context?.sortField;
context?.sortDirection;
context?.density;
context?.loading;
context?.onSearchChange?.('query');
context?.onSortChange?.('field', 'asc');
```
