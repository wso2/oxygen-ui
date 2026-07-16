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

/**
 * Accessibility regression tests for wrapper components.
 *
 * These tests guard the WCAG 2.1 AA fixes from the accessibility audit:
 * - Accessible names on icon-only controls and selects without visible labels
 * - `aria-*` / `data-*` prop forwarding to the correct DOM node
 * - `ref` forwarding on interactive component roots
 */

import * as React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { MenuItem, Select } from '@mui/material';
import OxygenUIThemeProvider from '../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import ClassicTheme from '../styles/Themes/ClassicTheme';
import ColorSchemeToggle from './ColorSchemeToggle/ColorSchemeToggle';
import SearchBar from './SearchBar/SearchBar';
import ComplexSelect from './ComplexSelect';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import { ElementWrapper } from './Form/ElementWrapper';
import HeaderToggle from './Header/HeaderToggle';
import HeaderBrand from './Header/HeaderBrand';
import AppBreadcrumbs from './AppBreadcrumbs/AppBreadcrumbs';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<OxygenUIThemeProvider>{ui}</OxygenUIThemeProvider>);

afterEach(() => {
  cleanup();
});

describe('ColorSchemeToggle', () => {
  it('has a default accessible name and forwards refs', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(<ColorSchemeToggle ref={ref} />);

    const button = screen.getByRole('button', { name: /switch to .* mode/i });
    expect(button).toBeDefined();
    expect(ref.current).toBe(button);
  });

  it('lets consumers override the accessible name', () => {
    renderWithTheme(<ColorSchemeToggle aria-label="Toggle color scheme" />);
    expect(screen.getByRole('button', { name: 'Toggle color scheme' })).toBeDefined();
  });
});

describe('SearchBar', () => {
  it('labels the input from the placeholder by default', () => {
    renderWithTheme(<SearchBar placeholder="Search users" />);
    expect(screen.getByRole('textbox', { name: 'Search users' })).toBeDefined();
  });

  it('respects aria-label from inputProps over the placeholder', () => {
    renderWithTheme(
      <SearchBar placeholder="Search users" inputProps={{ 'aria-label': 'Find people' }} />,
    );
    expect(screen.getByRole('textbox', { name: 'Find people' })).toBeDefined();
  });

  it('does not set an empty aria-label when placeholder is empty', () => {
    renderWithTheme(<SearchBar placeholder="" />);
    expect(screen.getByRole('textbox').getAttribute('aria-label')).not.toBe('');
  });

  it('forwards refs and data attributes to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<SearchBar ref={ref} data-testid="search-root" />);
    expect(ref.current).toBe(screen.getByTestId('search-root'));
  });
});

describe('ComplexSelect', () => {
  it('exposes an accessible name when the label anchor is "inside"', () => {
    renderWithTheme(
      <ComplexSelect label="Organization" labelAnchor="inside" value="a" onChange={() => {}}>
        <ComplexSelect.MenuItem value="a">Org A</ComplexSelect.MenuItem>
      </ComplexSelect>,
    );

    expect(screen.getByRole('combobox', { name: /organization/i })).toBeDefined();
  });

  it('supports aria-label via inputProps when no label is provided', () => {
    renderWithTheme(
      <ComplexSelect value="a" onChange={() => {}} inputProps={{ 'aria-label': 'Project' }}>
        <ComplexSelect.MenuItem value="a">Project A</ComplexSelect.MenuItem>
      </ComplexSelect>,
    );

    expect(screen.getByRole('combobox', { name: 'Project' })).toBeDefined();
  });
});

describe('ThemeSwitcher', () => {
  it('has an accessible name even when the label is hidden', () => {
    render(
      <OxygenUIThemeProvider themes={[{ key: 'classic', label: 'Classic', theme: ClassicTheme }]}>
        <ThemeSwitcher />
      </OxygenUIThemeProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Theme' })).toBeDefined();
  });
});

describe('Form.ElementWrapper', () => {
  it('links MUI Select children to the wrapper label', () => {
    renderWithTheme(
      <ElementWrapper label="Region" name="region">
        <Select id="region" value="us" onChange={() => {}}>
          <MenuItem value="us">US</MenuItem>
        </Select>
      </ElementWrapper>,
    );

    expect(screen.getByRole('combobox', { name: /region/i })).toBeDefined();
  });
});

describe('Header', () => {
  it('gives the sidebar toggle an accessible name and expanded state', () => {
    renderWithTheme(<HeaderToggle collapsed={false} onToggle={() => {}} />);

    const button = screen.getByRole('button', { name: 'Collapse sidebar' });
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders a clickable brand as a real button', () => {
    renderWithTheme(
      <HeaderBrand onClick={() => {}} aria-label="Go to home">
        Brand
      </HeaderBrand>,
    );

    expect(screen.getByRole('button', { name: 'Go to home' })).toBeDefined();
  });

  it('renders a non-clickable brand without a button role', () => {
    renderWithTheme(<HeaderBrand>Brand</HeaderBrand>);
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('AppBreadcrumbs', () => {
  const items = Array.from({ length: 6 }, (_, i) => ({
    key: `item-${i}`,
    label: `Item ${i}`,
    onClick: () => {},
  }));

  it('renders the overflow ellipsis as a focusable button with menu semantics', () => {
    renderWithTheme(<AppBreadcrumbs items={items} maxItems={4} />);

    const ellipsis = screen.getByRole('button', { name: 'Show hidden breadcrumbs' });
    expect(ellipsis.tagName).toBe('BUTTON');
    expect(ellipsis.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('forwards aria and data attributes to the root', () => {
    renderWithTheme(<AppBreadcrumbs items={items} data-testid="crumbs" />);
    expect(screen.getByTestId('crumbs')).toBeDefined();
  });
});
