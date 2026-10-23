#!/usr/bin/env node

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

import {runChecks} from './lib/checks.js';
import {readApi} from './lib/generate.js';

const json = process.argv.includes('--json');
const color = !json && process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, text) => (color ? `\u001b[${code}m${text}\u001b[0m` : text);

const registry = await import('../dist/index.js');
const results = runChecks(registry, readApi());
const failed = results.filter((check) => !check.passed);

if (json) {
  console.log(JSON.stringify({passed: failed.length === 0, rulesetVersion: registry.rulesetVersion, checks: results}, null, 2));
} else {
  console.log(`\n${paint('1', 'Oxygen UI rules coverage')} ${paint('2', `· rules ${registry.rulesetVersion}`)}\n`);

  const width = Math.max(...results.map((check) => check.name.length)) + 2;

  for (const check of results) {
    const mark = check.passed ? paint('32', '✓') : paint('31', '✗');
    console.log(`  ${mark} ${check.name.padEnd(width)}${check.summary}`);

    for (const note of check.notes) {
      console.log(paint('2', `    ${''.padEnd(width)}${note}`));
    }

    for (const problem of check.problems) {
      console.log(`      ${problem.message}`);

      if (problem.hint) {
        console.log(paint('36', `      → ${problem.hint}`));
      }
    }
  }

  const summary = `${failed.length} failed, ${results.length - failed.length} passed`;
  console.log(`\n  ${failed.length > 0 ? paint('31', summary) : paint('32', summary)}\n`);
}

process.exitCode = failed.length > 0 ? 1 : 0;
