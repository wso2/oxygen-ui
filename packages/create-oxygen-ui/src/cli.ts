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

import { program } from 'commander';
import { createProject } from './create.js';

const VERSION = '0.0.1-alpha.1';

export async function run(): Promise<void> {
  program
    .name('create-oxygen-ui')
    .description('Create a new Oxygen UI project')
    .version(VERSION)
    .argument('[project-name]', 'Name of the project')
    .option('--skip-install', 'Skip dependency installation')
    .option('--skip-git', 'Skip git initialization')
    .option('--claude', 'Include Claude skill files without prompting')
    .option('--no-claude', 'Skip Claude skill files without prompting')
    .option('-y, --yes', 'Use defaults for all prompts (non-interactive)')
    .action(async (projectName: string | undefined, options) => {
      await createProject({
        projectName,
        skipInstall: options.skipInstall,
        skipGit: options.skipGit,
        includeClaude: options.claude,
        useDefaults: options.yes,
      });
    });

  await program.parseAsync();
}
