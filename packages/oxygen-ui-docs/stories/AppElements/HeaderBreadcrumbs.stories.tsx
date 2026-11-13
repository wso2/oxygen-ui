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
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Box,
  Button,
  Header,
  HeaderBreadcrumbs,
  Stack,
  Typography,
  clearHeaderBreadcrumbsState,
  readHeaderBreadcrumbsState,
  subscribeHeaderBreadcrumbsState,
  useHeaderBreadcrumbs,
  useHeaderBreadcrumbsValue,
  type HeaderBreadcrumbsStoredState,
  type HeaderBreadcrumbsItem,
  type HeaderBreadcrumbsLevelConfig,
  type HeaderBreadcrumbsValue,
} from '@wso2/oxygen-ui';
import { Box as BoxIcon, Building2, Plus, ScrollText } from '@wso2/oxygen-ui-icons-react';
// Storybook's indexer fails to parse a JSX tag named `WSO2`.
import { WSO2 as Wso2Logo } from '@wso2/oxygen-ui-icons-react';

/**
 * HeaderBreadcrumbs shows where the user is (organization / project / component) and
 * lets them jump to any level or switch to another entry of any level.
 */
const meta: Meta<typeof HeaderBreadcrumbs> = {
  title: 'App Elements/Header Breadcrumbs',
  component: HeaderBreadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Shows where the user is, such as \`thunder-id / thunderid\`, and lets them jump to any level or switch to another entry.

\`\`\`tsx
import { Header, HeaderBreadcrumbs, useHeaderBreadcrumbs } from '@wso2/oxygen-ui';

const breadcrumb = useHeaderBreadcrumbs({
  levels: [
    {
      id: 'organization',
      label: 'Organization',
      fetchItems: ({ signal }) => api.organizations({ signal }),
    },
    {
      id: 'project',
      label: 'Project',
      fetchItems: ({ parents, signal }) => api.projects(parents.organization, { signal }),
    },
    {
      id: 'component',
      label: 'Component',
      fetchItems: ({ parents, signal }) => api.components(parents.project, { signal }),
    },
  ],
  value: valueFromRoute,
  onChange: (next) => navigate(routeFor(next)),
  onNavigate: (levelId, item) => navigate(item.href!),
});

<Header.Switchers>
  <HeaderBreadcrumbs {...breadcrumb.breadcrumbProps} linkComponent={RouterLink} />
</Header.Switchers>
\`\`\`

### Segments

- **Name** goes to that entry's page and drops the levels under it.
- **Caret** opens a menu to switch to another entry of the same level. Switching clears the levels under it.
- The last segment is the current page (\`aria-current="page"\`).
- After the trail, a **›** button opens the next level (tooltip "Open project" or "Open component"). Leave a level out of \`levels\` to remove it and its **›** button; rename the button with a level's \`openLabel\`.

### Variants

| Prop | Shows |
| --- | --- |
| \`showLabels\` | The level name in small text above each segment |
| \`showIcons\` | The level's \`icon\` before each segment, with the level name on hover. On by default; \`false\` hides them, and \`showLabels\` replaces them |

### Menu

- Lists the level's entries with a check on the current one.
- Adds a search field above 6 entries (\`searchable\`).
- Ends with "New project" from \`onCreate\` and "Manage projects" from \`onManage\`. A level can relabel, link (\`href\`) or hide each with \`createAction\` and \`manageAction\`, and add its own \`actions\`.
- Every action's \`onClick\` gets the click event and the current selection. Call \`preventDefault()\` on a link to run your own logic instead.

### Data

\`useHeaderBreadcrumbs\` keeps the selected id of each level, fetches each level from its parents' selection, and returns \`breadcrumbProps\` to spread on the component.

- \`setValue\` syncs with the URL.
- \`addItem\`, \`updateItem\`, \`removeItem\` and \`refresh\` update the lists after a change elsewhere in the app.

### Sharing across apps

With \`persist\`, the selected ids (not the items) are kept in \`localStorage\`. Apps on the same origin that use the same key start from that selection and follow each other's changes. Apps on different subdomains do not share \`localStorage\`.

\`\`\`tsx
const { organization, project } = useHeaderBreadcrumbsValue(); // any app, re-renders on change
readHeaderBreadcrumbsState(); // outside React
clearHeaderBreadcrumbsState(); // on sign-out
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderBreadcrumbs>;

// --- Mock data ---------------------------------------------------------------

const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const orgAvatar = (name: string) => (
  <Avatar variant="rounded" sx={{ width: 24, height: 24, fontSize: 12 }}>
    {initials(name)}
  </Avatar>
);

const ORGANIZATIONS: HeaderBreadcrumbsItem[] = [
  { id: 'thunder-id', name: 'thunder-id', description: 'Owner', avatar: orgAvatar('thunder id') },
  { id: 'wso2', name: 'WSO2', description: 'Member', avatar: orgAvatar('WSO2') },
  { id: 'personal', name: 'Personal', avatar: orgAvatar('Personal') },
];

const PROJECTS: Record<string, HeaderBreadcrumbsItem[]> = {
  'thunder-id': [
    { id: 'thunderid', name: 'thunderid', description: 'Identity and access management' },
    { id: 'thunderid-docs', name: 'thunderid-docs', description: 'Documentation site' },
    { id: 'javascript-sdks', name: 'javascript-sdks' },
    { id: 'ios-sdks', name: 'ios-sdks' },
    { id: 'android-sdks', name: 'android-sdks' },
    { id: 'flutter-sdks', name: 'flutter-sdks' },
    { id: 'samples', name: 'samples' },
    { id: 'legacy-console', name: 'legacy-console', disabled: true, description: 'Archived' },
  ],
  wso2: [
    { id: 'oxygen-ui', name: 'oxygen-ui', description: 'Design system' },
    { id: 'choreo', name: 'choreo' },
  ],
  personal: [],
};

const COMPONENTS: Record<string, HeaderBreadcrumbsItem[]> = {
  thunderid: [
    { id: 'console', name: 'Console' },
    { id: 'gate', name: 'Gate' },
    { id: 'backend', name: 'Backend' },
  ],
  'thunderid-docs': [{ id: 'site', name: 'Site' }],
  'oxygen-ui': [
    { id: 'core', name: 'Core' },
    { id: 'icons', name: 'Icons' },
    { id: 'charts', name: 'Charts' },
  ],
};

/** Resolves after a short delay, like a network request, and honors abort. */
const delay = <T,>(result: T, signal: AbortSignal, ms = 500): Promise<T> =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(result), ms);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

const createLevels = (): HeaderBreadcrumbsLevelConfig[] => [
  {
    id: 'organization',
    label: 'Organization',
    icon: <Building2 />,
    fetchItems: ({ signal }) => delay(ORGANIZATIONS, signal),
  },
  {
    id: 'project',
    label: 'Project',
    icon: <BoxIcon />,
    fetchItems: ({ parents, signal }) => delay(PROJECTS[parents.organization] ?? [], signal),
  },
  {
    id: 'component',
    label: 'Component',
    icon: <ComponentIcon />,
    fetchItems: ({ parents, signal }) => delay(COMPONENTS[parents.project] ?? [], signal),
  },
];

/**
 * Lucide's `square-padding-top`, drawn here because the bundled lucide-react predates it.
 * Swap for the `SquarePaddingTop` import once lucide-react is upgraded.
 */
const ComponentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 7h8" />
  </svg>
);

// --- Story helpers -----------------------------------------------------------

const InHeader = ({ children }: { children: React.ReactNode }) => (
  <Header>
    <Header.Brand>
      <Header.BrandLogo>
        <Wso2Logo size={28} aria-label="WSO2" />
      </Header.BrandLogo>
    </Header.Brand>
    <Header.Switchers>{children}</Header.Switchers>
    <Header.Spacer />
  </Header>
);

const Log = ({ lines }: { lines: string[] }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="subtitle2" gutterBottom>
      Events
    </Typography>
    {lines.length === 0 ? (
      <Typography variant="body2" color="text.secondary">
        Click a name to go to it, or a caret to switch.
      </Typography>
    ) : (
      lines.map((line, index) => (
        <Typography key={index} variant="body2" component="div" sx={{ fontFamily: 'monospace' }}>
          {line}
        </Typography>
      ))
    )}
  </Box>
);

const Connected = ({
  defaultValue,
  levelIds,
  showLabels = false,
  showIcons = true,
}: {
  defaultValue: HeaderBreadcrumbsValue;
  /** Levels to keep, to show removing one. All by default. */
  levelIds?: string[];
  showLabels?: boolean;
  showIcons?: boolean;
}) => {
  const [log, setLog] = React.useState<string[]>([]);
  const push = (line: string) => setLog((prev) => [line, ...prev].slice(0, 8));

  const breadcrumb = useHeaderBreadcrumbs({
    levels: createLevels().filter((level) => !levelIds || levelIds.includes(level.id)),
    defaultValue,
    onChange: (next, change) =>
      push(`${change.type} ${change.levelId ?? ''} → ${JSON.stringify(next)}`),
    onNavigate: (levelId, item) => push(`navigate to ${levelId} "${item.name}"`),
  });

  return (
    <>
      <InHeader>
        <HeaderBreadcrumbs
          {...breadcrumb.breadcrumbProps}
          onCreate={(levelId, { value }) => push(`create ${levelId} in ${JSON.stringify(value)}`)}
          onManage={(levelId, { value }) => push(`manage ${levelId} in ${JSON.stringify(value)}`)}
          showLabels={showLabels}
          showIcons={showIcons}
        />
      </InHeader>
      <Log lines={log} />
    </>
  );
};

// --- Stories -----------------------------------------------------------------

/**
 * Organization, project and component, in the header. Fetched through
 * `useHeaderBreadcrumbs` with a short simulated delay.
 */
export const Default: Story = {
  render: () => (
    <Connected defaultValue={{ organization: 'thunder-id', project: 'thunderid', component: 'console' }} />
  ),
};

/**
 * On a project page, as in the reference: `thunder-id / thunderid ▾`, followed by
 * "Open component". The project menu has more than 6 entries, so it has a search
 * field. One entry is disabled.
 */
export const OrganizationAndProject: Story = {
  render: () => <Connected defaultValue={{ organization: 'thunder-id', project: 'thunderid' }} />,
};

/**
 * On an organization page, "Open project" opens the organization's projects. Pick one
 * and "Open component" takes its place.
 */
export const OrganizationLevel: Story = {
  render: () => <Connected defaultValue={{ organization: 'thunder-id' }} />,
};

/**
 * With `showLabels`, each level's name sits in small text above it.
 */
export const WithLabels: Story = {
  render: () => (
    <Connected
      defaultValue={{ organization: 'thunder-id', project: 'thunderid' }}
      showLabels
    />
  ),
};

/**
 * Each level's `icon` sits before its name by default: a building for the
 * organization, a box for the project, and a square for the component. Hover an icon
 * to see the level name. Screen readers hear it too. `showIcons={false}` hides them.
 */
export const WithoutIcons: Story = {
  render: () => (
    <Connected
      defaultValue={{ organization: 'thunder-id', project: 'thunderid' }}
      showIcons={false}
    />
  ),
};

/**
 * Leave a level out of `levels` to remove it. Without the component level, the trail
 * ends at the project, with no "Open component" button.
 */
export const WithoutComponentLevel: Story = {
  render: () => (
    <Connected
      defaultValue={{ organization: 'wso2', project: 'oxygen-ui' }}
      levelIds={['organization', 'project']}
    />
  ),
};

const SHARED_KEY = 'oxygen-ui-docs:header-breadcrumbs-demo';

const AppHeader = ({ name }: { name: string }) => {
  const breadcrumb = useHeaderBreadcrumbs({
    levels: createLevels(),
    defaultValue: { organization: 'thunder-id', project: 'thunderid' },
    persist: { key: SHARED_KEY },
  });
  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', px: 2, pt: 1 }}>
        {name}
      </Typography>
      <Box sx={{ px: 1.5, py: 1 }}>
        <HeaderBreadcrumbs {...breadcrumb.breadcrumbProps} showLabels />
      </Box>
    </Box>
  );
};

const StoredState = () => {
  const [state, setState] = React.useState<HeaderBreadcrumbsStoredState | null>(() =>
    readHeaderBreadcrumbsState({ key: SHARED_KEY })
  );
  React.useEffect(() => subscribeHeaderBreadcrumbsState(setState, { key: SHARED_KEY }), []);
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle2">localStorage[&quot;{SHARED_KEY}&quot;]</Typography>
        <Button size="small" variant="text" onClick={() => clearHeaderBreadcrumbsState({ key: SHARED_KEY })}>
          Clear
        </Button>
      </Stack>
      <Box
        component="pre"
        sx={{ m: 0, p: 1.5, bgcolor: 'action.hover', borderRadius: 1, fontSize: 12, overflowX: 'auto' }}
      >
        {state ? JSON.stringify(state, null, 2) : 'Nothing stored'}
      </Box>
    </Box>
  );
};

// An app without the breadcrumb reads the current context with the hook.
const ContextReader = () => {
  const { organization, project, component } = useHeaderBreadcrumbsValue({ key: SHARED_KEY });
  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, px: 2, py: 1.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        Another app, reading useHeaderBreadcrumbsValue()
      </Typography>
      <Typography variant="body2">
        Organization: {organization ?? 'none'} · Project: {project ?? 'none'} · Component:{' '}
        {component ?? 'none'}
      </Typography>
    </Box>
  );
};

/**
 * Two apps on the same origin share one selection through `persist`. Switch the
 * organization or project in one, and the other follows. A third app reads the
 * selection with `useHeaderBreadcrumbsValue`. Only the ids are stored. Reload the page and both
 * start where you left off. Open this story in a second tab to see tabs follow too.
 */
export const SharedAcrossApps: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Stack spacing={2}>
      <AppHeader name="Console app" />
      <AppHeader name="Gate app" />
      <ContextReader />
      <StoredState />
    </Stack>
  ),
};

/**
 * Updating data with the hook: create a project from "New project" in the project
 * menu or from the button, rename the current project, or refresh the lists.
 */
export const UpdatingData: Story = {
  render: function UpdatingDataStory() {
    const counter = React.useRef(1);
    const breadcrumbRef = React.useRef<ReturnType<typeof useHeaderBreadcrumbs> | null>(null);

    const createProject = () => {
      const breadcrumb = breadcrumbRef.current;
      if (!breadcrumb) {
        return;
      }
      const id = `new-project-${counter.current}`;
      breadcrumb.addItem('project', { id, name: `new-project-${counter.current}` });
      breadcrumb.select('project', id);
      counter.current += 1;
    };

    const breadcrumb = useHeaderBreadcrumbs({
      levels: createLevels(),
      defaultValue: { organization: 'thunder-id', project: 'thunderid' },
    });
    breadcrumbRef.current = breadcrumb;

    const project = breadcrumb.selected.project;

    return (
      <>
        <InHeader>
          <HeaderBreadcrumbs
            {...breadcrumb.breadcrumbProps}
            onCreate={(levelId) => {
              if (levelId === 'project') {
                createProject();
              }
            }}
          />
        </InHeader>
        <Stack direction="row" spacing={1} sx={{ p: 3 }} flexWrap="wrap" useFlexGap>
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={createProject}>
            Create project
          </Button>
          <Button
            variant="outlined"
            disabled={!project}
            onClick={() =>
              project &&
              breadcrumb.updateItem('project', project.id, { name: `${project.name}-renamed` })
            }
          >
            Rename current project
          </Button>
          <Button variant="text" onClick={() => void breadcrumb.refresh()}>
            Refresh
          </Button>
        </Stack>
        <Box sx={{ px: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            value: {JSON.stringify(breadcrumb.value)}
          </Typography>
        </Box>
      </>
    );
  },
};

/**
 * Levels without the hook: pass `levels` with items and `selectedId`, and handle
 * `onSelect` and `onNavigate` yourself.
 */
export const Uncontrolled: Story = {
  parameters: { layout: 'padded' },
  render: function UncontrolledStory() {
    const [value, setValue] = React.useState<HeaderBreadcrumbsValue>({
      organization: 'wso2',
      project: 'oxygen-ui',
    });
    return (
      <HeaderBreadcrumbs
        levels={[
          {
            id: 'organization',
            label: 'Organization',
            items: ORGANIZATIONS,
            selectedId: value.organization,
          },
          {
            id: 'project',
            label: 'Project',
            items: PROJECTS[value.organization] ?? [],
            selectedId: value.project,
          },
        ]}
        onSelect={(levelId, item) =>
          setValue((prev) =>
            levelId === 'organization' ? { organization: item.id } : { ...prev, [levelId]: item.id }
          )
        }
        onNavigate={(levelId) => {
          if (levelId === 'organization') {
            setValue((prev) => ({ organization: prev.organization }));
          }
        }}
      />
    );
  },
};

/**
 * A level that is still loading shows a placeholder in place of its name.
 */
export const Loading: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <HeaderBreadcrumbs
      levels={[
        { id: 'organization', label: 'Organization', items: ORGANIZATIONS, selectedId: 'thunder-id' },
        { id: 'project', label: 'Project', items: [], selectedId: 'thunderid', loading: true },
      ]}
    />
  ),
};

/**
 * A failed fetch shows its message in the menu. Open the project caret.
 */
export const LoadError: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <HeaderBreadcrumbs
      levels={[
        { id: 'organization', label: 'Organization', items: ORGANIZATIONS, selectedId: 'thunder-id' },
        {
          id: 'project',
          label: 'Project',
          items: [],
          selectedId: 'thunderid',
          error: 'Could not load projects. Try again.',
        },
      ]}
    />
  ),
};

/**
 * Menu actions. `onCreate` and `onManage` add "New {level}" and "Manage {levels}" to
 * every level's menu and receive the level and the current selection, so you can open
 * a dialog or navigate. A level overrides them with `createAction` and `manageAction`:
 *
 * - Organization: "Manage organizations" is a link (`href`) whose `onClick` calls
 *   `preventDefault()` to run its own logic instead.
 * - Project: "New project" is relabelled "Create project".
 * - Component: "New component" is hidden (`false`), and a custom "View logs" action
 *   is added through `actions`.
 */
export const MenuActions: Story = {
  render: function MenuActionsStory() {
    const [log, setLog] = React.useState<string[]>([]);
    const push = (line: string) => setLog((prev) => [line, ...prev].slice(0, 8));
    const [organization, project, component] = createLevels();

    const breadcrumb = useHeaderBreadcrumbs({
      levels: [
        {
          ...organization,
          manageAction: {
            href: '/organizations',
            onClick: (event) => {
              event.preventDefault();
              push('manage organizations: custom logic instead of /organizations');
            },
          },
        },
        { ...project, createAction: { label: 'Create project' } },
        {
          ...component,
          createAction: false,
          actions: [
            {
              key: 'logs',
              label: 'View logs',
              icon: <ScrollText size={16} />,
              onClick: (_event, { value }) => push(`view logs of ${value.component}`),
            },
          ],
        },
      ],
      defaultValue: { organization: 'thunder-id', project: 'thunderid', component: 'console' },
    });

    return (
      <>
        <InHeader>
          <HeaderBreadcrumbs
            {...breadcrumb.breadcrumbProps}
            onCreate={(levelId, { value }) => push(`create ${levelId} in ${JSON.stringify(value)}`)}
            onManage={(levelId) => push(`manage ${levelId}s`)}
          />
        </InHeader>
        <Log lines={log} />
      </>
    );
  },
};
