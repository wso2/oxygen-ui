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

import { describe, it, expect } from 'vitest';
import AcrylicOrangeTheme from './AcrylicOrangeTheme';
import AcrylicPurpleTheme from './AcrylicPurpleTheme';

describe.each([
  ['AcrylicOrangeTheme', AcrylicOrangeTheme],
  ['AcrylicPurpleTheme', AcrylicPurpleTheme],
])('%s light secondary palette', (_, theme) => {
  const { secondary } = theme.colorSchemes.light!.palette;

  it('derives every token from the light grey, not the base theme grey', () => {
    expect(secondary).toMatchObject({
      main: '#e8e8e8',
      light: '#ededed',
      dark: '#d0d0d0',
      contrastText: '#40404B',
      mainChannel: '232 232 232',
      lightChannel: '237 237 237',
      darkChannel: '208 208 208',
      contrastTextChannel: '64 64 75',
    });
  });
});
