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
// Storybook's indexer fails to parse a JSX tag named `WSO2`.
import { WSO2 as Wso2Logo } from '@wso2/oxygen-ui-icons-react';

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
The chain shows the first level, and each following level once the level above it has a selection. An empty level stays on screen as "Select project". A slash separates the levels. \`back\` shows a back control and only the current level. Back steps up one level. Its tooltip names the level above, for example "Go to the Organization level".

Choosing a field opens its panel: a search box, then options and groups in the order they are written. Search filters the option text. Arrow keys move the highlight and leave the cursor in the search box. Enter picks the highlighted option. Choosing an option opens the next level's panel. The same option keeps the levels under it. A different option clears them. Escape, an outside click, or a second click on the field closes the panel and leaves an empty level on screen. The open field draws a primary ring. A name that does not fit stays on one line and ends in an ellipsis at 180px. Hovering it shows the full text. The product routes from \`onChange\` when the selection changes.

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

const filledValue: ContextSwitcherValue = {
  organization: 'wso2',
  project: 'sales',
  component: 'salesforce-sync',
};

const Chain = ({
  initial = { organization: 'wso2', project: 'finance-web' },
  back = false,
}: {
  initial?: ContextSwitcherValue;
  back?: boolean;
}) => {
  const [value, setValue] = React.useState<ContextSwitcherValue>(initial);

  return (
    <ContextSwitcher back={back} value={value} onChange={setValue}>
      <ContextSwitcher.Level id="organization" label="Organization">
        <ContextSwitcher.Option value="personal">Personal</ContextSwitcher.Option>
        <ContextSwitcher.Group label="Invited organizations">
          <ContextSwitcher.Option value="wso2">WSO2</ContextSwitcher.Option>
          <ContextSwitcher.Option value="demo">Demo Organization</ContextSwitcher.Option>
          <ContextSwitcher.Option value="north-america">
            North American Enterprise Organization
          </ContextSwitcher.Option>
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
        <ContextSwitcher.Option value="salesforce-sync">Salesforce Sync</ContextSwitcher.Option>
        <ContextSwitcher.Option value="collections">Collections Sync</ContextSwitcher.Option>
      </ContextSwitcher.Level>
    </ContextSwitcher>
  );
};

const HeaderChain = ({ initial, back = false }: { initial?: ContextSwitcherValue; back?: boolean }) => (
  <Header>
    <Header.Brand>
      <Header.BrandLogo>
        <Wso2Logo size={28} aria-label="WSO2" />
      </Header.BrandLogo>
      <Header.BrandTitle>Developer Platform</Header.BrandTitle>
    </Header.Brand>
    <Header.Switchers>
      <Chain initial={initial} back={back} />
    </Header.Switchers>
    <Header.Spacer />
  </Header>
);

/**
 * The chain in the header, beside the product name and the WSO2 mark. Organization
 * and Project are selected, so Component stays on screen as "Select component".
 */
export const InHeader: Story = {
  render: () => <HeaderChain />,
};

/**
 * Organization, Project, and Component selected. A slash separates each level.
 */
export const Selected: Story = {
  render: () => <HeaderChain initial={filledValue} />,
};

/**
 * Back beside the current level. Component is selected, so Back returns to Project.
 */
export const WithBack: Story = {
  render: () => <HeaderChain initial={filledValue} back />,
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
    <OpenOnMount name="Project: Finance Web">
      <ContextSwitcher value={{ organization: 'wso2', project: 'finance-web' }} onChange={() => undefined}>
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
