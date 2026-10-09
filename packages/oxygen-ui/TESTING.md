# Testing first-party Oxygen UI

Colocated Vitest + Testing Library files lock the **public composite API** so a Material upgrade or a composite rewrite cannot silently change consumers.

## Lock

- Roles and accessible names
- Slot presence (named slots that change structure or behaviour)
- Interactions: open, close, select, dismiss, navigate
- Oxygen-owned empty, disabled, and error states
- Claimed `ref` forwarding on the interactive root

Drive composites through the public slot API. Render with `renderWithTheme` from `src/test-utils/renderWithTheme`.

## Do not lock

- DOM snapshots
- Computed CSS or hover paint
- Material / MUI X defaults
- Passthrough slots and sx-only boxes

`accessibility.test.tsx` stays the WCAG suite. Colocated files may repeat names and refs.

Do not add a global Vitest `setupFiles` wrapper. Pass an optional `theme` to `renderWithTheme` when a case needs an override.

Stories stay out of Vitest. Coverage numbers are not the definition of done.
