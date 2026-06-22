# oxygen-ui skill — installing into a consumer app

This skill teaches coding agents to build UI with the WSO2 Oxygen UI design system
(`@wso2/oxygen-ui`). It is self-contained: `SKILL.md` + bundled `references/`.

## Install

Copy the `oxygen-ui/` directory into your project's skills folder:

```
<your-app>/.claude/skills/oxygen-ui/
├── SKILL.md
└── references/
```

## Make it trigger reliably (important)

A skill description **cannot** reliably make the model consult the skill for generic UI
prompts like "add a settings page" — the model gatekeeps skill use by perceived difficulty
and, from the prompt alone, doesn't know your project uses Oxygen UI. We measured this:
precision was perfect (it never fired on backend/build tasks) but recall on bare UI
prompts stayed ~8% regardless of how the description was worded.

The reliable fix is a **project rule that is always in context**. Add this to your app's
`CLAUDE.md` (and/or `AGENTS.md`):

```md
> [!IMPORTANT]
> All UI in this project must be built with WSO2 Oxygen UI. For ANY React UI work —
> components, pages, layouts, forms, tables, dialogs, theming — consult the `oxygen-ui`
> skill before writing or editing UI code, even when the request does not mention
> Oxygen UI by name.
```

Optionally also scope the skill to your UI files via `paths:` frontmatter in `SKILL.md`
(e.g. `paths: "src/**/*.tsx,src/**/*.jsx"`) so editing UI files surfaces it.
