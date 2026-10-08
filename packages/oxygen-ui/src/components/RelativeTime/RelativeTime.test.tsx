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
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import RelativeTime from './RelativeTime';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

describe('RelativeTime', () => {
  it('renders the time inside a time element', () => {
    renderWithTheme(<RelativeTime time="3 weeks ago" dateTime="2026-09-17T10:00:00Z" />);
    const time = screen.getByText('3 weeks ago');
    expect(time.tagName).toBe('TIME');
    expect(time.getAttribute('datetime')).toBe('2026-09-17T10:00:00Z');
  });

  it('renders the action before the time', () => {
    const { container } = renderWithTheme(<RelativeTime action="Updated" time="5 minutes ago" />);
    expect(container.textContent).toBe('Updated 5 minutes ago');
  });

  it('renders a decorative icon by default and hides it with hideIcon', () => {
    const { container, rerender } = renderWithTheme(<RelativeTime time="1 hour ago" />);
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull();

    rerender(
      <OxygenUIThemeProvider>
        <RelativeTime time="1 hour ago" hideIcon />
      </OxygenUIThemeProvider>,
    );
    expect(container.querySelector('svg')).toBeNull();
  });

  it('makes the tooltip trigger focusable when a tooltip is provided', () => {
    const { container } = renderWithTheme(
      <RelativeTime time="2 days ago" tooltip="October 6, 2026, 9:00 AM" />,
    );
    expect(container.querySelector('[tabindex="0"]')).not.toBeNull();
  });
});
