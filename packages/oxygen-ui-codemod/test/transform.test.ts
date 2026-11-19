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

import { describe, expect, it } from 'vitest';
import { transformPathImports } from '../src/transform.js';
import { map } from './map.js';

const run = (source: string) => transformPathImports(source, map);

describe('transformPathImports', () => {
  it('keeps the line endings of a file that uses CRLF, between the statements it writes too', () => {
    const { source } = run(`import { TextField, Button } from '@wso2/oxygen-ui';\r\nconst a = 1;\r\n`);

    expect(source).toBe(
      `import TextField from '@wso2/oxygen-ui/TextField';\r\nimport Button from '@wso2/oxygen-ui/Button';\r\nconst a = 1;\r\n`,
    );
    expect(source.replace(/\r\n/g, '')).not.toMatch(/\n/);
  });

  it('writes LF between the statements of a file that uses LF', () => {
    const { source } = run(`import { TextField, Button } from '@wso2/oxygen-ui';\nconst a = 1;\n`);

    expect(source).not.toContain('\r');
  });

  it('turns a barrel import into one import per path, with the main name as the default', () => {
    const { source, reports } = run(
      `import { TextField, Button } from '@wso2/oxygen-ui';\n`,
    );
    expect(source).toBe(
      `import TextField from '@wso2/oxygen-ui/TextField';\nimport Button from '@wso2/oxygen-ui/Button';\n`,
    );
    expect(reports).toEqual([]);
  });

  it('puts names that share a path into one import statement', () => {
    const { source } = run(
      `import { textFieldClasses, TextField, Button } from '@wso2/oxygen-ui';\n`,
    );
    expect(source).toBe(
      `import TextField, { textFieldClasses } from '@wso2/oxygen-ui/TextField';\nimport Button from '@wso2/oxygen-ui/Button';\n`,
    );
  });

  it('binds a second name for the same default export with default as', () => {
    const { source } = run(
      `import { ColorSchemeToggleDefault, ColorSchemeToggle } from '@wso2/oxygen-ui';`,
    );
    expect(source).toBe(
      `import ColorSchemeToggleDefault, { default as ColorSchemeToggle } from '@wso2/oxygen-ui/ColorSchemeToggle';`,
    );
  });

  it('imports a path without its main name as named imports only', () => {
    const { source } = run(`import { textFieldClasses } from '@wso2/oxygen-ui';`);
    expect(source).toBe(`import { textFieldClasses } from '@wso2/oxygen-ui/TextField';`);
  });

  it('keeps the quote style, the semicolon choice and the indentation', () => {
    const { source } = run(`  import { TextField, Button } from "@wso2/oxygen-ui"`);
    expect(source).toBe(
      `  import TextField from "@wso2/oxygen-ui/TextField"\n  import Button from "@wso2/oxygen-ui/Button"`,
    );
  });

  it('leaves path imports and everything else in the file alone', () => {
    const input = [
      `import TextField from '@wso2/oxygen-ui/TextField';`,
      `import { useState } from 'react';`,
      ``,
      `// a comment`,
      `export const a = 1;`,
      ``,
    ].join('\n');
    const { source, reports } = run(input);
    expect(source).toBe(input);
    expect(reports).toEqual([]);
  });

  it('keeps the rest of the file, including comments before the import', () => {
    const { source } = run(
      `/* header */\n// note\nimport { Button } from '@wso2/oxygen-ui';\nconst x = <Button />;\n`,
    );
    expect(source).toBe(
      `/* header */\n// note\nimport Button from '@wso2/oxygen-ui/Button';\nconst x = <Button />;\n`,
    );
  });

  it('leaves the file untouched and reports a name the map does not have', () => {
    const input = `import { Button } from '@wso2/oxygen-ui';\nimport { Nope } from '@wso2/oxygen-ui';\n`;
    const { source, reports } = run(input);
    expect(source).toBe(input);
    expect(reports).toEqual([expect.objectContaining({ line: 2, reason: 'unknown-name' })]);
  });

  it('reports the lines of the cases it leaves, counted in the new source', () => {
    const input = [
      `import { Button } from '@wso2/oxygen-ui';`,
      `import * as Oxygen from '@wso2/oxygen-ui';`,
      `const lazy = import('@wso2/oxygen-ui');`,
      `const cjs = require('@wso2/oxygen-ui');`,
      ``,
    ].join('\n');
    const { reports } = run(input);
    expect(reports.map((r) => r.line)).toEqual([2, 3, 4]);
  });

  it('reports the line a remaining import has in the new source', () => {
    const { source, reports } = run(
      `import { TextField, Button } from '@wso2/oxygen-ui';\nimport * as O from '@wso2/oxygen-ui';\n`,
    );
    expect(source.split('\n')[reports[0].line - 1]).toBe(`import * as O from '@wso2/oxygen-ui';`);
  });
});
