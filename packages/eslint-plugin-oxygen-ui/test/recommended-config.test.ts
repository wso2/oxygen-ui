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

import {mkdirSync, mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {Linter} from 'eslint';
import {describe, expect, it} from 'vitest';
import plugin from '../src/index.js';

const map = {
  Button: {path: '@wso2/oxygen-ui/Button', kind: 'default', typeOnly: false},
  DataGrid: {path: '@wso2/oxygen-ui/data-grid', kind: 'namespace', typeOnly: false},
};

const installedApp = (): string => {
  const app = mkdtempSync(path.join(tmpdir(), 'lint-recommended-'));
  const oxygen = path.join(app, 'node_modules/@wso2/oxygen-ui');
  mkdirSync(oxygen, {recursive: true});
  writeFileSync(
    path.join(oxygen, 'package.json'),
    JSON.stringify({name: '@wso2/oxygen-ui', exports: {'./path-map.json': './path-map.json'}}),
  );
  writeFileSync(path.join(oxygen, 'path-map.json'), JSON.stringify(map));
  return path.join(app, 'src/file.tsx');
};

const file = installedApp();

const fixWithRecommended = (source: string): string => {
  const recommended = plugin.configs?.recommended as Linter.Config;
  const linter = new Linter({cwd: path.resolve(path.dirname(file), '..')});
  return linter.verifyAndFix(
    source,
    [{...recommended, files: ['**/*.tsx'], languageOptions: {ecmaVersion: 2022, sourceType: 'module'}}],
    {filename: file},
  ).output;
};

describe('the recommended config', () => {
  it('rewrites a Material UI import to the published package', () => {
    expect(fixWithRecommended(`import Button from '@mui/material/Button';`)).toBe(
      `import Button from '@wso2/oxygen-ui/Button';`,
    );
  });

  it('rewrites a MUI X import, which Oxygen UI has a path for', () => {
    expect(fixWithRecommended(`import * as DataGrid from '@mui/x-data-grid';`)).toBe(
      `import * as DataGrid from '@wso2/oxygen-ui/data-grid';`,
    );
  });

  it('rewrites lucide-react to the published icons package', () => {
    expect(fixWithRecommended(`import { Home } from 'lucide-react';`)).toBe(
      `import { Home } from '@wso2/oxygen-ui-icons-react';`,
    );
  });
});
