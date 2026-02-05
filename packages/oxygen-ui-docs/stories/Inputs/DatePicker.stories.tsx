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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePickers, AdapterDateFns, OxygenUIThemeProvider } from '@wso2/oxygen-ui';

const { LocalizationProvider, DatePicker, TimePicker, DateTimePicker } = DatePickers;

/**
 * MUI X Date and Time Pickers provide components for selecting dates and times.
 * 
 * Read more at: https://mui.com/x/react-date-pickers/
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI date picker components are direct imports of MUI X Date Pickers. These components require the `date-fns` library (installed as a dev dependency) and `AdapterDateFns` for date manipulation. The `LocalizationProvider` wrapper is required to provide the date adapter context to all picker components.\n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/x/react-date-pickers/](https://mui.com/x/react-date-pickers/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const DatePickerExample: Story = {
  render: () => (
    <OxygenUIThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker label="Select Date" />
      </LocalizationProvider>
    </OxygenUIThemeProvider>
  ),
};

export const TimePickerExample: Story = {
  render: () => (
    <OxygenUIThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker label="Select Time" />
      </LocalizationProvider>
    </OxygenUIThemeProvider>
  ),
};

export const DateTimePickerExample: Story = {
  render: () => (
    <OxygenUIThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker label="Select Date & Time" />
      </LocalizationProvider>
    </OxygenUIThemeProvider>
  ),
};

export const MultiplePickers: Story = {
  render: () => (
    <OxygenUIThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
          <DatePicker label="Start Date" />
          <DatePicker label="End Date" />
          <TimePicker label="Start Time" />
          <TimePicker label="End Time" />
        </div>
      </LocalizationProvider>
    </OxygenUIThemeProvider>
  ),
};
