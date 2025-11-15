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
import { Charts } from '@wso2/oxygen-ui';

const { LineChart, BarChart, PieChart } = Charts;

/**
 * MUI X Charts provides a comprehensive set of chart components for data visualization.
 * 
 * Read more at: https://mui.com/x/react-charts/
 */
const meta: Meta<typeof LineChart> = {
  title: 'MUI X/Charts',
  component: LineChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI charts components are direct imports of MUI X Charts. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/x/react-charts/](https://mui.com/x/react-charts/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export const LineChartExample: Story = {
  render: () => (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Product A' },
        { data: uData, label: 'Product B' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  ),
};

export const BarChartExample: Story = {
  render: () => (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Product A', id: 'pvId' },
        { data: uData, label: 'Product B', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  ),
};

export const PieChartExample: Story = {
  render: () => (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Series A' },
            { id: 1, value: 15, label: 'Series B' },
            { id: 2, value: 20, label: 'Series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  ),
};

export const MultipleCharts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <LineChart
        width={500}
        height={200}
        series={[{ data: pData, label: 'Sales' }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
      <BarChart
        width={500}
        height={200}
        series={[{ data: uData, label: 'Revenue', id: 'revId' }]}
        xAxis={[{ data: xLabels, scaleType: 'band' }]}
      />
    </div>
  ),
};
