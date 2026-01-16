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
import { mkdir, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import pc from 'picocolors';
import { promptProjectOptions } from './prompts.js';
import { downloadTemplate, copyClaudeFiles } from './template.js';
import { transformTemplate } from './transform.js';
import { printBanner, printSuccess, createSpinner, logger } from './utils/logger.js';

const execAsync = promisify(exec);

export interface CreateOptions {
  projectName?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
  includeClaude?: boolean;
  useDefaults?: boolean;
}

async function isDirectoryEmpty(dir: string): Promise<boolean> {
  try {
    const files = await readdir(dir);
    return files.length === 0;
  } catch {
    return true; // Directory doesn't exist, consider it empty
  }
}

async function directoryExists(dir: string): Promise<boolean> {
  try {
    await access(dir);
    return true;
  } catch {
    return false;
  }
}

function detectPackageManager(): string {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith('pnpm')) return 'pnpm';
    if (userAgent.startsWith('yarn')) return 'yarn';
    if (userAgent.startsWith('bun')) return 'bun';
  }

  return 'npm';
}

export async function createProject(options: CreateOptions): Promise<void> {
  printBanner();

  // Get project options from user
  const projectOptions = await promptProjectOptions(
    options.projectName,
    options.includeClaude,
    options.useDefaults
  );

  const targetDir = resolve(process.cwd(), projectOptions.projectName);

  // Check if directory exists and is not empty
  if (await directoryExists(targetDir)) {
    const isEmpty = await isDirectoryEmpty(targetDir);
    if (!isEmpty) {
      logger.error(`Directory "${projectOptions.projectName}" already exists and is not empty.`);
      process.exit(1);
    }
  }

  // Create target directory
  await mkdir(targetDir, { recursive: true });

  console.log();
  console.log(pc.dim(`  Creating project in ${pc.cyan(targetDir)}`));
  console.log();

  try {
    // Download and extract template
    await downloadTemplate(targetDir);

    // Transform template placeholders
    await transformTemplate(targetDir, {
      projectName: projectOptions.projectName,
      packageName: projectOptions.packageName,
    });

    // Add Claude files if requested
    if (projectOptions.includeClaude) {
      await copyClaudeFiles(targetDir);

      // Also transform placeholders in Claude files
      await transformTemplate(targetDir, {
        projectName: projectOptions.projectName,
        packageName: projectOptions.packageName,
      });
    }

    // Initialize git repository
    if (!options.skipGit) {
      const gitSpinner = createSpinner('Initializing git repository...');
      gitSpinner.start();
      try {
        await execAsync('git init', { cwd: targetDir });
        gitSpinner.stop(true, 'Git repository initialized');
      } catch {
        gitSpinner.stop(false, 'Failed to initialize git repository');
        // Don't fail the whole process for git init failure
      }
    }

    // Install dependencies
    if (!options.skipInstall) {
      const packageManager = detectPackageManager();
      const installSpinner = createSpinner(`Installing dependencies with ${packageManager}...`);
      installSpinner.start();
      try {
        await execAsync(`${packageManager} install`, { cwd: targetDir });
        installSpinner.stop(true, 'Dependencies installed');
      } catch (error) {
        installSpinner.stop(false, 'Failed to install dependencies');
        console.log(pc.yellow(`  You can install dependencies manually by running:`));
        console.log(pc.cyan(`    cd ${projectOptions.projectName} && ${packageManager} install`));
      }
    }

    printSuccess(projectOptions.projectName, detectPackageManager());
  } catch (error) {
    logger.error('Failed to create project');
    console.error(error);
    process.exit(1);
  }
}
