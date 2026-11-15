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
import { createOxygenTheme } from './createOxygenTheme';
import OxygenThemeBase from '../styles/OxygenThemeBase';

describe('createOxygenTheme', () => {
  it('keeps the base font variables when the typography is unchanged', () => {
    expect(createOxygenTheme({}).font).toEqual(OxygenThemeBase.font);
  });

  it('derives the font variables from the merged typography', () => {
    const theme = createOxygenTheme({ typography: { fontFamily: 'Roboto', body2: { fontFamily: 'Roboto' } } });

    expect(theme.font.body2).toContain('Roboto');
    expect(theme.vars.font.body2).toContain('Roboto');
  });

  it('leaves the base theme font variables untouched', () => {
    const before = OxygenThemeBase.font;

    createOxygenTheme({ typography: { fontFamily: 'Roboto' } });

    expect(OxygenThemeBase.font).toBe(before);
    expect(OxygenThemeBase.font.body2).toContain('Inter Variable');
  });

  it('keeps a font variable passed in the config', () => {
    const theme = createOxygenTheme({ font: { body2: '400 1rem/1.5 Custom' } });

    expect(theme.font.body2).toBe('400 1rem/1.5 Custom');
  });

  it('keeps a font variable passed in the config of the base theme', () => {
    const parent = createOxygenTheme({ font: { body2: '400 1rem/1.5 Custom' } });
    const child = createOxygenTheme({}, parent);
    const grandchild = createOxygenTheme({ typography: { body1: { fontFamily: 'Roboto' } } }, child);

    expect(child.font.body2).toBe('400 1rem/1.5 Custom');
    expect(grandchild.font.body2).toBe('400 1rem/1.5 Custom');
    expect(grandchild.font.body1).toContain('Roboto');
  });

  it('overrides a font variable of the base theme with the one passed in the config', () => {
    const parent = createOxygenTheme({ font: { body1: '400 1rem/1.5 Parent', body2: '400 1rem/1.5 Parent' } });
    const child = createOxygenTheme({ font: { body2: '400 1rem/1.5 Child' } }, parent);

    expect(child.font.body1).toBe('400 1rem/1.5 Parent');
    expect(child.font.body2).toBe('400 1rem/1.5 Child');
  });
});
