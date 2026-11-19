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

import { render } from '@testing-library/react';
import MenuItem from '@mui/material/MenuItem';
import { describe, expect, it } from 'vitest';
import Select from '../../components/Select/Select';
import TextField from '../../components/TextField/TextField';
import { fixedLabelField, fixedLabelInputs } from './fixedLabelSelectors';

/** The selectors a theme uses for a field whose label sits above it, written for the element they style. */
const forInputRoot = (selector: string) => selector.replace('&', '.MuiOutlinedInput-root');

describe('the structure the theme\'s fixed-label selectors rely on', () => {
  it('is what the TextField Override draws in top mode: a form label right before a text field with no label of its own', () => {
    const { container } = render(<TextField labelPlacement="top" label="Name" />);

    expect(container.querySelector(fixedLabelField)).not.toBeNull();
    expect(container.querySelector(forInputRoot(fixedLabelInputs[0]))).not.toBeNull();
  });

  it('is what the Select Override draws in top mode: a form label, not an input label, right before the input root', () => {
    const { container } = render(
      <Select labelPlacement="top" label="Region" value="">
        <MenuItem value="a">Alpha</MenuItem>
      </Select>,
    );

    expect(container.querySelector(forInputRoot(fixedLabelInputs[1]))).not.toBeNull();
  });

  it('does not match a floating-label field, which keeps the focus style of the base theme', () => {
    const { container } = render(<TextField label="Name" />);

    expect(container.querySelector(fixedLabelField)).toBeNull();
    expect(container.querySelector(forInputRoot(fixedLabelInputs[1]))).toBeNull();
  });
});
