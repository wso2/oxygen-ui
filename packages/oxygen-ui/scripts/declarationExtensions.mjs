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

import { existsSync, globSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const commentLine = /^\s*(\*|\/\/|\/\*)/;
const sideEffectImport = /^\s*import\s*(["'])[^"']+\1\s*;?\s*$/;
const relativeSpecifier = /(\bfrom\s*|\bimport\s*\(\s*)(["'])(\.{1,2}(?:\/[^"']*)?)\2/g;

const withExtension = (declaration, specifier) => {
  if (/\.(js|json)$/.test(specifier)) return specifier;

  const target = path.resolve(path.dirname(declaration), specifier);

  if (existsSync(`${target}.d.ts`)) return `${specifier}.js`;
  if (existsSync(path.join(target, 'index.d.ts'))) return `${specifier}/index.js`;

  throw new Error(`${declaration} imports ${specifier}, and no declaration file is there.`);
};

/**
 * TypeScript writes relative imports in declarations as they are in the source, without an extension,
 * and `node16` and `nodenext` resolution does not resolve those in an ES module package.
 *
 * It also keeps imports that only run code, such as a stylesheet or a Prism language. A declaration gains
 * nothing from them, and TypeScript 6 reports one it cannot resolve in an app that checks its dependencies.
 */
export function addExtensionsToDeclarations(distribution) {
  for (const file of globSync('**/*.d.ts', { cwd: distribution })) {
    const declaration = path.join(distribution, file);
    const code = readFileSync(declaration, 'utf8');
    const rewritten = code
      .split('\n')
      .filter(line => !sideEffectImport.test(line))
      .map(line =>
        commentLine.test(line)
          ? line
          : line.replace(
              relativeSpecifier,
              (_, before, quote, specifier) => `${before}${quote}${withExtension(declaration, specifier)}${quote}`,
            ),
      )
      .join('\n');

    if (rewritten !== code) writeFileSync(declaration, rewritten);
  }
}
