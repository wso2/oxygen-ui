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
import { useColorScheme, useTheme } from '@wso2/oxygen-ui'

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { AreaChartProps } from './AreaChart.types'

/**
 * AreaChart component for Oxygen UI powered by Recharts.
 */
const AreaChart = ({
  data,
  areas,
  xAxisDataKey,
  height = 300,
  width = '100%',
  legend,
  grid,
  tooltip,
  layout = 'horizontal',
  margin,
  syncId,
  syncMethod,
  role,
  title,
  desc,
  accessibilityLayer = true,
  xAxis,
  yAxis,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  isAnimationActive = true,
  animationDuration = 1500,
  animationBegin = 0,
  animationEasing = 'ease',
  colors: customColors,
  children,
}: AreaChartProps): React.ReactElement => {
  const theme = useTheme()

  const { mode, systemMode } = useColorScheme()
  const isDark = mode === 'dark' || (mode === 'system' && systemMode === 'dark')

  const colors = React.useMemo(() => {
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

  const idPrefix = React.useId()

  const areaColors = React.useMemo(() => {
    if (customColors && customColors.length > 0) return customColors
    return [
      colors.primary,
      colors.keyword,
      colors.string,
      colors.function,
      colors.number,
      colors.operator,
    ]
  }, [
    customColors,
    colors.primary,
    colors.keyword,
    colors.string,
    colors.function,
    colors.number,
    colors.operator,
  ])

  const legendConfig = React.useMemo(
    () => ({ show: true, align: 'center', verticalAlign: 'bottom', ...legend }) as const,
    [legend]
  )
  const gridConfig = React.useMemo(() => ({ show: true, strokeDasharray: '3 3', ...grid }), [grid])
  const marginConfig = React.useMemo(
    () => ({ top: 12, right: 24, left: 24, bottom: 40, ...margin }),
    [margin]
  )
  const xAxisConfig = React.useMemo(() => ({ show: true, ...xAxis }), [xAxis])
  const yAxisConfig = React.useMemo(() => ({ show: true, ...yAxis }), [yAxis])

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsAreaChart
        data={data}
        layout={layout}
        margin={marginConfig}
        syncId={syncId}
        syncMethod={syncMethod}
        role={role}
        title={title}
        desc={desc}
        accessibilityLayer={accessibilityLayer}
      >
        <defs>
          {areas?.map((area, index) => {
            const color = area.fill || area.stroke || areaColors[index % areaColors.length]
            return (
              <linearGradient
                key={`${idPrefix}-gradient-${area.dataKey}`}
                id={`${idPrefix}-gradient-${area.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={area.fillOpacity ?? 0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            )
          })}
        </defs>

        {gridConfig?.show && (
          <CartesianGrid
            strokeDasharray={gridConfig.strokeDasharray}
            stroke={colors.text}
            vertical={false}
          />
        )}

        {xAxisConfig?.show && (
          <XAxis
            type={xAxisConfig.type || (layout === 'vertical' ? 'number' : 'category')}
            dataKey={layout === 'vertical' ? undefined : xAxisDataKey}
            stroke={colors.text}
            domain={xAxisConfig.domain}
            tickCount={xAxisConfig.tickCount}
            interval={xAxisConfig.interval}
            tick={{
              fill: colors.text,
              fontSize: 12,
            }}
            tickMargin={8}
            axisLine={{ stroke: colors.text }}
            tickLine={{ stroke: colors.text }}
            label={
              xAxisConfig.name
                ? {
                    value: xAxisConfig.name,
                    position: 'insideBottom',
                    offset: -18,
                    fill: colors.text,
                    fontSize: 12,
                  }
                : undefined
            }
          />
        )}

        {yAxisConfig?.show && (
          <YAxis
            type={yAxisConfig.type || (layout === 'vertical' ? 'category' : 'number')}
            dataKey={layout === 'vertical' ? xAxisDataKey : undefined}
            stroke={colors.text}
            domain={yAxisConfig.domain}
            tickCount={yAxisConfig.tickCount}
            interval={yAxisConfig.interval}
            tick={{
              fill: colors.text,
              fontSize: 12,
            }}
            tickMargin={8}
            axisLine={{ stroke: colors.text }}
            tickLine={{ stroke: colors.text }}
            label={
              yAxisConfig.name
                ? {
                    value: yAxisConfig.name,
                    angle: -90,
                    position: 'insideLeft',
                    offset: 0,
                    fill: colors.text,
                    fontSize: 12,
                  }
                : undefined
            }
          />
        )}

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

        {areas?.map((area, index) => (
          <Area
            key={`${area.dataKey}-${index}`}
            dataKey={area.dataKey}
            name={area.name}
            stroke={area.stroke || areaColors[index % areaColors.length]}
            fill={`url(#${idPrefix}-gradient-${area.dataKey})`}
            strokeWidth={area.strokeWidth ?? 2}
            strokeDasharray={area.strokeDasharray}
            type={area.type || 'monotone'}
            stackId={area.stackId}
            hide={area.hide}
            label={area.label}
            dot={area.dot ?? true}
            activeDot={area.activeDot ?? true}
            connectNulls={area.connectNulls}
            unit={area.unit}
            legendType={area.legendType || 'line'}
            onClick={(area.onClick || onClick) as any}
            onMouseDown={(area.onMouseDown || onMouseDown) as any}
            onMouseUp={(area.onMouseUp || onMouseUp) as any}
            onMouseMove={(area.onMouseMove || onMouseMove) as any}
            onMouseOver={area.onMouseOver as any}
            onMouseOut={area.onMouseOut as any}
            onMouseEnter={(area.onMouseEnter || onMouseEnter) as any}
            onMouseLeave={(area.onMouseLeave || onMouseLeave) as any}
            isAnimationActive={area.isAnimationActive ?? isAnimationActive}
            animationDuration={area.animationDuration ?? animationDuration}
            animationBegin={area.animationBegin ?? animationBegin}
            animationEasing={area.animationEasing ?? animationEasing}
          />
        ))}

        {children}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

AreaChart.displayName = 'AreaChart'
export default AreaChart
