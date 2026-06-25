# oxygen-ui skill

A self-contained Claude Code skill that teaches coding agents to **set up and build** UIs
with the WSO2 Oxygen UI design system (`@wso2/oxygen-ui`) — installing the right packages
and versions, wiring `OxygenUIThemeProvider`, and scaffolding pages/layouts that match the
canonical sample app (`samples/oxygen-ui-test-app`).

The skill is thin and **version-independent**: it's just `SKILL.md`. The detailed
`references/` (app-structure, components, patterns, theming, migration) travel with the
`@wso2/oxygen-ui` npm package and are read **in place** at the version your project has
installed, so they never drift out of sync with your package. No CLI, no build step.

## Install

Copy only `SKILL.md` into your project's `.claude/skills/oxygen-ui/`:

```bash
mkdir -p .claude/skills/oxygen-ui
# from the installed npm package:
cp node_modules/@wso2/oxygen-ui/.claude/skills/oxygen-ui/SKILL.md .claude/skills/oxygen-ui/
# or from a checkout of this repo:
cp packages/oxygen-ui/.claude/skills/oxygen-ui/SKILL.md .claude/skills/oxygen-ui/
```

That's it. The references are read from the installed `@wso2/oxygen-ui` package, so they
always match your version — **re-copying the skill after a package upgrade is unnecessary**.
(Before you've installed the package, `SKILL.md`'s Setup and Quick start sections are
self-sufficient; the references become available once it's installed.)

## Use

Just ask Claude Code for UI work in your project; the skill handles setup and building:

- "set up Oxygen UI in this app" / "scaffold a new Oxygen UI app"
- "add a users page with a searchable table and edit/delete actions per row"
- "build an admin dashboard layout with a sidebar and KPI cards"
- "build a multi-step signup wizard with validation"
- "convert this `@mui/material` + `lucide-react` screen to Oxygen UI"

You can also invoke it explicitly with `/oxygen-ui`. The skill installs the correct
packages/versions, imports from `@wso2/oxygen-ui`, sets up `OxygenUIThemeProvider`, and
builds pages/layouts in the canonical structure (`AppShell` shell, `PageContent` +
`PageTitle` pages, `react-router` routing) so the app matches the design system.

## Make it trigger reliably (important)

A skill description **cannot** reliably make the model consult the skill for generic UI
prompts like "add a settings page" — the model gatekeeps skill use by perceived difficulty
and, from the prompt alone, doesn't know your project uses Oxygen UI. We measured this:
precision was perfect (it never fired on backend/build tasks) but recall on bare UI prompts
stayed ~8% regardless of how the description was worded.

The reliable fix is a **project rule that is always in context**. Add this to your app's
root `CLAUDE.md`:

```md
> [!IMPORTANT]
> All UI in this project must be built with WSO2 Oxygen UI. For ANY React UI work —
> setup, components, pages, layouts, forms, tables, dialogs, theming — consult the
> `oxygen-ui` skill before writing or editing UI code, even when the request does not
> mention Oxygen UI by name.
```

In a monorepo where the app is in a subdirectory (e.g. `apps/web/`), put the skill in
`apps/web/.claude/skills/` and the rule in `apps/web/CLAUDE.md` (or scope a pointer in the
root `CLAUDE.md` if you launch Claude at the repo root).
