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

import { describe, expect, it } from 'vitest';
import AcrylicBaseTheme from './AcrylicBaseTheme';
import AcrylicOrangeTheme from './AcrylicOrangeTheme';
import AcrylicPurpleTheme from './AcrylicPurpleTheme';

const buttonVariantsOf = (theme: typeof AcrylicBaseTheme) =>
  (theme.components?.MuiButton?.variants ?? []).map(({ props }) =>
    typeof props === 'function' ? 'function' : `${props.variant}/${props.color}`,
  );

describe('Acrylic Button variants', () => {
  it('keep the secondary and outlined styles of the base theme in AcrylicPurple', () => {
    const base = buttonVariantsOf(AcrylicBaseTheme);

    expect(base).toContain('outlined/secondary');
    expect(buttonVariantsOf(AcrylicOrangeTheme)).toEqual(base);
    expect(buttonVariantsOf(AcrylicPurpleTheme).sort()).toEqual(base.sort());
  });
});
