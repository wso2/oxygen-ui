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
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import { UserMenu } from './UserMenu';

const renderOpenUserMenu = (onLogoutClick?: () => void) => {
  render(
    <OxygenUIThemeProvider>
      <UserMenu>
        <UserMenu.Trigger name="Ada Lovelace" />
        <UserMenu.Item
          icon={<span data-testid="item-icon" aria-hidden="true" />}
          label="Profile"
        />
        <UserMenu.Logout
          icon={<span data-testid="logout-icon" aria-hidden="true" />}
          onClick={onLogoutClick}
        />
      </UserMenu>
    </OxygenUIThemeProvider>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Account' }));
};

afterEach(() => {
  cleanup();
});

const styleValuesFor = (element: Element, pseudo?: string): string[] => {
  const classNames = Array.from(element.classList);
  const values: string[] = [];

  for (const sheet of Array.from(document.styleSheets)) {
    let cssRules: CSSRuleList;
    try {
      cssRules = sheet.cssRules;
    } catch {
      continue;
    }

    for (const rule of Array.from(cssRules)) {
      if (!(rule instanceof CSSStyleRule)) {
        continue;
      }
      if (!classNames.some((className) => rule.selectorText.includes(`.${className}`))) {
        continue;
      }
      if (pseudo && !rule.selectorText.includes(pseudo)) {
        continue;
      }
      if (rule.style.color) {
        values.push(rule.style.color);
      }
      if (rule.style.backgroundColor) {
        values.push(rule.style.backgroundColor);
      }
    }
  }

  return values;
};

describe('UserMenu.Logout', () => {
  it('uses the same rest colour as UserMenu.Item', () => {
    renderOpenUserMenu();

    const item = screen.getByRole('menuitem', { name: 'Profile' });
    const logout = screen.getByRole('menuitem', { name: 'Log out' });
    const itemColor = getComputedStyle(item).color;
    const itemIconColor = getComputedStyle(screen.getByTestId('item-icon').parentElement as Element)
      .color;
    const logoutIconColor = getComputedStyle(
      screen.getByTestId('logout-icon').parentElement as Element,
    ).color;

    expect(itemColor).not.toBe('');
    expect(getComputedStyle(logout).color).toBe(itemColor);
    expect(getComputedStyle(logout).backgroundColor).toBe(getComputedStyle(item).backgroundColor);
    expect(logoutIconColor).toBe(itemIconColor);
  });

  it('uses the same hover colours as UserMenu.Item, without error or primary fill', () => {
    renderOpenUserMenu();

    const item = screen.getByRole('menuitem', { name: 'Profile' });
    const logout = screen.getByRole('menuitem', { name: 'Log out' });
    const itemHover = styleValuesFor(item, ':hover');
    const logoutHover = styleValuesFor(logout, ':hover');

    expect(itemHover.length).toBeGreaterThan(0);
    expect(logoutHover).toEqual(itemHover);
    expect(logoutHover.join(' ')).not.toMatch(/error/i);
    expect(logoutHover.join(' ')).not.toMatch(/--oxygen-palette-primary-main(?!Channel)/);
  });

  it('closes the menu and invokes onClick', () => {
    const onClick = vi.fn();
    renderOpenUserMenu(onClick);

    fireEvent.click(screen.getByRole('menuitem', { name: 'Log out' }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menuitem', { name: 'Log out' })).toBeNull();
  });
});
