#!/usr/bin/env node

/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* global process, console */

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { createInterface } from 'readline';
import {
  existsSync,
  mkdirSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
// Path Configuration
// ============================================================================

// Universal AI files (default mode)
const aiSourceDir = join(__dirname, '..', '.ai');
const aiTargetDir = resolve(process.cwd(), '.ai', 'oxygen-ui');
const agentsTargetFile = resolve(process.cwd(), 'AGENTS.md');

// Claude-specific files (--claude mode)
// The skill is self-contained (it bundles its own reference docs), so Claude mode
// installs only the skill plus a routing rule in the root CLAUDE.md — no separate
// .claude/oxygen-ui/ doc copy (that would duplicate the skill's references/).
const skillsSourceDir = join(__dirname, '..', '.claude', 'skills');
const skillsTargetDir = resolve(process.cwd(), '.claude', 'skills');
const rootClaudeMd = resolve(process.cwd(), 'CLAUDE.md');

// ============================================================================
// Markers and References
// ============================================================================

// Routing rule appended to the root CLAUDE.md (Claude mode). Always-in-context so that
// any UI work reliably routes to the self-contained oxygen-ui skill.
const CLAUDE_IMPORT_REFERENCE = `
## Oxygen UI

> [!IMPORTANT]
> This project uses WSO2 Oxygen UI as its design system. For ANY React UI work —
> components, pages, layouts, forms, tables, dialogs, theming — use the \`oxygen-ui\`
> skill (in .claude/skills/oxygen-ui/) and build with Oxygen UI, even when the request
> does not mention Oxygen UI by name.
`;

// Import reference for root AGENTS.md (default mode)
const AGENTS_IMPORT_REFERENCE = `
## Oxygen UI

For Oxygen UI component guidelines and patterns, see [.ai/oxygen-ui/components.md](.ai/oxygen-ui/components.md).
`;

// Markers to detect if import reference already exists
const CLAUDE_IMPORT_MARKER = '.claude/skills/oxygen-ui';
const AGENTS_IMPORT_MARKER = '.ai/oxygen-ui/';

// ============================================================================
// Interactive Prompt
// ============================================================================

/**
 * Prompt the user to select their AI assistant.
 * Returns true for Claude mode, false for universal mode.
 * Falls back to universal mode in non-interactive environments (CI/CD).
 */
function promptSelection() {
  // Non-interactive environment — default to universal mode
  if (!process.stdin.isTTY) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('\n? Which AI assistant are you using?\n');
    console.log('  1. Claude Code (recommended \u2014 includes skills & Claude-specific docs)');
    console.log('  2. Other AI assistant (universal docs for any AI tool)\n');

    rl.question('Select [1-2]: ', (answer) => {
      rl.close();
      const choice = answer.trim();
      if (choice === '1') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * Detect previous setup mode by checking for existing project directories.
 * Returns 'claude' | 'other' | null.
 */
function detectPreviousMode() {
  const claudeExists = existsSync(resolve(process.cwd(), '.claude', 'skills', 'oxygen-ui'));
  const aiExists = existsSync(resolve(process.cwd(), '.ai', 'oxygen-ui'));

  if (claudeExists) return 'claude';
  if (aiExists) return 'other';
  return null;
}

// ============================================================================
// Argument Parsing
// ============================================================================

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args.find(arg => !arg.startsWith('--'));
  const flags = {
    claude: args.includes('--claude'),
    internal: args.includes('--internal'),
  };
  return { command, flags };
}

// ============================================================================
// File Operations
// ============================================================================

/**
 * Copy all files from a source directory to target (non-recursive)
 */
function copyFiles(sourceDir, targetDir, fileExtensions = ['.md']) {
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`  Created directory: ${targetDir}`);
  }

  // Check if source directory exists
  if (!existsSync(sourceDir)) {
    console.error(`  Error: Source directory not found: ${sourceDir}`);
    return 0;
  }

  // Copy files from source to target
  const entries = readdirSync(sourceDir);
  let copiedCount = 0;

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry);
    const targetPath = join(targetDir, entry);
    const stat = statSync(sourcePath);

    // Only copy files with matching extensions
    if (stat.isFile()) {
      const hasMatchingExtension = fileExtensions.some(ext => entry.endsWith(ext));
      if (hasMatchingExtension) {
        try {
          copyFileSync(sourcePath, targetPath);
          console.log(`  Copied: ${entry}`);
          copiedCount++;
        } catch (error) {
          console.error(`  Error copying ${entry}: ${error.message}`);
        }
      }
    }
  }

  return copiedCount;
}

/**
 * Recursively copy a directory (for skills)
 */
function copyDirRecursive(sourceDir, targetDir) {
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Check if source directory exists
  if (!existsSync(sourceDir)) {
    return 0;
  }

  const entries = readdirSync(sourceDir);
  let copiedCount = 0;

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry);
    const targetPath = join(targetDir, entry);
    const stat = statSync(sourcePath);

    if (stat.isDirectory()) {
      copiedCount += copyDirRecursive(sourcePath, targetPath);
    } else if (stat.isFile()) {
      try {
        copyFileSync(sourcePath, targetPath);
        copiedCount++;
      } catch (error) {
        console.error(`  Error copying ${entry}: ${error.message}`);
      }
    }
  }

  return copiedCount;
}

/**
 * Copy AGENTS.md to project root
 */
function copyAgentsMd() {
  const sourceFile = join(aiSourceDir, 'AGENTS.md');

  if (!existsSync(sourceFile)) {
    console.error('  Error: Source AGENTS.md not found');
    return false;
  }

  // Check if AGENTS.md exists
  if (existsSync(agentsTargetFile)) {
    const content = readFileSync(agentsTargetFile, 'utf-8');

    // Check if import reference already exists
    if (content.includes(AGENTS_IMPORT_MARKER)) {
      console.log('  Root AGENTS.md already contains Oxygen UI reference.');
      // Still copy the file content
      writeFileSync(agentsTargetFile, content);
      return false;
    }

    // Append import reference
    writeFileSync(agentsTargetFile, content + AGENTS_IMPORT_REFERENCE);
    console.log('  Updated root AGENTS.md with Oxygen UI reference.');
    return true;
  } else {
    // Copy the AGENTS.md file to project root
    copyFileSync(sourceFile, agentsTargetFile);
    console.log('  Created root AGENTS.md with Oxygen UI guide.');
    return true;
  }
}

/**
 * Update root CLAUDE.md with import reference (Claude mode)
 */
function updateRootClaudeMd() {
  // Check if CLAUDE.md exists
  if (existsSync(rootClaudeMd)) {
    const content = readFileSync(rootClaudeMd, 'utf-8');

    // Check if import reference already exists
    if (content.includes(CLAUDE_IMPORT_MARKER)) {
      console.log('  Root CLAUDE.md already contains Oxygen UI reference.');
      return false;
    }

    // Append import reference
    writeFileSync(rootClaudeMd, content + CLAUDE_IMPORT_REFERENCE);
    console.log('  Updated root CLAUDE.md with Oxygen UI reference.');
    return true;
  } else {
    // Create new CLAUDE.md with import reference
    const newContent = `# Project Guidelines
${CLAUDE_IMPORT_REFERENCE}`;
    writeFileSync(rootClaudeMd, newContent);
    console.log('  Created root CLAUDE.md with Oxygen UI reference.');
    return true;
  }
}

/**
 * Copy AI files to .ai/oxygen-ui/ (default mode)
 */
function copyAiFiles() {
  console.log('\nCopying AI documentation files...\n');

  const copiedCount = copyFiles(aiSourceDir, aiTargetDir, ['.md']);

  if (copiedCount > 0) {
    console.log(`\n  Copied ${copiedCount} file(s) to .ai/oxygen-ui/\n`);
  }

  return copiedCount;
}

/**
 * Copy skills directories (Claude mode)
 */
function copySkillsDir(includeInternal = false) {
  if (!existsSync(skillsSourceDir)) {
    console.log('  No skills directory found in source.');
    return 0;
  }

  console.log('Copying Claude Code skills...\n');

  // Internal-only skills excluded from consumer distribution
  const INTERNAL_SKILLS = ['oxygen-sync'];

  // Get list of skill directories (include internal skills when --internal flag is used)
  const skillDirs = readdirSync(skillsSourceDir).filter(entry => {
    const fullPath = join(skillsSourceDir, entry);
    return statSync(fullPath).isDirectory() && (includeInternal || !INTERNAL_SKILLS.includes(entry));
  });

  let totalCopied = 0;

  for (const skillDir of skillDirs) {
    const sourceSkillDir = join(skillsSourceDir, skillDir);
    const targetSkillDir = join(skillsTargetDir, skillDir);

    const copiedCount = copyDirRecursive(sourceSkillDir, targetSkillDir);
    if (copiedCount > 0) {
      console.log(`  Copied skill: ${skillDir}`);
      totalCopied += copiedCount;
    }
  }

  if (totalCopied > 0) {
    console.log(`\n  Copied ${skillDirs.length} skill(s) to .claude/skills/\n`);
  }

  return totalCopied;
}

// ============================================================================
// Commands
// ============================================================================

/**
 * Initialize Oxygen UI AI documentation - Default mode
 */
function initDefault() {
  console.log('\nOxygen UI - AI Integration Setup (Universal)\n');

  // Copy .ai/ files
  copyAiFiles();

  // Copy/update AGENTS.md
  console.log('Setting up AGENTS.md...\n');
  copyAgentsMd();

  console.log('\nSetup complete!\n');
  console.log('AI assistants will now have access to Oxygen UI documentation.');
  console.log('Files created:');
  console.log('  - AGENTS.md (root file with quick reference)');
  console.log('  - .ai/oxygen-ui/components.md (component reference)');
  console.log('  - .ai/oxygen-ui/patterns.md (common patterns)');
  console.log('  - .ai/oxygen-ui/theming.md (theme customization)');
  console.log('  - .ai/oxygen-ui/migration.md (migration guide)\n');
}

/**
 * Initialize Oxygen UI AI documentation - Claude mode
 */
function initClaude(includeInternal = false) {
  console.log(`\nOxygen UI - AI Integration Setup (Claude Code${includeInternal ? ' + Internal' : ''})\n`);

  // Copy the self-contained skill (it bundles its own reference docs)
  copySkillsDir(includeInternal);

  // Update root CLAUDE.md with the routing rule
  console.log('Updating root CLAUDE.md...\n');
  updateRootClaudeMd();

  console.log('\nSetup complete!\n');
  console.log('Claude Code will now use Oxygen UI for UI work in this project.');
  console.log('Files created:');
  console.log('  - .claude/skills/oxygen-ui/ (self-contained skill + bundled references)');
  console.log('  - CLAUDE.md updated with the Oxygen UI routing rule\n');
  console.log('Available skills:');
  console.log('  - /oxygen-ui         Build any UI with Oxygen UI (components, tables,');
  console.log('                       forms, wizards, layouts, theming) & migrate MUI code');
  if (includeInternal) {
    console.log('  - /oxygen-sync       Sync AI docs with source (internal)');
  }
  console.log('');
}

/**
 * Initialize Oxygen UI AI documentation
 */
async function init(claudeFlag, internalFlag = false) {
  let claudeMode = claudeFlag;

  if (!claudeFlag) {
    console.log('\nOxygen UI - AI Integration Setup');
    claudeMode = await promptSelection();
  }

  if (claudeMode) {
    initClaude(internalFlag);
  } else {
    if (internalFlag) {
      console.log('\n  Note: --internal flag is only supported with Claude Code mode (--claude).\n');
    }
    initDefault();
  }
}

/**
 * Update Oxygen UI AI documentation - Default mode
 */
function updateDefault() {
  console.log('\nOxygen UI - Updating AI Documentation (Universal)\n');

  // Refresh .ai/ files
  copyAiFiles();

  console.log('Update complete!\n');
}

/**
 * Update Oxygen UI AI documentation - Claude mode
 */
function updateClaude(includeInternal = false) {
  console.log(`\nOxygen UI - Updating AI Documentation (Claude Code${includeInternal ? ' + Internal' : ''})\n`);

  // Refresh the self-contained skill (include internal skills when --internal is used)
  copySkillsDir(includeInternal);

  console.log('Update complete!\n');
}

/**
 * Update Oxygen UI AI documentation
 */
async function update(claudeFlag, internalFlag = false) {
  let claudeMode = claudeFlag;

  if (!claudeFlag) {
    const previousMode = detectPreviousMode();

    if (previousMode === 'claude') {
      console.log('\nOxygen UI - Updating AI Documentation');
      console.log('\nDetected previous Claude Code setup. Updating Claude docs...');
      claudeMode = true;
    } else if (previousMode === 'other') {
      console.log('\nOxygen UI - Updating AI Documentation');
      console.log('\nDetected previous universal setup. Updating universal docs...');
      claudeMode = false;
    } else {
      console.log('\nOxygen UI - Updating AI Documentation');
      claudeMode = await promptSelection();
    }
  }

  if (claudeMode) {
    updateClaude(internalFlag);
  } else {
    updateDefault();
  }
}

/**
 * Display help message
 */
function showHelp() {
  console.log(`
Oxygen UI CLI - AI Integration Tools

Usage: npx @wso2/oxygen-ui <command> [options]

Commands:
  init      Set up AI documentation in your project
  update    Refresh AI documentation after package upgrade
  help      Show this help message

Options:
  --claude    Skip prompt and use Claude Code mode directly
  --internal  Include internal/maintainer skills (e.g., /oxygen-sync)

Interactive Behavior:
  init      Prompts to select your AI assistant (Claude Code or Other)
  update    Auto-detects previous setup mode from project files;
            prompts only if no prior setup is found
  --claude  Bypasses the interactive prompt for CI/CD or scripted usage

Modes:
  Universal (Other AI assistant):
    - Creates AGENTS.md at project root
    - Creates .ai/oxygen-ui/ folder with documentation
    - Works with any AI assistant

  Claude Code:
    - Installs the self-contained .claude/skills/oxygen-ui/ skill
      (it bundles its own reference docs)
    - Updates root CLAUDE.md with the Oxygen UI routing rule

Examples:
  npx @wso2/oxygen-ui init            # Interactive — choose your AI assistant
  npx @wso2/oxygen-ui init --claude   # Claude Code setup (skip prompt)
  npx @wso2/oxygen-ui update          # Auto-detects previous mode
  npx @wso2/oxygen-ui update --claude # Force Claude mode update

Internal (WSO2 maintainers):
  npx @wso2/oxygen-ui init --claude --internal   # Include internal skills
  npx @wso2/oxygen-ui update --claude --internal  # Update with internal skills

Available Skills (Claude mode only):
  /oxygen-ui   Build any UI with Oxygen UI — components, tables, cards, dialogs,
               forms, wizards, app shells/headers/sidebars, dashboards, theming —
               and migrate existing @mui/material / lucide-react code
`);
}

// ============================================================================
// Main CLI Entry Point
// ============================================================================

const { command, flags } = parseArgs();

(async () => {
  switch (command) {
    case 'init':
      await init(flags.claude, flags.internal);
      break;
    case 'update':
      await update(flags.claude, flags.internal);
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      if (command) {
        console.error(`Unknown command: ${command}\n`);
      }
      showHelp();
      process.exit(command ? 1 : 0);
  }
})();
