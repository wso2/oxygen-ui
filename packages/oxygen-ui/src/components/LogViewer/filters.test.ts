/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { describe, it, expect } from 'vitest';
import { isApplied, isRange } from './filters';

const range = { start: new Date('2026-10-13T10:00:00.000Z'), end: new Date('2026-10-13T11:00:00.000Z') };

describe('isRange', () => {
  it('is true for a time range, and false for text and for no value', () => {
    expect(isRange(range)).toBe(true);
    expect(isRange('failure')).toBe(false);
    expect(isRange('')).toBe(false);
    expect(isRange(null)).toBe(false);
    expect(isRange(undefined)).toBe(false);
  });
});

describe('isApplied', () => {
  it('is true for a time range and for text that is not empty', () => {
    expect(isApplied(range)).toBe(true);
    expect(isApplied('failure')).toBe(true);
  });

  it('is false for empty text and for no value', () => {
    expect(isApplied('')).toBe(false);
    expect(isApplied(null)).toBe(false);
    expect(isApplied(undefined)).toBe(false);
  });
});
