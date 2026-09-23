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
import { ContextSwitcher, Header, type ContextSwitcherValue } from '@wso2/oxygen-ui';

/**
 * ContextSwitcher is a chain of labeled fields for selecting through a hierarchy
 * a product defines. It belongs in `Header.Switchers`.
 */
const meta: Meta<typeof ContextSwitcher> = {
  title: 'App Elements/Context Switcher',
  component: ContextSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The chain shows each selected level and the next empty one. Choosing a field opens
that level's panel: a search box, then ungrouped options and groups. Search filters
the option text. A pick, Escape, an outside click, or a second click on the field
closes the panel. The next empty field stays closed until the user opens it.

The close button on every level after the first clears that level and every level under it.
The first level has no close button unless \`clearable\` is set. Changing a parent
clears the levels under it. The product routes from \`onChange\`.

Place the chain in \`Header.Switchers\`. That slot is visible from the \`md\` breakpoint
up, and hidden on smaller widths and in a minimal header.

\`\`\`tsx
import { ContextSwitcher, Header } from '@wso2/oxygen-ui';

<Header.Switchers>
  <ContextSwitcher value={value} onChange={setValue}>
    <ContextSwitcher.Level id="organization" label="Organization">
      <ContextSwitcher.Group label="Invited organizations">
        <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
      </ContextSwitcher.Group>
    </ContextSwitcher.Level>
    <ContextSwitcher.Level id="project" label="Project">
      <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
    </ContextSwitcher.Level>
  </ContextSwitcher>
</Header.Switchers>
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextSwitcher>;

const Chain = () => {
  const [value, setValue] = React.useState<ContextSwitcherValue>({
    organization: 'wso2',
    project: 'finance-web',
  });

  return (
    <ContextSwitcher value={value} onChange={setValue}>
      <ContextSwitcher.Level id="organization" label="Organization">
        <ContextSwitcher.Option value="personal">Personal</ContextSwitcher.Option>
        <ContextSwitcher.Group label="Invited organizations">
          <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          <ContextSwitcher.Option value="demo">Demo Organization</ContextSwitcher.Option>
        </ContextSwitcher.Group>
      </ContextSwitcher.Level>
      <ContextSwitcher.Level id="project" label="Project">
        <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
        <ContextSwitcher.Option value="sales">Sales</ContextSwitcher.Option>
        <ContextSwitcher.Option value="hris" disabled>
          HRIS
        </ContextSwitcher.Option>
      </ContextSwitcher.Level>
      <ContextSwitcher.Level id="component" label="Component">
        <ContextSwitcher.Option value="mis-arr">MIS ARR Backend</ContextSwitcher.Option>
        <ContextSwitcher.Option value="collections">Collections Sync</ContextSwitcher.Option>
      </ContextSwitcher.Level>
    </ContextSwitcher>
  );
};

/**
 * The chain in the header, beside the product name. Open a field to search and
 * pick. Close a level to clear it and everything under it.
 */
export const InHeader: Story = {
  render: () => (
    <Header>
      <Header.Brand>
        <Header.BrandTitle>Developer Platform</Header.BrandTitle>
      </Header.Brand>
      <Header.Switchers>
        <Chain />
      </Header.Switchers>
      <Header.Spacer />
    </Header>
  ),
};

const OpenOnMount = ({ name, children }: { name: string; children: React.ReactNode }) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    rootRef.current?.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)?.click();
  }, [name]);
  return <div ref={rootRef}>{children}</div>;
};

/**
 * Search, groups, and the current option, open on first paint so automated
 * checks see the panel.
 */
export const OpenPanel: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <OpenOnMount name="Organization: WSO2">
      <Chain />
    </OpenOnMount>
  ),
};

/**
 * A level with nothing to pick.
 */
export const NoOptions: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <OpenOnMount name="Organization">
      <ContextSwitcher value={{}} onChange={() => undefined}>
        <ContextSwitcher.Level id="organization" label="Organization" />
      </ContextSwitcher>
    </OpenOnMount>
  ),
};

/**
 * A level whose options are still loading.
 */
export const Loading: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <OpenOnMount name="Project">
      <ContextSwitcher value={{ organization: 'wso2' }} onChange={() => undefined}>
        <ContextSwitcher.Level id="organization" label="Organization">
          <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
        </ContextSwitcher.Level>
        <ContextSwitcher.Level id="project" label="Project" loading>
          <ContextSwitcher.Option value="finance-web">Finance Web</ContextSwitcher.Option>
        </ContextSwitcher.Level>
      </ContextSwitcher>
    </OpenOnMount>
  ),
};
