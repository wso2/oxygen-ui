#!/usr/bin/env node

/**
 * Build script for packaging the Oxygen UI Claude Skill
 *
 * This script creates a .skill file (zip archive) containing:
 * - SKILL.md (main skill file with frontmatter)
 * - references/ directory (component, theming, migration docs)
 *
 * The .skill file can be:
 * 1. Installed directly by users into ~/.claude/skills/
 * 2. Distributed via npm and extracted by consumers
 */

import { createWriteStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist');
const SKILL_NAME = 'oxygen-ui-claude-skill';

/**
 * Create a simple zip-like archive (.skill file)
 * .skill files are zip archives with a different extension
 */
async function createSkillPackage() {
  // Ensure dist directory exists
  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }

  const outputPath = join(DIST_DIR, `${SKILL_NAME}.skill`);

  // We'll use the archiver approach - dynamically import it or use a simple tar
  // Since we want minimal dependencies, let's use Node's built-in zlib with a simple approach

  // For .skill files (which are zip), we need a zip library
  // Let's check if we can use a simpler approach - just copy files and let users extract

  // Actually, .skill files ARE zip files. Let's use the built-in approach with child_process
  const { execSync } = await import('child_process');

  // Files to include
  const filesToInclude = [
    'SKILL.md',
    'references/components.md',
    'references/theming.md',
    'references/migration.md'
  ];

  // Verify all files exist
  for (const file of filesToInclude) {
    const fullPath = join(ROOT_DIR, file);
    if (!existsSync(fullPath)) {
      console.error(`❌ Missing file: ${file}`);
      process.exit(1);
    }
  }

  // Create zip using system zip command (available on macOS/Linux)
  // The zip should contain files with the skill name as the root directory
  const tempDir = join(DIST_DIR, SKILL_NAME);

  // Clean and create temp directory
  if (existsSync(tempDir)) {
    execSync(`rm -rf "${tempDir}"`);
  }
  mkdirSync(tempDir, { recursive: true });
  mkdirSync(join(tempDir, 'references'), { recursive: true });

  // Copy files to temp directory
  execSync(`cp "${join(ROOT_DIR, 'SKILL.md')}" "${tempDir}/"`);
  execSync(`cp "${join(ROOT_DIR, 'references/components.md')}" "${tempDir}/references/"`);
  execSync(`cp "${join(ROOT_DIR, 'references/theming.md')}" "${tempDir}/references/"`);
  execSync(`cp "${join(ROOT_DIR, 'references/migration.md')}" "${tempDir}/references/"`);

  // Remove existing .skill file if present
  if (existsSync(outputPath)) {
    execSync(`rm "${outputPath}"`);
  }

  // Create zip file with .skill extension
  // Using -r for recursive, -j would flatten (we don't want that)
  execSync(`cd "${DIST_DIR}" && zip -r "${SKILL_NAME}.skill" "${SKILL_NAME}"`);

  // Clean up temp directory
  execSync(`rm -rf "${tempDir}"`);

  // Verify output
  if (existsSync(outputPath)) {
    const stats = statSync(outputPath);
    console.log(`✅ Successfully built: ${outputPath}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);

    // List contents
    console.log(`\n📦 Package contents:`);
    const contents = execSync(`unzip -l "${outputPath}"`).toString();
    console.log(contents);
  } else {
    console.error('❌ Failed to create skill package');
    process.exit(1);
  }
}

// Run the build
console.log(`🔨 Building ${SKILL_NAME}...\n`);
createSkillPackage().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
