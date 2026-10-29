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
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import DrawerPanel from './DrawerPanel';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

const renderPanel = (props: Partial<React.ComponentProps<typeof DrawerPanel>> = {}) =>
  renderWithTheme(
    <DrawerPanel open onClose={() => {}} {...props}>
      <DrawerPanel.Header>
        <DrawerPanel.Title>Build details</DrawerPanel.Title>
        <DrawerPanel.Actions>
          <DrawerPanel.ExpandButton />
          <DrawerPanel.CloseButton />
        </DrawerPanel.Actions>
      </DrawerPanel.Header>
      <DrawerPanel.Body>Content</DrawerPanel.Body>
    </DrawerPanel>,
  );

// jsdom does not apply stylesheet media queries, so read the sm+ paper width
// from the CSS rule Emotion generated for the drawer root's class.
const getSmPaperWidth = (): string | undefined => {
  const root = document.querySelector('.MuiDrawer-root');
  const rootClass = Array.from(root?.classList ?? []).find((c) => c.startsWith('css-'));
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n');
  const rule = new RegExp(
    `@media \\(min-width:600px\\)\\{\\.${rootClass} \\.MuiDrawer-paper\\{width:([^;}]+);`,
  );
  return css.match(rule)?.[1];
};

describe('DrawerPanel', () => {
  it('names the drawer dialog from its title', () => {
    renderPanel();
    expect(screen.getByRole('dialog', { name: 'Build details' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: 'Build details' })).toBeDefined();
  });

  it('lets consumers set the accessible name with aria-label', () => {
    renderPanel({ 'aria-label': 'Pipeline run' });
    expect(screen.getByRole('dialog', { name: 'Pipeline run' })).toBeDefined();
  });

  it('exposes a persistent drawer as a named region', () => {
    renderPanel({ variant: 'persistent' });
    expect(screen.getByRole('region', { name: 'Build details' })).toBeDefined();
  });

  it('calls onClose from the close button', () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose once when Escape is pressed', () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose once when the backdrop is clicked', () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    const backdrop = document.querySelector('.MuiBackdrop-root');
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // jsdom ignores media queries, so the expand button keeps its xs `display: none`
  // and is not exposed by role; query it by label instead.
  it('toggles the expand button label and paper width when uncontrolled', () => {
    renderPanel();
    expect(getSmPaperWidth()).toBe('560px');
    fireEvent.click(screen.getByLabelText('Expand'));
    expect(screen.getByLabelText('Collapse')).toBeDefined();
    expect(getSmPaperWidth()).toBe('100%');
  });

  it('reports expand changes without changing state when controlled', () => {
    const onExpandedChange = vi.fn();
    renderPanel({ expanded: false, onExpandedChange });
    fireEvent.click(screen.getByLabelText('Expand'));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText('Expand')).toBeDefined();
    expect(getSmPaperWidth()).toBe('560px');
  });

  it('uses expandedWidth for the sm+ paper width when expanded', () => {
    renderPanel({ expanded: true, expandedWidth: 960 });
    expect(getSmPaperWidth()).toBe('960px');
  });

  it('throws when sub-components are used outside DrawerPanel', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderWithTheme(<DrawerPanel.CloseButton />)).toThrow(
      'DrawerPanel compound components must be used within DrawerPanel',
    );
    vi.restoreAllMocks();
  });
});
