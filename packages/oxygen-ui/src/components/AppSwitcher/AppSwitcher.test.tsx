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

// Base behavior is covered in `../accessibility.test.tsx`; the legacy cases
// here guard defaults the new props could shift.

import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import AppSwitcher from './AppSwitcher';
import type { AppSwitcherProps } from './AppSwitcher';
import type { AppSwitcherAppItem } from './AppSwitcherApp';
import type { AppSwitcherFooterLink } from './AppSwitcherFooter';
import { isSafeAppUrl } from './url';

const PLATFORMS: AppSwitcherAppItem[] = [
  { id: 'agent-manager', name: 'Agent Manager', url: 'https://agent.example.com' },
  { id: 'identity', name: 'Identity Platform', url: 'https://identity.example.com' },
  { id: 'api', name: 'API Platform', url: 'https://api.example.com' },
  { id: 'analytics', name: 'API Analytics', url: null },
];

const MANAGE: AppSwitcherFooterLink[] = [
  { id: 'orgs', name: 'Organizations', url: 'https://console.example.com/orgs' },
  { id: 'billing', name: 'Billing', url: 'https://console.example.com/billing' },
];

type Config = Partial<Omit<AppSwitcherProps, 'children'>> & {
  apps?: AppSwitcherAppItem[];
  links?: AppSwitcherFooterLink[];
  loading?: boolean;
  loadingCount?: number;
};

const renderSwitcher = ({
  apps = PLATFORMS,
  links = MANAGE,
  loading,
  loadingCount,
  ...props
}: Config = {}) =>
  render(
    <OxygenUIThemeProvider>
      <AppSwitcher {...props}>
        <AppSwitcher.Trigger />
        <AppSwitcher.Section
          label="Platforms"
          apps={apps}
          loading={loading}
          loadingCount={loadingCount}
        />
        <AppSwitcher.Footer label="Manage" links={links} loading={loading} />
      </AppSwitcher>
    </OxygenUIThemeProvider>,
  );

const openSwitcher = () => {
  const trigger = screen.getByRole('button', { name: 'Switch Platforms' });
  fireEvent.click(trigger);
  return trigger;
};

const nameOf = (card: Element) => card.textContent;

const cardFor = (name: string) =>
  screen.getByText(name).closest('[data-app-switcher-app]') as HTMLElement;

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('AppSwitcher current app', () => {
  it('opens the current app in the same tab and marks it as the current page', () => {
    renderSwitcher({ currentAppId: 'agent-manager' });
    openSwitcher();

    const current = screen.getByRole('link', { name: 'Agent Manager' });
    expect(current.getAttribute('target')).toBe('_self');
    expect(current.getAttribute('rel')).toBeNull();
    expect(current.getAttribute('aria-current')).toBe('page');

    // Only the current app may navigate this tab; the rest must keep their
    // new-tab default and its tabnabbing guard.
    const other = screen.getByRole('link', { name: 'Identity Platform' });
    expect(other.getAttribute('target')).toBe('_blank');
    expect(other.getAttribute('rel')).toBe('noopener noreferrer');
    expect(other.getAttribute('aria-current')).toBeNull();
  });

  it('closes the popover when the current app is selected', () => {
    renderSwitcher({ currentAppId: 'agent-manager' });
    const trigger = openSwitcher();

    fireEvent.click(screen.getByRole('link', { name: 'Agent Manager' }));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('keeps the popover open when another app is selected', () => {
    renderSwitcher({ currentAppId: 'agent-manager' });
    const trigger = openSwitcher();

    fireEvent.click(screen.getByRole('link', { name: 'Identity Platform' }));
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps the popover open when the current app is opened in a new tab', () => {
    // A modified click opens a new tab, so this tab is not navigating.
    renderSwitcher({ currentAppId: 'agent-manager' });
    const trigger = openSwitcher();

    fireEvent.click(screen.getByRole('link', { name: 'Agent Manager' }), { ctrlKey: true });
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('lets a consumer-supplied target win on the current app', () => {
    renderSwitcher({
      currentAppId: 'agent-manager',
      apps: [{ ...PLATFORMS[0], target: '_blank' }],
    });
    const trigger = openSwitcher();

    const current = screen.getByRole('link', { name: 'Agent Manager' });
    expect(current.getAttribute('target')).toBe('_blank');
    expect(current.getAttribute('rel')).toBe('noopener noreferrer');
    expect(current.getAttribute('aria-current')).toBe('page');

    // The tab is not navigating, so the popover stays open.
    fireEvent.click(current);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('lets `current` override the id match', () => {
    renderSwitcher({
      currentAppId: 'agent-manager',
      apps: [
        { ...PLATFORMS[0], current: false },
        { ...PLATFORMS[1], current: true },
      ],
    });
    openSwitcher();

    expect(screen.getByRole('link', { name: 'Agent Manager' }).getAttribute('aria-current')).toBeNull();
    expect(
      screen.getByRole('link', { name: 'Identity Platform' }).getAttribute('aria-current'),
    ).toBe('page');
  });

  it('marks a composed App as current through its id', () => {
    render(
      <OxygenUIThemeProvider>
        <AppSwitcher currentAppId="api">
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms">
            <AppSwitcher.App id="api" name="API Platform" url="https://api.example.com" />
          </AppSwitcher.Section>
        </AppSwitcher>
      </OxygenUIThemeProvider>,
    );
    openSwitcher();

    const card = screen.getByRole('link', { name: 'API Platform' });
    expect(card.getAttribute('aria-current')).toBe('page');
    expect(card.getAttribute('target')).toBe('_self');
    // `id` is a match key only; it must not leak onto the DOM node.
    expect(card.getAttribute('id')).toBeNull();
  });

  it('applies the current-app behavior to footer links', () => {
    renderSwitcher({ currentAppId: 'billing' });
    const trigger = openSwitcher();

    const billing = screen.getByRole('link', { name: 'Billing' });
    expect(billing.getAttribute('aria-current')).toBe('page');
    expect(billing.getAttribute('target')).toBe('_self');

    fireEvent.click(billing);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('gives the current app a persistent brand border', () => {
    renderSwitcher({ currentAppId: 'agent-manager' });
    openSwitcher();

    const brand = 'rgb(229, 104, 0)';
    expect(getComputedStyle(cardFor('Agent Manager')).borderColor).toBe(brand);
    expect(getComputedStyle(cardFor('Identity Platform')).borderColor).not.toBe(brand);
  });
});

describe('AppSwitcher data-driven sections', () => {
  it('renders apps and links in the order given', () => {
    renderSwitcher();
    openSwitcher();

    const platformNames = Array.from(
      screen.getByRole('list', { name: 'Platforms' }).querySelectorAll('[data-app-switcher-app]'),
    ).map(nameOf);
    expect(platformNames).toEqual(PLATFORMS.map((app) => app.name));

    const manageNames = Array.from(
      screen.getByRole('list', { name: 'Manage' }).querySelectorAll('[data-app-switcher-app]'),
    ).map(nameOf);
    expect(manageNames).toEqual(MANAGE.map((link) => link.name));
  });

  it('keys items by id without React key warnings', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderSwitcher();
    openSwitcher();

    expect(error).not.toHaveBeenCalled();
  });

  it('prefers children over apps, mirroring the footer', () => {
    render(
      <OxygenUIThemeProvider>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms" apps={PLATFORMS}>
            <AppSwitcher.App name="Composed" url="https://example.com" />
          </AppSwitcher.Section>
        </AppSwitcher>
      </OxygenUIThemeProvider>,
    );
    openSwitcher();

    expect(screen.getByRole('link', { name: 'Composed' })).toBeDefined();
    expect(screen.queryByText('Agent Manager')).toBeNull();
  });

  it('gives app cards the platform treatment and link cards the manage one', () => {
    renderSwitcher();
    openSwitcher();

    const platformHeight = getComputedStyle(cardFor('Agent Manager')).height;
    const manageHeight = getComputedStyle(cardFor('Billing')).height;
    expect(platformHeight).not.toBe(manageHeight);
  });
});

describe('AppSwitcher unavailable apps', () => {
  it('renders an app whose url is null as a disabled card with a "Coming soon" tooltip', async () => {
    renderSwitcher();
    openSwitcher();

    const card = cardFor('API Analytics');
    expect(card.tagName).toBe('BUTTON');
    expect(card.getAttribute('href')).toBeNull();
    expect(card.getAttribute('aria-disabled')).toBe('true');
    // No visible label; the reason lives in the tooltip.
    expect(card.textContent).toBe('API Analytics');

    fireEvent.mouseOver(card);
    expect((await screen.findByRole('tooltip')).textContent).toBe('Coming soon');
  });

  it('keeps an unavailable card focusable so the tooltip reaches keyboard users', () => {
    renderSwitcher();
    openSwitcher();

    const card = cardFor('API Analytics');
    card.focus();
    expect(document.activeElement).toBe(card);
  });

  it('treats an app with no url like one whose url is null', () => {
    renderSwitcher({ apps: [{ id: 'integration', name: 'Integration Platform' }] });
    openSwitcher();

    expect(cardFor('Integration Platform').getAttribute('aria-disabled')).toBe('true');
  });

  it('lets the switcher localise the tooltip', async () => {
    renderSwitcher({ unavailableLabel: 'Bientôt disponible' });
    openSwitcher();

    fireEvent.mouseOver(cardFor('API Analytics'));
    expect((await screen.findByRole('tooltip')).textContent).toBe('Bientôt disponible');
  });

  it('lets an item tooltip override the default', async () => {
    renderSwitcher({
      apps: [{ id: 'analytics', name: 'API Analytics', url: null, tooltip: 'Not in this region' }],
    });
    openSwitcher();

    fireEvent.mouseOver(cardFor('API Analytics'));
    expect((await screen.findByRole('tooltip')).textContent).toBe('Not in this region');
  });

  it('keeps unavailable cards in the arrow-key sequence', () => {
    renderSwitcher({
      apps: [PLATFORMS[0], { id: 'analytics', name: 'API Analytics', url: null }],
    });
    openSwitcher();

    const first = screen.getByRole('link', { name: 'Agent Manager' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(cardFor('API Analytics'));
  });

  it('keeps an app with an onClick but no url enabled', () => {
    const onClick = vi.fn();
    renderSwitcher({ apps: [{ id: 'grant', name: 'Request access', url: null, onClick }] });
    openSwitcher();

    const card = cardFor('Request access');
    expect(card.getAttribute('aria-disabled')).toBeNull();
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('keeps an app routed through a custom component enabled', () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, { to: string } & React.ComponentProps<'a'>>(
      function RouterLink({ to, ...props }, ref) {
        return <a ref={ref} href={to} {...props} />;
      },
    );
    renderSwitcher({
      apps: [{ id: 'local', name: 'Local route', component: RouterLink, componentProps: { to: '/local' } }],
    });
    openSwitcher();

    const card = screen.getByRole('link', { name: 'Local route' });
    expect(card.getAttribute('href')).toBe('/local');
    expect(card.getAttribute('aria-disabled')).toBeNull();
  });

  it('renders a footer link whose url is null as disabled', () => {
    renderSwitcher({ links: [{ id: 'billing', name: 'Billing', url: null }] });
    openSwitcher();

    expect(cardFor('Billing').getAttribute('aria-disabled')).toBe('true');
  });
});

describe('AppSwitcher loading state', () => {
  it('shows one row of placeholders and marks the grid busy while loading', () => {
    renderSwitcher({ loading: true });
    openSwitcher();

    const platforms = screen.getByRole('list', { name: 'Platforms' });
    expect(platforms.getAttribute('aria-busy')).toBe('true');
    expect(platforms.querySelectorAll('[data-app-switcher-skeleton]')).toHaveLength(3);
    expect(platforms.querySelectorAll('[data-app-switcher-app]')).toHaveLength(0);

    const manage = screen.getByRole('list', { name: 'Manage' });
    expect(manage.getAttribute('aria-busy')).toBe('true');
    expect(manage.querySelectorAll('[data-app-switcher-skeleton]')).toHaveLength(3);
  });

  it('takes a configurable placeholder count', () => {
    renderSwitcher({ loading: true, loadingCount: 5 });
    openSwitcher();

    const platforms = screen.getByRole('list', { name: 'Platforms' });
    expect(platforms.querySelectorAll('[data-app-switcher-skeleton]')).toHaveLength(5);
  });

  it('sizes placeholders like the cards they stand in for', () => {
    const { unmount } = renderSwitcher();
    openSwitcher();
    const platformHeight = getComputedStyle(cardFor('Agent Manager')).height;
    const manageHeight = getComputedStyle(cardFor('Billing')).height;
    unmount();

    renderSwitcher({ loading: true });
    openSwitcher();
    const [platformSkeleton] = Array.from(
      screen.getByRole('list', { name: 'Platforms' }).querySelectorAll('[data-app-switcher-skeleton]'),
    );
    const [manageSkeleton] = Array.from(
      screen.getByRole('list', { name: 'Manage' }).querySelectorAll('[data-app-switcher-skeleton]'),
    );
    expect(getComputedStyle(platformSkeleton).height).toBe(platformHeight);
    expect(getComputedStyle(manageSkeleton).height).toBe(manageHeight);
  });

  it('keeps the footer row open while its links load', () => {
    renderSwitcher({ loading: true, links: [] });
    openSwitcher();

    expect(screen.getByRole('list', { name: 'Manage' })).toBeDefined();
  });

  it('replaces the placeholders with the cards once loaded', () => {
    const { rerender } = renderSwitcher({ loading: true });
    openSwitcher();

    rerender(
      <OxygenUIThemeProvider>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms" apps={PLATFORMS} loading={false} />
        </AppSwitcher>
      </OxygenUIThemeProvider>,
    );

    const platforms = screen.getByRole('list', { name: 'Platforms' });
    expect(platforms.getAttribute('aria-busy')).toBeNull();
    expect(platforms.querySelectorAll('[data-app-switcher-skeleton]')).toHaveLength(0);
    expect(platforms.querySelectorAll('[data-app-switcher-app]')).toHaveLength(PLATFORMS.length);
  });
});

describe('AppSwitcher busy card', () => {
  it('shows progress, ignores clicks and stays focusable while busy', () => {
    const onClick = vi.fn();
    renderSwitcher({
      apps: [{ id: 'api', name: 'API Platform', url: 'https://api.example.com', busy: true, onClick }],
    });
    const trigger = openSwitcher();

    const card = cardFor('API Platform');
    expect(card.getAttribute('aria-busy')).toBe('true');
    expect(card.querySelector('.MuiCircularProgress-root')).not.toBeNull();

    card.focus();
    expect(document.activeElement).toBe(card);

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    card.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('exposes no link while busy, so the context menu cannot open it', () => {
    renderSwitcher({
      apps: [
        { id: 'api', name: 'API Platform', url: 'https://api.example.com', busy: true },
        { id: 'routed', name: 'Routed', component: 'a', componentProps: { href: '/routed' }, busy: true },
      ],
    });
    openSwitcher();

    for (const name of ['API Platform', 'Routed']) {
      const card = cardFor(name);
      expect(card.tagName).toBe('BUTTON');
      expect(card.getAttribute('href')).toBeNull();
      expect(card.getAttribute('target')).toBeNull();
    }
    expect(screen.queryByRole('link', { name: 'API Platform' })).toBeNull();
  });

  it('shows no progress and runs its action when not busy', () => {
    const onClick = vi.fn();
    renderSwitcher({ apps: [{ id: 'grant', name: 'Grant access', url: null, onClick }] });
    openSwitcher();

    const card = cardFor('Grant access');
    expect(card.getAttribute('aria-busy')).toBeNull();
    expect(card.querySelector('.MuiCircularProgress-root')).toBeNull();
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('AppSwitcher URL safety', () => {
  const UNSAFE = [
    'javascript:alert(1)',
    ' JaVaScRiPt:alert(1)',
    'java\tscript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
  ];

  it.each(UNSAFE)('rejects %j in Section apps', (url) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderSwitcher({ apps: [{ id: 'bad', name: 'Bad App', url }] });
    openSwitcher();

    const card = cardFor('Bad App');
    expect(card.tagName).toBe('BUTTON');
    expect(card.getAttribute('href')).toBeNull();
    expect(card.getAttribute('aria-disabled')).toBe('true');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Bad App'));
  });

  it('rejects an unsafe url in Footer links', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderSwitcher({ links: [{ id: 'bad', name: 'Bad Link', url: 'javascript:alert(1)' }] });
    openSwitcher();

    const card = cardFor('Bad Link');
    expect(card.getAttribute('href')).toBeNull();
    expect(card.getAttribute('aria-disabled')).toBe('true');
    expect(warn).toHaveBeenCalled();
  });

  it('rejects an unsafe url on a composed App, even with a custom component', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <OxygenUIThemeProvider>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms">
            <AppSwitcher.App name="Bad App" url="javascript:alert(1)" />
            <AppSwitcher.App name="Bad Routed" url="javascript:alert(1)" component="a" />
          </AppSwitcher.Section>
        </AppSwitcher>
      </OxygenUIThemeProvider>,
    );
    openSwitcher();

    for (const name of ['Bad App', 'Bad Routed']) {
      const card = cardFor(name);
      expect(card.getAttribute('href')).toBeNull();
      expect(card.getAttribute('aria-disabled')).toBe('true');
    }
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it.each(['https://api.example.com', 'http://localhost:3000/x', '/apim', 'apim', '//cdn.example.com', '?tab=1', '#top'])(
    'accepts %j',
    (url) => {
      expect(isSafeAppUrl(url)).toBe(true);
    },
  );

  it('keeps a safe url in href', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderSwitcher({ apps: [{ id: 'rel', name: 'Relative', url: '/apim' }] });
    openSwitcher();

    expect(screen.getByRole('link', { name: 'Relative' }).getAttribute('href')).toBe('/apim');
    expect(warn).not.toHaveBeenCalled();
  });
});

describe('AppSwitcher legacy behavior', () => {
  const renderLegacy = (children: React.ReactNode) =>
    render(
      <OxygenUIThemeProvider>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Section label="Platforms">{children}</AppSwitcher.Section>
        </AppSwitcher>
      </OxygenUIThemeProvider>,
    );

  it('keeps a composed App without url or onClick as an enabled button with no tooltip', () => {
    renderLegacy(<AppSwitcher.App name="Placeholder" />);
    openSwitcher();

    const card = cardFor('Placeholder');
    expect(card.tagName).toBe('BUTTON');
    expect(card.getAttribute('aria-disabled')).toBeNull();
    fireEvent.mouseOver(card);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('keeps an explicitly disabled App without a default tooltip', () => {
    renderLegacy(<AppSwitcher.App name="Analytics" disabled />);
    openSwitcher();

    const card = cardFor('Analytics');
    expect(card.getAttribute('aria-disabled')).toBe('true');
    fireEvent.mouseOver(card);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('keeps opening in a new tab and leaving the popover open without currentAppId', () => {
    renderLegacy(<AppSwitcher.App name="API Platform" url="https://api.example.com" />);
    const trigger = openSwitcher();

    const card = screen.getByRole('link', { name: 'API Platform' });
    expect(card.getAttribute('target')).toBe('_blank');
    expect(card.getAttribute('rel')).toBe('noopener noreferrer');
    expect(card.getAttribute('aria-current')).toBeNull();
    expect(card.getAttribute('aria-busy')).toBeNull();

    fireEvent.click(card);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps legacy footer links keyed by key, including one with no url', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <OxygenUIThemeProvider>
        <AppSwitcher>
          <AppSwitcher.Trigger />
          <AppSwitcher.Footer
            links={[
              { key: 'billing', name: 'Billing', url: 'https://console.example.com/billing' },
              { key: 'help', name: 'Help' },
            ]}
          />
        </AppSwitcher>
      </OxygenUIThemeProvider>,
    );
    openSwitcher();

    expect(screen.getByRole('link', { name: 'Billing' })).toBeDefined();
    // A legacy link with no url is not reinterpreted as unavailable.
    expect(cardFor('Help').getAttribute('aria-disabled')).toBeNull();
    expect(error).not.toHaveBeenCalled();
  });

  it('renders a card outside an AppSwitcher', () => {
    render(
      <OxygenUIThemeProvider>
        <AppSwitcher.App name="Standalone" url="https://example.com" />
      </OxygenUIThemeProvider>,
    );

    expect(screen.getByRole('link', { name: 'Standalone' }).getAttribute('target')).toBe('_blank');
  });
});
