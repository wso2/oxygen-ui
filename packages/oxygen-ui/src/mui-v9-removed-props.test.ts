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

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '../../..');

const SCAN_ROOTS = [
  join(repoRoot, 'packages/oxygen-ui/src'),
  join(repoRoot, 'packages/oxygen-ui-docs/stories'),
  join(repoRoot, 'samples/oxygen-ui-test-app/src'),
];

const SYSTEM_PROP_COMPONENTS = 'Box|Stack|Typography|Link|Grid|DialogContentText';

const REMOVED_SYSTEM_PROPS = [
  'alignItems',
  'justifyContent',
  'alignContent',
  'flexWrap',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'fontSize',
  'fontStyle',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'display',
  'gap',
  'rowGap',
  'columnGap',
  'mt',
  'mb',
  'ml',
  'mr',
  'mx',
  'my',
  'pt',
  'pb',
  'pl',
  'pr',
  'px',
  'py',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'width',
  'height',
  'bgcolor',
];

function collectSourceFiles(root: string): string[] {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) {
        walk(path);
        continue;
      }
      if (/\.(tsx|ts|jsx|js)$/.test(entry) && !entry.includes('.test.')) {
        files.push(path);
      }
    }
  };
  walk(root);
  return files;
}

function findRemovedPropUses(source: string, file: string): string[] {
  const findings: string[] = [];
  const tagRe = new RegExp(`<(?:Form\\.)?(?:${SYSTEM_PROP_COMPONENTS})\\b`, 'g');
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(source)) !== null) {
    const rest = source.slice(match.index);
    const endRel = rest.search(/\/?>/);
    if (endRel === -1) {
      continue;
    }
    const openTag = rest.slice(0, endRel);
    const line = source.slice(0, match.index).split('\n').length;
    const loc = `${relative(repoRoot, file)}:${line}`;

    if (/\bTypography\b/.test(match[0]) && /\bparagraph(?:\s|=|\/|$)/.test(openTag)) {
      findings.push(`${loc} paragraph`);
    }

    if (/\bTypography\b/.test(match[0]) && /color=["'][^"']*\./.test(openTag)) {
      findings.push(`${loc} color`);
    }

    const nativeBoxSize =
      /\bBox\b/.test(match[0]) && /component=["'](?:img|svg)["']/.test(openTag);

    for (const prop of REMOVED_SYSTEM_PROPS) {
      if (nativeBoxSize && (prop === 'width' || prop === 'height')) {
        continue;
      }
      if (new RegExp(`\\b${prop}=`).test(openTag)) {
        findings.push(`${loc} ${prop}`);
      }
    }
  }
  return findings;
}

const REMOVED_ALERT_CLASSES = [
  'MuiAlert-filledSuccess',
  'MuiAlert-filledInfo',
  'MuiAlert-filledWarning',
  'MuiAlert-filledError',
  'MuiAlert-outlinedSuccess',
  'MuiAlert-outlinedInfo',
  'MuiAlert-outlinedWarning',
  'MuiAlert-outlinedError',
  'MuiAlert-standardSuccess',
  'MuiAlert-standardInfo',
  'MuiAlert-standardWarning',
  'MuiAlert-standardError',
];

const REMOVED_SPEED_DIAL_ACTION_PROPS = ['tooltipTitle', 'tooltipOpen'];

function findRemovedSpeedDialActionProps(source: string, file: string): string[] {
  const findings: string[] = [];
  const tagRe = /<SpeedDialAction\b/g;
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(source)) !== null) {
    const rest = source.slice(match.index);
    const endRel = rest.search(/\/?>/);
    if (endRel === -1) {
      continue;
    }
    const openTag = rest.slice(0, endRel);
    const line = source.slice(0, match.index).split('\n').length;
    const loc = `${relative(repoRoot, file)}:${line}`;
    for (const prop of REMOVED_SPEED_DIAL_ACTION_PROPS) {
      if (new RegExp(`\\b${prop}(?:\\s*=|\\s|/|>|$)`).test(openTag)) {
        findings.push(`${loc} ${prop}`);
      }
    }
  }
  return findings;
}

function findRemovedAlertClasses(source: string, file: string): string[] {
  const findings: string[] = [];
  for (const className of REMOVED_ALERT_CLASSES) {
    if (!source.includes(className)) {
      continue;
    }
    source.split('\n').forEach((line, index) => {
      if (line.includes(className)) {
        findings.push(`${relative(repoRoot, file)}:${index + 1} ${className}`);
      }
    });
  }
  return findings;
}

describe('Material 9-removed props', () => {
  it('are not used on Box, Stack, Typography, Link, Grid, or DialogContentText', () => {
    const findings = SCAN_ROOTS.flatMap((root) =>
      collectSourceFiles(root).flatMap((file) => findRemovedPropUses(readFileSync(file, 'utf8'), file)),
    );

    expect(findings).toEqual([]);
  });

  it('are not used as removed Alert compound class names', () => {
    const findings = SCAN_ROOTS.flatMap((root) =>
      collectSourceFiles(root).flatMap((file) =>
        findRemovedAlertClasses(readFileSync(file, 'utf8'), file),
      ),
    );

    expect(findings).toEqual([]);
  });

  it('are not used as removed SpeedDialAction props', () => {
    const findings = SCAN_ROOTS.flatMap((root) =>
      collectSourceFiles(root).flatMap((file) =>
        findRemovedSpeedDialActionProps(readFileSync(file, 'utf8'), file),
      ),
    );

    expect(findings).toEqual([]);
  });
});
