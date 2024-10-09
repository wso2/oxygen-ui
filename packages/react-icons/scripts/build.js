#!/usr/bin/env node
/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

const path = require('path');
const {logger} = require('@oxygen-ui/logger');
const cp = require('child_process');

/* ====================================================================================== */
/* Execution starts from here                                                             */
/* ====================================================================================== */

logger.log(`=======================  🎠 Started Building React Icons 🎠  =======================`);
logger.log();
logger.log('                         🧩     Generating the Icons     🧩                         ');
logger.log();

const buildProcess = cp.fork(path.resolve(__dirname, 'build-icons.js'));

buildProcess.on('close', status => {
  // Only generate types if the build succeeds (status code 0).
  if (status === 0) {
    logger.log();
    logger.log('                         🎲     Generating the Types     🎲                         ');
    logger.log();

    cp.fork(path.resolve(__dirname, 'generate-types.js'));
  } else {
    logger.error('Failed to build the icons. Hence, typing generation was aborted. Please try again!');
  }
});
