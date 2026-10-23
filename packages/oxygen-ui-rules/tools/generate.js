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

/* global console */

import {existsSync, readFileSync, writeFileSync} from 'fs';
import {buildGeneratedFiles, readApi} from './lib/generate.js';
import {repoPath} from './lib/repo.js';

const registry = await import('../dist/index.js');

let changed = 0;

for (const {path, content} of buildGeneratedFiles(registry, readApi())) {
  if (existsSync(path) && readFileSync(path, 'utf-8') === content) {
    console.log(`  unchanged  ${repoPath(path)}`);
    continue;
  }

  writeFileSync(path, content);
  changed += 1;
  console.log(`  updated    ${repoPath(path)}`);
}

console.log(changed > 0 ? `\nUpdated ${changed} generated file(s). Review the changes before committing.` : '\nGenerated files are up to date.');
