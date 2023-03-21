#!/usr/bin/env node
/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

const cp = require('child_process');
const path = require('path');
const { logger } = require('@oxygen-ui-experimental/logger');

/* ====================================================================================== */
/* Execution starts from here                                                             */
/* ====================================================================================== */

logger.log('=======================  🧱 Started Building Primitives 🧱  =======================');
logger.log();
logger.log('                         💅  Building Style Dictionary  💅                         ');
logger.log();

cp.fork(path.resolve(__dirname, 'build-sd.js'));

logger.log();
logger.log('                          💅  Building the SVG Icons  💅                           ');
logger.log();

cp.fork(path.resolve(__dirname, 'build-icons.js'));
