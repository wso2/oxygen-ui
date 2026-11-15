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
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import OxygenUIThemeProvider from '../../contexts/OxygenUIThemeProvider/OxygenUIThemeProvider';
import {
  HEADER_BREADCRUMBS_STORAGE_KEY,
  HeaderBreadcrumbs,
  clearHeaderBreadcrumbsState,
  readHeaderBreadcrumbsState,
  useHeaderBreadcrumbs,
  useHeaderBreadcrumbsValue,
  writeHeaderBreadcrumbsState,
} from './index';
import type {
  HeaderBreadcrumbsItem,
  HeaderBreadcrumbsLevelConfig,
  HeaderBreadcrumbsValue,
  UseHeaderBreadcrumbsReturn,
} from './index';

const organizations: HeaderBreadcrumbsItem[] = [
  { id: 'thunder-id', name: 'thunder-id' },
  { id: 'wso2', name: 'WSO2' },
];

const projects: Record<string, HeaderBreadcrumbsItem[]> = {
  'thunder-id': [
    { id: 'thunderid', name: 'thunderid' },
    { id: 'docs', name: 'docs' },
  ],
  wso2: [{ id: 'oxygen-ui', name: 'oxygen-ui' }],
};

const fetchProjects = vi.fn(({ parents }: { parents: HeaderBreadcrumbsValue }) =>
  Promise.resolve(projects[parents.organization] ?? [])
);

const levels = (): HeaderBreadcrumbsLevelConfig[] => [
  { id: 'organization', label: 'Organization', fetchItems: () => Promise.resolve(organizations) },
  { id: 'project', label: 'Project', fetchItems: fetchProjects },
  {
    id: 'component',
    label: 'Component',
    fetchItems: ({ parents }) =>
      Promise.resolve(
        parents.project === 'thunderid'
          ? [
              { id: 'console', name: 'Console' },
              { id: 'gate', name: 'Gate' },
            ]
          : []
      ),
  },
];

let api: UseHeaderBreadcrumbsReturn;

const Harness = ({
  defaultValue = { organization: 'thunder-id', project: 'thunderid' },
  onChange,
  onNavigate,
  persist,
}: {
  defaultValue?: HeaderBreadcrumbsValue;
  onChange?: (value: HeaderBreadcrumbsValue) => void;
  onNavigate?: (levelId: string, item: HeaderBreadcrumbsItem) => void;
  persist?: boolean;
}) => {
  api = useHeaderBreadcrumbs({ levels: levels(), defaultValue, onChange, onNavigate, persist });
  return (
    <OxygenUIThemeProvider>
      <HeaderBreadcrumbs {...api.breadcrumbProps} />
    </OxygenUIThemeProvider>
  );
};

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  fetchProjects.mockClear();
});

describe('HeaderBreadcrumbs', () => {
  it('renders the selected names with the last one as the current page', async () => {
    render(<Harness />);
    const current = await screen.findByRole('button', { name: 'thunderid' });
    expect((current).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('button', { name: 'thunder-id' }).getAttribute('aria-current')).toBeNull();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
  });

  it('switches the organization and clears the project', async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await screen.findByRole('button', { name: 'thunderid' });

    fireEvent.click(screen.getByRole('button', { name: 'Switch organization' }));
    fireEvent.click(await screen.findByRole('menuitemradio', { name: 'WSO2' }));

    expect(onChange).toHaveBeenLastCalledWith(
      { organization: 'wso2' },
      expect.objectContaining({ type: 'select', levelId: 'organization' })
    );
    expect(screen.queryByRole('button', { name: 'thunderid' })).toBeNull();
    expect((screen.getByRole('button', { name: 'WSO2' })).getAttribute('aria-current')).toBe('page');
  });

  it('marks the selected entry in the menu', async () => {
    render(<Harness />);
    await screen.findByRole('button', { name: 'thunderid' });
    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    expect((await screen.findByRole('menuitemradio', { name: 'thunderid' })).getAttribute('aria-checked')).toBe('true');
    expect((screen.getByRole('menuitemradio', { name: 'docs' })).getAttribute('aria-checked')).toBe('false');
  });

  it('navigates to a parent and drops the levels under it', async () => {
    const onNavigate = vi.fn();
    render(<Harness onNavigate={onNavigate} />);
    await screen.findByRole('button', { name: 'thunderid' });

    fireEvent.click(screen.getByRole('button', { name: 'thunder-id' }));

    expect(onNavigate).toHaveBeenCalledWith('organization', organizations[0]);
    expect(api.value).toEqual({ organization: 'thunder-id' });
  });

  it('fetches the project list for the selected organization', async () => {
    render(<Harness />);
    await screen.findByRole('button', { name: 'thunderid' });
    expect(fetchProjects).toHaveBeenCalledWith(
      expect.objectContaining({ parents: { organization: 'thunder-id' } })
    );

    act(() => api.select('organization', 'wso2'));
    act(() => api.select('project', 'oxygen-ui'));

    expect(await screen.findByRole('button', { name: 'oxygen-ui' })).toBeTruthy();
    expect(fetchProjects).toHaveBeenLastCalledWith(
      expect.objectContaining({ parents: { organization: 'wso2' } })
    );
  });

  it('updates an item name after a rename', async () => {
    render(<Harness />);
    await screen.findByRole('button', { name: 'thunderid' });
    act(() => api.updateItem('project', 'thunderid', { name: 'ThunderID' }));
    expect(screen.getByRole('button', { name: 'ThunderID' })).toBeTruthy();
  });

  it('keeps an item added while the level is still loading', async () => {
    let resolveProjects: (items: HeaderBreadcrumbsItem[]) => void = () => {};
    const Pending = () => {
      api = useHeaderBreadcrumbs({
        levels: [
          { id: 'organization', label: 'Organization', items: organizations },
          {
            id: 'project',
            label: 'Project',
            fetchItems: () =>
              new Promise<HeaderBreadcrumbsItem[]>((resolve) => {
                resolveProjects = resolve;
              }),
          },
        ],
        defaultValue: { organization: 'thunder-id' },
      });
      return null;
    };
    render(<Pending />);
    await waitFor(() => expect(api.levels[1].loading).toBe(true));

    act(() => api.addItem('project', { id: 'new', name: 'New project' }));
    expect(api.levels[1].loading).toBe(false);

    // The fetch began before the add, so its stale list must not replace it.
    await act(async () => resolveProjects(projects['thunder-id']));
    expect(api.levels[1].items.map((item) => item.id)).toEqual(['new']);
  });

  it('returns selectedItem only for the entry selected now', async () => {
    const Fallback = () => {
      api = useHeaderBreadcrumbs({
        levels: [
          {
            id: 'organization',
            label: 'Organization',
            items: [],
            selectedItem: { id: 'wso2', name: 'WSO2' },
          },
        ],
        defaultValue: { organization: 'wso2' },
      });
      return null;
    };
    render(<Fallback />);
    expect(api.selected.organization).toEqual({ id: 'wso2', name: 'WSO2' });

    act(() => api.clear('organization'));
    expect(api.selected.organization).toBeNull();

    act(() => api.setValue({ organization: 'other' }));
    expect(api.selected.organization).toBeNull();
  });

  it('clears the level when the selected item is removed', async () => {
    render(<Harness />);
    await screen.findByRole('button', { name: 'thunderid' });
    act(() => api.removeItem('project', 'thunderid'));
    expect(api.value).toEqual({ organization: 'thunder-id' });
  });

  it('shows the fetch error in the menu', async () => {
    const Failing = () => {
      const breadcrumb = useHeaderBreadcrumbs({
        levels: [
          {
            id: 'organization',
            label: 'Organization',
            fetchItems: () => Promise.reject(new Error('Could not load organizations')),
          },
        ],
        defaultValue: { organization: 'wso2' },
      });
      return (
        <OxygenUIThemeProvider>
          <HeaderBreadcrumbs {...breadcrumb.breadcrumbProps} />
        </OxygenUIThemeProvider>
      );
    };
    render(<Failing />);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'wso2' })).toBeTruthy()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch organization' }));
    expect((await screen.findByRole('alert')).textContent).toContain('Could not load organizations');
  });

  it('filters entries with the search field', async () => {
    const many = Array.from({ length: 8 }, (_, index) => ({
      id: `project-${index}`,
      name: `Project ${index}`,
    }));
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs
          levels={[{ id: 'project', label: 'Project', items: many, selectedId: 'project-0' }]}
        />
      </OxygenUIThemeProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Find project' }), {
      target: { value: 'project 7' },
    });
    expect(screen.getAllByRole('menuitemradio')).toHaveLength(1);
    expect(screen.getByRole('menuitemradio', { name: 'Project 7' })).toBeTruthy();
  });

  it('shows an open project button on an organization page', async () => {
    render(<Harness defaultValue={{ organization: 'thunder-id' }} />);
    const open = await screen.findByRole('button', { name: 'Open project' });
    expect(screen.getByRole('button', { name: 'thunder-id' }).getAttribute('aria-current')).toBe(
      'page'
    );
    expect(screen.queryByRole('button', { name: 'Open component' })).toBeNull();

    fireEvent.click(open);
    fireEvent.click(await screen.findByRole('menuitemradio', { name: 'thunderid' }));

    expect(api.value).toEqual({ organization: 'thunder-id', project: 'thunderid' });
    expect(screen.queryByRole('button', { name: 'Open project' })).toBeNull();
    expect(await screen.findByRole('button', { name: 'Open component' })).toBeTruthy();
  });

  it('opens a component from a project page', async () => {
    render(<Harness />);
    fireEvent.click(await screen.findByRole('button', { name: 'Open component' }));
    fireEvent.click(await screen.findByRole('menuitemradio', { name: 'Gate' }));

    expect(api.value).toEqual({
      organization: 'thunder-id',
      project: 'thunderid',
      component: 'gate',
    });
    expect(screen.getByRole('button', { name: 'Gate' }).getAttribute('aria-current')).toBe('page');
    expect(screen.queryByRole('button', { name: /^Open / })).toBeNull();
  });

  it('shows an open button after navigating up to the organization', async () => {
    render(<Harness />);
    fireEvent.click(await screen.findByRole('button', { name: 'thunder-id' }));
    expect(await screen.findByRole('button', { name: 'Open project' })).toBeTruthy();
  });

  it('ends at the last level given, without an open button', () => {
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs
          levels={[
            { id: 'organization', label: 'Organization', items: organizations, selectedId: 'wso2' },
          ]}
        />
      </OxygenUIThemeProvider>
    );
    expect(screen.getByRole('button', { name: 'WSO2' }).getAttribute('aria-current')).toBe('page');
    expect(screen.queryByRole('button', { name: /^Open / })).toBeNull();
  });
});

describe('HeaderBreadcrumbs actions', () => {
  const projectLevels = (overrides: Record<string, unknown> = {}) => [
    { id: 'organization', label: 'Organization', items: organizations, selectedId: 'thunder-id' },
    {
      id: 'project',
      label: 'Project',
      items: projects['thunder-id'],
      selectedId: 'thunderid',
      ...overrides,
    },
  ];

  const renderWith = (
    props: Partial<React.ComponentProps<typeof HeaderBreadcrumbs>> = {},
    overrides: Record<string, unknown> = {}
  ) =>
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs levels={projectLevels(overrides)} {...props} />
      </OxygenUIThemeProvider>
    );

  it('shows no actions without handlers', () => {
    renderWith();
    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    expect(screen.queryByRole('menuitem', { name: 'New project' })).toBeNull();
    expect(screen.queryByRole('menuitem', { name: 'Manage projects' })).toBeNull();
  });

  it('calls onCreate and onManage with the level and the selection', () => {
    const onCreate = vi.fn();
    const onManage = vi.fn();
    renderWith({ onCreate, onManage });

    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'New project' }));
    const context = {
      levelId: 'project',
      value: { organization: 'thunder-id', project: 'thunderid' },
    };
    expect(onCreate).toHaveBeenCalledWith('project', context);

    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Manage projects' }));
    expect(onManage).toHaveBeenCalledWith('project', context);
  });

  it('lets a level relabel, hide or take over an action', () => {
    const onCreate = vi.fn();
    const onManage = vi.fn();
    const ownManage = vi.fn();
    renderWith(
      { onCreate, onManage },
      {
        pluralLabel: 'Apps',
        createAction: false,
        manageAction: { label: 'All apps', onClick: ownManage },
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    expect(screen.queryByRole('menuitem', { name: 'New project' })).toBeNull();
    fireEvent.click(screen.getByRole('menuitem', { name: 'All apps' }));
    expect(ownManage).toHaveBeenCalledTimes(1);
    expect(onManage).not.toHaveBeenCalled();
  });

  it('uses the plural label for manage', () => {
    renderWith({ onManage: vi.fn() }, { pluralLabel: 'Apps' });
    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    expect(screen.getByRole('menuitem', { name: 'Manage apps' })).toBeTruthy();
  });

  it('renders an action with href as a link', () => {
    renderWith({}, { manageAction: { href: '/projects' } });
    fireEvent.click(screen.getByRole('button', { name: 'Switch project' }));
    const link = screen.getByRole('menuitem', { name: 'Manage projects' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/projects');
  });

  it('offers actions from the open button menu', () => {
    const onCreate = vi.fn();
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs
          onCreate={onCreate}
          levels={[
            { id: 'organization', label: 'Organization', items: organizations, selectedId: 'wso2' },
            { id: 'project', label: 'Project', items: [] },
          ]}
        />
      </OxygenUIThemeProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open project' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'New project' }));
    expect(onCreate).toHaveBeenCalledWith('project', {
      levelId: 'project',
      value: { organization: 'wso2' },
    });
  });
});

describe('HeaderBreadcrumbs labels', () => {
  it('shows each level name above it and describes the name with it', () => {
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs
          showLabels
          levels={[
            { id: 'organization', label: 'Organization', items: organizations, selectedId: 'wso2' },
            { id: 'project', label: 'Project', items: [] },
          ]}
        />
      </OxygenUIThemeProvider>
    );
    const name = screen.getByRole('button', { name: 'WSO2' });
    const labelId = name.getAttribute('aria-describedby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId as string)?.textContent).toBe('Organization');
    const open = screen.getByRole('button', { name: 'Open project' });
    expect(document.getElementById(open.getAttribute('aria-describedby') as string)?.textContent).toBe(
      'Project'
    );
  });

  it('does not show labels by default', () => {
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs
          levels={[{ id: 'organization', label: 'Organization', items: organizations, selectedId: 'wso2' }]}
        />
      </OxygenUIThemeProvider>
    );
    expect(screen.queryByText('Organization')).toBeNull();
    expect(screen.getByRole('button', { name: 'WSO2' }).getAttribute('aria-describedby')).toBeNull();
  });
});

describe('HeaderBreadcrumbs icons', () => {
  const iconLevels = [
    {
      id: 'organization',
      label: 'Organization',
      icon: <svg data-testid="org-icon" />,
      items: organizations,
      selectedId: 'wso2',
    },
    { id: 'project', label: 'Project', icon: <svg data-testid="project-icon" />, items: [] },
  ];

  it('shows each level icon by default and names the level for screen readers', () => {
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs levels={iconLevels} />
      </OxygenUIThemeProvider>
    );
    expect(screen.getByTestId('org-icon')).toBeTruthy();
    // The next level shows a › button instead of its icon.
    expect(screen.queryByTestId('project-icon')).toBeNull();
    // The icon is hidden from the accessible name; the level name describes the button.
    const name = screen.getByRole('button', { name: 'WSO2' });
    expect(document.getElementById(name.getAttribute('aria-describedby') as string)?.textContent).toBe(
      'Organization'
    );
    const open = screen.getByRole('button', { name: 'Open project' });
    expect(document.getElementById(open.getAttribute('aria-describedby') as string)?.textContent).toBe(
      'Project'
    );
  });

  it('shows labels in place of icons', () => {
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs showLabels levels={iconLevels} />
      </OxygenUIThemeProvider>
    );
    expect(screen.queryByTestId('org-icon')).toBeNull();
    expect(screen.getAllByText('Organization').length).toBeGreaterThan(0);
  });

  it('hides icons with showIcons false', () => {
    render(
      <OxygenUIThemeProvider>
        <HeaderBreadcrumbs showIcons={false} levels={iconLevels} />
      </OxygenUIThemeProvider>
    );
    expect(screen.queryByTestId('org-icon')).toBeNull();
    expect(screen.getByRole('button', { name: 'WSO2' }).getAttribute('aria-describedby')).toBeNull();
  });
});

describe('useHeaderBreadcrumbs persistence', () => {
  it('does not touch storage unless persist is on', async () => {
    render(<Harness />);
    await screen.findByRole('button', { name: 'thunderid' });
    expect(window.localStorage.getItem(HEADER_BREADCRUMBS_STORAGE_KEY)).toBeNull();
  });

  it('stores only the selected ids', async () => {
    render(<Harness persist />);
    await screen.findByRole('button', { name: 'thunderid' });
    await waitFor(() =>
      expect(readHeaderBreadcrumbsState()?.value).toEqual({
        organization: 'thunder-id',
        project: 'thunderid',
      })
    );
    const raw = JSON.parse(window.localStorage.getItem(HEADER_BREADCRUMBS_STORAGE_KEY) ?? '{}');
    expect(Object.keys(raw).sort()).toEqual(['updatedAt', 'value', 'version']);
  });

  it('starts from the stored selection', async () => {
    writeHeaderBreadcrumbsState({ organization: 'wso2', project: 'oxygen-ui' });
    render(<Harness persist defaultValue={{ organization: 'thunder-id' }} />);
    expect(api.value).toEqual({ organization: 'wso2', project: 'oxygen-ui' });
    expect(
      (await screen.findByRole('button', { name: 'oxygen-ui' })).getAttribute('aria-current')
    ).toBe('page');
  });

  it('follows a change written by another app', async () => {
    const onChange = vi.fn();
    render(<Harness persist onChange={onChange} />);
    await screen.findByRole('button', { name: 'thunderid' });

    act(() =>
      writeHeaderBreadcrumbsState({ organization: 'wso2' })
    );

    expect(api.value).toEqual({ organization: 'wso2' });
    expect(onChange).toHaveBeenLastCalledWith({ organization: 'wso2' }, { type: 'sync' });
    expect(await screen.findByRole('button', { name: 'Open project' })).toBeTruthy();
  });

  it('follows a change from another tab through the storage event', async () => {
    render(<Harness persist />);
    await screen.findByRole('button', { name: 'thunderid' });
    const newValue = JSON.stringify({
      version: 1,
      value: { organization: 'thunder-id', project: 'docs' },
      updatedAt: 1,
    });
    window.localStorage.setItem(HEADER_BREADCRUMBS_STORAGE_KEY, newValue);
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: HEADER_BREADCRUMBS_STORAGE_KEY,
          newValue,
          storageArea: window.localStorage,
        })
      );
    });
    expect(api.value).toEqual({ organization: 'thunder-id', project: 'docs' });
    expect(await screen.findByRole('button', { name: 'docs' })).toBeTruthy();
  });

  it('ignores corrupt stored data', () => {
    window.localStorage.setItem(HEADER_BREADCRUMBS_STORAGE_KEY, '{not json');
    expect(readHeaderBreadcrumbsState()).toBeNull();
    render(<Harness persist defaultValue={{ organization: 'wso2' }} />);
    expect(api.value).toEqual({ organization: 'wso2' });
  });
});

describe('useHeaderBreadcrumbsValue', () => {
  const Reader = ({ onRender }: { onRender: (value: Record<string, string>) => void }) => {
    onRender(useHeaderBreadcrumbsValue());
    return null;
  };

  it('returns an empty object when nothing is stored', () => {
    const onRender = vi.fn();
    render(<Reader onRender={onRender} />);
    expect(onRender).toHaveBeenLastCalledWith({});
  });

  it('returns the stored selection and follows changes', () => {
    writeHeaderBreadcrumbsState({ organization: 'wso2' });
    const onRender = vi.fn();
    render(<Reader onRender={onRender} />);
    expect(onRender).toHaveBeenLastCalledWith({ organization: 'wso2' });

    act(() => writeHeaderBreadcrumbsState({ organization: 'wso2', project: 'oxygen-ui' }));
    expect(onRender).toHaveBeenLastCalledWith({ organization: 'wso2', project: 'oxygen-ui' });

    act(() => clearHeaderBreadcrumbsState());
    expect(onRender).toHaveBeenLastCalledWith({});
  });

  it('follows the selection made in a persisted breadcrumb', async () => {
    const onRender = vi.fn();
    render(
      <>
        <Harness persist />
        <Reader onRender={onRender} />
      </>
    );
    await screen.findByRole('button', { name: 'thunderid' });
    await waitFor(() =>
      expect(onRender).toHaveBeenLastCalledWith({ organization: 'thunder-id', project: 'thunderid' })
    );
  });
});
