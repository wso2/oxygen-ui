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
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { areEqualValues, isEmptyValue, renderSelectedOptions, selectPlaceholderProps } from './placeholder';

describe('isEmptyValue', () => {
  it.each([
    [undefined, true],
    [null, true],
    ['', true],
    [[], true],
    [0, false],
    ['a', false],
    [['a'], false],
  ])('%j is %s', (value, expected) => {
    expect(isEmptyValue(value)).toBe(expected);
  });
});

describe('areEqualValues', () => {
  it('compares option values as strings, except for objects', () => {
    expect(areEqualValues(1, '1')).toBe(true);
    expect(areEqualValues('1', 2)).toBe(false);

    const option = { id: 1 };

    expect(areEqualValues(option, option)).toBe(true);
    expect(areEqualValues({ id: 1 }, option)).toBe(false);
  });
});

describe('renderSelectedOptions', () => {
  const options = [
    <MenuItem key="a" value="a">Alpha</MenuItem>,
    <MenuItem key="b" value="b">Beta</MenuItem>,
    <MenuItem key="n" value={3}>Three</MenuItem>,
  ];
  const show = (selected: unknown) => {
    const { container, unmount } = render(<div>{renderSelectedOptions(selected, options)}</div>);
    const text = container.textContent;

    unmount();

    return text;
  };

  it('shows the children of the selected option', () => {
    expect(show('b')).toBe('Beta');
  });

  it('matches a number against an option value given as text and the other way round', () => {
    expect(show('3')).toBe('Three');
  });

  it('joins the children of several selected options with a comma', () => {
    expect(show(['a', 'b'])).toBe('Alpha, Beta');
  });

  it('shows nothing for a value no option has', () => {
    expect(show('zzz')).toBe('');
  });
});

describe('selectPlaceholderProps', () => {
  const options = [<MenuItem key="a" value="a">Alpha</MenuItem>];
  const display = (selected: unknown, renderValue?: (value: unknown) => React.ReactNode) => {
    const props = selectPlaceholderProps('Choose one', renderValue, options);
    const { container, unmount } = render(<div>{props.renderValue(selected)}</div>);
    const text = container.textContent;

    unmount();

    return text;
  };

  it('asks the select to display an empty value', () => {
    expect(selectPlaceholderProps('Choose one', undefined, options).displayEmpty).toBe(true);
  });

  it('shows the placeholder while the value is empty', () => {
    expect(display('')).toBe('Choose one');
    expect(display([])).toBe('Choose one');
  });

  it('shows the selected option once there is a value', () => {
    expect(display('a')).toBe('Alpha');
  });

  it('uses the consumer\'s renderValue for a value, and still the placeholder for an empty one', () => {
    const renderValue = (value: unknown) => `custom ${String(value)}`;

    expect(display('a', renderValue)).toBe('custom a');
    expect(display('', renderValue)).toBe('Choose one');
  });

  it('draws the placeholder with the secondary text colour class, not as an input placeholder', () => {
    render(<div>{selectPlaceholderProps('Choose one', undefined, options).renderValue('')}</div>);

    expect(screen.getByText('Choose one').className).toMatch(/MuiSelect-placeholder/);
  });
});
