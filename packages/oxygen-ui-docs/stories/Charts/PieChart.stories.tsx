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
import { PieChart, Pie, Cell } from '@wso2/oxygen-ui-charts-react'

const meta: Meta = {
  title: 'Charts/PieChart',
  component: PieChart,
  parameters: {
    docs: {
      description: {
        component:
          'Oxygen UI Charts React provides a set of components built on top of Recharts. ' +
          'It offers two ways to define charts: a minimal configuration using props and a Recharts composable way for maximum flexibility.\n\n' +
          'For detailed information, please refer to the official Recharts documentation at ' +
          '[<u>recharts.github.io</u>](https://recharts.github.io/).\n\n' +
          '**Installation:**\n```bash\nnpm install @wso2/oxygen-ui-charts-react\n```\n\n' +
          '**Usage:**\n```tsx\nimport { PieChart } from "@wso2/oxygen-ui-charts-react";\n```\n\n',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PieChart>

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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
 * #### Pies Configuration
 * - **pies** ( Array<{ ... }> ): Configuration for the pies in the chart. Each pie config supports:
 *   - **dataKey** ( string ): The key of the data point.
 *   - **nameKey** ( string ): The key of each sector's name.
 *   - **name** ( string ): The name of the pie.
 *   - **cx, cy** ( number | string ): The x and y coordinates of center.
 *   - **innerRadius, outerRadius** ( number | string ): Inner and outer radius of sectors.
 *   - **paddingAngle** ( number ): Padding angle between sectors.
 *   - **startAngle, endAngle** ( number ): Start and end angles.
 *   - **cornerRadius** ( number | string ): Corner radius of sectors.
 *   - **minAngle** ( number ): Minimum angle of each non-zero data sector.
 *   - **label** ( any ): Configuration for sector labels.
 *   - **labelLine** ( any ): Configuration for label lines.
 *   - **Event handlers (sector-level):** onClick, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onMouseMove, onContextMenu, onDoubleClick.
 *   - **Animation (sector-level):**
 *     - **isAnimationActive** ( boolean ): If true, sectors will be animated. (Default: true)
 *     - **animationDuration** ( number ): Duration of animation in ms. (Default: 1500)
 *     - **animationBegin** ( number ): Delay before animation begins in ms. (Default: 0)
 *     - **animationEasing** ( 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' ): Easing function.
 *
 * #### Appearance & Layout
 * - **colors** ( string[] ): Custom colors for sectors.
 * - **height** ( number | string ): Height of the chart. (Default: 300)
 * - **width** ( number | string ): Width of the chart. (Default: '100%')
 * - **margin** ( MarginConfig ): Margin around the chart. (Default: { top: 0, right: 0, bottom: 0, left: 0 })
 * - **cx, cy** ( number | string ): Default center coordinates for all pies.
 * - **innerRadius, outerRadius** ( number | string ): Default radii for all pies.
 * - **startAngle, endAngle** ( number ): Default angles for all pies.
 * - **paddingAngle** ( number ): Default padding angle for all pies.
 * - **cornerRadius** ( number | string ): Default corner radius for all pies.
 *
 * #### Legend
 * - **legend** ( LegendConfig ): Legend configuration. (Default: { show: true, align: 'center', verticalAlign: 'bottom' })
 *
 * #### Tooltip
 * - **tooltip** ( TooltipConfig ): Tooltip configuration. (Default: { show: true })
 *
 * #### Animation (Chart-level)
 * - **isAnimationActive** ( boolean ): If true, chart will be animated. (Default: true)
 * - **animationDuration** ( number ): Duration of animation in ms. (Default: 1500)
 * - **animationBegin** ( number ): Delay before animation begins in ms. (Default: 0)
 * - **animationEasing** ( 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' ): Easing function.
 *
 * #### Event Handlers (Chart-level)
 * - **onClick, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onMouseMove, onContextMenu, onDoubleClick**: Default event handlers for the whole chart.
 *
 * This implementation is based on Recharts props. For detailed information, please refer to the official Recharts documentation at [<u>recharts.github.io</u>](https://recharts.github.io).
 */
export const Basic: Story = {
  render: args => <PieChart {...args} data={data} pies={[{ dataKey: 'value', nameKey: 'name' }]} />,
}

export const Donut: Story = {
  render: () => (
    <PieChart
      data={data}
      innerRadius={60}
      outerRadius={80}
      pies={[{ dataKey: 'value', nameKey: 'name' }]}
    />
  ),
}

export const PaddingAndCornerRadius: Story = {
  render: () => (
    <PieChart
      data={data}
      innerRadius={60}
      outerRadius={80}
      paddingAngle={5}
      cornerRadius={8}
      pies={[{ dataKey: 'value', nameKey: 'name' }]}
    />
  ),
}

export const CustomColors: Story = {
  render: () => (
    <PieChart data={data} colors={COLORS} pies={[{ dataKey: 'value', nameKey: 'name' }]} />
  ),
}

export const HalfPie: Story = {
  render: () => (
    <PieChart
      data={data}
      cx="50%"
      cy="100%"
      startAngle={180}
      endAngle={0}
      innerRadius={60}
      outerRadius={100}
      pies={[{ dataKey: 'value', nameKey: 'name' }]}
      height={200}
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
    <PieChart {...args} data={data}>
      <Pie dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  ),
}
