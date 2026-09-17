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

import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import CodeBlock from './CodeBlock';

vi.mock('prismjs', () => {
  throw new Error('Failed to load Prism');
});

describe('CodeBlock load failure', () => {
  afterEach(() => {
    cleanup();
  });

  it('keeps the unhighlighted sample when Prism fails to load', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <OxygenUIThemeProvider>
        <CodeBlock code={'const answer: number = 42;'} language="typescript" />
      </OxygenUIThemeProvider>,
    );

    expect(container.querySelector('code.language-typescript')?.textContent).toBe(
      'const answer: number = 42;',
    );

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });
});
