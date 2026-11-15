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

import * as React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { ElementWrapper } from './ElementWrapper';

afterEach(() => {
  cleanup();
});

describe('Form.ElementWrapper', () => {
  it.each([
    [
      'select',
      () => (
        <Select value="wso2" onChange={() => {}}>
          <MenuItem value="wso2">wso2</MenuItem>
        </Select>
      ),
      'combobox',
    ],
    ['text input', () => <OutlinedInput id="organization" />, 'textbox'],
  ])('keeps the label unfocused when its %s is focused', (_, renderField, role) => {
    const { container } = render(
      <ElementWrapper label="Organization" name="organization">
        {renderField()}
      </ElementWrapper>
    );

    fireEvent.focus(screen.getByRole(role));

    expect(container.querySelector('.MuiInputBase-root')?.classList.contains('Mui-focused')).toBe(true);
    expect(screen.getByText('Organization').classList.contains('Mui-focused')).toBe(false);
  });
});
