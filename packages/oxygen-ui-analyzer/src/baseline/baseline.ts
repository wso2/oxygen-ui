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

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {dirname, resolve} from 'path';
import type {Finding} from '../report/types.js';

/**
 * The findings a project had when it adopted the analyzer, or when the baseline was last updated.
 * `check` fails only on findings that are not in it, so existing projects can adopt the rules without
 * fixing everything first, and new code cannot add findings.
 */
export interface Baseline {
  schemaVersion: 1;
  /** The rule set version the baseline was recorded with. */
  rulesetVersion: string;
  findings: BaselineEntry[];
}

/** A baseline finding. The id identifies it; the rule and file make the file readable in reviews. */
export interface BaselineEntry {
  id: string;
  ruleId: string;
  file: string;
}

export function createBaseline(findings: Finding[], rulesetVersion: string): Baseline {
  return {
    schemaVersion: 1,
    rulesetVersion,
    findings: findings
      .map(({id, ruleId, file}) => ({id, ruleId, file}))
      .sort((a, b) => a.file.localeCompare(b.file) || a.ruleId.localeCompare(b.ruleId) || a.id.localeCompare(b.id)),
  };
}

/** Reads a baseline, or returns `null` if the file does not exist. */
export function readBaseline(path: string): Baseline | null {
  if (!existsSync(path)) {
    return null;
  }

  const baseline = JSON.parse(readFileSync(path, 'utf-8')) as Partial<Baseline>;

  if (baseline.schemaVersion !== 1 || !Array.isArray(baseline.findings)) {
    throw new Error(`${path} is not an Oxygen UI analyzer baseline.`);
  }

  return baseline as Baseline;
}

/** Writes a baseline with one finding per line, so that changes are easy to review. */
export function writeBaseline(path: string, baseline: Baseline): void {
  const findings = baseline.findings.map((entry) => `    ${JSON.stringify(entry)}`).join(',\n');
  const content = [
    '{',
    `  "schemaVersion": ${baseline.schemaVersion},`,
    `  "rulesetVersion": ${JSON.stringify(baseline.rulesetVersion)},`,
    `  "findings": [${findings ? `\n${findings}\n  ` : ''}]`,
    '}',
    '',
  ].join('\n');

  mkdirSync(dirname(resolve(path)), {recursive: true});
  writeFileSync(path, content);
}

/**
 * Keeps only the baseline findings that are still found. Used by `baseline --prune`, which records
 * fixes without accepting new findings.
 */
export function pruneBaseline(baseline: Baseline, findings: Finding[]): Baseline {
  const current = new Set(findings.map((finding) => finding.id));

  return {...baseline, findings: baseline.findings.filter((entry) => current.has(entry.id))};
}
