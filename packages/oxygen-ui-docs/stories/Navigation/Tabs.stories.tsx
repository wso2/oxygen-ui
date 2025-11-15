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
import { Tabs, Tab, Box, Typography } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * The Tabs component organizes content into separate views where only one view is visible at a time.
 * Users can switch between views by selecting different tabs.
 * 
 * This is a direct import of MUI tabs component. 
 * Read more at: https://mui.com/material-ui/react-tabs/
 */
const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI tabs component is a direct import of MUI tabs component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-tabs/](https://mui.com/material-ui/react-tabs/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}><Typography>{children}</Typography></Box>}
    </div>
  );
}

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Content for Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Content for Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Content for Item Three
        </TabPanel>
      </Box>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} textColor="secondary" indicatorColor="secondary">
          <Tab label="Secondary" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </Box>
    );
  },
};

export const Centered: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
    );
  },
};

export const Scrollable: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Box sx={{ width: 400 }}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} variant="scrollable" scrollButtons="auto">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
        <Tab label="Active" />
        <Tab label="Disabled" disabled />
        <Tab label="Active" />
      </Tabs>
    );
  },
};
