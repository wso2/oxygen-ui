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
import { Stack, Typography, CodeBlock, Box, Divider, ListingTable } from '@wso2/oxygen-ui';
import React from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * When to use a modal, right drawer, page form, or full page wizard.
 */
const meta: Meta = {
  title: 'Guides/Choosing a Container',
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

interface RuleTableProps {
  headers: string[];
  rows: string[][];
}

function RuleTable({ headers, rows }: RuleTableProps) {
  return (
    <ListingTable.Container>
      <ListingTable variant="table" density="compact">
        <ListingTable.Head>
          <ListingTable.Row>
            {headers.map((header) => (
              <ListingTable.Cell key={header}>{header}</ListingTable.Cell>
            ))}
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {rows.map((row) => (
            <ListingTable.Row key={row[0]}>
              {row.map((cell, index) => (
                <ListingTable.Cell key={headers[index]}>{cell}</ListingTable.Cell>
              ))}
            </ListingTable.Row>
          ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}

interface GuideSectionProps {
  title: string;
  children: React.ReactNode;
}

function GuideSection({ title, children }: GuideSectionProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={1.5}>{children}</Stack>
    </Box>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ pl: 3, m: 0 }}>
      {items.map((item) => (
        <li key={item}><Typography variant="body2">{item}</Typography></li>
      ))}
    </Box>
  );
}

interface DoDontProps {
  dos: string[];
  donts: string[];
}

function DoDont({ dos, donts }: DoDontProps) {
  return (
    <>
      <Typography variant="subtitle2">Do</Typography>
      <BulletList items={dos} />
      <Typography variant="subtitle2">Don&apos;t</Typography>
      <BulletList items={donts} />
    </>
  );
}

export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Choosing a container: modal, drawer, page form, or wizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use the lightest container that fits the task. Escalate only when the task needs more
            room or structure.
          </Typography>
        </Box>

        <CodeBlock language="markup" code="Modal → Right drawer → Page form → Full page wizard" />

        <Divider />

        <GuideSection title="Decision flow">
          <Typography variant="body2">
            Answer each question in order and stop at the first &quot;yes&quot;.
          </Typography>
          <Box component="ol" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Is it a quick decision or 1 to 3 fields? Use a modal.</Typography></li>
            <li><Typography variant="body2">Must the page behind stay visible? Use a right drawer.</Typography></li>
            <li><Typography variant="body2">Do later steps depend on earlier choices? Use a full page wizard.</Typography></li>
            <li><Typography variant="body2">Otherwise, use a page form with a back button.</Typography></li>
          </Box>
        </GuideSection>

        <GuideSection title="Comparison">
          <RuleTable
            headers={['Pattern', 'Use when', 'Avoid when', 'Typical size']}
            rows={[
              ['Modal', 'Confirm, delete, rename, 1 to 3 fields', 'Scrolling content, referencing other pages, nested dialogs', 'Small to medium'],
              ['Right drawer', 'Viewing or editing an item while keeping context visible', 'Long or multi-step forms, complex validation', '400 to 600px wide'],
              ['Page form', 'Creating or editing one entity with many fields', 'Quick edits', 'Full content area'],
              ['Wizard', 'Sequential setup with dependent steps', 'Under 3 steps, non-linear editing', 'Full page, 3 to 7 steps'],
            ]}
          />
        </GuideSection>

        <GuideSection title="Modal">
          <Typography variant="body2">
            A modal handles one task and one decision. If it needs scrolling, it is not a modal.
          </Typography>
          <DoDont
            dos={[
              'Title the modal with the action, such as "Delete item?".',
              'Use the body to explain the consequence.',
              'Label buttons with specific verbs.',
              'Use danger styling for destructive actions.',
              'For high-impact deletes, ask users to type the resource name.',
              'Trap focus, close on Esc, and return focus to the trigger.',
            ]}
            donts={[
              'Use "OK" or "Yes" as button labels.',
              'Nest modals.',
              'Use a modal for interruptions the user did not prompt.',
            ]}
          />
        </GuideSection>

        <GuideSection title="Right drawer">
          <Typography variant="body2">
            A drawer shows content related to the page behind it, such as details, filters,
            settings, or short edit forms.
          </Typography>
          <DoDont
            dos={[
              'Use one standard width. Use the wider variant only when the content requires it.',
              'Keep the header sticky, with the title and close control.',
              'Keep the footer sticky, with primary and secondary actions.',
              'Warn about unsaved changes on close, Esc, or outside click.',
              'Move focus into the drawer on open and return it to the trigger on close.',
            ]}
            donts={[
              'Stack drawers.',
              'Open a modal from a drawer for anything other than a confirmation.',
            ]}
          />
        </GuideSection>

        <GuideSection title="Page form with back button">
          <Typography variant="body2">
            A page form gives one entity the full content area, then returns users to where they
            started.
          </Typography>
          <DoDont
            dos={[
              'Return to the originating page and restore its state: filters, scroll position, and pagination.',
              'Use a clear page title, such as "Create …" or "Edit …".',
              'Add breadcrumbs when navigation is deep.',
              'Group fields into titled sections.',
              'Use progressive disclosure for advanced settings.',
              'Keep the primary action reachable on long forms, with a sticky footer or top right placement.',
              'Prompt on unsaved changes for the back button, browser back, and in-app links.',
              'Validate inline on blur.',
              'On submit, summarize errors at the top with links to each field.',
            ]}
            donts={['Use a page form for quick edits.']}
          />
        </GuideSection>

        <GuideSection title="Full page wizard">
          <Typography variant="body2">
            A wizard guides users through sequential setup where later steps depend on earlier ones.
          </Typography>
          <DoDont
            dos={[
              'Show a stepper with step names and the current position.',
              'Keep the flow between 3 and 7 steps.',
              'Order steps by dependency. Place optional steps last or make them skippable.',
              'Validate each step before Next.',
              'Add a review step before final submit, with an edit link for each step.',
              'Keep Cancel available at all times, and confirm if progress will be lost.',
              'Save drafts for long flows.',
              'End with a success state that offers clear next actions.',
            ]}
            donts={[
              'Lose data when users go Back.',
              'Use a wizard for fewer than 3 steps or for non-linear editing.',
            ]}
          />
        </GuideSection>

        <GuideSection title="Example: editing a resource with 5 to 6 fields">
          <Typography variant="body2">
            Default to a right drawer. It holds too many fields for a modal and too few to justify
            leaving the page, and it keeps the resource in view.
          </Typography>
          <Typography variant="body2">Switch to a page form if any of these apply:</Typography>
          <BulletList
            items={[
              'The content is long, such as rich text, a code or JSON editor, or spec files.',
              'Fields depend on each other.',
              'The edit is likely to grow, or sits alongside other settings.',
              'Users must reference other pages while editing.',
            ]}
          />
        </GuideSection>

        <Divider />

        <GuideSection title="Shared rules">
          <Typography variant="body2">These apply to every container.</Typography>
          <BulletList
            items={[
              'Use the same pattern for the same task type across the product.',
              'Guard against unsaved changes the same way in every editable container.',
              'Support keyboard use, show visible focus, label every control, and meet WCAG 2.2 AA.',
            ]}
          />
        </GuideSection>
      </Stack>
    </CenterContentLayout>
  ),
};
