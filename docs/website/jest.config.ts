/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com).
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

import type {Config as ConfigNS} from '@jest/types';
import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig: (
  customJestConfig?: ConfigNS.InitialProjectOptions | (() => Promise<ConfigNS.InitialProjectOptions>),
) => () => Promise<ConfigNS.InitialProjectOptions> = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  displayName: '@oxygen-ui/docs',
  globals: {},
  moduleDirectories: ['node_modules', 'test-configs', __dirname],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '@oxygen-ui/react': '<rootDir>/node_modules/@oxygen-ui/react',
    '\\.(css|less|sass|scss)$': '<rootDir>/test-configs/__mocks__/style-mock.ts',
    '^@unit-testing$': '<rootDir>/test-configs/index',
  },
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/test-configs/setup-test.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/(dist|node_modules)/'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/?(?!@wso2)', '/node_modules/(?!@oxygen-ui/react/)'],
  verbose: true,
};

export default createJestConfig(config);
