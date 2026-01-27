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
import { RadialBarChart, RadialBar, Legend, ChartTooltip, Cell } from '@wso2/oxygen-ui-charts-react'

const meta: Meta = {
  title: 'Charts/RadialBarChart',
  component: RadialBarChart,
  parameters: {
    docs: {
      description: {
        component:
          'Oxygen UI Charts React provides a set of components built on top of Recharts. ' +
          'It offers two ways to define charts: a minimal configuration using props and a Recharts composable way for maximum flexibility.\n\n' +
          'For detailed information, please refer to the official Recharts documentation at ' +
          '[<u>recharts.github.io</u>](https://recharts.github.io/).\n\n' +
          '**Installation:**\n```bash\nnpm install @wso2/oxygen-ui-charts-react\n```\n\n' +
          '**Usage:**\n```tsx\nimport { RadialBarChart } from "@wso2/oxygen-ui-charts-react";\n```\n\n',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadialBarChart>

const data = [
  { name: '18-24', uv: 31.47, pv: 2400 },
  { name: '25-29', uv: 26.69, pv: 4567 },
  { name: '30-34', uv: 15.69, pv: 1398 },
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
 * #### Radial Bars Configuration
 * - **radialBars** ( Array<{ ... }> ): Configuration for the radial bars. Each config supports:
 *   - **dataKey** ( string ): The key of the data point.
 *   - **name** ( string ): The name of the bar.
 *   - **fill** ( string ): The fill color.
 *   - **background** ( boolean | any ): Background configuration for the bar.
 *   - **cornerRadius** ( number | string ): Corner radius for the sectors.
 *   - **minPointSize** ( number ): Minimum point size.
 *   - **maxBarSize** ( number ): Maximum bar size.
 *   - **hide** ( boolean ): If true, the bar will be hidden.
 *   - **label** ( boolean | any ): Configuration for the label.
 *   - **stackId** ( string | number ): The ID of the stack.
 *   - **legendType** ( 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'none' ): Legend icon type.
 *   - **animation (bar-level):** isAnimationActive, animationDuration, animationBegin, animationEasing.
 *   - **Event handlers (bar-level):** onClick, onMouseDown, onMouseUp, onMouseMove, onMouseOver, onMouseOut, onMouseEnter, onMouseLeave.
 *
 * #### Appearance & Layout
 * - **colors** ( string[] ): Custom colors for radial bars.
 * - **height** ( number | string ): Height of the chart. (Default: 300)
 * - **width** ( number | string ): Width of the chart. (Default: '100%')
 * - **margin** ( MarginConfig ): Margin around the chart. (Default: { top: 0, right: 0, bottom: 0, left: 0 })
 * - **cx, cy** ( number | string ): The x and y coordinates of center. (Default: '50%')
 * - **innerRadius, outerRadius** ( number | string ): Inner and outer radius of the chart.
 * - **startAngle, endAngle** ( number ): Angles in degrees for chart range.
 * - **barSize** ( number | string ): Fixed bar size.
 *
 * #### Polar Grid & Axes
 * - **polarGrid** ( PolarGridConfig ): Grid configuration. (Default: { show: true })
 * - **polarAngleAxis** ( PolarAngleAxisConfig ): Angle axis configuration. (Default: { show: true })
 * - **polarRadiusAxis** ( PolarRadiusAxisConfig ): Radius axis configuration. (Default: { show: true })
 *
 * #### Legend
 * - **legend** ( LegendConfig ): Legend configuration. (Default: { show: true, align: 'center', verticalAlign: 'bottom' })
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
 * - **accessibilityLayer** ( boolean ): If true, an accessibility layer will be added. (Default: true)
 *
 * #### Event Handlers (Chart-level)
 * - **onClick, onMouseDown, onMouseUp, onMouseMove, onMouseEnter, onMouseLeave, onContextMenu, onDoubleClick**: Default event handlers for the whole chart.
 *
 * This implementation is based on Recharts props. For detailed information, please refer to the official Recharts documentation at [<u>recharts.github.io</u>](https://recharts.github.io).
 */
export const Basic: Story = {
  render: args => (
    <RadialBarChart
      {...args}
      data={data}
      innerRadius="10%"
      outerRadius="80%"
      radialBars={[
        {
          dataKey: 'uv',
          label: { fill: '#fff', position: 'insideStart' },
          background: true,
        },
      ]}
      legend={{ show: true }}
    />
  ),
}

export const CustomStartAndEndAngles: Story = {
  render: () => (
    <RadialBarChart
      data={data}
      innerRadius="10%"
      outerRadius="80%"
      startAngle={180}
      endAngle={0}
      radialBars={[
        {
          dataKey: 'uv',
          background: true,
          fill: '#8884d8',
        },
      ]}
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
    <RadialBarChart
      {...args}
      cx="50%"
      cy="50%"
      innerRadius="10%"
      outerRadius="80%"
      barSize={20}
      data={data}
      legend={{ show: false }}
      tooltip={{ show: false }}
    >
      <RadialBar dataKey="uv" label={{ position: 'insideStart', fill: '#fff' }} background>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={['#8884d8', '#83a6ed', '#8dd1e1'][index]} />
        ))}
      </RadialBar>

      <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
      <ChartTooltip />
    </RadialBarChart>
  ),
}
