/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { UserMenu } from './UserMenu';

afterEach(() => {
  cleanup();
});

const menu = (name: string) => (
  <UserMenu>
    <UserMenu.Trigger name={name} />
    <UserMenu.Item icon={<span aria-hidden="true" />} label={`${name} profile`} />
  </UserMenu>
);

describe('UserMenu, the menu its trigger controls', () => {
  it('points the trigger at the menu it opens', () => {
    render(<OxygenUIThemeProvider>{menu('Ada Lovelace')}</OxygenUIThemeProvider>);

    const trigger = screen.getByRole('button', { name: 'Account' });
    fireEvent.click(trigger);

    const controlled = trigger.getAttribute('aria-controls');
    expect(controlled).toBeTruthy();
    expect(document.getElementById(controlled as string)?.getAttribute('role')).toBe('presentation');
    expect(screen.getByRole('menu')).toBeDefined();
  });

  it('gives each menu on a page an id of its own, so two do not control each other', () => {
    render(
      <OxygenUIThemeProvider>
        {menu('Ada Lovelace')}
        {menu('Grace Hopper')}
      </OxygenUIThemeProvider>,
    );

    const [first, second] = screen.getAllByRole('button', { name: 'Account' });
    fireEvent.click(first);
    const firstId = first.getAttribute('aria-controls');
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    fireEvent.click(second);
    const secondId = second.getAttribute('aria-controls');

    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(firstId).not.toBe(secondId);
  });

  it('does not use a fixed id', () => {
    render(<OxygenUIThemeProvider>{menu('Ada Lovelace')}</OxygenUIThemeProvider>);

    fireEvent.click(screen.getByRole('button', { name: 'Account' }));

    expect(document.getElementById('user-menu')).toBeNull();
  });
});
