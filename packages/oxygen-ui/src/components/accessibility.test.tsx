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
});
