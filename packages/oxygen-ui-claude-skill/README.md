# @wso2/oxygen-ui-claude-skill

Claude Code skill for WSO2 Oxygen UI - Helps developers integrate, migrate to, and use Oxygen UI components.

## What is this?

This is a [Claude Code Skill](https://docs.anthropic.com/en/docs/claude-code/skills) that provides Claude with specialized knowledge about the WSO2 Oxygen UI design system. When installed, Claude can help you:

- Set up and integrate `@wso2/oxygen-ui` in React projects
- Migrate from `@mui/material` or `lucide-react` to Oxygen UI
- Use Oxygen UI components (AppShell, Header, Sidebar, Form, ListingTable, etc.)
- Configure theming (OxygenUIThemeProvider, themes, dark mode)
- Use `@wso2/oxygen-ui-icons-react` icons
- Set up ESLint plugin for import enforcement

## Installation

### Option 1: Manual Installation

1. Download the `.skill` file from npm or the dist folder
2. Copy it to `~/.claude/skills/`
3. Restart Claude Code

```bash
# Download from npm
npm pack @wso2/oxygen-ui-claude-skill
tar -xzf wso2-oxygen-ui-claude-skill-*.tgz
cp package/dist/oxygen-ui-claude-skill.skill ~/.claude/skills/
```

### Option 2: Project-Level Installation

Add the skill files to your project's `.claude/skills/` directory:

```bash
mkdir -p .claude/skills/oxygen-ui-claude-skill
cp -r node_modules/@wso2/oxygen-ui-claude-skill/SKILL.md .claude/skills/oxygen-ui-claude-skill/
cp -r node_modules/@wso2/oxygen-ui-claude-skill/references .claude/skills/oxygen-ui-claude-skill/
```

## Package Contents

- `SKILL.md` - Main skill file with usage patterns and examples
- `references/components.md` - Full component API reference
- `references/theming.md` - Theming system documentation
- `references/migration.md` - Migration guide from MUI/lucide-react
- `dist/oxygen-ui-claude-skill.skill` - Packaged skill file (zip archive)

## Usage

Once installed, Claude will automatically use this skill when you ask about:

- "How do I set up Oxygen UI?"
- "Help me migrate from MUI to Oxygen UI"
- "How do I use the AppShell component?"
- "Create a form with Oxygen UI"
- "Set up a data table with ListingTable"

## Related Packages

- [@wso2/oxygen-ui](https://www.npmjs.com/package/@wso2/oxygen-ui) - Main component library
- [@wso2/oxygen-ui-icons-react](https://www.npmjs.com/package/@wso2/oxygen-ui-icons-react) - Icon library
- [@wso2/eslint-plugin-oxygen-ui](https://www.npmjs.com/package/@wso2/eslint-plugin-oxygen-ui) - ESLint plugin

## License

Apache-2.0
