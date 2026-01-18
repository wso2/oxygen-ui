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
import { useTheme } from '@mui/material/styles'
import { useColorScheme } from '../../../hooks/useColorScheme'
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
  data,
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

  const isDark = useColorScheme(theme.palette.mode)

  const syntaxColors = React.useMemo(() => {
    const defaultColors = {
      primary: isDark ? '#F87643' : '#fa7b3f',
      background: isDark ? '#1e1e1e' : '#f5f5f5',
      text: isDark ? '#d4d4d4' : '#24292e',
      comment: isDark ? '#6a9955' : '#6a737d',
      keyword: isDark ? '#569cd6' : '#d73a49',
      string: isDark ? '#ce9178' : '#032f62',
      function: isDark ? '#dcdcaa' : '#6f42c1',
      number: isDark ? '#b5cea8' : '#005cc5',
      operator: isDark ? '#d4d4d4' : '#d73a49',
    }
    const themeSyntax = isDark
      ? (theme.vars as any)?.syntax?.dark
      : (theme.vars as any)?.syntax?.light

    return {
      ...defaultColors,
      ...themeSyntax,
      primary: theme.palette.primary?.main || themeSyntax?.primary || defaultColors.primary,
    }
  }, [isDark, theme.palette.primary?.main, theme.vars])

  const chartColors = React.useMemo(() => {
    if (customColors && customColors.length > 0) return customColors
    return [
      syntaxColors.primary,
      syntaxColors.keyword,
      syntaxColors.string,
      syntaxColors.function,
      syntaxColors.number,
      syntaxColors.operator,
    ]
  }, [
    customColors,
    syntaxColors.primary,
    syntaxColors.keyword,
    syntaxColors.string,
    syntaxColors.function,
    syntaxColors.number,
    syntaxColors.operator,
  ])

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
            onClick={pie.onClick || onClick}
            onMouseEnter={pie.onMouseEnter || onMouseEnter}
            onMouseLeave={pie.onMouseLeave || onMouseLeave}
            onMouseDown={pie.onMouseDown || onMouseDown}
            onMouseUp={pie.onMouseUp || onMouseUp}
            onMouseMove={pie.onMouseMove || onMouseMove}
            onContextMenu={pie.onContextMenu || onContextMenu}
            onDoubleClick={pie.onDoubleClick || onDoubleClick}
          >
            {data?.map((entry, index) => (
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
                  backgroundColor: syntaxColors.background,
                  border: `1px solid ${syntaxColors.text}`,
                  borderRadius: theme.shape.borderRadius ?? 8,
                  color: syntaxColors.text,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  ...contentStyle,
                }}
                itemStyle={{
                  color: syntaxColors.text,
                  fontSize: 12,
                  ...itemStyle,
                }}
                labelStyle={{
                  color: syntaxColors.text,
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
                  color: syntaxColors.text,
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
