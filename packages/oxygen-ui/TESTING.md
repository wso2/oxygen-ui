# Testing first-party composites (`@wso2/oxygen-ui`)

This is the contract for colocated unit tests on first-party Oxygen UI
composites. It is the public source of truth; `HowToContribute` links here
and does not copy it.

## Seam

Tests attach at the highest existing seam: the public first-party API a
consumer imports and renders — composite roots and their named slots, plus
the documented hooks. Drive that API with Testing Library the way an app
would (roles, names, user events).

The only new test seam is the shared helper at
`src/test-utils/renderWithTheme.tsx`. Every new colocated file goes through
it so the theme provider is not re-invented. Custom themes are an opt-in
per-render argument (`renderWithTheme(ui, { theme })`), not a global Vitest
setup. Do not add Vitest `setupFiles` that auto-wrap every render. Do not
import stories into Vitest.

## What to lock

- Happy-path render of the public composite API.
- Slots that change structure or behaviour.
- Open / close / select / dismiss / navigate interactions.
- Oxygen-owned empty, disabled, and error states.
- `ref` on the interactive root when the component claims it.

A good case fails when a consumer's JSX or interaction stops working.

## What not to lock

- Snapshots of rendered DOM.
- Computed CSS / hover-style scrapes.
- Material / MUI X defaults and primitives (`Button`, `Dialog`,
  `DataGrid`, dividers, `sx`-only boxes).
- Passthrough fragments that only compose slots.
- Utils, theme presets, and already-tested theme plumbing.

A bad case fails when a Material class name, computed color, or snapshot of
MUI DOM changes.

## Where tests live

Colocated with the composite they lock, so a change and its spec are
reviewed together. The existing `accessibility.test.tsx` stays in place and
is not the substitute for colocated tests; overlap on names and refs is
accepted so each composite file stands alone.
