#!/usr/bin/env node
/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import {execSync} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';
import {logger} from '@oxygen-ui/logger';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

/* ====================================================================================== */
/* Execution starts from here                                                             */
/* ====================================================================================== */

logger.log('=======================  🧱 Started Building Primitives 🧱  =======================');
logger.log();
logger.log('                         💅  Building Style Dictionary  💅                         ');
logger.log();

execSync(`node ${path.resolve(__dirname, 'build-sd.js')}`, {stdio: 'inherit'});

logger.log();
logger.log('                          💅  Building the SVG Icons  💅                           ');
logger.log();

execSync(`node ${path.resolve(__dirname, 'build-icons.js')}`, {stdio: 'inherit'});
