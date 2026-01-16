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

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { createSpinner } from './utils/logger.js';

export interface TransformOptions {
  projectName: string;
  packageName: string;
  description?: string;
}

// Files to transform (check content for placeholders)
const TRANSFORM_EXTENSIONS = [
  '.json',
  '.html',
  '.md',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
];

// Placeholder pattern: {{PLACEHOLDER_NAME}}
const PLACEHOLDER_REGEX = /\{\{([A-Z_]+)\}\}/g;

export async function transformTemplate(
  targetDir: string,
  options: TransformOptions
): Promise<void> {
  const spinner = createSpinner('Configuring project...');
  spinner.start();

  try {
    const placeholders: Record<string, string> = {
      PROJECT_NAME: options.projectName,
      PACKAGE_NAME: options.packageName,
      DESCRIPTION: options.description || `${options.projectName} - Built with Oxygen UI`,
    };

    await transformDirectory(targetDir, placeholders);

    spinner.stop(true, 'Project configured');
  } catch (error) {
    spinner.stop(false, 'Failed to configure project');
    throw error;
  }
}

async function transformDirectory(
  dir: string,
  placeholders: Record<string, string>
): Promise<void> {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      // Skip node_modules and .git
      if (entry !== 'node_modules' && entry !== '.git') {
        await transformDirectory(fullPath, placeholders);
      }
    } else if (shouldTransform(entry)) {
      await transformFile(fullPath, placeholders);
    }
  }
}

function shouldTransform(filename: string): boolean {
  return TRANSFORM_EXTENSIONS.some((ext) => filename.endsWith(ext));
}

async function transformFile(
  filePath: string,
  placeholders: Record<string, string>
): Promise<void> {
  let content = await readFile(filePath, 'utf-8');

  // Check if file contains any placeholders
  if (!PLACEHOLDER_REGEX.test(content)) {
    return;
  }

  // Reset regex state
  PLACEHOLDER_REGEX.lastIndex = 0;

  content = content.replace(PLACEHOLDER_REGEX, (match, key) => {
    return placeholders[key] ?? match;
  });

  await writeFile(filePath, content);
}
