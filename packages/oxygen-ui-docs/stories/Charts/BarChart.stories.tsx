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

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BarChart, Bar } from '@wso2/oxygen-ui-charts-react'

const meta: Meta = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component:
          'Oxygen UI Charts React provides a set of components built on top of Recharts. ' +
          'It offers two ways to define charts: a minimal configuration using props and a Recharts composable way for maximum flexibility.\n\n' +
          'For detailed information, please refer to the official Recharts documentation at ' +
          '[<u>recharts.github.io</u>](https://recharts.github.io/).\n\n' +
          '**Installation:**\n```bash\nnpm install @wso2/oxygen-ui-charts-react\n```\n\n' +
          '**Usage:**\n```tsx\nimport { BarChart } from "@wso2/oxygen-ui-charts-react";\n```\n\n',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BarChart>

const data = [
  { name: 'Jan', value: 400, secondValue: 240 },
  { name: 'Feb', value: 300, secondValue: 139 },
  { name: 'Mar', value: 200, secondValue: 980 },
  { name: 'Apr', value: 278, secondValue: 390 },
  { name: 'May', value: 189, secondValue: 480 },
  { name: 'Jun', value: 239, secondValue: 380 },
  { name: 'Jul', value: 349, secondValue: 430 },
]

/**
 * In this approach, you use the simplified props provided by the Oxygen UI wrapper.
 * This is the easiest way to get up and running with standard charts.
 *
 * ### Available Props
 *
 * #### Data & Structure
 * - **data** ( any[] ): Data to be displayed in the chart.
 * - **children** ( React.ReactNode ): Optional children for Recharts-style composition.
 *
 * #### Bars Configuration
 * - **bars** ( Array<BarConfig> ): Configuration for the bars in the chart. Each bar config supports:
 *   - **dataKey** ( string ): The key of the data point.
 *   - **name** ( string ): The name of the bar.
 *   - **fill** ( string ): The fill color of the bar.
 *   - **stackId** ( string | number ): The id of the stack the bar belongs to.
 *   - **radius** ( number | [number, number, number, number] ): The radius of the bar's corners.
 *   - **hide** ( boolean ): If true, the bar will be hidden.
 *   - **label** ( boolean | any ): Configuration for the bar's label.
 *   - **isAnimationActive** ( boolean ): If true, the bar will be animated. (Default: true)
 *   - **animationDuration** ( number ): Duration of the animation in ms. (Default: 1500)
 *   - **animationBegin** ( number ): Delay before the animation begins in ms. (Default: 0)
 *   - **animationEasing** ( 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' ): Easing function for the animation.
 *   - **onClick** ( function ): Click event handler for the bar.
 *   - **onMouseEnter** ( function ): Mouse enter event handler for the bar.
 *   - **onMouseLeave** ( function ): Mouse leave event handler for the bar.
 *   - **onMouseDown** ( function ): Mouse down event handler for the bar.
 *   - **onMouseUp** ( function ): Mouse up event handler for the bar.
 *   - **onMouseMove** ( function ): Mouse move event handler for the bar.
 *
 * #### Appearance & Layout
 * - **colors** ( string[] ): Custom colors for the bars.
 * - **layout** ( 'horizontal' | 'vertical' ): The layout of the chart. (Default: 'horizontal')
 * - **height** ( number | string ): Height of the chart. (Default: 300)
 * - **width** ( number | string ): Width of the chart. (Default: '100%')
 * - **margin** ( MarginConfig ): Margin around the chart. (Default: { top: 12, right: 24, left: 24, bottom: 40 })
 *
 * #### Axis Configuration
 * - **xAxisDataKey** ( string ): Key for X-axis labels.
 * - **xAxis** ( AxisConfig ): XAxis configuration. (Default: { show: true })
 * - **yAxis** ( AxisConfig ): YAxis configuration. (Default: { show: true })
 *
 * #### Legend
 * - **legend** ( LegendConfig ): Legend configuration. (Default: { show: true, align: 'center', verticalAlign: 'bottom' })
 *
 * #### Grid
 * - **grid** ( GridConfig ): Grid configuration. (Default: { show: true, strokeDasharray: '3 3' })
 *
 * #### Tooltip
 * - **tooltip** ( TooltipConfig ): Tooltip configuration. (Default: { show: true })
 *
 * #### Bar Spacing & Sizing
 * - **barCategoryGap** ( number | string ): The gap between two bar categories.
 * - **barGap** ( number | string ): The gap between two bars in the same category.
 * - **barSize** ( number | string ): The width or height of each bar.
 * - **maxBarSize** ( number ): The maximum width or height of each bar.
 * - **stackOffset** ( 'sign' | 'expand' | 'none' | 'wiggle' | 'silhouette' | 'positive' ): The offset of the stacks.
 *
 * #### Animation (Chart-level)
 * - **isAnimationActive** ( boolean ): If true, the chart bars will be animated. (Default: true)
 * - **animationDuration** ( number ): Duration of the animation in ms. (Default: 1500)
 * - **animationBegin** ( number ): Delay before the animation begins in ms. (Default: 0)
 * - **animationEasing** ( 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' ): Easing function for the animation.
 *
 * #### Accessibility
 * - **accessibilityLayer** ( boolean ): If true, an accessibility layer will be added to the chart. (Default: true)
 *
 * #### Event Handlers (Chart-level)
 * - **onClick** ( function ): Default click event handler.
 * - **onMouseEnter** ( function ): Default mouse enter event handler.
 * - **onMouseLeave** ( function ): Default mouse leave event handler.
 * - **onMouseDown** ( function ): Default mouse down event handler.
 * - **onMouseUp** ( function ): Default mouse up event handler.
 * - **onMouseMove** ( function ): Default mouse move event handler.
 *
 * This implementation is based on Recharts props. For detailed information, please refer to the official Recharts documentation at [<u>recharts.github.io</u>](https://recharts.github.io).
 */
export const Basic: Story = {
  render: args => (
    <BarChart
      {...args}
      data={data}
      xAxisDataKey="name"
      bars={[
        { dataKey: 'value', name: 'Primary Value' },
        { dataKey: 'secondValue', name: 'Secondary Value' },
      ]}
    />
  ),
}

export const Stacked: Story = {
  render: () => (
    <BarChart
      data={data}
      xAxisDataKey="name"
      bars={[
        { dataKey: 'value', name: 'Stacked A', stackId: 'a' },
        { dataKey: 'secondValue', name: 'Stacked B', stackId: 'a' },
      ]}
    />
  ),
}

export const CustomColors: Story = {
  render: () => (
    <BarChart
      data={data}
      xAxisDataKey="name"
      bars={[
        { dataKey: 'value', name: 'Primary' },
        { dataKey: 'secondValue', name: 'Secondary' },
      ]}
      colors={['#8884d8', '#82ca9d']}
    />
  ),
}

export const Horizontal: Story = {
  render: () => (
    <BarChart
      data={data}
      xAxisDataKey="name"
      layout="vertical"
      bars={[
        { dataKey: 'value', name: 'Primary Value' },
        { dataKey: 'secondValue', name: 'Secondary Value' },
      ]}
      height={400}
    />
  ),
}

export const NoGrid: Story = {
  render: () => (
    <BarChart
      data={data}
      xAxisDataKey="name"
      bars={[{ dataKey: 'value', name: 'Value' }]}
      grid={{ show: false }}
    />
  ),
}

export const CustomBarSize: Story = {
  render: () => (
    <BarChart
      data={data}
      xAxisDataKey="name"
      bars={[{ dataKey: 'value', name: 'Value' }]}
      barSize={20}
    />
  ),
}

/**
 * This approach allows users to define charts using Recharts’ composable syntax.
 * While the chart structure remains familiar to Recharts users.
 * For detailed information, please refer to the official Recharts documentation at [<u>recharts.github.io</u>](https://recharts.github.io).
 */
export const RechartsComposableWay: Story = {
  render: args => (
    <BarChart {...args} data={data} xAxisDataKey="name">
      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
      <Bar dataKey="secondValue" fill="#82ca9d" radius={[4, 4, 0, 0]} />
    </BarChart>
  ),
}
