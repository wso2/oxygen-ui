# Oxygen UI — WCAG 2.1 AA Accessibility Audit

**Date:** July 2026
**Scope:** All first-party components in `packages/oxygen-ui/src` (components, layouts, animations), the themed MUI surface exercised by the 103 Storybook story files in `packages/oxygen-ui-docs`, and the shipped themes.
**Standard:** [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/), automated checks via [axe-core](https://github.com/dequelabs/axe-core) rule tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`.

## 1. Methodology

1. **Automated baseline** — `@storybook/addon-a11y` was added to the docs Storybook with `parameters.a11y.test: 'error'` as the global default, and the full story suite (533 stories) was executed with `@storybook/test-runner` + Playwright against a static Storybook build. Every failure was triaged as: component bug, story (documentation) bug, or theme/palette issue.
2. **Wrapper integrity audit** — every first-party component was reviewed at source level for: `ref` forwarding, `...props` spreading to the correct DOM node (prop swallowing), icon-only controls without accessible names, non-semantic interactive elements, missing `aria-hidden` on decorative icons, focus-outline suppression, and motion without `prefers-reduced-motion` handling.
3. **Keyboard and focus review** — interactive composites (breadcrumb overflow menu, collapsed sidebar nested menus, user menu, notification panel, listing table, complex select, dialogs/menus/popovers) were reviewed for keyboard operability and focus management. Composites built on MUI `Menu`, `Popover`, `Drawer`, `Dialog`, `Tabs` inherit MUI's focus trapping, restoration, and arrow-key behavior; custom-built interaction paths were audited individually.
4. **Regression protection** — Vitest + Testing Library tests (`packages/oxygen-ui/src/components/accessibility.test.tsx`) lock in accessible names, prop forwarding, and ref forwarding. A CI job in `pr-builder.yml` runs the Storybook accessibility suite on every PR and fails on new violations.

> Automated tooling catches roughly a quarter to a third of WCAG issues. Screen reader passes (VoiceOver/NVDA/JAWS) and 200%/400% zoom-reflow verification on real assistive technology still require a human pass and are listed under [Section 6](#6-remaining-manual-verification).

## 2. Baseline results

| Run | Failed stories | Notes |
| --- | --- | --- |
| Initial baseline | 48 / 533 | Per-rule story counts (not mutually exclusive): 36 `color-contrast`, 7 `aria-input-field-name`, 3 `label`, 1 `aria-progressbar-name`, 2 `scrollable-region-focusable` (49 rule-hits across 48 stories) |
| After remediation | 0 / 533 | 35 unique stories carry documented, issue-tracked rule exceptions (see §5; some stories disable more than one rule) |

## 3. Issues found and fixed

### Components (`@wso2/oxygen-ui`)

| Component | Issue | WCAG | Fix |
| --- | --- | --- | --- |
| `ComplexSelect` | `labelAnchor="inside"` rendered a visual label only; the combobox had no accessible name. Label ids were generated with `Math.random()` (unstable, SSR-unsafe). | 4.1.2 | Visually hidden `InputLabel` for inside mode; `useId()` for label ids. |
| `ThemeSwitcher` / `ThemeSelect` | With `showLabel={false}` (default) the select had no accessible name; hardcoded label id broke with multiple instances. | 4.1.2 | Always render the `InputLabel` (visually hidden when `showLabel` is false); `useId()`. |
| `Form.ElementWrapper` | `FormLabel htmlFor` cannot label MUI `Select` (renders a non-labelable `div[role="combobox"]`). | 1.3.1, 4.1.2 | Label gets an id; `Select` children are cloned with a matching `labelId`. |
| `ColorSchemeToggle` | Icon-only button relied on `Tooltip` for its name; no ref forwarding. | 4.1.2 | Default `aria-label="Switch to <next> mode"` (overridable); `forwardRef`. |
| `Header.Toggle` | Icon-only sidebar toggle had no `aria-label` or state exposure. | 4.1.2 | `aria-label` from the existing expand/collapse label props; `aria-expanded`; decorative icons hidden. |
| `Header.Brand` | Clickable `Box` with `onClick` — not focusable, no role, no keyboard handler. | 2.1.1, 4.1.2 | Renders a `ButtonBase` when `onClick` is set (plain `div` otherwise); accepts `aria-label`. |
| `AppBreadcrumbs` | Overflow ellipsis was a `Typography` with `onClick` only; overflow menu was a raw `Popper`+`MenuList` with no focus management, arrow keys, or Escape. Decorative separators unlabeled. | 2.1.1, 2.1.2, 4.1.2 | Ellipsis is a native `<button>` with `aria-haspopup`/`aria-expanded`/`aria-controls`; menu replaced with MUI `Menu` (focus trap, arrow keys, Escape, focus restore); separator `aria-hidden`. |
| `Sidebar.Item` | Collapsed nested menus opened on hover only — unusable by keyboard. Collapsed items had no accessible name (tooltip only); no `aria-expanded` on parents. | 2.1.1, 4.1.2 | Enter/Space now toggles the nested-items popover when collapsed; `aria-label` on collapsed items; `aria-expanded` + `aria-haspopup` wired; chevrons `aria-hidden`. |
| `ListingTable.DataGrid` | Cell/header focus outlines were removed with no replacement. | 2.4.7 | `:focus-visible` outline restored using the theme primary color (mouse `:focus` stays clean). |
| `ListingTable.Toolbar` | Clear-search icon button unlabeled; search input named only by placeholder; container had no toolbar semantics. | 4.1.2 | `aria-label="Clear search"`; input `aria-label`; `role="toolbar"` + label. |
| `ListingTable.DensityControl` | Icon-only toggle buttons relied on tooltips. | 4.1.2 | `aria-label` per toggle and on the group; icons hidden. |
| `NotificationPanel` | Header close and item dismiss icon buttons unlabeled. | 4.1.2 | `aria-label="Close notifications"` / `"Dismiss notification"`; icons hidden. |
| `NotificationBanner` | MUI light-mode filled `info`/`warning` Alerts fail 4.5:1 with white text (3.85:1 / 3.11:1). | 1.4.3 | Light mode: `info` uses `info.dark` background; `warning` switches to black text/icons. |
| `CodeBlock` + theme `syntax` tokens | Light-mode syntax colors `#d73a49` (4.19:1) and `#6a737d` (4.41:1) fail on `#f5f5f5`. | 1.4.3 | Darkened to `#cf222e` (4.91:1) and `#57606a` (5.86:1) in both the theme tokens and component fallbacks. |
| `Footer.Version` | `text.disabled` at 11px = 2.67:1 on white. | 1.4.3 | Uses `text.secondary`. |
| `ParticleBackground` | Continuous canvas animation ignored `prefers-reduced-motion`; canvas not marked decorative. | 2.3.3 | Renders a single static frame under reduced motion (live-updates when the preference changes); `aria-hidden="true"`. |
| `OxygenThemeBase` | No global reduced-motion handling for MUI transitions (sidebar width, card hover, collapse animations). | 2.3.3 | `MuiCssBaseline` override collapses all animations/transitions under `prefers-reduced-motion: reduce`. |
| `SearchBar` / `SearchBarBase` | Input named only by placeholder; decorative search icon unlabeled; no ref forwarding. | 4.1.2 | Default `aria-label` from placeholder (overridable via `slotProps.htmlInput`); icon `aria-hidden`; `forwardRef`. |
| `UserMenu.Trigger` | No prop spreading (consumers could not pass `aria-*`/`data-*`); no ref forwarding. | — | Extends `IconButtonProps`, spreads props, `forwardRef`. (Trigger already had correct `aria-haspopup`/`aria-expanded`/`aria-controls`.) |
| `PageTitle.BackButton`, `StatCard` | Decorative icons not hidden from screen readers. | 1.1.1 | `aria-hidden` on icons. |

### Stories (documentation demonstrating accessible usage)

- `Checkbox`, `Switch`, `Slider` — standalone controls now demonstrate `aria-label` / `slotProps` labeling (axe `label` rule).
- `Select` — `InputLabel id` ↔ `Select labelId` linkage added to all variants (axe `aria-input-field-name`).
- `Progress` — all `CircularProgress`/`LinearProgress` instances have `aria-label` (axe `aria-progressbar-name`).
- `ImageList`, `useThemeContent` — fixed-height scrollable regions given `tabIndex={0}` and labels (axe `scrollable-region-focusable`); `warning.dark`-on-`warning.light` heading fixed.
- `AppShell`, `ComplexSelect` stories — header switcher selects labeled via `slotProps={{ input: { 'aria-label': … } }}`.
- `CreateServiceFormTemplate` — adornment icon buttons labeled (axe `button-name`).
- The Storybook preview also dropped a broken `ChoreoTheme` import (not exported by the library).

## 4. Follow-up issues (tracked on GitHub)

| Issue | Title | Severity |
| --- | --- | --- |
| [#557](https://github.com/wso2/oxygen-ui/issues/557) | **Epic:** Ensure WCAG 2.2 AA compliance across Oxygen UI | — |
| [#558](https://github.com/wso2/oxygen-ui/issues/558) | Brand primary `#FF7300` fails WCAG AA 4.5:1 text contrast (Classic/WSO2 themes) | High (needs design decision) |
| [#559](https://github.com/wso2/oxygen-ui/issues/559) | `forwardRef` + full prop forwarding rollout for remaining compound components | Medium |
| [#560](https://github.com/wso2/oxygen-ui/issues/560) | NotificationPanel live-region announcements and drawer labeling | Medium |
| [#561](https://github.com/wso2/oxygen-ui/issues/561) | Medium/low severity wrapper-audit follow-ups (SVG roles, landmark guidance, `aria-describedby` for form errors, hardcoded colors, decorative icons) | Medium/Low |
| [#562](https://github.com/wso2/oxygen-ui/issues/562) | `Form.CardButton` nests interactive controls inside a `<button>` (`nested-interactive`) | High |
| [#563](https://github.com/wso2/oxygen-ui/issues/563) | Manual AT pass (VoiceOver/NVDA, zoom 200%/400%) | High |

## 5. Documented exceptions

Counts below are CSF story modules with a meta-level `parameters.a11y.options.rules` override (same unit as the 35 unique stories in §2). Overrides carry a comment linking the tracking issue and remain visible in the Storybook a11y addon panel. Unique exception-bearing modules: **35**.

- **`color-contrast` (35 modules)** — 34 trace to the brand primary `#FF7300` used by the default `Classic`/`WSO2` themes (2.61:1 as text on `#fafafa`, 2.72:1 with white text on orange). Changing the brand palette needs design sign-off → [#558](https://github.com/wso2/oxygen-ui/issues/558). The `Theming/Colors` module is also excluded because it is a raw Material palette swatch demo.
- **`nested-interactive` (2 modules)** — both also disable `color-contrast` (overlap; not additive with the 35). `Form.CardButton` design flaw → [#562](https://github.com/wso2/oxygen-ui/issues/562).

## 6. Remaining manual verification

These require a human with real assistive technology and are tracked in [#563](https://github.com/wso2/oxygen-ui/issues/563):

1. **Screen reader pass** (VoiceOver on macOS, NVDA on Windows) over: `AppShell` + `Sidebar` navigation, `UserMenu`, `NotificationPanel` (see [#560](https://github.com/wso2/oxygen-ui/issues/560)), `ListingTable` (table semantics and sort announcements), `ComplexSelect`, Form templates (error announcement flow — `aria-describedby` wiring is tracked in [#561](https://github.com/wso2/oxygen-ui/issues/561)).
2. **Zoom/reflow** at 200% and 400% (WCAG 1.4.10) on `AppShell`, `Layout`, `Sidebar`, and the Templates stories.
3. **Focus visible** (WCAG 2.4.7) — confirm keyboard focus is visible; the theme files do not suppress `:focus-visible` anywhere (verified by source audit), so MUI defaults apply.
4. **Focus-indicator contrast** (≥ 3:1, WCAG 1.4.11) — spot-checks per theme in both color schemes.
5. **Keyboard passes on themed MUI composites** (Dialog, Menu, Tabs, Accordion, Drawer, DataGrid) — expected to inherit MUI behavior; verify no theme override interferes.

## 7. Ongoing workflow

- **Local:** the a11y addon panel shows violations for every story while developing (`pnpm storybook`). All stories run with WCAG 2.1 A/AA rules and `test: 'error'`.
- **CI:** the `storybook` job in `.github/workflows/pr-builder.yml` builds Storybook and runs `pnpm --filter @wso2/oxygen-ui-docs test:storybook:ci`; any new violation fails the PR.
- **Exceptions policy:** a story may only disable a rule with (a) a code comment explaining why and (b) a linked GitHub issue. See `CONTRIBUTING.md`.
- **Unit level:** `packages/oxygen-ui/src/components/accessibility.test.tsx` guards accessible names and prop/ref forwarding; extend it when touching wrapper roots.
