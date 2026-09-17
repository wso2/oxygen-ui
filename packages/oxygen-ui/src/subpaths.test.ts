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

/**
 * Real subpath imports (wso2/oxygen-ui#582).
 *
 * `import Button from '@wso2/oxygen-ui/Button'` must resolve to a real
 * package entry with Material's shape — not only via the Vite plugin alias.
 */
import { describe, it, expect } from 'vitest';

describe('material subpath entries', () => {
  it('exposes Button as a real entry with Material shape', async () => {
    const oxygenButton = await import('./Button');
    const muiButton = await import('@mui/material/Button');

    expect(oxygenButton.default).toBe(muiButton.default);
  });

  it('exposes TextField as a real entry with Material shape', async () => {
    const oxygenField = await import('./TextField');
    const muiField = await import('@mui/material/TextField');

    expect(oxygenField.default).toBe(muiField.default);
  });

  it('re-exports Button named members (e.g. buttonClasses)', async () => {
    const oxygenButton = await import('./Button');
    const muiButton = await import('@mui/material/Button');

    expect((oxygenButton as Record<string, unknown>).buttonClasses).toBe(
      (muiButton as Record<string, unknown>).buttonClasses,
    );
  });

  it('re-exports non-default subpaths without a default (e.g. colors)', async () => {
    const oxygenColors = await import('./colors');
    const muiColors = await import('@mui/material/colors');

    expect((oxygenColors as Record<string, unknown>).red).toBe(
      (muiColors as Record<string, unknown>).red,
    );
    expect('default' in oxygenColors).toBe('default' in muiColors);
  });
});
