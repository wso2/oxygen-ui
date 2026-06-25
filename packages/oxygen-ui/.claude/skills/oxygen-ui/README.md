# oxygen-ui skill

A skill for the WSO2 Oxygen UI design system (`@wso2/oxygen-ui`) that teaches coding agents to
**set up and build** UIs — installing the right packages and versions, wiring
`OxygenUIThemeProvider`, and scaffolding pages/layouts that match the canonical sample app
(`samples/oxygen-ui-test-app`).

## Install

Install with the [Vercel **skills** CLI](https://github.com/vercel-labs/skills) — it works
with Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI, and 15+ other agents:

```bash
npx skills add wso2/oxygen-ui
```

This installs the skill into your agent's skills directory (e.g. `.claude/skills/oxygen-ui/`
for Claude Code).

Prefer to vendor it by hand? Copy the skill folder from the installed npm package:

```bash
mkdir -p .claude/skills
cp -r node_modules/@wso2/oxygen-ui/.claude/skills/oxygen-ui .claude/skills/
```

The skill bundles its `references/`, so it works on its own. When `@wso2/oxygen-ui` is
installed in the project, it prefers that package's **version-matched** references, so the
docs track your installed version after upgrades.

## Use

Just ask your coding agent for UI work in your project; the skill handles setup and building:

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

On other agents, add the equivalent always-in-context rule to their instructions file
(e.g. `AGENTS.md` for Codex, `.cursor/rules` for Cursor, `.github/copilot-instructions.md`
for Copilot) so UI tasks reliably route to the skill.
