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

/* global console, process */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, '../../..');
const demoDir = path.join(rootDir, 'samples/oxygen-ui-analyzer-demo');
const outputDir = path.join(__dirname, '../.storybook/public/analyzer-demo');

/**
 * Analyzes the analyzer demo sample and writes the report, the fix plan and the report UI that
 * the Tooling/Analyzer Storybook page shows. Nothing in the demo is changed.
 */
async function generate() {
  let analyzer;

  try {
    analyzer = await import('@wso2/oxygen-ui-analyzer');
  } catch (error) {
    console.error('Could not load @wso2/oxygen-ui-analyzer. Build it first with pnpm build.');
    console.error(error);
    process.exit(1);
  }

  const { analyze, formatFixJson, formatJson, loadConfig, planFixes, renderReportHtml } = analyzer;

  console.log('Generating the analyzer demo...');

  // Analyze the demo the way its scripts do, with its own config.
  const config = await loadConfig(demoDir);
  const options = { root: demoDir, include: config.include, ignore: config.ignore, config };

  const report = await analyze(options);
  const plan = await planFixes({ ...options, suggestions: true });

  await fs.ensureDir(outputDir);
  await fs.writeFile(path.join(outputDir, 'report.json'), formatJson(report));
  await fs.writeFile(path.join(outputDir, 'fix-plan.json'), formatFixJson(plan));
  await fs.writeFile(path.join(outputDir, 'report.html'), renderReportHtml(report));

  console.log(`✓ Analyzer demo generated: ${report.summary.findings} findings, ${plan.files.length} files with fixes.`);
}

generate();
