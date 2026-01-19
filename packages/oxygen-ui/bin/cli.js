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

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
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
const claudeSourceDir = join(__dirname, '..', '.claude');
const claudeTargetDir = resolve(process.cwd(), '.claude', 'oxygen-ui');
const skillsSourceDir = join(__dirname, '..', '.claude', 'skills');
const skillsTargetDir = resolve(process.cwd(), '.claude', 'skills');
const rootClaudeMd = resolve(process.cwd(), 'CLAUDE.md');

// ============================================================================
// Markers and References
// ============================================================================

// Import reference for root CLAUDE.md (Claude mode)
const CLAUDE_IMPORT_REFERENCE = `
## Oxygen UI

For Oxygen UI component guidelines and patterns, see [.claude/oxygen-ui/CLAUDE.md](.claude/oxygen-ui/CLAUDE.md).
`;

// Import reference for root AGENTS.md (default mode)
const AGENTS_IMPORT_REFERENCE = `
## Oxygen UI

For Oxygen UI component guidelines and patterns, see [.ai/oxygen-ui/components.md](.ai/oxygen-ui/components.md).
`;

// Markers to detect if import reference already exists
const CLAUDE_IMPORT_MARKER = '.claude/oxygen-ui/CLAUDE.md';
const AGENTS_IMPORT_MARKER = '.ai/oxygen-ui/';

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
      const sourceContent = readFileSync(sourceFile, 'utf-8');
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
 * Copy Claude files to .claude/oxygen-ui/ (Claude mode)
 */
function copyClaudeFiles() {
  console.log('\nCopying Claude documentation files...\n');

  const copiedCount = copyFiles(claudeSourceDir, claudeTargetDir, ['.md']);

  if (copiedCount > 0) {
    console.log(`\n  Copied ${copiedCount} file(s) to .claude/oxygen-ui/\n`);
  }

  return copiedCount;
}

/**
 * Copy skills directories (Claude mode)
 */
function copySkillsDir() {
  if (!existsSync(skillsSourceDir)) {
    console.log('  No skills directory found in source.');
    return 0;
  }

  console.log('Copying Claude Code skills...\n');

  // Get list of skill directories
  const skillDirs = readdirSync(skillsSourceDir).filter(entry => {
    const fullPath = join(skillsSourceDir, entry);
    return statSync(fullPath).isDirectory();
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
  console.log('For Claude Code with skills: npx @wso2/oxygen-ui init --claude\n');
}

/**
 * Initialize Oxygen UI AI documentation - Claude mode
 */
function initClaude() {
  console.log('\nOxygen UI - AI Integration Setup (Claude Code)\n');

  // Copy .claude/ files
  copyClaudeFiles();

  // Copy skills
  copySkillsDir();

  // Update root CLAUDE.md
  console.log('Updating root CLAUDE.md...\n');
  updateRootClaudeMd();

  console.log('\nSetup complete!\n');
  console.log('Claude Code will now have access to Oxygen UI documentation and skills.');
  console.log('Files created:');
  console.log('  - .claude/oxygen-ui/CLAUDE.md (core instructions)');
  console.log('  - .claude/oxygen-ui/components.md (component reference)');
  console.log('  - .claude/oxygen-ui/patterns.md (common patterns)');
  console.log('  - .claude/oxygen-ui/theming.md (theme customization)');
  console.log('  - .claude/oxygen-ui/migration.md (migration guide)');
  console.log('  - .claude/skills/ (invokable skills)\n');
  console.log('Available skills:');
  console.log('  - /oxygen-component  Generate Oxygen UI components');
  console.log('  - /oxygen-layout     Generate app layouts');
  console.log('  - /oxygen-form       Generate forms with validation');
  console.log('  - /oxygen-migrate    Migrate MUI code to Oxygen UI\n');
}

/**
 * Initialize Oxygen UI AI documentation
 */
function init(claudeMode) {
  if (claudeMode) {
    initClaude();
  } else {
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
function updateClaude() {
  console.log('\nOxygen UI - Updating AI Documentation (Claude Code)\n');

  // Refresh .claude/ files
  copyClaudeFiles();

  // Refresh skills
  copySkillsDir();

  console.log('Update complete!\n');
}

/**
 * Update Oxygen UI AI documentation
 */
function update(claudeMode) {
  if (claudeMode) {
    updateClaude();
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
  --claude  Use Claude Code mode (includes skills and Claude-specific docs)

Modes:
  Default (no flag):
    - Creates AGENTS.md at project root
    - Creates .ai/oxygen-ui/ folder with documentation
    - Works with any AI assistant

  Claude (--claude flag):
    - Creates .claude/oxygen-ui/ folder with documentation
    - Creates .claude/skills/ with invokable skills
    - Updates root CLAUDE.md with reference

Examples:
  npx @wso2/oxygen-ui init           # Universal setup
  npx @wso2/oxygen-ui init --claude  # Claude Code setup with skills
  npx @wso2/oxygen-ui update         # Refresh universal docs
  npx @wso2/oxygen-ui update --claude # Refresh Claude docs and skills

Available Skills (Claude mode only):
  /oxygen-component  Generate Oxygen UI React components
  /oxygen-layout     Generate app layouts with AppShell
  /oxygen-form       Generate forms with validation
  /oxygen-migrate    Migrate existing MUI code
`);
}

// ============================================================================
// Main CLI Entry Point
// ============================================================================

const { command, flags } = parseArgs();

switch (command) {
  case 'init':
    init(flags.claude);
    break;
  case 'update':
    update(flags.claude);
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
