#!/usr/bin/env node
/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

/**
 * @fileoverview Script to generate the typings for the icons.
 */

const fs = require('fs-extra');
const path = require('path');
const {logger} = require('@oxygen-ui/logger');

const PATHS = {
  dist: path.resolve(__dirname, '..', 'dist'),
  get generated() {
    return path.join(this.src, '__generated__');
  },
  get generatedIconTypes() {
    return path.join(this.generated, 'icons.d.ts');
  },
  get iconsDist() {
    return path.join(this.dist, 'icons.d.ts');
  },
  get indexDist() {
    return path.join(this.dist, 'index.d.ts');
  },
  get indexSrc() {
    return path.join(this.src, 'index.ts');
  },
  src: path.resolve(__dirname, '..', 'src'),
};

const die = err => {
  logger.error(err.stack);
  process.exitCode = 1;
};

fs.copy(PATHS.generatedIconTypes, PATHS.iconsDist)
  .then(() =>
    fs
      .readFile(PATHS.indexSrc, 'utf8')
      .then(content => content.replace(/.\/__generated__\//g, './'))
      .then(content => fs.writeFile(PATHS.indexDist, content, 'utf8')),
  )
  .catch(die);
