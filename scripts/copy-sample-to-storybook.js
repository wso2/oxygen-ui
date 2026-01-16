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

const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sampleDistDir = path.join(rootDir, 'samples/oxygen-ui-test-app/dist');
const storybookPublicSampleDir = path.join(rootDir, 'packages/oxygen-ui-docs/.storybook/public/sample');

async function copySampleToStorybook() {
  try {
    console.log('Copying sample app to Storybook public folder...');

    if (!fs.existsSync(sampleDistDir)) {
      console.error(`Error: Sample app dist not found at ${sampleDistDir}`);
      console.error('Please build the sample app first: cd samples/oxygen-ui-test-app && pnpm build');
      process.exit(1);
    }

    await fs.copy(sampleDistDir, storybookPublicSampleDir);
    console.log('✓ Sample app copied successfully!');
  } catch (error) {
    console.error('Error copying sample app:', error);
    process.exit(1);
  }
}

copySampleToStorybook();
