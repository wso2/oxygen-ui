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

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import type { UseAppShellReturn } from '../../hooks/useAppShell/useAppShell';
import Header from '../Header/Header';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import Sidebar from '../Sidebar/Sidebar';
import { AppShellProvider } from './context';
import { useOptionalAppShell } from './internal';

afterEach(() => {
  cleanup();
});

/** A shell whose actions are spies, so what a consumer calls can be read back. */
const fakeShell = (state: Partial<UseAppShellReturn['state']> = {}) => {
  const actions = {
    toggleSidebar: vi.fn(),
    setSidebarCollapsed: vi.fn(),
    collapseSidebar: vi.fn(),
    expandSidebar: vi.fn(),
    toggleNotificationPanel: vi.fn(),
    setActiveMenuItem: vi.fn(),
    toggleMenu: vi.fn(),
  };
  const shell: UseAppShellReturn = {
    state: {
      sidebarCollapsed: false,
      notificationPanelOpen: false,
      activeMenuItem: 'dashboard',
      expandedMenus: {},
      sidebarWidth: 250,
      sidebarCollapsedWidth: 64,
      ...state,
    },
    actions,
  };

  return { shell, actions };
};

const inShell = (ui: React.ReactElement, shell?: UseAppShellReturn) =>
  render(<OxygenUIThemeProvider>{shell ? <AppShellProvider value={shell}>{ui}</AppShellProvider> : ui}</OxygenUIThemeProvider>);

describe('useOptionalAppShell', () => {
  it('is undefined outside a shell and the shell inside one', () => {
    const seen: unknown[] = [];
    const Probe = () => {
      seen.push(useOptionalAppShell());

      return null;
    };
    const { shell } = fakeShell();

    inShell(<Probe />);
    inShell(<Probe />, shell);

    expect(seen).toEqual([undefined, shell]);
  });
});

describe('the toggle in the header', () => {
  it('uses the shell for its state and its action when it is given neither', () => {
    const { shell, actions } = fakeShell({ sidebarCollapsed: true });

    inShell(<Header.Toggle />, shell);

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(button);
    expect(actions.toggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('takes its props before the shell', () => {
    const { shell, actions } = fakeShell({ sidebarCollapsed: true });
    const onToggle = vi.fn();

    inShell(<Header.Toggle collapsed={false} onToggle={onToggle} />, shell);

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(actions.toggleSidebar).not.toHaveBeenCalled();
  });

  it('is expanded and does nothing on its own, outside a shell and without props', () => {
    inShell(<Header.Toggle />);

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});

describe('the sidebar', () => {
  const sidebar = (props: React.ComponentProps<typeof Sidebar> = {}) => (
    <Sidebar {...props}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Sidebar.Item id="projects">
            <Sidebar.ItemLabel>Projects</Sidebar.ItemLabel>
          </Sidebar.Item>
        </Sidebar.Category>
      </Sidebar.Nav>
      <Sidebar.Footer>
        <Sidebar.CollapseToggle />
      </Sidebar.Footer>
    </Sidebar>
  );

  it('reports a chosen item to the shell when it is given no onSelect', () => {
    const { shell, actions } = fakeShell();

    inShell(sidebar(), shell);
    fireEvent.click(screen.getByText('Projects'));

    expect(actions.setActiveMenuItem).toHaveBeenCalledWith('projects');
  });

  it('reports a chosen item to its own onSelect, and not to the shell, when it has one', () => {
    const { shell, actions } = fakeShell();
    const onSelect = vi.fn();

    inShell(sidebar({ onSelect }), shell);
    fireEvent.click(screen.getByText('Projects'));

    expect(onSelect).toHaveBeenCalledWith('projects');
    expect(actions.setActiveMenuItem).not.toHaveBeenCalled();
  });

  it('toggles through the shell from its collapse toggle without being wired', () => {
    const { shell, actions } = fakeShell();

    inShell(sidebar(), shell);
    fireEvent.click(screen.getByRole('button', { name: /collapse/i }));

    expect(actions.toggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('is collapsed by the shell unless it is told otherwise', () => {
    const { shell } = fakeShell({ sidebarCollapsed: true });

    inShell(sidebar(), shell);
    expect(screen.getByRole('button', { name: /expand/i })).toBeDefined();
    cleanup();

    inShell(sidebar({ collapsed: false }), shell);
    expect(screen.getByRole('button', { name: /collapse/i })).toBeDefined();
  });

  it('is expanded outside a shell', () => {
    inShell(sidebar());

    expect(screen.getByRole('button', { name: /collapse/i })).toBeDefined();
  });
});

describe('the notification panel', () => {
  const panel = (props: React.ComponentProps<typeof NotificationPanel> = {}) => (
    <NotificationPanel {...props}>
      <NotificationPanel.Header>
        <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
        <NotificationPanel.HeaderClose />
      </NotificationPanel.Header>
    </NotificationPanel>
  );

  it('is open when the shell says it is, and closes through the shell', () => {
    const { shell, actions } = fakeShell({ notificationPanelOpen: true });

    inShell(panel(), shell);
    fireEvent.click(screen.getByRole('button', { name: /close notifications/i }));

    expect(actions.toggleNotificationPanel).toHaveBeenCalledTimes(1);
  });

  it('takes its open prop and its onClose before the shell', () => {
    const { shell, actions } = fakeShell({ notificationPanelOpen: true });
    const onClose = vi.fn();

    inShell(panel({ open: true, onClose }), shell);
    fireEvent.click(screen.getByRole('button', { name: /close notifications/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(actions.toggleNotificationPanel).not.toHaveBeenCalled();
  });

  it('stays closed for a prop that says so, whatever the shell says', () => {
    const { shell } = fakeShell({ notificationPanelOpen: true });

    inShell(panel({ open: false }), shell);

    expect(screen.queryByRole('button', { name: /close notifications/i })).toBeNull();
  });
});
