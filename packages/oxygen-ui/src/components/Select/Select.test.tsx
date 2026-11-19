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

import { render, screen } from '@testing-library/react';
import MenuItem from '@mui/material/MenuItem';
import { describe, expect, it } from 'vitest';
import Select from './Select';

const options = [<MenuItem key="a" value="a">Alpha</MenuItem>, <MenuItem key="b" value="b">Beta</MenuItem>];

describe('Select', () => {
  it('names the combobox through the label of a top-placed label', () => {
    render(
      <Select labelPlacement="top" label="Region" value="">
        {options}
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Region' })).toBeDefined();
  });

  it('puts the label right before the field, which the theme\'s selectors rely on', () => {
    const { container } = render(
      <Select labelPlacement="top" label="Region" value="">
        {options}
      </Select>,
    );
    const label = container.querySelector('.MuiFormLabel-root');

    expect(label?.nextElementSibling?.classList.contains('MuiOutlinedInput-root')).toBe(true);
  });

  it('keeps the label from taking the focus colour of the field', () => {
    const { container } = render(
      <Select labelPlacement="top" label="Region" value="" error>
        {options}
      </Select>,
    );

    expect(container.querySelector('.MuiFormLabel-root')?.classList.contains('Mui-error')).toBe(false);
  });

  it('uses MUI\'s floating label when no placement is given', () => {
    const { container } = render(
      <Select label="Region" value="">
        {options}
      </Select>,
    );

    expect(container.querySelector('.MuiFormLabel-root:not(.MuiInputLabel-root)')).toBeNull();
  });

  it('shows the placeholder while nothing is selected, and the option once something is', () => {
    const { rerender } = render(
      <Select value="" placeholder="Choose a region">
        {options}
      </Select>,
    );

    expect(screen.getByText('Choose a region')).toBeDefined();

    rerender(
      <Select value="b" placeholder="Choose a region">
        {options}
      </Select>,
    );

    expect(screen.queryByText('Choose a region')).toBeNull();
    expect(screen.getByText('Beta')).toBeDefined();
  });

  it('ignores a placeholder on a native select', () => {
    const { container } = render(
      <Select native value="" placeholder="Choose a region">
        <option value="a">Alpha</option>
      </Select>,
    );

    expect(container.textContent).not.toContain('Choose a region');
  });
});
