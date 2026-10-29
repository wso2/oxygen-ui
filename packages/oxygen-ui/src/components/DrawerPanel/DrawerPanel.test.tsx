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

  it('calls onClose from the close button', () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // jsdom ignores media queries, so the expand button keeps its xs `display: none`
  // and is not exposed by role; query it by label instead.
  it('toggles the expand button label when uncontrolled', () => {
    renderPanel();
    fireEvent.click(screen.getByLabelText('Expand'));
    expect(screen.getByLabelText('Collapse')).toBeDefined();
  });

  it('reports expand changes without changing state when controlled', () => {
    const onExpandedChange = vi.fn();
    renderPanel({ expanded: false, onExpandedChange });
    fireEvent.click(screen.getByLabelText('Expand'));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText('Expand')).toBeDefined();
  });

  it('throws when sub-components are used outside DrawerPanel', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderWithTheme(<DrawerPanel.CloseButton />)).toThrow(
      'DrawerPanel compound components must be used within DrawerPanel',
    );
    vi.restoreAllMocks();
  });
});
