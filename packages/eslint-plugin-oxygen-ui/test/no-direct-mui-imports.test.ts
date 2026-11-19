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

import {mkdirSync, mkdtempSync, utimesSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {Linter, RuleTester} from 'eslint';
import {describe, expect, it} from 'vitest';
import rule from '../src/rules/no-direct-mui-imports.js';

RuleTester.describe = describe;
RuleTester.it = it;

const map = {
  Box: {path: '@wso2/oxygen-ui/Box', kind: 'default', typeOnly: false},
  Button: {path: '@wso2/oxygen-ui/Button', kind: 'default', typeOnly: false},
  buttonClasses: {path: '@wso2/oxygen-ui/Button', kind: 'named', typeOnly: false},
  styled: {path: '@wso2/oxygen-ui/styles', kind: 'named', typeOnly: false},
  ButtonProps: {path: '@wso2/oxygen-ui/Button', kind: 'named', typeOnly: true},
  DataGrid: {path: '@wso2/oxygen-ui/data-grid', kind: 'namespace', typeOnly: false},
  DatePickers: {path: '@wso2/oxygen-ui/date-pickers', kind: 'namespace', typeOnly: false},
  TreeView: {path: '@wso2/oxygen-ui/tree-view', kind: 'namespace', typeOnly: false},
  AdapterDateFns: {path: '@wso2/oxygen-ui/date-pickers/AdapterDateFns', kind: 'named', typeOnly: false},
};

const installApp = (withMap: boolean, tsconfig?: object): string => {
  const app = mkdtempSync(path.join(tmpdir(), 'lint-app-'));
  if (tsconfig) writeFileSync(path.join(app, 'tsconfig.json'), JSON.stringify(tsconfig));
  const oxygen = path.join(app, 'node_modules/@wso2/oxygen-ui');
  mkdirSync(oxygen, {recursive: true});
  writeFileSync(
    path.join(oxygen, 'package.json'),
    JSON.stringify({name: '@wso2/oxygen-ui', exports: withMap ? {'./path-map.json': './path-map.json'} : {}}),
  );
  if (withMap) writeFileSync(path.join(oxygen, 'path-map.json'), JSON.stringify(map));
  return path.join(app, 'src/file.tsx');
};

const filename = installApp(true);
const filenameWithoutMap = installApp(false);
const legacyResolution = installApp(true, {compilerOptions: {moduleResolution: 'node'}});
const legacyByModule = installApp(true, {compilerOptions: {module: 'commonjs'}});
const bundlerResolution = installApp(true, {compilerOptions: {moduleResolution: 'Bundler'}});

const lint = (source: string, file: string) =>
  new Linter({cwd: path.resolve(path.dirname(file), '..')}).verify(
    source,
    [{files: ['**/*.tsx'], plugins: {oxygen: {rules: {r: rule}}}, rules: {'oxygen/r': 'error'}, languageOptions: {ecmaVersion: 2022, sourceType: 'module'}}],
    {filename: file},
  );

describe('the fix of the Material UI root', () => {
  it('keeps type-only names type-only', () => {
    const [message] = lint(`import { Button, ButtonProps } from '@mui/material';`, filename);
    expect(message.fix?.text).toBe(
      `import Button from '@wso2/oxygen-ui/Button';\nimport type {ButtonProps} from '@wso2/oxygen-ui/Button';`,
    );
  });
});

describe('the path map of the installed package', () => {
  it('is read again after the installed package changes', () => {
    const file = installApp(false);
    const source = `import { Box } from '@mui/material';`;
    const fixed = () => lint(source, file)[0].fix?.text ?? source;
    expect(fixed()).toBe(source);

    const oxygen = path.join(path.dirname(file), '../node_modules/@wso2/oxygen-ui');
    writeFileSync(path.join(oxygen, 'package.json'), JSON.stringify({name: '@wso2/oxygen-ui', exports: {'./path-map.json': './path-map.json'}}));
    writeFileSync(path.join(oxygen, 'path-map.json'), JSON.stringify(map));
    expect(fixed()).toBe(`import Box from '@wso2/oxygen-ui/Box';`);

    writeFileSync(path.join(oxygen, 'path-map.json'), JSON.stringify({Box: {path: '@wso2/oxygen-ui/Container', kind: 'default', typeOnly: false}}));
    utimesSync(path.join(oxygen, 'path-map.json'), new Date(), new Date(Date.now() + 5000));
    expect(fixed()).toBe(`import Box from '@wso2/oxygen-ui/Container';`);
  });
});

const tester = new RuleTester({languageOptions: {ecmaVersion: 2022, sourceType: 'module'}});

tester.run('no-direct-mui-imports', rule, {
  valid: [
    {code: `import Button from '@wso2/oxygen-ui/Button';`, filename},
    {code: `import {Button} from '@wso2/oxygen-ui';`, filename},
    {
      code: `import {DataGrid} from '@mui/x-data-grid';`,
      options: [{allowedPackages: ['@mui/x-data-grid']}],
      filename,
    },
  ],
  invalid: [
    {
      name: 'a Material UI path import keeps its default import on the Oxygen path',
      code: `import Button from '@mui/material/Button';`,
      output: `import Button from '@wso2/oxygen-ui/Button';`,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename,
    },
    {
      name: 'a Material UI path import keeps named imports and the quote style',
      code: `import Button, { buttonClasses } from "@mui/material/Button";`,
      output: `import Button, { buttonClasses } from "@wso2/oxygen-ui/Button";`,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename,
    },
    {
      name: 'the Material UI root becomes one path import per path, using the installed map',
      code: `import { Box, Button as B, buttonClasses, styled } from '@mui/material';`,
      output: [
        `import Box from '@wso2/oxygen-ui/Box';`,
        `import B, {buttonClasses} from '@wso2/oxygen-ui/Button';`,
        `import {styled} from '@wso2/oxygen-ui/styles';`,
      ].join('\n'),
      errors: [{messageId: 'noDirectMuiImport'}],
      filename,
    },
    {
      name: 'the Material UI root is reported but not fixed when a name has no path',
      code: `import { Box, Unknown } from '@mui/material';`,
      output: null,
      errors: [{messageId: 'noDirectMuiImport'}],
      filename,
    },
    {
      name: 'the Material UI root is reported but not fixed when the installed package has no map, and the lack of a map is said once',
      code: `import { Box } from '@mui/material';\nimport { Stack } from '@mui/material';`,
      output: null,
      errors: [{messageId: 'noDirectMuiImport'}, {messageId: 'pathMapUnusable'}, {messageId: 'noDirectMuiImport'}],
      filename: filenameWithoutMap,
    },
    {
      name: 'an MUI X package points at its lower-case Oxygen path',
      code: `import { DataGrid } from '@mui/x-data-grid';`,
      output: `import { DataGrid } from '@wso2/oxygen-ui/data-grid';`,
      errors: [{messageId: 'noDirectMuiXImport', data: {source: '@mui/x-data-grid', suggestedPath: '@wso2/oxygen-ui/data-grid'}}],
      filename,
    },
    {
      name: 'the date pickers and the tree view point at their Oxygen paths',
      code: `import { DatePicker } from '@mui/x-date-pickers';\nimport { TreeView } from '@mui/x-tree-view';`,
      output: `import { DatePicker } from '@wso2/oxygen-ui/date-pickers';\nimport { TreeView } from '@wso2/oxygen-ui/tree-view';`,
      errors: [{messageId: 'noDirectMuiXImport'}, {messageId: 'noDirectMuiXImport'}],
      filename,
    },
    {
      name: 'a date picker adapter points at its path under date-pickers',
      code: `import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';`,
      output: `import { AdapterDateFns } from '@wso2/oxygen-ui/date-pickers/AdapterDateFns';`,
      errors: [{messageId: 'noDirectMuiXImport'}],
      filename,
    },
    {
      name: 'a Material UI path the installed package does not have is reported and left alone',
      code: `import Grid from '@mui/material/Grid2';`,
      output: null,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename,
    },
    {
      name: 'a Material UI path import is left alone when a named import is not on that path',
      code: `import {styled} from '@mui/material/Button';`,
      output: null,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename,
    },
    {
      name: 'a Material UI path import is left alone when the installed package has no map, with the reason',
      code: `import Button from '@mui/material/Button';`,
      output: null,
      errors: [{messageId: 'noDirectMuiSubpathImport'}, {messageId: 'pathMapUnusable', data: {reason: '@wso2/oxygen-ui unknown has no path map, so it is unknown which path each name lives on. Upgrade to a version that publishes @wso2/oxygen-ui/path-map.json.'}}],
      filename: filenameWithoutMap,
    },
    {
      name: 'no fix is written for the legacy node module resolution',
      code: `import Button from '@mui/material/Button';\nimport { Box } from '@mui/material';`,
      output: null,
      errors: [{messageId: 'noDirectMuiSubpathImport'}, {messageId: 'noDirectMuiImport'}],
      filename: legacyResolution,
    },
    {
      name: 'no fix is written when module commonjs implies the legacy resolution',
      code: `import Button from '@mui/material/Button';`,
      output: null,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename: legacyByModule,
    },
    {
      name: 'the bundler module resolution gets the fix',
      code: `import Button from '@mui/material/Button';`,
      output: `import Button from '@wso2/oxygen-ui/Button';`,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename: bundlerResolution,
    },
    {
      name: 'the Material UI root fix keeps a file without semicolons without them',
      code: `import { Box } from '@mui/material'`,
      output: `import Box from '@wso2/oxygen-ui/Box'`,
      errors: [{messageId: 'noDirectMuiImport'}],
      filename,
    },
    {
      name: 'an import with a comment inside is reported and left alone',
      code: `import {\n  Box, // layout\n  Button,\n} from '@mui/material';`,
      output: null,
      errors: [{messageId: 'noDirectMuiImport'}],
      filename,
    },
    {
      name: 'an MUI X package without an Oxygen path says so',
      code: `import { BarChart } from '@mui/x-charts';`,
      output: null,
      errors: [{messageId: 'noDirectMuiXUnavailable'}],
      filename,
    },
    {
      name: 'an MUI package without an Oxygen path is reported and left alone',
      code: `import Icon from '@mui/icons-material/Add';`,
      output: null,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename,
    },
    {
      name: 'the suggested package option changes the prefix of the path',
      code: `import Button from '@mui/material/Button';`,
      options: [{suggestedPackage: '@acme/ui'}],
      output: `import Button from '@acme/ui/Button';`,
      errors: [{messageId: 'noDirectMuiSubpathImport'}],
      filename,
    },
  ],
});
