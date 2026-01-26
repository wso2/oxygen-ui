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
import { LineChart, Line } from '@wso2/oxygen-ui-charts-react'

const meta: Meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component:
          'Oxygen UI Charts React provides a set of components built on top of Recharts. ' +
          'It offers two ways to define charts: a minimal configuration using props and a Recharts composable way for maximum flexibility.\n\n' +
          'For detailed information, please refer to the official Recharts documentation at ' +
          '[<u>recharts.github.io</u>](https://recharts.github.io/).\n\n' +
          '**Installation:**\n```bash\nnpm install @wso2/oxygen-ui-charts-react\n```\n\n' +
          '**Usage:**\n```tsx\nimport { LineChart } from "@wso2/oxygen-ui-charts-react";\n```\n\n',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LineChart>

const data = [
  { name: 'Jan', firstValue: 400, secondValue: 240 },
  { name: 'Feb', firstValue: 300, secondValue: 139 },
  { name: 'Mar', firstValue: 200, secondValue: 980 },
  { name: 'Apr', firstValue: 278, secondValue: 390 },
  { name: 'May', firstValue: 189, secondValue: 480 },
  { name: 'Jun', firstValue: 239, secondValue: 380 },
  { name: 'Jul', firstValue: 349, secondValue: 430 },
]

const dataWithNulls = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: null },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 278 },
  { name: 'Jun', value: 189 },
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
 * #### Lines Configuration
 * - **lines** ( Array<{ ... }> ): Configuration for the lines in the chart. Each line config supports:
 *   - **dataKey** ( string ): The key of the data point.
 *   - **name** ( string ): The name of the line.
 *   - **stroke** ( string ): The stroke color of the line.
 *   - **strokeWidth** ( number ): The width of the stroke.
 *   - **strokeDasharray** ( string | number ): The stroke dash array.
 *   - **type** ( 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter' ): The interpolation type of curve.
 *   - **hide** ( boolean ): If true, the line will be hidden.
 *   - **label** ( boolean | any ): Configuration for the line's label.
 *   - **dot** ( boolean | any ): If false, dots will not be drawn. (Default: true)
 *   - **activeDot** ( boolean | any ): Dots shown when user enters a line. (Default: true)
 *   - **connectNulls** ( boolean ): Whether to connect the line across null points. (Default: false)
 *   - **unit** ( string | number ): The unit of data shown in tooltip.
 *   - **legendType** ( 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'none' ): The type of icon in legend.
 *   - **Event handlers (line-level):** onClick, onMouseDown, onMouseUp, onMouseMove, onMouseOver, onMouseOut, onMouseEnter, onMouseLeave.
 *   - **Animation (line-level):**
 *     - **isAnimationActive** ( boolean ): If true, the line will be animated. (Default: true)
 *     - **animationDuration** ( number ): Duration of transition in ms. (Default: 1500)
 *     - **animationBegin** ( number ): Delay before animation begins in ms. (Default: 0)
 *     - **animationEasing** ( 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' ): Easing function.
 *
 * #### Appearance
 * - **colors** ( string[] ): Custom colors for lines.
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
 * #### Synchronization
 * - **syncId** ( number | string ): Synchronizes tooltip and brush across charts.
 * - **syncMethod** ( 'index' | 'value' | function ): Controls synchronization behavior.
 *
 * #### Accessibility
 * - **role** ( string ): ARIA role for the chart.
 * - **title** ( string ): Accessible title.
 * - **desc** ( string ): Accessible description.
 * - **accessibilityLayer** ( boolean ): If true, an accessibility layer will be added to the chart. (Default: true)
 *
 * #### Event Handlers (Chart-level)
 * - **onClick, onMouseDown, onMouseUp, onMouseMove, onMouseEnter, onMouseLeave**: Default event handlers for the whole chart.
 *
 * #### Animation (Chart-level)
 * - **isAnimationActive** ( boolean ): If true, chart lines will be animated. (Default: true)
 * - **animationDuration** ( number ): Duration of animation in ms. (Default: 1500)
 * - **animationBegin** ( number ): Delay before animation begins in ms. (Default: 0)
 * - **animationEasing** ( 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' ): Easing function.
 *
 * This implementation is based on Recharts props. For detailed information, please refer to the official Recharts documentation at [<u>recharts.github.io</u>](https://recharts.github.io).
 */
export const Basic: Story = {
  render: args => (
    <LineChart
      {...args}
      data={data}
      xAxisDataKey="name"
      lines={[
        { dataKey: 'firstValue', name: 'Primary Value' },
        { dataKey: 'secondValue', name: 'Secondary Value' },
      ]}
    />
  ),
}

export const WithCustomColorsAndLegend: Story = {
  render: () => (
    <LineChart
      data={data}
      xAxisDataKey="name"
      lines={[
        { dataKey: 'firstValue', name: 'Series A' },
        { dataKey: 'secondValue', name: 'Series B' },
      ]}
      colors={['#8884d8', '#82ca9d']}
      legend={{ show: true, align: 'right', verticalAlign: 'top' }}
    />
  ),
}

export const VerticalLayout: Story = {
  render: () => (
    <LineChart
      data={data}
      xAxisDataKey="name"
      layout="vertical"
      lines={[
        { dataKey: 'firstValue', name: 'Vertical A' },
        { dataKey: 'secondValue', name: 'Vertical B' },
      ]}
      height={400}
    />
  ),
}

export const SteppedLine: Story = {
  render: () => (
    <LineChart
      data={data}
      xAxisDataKey="name"
      lines={[{ dataKey: 'firstValue', name: 'Step Line', type: 'step' }]}
    />
  ),
}

export const ConnectNulls: Story = {
  render: () => (
    <LineChart
      data={dataWithNulls}
      xAxisDataKey="name"
      lines={[{ dataKey: 'value', name: 'Value', connectNulls: true }]}
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
    <LineChart {...args} data={data} xAxisDataKey="name">
      <Line
        type="monotone"
        dataKey="firstValue"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        name="Source A"
      />
      <Line type="monotone" dataKey="secondValue" stroke="#82ca9d" name="Source B" />
    </LineChart>
  ),
}
