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

import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import OxygenUIThemeProvider from '../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import AppShell from '../components/AppShell/AppShell';
import NotificationPanel from '../components/NotificationPanel/NotificationPanel';
import Sidebar from '../components/Sidebar/Sidebar';
import { displayNameOf, flattenChildren, lastPartNamed, sortParts, textOf } from './compoundParts';

afterEach(cleanup);

const Part: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
Part.displayName = 'Part';
const Other: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
Other.displayName = 'Other';

describe('compoundParts', () => {
  it('finds a part by its displayName', () => {
    expect(displayNameOf(<Part />)).toBe('Part');
    expect(displayNameOf('text')).toBeUndefined();
    expect(displayNameOf(<div />)).toBeUndefined();
  });

  it('flattens fragments, nested ones too, and keeps keys unique', () => {
    const flat = flattenChildren(
      <>
        <Part key="a" />
        <>
          <Part key="a" />
          <Other />
        </>
        <>
          <Part key="a" />
        </>
      </>
    );
    const keys = flat.map((child) => (child as React.ReactElement).key);
    expect(flat).toHaveLength(4);
    expect(new Set(keys).size).toBe(4);
  });

  it('sorts parts from the rest, in order, looking inside fragments', () => {
    const { parts, rest } = sortParts(
      <>
        text
        <Part>1</Part>
        <>
          <Other />
          <Part>2</Part>
        </>
      </>,
      ['Part']
    );
    expect(parts.map(textOf)).toEqual(['1', '2']);
    expect(rest).toHaveLength(2);
  });

  it('lets a repeated part replace the one before it', () => {
    const { parts } = sortParts([<Part key="1">first</Part>, <Part key="2">second</Part>], ['Part']);
    expect(textOf(lastPartNamed(parts, 'Part'))).toBe('second');
    expect(lastPartNamed(parts, 'Missing')).toBeUndefined();
    expect(textOf(undefined)).toBe('');
  });
});

describe('compound components find parts wrapped in a fragment', () => {
  it('Sidebar.Item takes a wrapped label as its label, not as a nested item', () => {
    render(
      <OxygenUIThemeProvider>
        <Sidebar collapsed={false} activeItem="" expandedMenus={{}} onSelect={() => undefined}>
          <Sidebar.Nav>
            <Sidebar.Category>
              <Sidebar.Item id="home">
                <>
                  <Sidebar.ItemLabel>Home</Sidebar.ItemLabel>
                </>
              </Sidebar.Item>
            </Sidebar.Category>
          </Sidebar.Nav>
        </Sidebar>
      </OxygenUIThemeProvider>
    );
    expect(screen.getByRole('button', { name: 'Home' })).toBeTruthy();
  });

  it('Sidebar.User shows a wrapped name', () => {
    render(
      <OxygenUIThemeProvider>
        <Sidebar collapsed={false} activeItem="" expandedMenus={{}} onSelect={() => undefined}>
          <Sidebar.Footer>
            <Sidebar.User>
              <>
                <Sidebar.UserName>Jane Doe</Sidebar.UserName>
              </>
            </Sidebar.User>
          </Sidebar.Footer>
        </Sidebar>
      </OxygenUIThemeProvider>
    );
    expect(screen.getByText('Jane Doe')).toBeTruthy();
  });

  it('NotificationPanel.Header puts a wrapped close button in the close position', () => {
    render(
      <OxygenUIThemeProvider>
        <NotificationPanel open onClose={() => undefined}>
          <NotificationPanel.Header>
            <>
              <NotificationPanel.HeaderTitle>Inbox</NotificationPanel.HeaderTitle>
              <NotificationPanel.HeaderClose />
            </>
          </NotificationPanel.Header>
        </NotificationPanel>
      </OxygenUIThemeProvider>
    );
    const title = screen.getByText('Inbox');
    const close = screen.getByRole('button', { name: /close/i });
    expect(title.parentElement?.contains(close)).toBe(false);
  });

  it('NotificationPanel.Item shows wrapped title and message', () => {
    render(
      <OxygenUIThemeProvider>
        <NotificationPanel open onClose={() => undefined}>
          <NotificationPanel.List>
            <NotificationPanel.Item id="1" type="info">
              <>
                <NotificationPanel.ItemTitle>New feature</NotificationPanel.ItemTitle>
                <NotificationPanel.ItemMessage>Check it out</NotificationPanel.ItemMessage>
              </>
            </NotificationPanel.Item>
          </NotificationPanel.List>
        </NotificationPanel>
      </OxygenUIThemeProvider>
    );
    expect(screen.getByText('New feature')).toBeTruthy();
    expect(screen.getByText('Check it out')).toBeTruthy();
  });

  it('AppShell takes wrapped slots', () => {
    render(
      <OxygenUIThemeProvider>
        <AppShell>
          <>
            <AppShell.Navbar>Top bar</AppShell.Navbar>
            <AppShell.Main>Page body</AppShell.Main>
          </>
        </AppShell>
      </OxygenUIThemeProvider>
    );
    expect(screen.getByText('Top bar')).toBeTruthy();
    expect(screen.getByText('Page body')).toBeTruthy();
  });
});
