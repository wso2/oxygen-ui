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
import { RadarChart, Radar } from '@wso2/oxygen-ui-charts-react'

const meta: Meta = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  parameters: {
    docs: {
      description: {
        component:
          'Oxygen UI Charts React provides a set of components built on top of Recharts. ' +
          'It offers two ways to define charts: a minimal configuration using props and a Recharts composable way for maximum flexibility.\n\n' +
          'For detailed information about chart behaviors and APIs, refer to the official Recharts documentation at ' +
          '[<u>recharts.github.io</u>](https://recharts.github.io/).\n\n' +
          '**Installation:**\n```bash\nnpm install @wso2/oxygen-ui-charts-react\n```\n\n' +
          '**Usage:**\n```tsx\nimport { RadarChart } from "@wso2/oxygen-ui-charts-react";\n```\n\n',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadarChart>

const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
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
 * #### Radars Configuration
 * - **radars** ( Array<{ ... }> ): Configuration for the radars in the chart. Each radar config supports:
 *   - **dataKey** ( string ): The key of the data point.
 *   - **name** ( string ): The name of the radar.
 *   - **stroke** ( string ): The stroke color.
 *   - **strokeWidth** ( number ): The width of the stroke.
 *   - **strokeDasharray** ( string | number ): The stroke dash array.
 *   - **fill** ( string ): The fill color.
 *   - **fillOpacity** ( number ): The opacity of the fill color.
 *   - **hide** ( boolean ): If true, the radar will be hidden.
 *   - **label** ( boolean | any ): Configuration for the radar's label.
 *   - **dot** ( boolean | any ): If false, dots will not be drawn. (Default: true)
 *   - **activeDot** ( boolean | any ): Dot shown when user enters a radar. (Default: true)
 *   - **connectNulls** ( boolean ): Whether to connect the radar across null points. (Default: false)
 *   - **legendType** ( 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'none' ): The type of icon in legend.
 *   - **animation (radar-level):** isAnimationActive, animationDuration, animationBegin, animationEasing.
 *   - **Event handlers (radar-level):** onMouseEnter, onMouseLeave, onClick.
 *
 * #### Appearance & Layout
 * - **colors** ( string[] ): Custom colors for radars.
 * - **height** ( number | string ): Height of the chart. (Default: 300)
 * - **width** ( number | string ): Width of the chart. (Default: '100%')
 * - **margin** ( MarginConfig ): Margin around the chart. (Default: { top: 0, right: 0, bottom: 0, left: 0 })
 * - **cx, cy** ( number | string ): The x and y coordinates of center. (Default: '50%')
 * - **innerRadius, outerRadius** ( number | string ): Inner and outer radius of the chart.
 * - **startAngle, endAngle** ( number ): Angles in degrees for chart range.
 *
 * #### Polar Grid & Axes
 * - **angleKey** ( string ): The key of each sector's label in data.
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
    <RadarChart
      {...args}
      data={data}
      angleKey="subject"
      radars={[{ dataKey: 'A', name: 'Series A' }]}
    />
  ),
}

export const MultipleRadars: Story = {
  render: () => (
    <RadarChart
      data={data}
      angleKey="subject"
      radars={[
        { dataKey: 'A', name: 'Series A', fill: '#8884d8', fillOpacity: 0.6 },
        { dataKey: 'B', name: 'Series B', fill: '#82ca9d', fillOpacity: 0.6 },
      ]}
      legend={{ show: true }}
    />
  ),
}

export const CustomGridAndAxes: Story = {
  render: () => (
    <RadarChart
      data={data}
      angleKey="subject"
      radars={[{ dataKey: 'A', name: 'Series A' }]}
      polarGrid={{ gridType: 'circle' }}
      polarRadiusAxis={{ angle: 30, domain: [0, 150] }}
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
    <RadarChart
      {...args}
      data={data}
      angleKey="subject"
      legend={{ show: false }}
      tooltip={{ show: false }}
    >
      <Radar name="Series A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  ),
}
