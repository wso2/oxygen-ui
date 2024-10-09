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

import {logger} from '../logger';

/* eslint-disable no-console */

describe('@oxygen-ui/logger', () => {
  const logMessageOne: string = 'Message 1';
  const logMessageTwo: string = 'Message 2';
  const expectedLoggedRegex: RegExp = new RegExp(`(${logMessageOne})\\s(${logMessageTwo})`);

  describe('log', () => {
    const originalConsoleLog: Console['log'] = console.log;

    beforeEach(() => {
      console.log = jest.fn();
    });
    afterEach(() => {
      console.log = originalConsoleLog;
    });
    it('should  call console.log', () => {
      logger.log(logMessageOne, logMessageTwo);
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(expectedLoggedRegex));
    });
  });

  describe('error', () => {
    const originalConsoleError: Console['error'] = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = originalConsoleError;
    });
    it('should  call console.error', () => {
      logger.error(logMessageOne, logMessageTwo);
      expect(console.error).toHaveBeenCalledWith(expect.stringMatching(expectedLoggedRegex));
    });
  });

  describe('info', () => {
    const originalConsoleInfo: Console['info'] = console.info;

    beforeEach(() => {
      console.info = jest.fn();
    });
    afterEach(() => {
      console.info = originalConsoleInfo;
    });
    it('should  call console.error', () => {
      logger.info(logMessageOne, logMessageTwo);
      expect(console.info).toHaveBeenCalledWith(expect.stringMatching(expectedLoggedRegex));
    });
  });

  describe('warn', () => {
    const originalConsoleWarn: Console['warn'] = console.warn;

    beforeEach(() => {
      console.warn = jest.fn();
    });
    afterEach(() => {
      console.warn = originalConsoleWarn;
    });
    it('should  call console.info', () => {
      logger.warn(logMessageOne, logMessageTwo);
      expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(expectedLoggedRegex));
    });
  });

  describe('success', () => {
    const originalConsoleLog: Console['log'] = console.log;

    beforeEach(() => {
      console.log = jest.fn();
    });
    afterEach(() => {
      console.log = originalConsoleLog;
    });
    it('should  call console.info', () => {
      logger.success(logMessageOne, logMessageTwo);
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(expectedLoggedRegex));
    });
  });
});
