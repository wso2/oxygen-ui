---
name: oxygen-select
description: Use the Oxygen UI Select with a fixed label above the field instead of MUI's floating label, and a placeholder the developer provides. Use ComplexSelect with its default inside label. Use when adding or editing any Select, ComplexSelect, dropdown, or picker built on Select, or when converting FormControl + InputLabel + Select code to fixed labels.
---

# Fixed-Label Select

Oxygen UI selects use a fixed label that sits above the field and never moves. Do not use MUI's floating label, which starts inside the field and shrinks into the border on focus. The floating variant still works, but only for existing screens; never write new code with it.

```text
Fixed label (use)          Floating label (don't use)
Environment                ┌─ Environment ───────┐
┌─────────────────────┐    │ Production        ▾ │
│ Production        ▾ │    └─────────────────────┘
└─────────────────────┘
```

## Instructions

1. Import `Select` from `@wso2/oxygen-ui/Select`, never from `@mui/material`. `labelPlacement` is an Oxygen UI prop, and the MUI `Select` ignores it.
2. Add `labelPlacement="top"` and `label` to every `Select`. Do not wrap it in `FormControl` or add an `InputLabel`; the component draws its own.
3. Give every `Select` a `placeholder`. Get the text from the developer; never make it up (see Placeholder text).
4. Mark required selects with `required`; the theme draws the `*`.
5. When the select needs helper text or validation messages, use `TextField select labelPlacement="top"` instead (see the `oxygen-textfield` skill). It has the same fixed label, supports `helperText`, and takes the same `placeholder`.
6. For forms (validation, sections, wizards), also follow the `oxygen-form` skill.

## Usage

```tsx
import Select from '@wso2/oxygen-ui/Select';
import MenuItem from '@wso2/oxygen-ui/MenuItem';

<Select
  labelPlacement="top"
  label="Environment"
  placeholder="Select an environment"
  required
  value={env}
  onChange={(e) => setEnv(e.target.value)}
>
  <MenuItem value="dev">Development</MenuItem>
  <MenuItem value="prod">Production</MenuItem>
</Select>
```

With helper text:

```tsx
import TextField from '@wso2/oxygen-ui/TextField';
import MenuItem from '@wso2/oxygen-ui/MenuItem';

<TextField
  select
  labelPlacement="top"
  label="Environment"
  placeholder="Select an environment"
  helperText="Where the component is deployed."
  value={env}
  onChange={(e) => setEnv(e.target.value)}
>
  <MenuItem value="dev">Development</MenuItem>
  <MenuItem value="prod">Production</MenuItem>
</TextField>
```

## Placeholder text

Every select shows a placeholder while nothing is selected. The developer owns this text, so ask for it.

1. Before writing the code, check whether the developer has given placeholder text for each select.
2. If any is missing, ask the developer once, listing every select that needs one by its label. Offer a suggestion for each so they can accept or change it, for example:

   ```text
   Placeholder text needed for these selects. Reply with your text, or "ok" to use the suggestions:
   - Environment: "Select an environment"
   - Region: "Select a region"
   ```

3. Use the developer's text exactly as given. Do not write code with placeholder text the developer has not provided or accepted.
4. If you can't ask (for example, in a non-interactive run), use the suggestions and list them in your summary so the developer can review them.

Suggestions follow these rules:

- Start with "Select" and name the thing chosen, in sentence case: "Select a region", not "Select Region" or "Choose…"
- No trailing punctuation or ellipsis
- Don't repeat "(Optional)" or "*" from the label
- Never use the placeholder in place of a label

## How it behaves

- The label renders as a `FormLabel` above the select and keeps its colour on focus and in the error state; the error shows on the field's border and in helper text. Focus shows only on the field: in the default theme, a text-colour border with a Cobalt ring, the same as fixed-label text fields.
- The label names the combobox through `labelId` (or `htmlFor` with `native`), so screen readers announce it. Do not add your own `aria-label` when a label is set.
- `sx`, `className`, `style`, `fullWidth` and `ref` apply to the outer wrapper that holds the label and the select. `size`, `variant`, `required`, `error` and `disabled` apply to both.
- `placeholder` shows text in the field while nothing is selected (an empty value: `''`, `null`, `undefined` or `[]`), in the secondary text colour so it meets contrast requirements. It works with a custom `renderValue`. Native selects ignore it, so give them an empty option with the developer's placeholder text instead: `<option value="">Select a role</option>`.
- Without a `label`, the prop has no effect and the select renders as a plain MUI `Select`.

## ComplexSelect: keep the label inside

`ComplexSelect` (rich options with icons, avatars and list headers, such as the organization and project switchers in `Header.Switchers`) follows a different rule from `Select`. Its label sits inside the field, above the selected value. This is the default `labelAnchor`, `inside`.

1. Pass `label` and do not set `labelAnchor`. The default is `inside`.
2. Do not use `labelAnchor="outside"` or `labelAnchor="border"` in new code. They are kept for existing screens only. When you edit a `ComplexSelect` that sets either, ask the developer before changing it, as the field's height changes.
3. Do not add `labelPlacement`, `FormControl`, `InputLabel` or a `FormLabel` around it. `ComplexSelect` draws and links its own label.
4. Do not add your own `aria-label` when a label is set. The label names the combobox.
5. Leave `size` at its default, `small`. With the label inside, the field is 48px tall and fits the 64px `Header` with 8px above and below.
6. For a chain of levels in the Header (organization, then project, then component), use `ContextSwitcher`, which draws each level as a `ComplexSelect` with the label inside.

```tsx
import ComplexSelect from '@wso2/oxygen-ui/ComplexSelect';

<ComplexSelect label="Organization" value={org} onChange={(e) => setOrg(e.target.value as string)}>
  <ComplexSelect.MenuItem value="acme">
    <ComplexSelect.MenuItem.Avatar>A</ComplexSelect.MenuItem.Avatar>
    <ComplexSelect.MenuItem.Text primary="Acme Corp" secondary="Owner" />
  </ComplexSelect.MenuItem>
</ComplexSelect>
```

The field shows the label, then the selected option with its icon or avatar. Secondary text appears only in the open list.

```text
✓ <ComplexSelect label="Organization" …>                        label inside, the default
✗ <ComplexSelect label="Organization" labelAnchor="outside" …>  existing screens only
✗ <ComplexSelect label="Organization" labelAnchor="border" …>   existing screens only
✗ <ComplexSelect slotProps={{ input: { 'aria-label': 'Organization' } }} …>   hidden name where a visible label fits
```

## Selects with no visible label

Some selects have no visible label, such as a sort or page-size picker in a toolbar. Omit `label`, give the select an accessible name, and still ask the developer for a placeholder if the select can be empty:

```tsx
<Select placeholder="Sort by" value={sort} onChange={(e) => setSort(e.target.value)} inputProps={{ 'aria-label': 'Sort by' }}>
  <MenuItem value="name">Name</MenuItem>
  <MenuItem value="date">Date</MenuItem>
</Select>
```

Never use a floating label to save vertical space.

## Converting floating labels

When you edit code that uses floating labels:

| Floating-label code | Fixed-label replacement |
| --- | --- |
| `import { Select } from '@mui/material'` | `import Select from '@wso2/oxygen-ui/Select'` |
| `<FormControl><InputLabel id="x">Role</InputLabel><Select labelId="x" label="Role">…</Select></FormControl>` | `<Select labelPlacement="top" label="Role">…</Select>` |
| The same, plus a `FormHelperText` | `<TextField select labelPlacement="top" label="Role" helperText="…">…</TextField>` |
| `<FormControl sx={{ minWidth: 200 }}>` around the select | Move `sx` onto the `Select` |
| `<FormControl error required>` around the select | Move `error` and `required` onto the `Select` |
| A `Typography` or `FormLabel` placed above a label-less `Select` | Remove it; pass the text as `label` with `labelPlacement="top"` |
| `label="Role *"` | `label="Role" required` |
| `<MenuItem value="" disabled>Select a role</MenuItem>` used as a placeholder | Remove it; pass `placeholder="Select a role"` |
| `displayEmpty` with a `renderValue` that returns placeholder text | Remove both; pass `placeholder` (keep a `renderValue` that formats real values) |
| A select with no placeholder | Ask the developer for the text, then add `placeholder` |

## Do and don't

```text
✓ <Select labelPlacement="top" label="Role" placeholder="Select a role" required value={role} onChange={…}>…</Select>
✓ <TextField select labelPlacement="top" label="Role" placeholder="Select a role" helperText="…">…</TextField>
✗ <Select labelPlacement="top" label="Role" value={role}>…</Select>   no placeholder; ask the developer for one
✗ <MenuItem value="" disabled>Select a role</MenuItem>               fake placeholder option
✗ <FormControl><InputLabel>Role</InputLabel><Select label="Role">   floating label
✗ import { Select } from '@mui/material'                             labelPlacement is ignored
✗ <FormControl><Select labelPlacement="top" label="Role" /></FormControl>   extra wrapper; the Select has its own
✗ <Typography>Role</Typography><Select />                           label not linked to the select
✗ <Select labelPlacement="top" label="Role *" />                     hand-written asterisk
```

Write labels in sentence case, for example "Deployment region", not "Deployment Region".
