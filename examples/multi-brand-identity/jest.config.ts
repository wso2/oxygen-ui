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

import type {JestConfigWithTsJest} from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '@oxygen-ui/react': '<rootDir>/node_modules/@oxygen-ui/react',
    '\\.(css|less|sass|scss)$': '<rootDir>/test-configs/__mocks__/style-mock.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@oxygen-ui/primitives$': '<rootDir>/node_modules/@oxygen-ui/primitives',
    '^@oxygen-ui/primitives/(.*)$': '<rootDir>/node_modules/@oxygen-ui/primitives/$1',
    '^@unit-testing$': '<rootDir>/test-configs/index.ts',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/test-configs/setup-test.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  verbose: true,
};

export default jestConfig;
