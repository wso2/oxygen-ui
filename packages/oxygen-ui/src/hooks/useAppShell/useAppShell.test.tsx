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

import { act, renderHook } from '@testing-library/react';
import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppShellProvider } from '../../components/AppShell/context';
import { useAppShell, type UseAppShellOptions, type UseAppShellReturn } from './useAppShell';

const media = vi.hoisted(() => ({ isMobile: false }));

vi.mock('@mui/material/useMediaQuery', () => ({ default: () => media.isMobile }));

beforeEach(() => {
  media.isMobile = false;
});

const create = (options: UseAppShellOptions = {}) => renderHook((props: UseAppShellOptions) => useAppShell(props), { initialProps: options });

describe('useAppShell, creating a shell', () => {
  it('starts expanded on the dashboard with the default widths and nothing open', () => {
    const { result } = create();

    expect(result.current.state).toEqual({
      sidebarCollapsed: false,
      notificationPanelOpen: false,
      activeMenuItem: 'dashboard',
      expandedMenus: {},
      sidebarWidth: 250,
      sidebarCollapsedWidth: 64,
    });
  });

  it('takes its starting state from the options', () => {
    const { result } = create({ initialCollapsed: true, initialActiveItem: 'projects', sidebarWidth: 300, sidebarCollapsedWidth: 48 });

    expect(result.current.state).toMatchObject({ sidebarCollapsed: true, activeMenuItem: 'projects', sidebarWidth: 300, sidebarCollapsedWidth: 48 });
  });

  it('collapses, expands, toggles and sets the sidebar', () => {
    const { result } = create();

    act(() => result.current.actions.collapseSidebar());
    expect(result.current.state.sidebarCollapsed).toBe(true);
    act(() => result.current.actions.expandSidebar());
    expect(result.current.state.sidebarCollapsed).toBe(false);
    act(() => result.current.actions.toggleSidebar());
    expect(result.current.state.sidebarCollapsed).toBe(true);
    act(() => result.current.actions.setSidebarCollapsed(false));
    expect(result.current.state.sidebarCollapsed).toBe(false);
  });

  it('toggles the notification panel', () => {
    const { result } = create();

    act(() => result.current.actions.toggleNotificationPanel());
    expect(result.current.state.notificationPanelOpen).toBe(true);
    act(() => result.current.actions.toggleNotificationPanel());
    expect(result.current.state.notificationPanelOpen).toBe(false);
  });

  it('sets the active menu item and toggles menus independently', () => {
    const { result } = create();

    act(() => result.current.actions.setActiveMenuItem('projects'));
    act(() => result.current.actions.toggleMenu('settings'));
    act(() => result.current.actions.toggleMenu('billing'));
    act(() => result.current.actions.toggleMenu('settings'));

    expect(result.current.state.activeMenuItem).toBe('projects');
    expect(result.current.state.expandedMenus).toEqual({ settings: false, billing: true });
  });

  it('keeps the same actions across state changes, so a consumer can depend on them', () => {
    const { result } = create();
    const before = result.current.actions;

    act(() => result.current.actions.toggleSidebar());

    expect(result.current.actions).toBe(before);
  });
});

describe('useAppShell, on a narrow screen', () => {
  it('collapses the sidebar when the screen is narrow, by default', () => {
    media.isMobile = true;

    expect(create().result.current.state.sidebarCollapsed).toBe(true);
  });

  it('leaves the sidebar alone when told not to collapse on mobile', () => {
    media.isMobile = true;

    expect(create({ collapseOnMobile: false }).result.current.state.sidebarCollapsed).toBe(false);
  });

  it('collapses an open sidebar when a menu item is chosen', () => {
    media.isMobile = true;
    const { result } = create({ collapseOnMobile: false });

    act(() => result.current.actions.setActiveMenuItem('projects'));

    expect(result.current.state).toMatchObject({ activeMenuItem: 'projects', sidebarCollapsed: true });
  });

  it('keeps the sidebar open on a choice when told not to collapse on select', () => {
    media.isMobile = true;
    const { result } = create({ collapseOnMobile: false, collapseOnSelectOnMobile: false });

    act(() => result.current.actions.setActiveMenuItem('projects'));

    expect(result.current.state.sidebarCollapsed).toBe(false);
  });

  it('does not collapse on a choice on a wide screen', () => {
    const { result } = create();

    act(() => result.current.actions.setActiveMenuItem('projects'));

    expect(result.current.state.sidebarCollapsed).toBe(false);
  });
});

describe('useAppShell, in a shell it does not create', () => {
  const shell = { state: { sidebarCollapsed: true }, actions: {} } as unknown as UseAppShellReturn;

  it('returns the shared shell when called without options', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AppShellProvider value={shell}>{children}</AppShellProvider>;
    const { result } = renderHook(() => useAppShell(), { wrapper });

    expect(result.current).toBe(shell);
  });

  it('is not changed by a shell around it when called with options', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AppShellProvider value={shell}>{children}</AppShellProvider>;
    const { result } = renderHook(() => useAppShell({ initialCollapsed: false }), { wrapper });

    expect(result.current).not.toBe(shell);
    expect(result.current.state.sidebarCollapsed).toBe(false);
  });

  it('says what to do when called without options outside a shell', () => {
    const quiet = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => renderHook(() => useAppShell())).toThrow(/must be used within an <AppShell>/);

    quiet.mockRestore();
  });
});
