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
import { useTheme } from '@wso2/oxygen-ui'
import { useChartColors } from '../useChartColors'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PieChartProps } from './PieChart.types'

/**
 * PieChart component for Oxygen UI powered by Recharts.
 */
const PieChart = ({
  data = [],
  pies,
  nameKey,
  height = 300,
  width = '100%',
  legend,
  tooltip,
  margin,
  cx = '50%',
  cy = '50%',
  startAngle = 0,
  endAngle = 360,
  innerRadius = 0,
  outerRadius = '80%',
  paddingAngle = 0,
  cornerRadius = 0,
  minAngle = 0,
  isAnimationActive = true,
  animationDuration = 1500,
  animationBegin = 0,
  animationEasing = 'ease',
  colors: customColors,
  label,
  labelLine,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onContextMenu,
  onDoubleClick,
  children,
}: PieChartProps): React.ReactElement => {
  const theme = useTheme()

  const { series: chartColors, ...colors } = useChartColors(customColors)


  const legendConfig = React.useMemo(
    () => ({ show: true, align: 'center', verticalAlign: 'bottom', ...legend }) as const,
    [legend]
  )
  const marginConfig = React.useMemo(
    () => ({ top: 12, right: 24, left: 24, bottom: 40, ...margin }),
    [margin]
  )

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsPieChart data={data} margin={marginConfig}>
        {pies?.map((pie, index) => (
          <Pie
            key={`${pie.dataKey}-${index}`}
            data={data}
            dataKey={pie.dataKey}
            nameKey={pie.nameKey || nameKey}
            name={pie.name}
            cx={pie.cx ?? cx}
            cy={pie.cy ?? cy}
            startAngle={pie.startAngle ?? startAngle}
            endAngle={pie.endAngle ?? endAngle}
            innerRadius={pie.innerRadius ?? innerRadius}
            outerRadius={pie.outerRadius ?? outerRadius}
            paddingAngle={pie.paddingAngle ?? paddingAngle}
            cornerRadius={pie.cornerRadius ?? cornerRadius}
            minAngle={pie.minAngle ?? minAngle}
            isAnimationActive={pie.isAnimationActive ?? isAnimationActive}
            animationDuration={pie.animationDuration ?? animationDuration}
            animationBegin={pie.animationBegin ?? animationBegin}
            animationEasing={pie.animationEasing ?? animationEasing}
            label={pie.label ?? label}
            labelLine={pie.labelLine ?? labelLine}
            onClick={(pie.onClick || onClick) as any}
            onMouseEnter={(pie.onMouseEnter || onMouseEnter) as any}
            onMouseLeave={(pie.onMouseLeave || onMouseLeave) as any}
            onMouseDown={(pie.onMouseDown || onMouseDown) as any}
            onMouseUp={(pie.onMouseUp || onMouseUp) as any}
            onMouseMove={(pie.onMouseMove || onMouseMove) as any}
            onContextMenu={(pie.onContextMenu || onContextMenu) as any}
            onDoubleClick={(pie.onDoubleClick || onDoubleClick) as any}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
        ))}

        {tooltip?.show !== false &&
          (() => {
            const { contentStyle, itemStyle, labelStyle, show, ...rest } = tooltip || {}
            return (
              <Tooltip
                {...rest}
                contentStyle={{
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.text}`,
                  borderRadius: theme.shape.borderRadius ?? 8,
                  color: colors.text,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  ...contentStyle,
                }}
                itemStyle={{
                  color: colors.text,
                  fontSize: 12,
                  ...itemStyle,
                }}
                labelStyle={{
                  color: colors.text,
                  fontWeight: 600,
                  marginBottom: 4,
                  ...labelStyle,
                }}
              />
            )
          })()}

        {legendConfig.show && (
          <Legend
            align={legendConfig.align}
            verticalAlign={legendConfig.verticalAlign}
            iconType="circle"
            formatter={(value: any) => (
              <span
                style={{
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {value}
              </span>
            )}
            wrapperStyle={{ paddingTop: 32 }}
          />
        )}

        {children}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

PieChart.displayName = 'PieChart'
export default PieChart
