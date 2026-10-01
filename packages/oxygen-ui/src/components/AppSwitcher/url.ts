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

const SAFE_PROTOCOLS = new Set(['http:', 'https:']);

// Relative URLs resolve to `http:` against this base, so they pass.
const RELATIVE_BASE = 'http://relative.invalid';

/**
 * Whether a URL is safe to put into a card's `href`.
 *
 * Card URLs can come from fetched data. Parsing with `URL` sees the scheme as
 * the browser does, so tricks like `" JaVa\tScript:"` cannot slip past.
 */
export const isSafeAppUrl = (url: string): boolean => {
  try {
    return SAFE_PROTOCOLS.has(new URL(url, RELATIVE_BASE).protocol);
  } catch {
    return false;
  }
};
