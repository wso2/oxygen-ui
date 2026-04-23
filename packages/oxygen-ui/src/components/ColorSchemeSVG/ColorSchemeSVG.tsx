/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Box, {BoxProps} from '@mui/material/Box';
import {ComponentType, JSX, ReactNode, SVGProps} from 'react';

/**
 * Props for the ColorSchemeSVG component.
 * Extends BoxProps to inherit Box component properties for styling.
 */
export interface ColorSchemeSVGProps extends Omit<BoxProps, 'component' | 'children'> {
  /** 
   * SVG elements as children. Use this OR the svg prop.
   */
  children?: ReactNode;

  /**
   * SVG component imported with ?react suffix. Use this OR children.
   */
  svg?: ComponentType<SVGProps<SVGSVGElement>>;

  /**
   * Width of the SVG. Can be a number (treated as pixels) or a string.
   */
  width?: number | string;

  /**
   * Height of the SVG. Can be a number (treated as pixels) or a string.
   */
  height?: number | string;

  /**
   * ViewBox attribute for the SVG element.
   * Defines the coordinate system and aspect ratio.
   */
  viewBox?: string;

  /**
   * PreserveAspectRatio attribute for the SVG element.
   */
  preserveAspectRatio?: string;

  /**
   * Xmlns attribute for the SVG element.
   */
  xmlns?: string;

  /**
   * XmlnsXlink attribute for the SVG element.
   */
  xmlnsXlink?: string;
}

/**
 * A theme-aware SVG component that applies color scheme to SVG elements.
 * Automatically maps fill and stroke attributes to theme colors for both light and dark modes.
 *
 * Supported color values (use with fill or stroke attributes):
 * - `primary`, `secondary`, `accent`, `muted` - Theme colors
 * - `text-primary`, `text-secondary`, `text-disabled` - Text colors
 * - `background`, `surface` - Background colors
 * - `error`, `warning`, `info`, `success` - Status colors
 * - `border` - Divider color (stroke only)
 * - `highlight`, `hover` - Action colors (fill only)
 *
 * @param props - The component props
 * @param props.children - SVG elements to render (use this OR svg prop)
 * @param props.svg - SVG component to render (use this OR children)
 * @param props.width - Width of the SVG
 * @param props.height - Height of the SVG
 * @param props.viewBox - ViewBox attribute for the SVG
 * @param props.sx - Additional MUI sx styles
 * @param props.rest - Additional SVG attributes
 * @returns A theme-aware SVG component
 *
 * @example
 * ```tsx
 * // With inline SVG elements
 * <ColorSchemeSVG width={200} height={100} viewBox="0 0 200 100">
 *   <rect fill="primary" x="0" y="0" width="100" height="100" />
 *   <circle stroke="secondary" fill="none" strokeWidth="2" cx="150" cy="50" r="40" />
 * </ColorSchemeSVG>
 * ```
 *
 * @example
 * ```tsx
 * // With imported SVG component
 * import MyLogo from './logo.svg?react';
 * 
 * <ColorSchemeSVG svg={MyLogo} width={200} />
 * ```
 *
 * @example
 * ```tsx
 * // With custom styles
 * <ColorSchemeSVG
 *   width={400}
 *   height={300}
 *   viewBox="0 0 400 300"
 *   sx={{
 *     maxWidth: '100%',
 *     height: 'auto',
 *   }}
 * >
 *   <rect fill="background" width="400" height="300" />
 *   <circle fill="primary" cx="200" cy="150" r="50" />
 * </ColorSchemeSVG>
 * ```
 */
export default function ColorSchemeSVG({
  children,
  svg: SvgComponent,
  width,
  height,
  sx,
  ...rest
}: ColorSchemeSVGProps): JSX.Element {
  const colorSchemeStyles = {
    color: 'text.primary',

    // Primary theme colors
    '& [fill="primary"]': (theme: any) => ({fill: theme.palette.primary.main}),
    '& [fill="secondary"]': (theme: any) => ({fill: theme.palette.secondary.main}),
    '& [fill="accent"]': (theme: any) => ({fill: theme.palette.success.main}),
    '& [fill="muted"]': (theme: any) => ({fill: theme.palette.grey[500]}),

    // Stroke colors
    '& [stroke="primary"]': (theme: any) => ({stroke: theme.palette.primary.main}),
    '& [stroke="secondary"]': (theme: any) => ({stroke: theme.palette.secondary.main}),
    '& [stroke="accent"]': (theme: any) => ({stroke: theme.palette.success.main}),
    '& [stroke="muted"]': (theme: any) => ({stroke: theme.palette.grey[500]}),

    // Text colors
    '& [fill="text-primary"]': (theme: any) => ({fill: theme.palette.text.primary}),
    '& [fill="text-secondary"]': (theme: any) => ({fill: theme.palette.text.secondary}),
    '& [fill="text-disabled"]': (theme: any) => ({fill: theme.palette.text.disabled}),

    // Background colors
    '& [fill="background"]': (theme: any) => ({fill: theme.palette.background.default}),
    '& [fill="surface"]': (theme: any) => ({fill: theme.palette.background.paper}),

    // Status colors
    '& [fill="error"]': (theme: any) => ({fill: theme.palette.error.main}),
    '& [fill="warning"]': (theme: any) => ({fill: theme.palette.warning.main}),
    '& [fill="info"]': (theme: any) => ({fill: theme.palette.info.main}),
    '& [fill="success"]': (theme: any) => ({fill: theme.palette.success.main}),
    '& [stroke="error"]': (theme: any) => ({stroke: theme.palette.error.main}),
    '& [stroke="warning"]': (theme: any) => ({stroke: theme.palette.warning.main}),
    '& [stroke="info"]': (theme: any) => ({stroke: theme.palette.info.main}),
    '& [stroke="success"]': (theme: any) => ({stroke: theme.palette.success.main}),

    // Additional utility colors
    '& [stroke="border"]': (theme: any) => ({stroke: theme.palette.divider}),
    '& [fill="highlight"]': (theme: any) => ({fill: theme.palette.action.selected}),
    '& [fill="hover"]': (theme: any) => ({fill: theme.palette.action.hover}),
  };

  // If SVG component is provided, render it in a wrapper with theme styles
  if (SvgComponent) {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          '& > svg': colorSchemeStyles,
          ...sx,
        }}
        {...rest}
      >
        <SvgComponent width={width} height={height} />
      </Box>
    );
  }

  // Otherwise render as svg element with children
  return (
    <Box
      component="svg"
      width={width}
      height={height}
      sx={{
        ...colorSchemeStyles,
        ...sx,
      }}
      {...(rest as any)}
    >
      {children}
    </Box>
  );
}
