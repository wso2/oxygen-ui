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
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
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
import ListingTableToolbar from './ListingTable/shared/ListingTableToolbar';
import UserMenu from './UserMenu/UserMenu';
import AppSwitcher from './AppSwitcher/AppSwitcher';
import type { AppSwitcherProps } from './AppSwitcher/AppSwitcher';
import type { AppSwitcherAppProps } from './AppSwitcher/AppSwitcherApp';
import type { AppSwitcherFooterProps } from './AppSwitcher/AppSwitcherFooter';
import NotificationPanel from './NotificationPanel/NotificationPanel';
import { useNotificationPanel } from './NotificationPanel/context';

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

  it('respects aria-label from slotProps.htmlInput over the placeholder', () => {
    renderWithTheme(
      <SearchBar
        placeholder="Search users"
        slotProps={{ htmlInput: { 'aria-label': 'Find people' } }}
      />,
    );
    expect(screen.getByRole('textbox', { name: 'Find people' })).toBeDefined();
  });

  it('respects a top-level aria-label over the placeholder', () => {
    renderWithTheme(<SearchBar placeholder="Search users" aria-label="Find people" />);
    expect(screen.getByRole('textbox', { name: 'Find people' })).toBeDefined();
  });

  it('does not set an empty aria-label when placeholder is empty', () => {
    renderWithTheme(<SearchBar placeholder="" />);
    expect(screen.getByRole('textbox').getAttribute('aria-label')).not.toBe('');
  });

  it('keeps the placeholder aria-label when slotProps.htmlInput has an empty aria-label', () => {
    renderWithTheme(
      <SearchBar
        placeholder="Search users"
        slotProps={{ htmlInput: { 'aria-label': '' } }}
      />,
    );
    expect(screen.getByRole('textbox', { name: 'Search users' })).toBeDefined();
  });

  it('keeps the placeholder aria-label when aria-label is whitespace-only', () => {
    renderWithTheme(<SearchBar placeholder="Search users" aria-label="   " />);
    expect(screen.getByRole('textbox', { name: 'Search users' })).toBeDefined();
  });

  it('forwards refs and data attributes to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<SearchBar ref={ref} data-testid="search-root" />);
    expect(ref.current).toBe(screen.getByTestId('search-root'));
  });
});

describe('ListingTableToolbar', () => {
  it('labels the search input from the placeholder by default', () => {
    renderWithTheme(<ListingTableToolbar showSearch searchPlaceholder="Search users" />);
    expect(screen.getByRole('textbox', { name: 'Search users' })).toBeDefined();
  });

  it('does not set an empty aria-label when searchPlaceholder is empty', () => {
    renderWithTheme(<ListingTableToolbar showSearch searchPlaceholder="" />);
    expect(screen.getByRole('textbox').getAttribute('aria-label')).not.toBe('');
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeDefined();
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

  it('supports aria-label via slotProps.input when no label is provided', () => {
    renderWithTheme(
      <ComplexSelect
        value="a"
        onChange={() => {}}
        slotProps={{ input: { 'aria-label': 'Project' } }}
      >
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

describe('UserMenu.Trigger', () => {
  it('keeps menu ARIA state after consumer props that try to override it', () => {
    renderWithTheme(
      <UserMenu>
        <UserMenu.Trigger name="Ada Lovelace" aria-expanded="false" aria-label="" />
      </UserMenu>,
    );

    const trigger = screen.getByRole('button', { name: 'Account' });
    expect(trigger.getAttribute('aria-expanded')).toBeNull();

    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe('user-menu');
    expect(trigger.getAttribute('aria-label')).toBe('Account');
  });
});

describe('AppSwitcher', () => {
  type AppEntry = AppSwitcherAppProps & { key: string };
  type SwitcherConfig = Partial<AppSwitcherProps> & {
    apps?: AppEntry[];
    footer?: AppSwitcherFooterProps | null;
    label?: string;
    triggerLabel?: string;
    columns?: number;
  };

  const APPS: AppEntry[] = [{ key: 'api', name: 'API Platform', url: 'https://api.wso2.com' }];
  const FOOTER: AppSwitcherFooterProps = {
    links: [{ key: 'billing', name: 'Billing', url: 'https://console.wso2.com/billing' }],
  };

  // Most cases vary one part of an otherwise standard switcher, so they pass a
  // description of it rather than repeating the whole tree. `footer: null`
  // drops the manage row for the cases that count cards.

  const buildSwitcher = ({
    apps = APPS,
    footer = FOOTER,
    label = 'Platforms',
    triggerLabel,
    columns,
    ...switcherProps
  }: SwitcherConfig = {}) => (
    <AppSwitcher {...switcherProps}>
      <AppSwitcher.Trigger label={triggerLabel} />
      <AppSwitcher.Section label={label} columns={columns}>
        {apps.map(({ key, ...app }) => (
          <AppSwitcher.App key={key} {...app} />
        ))}
      </AppSwitcher.Section>
      {footer && <AppSwitcher.Footer {...footer} />}
    </AppSwitcher>
  );

  const renderSwitcher = (props: SwitcherConfig = {}) => renderWithTheme(buildSwitcher(props));

  it('exposes popover ARIA state on the trigger and opens on click', () => {
    renderSwitcher();

    const trigger = screen.getByRole('button', { name: 'Switch Platforms' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    // The trigger always controls the popover, so the closed state is reported
    // as "false" rather than by dropping the attribute.
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-controls')).toBeNull();

    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // The popover surface the trigger points at must exist in the DOM.
    const controls = trigger.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    expect(document.getElementById(controls as string)).not.toBeNull();
    expect(screen.getByRole('list', { name: 'Platforms' })).toBeDefined();
  });

  it('names the popover surface as a dialog', () => {
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    // MUI gives the paper slot no role, so the role must be set explicitly for
    // `aria-label` to establish an accessible name.
    expect(screen.getByRole('dialog', { name: 'Applications' })).toBeDefined();
  });

  it('keeps list semantics explicit for VoiceOver', () => {
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    // `list-style: none` can strip implicit list semantics in Safari/VoiceOver.
    expect(screen.getByRole('list', { name: 'Platforms' }).getAttribute('role')).toBe('list');
  });

  it('renders the fixed layout from data alone', () => {
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    // Platform grid and manage grid are both present without the consumer
    // composing any markup.
    expect(screen.getByRole('list', { name: 'Platforms' })).toBeDefined();
    expect(screen.getByRole('list', { name: 'Manage' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'API Platform' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Billing' })).toBeDefined();
  });

  it('carries the pulse mark on a platform card without a consumer icon', () => {
    // The mark is supplied by the component so the grid stays uniform across
    // products; a product must not have to pass artwork to get the design.
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = screen.getByRole('link', { name: 'API Platform' });
    expect(card.querySelector('svg')).not.toBeNull();
  });

  it('opens platforms in a new tab with the reverse-tabnabbing guard', () => {
    // Platforms are separate deployments, so the design opens each in its own
    // tab; `rel` must come along or `window.opener` leaks.
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const app = screen.getByRole('link', { name: 'API Platform' });
    expect(app.getAttribute('href')).toBe('https://api.wso2.com');
    expect(app.getAttribute('target')).toBe('_blank');
    expect(app.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('lets a platform opt out of opening in a new tab', () => {
    renderSwitcher({
      apps: [{ key: 'api', name: 'API Platform', url: '/apim', target: '_self' }],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const app = screen.getByRole('link', { name: 'API Platform' });
    expect(app.getAttribute('target')).toBe('_self');
    expect(app.getAttribute('rel')).toBeNull();
  });

  it('links the manage section to the WSO2 Cloud tabs in a new tab', () => {
    renderSwitcher({
      footer: {
        links: [
          { key: 'orgs', name: 'Organizations', url: 'https://console.wso2.com/organizations' },
          { key: 'users', name: 'Users & roles', url: 'https://console.wso2.com/users' },
          { key: 'billing', name: 'Billing', url: 'https://console.wso2.com/billing' },
        ],
      },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const manage = screen.getByRole('list', { name: 'Manage' });
    const links = Array.from(manage.querySelectorAll('a'));
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'https://console.wso2.com/organizations',
      'https://console.wso2.com/users',
      'https://console.wso2.com/billing',
    ]);
    links.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('keeps the popover open when a manage link is selected', () => {
    // Manage links open in a new tab too, so the current tab does not navigate
    // and the popover must survive the click.
    const onClick = vi.fn();
    renderSwitcher({
      footer: { links: [{ key: 'billing', name: 'Billing', url: '/billing', onClick }] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    fireEvent.click(screen.getByRole('link', { name: 'Billing' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog', { name: 'Applications' })).toBeDefined();
  });

  it('omits the manage section when no footer is supplied', () => {
    renderWithTheme(buildSwitcher({ footer: null }));
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.queryByRole('list', { name: 'Manage' })).toBeNull();
    expect(screen.getByRole('link', { name: 'API Platform' })).toBeDefined();
  });

  it('omits the manage section when the links array is empty', () => {
    // An empty array must not leave a bare separator and background behind.
    renderSwitcher({ footer: { links: [] } });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.queryByRole('list', { name: 'Manage' })).toBeNull();
  });

  it('lets consumers relabel the section headings', () => {
    renderSwitcher({ label: 'Products', footer: { ...FOOTER, label: 'Administration' } });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.getByRole('list', { name: 'Products' })).toBeDefined();
    expect(screen.getByRole('list', { name: 'Administration' })).toBeDefined();
  });

  it('matches the other header icon buttons in size so hover styling lines up', () => {
    renderWithTheme(
      <>
        <ColorSchemeToggle />
        {buildSwitcher({ footer: null })}
      </>,
    );

    const toggle = screen.getByRole('button', { name: /switch to .* mode/i });
    const trigger = screen.getByRole('button', { name: 'Switch Platforms' });

    // Both must resolve to the same IconButton size class; a mismatch changes
    // the padding and therefore the diameter of the hover circle.
    expect(trigger.className).toContain('MuiIconButton-sizeMedium');
    expect(toggle.className).toContain('MuiIconButton-sizeMedium');
  });

  it('inherits the same resting icon color as the other header icon buttons', () => {
    const toggle = renderWithTheme(<ColorSchemeToggle />);
    const switcher = renderWithTheme(buildSwitcher({ footer: null }));

    // The trigger must not pin its own color; a different token renders visibly
    // darker or lighter than the adjacent ColorSchemeToggle.
    const toggleColor = getComputedStyle(
      toggle.container.querySelector('button') as HTMLElement,
    ).color;
    const triggerColor = getComputedStyle(
      switcher.container.querySelector('button') as HTMLElement,
    ).color;

    expect(triggerColor).toBe(toggleColor);
  });

  it('lets consumers relabel the trigger', () => {
    renderSwitcher({ triggerLabel: 'Switch platform' });
    expect(screen.getByRole('button', { name: 'Switch platform' })).toBeDefined();
  });

  it('renders apps through a custom router component and forwards router props', () => {
    // Stand-in for a router Link: the library must not depend on a router.
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      { to: string; children?: React.ReactNode }
    >(function RouterLink({ to, children, ...rest }, linkRef) {
      return (
        <a ref={linkRef} href={to} data-router-link="true" {...rest}>
          {children}
        </a>
      );
    });

    renderWithTheme(
      buildSwitcher({
        apps: [
          {
            key: 'api',
            name: 'API Platform',
            component: RouterLink,
            url: '/apim',
          },
        ],
      }),
    );

    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const app = screen.getByRole('link', { name: 'API Platform' });
    expect(app.getAttribute('data-router-link')).toBe('true');
    expect(app.getAttribute('href')).toBe('/apim');
  });

  it('forwards componentProps to router components that require their own nav prop', () => {
    // React Router's Link takes `to`, not `href`, so the data-driven API must
    // carry router props through instead of relying on `url`.
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      { to: string; children?: React.ReactNode }
    >(function RouterLink({ to, children, ...rest }, linkRef) {
      return (
        <a ref={linkRef} href={to} data-router-link="true" {...rest}>
          {children}
        </a>
      );
    });

    renderWithTheme(
      buildSwitcher({
        apps: [
          {
            key: 'api',
            name: 'API Platform',
            component: RouterLink,
            componentProps: { to: '/apim' },
          },
        ],
        footer: {
          links: [
            {
              key: 'billing',
              name: 'Billing',
              component: RouterLink,
              componentProps: { to: '/billing' },
            },
          ],
        },
      }),
    );

    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const app = screen.getByRole('link', { name: 'API Platform' });
    expect(app.getAttribute('data-router-link')).toBe('true');
    expect(app.getAttribute('href')).toBe('/apim');

    // The manage links are required in every product, so they must survive the
    // footer's prop mapping too.
    const billing = screen.getByRole('link', { name: 'Billing' });
    expect(billing.getAttribute('data-router-link')).toBe('true');
    expect(billing.getAttribute('href')).toBe('/billing');
  });

  it('paints platform marks in WSO2 orange whatever the product theme', () => {
    // The switcher is WSO2 Cloud chrome, so the pulse is brand artwork rather
    // than a themed accent and must not follow `palette.primary`.
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const tile = screen.getByRole('link', { name: 'API Platform' }).querySelector('svg')
      ?.parentElement as HTMLElement;
    expect(getComputedStyle(tile).color).toBe('rgb(255, 115, 0)');
  });

  it('keeps manage marks neutral so they stay secondary to the platforms', () => {
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const tile = screen.getByRole('link', { name: 'Billing' }).querySelector('svg')
      ?.parentElement as HTMLElement;
    expect(getComputedStyle(tile).color).not.toBe('rgb(255, 115, 0)');
  });

  it('fades the mark of an unavailable platform without breaking its outline', () => {
    // The card keeps the same solid border as every other card; the faded mark,
    // muted label and tinted surface carry the state instead.
    renderWithTheme(
      buildSwitcher({
        apps: [{ key: 'analytics', name: 'Analytics Platform', disabled: true }],
        footer: null,
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = document.querySelector('[data-app-switcher-app]') as HTMLElement;
    expect(getComputedStyle(card).borderStyle).not.toBe('dashed');

    const tile = card.querySelector('svg')?.parentElement as HTMLElement;
    expect(getComputedStyle(tile).color).not.toBe('rgb(255, 115, 0)');
  });

  it('moves focus between app cards with the arrow keys', () => {
    // A grid of links is tedious to traverse with Tab alone, and the visual
    // layout implies arrow-key movement.
    renderSwitcher({
      apps: [
        { key: 'a', name: 'Agent Manager', url: '/agent' },
        { key: 'b', name: 'API Platform', url: '/apim' },
        { key: 'c', name: 'Integration Platform', url: '/integration' },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const first = screen.getByRole('link', { name: 'Agent Manager' });
    const second = screen.getByRole('link', { name: 'API Platform' });
    const third = screen.getByRole('link', { name: 'Integration Platform' });

    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(second);

    fireEvent.keyDown(second, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(first, { key: 'End' });
    expect(document.activeElement).toBe(third);

    fireEvent.keyDown(third, { key: 'Home' });
    expect(document.activeElement).toBe(first);
  });

  it('keeps arrow-key navigation within a section', () => {
    // Platforms and manage links are separate grids; End in one must not jump
    // the caret into the other.
    renderSwitcher({
      apps: [
        { key: 'a', name: 'Agent Manager', url: '/agent' },
        { key: 'b', name: 'API Platform', url: '/apim' },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const lastPlatform = screen.getByRole('link', { name: 'API Platform' });
    lastPlatform.focus();
    fireEvent.keyDown(lastPlatform, { key: 'End' });
    expect(document.activeElement).toBe(lastPlatform);

    fireEvent.keyDown(lastPlatform, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(lastPlatform);
  });

  it('does not wrap focus past the ends of the app grid', () => {
    // Clamping avoids a vertical step landing somewhere unrelated.
    renderSwitcher({ apps: [{ key: 'a', name: 'Agent Manager', url: '/agent' }] });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const only = screen.getByRole('link', { name: 'Agent Manager' });
    only.focus();
    fireEvent.keyDown(only, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(only);

    fireEvent.keyDown(only, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(only);
  });

  it('steps a whole row with the up and down arrows', () => {
    // jsdom gives every element a zero-sized rect, so the row stride has to be
    // driven by stubbed geometry: a 2-column grid of four cards.
    renderWithTheme(
      buildSwitcher({
        apps: [
          { key: 'a', name: 'Agent', url: '/a' },
          { key: 'b', name: 'Bee', url: '/b' },
          { key: 'c', name: 'Cee', url: '/c' },
          { key: 'd', name: 'Dee', url: '/d' },
        ],
        // The row-stride assertion below counts cards, so the manage row must
        // not add a fifth.
        footer: null,
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-app-switcher-app]'),
    );
    expect(cards).toHaveLength(4);

    // Rows of two: cards 0,1 on the first row and 2,3 on the second.
    const tops = [0, 0, 100, 100];
    cards.forEach((card, index) => {
      vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
        top: tops[index],
      } as DOMRect);
    });

    cards[0].focus();
    fireEvent.keyDown(cards[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(cards[2]);

    fireEvent.keyDown(cards[2], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(cards[0]);

    // Stepping down from the last row has nowhere to go and must not wrap.
    cards[3].focus();
    fireEvent.keyDown(cards[3], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(cards[3]);
  });

  it('gives every platform card the same height whatever its name length', () => {
    // A fixed height rather than a floor: a name that wraps to two lines must
    // not make its card taller than a one-word neighbour.
    renderSwitcher({
      apps: [
        { key: 'a', name: 'Agent Manager', url: '/a' },
        { key: 'b', name: 'API', url: '/b' },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-app-switcher-app]'),
    );
    const heights = cards.map((card) => getComputedStyle(card).height);
    expect(heights[0]).toBe(heights[1]);
    // And it is a real fixed height, not `auto` left to the content.
    expect(heights[0]).not.toBe('auto');
  });

  it('does not underline a card that renders as a link', () => {
    // A navigable card is an `<a>`, which underlines its text by default. The
    // card is the link target, not the words, so the underline must be cleared.
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = screen.getByRole('link', { name: 'API Platform' });
    expect(getComputedStyle(card).textDecoration).toContain('none');
  });

  it('shows a custom tooltip on an unavailable platform', async () => {
    // `aria-disabled` rather than the native `disabled` attribute is what makes
    // this possible: a natively disabled button swallows pointer events and MUI
    // would never fire the tooltip.
    renderSwitcher({
      apps: [{ key: 'analytics', name: 'Analytics Platform', disabled: true, tooltip: 'Coming soon' }],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = screen
      .getByText('Analytics Platform')
      .closest('[data-app-switcher-app]') as HTMLElement;

    fireEvent.mouseOver(card);
    expect((await screen.findByRole('tooltip')).textContent).toBe('Coming soon');
  });

  it('describes rather than renames a card that has a tooltip', async () => {
    // `describeChild` keeps the platform name as the accessible name; without it
    // MUI would label the card "Coming soon" and lose the platform name.
    renderSwitcher({
      apps: [
        { key: 'analytics', name: 'Analytics Platform', disabled: true, tooltip: 'Coming soon' },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = screen
      .getByText('Analytics Platform')
      .closest('[data-app-switcher-app]') as HTMLElement;

    fireEvent.mouseOver(card);
    await screen.findByRole('tooltip');
    expect(card.getAttribute('aria-label')).toBeNull();
    expect(screen.getByRole('button', { name: /Analytics Platform/ })).toBeDefined();
  });

  it('renders no tooltip wrapper when no tooltip is supplied', () => {
    renderSwitcher({ apps: [{ key: 'api', name: 'API Platform', url: '/apim' }] });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = screen.getByRole('link', { name: 'API Platform' });
    fireEvent.mouseOver(card);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('keeps unavailable apps focusable and inert', () => {
    // Disabled cards stay discoverable to screen reader users, but must not
    // navigate or close the popover.
    const onClick = vi.fn();
    renderSwitcher({
      apps: [
        { key: 'analytics', name: 'Analytics Platform', disabled: true, url: '/analytics', onClick },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const card = screen
      .getByText('Analytics Platform')
      .closest('[data-app-switcher-app]') as HTMLElement;
    expect(card.getAttribute('aria-disabled')).toBe('true');
    // A disabled app must not become a link, or it would still navigate.
    expect(card.tagName).toBe('BUTTON');
    expect(card.getAttribute('href')).toBeNull();

    card.focus();
    expect(document.activeElement).toBe(card);

    fireEvent.click(card);
    expect(onClick).not.toHaveBeenCalled();
    // The popover stays open because nothing was selected.
    expect(screen.getByRole('dialog', { name: 'Applications' })).toBeDefined();
  });

  it('keeps the reverse-tabnabbing guard even when componentProps sets rel', () => {
    // `componentProps` is consumer-controlled, so it must not be able to strip
    // the `rel` guard from a `_blank` link.
    renderWithTheme(
      buildSwitcher({
        apps: [
          {
            key: 'api',
            name: 'API Platform',
            url: 'https://example.com',
            component: 'a',
            componentProps: { rel: '' },
          },
        ],
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.getByRole('link', { name: 'API Platform' }).getAttribute('rel')).toBe(
      'noopener noreferrer',
    );
  });

  it('guards a _blank target that arrives through componentProps', () => {
    // The top-level `target` is not the only source: a consumer can set it on
    // the forwarded props, and that link still needs the tabnabbing guard.
    renderWithTheme(
      buildSwitcher({
        apps: [
          {
            key: 'api',
            name: 'API Platform',
            url: 'https://example.com',
            target: '_self',
            component: 'a',
            componentProps: { target: '_blank' },
          },
        ],
        footer: {
          links: [
            {
              key: 'billing',
              name: 'Billing',
              url: 'https://example.com/billing',
              target: '_self',
              component: 'a',
              componentProps: { target: '_blank' },
            },
          ],
        },
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    for (const name of ['API Platform', 'Billing']) {
      const link = screen.getByRole('link', { name });
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });

  it('gives each card its own grid cell when grouped in a fragment', () => {
    // Cards are often grouped in a component or fragment. Wrapping the group in
    // one <li> would collapse the grid to a single column.
    const Group = () => (
      <>
        <AppSwitcher.App name="One" url="/1" />
        <AppSwitcher.App name="Two" url="/2" />
      </>
    );
    renderWithTheme(
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <Group />
        </AppSwitcher.Section>
      </AppSwitcher>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    // Both cards must reach the grid. The <li> wrappers are `display: contents`
    // so the cards themselves are the grid items, whatever groups them.
    expect(screen.getAllByRole('link')).toHaveLength(2);
    const grid = screen.getByRole('list', { name: 'Platforms' });
    expect(grid.querySelectorAll('[data-app-switcher-app]')).toHaveLength(2);
  });

  it('composes footer cards as children and gives them the manage treatment', () => {
    // A composed manage card must match a `links`-driven one, so the footer
    // supplies the tone rather than every card repeating it.
    renderWithTheme(
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <AppSwitcher.App name="API Platform" url="https://api.wso2.com" />
        </AppSwitcher.Section>
        <AppSwitcher.Footer label="Manage">
          <AppSwitcher.App name="Billing" url="/billing" />
        </AppSwitcher.Footer>
      </AppSwitcher>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.getByRole('list', { name: 'Manage' })).toBeDefined();

    // The manage tone renders a shorter card than the platform tone; comparing
    // the two is what proves the context reached the child.
    const platform = screen.getByRole('link', { name: 'API Platform' });
    const manage = screen.getByRole('link', { name: 'Billing' });
    expect(manage.className).not.toEqual(platform.className);
  });

  it('renders nothing for a footer with no cards to show', () => {
    // An empty manage row would otherwise leave a bare separator and wash. A
    // `{cond && <App />}` child yields `false` when the condition is off, so
    // that has to count as empty too.
    const showBilling = false;
    renderWithTheme(
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <AppSwitcher.App name="API Platform" url="https://api.wso2.com" />
        </AppSwitcher.Section>
        <AppSwitcher.Footer label="Manage">
          {showBilling && <AppSwitcher.App name="Billing" url="/billing" />}
        </AppSwitcher.Footer>
      </AppSwitcher>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.queryByRole('list', { name: 'Manage' })).toBeNull();
  });

  it('renders nothing for a footer given an empty links array', () => {
    renderSwitcher({ footer: { links: [] } });
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    expect(screen.queryByRole('list', { name: 'Manage' })).toBeNull();
  });

  it('composes from sub-components and keeps sections independent', () => {
    // The compound surface is the public API, so a consumer-shaped tree must
    // render the trigger in place and everything else inside the popover.
    renderWithTheme(
      <AppSwitcher>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section label="Platforms">
          <AppSwitcher.App name="API Platform" url="https://api.wso2.com" />
        </AppSwitcher.Section>
        <AppSwitcher.Footer
          label="Administration"
          links={[{ key: 'billing', name: 'Billing', url: '/billing' }]}
        />
      </AppSwitcher>,
    );

    // The trigger is outside the popover, so it exists before opening.
    const trigger = screen.getByRole('button', { name: 'Switch Platforms' });
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: 'Applications' })).toBeDefined();
    expect(screen.getByRole('list', { name: 'Platforms' })).toBeDefined();
    expect(screen.getByRole('list', { name: 'Administration' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'API Platform' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Billing' })).toBeDefined();
  });

  it('falls back to the default label when label is only whitespace', () => {
    // The parameter default only covers `undefined`, so a blank string must not
    // leave the icon button without a usable accessible name.
    renderWithTheme(
      buildSwitcher({
        triggerLabel: ' ',
        apps: [{ key: 'api', name: 'API Platform' }],
        footer: null,
      }),
    );

    expect(screen.getByRole('button', { name: 'Switch Platforms' })).toBeDefined();
  });

  it('renders navigable apps as links and keeps the popover open on selection', () => {
    // Cards open in a new tab, so the current tab stays put. Dismissing the
    // popover would look like the switcher had closed itself for no reason.
    const onClick = vi.fn();
    renderSwitcher({ apps: [{ key: 'api', name: 'API Platform', url: '/apim', onClick }] });

    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const app = screen.getByRole('link', { name: 'API Platform' });
    expect(app.getAttribute('href')).toBe('/apim');

    fireEvent.click(app);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog', { name: 'Applications' })).toBeDefined();
  });

  it('closes the popover when the trigger is clicked again', () => {
    // The grid icon toggles, so a second click dismisses an open switcher
    // rather than re-anchoring it.
    renderSwitcher();

    const trigger = screen.getByRole('button', { name: 'Switch Platforms' });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Applications' })).toBeDefined();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(trigger);
    // The trigger still controls the popover once closed, so it keeps
    // `aria-expanded` and reports "false" rather than dropping the attribute.
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the popover on an outside click', () => {
    // Clicking away is the other dismissal route; MUI's Popover backdrop drives
    // this, so it must keep working now that cards no longer close it.
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const backdrop = document.querySelector('.MuiBackdrop-root, [data-testid="sentinelStart"]')
      ?.parentElement?.querySelector('.MuiModal-backdrop') as HTMLElement | null;
    fireEvent.click(backdrop ?? document.body);

    expect(
      screen.getByRole('button', { name: 'Switch Platforms' }).getAttribute('aria-expanded'),
    ).toBe('false');
  });

  it('groups apps in a labelled list', () => {
    renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Switch Platforms' }));

    const list = screen.getByRole('list', { name: 'Platforms' });
    expect(list).toBeDefined();
    expect(list.querySelectorAll('li')).toHaveLength(1);
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

describe('NotificationPanel', () => {
  const listChild = (id: string) => (
    <div key={id} data-testid={`notification-${id}`}>
      Notification {id}
    </div>
  );

  it('names the open drawer dialog Notifications by default', () => {
    renderWithTheme(
      <NotificationPanel open onClose={() => {}}>
        <NotificationPanel.Header>
          <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
          <NotificationPanel.HeaderClose />
        </NotificationPanel.Header>
      </NotificationPanel>,
    );

    expect(screen.getByRole('dialog', { name: 'Notifications' })).toBeDefined();
  });

  it('lets consumers override the drawer accessible name', () => {
    renderWithTheme(
      <NotificationPanel open onClose={() => {}} aria-label="Inbox">
        <NotificationPanel.Header>
          <NotificationPanel.HeaderTitle>Inbox</NotificationPanel.HeaderTitle>
          <NotificationPanel.HeaderClose />
        </NotificationPanel.Header>
      </NotificationPanel>,
    );

    expect(screen.getByRole('dialog', { name: 'Inbox' })).toBeDefined();
  });

  it('falls back to Notifications when aria-label is empty or whitespace', () => {
    renderWithTheme(
      <NotificationPanel open onClose={() => {}} aria-label="   ">
        <NotificationPanel.Header>
          <NotificationPanel.HeaderTitle>Notifications</NotificationPanel.HeaderTitle>
        </NotificationPanel.Header>
      </NotificationPanel>,
    );

    expect(screen.getByRole('dialog', { name: 'Notifications' })).toBeDefined();
  });

  it('exposes a polite live region with status semantics', () => {
    renderWithTheme(
      <NotificationPanel open onClose={() => {}}>
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>,
    );

    const liveRegion = screen.getByTestId('notification-panel-live-region');
    expect(liveRegion.getAttribute('role')).toBe('status');
    expect(liveRegion.getAttribute('aria-live')).toBe('polite');
    expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
  });

  it('does not announce when list children are only rendered on open', () => {
    renderWithTheme(
      <NotificationPanel open onClose={() => {}}>
        <NotificationPanel.List>
          {listChild('1')}
          {listChild('2')}
        </NotificationPanel.List>
      </NotificationPanel>,
    );

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe('');
  });

  it('does not auto-announce when the list child count increases', () => {
    const Panel = ({ ids }: { ids: string[] }) => (
      <NotificationPanel open onClose={() => {}}>
        <NotificationPanel.List>{ids.map((id) => listChild(id))}</NotificationPanel.List>
      </NotificationPanel>
    );

    const { rerender } = renderWithTheme(<Panel ids={['1']} />);

    rerender(
      <OxygenUIThemeProvider>
        <Panel ids={['1', '2', '3']} />
      </OxygenUIThemeProvider>,
    );

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe('');
  });

  it('surfaces a consumer liveAnnouncement in the polite live region', () => {
    renderWithTheme(
      <NotificationPanel open onClose={() => {}} liveAnnouncement="3 notifications synced">
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>,
    );

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe(
      '3 notifications synced',
    );
  });

  it('lets context setLiveAnnouncement publish after a liveAnnouncement prop was set', () => {
    const AnnounceButton = () => {
      const { setLiveAnnouncement } = useNotificationPanel();
      return (
        <button type="button" onClick={() => setLiveAnnouncement('1 new notification')}>
          Announce
        </button>
      );
    };

    const Panel = ({ status }: { status?: string }) => (
      <NotificationPanel open onClose={() => {}} liveAnnouncement={status}>
        <AnnounceButton />
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>
    );

    const { rerender } = renderWithTheme(<Panel status="3 notifications synced" />);

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe(
      '3 notifications synced',
    );

    // Stop controlling via prop so subsequent context publishes are not overwritten.
    rerender(
      <OxygenUIThemeProvider>
        <Panel />
      </OxygenUIThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Announce' }));

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe(
      '1 new notification',
    );
  });

  it('re-publishes the same announcement text for repeated arrivals', () => {
    const AnnounceButton = () => {
      const { setLiveAnnouncement } = useNotificationPanel();
      return (
        <button type="button" onClick={() => setLiveAnnouncement('1 new notification')}>
          Announce
        </button>
      );
    };

    renderWithTheme(
      <NotificationPanel open onClose={() => {}}>
        <AnnounceButton />
      </NotificationPanel>,
    );

    const announce = () => fireEvent.click(screen.getByRole('button', { name: 'Announce' }));

    announce();
    const firstRegion = screen.getByTestId('notification-panel-live-region');
    expect(firstRegion.textContent).toBe('1 new notification');

    announce();
    const secondRegion = screen.getByTestId('notification-panel-live-region');
    expect(secondRegion.textContent).toBe('1 new notification');
    // Nonce remounts the live region node so assistive tech can hear repeats.
    expect(secondRegion).not.toBe(firstRegion);
  });

  it('clears the live region when the panel closes', () => {
    const Panel = ({ open }: { open: boolean }) => (
      <NotificationPanel open={open} onClose={() => {}} liveAnnouncement="1 new notification">
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>
    );

    const { rerender } = renderWithTheme(<Panel open />);

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe(
      '1 new notification',
    );

    rerender(
      <OxygenUIThemeProvider>
        <Panel open={false} />
      </OxygenUIThemeProvider>,
    );

    // Temporary drawer unmounts content when closed; if present, it must be empty.
    const liveRegion = screen.queryByTestId('notification-panel-live-region');
    if (liveRegion) {
      expect(liveRegion.textContent).toBe('');
    }
  });

  it('does not re-announce an unchanged liveAnnouncement prop when the panel reopens', () => {
    const Panel = ({ open }: { open: boolean }) => (
      <NotificationPanel open={open} onClose={() => {}} liveAnnouncement="1 new notification">
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>
    );

    const { rerender } = renderWithTheme(<Panel open />);

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe(
      '1 new notification',
    );

    rerender(
      <OxygenUIThemeProvider>
        <Panel open={false} />
      </OxygenUIThemeProvider>,
    );

    rerender(
      <OxygenUIThemeProvider>
        <Panel open />
      </OxygenUIThemeProvider>,
    );

    // Announcements are events while open; reopen with the same prop must not replay.
    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe('');
  });

  it('clears the live region when liveAnnouncement becomes undefined while open', () => {
    const Panel = ({ status }: { status?: string }) => (
      <NotificationPanel open onClose={() => {}} liveAnnouncement={status}>
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>
    );

    const { rerender } = renderWithTheme(<Panel status="3 notifications synced" />);

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe(
      '3 notifications synced',
    );

    rerender(
      <OxygenUIThemeProvider>
        <Panel />
      </OxygenUIThemeProvider>,
    );

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe('');
  });

  it('ignores setLiveAnnouncement while a persistent panel is closed', () => {
    const AnnounceButton = () => {
      const { setLiveAnnouncement } = useNotificationPanel();
      return (
        <button
          type="button"
          data-testid="announce-button"
          onClick={() => setLiveAnnouncement('1 new notification')}
        >
          Announce
        </button>
      );
    };

    renderWithTheme(
      <NotificationPanel open={false} onClose={() => {}} variant="persistent">
        <AnnounceButton />
        <NotificationPanel.List>{listChild('1')}</NotificationPanel.List>
      </NotificationPanel>,
    );

    // Closed persistent drawers keep content mounted but hide it from the a11y tree.
    fireEvent.click(screen.getByTestId('announce-button'));

    expect(screen.getByTestId('notification-panel-live-region').textContent).toBe('');
  });
});
