/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../..');
const sampleDir = path.join(rootDir, 'samples/oxygen-ui-test-app');
const sampleDistDir = path.join(sampleDir, 'dist');
const storybookPublicSampleDir = path.join(__dirname, '../.storybook/public/sample');

const isWatchMode = process.argv.includes('--watch');

async function buildSampleApp() {
  console.log('Building sample app...');
  try {
    execSync('BUILD_FOR_STORYBOOK=true pnpm build', {
      cwd: sampleDir,
      stdio: 'inherit'
    });
    console.log('✓ Sample app built successfully!');
  } catch (error) {
    console.error('Error building sample app:', error);
    process.exit(1);
  }
}

async function copySample() {
  try {
    console.log('Copying sample app to Storybook public folder...');
    await fs.copy(sampleDistDir, storybookPublicSampleDir);
    console.log('✓ Sample app copied successfully!');
  } catch (error) {
    console.error('Error copying sample app:', error);
    if (!isWatchMode) {
      process.exit(1);
    }
  }
}

async function copySampleToStorybook() {
  try {
    console.log('Checking sample app dist...');

    if (!fs.existsSync(sampleDistDir)) {
      await buildSampleApp();
    }

    await copySample();

    if (isWatchMode) {
      console.log('Watching sample app dist for changes...');
      fs.watch(sampleDistDir, { recursive: true }, async (eventType, filename) => {
        if (filename) {
          console.log(`Detected change in sample app: ${filename}`);
          await copySample();
        }
      });
    }
  } catch (error) {
    console.error('Error in copy sample process:', error);
    if (!isWatchMode) {
      process.exit(1);
    }
  }
}

copySampleToStorybook();
