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

import * as React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { GRADIENT_ANIMATED_CLASS } from '../../styles/OxygenThemeBase';
import Button from './Button';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Button animated', () => {
  it('marks an animated gradient button and keeps the prop off the DOM', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    renderWithTheme(
      <Button color="gradient" variant="outlined" animated>
        AI Assistant
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'AI Assistant' });
    expect(button.classList.contains(GRADIENT_ANIMATED_CLASS)).toBe(true);
    expect(button.hasAttribute('animated')).toBe(false);
    expect(error).not.toHaveBeenCalled();
  });

  it('ignores animated on other colors', () => {
    renderWithTheme(
      <Button color="primary" animated>
        Save
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Save' }).classList.contains(GRADIENT_ANIMATED_CLASS)).toBe(false);
  });

  it('keeps the consumer className and forwards the ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(
      <Button ref={ref} color="gradient" animated className="custom">
        Ask AI
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Ask AI' });
    expect(button.classList.contains('custom')).toBe(true);
    expect(button.classList.contains(GRADIENT_ANIMATED_CLASS)).toBe(true);
    expect(ref.current).toBe(button);
  });

  it('renders a static gradient button without the class', () => {
    renderWithTheme(<Button color="gradient">Generate</Button>);

    expect(screen.getByRole('button', { name: 'Generate' }).classList.contains(GRADIENT_ANIMATED_CLASS)).toBe(false);
  });
});
