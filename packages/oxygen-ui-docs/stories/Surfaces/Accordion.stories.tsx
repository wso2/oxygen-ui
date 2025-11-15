/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
        component: 'Oxygen UI accordion component is a direct import of MUI accordion component. \n\n' + 
        'Read MUI documentation for complete API : ' +
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
        <AccordionSummary>
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
        <AccordionSummary>
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
        <AccordionSummary>
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
        <AccordionSummary>
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
        <AccordionSummary>
          <Typography>General Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Configure general application settings here.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Manage security and privacy settings.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
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
