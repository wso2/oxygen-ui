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

import { input, confirm } from '@inquirer/prompts';
import pc from 'picocolors';

export interface ProjectOptions {
  projectName: string;
  packageName: string;
  includeClaude: boolean;
}

function validateProjectName(name: string): { valid: boolean; message?: string } {
  if (!name) {
    return { valid: false, message: 'Project name is required' };
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return {
      valid: false,
      message: 'Project name can only contain letters, numbers, hyphens, and underscores',
    };
  }

  if (name.startsWith('-') || name.startsWith('_')) {
    return { valid: false, message: 'Project name cannot start with a hyphen or underscore' };
  }

  return { valid: true };
}

export async function promptProjectOptions(
  initialName?: string,
  claudeOption?: boolean,
  useDefaults?: boolean
): Promise<ProjectOptions> {
  // Project name
  let projectName = initialName || 'my-oxygen-ui-app';

  if (!initialName && !useDefaults) {
    projectName = await input({
      message: 'Project name:',
      default: 'my-oxygen-ui-app',
      validate: (value) => {
        const result = validateProjectName(value);
        return result.valid || result.message || 'Invalid project name';
      },
    });
  } else if (initialName) {
    const validation = validateProjectName(projectName);
    if (!validation.valid && !useDefaults) {
      console.log(pc.yellow(`Warning: ${validation.message}`));
      projectName = await input({
        message: 'Project name:',
        default: 'my-oxygen-ui-app',
        validate: (value) => {
          const result = validateProjectName(value);
          return result.valid || result.message || 'Invalid project name';
        },
      });
    }
  }

  // Package name (derived from project name)
  const defaultPackageName = projectName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  let packageName = defaultPackageName;
  if (!useDefaults) {
    packageName = await input({
      message: 'Package name:',
      default: defaultPackageName,
    });
  }

  // Claude skill files
  let includeClaude = claudeOption ?? true;

  if (claudeOption === undefined && !useDefaults) {
    includeClaude = await confirm({
      message: `Include Claude AI skill files? ${pc.dim('(CLAUDE.md + skill file for Claude Code)')}`,
      default: true,
    });
  }

  return {
    projectName,
    packageName,
    includeClaude,
  };
}
