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

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
import { mkdir, rm, rename, readdir, cp } from 'node:fs/promises';
import { join } from 'node:path';
import * as tar from 'tar';
import { createSpinner } from './utils/logger.js';

const execAsync = promisify(exec);

const TEMPLATE_PACKAGE = '@wso2/oxygen-ui-template';

// For local development: set LOCAL_TEMPLATE_PATH env var to the template package directory
const LOCAL_TEMPLATE_PATH = process.env.LOCAL_TEMPLATE_PATH;

async function copyDirectory(src: string, dest: string): Promise<void> {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await cp(srcPath, destPath);
    }
  }
}

export async function downloadTemplate(targetDir: string): Promise<void> {
  const spinner = createSpinner('Downloading template...');
  spinner.start();

  try {
    // Use local template path for development
    if (LOCAL_TEMPLATE_PATH) {
      const templateDir = join(LOCAL_TEMPLATE_PATH, 'template');
      await copyDirectory(templateDir, targetDir);
      spinner.stop(true, 'Template copied from local path');
      return;
    }

    // Get the tarball URL from npm
    const { stdout } = await execAsync(`npm view ${TEMPLATE_PACKAGE} dist.tarball`);
    const tarballUrl = stdout.trim();

    // Create temp directory
    const tempDir = join(targetDir, '.temp-template');
    await mkdir(tempDir, { recursive: true });

    // Download tarball
    const tarballPath = join(tempDir, 'template.tgz');

    const response = await fetch(tarballUrl);
    if (!response.ok) {
      throw new Error(`Failed to download template: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    await writeFile(tarballPath, Buffer.from(arrayBuffer));

    // Extract tarball
    await tar.extract({
      file: tarballPath,
      cwd: tempDir,
    });

    // Move template contents to target
    const packageDir = join(tempDir, 'package', 'template');
    const files = await readdir(packageDir);

    for (const file of files) {
      await rename(join(packageDir, file), join(targetDir, file));
    }

    // Cleanup
    await rm(tempDir, { recursive: true, force: true });

    spinner.stop(true, 'Template downloaded and extracted');
  } catch (error) {
    spinner.stop(false, 'Failed to download template');
    throw error;
  }
}

export async function copyClaudeFiles(targetDir: string): Promise<void> {
  const spinner = createSpinner('Adding Claude skill files...');
  spinner.start();

  try {
    // Use local template path for development
    if (LOCAL_TEMPLATE_PATH) {
      const claudeSourceDir = join(LOCAL_TEMPLATE_PATH, 'claude');

      // Copy CLAUDE.md to project root
      await cp(join(claudeSourceDir, 'CLAUDE.md'), join(targetDir, 'CLAUDE.md'));

      // Create .claude/skills directory and copy skill file
      const skillsDir = join(targetDir, '.claude', 'skills');
      await mkdir(skillsDir, { recursive: true });
      await cp(join(claudeSourceDir, 'oxygen-ui.md'), join(skillsDir, 'oxygen-ui.md'));

      spinner.stop(true, 'Claude skill files added');
      return;
    }

    // Get Claude files from template package
    const { stdout } = await execAsync(`npm view ${TEMPLATE_PACKAGE} dist.tarball`);
    const tarballUrl = stdout.trim();

    const tempDir = join(targetDir, '.temp-claude');
    await mkdir(tempDir, { recursive: true });

    const tarballPath = join(tempDir, 'template.tgz');
    const response = await fetch(tarballUrl);
    if (!response.ok) {
      throw new Error(`Failed to download template: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    await writeFile(tarballPath, Buffer.from(arrayBuffer));

    // Extract tarball
    await tar.extract({
      file: tarballPath,
      cwd: tempDir,
    });

    const claudeSourceDir = join(tempDir, 'package', 'claude');

    // Copy CLAUDE.md to project root
    await cp(join(claudeSourceDir, 'CLAUDE.md'), join(targetDir, 'CLAUDE.md'));

    // Create .claude/skills directory and copy skill file
    const skillsDir = join(targetDir, '.claude', 'skills');
    await mkdir(skillsDir, { recursive: true });
    await cp(join(claudeSourceDir, 'oxygen-ui.md'), join(skillsDir, 'oxygen-ui.md'));

    await rm(tempDir, { recursive: true, force: true });

    spinner.stop(true, 'Claude skill files added');
  } catch (error) {
    spinner.stop(false, 'Failed to add Claude files');
    throw error;
  }
}
