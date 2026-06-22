# oxygen-ui skill

A Claude Code skill that teaches coding agents to build UI with the WSO2 Oxygen UI design
system (`@wso2/oxygen-ui`). It is self-contained: `SKILL.md` + bundled `references/`
(components, patterns, theming, migration).

## Install

In a project that has `@wso2/oxygen-ui` installed, run the package's setup CLI from the
project root:

```bash
npx @wso2/oxygen-ui init --claude
```

This copies the skill into `.claude/skills/oxygen-ui/`, copies the Claude docs into
`.claude/oxygen-ui/`, and adds an Oxygen UI reference to your root `CLAUDE.md`. (The
interactive `npx @wso2/oxygen-ui init` asks whether you use Claude Code or another AI
assistant; `--claude` skips the prompt.)

After upgrading the package, refresh the skill and docs:

```bash
npx @wso2/oxygen-ui update --claude
```

Maintainers can include the internal `oxygen-sync` skill with `--internal`.

> Prefer to vendor it by hand? Copy this `oxygen-ui/` directory into your project's
> `.claude/skills/` — the `references/` are bundled, so it works standalone.

## Use

Once installed, just ask Claude Code for UI work in the project and it follows the skill —
for example:

- "add a users page with a searchable table and edit/delete actions per row"
- "scaffold an admin dashboard with a top bar, collapsible side nav, and KPI cards"
- "build a multi-step signup wizard with validation"
- "convert this `@mui/material` + `lucide-react` screen to Oxygen UI"

You can also invoke it explicitly with `/oxygen-ui`. The skill makes Claude import from
`@wso2/oxygen-ui`, wrap the app in `OxygenUIThemeProvider`, and reuse Oxygen's composite
components (`AppShell`, `ListingTable`, `Form.*`, `Header`, `Sidebar`, `UserMenu`, …)
instead of rebuilding them from primitives — so your UI stays consistent with the design
system.

## Make it trigger reliably (important)

A skill description **cannot** reliably make the model consult the skill for generic UI
prompts like "add a settings page" — the model gatekeeps skill use by perceived difficulty
and, from the prompt alone, doesn't know your project uses Oxygen UI. We measured this:
precision was perfect (it never fired on backend/build tasks) but recall on bare UI prompts
stayed ~8% regardless of how the description was worded.

The reliable fix is a **project rule that is always in context**. `npx @wso2/oxygen-ui init
--claude` already adds an Oxygen UI reference to your root `CLAUDE.md`; make it explicit by
adding:

```md
> [!IMPORTANT]
> All UI in this project must be built with WSO2 Oxygen UI. For ANY React UI work —
> components, pages, layouts, forms, tables, dialogs, theming — consult the `oxygen-ui`
> skill before writing or editing UI code, even when the request does not mention
> Oxygen UI by name.
```

Optionally also scope the skill to your UI files via `paths:` frontmatter in `SKILL.md`
(e.g. `paths: "src/**/*.tsx,src/**/*.jsx"`) so editing UI files surfaces it.
