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
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import MenuItem from '@mui/material/MenuItem';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import TextField from './TextField';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

describe('TextField', () => {
  it('floats the label without labelPlacement, as MUI does', () => {
    const { container } = renderWithTheme(<TextField label="Name" />);
    expect(screen.getByLabelText('Name')).toBeTruthy();
    expect(container.querySelector('.MuiInputLabel-root')).not.toBeNull();
    expect(container.querySelector('legend')?.textContent).toContain('Name');
  });

  it('draws a static label above the field with labelPlacement="top"', () => {
    const { container } = renderWithTheme(<TextField labelPlacement="top" label="Name" />);
    const label = screen.getByText('Name');
    expect(label.classList.contains('MuiFormLabel-root')).toBe(true);
    expect(label.classList.contains('MuiInputLabel-root')).toBe(false);
    // No floating label, so the outline has no notch cut for one.
    expect(container.querySelector('legend')?.textContent).not.toContain('Name');
    expect(screen.getByLabelText('Name').tagName).toBe('INPUT');
  });

  it.each(['outlined', 'filled', 'standard'] as const)('draws the top label for the %s variant', (variant) => {
    const { container } = renderWithTheme(<TextField labelPlacement="top" variant={variant} label="Name" />);
    expect(screen.getByText('Name').classList.contains('MuiFormLabel-root')).toBe(true);
    expect(screen.getByLabelText('Name').tagName).toBe('INPUT');
    expect(container.querySelector('.MuiInputLabel-root')).toBeNull();
  });

  it('drops the floating-label padding of the filled variant', () => {
    const { container } = renderWithTheme(<TextField labelPlacement="top" variant="filled" label="Name" />);
    expect(container.querySelector('.MuiInputBase-inputHiddenLabel')).not.toBeNull();
  });

  it('colours the top label while the field has focus', () => {
    renderWithTheme(<TextField labelPlacement="top" label="Name" />);
    fireEvent.focus(screen.getByLabelText('Name'));
    expect(screen.getByText('Name').classList.contains('Mui-focused')).toBe(true);
    fireEvent.blur(screen.getByLabelText('Name'));
    expect(screen.getByText('Name').classList.contains('Mui-focused')).toBe(false);
  });

  it('names a select through its top label', () => {
    renderWithTheme(
      <TextField labelPlacement="top" label="Region" select value="eu">
        <MenuItem value="eu">Europe</MenuItem>
      </TextField>,
    );
    expect(screen.getByRole('combobox', { name: /Region/ })).toBeTruthy();
  });

  it('keeps an empty helper line for a field that validates', () => {
    const { container } = renderWithTheme(<TextField labelPlacement="top" label="Name" error={false} />);
    expect(container.querySelector('.MuiFormHelperText-root')).not.toBeNull();
  });

  it('shows the helper text it is given', () => {
    renderWithTheme(<TextField labelPlacement="top" label="Name" error helperText="Name is required." />);
    expect(screen.getByText('Name is required.')).toBeTruthy();
  });

  it('points ref at the outer FormControl that holds the label and field', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<TextField labelPlacement="top" label="Name" ref={ref} />);
    expect(ref.current?.contains(screen.getByText('Name'))).toBe(true);
    expect(ref.current?.contains(screen.getByLabelText('Name'))).toBe(true);
  });

  it('falls back to MUI TextField when there is no label', () => {
    const { container } = renderWithTheme(<TextField labelPlacement="top" placeholder="Search" />);
    expect(container.querySelector('.MuiFormLabel-root')).toBeNull();
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
  });
});
