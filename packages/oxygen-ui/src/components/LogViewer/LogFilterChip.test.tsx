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
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import LogFilterChip from './LogFilterChip';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

describe('LogFilterChip', () => {
  it('shows the filter name and value', () => {
    const { container } = renderWithTheme(<LogFilterChip name="Status" value="Failed" />);
    expect(container.textContent).toBe('Status:Failed');
  });

  it('opens the picker when the chip is clicked', () => {
    const onOpen = vi.fn();
    renderWithTheme(<LogFilterChip name="Status" value="Failed" onOpen={onOpen} />);
    fireEvent.click(screen.getByLabelText('Change status filter'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('removes the filter without opening the picker when the remove icon is clicked', () => {
    const onOpen = vi.fn();
    const onRemove = vi.fn();
    renderWithTheme(<LogFilterChip name="Status" value="Failed" onOpen={onOpen} onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText('Remove status filter'));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('removes the filter with the keyboard when the chip has focus', () => {
    const onRemove = vi.fn();
    renderWithTheme(
      <LogFilterChip name="Status" value="Failed" onOpen={() => undefined} onRemove={onRemove} />,
    );
    fireEvent.keyUp(screen.getByLabelText('Change status filter'), { key: 'Backspace' });
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('is not clickable without onOpen and has no remove icon without onRemove', () => {
    renderWithTheme(<LogFilterChip name="Status" value="Failed" />);
    expect(screen.queryByLabelText('Change status filter')).toBeNull();
    expect(screen.queryByLabelText('Remove status filter')).toBeNull();
  });
});
