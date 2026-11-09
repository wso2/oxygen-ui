---
name: oxygen-textfield
description: Use the Oxygen UI TextField with a fixed label above the field instead of MUI's floating label. Use when adding or editing any TextField, select, or Autocomplete input, or when converting floating-label fields to fixed labels.
---

# Fixed-Label TextField

Oxygen UI text inputs use a fixed label that sits above the field and never moves. Do not use MUI's floating label, which starts inside the field and shrinks into the border on focus.

```text
Fixed label (use)          Floating label (don't use)
Display name               ┌─ Display name ──────┐
┌─────────────────────┐    │ my-app              │
│ my-app              │    └─────────────────────┘
└─────────────────────┘
```

## Instructions

1. Import `TextField` from `@wso2/oxygen-ui`, never from `@mui/material`. `labelPlacement` is an Oxygen UI prop, and the MUI `TextField` ignores it.
2. Add `labelPlacement="top"` to every `TextField` that has a `label`.
3. Apply the same rule to selects (`TextField select`) and to the `TextField` in an Autocomplete's `renderInput`.
4. Mark required fields with `required`; the theme draws the `*`.
5. For forms (validation, sections, wizards), also follow the `oxygen-form` skill.

## Usage

```tsx
import { TextField, MenuItem, Autocomplete } from '@wso2/oxygen-ui';

<TextField labelPlacement="top" label="Display name" required />

<TextField select labelPlacement="top" label="Environment" value={env} onChange={(e) => setEnv(e.target.value)}>
  <MenuItem value="dev">Development</MenuItem>
  <MenuItem value="prod">Production</MenuItem>
</TextField>

<Autocomplete
  options={regions}
  renderInput={(params) => <TextField {...params} labelPlacement="top" label="Region" />}
/>
```

## How it behaves

- The label renders as a `FormLabel` above the input and keeps its colour on focus. Focus shows only on the field's border.
- The label is linked to the input with `htmlFor`, and for selects through `labelId`, so screen readers announce it. Do not add your own `aria-label` when a label is set.
- `sx`, `className`, `style`, `fullWidth`, `margin` and `ref` apply to the outer wrapper that holds the label and the field.
- When `error` is set, an empty helper line is reserved so the layout doesn't shift when a message appears.
- Without a `label`, the prop has no effect and the field renders as a plain MUI `TextField`.

## Fields with no visible label

Some fields have no visible label, such as a search box in a toolbar or a table filter. Omit `label`, describe the field with a `placeholder`, and give it an accessible name:

```tsx
<TextField
  placeholder="Search projects"
  slotProps={{ htmlInput: { 'aria-label': 'Search projects' } }}
/>
```

Never use a floating label to save vertical space.

## Converting floating labels

When you edit code that uses floating labels:

| Floating-label code | Fixed-label replacement |
| --- | --- |
| `import { TextField } from '@mui/material'` | `import { TextField } from '@wso2/oxygen-ui'` |
| `<TextField label="Name" />` | `<TextField labelPlacement="top" label="Name" />` |
| `InputLabelProps={{ shrink: true }}` or `slotProps={{ inputLabel: { shrink: true } }}` | Remove it; add `labelPlacement="top"` |
| `<FormControl><InputLabel>Role</InputLabel><Select label="Role">` | `<TextField select labelPlacement="top" label="Role">` |
| A `Typography` or `FormLabel` placed above a label-less `TextField` | Remove it; pass the text as `label` with `labelPlacement="top"` |
| `label="Email *"` | `label="Email" required` |

## Do and don't

```text
✓ <TextField labelPlacement="top" label="Email" required />
✓ <TextField select labelPlacement="top" label="Role">…</TextField>
✗ <TextField label="Email" />                          floating label
✗ import { TextField } from '@mui/material'            labelPlacement is ignored
✗ <TextField label="Email" slotProps={{ inputLabel: { shrink: true } }} />
✗ <InputLabel>Role</InputLabel><Select label="Role">   floating select label
✗ <Typography>Email</Typography><TextField />          label not linked to the input
✗ <TextField labelPlacement="top" label="Email *" />   hand-written asterisk
```

Write labels in sentence case, for example "Display name", not "Display Name".
