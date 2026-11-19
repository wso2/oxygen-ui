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

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import Sidebar from './Sidebar';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const sidebar = (props: Partial<React.ComponentProps<typeof Sidebar>> = {}) => (
  <OxygenUIThemeProvider>
    <Sidebar collapsed activeItem="" expandedMenus={{}} onSelect={() => undefined} {...props}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Sidebar.Item id="projects">
            <Sidebar.ItemLabel>Projects</Sidebar.ItemLabel>
            <Sidebar.Item id="overview">
              <Sidebar.ItemLabel>Overview</Sidebar.ItemLabel>
            </Sidebar.Item>
          </Sidebar.Item>
          <Sidebar.Item id="settings">
            <Sidebar.ItemLabel>Settings</Sidebar.ItemLabel>
          </Sidebar.Item>
        </Sidebar.Category>
      </Sidebar.Nav>
    </Sidebar>
  </OxygenUIThemeProvider>
);

// An open popover marks the rest of the page hidden from assistive technology, the rail included.
const rail = () => screen.getByRole('button', { name: 'Projects', hidden: true });
const rootOf = (button: HTMLElement) => button.closest('li') as HTMLElement;
const isOpen = () => screen.queryByText('Overview') !== null;
const wait = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
// A popover that closes is removed after its exit transition, which starts once the close has rendered.
const settle = () => {
  wait(1000);
  wait(1000);
};

describe('a sidebar item with nested items, on the collapsed rail', () => {
  it('opens its nested items when the pointer enters, and keeps its expanded state in step', () => {
    const onToggleExpand = vi.fn();
    render(sidebar({ onToggleExpand }));

    expect(isOpen()).toBe(false);
    fireEvent.mouseEnter(rootOf(rail()));

    expect(isOpen()).toBe(true);
    expect(onToggleExpand).toHaveBeenCalledTimes(1);
    expect(onToggleExpand).toHaveBeenCalledWith('projects');
  });

  it('does not flip the expanded state when it is already expanded', () => {
    const onToggleExpand = vi.fn();
    render(sidebar({ onToggleExpand, expandedMenus: { projects: true } }));

    fireEvent.mouseEnter(rootOf(rail()));

    expect(isOpen()).toBe(true);
    expect(onToggleExpand).not.toHaveBeenCalled();
  });

  it('closes a moment after the pointer leaves, not before', () => {
    render(sidebar());

    fireEvent.mouseEnter(rootOf(rail()));
    fireEvent.mouseLeave(rootOf(rail()));
    wait(99);
    expect(isOpen()).toBe(true);

    settle();
    expect(isOpen()).toBe(false);
  });

  it('stays open when the pointer goes on to the popover, and closes after it leaves that', () => {
    render(sidebar());

    fireEvent.mouseEnter(rootOf(rail()));
    fireEvent.mouseLeave(rootOf(rail()));
    const paper = screen.getByText('Overview').closest('.MuiPopover-paper') as HTMLElement;
    wait(50);
    fireEvent.mouseEnter(paper);
    wait(1000);
    expect(isOpen()).toBe(true);

    fireEvent.mouseLeave(paper);
    settle();
    expect(isOpen()).toBe(false);
  });

  it('opens on a click, and stays open when the pointer leaves', () => {
    const onToggleExpand = vi.fn();
    render(sidebar({ onToggleExpand }));

    fireEvent.click(rail());
    expect(isOpen()).toBe(true);
    expect(rail().getAttribute('aria-expanded')).toBe('true');
    expect(onToggleExpand).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(rootOf(rail()));
    wait(1000);
    expect(isOpen()).toBe(true);
  });

  it('closes on a second click, keeping the expanded state in step', () => {
    const onToggleExpand = vi.fn();
    const { rerender } = render(sidebar({ onToggleExpand }));

    fireEvent.click(rail());
    rerender(sidebar({ onToggleExpand, expandedMenus: { projects: true } }));
    fireEvent.click(rail());
    settle();

    expect(isOpen()).toBe(false);
    expect(onToggleExpand).toHaveBeenCalledTimes(2);
  });

  it('closes on a click while it is only open from a hover', () => {
    render(sidebar());

    fireEvent.mouseEnter(rootOf(rail()));
    fireEvent.click(rail());
    settle();

    expect(isOpen()).toBe(false);
  });

  it('selects a nested item from the popover, and closes', () => {
    const onSelect = vi.fn();
    render(sidebar({ onSelect }));

    fireEvent.click(rail());
    fireEvent.click(screen.getByText('Overview'));
    settle();

    expect(onSelect).toHaveBeenCalledWith('overview');
    expect(isOpen()).toBe(false);
  });

  it('closes when the sidebar is expanded, and does not reopen when it is collapsed again', () => {
    const { rerender } = render(sidebar());

    fireEvent.click(rail());
    expect(isOpen()).toBe(true);

    rerender(sidebar({ collapsed: false }));
    rerender(sidebar({ collapsed: true }));
    settle();

    expect(isOpen()).toBe(false);
  });
});

describe('a sidebar item in the full sidebar', () => {
  it('toggles its nested items on a click instead of opening a popover', () => {
    const onToggleExpand = vi.fn();
    render(sidebar({ collapsed: false, onToggleExpand }));

    fireEvent.click(screen.getByRole('button', { name: /projects/i }));

    expect(onToggleExpand).toHaveBeenCalledWith('projects');
    expect(document.querySelector('.MuiPopover-paper')).toBeNull();
  });

  it('does not open a popover when the pointer enters', () => {
    render(sidebar({ collapsed: false }));

    fireEvent.mouseEnter(rootOf(screen.getByRole('button', { name: /projects/i })));

    expect(document.querySelector('.MuiPopover-paper')).toBeNull();
  });

  it('selects an item that has no nested items on a click, expanded or collapsed', () => {
    const onSelect = vi.fn();
    const { rerender } = render(sidebar({ onSelect, collapsed: false }));

    fireEvent.click(screen.getByRole('button', { name: /settings/i }));
    rerender(sidebar({ onSelect, collapsed: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    expect(onSelect).toHaveBeenNthCalledWith(1, 'settings');
    expect(onSelect).toHaveBeenNthCalledWith(2, 'settings');
  });
});
