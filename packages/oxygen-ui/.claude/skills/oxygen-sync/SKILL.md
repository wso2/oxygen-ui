---
name: oxygen-sync
description: Sync AI documentation with current source code. Use when components, themes, hooks, or exports have been added, modified, or removed in the Oxygen UI package.
---

# Sync AI Documentation with Source Code

## Purpose

Reads the Oxygen UI source code and regenerates all AI documentation files (`.claude/` and `.ai/`) to match the current codebase state. Intended for design system maintainers working inside the `oxygen-ui` repo.

## Rules

- **NEVER** modify the root `CLAUDE.md` at the repository root
- **NEVER** modify source code files (`src/`)
- **NEVER** modify other skill `SKILL.md` files
- Preserve existing doc structure, heading hierarchy, and formatting conventions
- Use `src/components/index.ts` export order as canonical component ordering
- Extract props from actual TypeScript interfaces — never guess or fabricate
- Report major additions/removals to the user before writing
- Mirror `.claude/` content to `.ai/` after every sync

---

## Phase 1 — Introspect Source Code

Read all of the following files to build a complete picture of the current public API:

### Barrel Exports

- `packages/oxygen-ui/src/index.ts`
- `packages/oxygen-ui/src/components/index.ts`

### Themes

- `packages/oxygen-ui/src/styles/Themes/index.ts`
- If theme names have changed, read the individual theme files referenced by the index

### Hooks

- `packages/oxygen-ui/src/hooks/index.ts`

### Contexts

- `packages/oxygen-ui/src/contexts/index.ts`

### Utils

- `packages/oxygen-ui/src/utils/index.ts`

### Animations

- `packages/oxygen-ui/src/animations/index.ts`

### Compound Components

Read the `index.ts` for each compound component directory:

- `packages/oxygen-ui/src/components/AppShell/index.ts`
- `packages/oxygen-ui/src/components/Header/index.ts`
- `packages/oxygen-ui/src/components/Sidebar/index.ts`
- `packages/oxygen-ui/src/components/ListingTable/index.ts`
- `packages/oxygen-ui/src/components/NotificationPanel/index.ts`
- `packages/oxygen-ui/src/components/Form/index.ts`
- `packages/oxygen-ui/src/components/Footer/index.ts`
- `packages/oxygen-ui/src/components/UserMenu/index.ts`

Also check for any **new** component directories under `src/components/` that have their own `index.ts` (e.g., `CodeBlock`, `ColorSchemeImage`, `ColorSchemeToggle`, `ComplexSelect`, `ThemeSwitcher`, `NotificationBanner`, `PageContent`, `StatCard`, `PageTitle`, `SearchBar`, or others).

### Props (as needed)

For any component that appears new or changed, read the main `.tsx` file to extract prop interfaces.

### Skills

List the directories under `packages/oxygen-ui/.claude/skills/` to capture the current set of available skills.

---

## Phase 2 — Read Current Docs

Read all existing documentation files to understand current state and format:

- `packages/oxygen-ui/.claude/CLAUDE.md`
- `packages/oxygen-ui/.claude/components.md`
- `packages/oxygen-ui/.claude/patterns.md`
- `packages/oxygen-ui/.claude/theming.md`
- `packages/oxygen-ui/.claude/migration.md`

---

## Phase 3 — Report Discrepancies

Before writing any files, compile a report of what changed:

- **New in source, missing from docs**: Components, hooks, themes, contexts, utils, animations, or type exports found in source but not documented
- **In docs, removed from source**: Items documented but no longer exported
- **Changed**: Props, sub-components, or type exports that have been modified

Present this report to the user and **ask for confirmation** before proceeding with writes.

---

## Phase 4 — Regenerate Documentation

After the user confirms, update each file while preserving existing format conventions:

### `.claude/CLAUDE.md`

- Update the **Available Themes** list to match `src/styles/Themes/index.ts`
- Update the **Custom Oxygen Components** list to match `src/components/index.ts`
- Update the **Available Skills** list to match the directories in `.claude/skills/`
- Do NOT include `/oxygen-sync` in the Available Skills list (it is internal-only and already listed separately)

### `.claude/components.md`

- Update component API tables, props, sub-components, hooks, and type exports
- Add entries for new components found in source
- Remove entries for components no longer in source
- Use `src/components/index.ts` export order for ordering

### `.claude/patterns.md`

- Verify all code examples use current APIs (correct component names, prop names, imports)
- Update any examples that reference renamed or removed components/props

### `.claude/theming.md`

- Update the available themes table
- Update theme properties and CSS variables if changed

### `.claude/migration.md`

- Verify import examples are accurate
- Update any migration guidance affected by API changes

### Mirror to `.ai/`

After updating all `.claude/` files, mirror the content to `.ai/`:

| Source | Target | Notes |
|--------|--------|-------|
| `.claude/CLAUDE.md` | `.ai/AGENTS.md` | Adjust paths (`.claude/` -> `.ai/`), remove the Available Skills section |
| `.claude/components.md` | `.ai/components.md` | Copy as-is |
| `.claude/patterns.md` | `.ai/patterns.md` | Copy as-is |
| `.claude/theming.md` | `.ai/theming.md` | Copy as-is |
| `.claude/migration.md` | `.ai/migration.md` | Copy as-is |

---

## Phase 5 — Post-Sync Report

Summarize what was done:

- Files that were **modified** and what changed in each
- Files that were **already up to date** (no changes needed)
- Any items that need manual attention (e.g., complex prop changes that need human review)
