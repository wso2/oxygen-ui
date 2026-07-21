/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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

import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@wso2/oxygen-ui';
import { ChevronDown, Minus, Plus } from '@wso2/oxygen-ui-icons-react';
import React from 'react';

/**
 * The Accordion component allows users to show and hide sections of content.
 * It's useful for grouping related information and reducing visual clutter.
 *
 * This is a direct import of MUI accordion component.
 * Read more at: https://mui.com/material-ui/react-accordion/
 */
const meta: Meta<typeof Accordion> = {
  title: 'Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Oxygen UI accordion component is a direct import of MUI accordion component.\n\n' +
          'Oxygen supplies a default `expandIcon` (`ChevronDown`) via the theme on ' +
          '`AccordionSummary`. MUI rotates that icon 180° when expanded, which suits chevrons. ' +
          'Pass a custom `expandIcon` to override, or `expandIcon={null}` to hide it.\n\n' +
          'For non-chevron icons (e.g. Plus/Minus), swap the icon from expanded state and disable ' +
          'the expand-icon wrapper rotation with `sx` — see the CustomExpandIcon story.\n\n' +
          'Read MUI documentation for complete API: ' +
          '[https://mui.com/material-ui/react-accordion/](https://mui.com/material-ui/react-accordion/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Accordion>
        <AccordionSummary
          id="panel1-header"
          aria-controls="panel1-content"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          id="panel2-header"
          aria-controls="panel2-content"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          id="expanded-header"
          aria-controls="expanded-content"
        >
          <Typography>Expanded by Default</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This accordion is expanded by default using the defaultExpanded prop.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Accordion disabled>
        <AccordionSummary
          id="disabled-header"
          aria-controls="disabled-content"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This content cannot be accessed because the accordion is disabled.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Stack spacing={0} sx={{ width: 400 }}>
      <Accordion>
        <AccordionSummary
          id="general-header"
          aria-controls="general-content"
        >
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Configure general application settings here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          id="security-header"
          aria-controls="security-content"
        >
          <Typography>Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Manage security and privacy settings.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          id="advanced-header"
          aria-controls="advanced-content"
        >
          <Typography>Advanced</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Advanced configuration options for power users.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  ),
};

export const ExpandIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Same disclosure icon as the theme default (`ChevronDown`), passed explicitly via ' +
          '`expandIcon`. Useful when documenting or overriding the prop.',
      },
    },
  },
  render: () => (
    <div style={{ width: 400 }}>
      <Accordion>
        <AccordionSummary
          id="explicit-icon-header"
          aria-controls="explicit-icon-content"
          expandIcon={<ChevronDown />}
        >
          <Typography>Expand Icon</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Same disclosure icon as the theme default, passed explicitly via expandIcon.
            MUI rotates the chevron 180° when expanded.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const CustomExpandIcon: Story = {
  render: function CustomExpandIconStory() {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <div style={{ width: 400 }}>
        <Accordion
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
        >
          <AccordionSummary
            id="custom-icon-header"
            aria-controls="custom-icon-content"
            expandIcon={expanded ? <Minus /> : <Plus />}
            sx={{
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(0deg)',
              },
            }}
          >
            <Typography>Custom Expand Icon</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Non-chevron icons should swap by expanded state (Plus/Minus) and disable
              MUI&apos;s 180° expand-icon rotation.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  },
};
