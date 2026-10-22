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
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Description, Primary, Subtitle, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography, CodeBlock, Box, Divider, Chip, Sidebar } from '@wso2/oxygen-ui';
import {
  Bell,
  Boxes,
  Database,
  FolderOpen,
  Gauge,
  HelpCircle,
  Home,
  KeyRound,
  Layers,
  Rocket,
  ScrollText,
  Settings,
  Shield,
  Users,
  Variable,
  Webhook,
  Wrench,
} from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * How to group side panel items with section titles and collapsible groups.
 */
const meta: Meta = {
  title: 'Guides/Side Panel Navigation',
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

interface SamplePanelProps {
  activeItem: string;
  expanded?: string[];
  height?: number;
  children: React.ReactNode;
}

function SamplePanel({ activeItem: initialActive, expanded = [], height = 420, children }: SamplePanelProps) {
  const [activeItem, setActiveItem] = React.useState(initialActive);
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(expanded.map((id) => [id, true]))
  );

  const handleToggleExpand = (id: string) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ height, width: 250, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <Sidebar
        collapsed={false}
        activeItem={activeItem}
        expandedMenus={expandedMenus}
        onSelect={setActiveItem}
        onToggleExpand={handleToggleExpand}
      >
        {children}
      </Sidebar>
    </Box>
  );
}

interface ItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}

function Item({ id, icon, label, children }: ItemProps) {
  return (
    <Sidebar.Item id={id}>
      <Sidebar.ItemIcon>{icon}</Sidebar.ItemIcon>
      <Sidebar.ItemLabel>{label}</Sidebar.ItemLabel>
      {children}
    </Sidebar.Item>
  );
}

function PinnedFooter() {
  return (
    <Sidebar.Footer>
      <Sidebar.Category>
        <Item id="notifications" icon={<Bell size={20} />} label="Notifications" />
        <Item id="help" icon={<HelpCircle size={20} />} label="Help" />
        <Item id="settings" icon={<Settings size={20} />} label="Settings" />
      </Sidebar.Category>
    </Sidebar.Footer>
  );
}

interface DoDontProps {
  doSample: React.ReactNode;
  doCaption: string;
  dontSample: React.ReactNode;
  dontCaption: string;
}

function DoDont({ doSample, doCaption, dontSample, dontCaption }: DoDontProps) {
  const columns = [
    { label: 'Do', color: 'success' as const, sample: doSample, caption: doCaption },
    { label: "Don't", color: 'error' as const, sample: dontSample, caption: dontCaption },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 2 }}>
      {columns.map((column) => (
        <Stack key={column.label} spacing={1}>
          <Chip label={column.label} color={column.color} size="small" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
          {column.sample}
          <Typography variant="body2">{column.caption}</Typography>
        </Stack>
      ))}
    </Box>
  );
}

interface GuidelineSectionProps {
  title: string;
  purpose: string;
  rules: React.ReactNode[];
  children?: React.ReactNode;
}

function GuidelineSection({ title, purpose, rules, children }: GuidelineSectionProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {purpose}
      </Typography>
      <Box component="ul" sx={{ pl: 3, m: 0 }}>
        {rules.map((rule, index) => (
          <li key={index}><Typography variant="body2">{rule}</Typography></li>
        ))}
      </Box>
      {children}
    </Box>
  );
}

function RecommendedPanel() {
  return (
    <SamplePanel activeItem="api-keys" expanded={['developer-tools']} height={520}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="home" icon={<Home size={20} />} label="Home" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Build</Sidebar.CategoryLabel>
          <Item id="projects" icon={<FolderOpen size={20} />} label="Projects" />
          <Item id="components" icon={<Boxes size={20} />} label="Components" />
          <Item id="deployments" icon={<Rocket size={20} />} label="Deployments" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Observe</Sidebar.CategoryLabel>
          <Item id="logs" icon={<ScrollText size={20} />} label="Logs" />
          <Item id="metrics" icon={<Gauge size={20} />} label="Metrics" />
          <Item id="developer-tools" icon={<Wrench size={20} />} label="Developer tools">
            <Item id="api-keys" icon={<KeyRound size={20} />} label="API keys" />
            <Item id="webhooks" icon={<Webhook size={20} />} label="Webhooks" />
            <Item id="variables" icon={<Variable size={20} />} label="Environment variables" />
          </Item>
        </Sidebar.Category>
      </Sidebar.Nav>
      <PinnedFooter />
    </SamplePanel>
  );
}

function FewTitlesPanel() {
  return (
    <SamplePanel activeItem="projects" expanded={[]} height={360}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Build</Sidebar.CategoryLabel>
          <Item id="projects" icon={<FolderOpen size={20} />} label="Projects" />
          <Item id="components" icon={<Boxes size={20} />} label="Components" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Manage</Sidebar.CategoryLabel>
          <Item id="users" icon={<Users size={20} />} label="Users" />
          <Item id="access" icon={<Shield size={20} />} label="Access control" />
          <Item id="data" icon={<Database size={20} />} label="Data">
            <Item id="databases" icon={<Layers size={20} />} label="Databases" />
          </Item>
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

function TitlesOnlyPanel() {
  return (
    <SamplePanel activeItem="projects" height={360}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Build</Sidebar.CategoryLabel>
          <Item id="projects" icon={<FolderOpen size={20} />} label="Projects" />
          <Item id="components" icon={<Boxes size={20} />} label="Components" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Deploy</Sidebar.CategoryLabel>
          <Item id="deployments" icon={<Rocket size={20} />} label="Deployments" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Observe</Sidebar.CategoryLabel>
          <Item id="logs" icon={<ScrollText size={20} />} label="Logs" />
          <Item id="metrics" icon={<Gauge size={20} />} label="Metrics" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Manage</Sidebar.CategoryLabel>
          <Item id="users" icon={<Users size={20} />} label="Users" />
          <Item id="access" icon={<Shield size={20} />} label="Access control" />
        </Sidebar.Category>
        <Sidebar.Category>
          <Sidebar.CategoryLabel>Developer tools</Sidebar.CategoryLabel>
          <Item id="api-keys" icon={<KeyRound size={20} />} label="API keys" />
          <Item id="webhooks" icon={<Webhook size={20} />} label="Webhooks" />
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

function DistinctIconsPanel() {
  return (
    <SamplePanel activeItem="webhooks" expanded={['developer-tools']} height={280}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="developer-tools" icon={<Wrench size={20} />} label="Developer tools">
            <Item id="api-keys" icon={<KeyRound size={20} />} label="API keys" />
            <Item id="webhooks" icon={<Webhook size={20} />} label="Webhooks" />
            <Item id="variables" icon={<Variable size={20} />} label="Environment variables" />
          </Item>
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

function SameIconsPanel() {
  return (
    <SamplePanel activeItem="webhooks" expanded={['developer-tools']} height={280}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="developer-tools" icon={<Wrench size={20} />} label="Developer tools">
            <Item id="api-keys" icon={<Wrench size={20} />} label="API keys" />
            <Item id="webhooks" icon={<Wrench size={20} />} label="Webhooks" />
            <Item id="variables" icon={<Wrench size={20} />} label="Environment variables" />
          </Item>
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

function OneLevelPanel() {
  return (
    <SamplePanel activeItem="logs" expanded={['observability']} height={280}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="observability" icon={<Gauge size={20} />} label="Observability">
            <Item id="logs" icon={<ScrollText size={20} />} label="Logs" />
            <Item id="alerts" icon={<Bell size={20} />} label="Alerts" />
            <Item id="metrics" icon={<Layers size={20} />} label="Metrics" />
          </Item>
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

function NestedGroupsPanel() {
  return (
    <SamplePanel activeItem="logs" expanded={['observability', 'monitoring']} height={280}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="observability" icon={<Gauge size={20} />} label="Observability">
            <Item id="monitoring" icon={<Layers size={20} />} label="Monitoring">
              <Item id="logs" icon={<ScrollText size={20} />} label="Logs" />
              <Item id="alerts" icon={<Bell size={20} />} label="Alerts" />
            </Item>
          </Item>
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

function PinnedFooterPanel() {
  return (
    <SamplePanel activeItem="projects" height={360}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="projects" icon={<FolderOpen size={20} />} label="Projects" />
          <Item id="components" icon={<Boxes size={20} />} label="Components" />
          <Item id="deployments" icon={<Rocket size={20} />} label="Deployments" />
        </Sidebar.Category>
      </Sidebar.Nav>
      <PinnedFooter />
    </SamplePanel>
  );
}

function ScrollingFooterPanel() {
  return (
    <SamplePanel activeItem="projects" height={360}>
      <Sidebar.Nav>
        <Sidebar.Category>
          <Item id="projects" icon={<FolderOpen size={20} />} label="Projects" />
          <Item id="components" icon={<Boxes size={20} />} label="Components" />
          <Item id="deployments" icon={<Rocket size={20} />} label="Deployments" />
          <Item id="logs" icon={<ScrollText size={20} />} label="Logs" />
          <Item id="users" icon={<Users size={20} />} label="Users" />
          <Item id="notifications" icon={<Bell size={20} />} label="Notifications" />
          <Item id="help" icon={<HelpCircle size={20} />} label="Help" />
          <Item id="settings" icon={<Settings size={20} />} label="Settings" />
        </Sidebar.Category>
      </Sidebar.Nav>
    </SamplePanel>
  );
}

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Side panel navigation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Group side panel items with section titles and collapsible groups. Titles keep the main
            areas visible. Collapsible groups keep the panel short as the number of items grows.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            When to use titles vs collapsible groups
          </Typography>
          <CodeBlock
            language="markup"
            code={`Section title       Main areas users need to see at a glance       Sidebar.CategoryLabel
Collapsible group   Secondary items, or a parent with sub-pages     Sidebar.Item with nested items`}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Not sure? If users visit it often, put it under a title. Otherwise, put it in a collapsible group.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Recommended structure
          </Typography>
          <Typography variant="body2" gutterBottom>
            A few titled sections, a collapsible group for secondary items, and a pinned footer.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <RecommendedPanel />
          </Box>
        </Box>

        <Divider />

        <GuidelineSection
          title="Section titles"
          purpose="Use section titles for the high-level categories users need to see at a glance."
          rules={[
            'Keep titles short and clear.',
            'Titles are labels only. They are not clickable.',
            'Limit the number of titled sections to keep the panel short.',
          ]}
        >
          <DoDont
            doSample={<FewTitlesPanel />}
            doCaption="Use a few titles and move secondary items into a collapsible group."
            dontSample={<TitlesOnlyPanel />}
            dontCaption="Don't give every group a title. The panel gets long, users have to scroll, and they miss items at the bottom."
          />
        </GuidelineSection>

        <GuidelineSection
          title="Collapsible groups"
          purpose="Use collapsible groups for secondary or less frequently used items, or for a parent with related sub-pages."
          rules={[
            'The parent item only opens and closes the group. It does not go to a page.',
            'Expand the group that contains the active page by default.',
            'Remember whether each user left a group open or closed.',
            'Use one level of nesting only. Do not put a collapsible group inside another.',
            "Give child items icons that differ from the parent's icon.",
          ]}
        >
          <DoDont
            doSample={<DistinctIconsPanel />}
            doCaption="Give each child item its own icon."
            dontSample={<SameIconsPanel />}
            dontCaption="Don't repeat the parent's icon on child items. Users can't tell them apart."
          />
          <DoDont
            doSample={<OneLevelPanel />}
            doCaption="Keep groups one level deep."
            dontSample={<NestedGroupsPanel />}
            dontCaption="Don't nest a collapsible group inside another. Items get hard to find."
          />
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            Expand the active group and remember each user&apos;s choice
          </Typography>
          <Typography variant="body2" gutterBottom>
            <code>Sidebar</code> does not store which groups are open. Control it with{' '}
            <code>expandedMenus</code> and <code>onToggleExpand</code>, and save the state per user.
          </Typography>
          <CodeBlock
            language="tsx"
            code={`const storageKey = \`side-panel-groups:\${userId}\`;

const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

// Load the user's saved groups on the client, after mount.
useEffect(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    setExpandedMenus((prev) => ({ ...saved, ...prev }));
  } catch {
    // Storage is unavailable or the saved value is invalid.
  }
}, [storageKey]);

// Open the group that contains the active page whenever it changes.
useEffect(() => {
  if (activeGroupId) {
    setExpandedMenus((prev) => ({ ...prev, [activeGroupId]: true }));
  }
}, [activeGroupId]);

const handleToggleExpand = (id: string) => {
  setExpandedMenus((prev) => {
    const next = { ...prev, [id]: !prev[id] };
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage is unavailable.
    }
    return next;
  });
};

<Sidebar expandedMenus={expandedMenus} onToggleExpand={handleToggleExpand} ...>`}
          />
        </GuidelineSection>

        <GuidelineSection
          title="Footer items"
          purpose="Pin Settings, Notifications, and Help at the bottom, outside the scroll area."
          rules={[
            <>Put them in <code>Sidebar.Footer</code>, not in <code>Sidebar.Nav</code>.</>,
          ]}
        >
          <DoDont
            doSample={<PinnedFooterPanel />}
            doCaption="Pin footer items so they are always visible."
            dontSample={<ScrollingFooterPanel />}
            dontCaption="Don't add footer items to the end of the menu. Users have to scroll to reach them."
          />
        </GuidelineSection>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            For every side panel
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Don&apos;t mix the rules. Titles never open or close, and collapsible parents never go to a page.</Typography></li>
            <li><Typography variant="body2">Add a menu search when the panel has many items.</Typography></li>
          </Box>
        </Box>
      </Stack>
    </CenterContentLayout>
  ),
};
