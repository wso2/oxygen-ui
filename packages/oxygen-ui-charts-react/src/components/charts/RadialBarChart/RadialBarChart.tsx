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
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { RadialBarChartProps } from './RadialBarChart.types'

/**
 * RadialBarChart component for Oxygen UI powered by Recharts.
 */
const RadialBarChart = ({
  data,
  radialBars,
  height = 300,
  width = '100%',
  legend,
  tooltip,
  innerRadius = 0,
  outerRadius = '80%',
  cx = '50%',
  cy = '50%',
  startAngle = 0,
  endAngle = 360,
  margin,
  barSize,
  barCategoryGap,
  barGap,
  maxBarSize,
  polarGrid,
  polarAngleAxis,
  polarRadiusAxis,
  syncId,
  syncMethod,
  role,
  title,
  desc,
  id,
  className,
  style,
  tabIndex,
  stackOffset,
  reverseStackOrder,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onContextMenu,
  onDoubleClick,
  accessibilityLayer = true,
  colors: customColors,
  children,
}: RadialBarChartProps): React.ReactElement => {
  const theme = useTheme()

  const isDark = useColorScheme(theme.palette.mode)

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

  const barColors = React.useMemo(() => {
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
  const marginConfig = React.useMemo(
    () => ({ top: 20, right: 20, bottom: 20, left: 20, ...margin }),
    [margin]
  )
  const polarGridConfig = React.useMemo(() => ({ show: false, ...polarGrid }) as const, [polarGrid])
  const polarAngleAxisConfig = React.useMemo(
    () => ({ show: false, ...polarAngleAxis }),
    [polarAngleAxis]
  )
  const polarRadiusAxisConfig = React.useMemo(
    () => ({ show: false, ...polarRadiusAxis }),
    [polarRadiusAxis]
  )

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsRadialBarChart
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        margin={marginConfig}
        barSize={barSize}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        maxBarSize={maxBarSize}
        syncId={syncId}
        syncMethod={syncMethod}
        role={role}
        title={title}
        desc={desc}
        id={id}
        className={className}
        style={style}
        tabIndex={tabIndex}
        stackOffset={stackOffset}
        reverseStackOrder={reverseStackOrder}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
        accessibilityLayer={accessibilityLayer}
      >
        {polarGridConfig?.show && (
          <PolarGrid
            gridType={polarGridConfig.gridType}
            radialLines={polarGridConfig.radialLines}
            polarAngles={polarGridConfig.polarAngles}
            polarRadius={polarGridConfig.polarRadius}
            stroke={colors.comment}
            strokeOpacity={0.3}
          />
        )}

        {polarAngleAxisConfig?.show && (
          <PolarAngleAxis
            dataKey={polarAngleAxisConfig.dataKey}
            tick={polarAngleAxisConfig.tick ?? { fill: colors.text, fontSize: 12 }}
            axisLine={
              polarAngleAxisConfig.axisLine ?? { stroke: colors.comment, strokeOpacity: 0.3 }
            }
            axisLineType={polarAngleAxisConfig.axisLineType}
            orientation={polarAngleAxisConfig.orientation}
            ticks={polarAngleAxisConfig.ticks}
          />
        )}

        {polarRadiusAxisConfig?.show && (
          <PolarRadiusAxis
            angle={polarRadiusAxisConfig.angle}
            domain={polarRadiusAxisConfig.domain}
            tick={polarRadiusAxisConfig.tick ?? { fill: colors.text, fontSize: 10 }}
            axisLine={
              polarRadiusAxisConfig.axisLine ?? { stroke: colors.comment, strokeOpacity: 0.3 }
            }
            orientation={polarRadiusAxisConfig.orientation}
            reversed={polarRadiusAxisConfig.reversed}
            ticks={polarRadiusAxisConfig.ticks}
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
            layout={legendConfig.layout}
            iconType={legendConfig.iconType || 'circle'}
            formatter={(value: any) => (
              <span style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>{value}</span>
            )}
            wrapperStyle={{ paddingTop: 20 }}
          />
        )}

        {radialBars?.map((bar, index) => (
          <RadialBar
            key={`${bar.dataKey}-${index}`}
            name={bar.name}
            dataKey={bar.dataKey}
            fill={bar.fill || barColors[index % barColors.length]}
            background={bar.background ?? { fill: colors.comment, opacity: 0.1 }}
            cornerRadius={bar.cornerRadius}
            minPointSize={bar.minPointSize}
            maxBarSize={bar.maxBarSize}
            hide={bar.hide}
            label={bar.label}
            stackId={bar.stackId}
            legendType={bar.legendType}
            tooltipType={bar.tooltipType}
            isAnimationActive={bar.isAnimationActive}
            animationDuration={bar.animationDuration}
            animationBegin={bar.animationBegin}
            animationEasing={bar.animationEasing}
            onClick={bar.onClick}
            onMouseDown={bar.onMouseDown}
            onMouseUp={bar.onMouseUp}
            onMouseMove={bar.onMouseMove}
            onMouseOver={bar.onMouseOver}
            onMouseOut={bar.onMouseOut}
            onMouseEnter={bar.onMouseEnter}
            onMouseLeave={bar.onMouseLeave}
            onAnimationStart={bar.onAnimationStart}
            onAnimationEnd={bar.onAnimationEnd}
          />
        ))}

        {children}
      </RechartsRadialBarChart>
    </ResponsiveContainer>
  )
}

RadialBarChart.displayName = 'RadialBarChart'
export default RadialBarChart
