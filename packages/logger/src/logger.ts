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

import chalk from 'chalk';
import {Logger} from './models';
import {format} from './utils';

/* eslint-disable no-console */

export const prefix: string = '🌿 ';

const error = (...args: Array<any>): void => {
  console.error(format(args, prefix, chalk.red('error')));
};

const info = (...args: Array<any>): void => {
  console.info(format(args, prefix, chalk.cyan('info')));
};

const log = (...args: Array<any>): void => {
  console.log(format(args, prefix));
};

const success = (...args: Array<any>): void => {
  console.log(format(args, prefix, chalk.green('success')));
};

const warn = (...args: Array<any>): void => {
  console.warn(format(args, prefix, chalk.yellow('warn')));
};

export const logger: Logger = {
  error,
  info,
  log,
  success,
  warn,
};
