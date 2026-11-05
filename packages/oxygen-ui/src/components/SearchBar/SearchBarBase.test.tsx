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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBarBase from './SearchBarBase';
import type { SearchBarBaseProps } from './SearchBarBase';

const renderField = (props: Partial<SearchBarBaseProps> = {}) =>
  render(
    <ThemeProvider theme={createTheme()}>
      <SearchBarBase {...props} />
    </ThemeProvider>
  );

const rootOfField = () => screen.getByRole('textbox').closest('.MuiInputBase-root') as HTMLElement;
const inputOfField = () => screen.getByRole('textbox') as HTMLElement;

describe('SearchBarBase', () => {
  afterEach(cleanup);

  it('is 40px high with its own padding when no sx is given', () => {
    renderField();
    expect(getComputedStyle(rootOfField()).height).toBe('40px');
    expect(getComputedStyle(inputOfField()).padding).toBe('8.5px 14px');
  });

  it('takes the height and padding of an sx object', () => {
    renderField({
      sx: { '& .MuiOutlinedInput-root': { height: 32 }, '& .MuiInputBase-input': { padding: '4px 8px' } },
    });
    expect(getComputedStyle(rootOfField()).height).toBe('32px');
    expect(getComputedStyle(inputOfField()).padding).toBe('4px 8px');
  });

  it('takes the height and padding of an sx array, which used to be lost', () => {
    renderField({
      sx: [
        { '& .MuiOutlinedInput-root': { height: 32 } },
        { '& .MuiInputBase-input': { padding: '4px 8px' } },
      ],
    });
    expect(getComputedStyle(rootOfField()).height).toBe('32px');
    expect(getComputedStyle(inputOfField()).padding).toBe('4px 8px');
  });
});
