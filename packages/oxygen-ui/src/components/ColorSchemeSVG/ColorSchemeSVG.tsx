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
import {Theme, useColorScheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ComponentType, JSX, ReactNode, SVGProps} from 'react';

/**
 * SVG component source for light and dark modes.
 */
export interface ColorSchemeSVGComponentSource {
  /** SVGR component to use in light mode */
  light: ComponentType<SVGProps<SVGSVGElement>>;
  /** SVGR component to use in dark mode */
  dark: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ColorSchemeSVGProps extends Omit<BoxProps, 'component' | 'children'> {
  /** 
   * SVG elements as children. Use this OR the svg prop.
   */
  children?: ReactNode;

  /**
    * SVG component imported with ?react suffix, or an object with light/dark SVG components.
    * Use this OR children.
   */
  svg?: ComponentType<SVGProps<SVGSVGElement>> | ColorSchemeSVGComponentSource;

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

 * @example
 * ```tsx
 * // With mode-aware SVGR components
 * import LogoLight from './logo-light.svg?react';
 * import LogoDark from './logo-dark.svg?react';
 *
 * <ColorSchemeSVG svg={{ light: LogoLight, dark: LogoDark }} width={200} />
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
  const wrapperRest = rest as BoxProps;
  const svgRest = rest as BoxProps<'svg'>;

  const {mode} = useColorScheme();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const actualMode = mode === 'system' ? (prefersDark ? 'dark' : 'light') : (mode ?? 'light');

  const SelectedSvgComponent =
    SvgComponent && typeof SvgComponent === 'object' && 'light' in SvgComponent && 'dark' in SvgComponent
      ? (actualMode === 'dark' ? SvgComponent.dark : SvgComponent.light)
      : SvgComponent;

  const colorSchemeStyles = {
    color: 'text.primary',

    // Primary theme colors
    '& [fill="primary"]': (theme: Theme) => ({fill: theme.palette.primary.main}),
    '& [fill="primary.dark"]': (theme: Theme) => ({fill: theme.palette.primary.dark}),
    '& [fill="primary.light"]': (theme: Theme) => ({fill: theme.palette.primary.light}),
    '& [fill="primary.contrastText"]': (theme: Theme) => ({fill: theme.palette.primary.contrastText}),
    '& [fill="secondary"]': (theme: Theme) => ({fill: theme.palette.secondary.main}),
    '& [fill="secondary.dark"]': (theme: Theme) => ({fill: theme.palette.secondary.dark}),
    '& [fill="secondary.light"]': (theme: Theme) => ({fill: theme.palette.secondary.light}),
    '& [fill="secondary.contrastText"]': (theme: Theme) => ({fill: theme.palette.secondary.contrastText}),
    '& [fill="accent"]': (theme: Theme) => ({fill: theme.palette.success.main}),
    '& [fill="muted"]': (theme: Theme) => ({fill: theme.palette.grey[500]}),
    // Stroke colors
    '& [stroke="primary"]': (theme: Theme) => ({stroke: theme.palette.primary.main}),
    '& [stroke="primary.dark"]': (theme: Theme) => ({stroke: theme.palette.primary.dark}),
    '& [stroke="primary.light"]': (theme: Theme) => ({stroke: theme.palette.primary.light}),
    '& [stroke="primary.contrastText"]': (theme: Theme) => ({stroke: theme.palette.primary.contrastText}),
    '& [stroke="secondary"]': (theme: Theme) => ({stroke: theme.palette.secondary.main}),
    '& [stroke="secondary.dark"]': (theme: Theme) => ({stroke: theme.palette.secondary.dark}),
    '& [stroke="secondary.light"]': (theme: Theme) => ({stroke: theme.palette.secondary.light}),
    '& [stroke="secondary.contrastText"]': (theme: Theme) => ({stroke: theme.palette.secondary.contrastText}),
    '& [stroke="accent"]': (theme: Theme) => ({stroke: theme.palette.success.main}),
    '& [stroke="muted"]': (theme: Theme) => ({stroke: theme.palette.grey[500]}),

    // Text colors
    '& [fill="text-primary"]': (theme: Theme) => ({fill: theme.palette.text.primary}),
    '& [fill="text-secondary"]': (theme: Theme) => ({fill: theme.palette.text.secondary}),
    '& [fill="text-disabled"]': (theme: Theme) => ({fill: theme.palette.text.disabled}),

    // Background colors
    '& [fill="background"]': (theme: Theme) => ({fill: theme.palette.background.default}),
    '& [fill="surface"]': (theme: Theme) => ({fill: theme.palette.background.paper}),

    // Status colors
    '& [fill="error"]': (theme: Theme) => ({fill: theme.palette.error.main}),
    '& [fill="error.dark"]': (theme: Theme) => ({fill: theme.palette.error.dark}),
    '& [fill="error.light"]': (theme: Theme) => ({fill: theme.palette.error.light}),
    '& [fill="error.contrastText"]': (theme: Theme) => ({fill: theme.palette.error.contrastText}),
    '& [fill="warning"]': (theme: Theme) => ({fill: theme.palette.warning.main}),
    '& [fill="warning.dark"]': (theme: Theme) => ({fill: theme.palette.warning.dark}),
    '& [fill="warning.light"]': (theme: Theme) => ({fill: theme.palette.warning.light}),
    '& [fill="warning.contrastText"]': (theme: Theme) => ({fill: theme.palette.warning.contrastText}),
    '& [fill="info"]': (theme: Theme) => ({fill: theme.palette.info.main}),
    '& [fill="info.dark"]': (theme: Theme) => ({fill: theme.palette.info.dark}),
    '& [fill="info.light"]': (theme: Theme) => ({fill: theme.palette.info.light}),
    '& [fill="info.contrastText"]': (theme: Theme) => ({fill: theme.palette.info.contrastText}),
    '& [fill="success"]': (theme: Theme) => ({fill: theme.palette.success.main}),
    '& [fill="success.dark"]': (theme: Theme) => ({fill: theme.palette.success.dark}),
    '& [fill="success.light"]': (theme: Theme) => ({fill: theme.palette.success.light}),
    '& [fill="success.contrastText"]': (theme: Theme) => ({fill: theme.palette.success.contrastText}),
    
    // Status colors for stroke
    '& [stroke="error"]': (theme: Theme) => ({stroke: theme.palette.error.main}),
    '& [stroke="error.dark"]': (theme: Theme) => ({stroke: theme.palette.error.dark}),
    '& [stroke="error.light"]': (theme: Theme) => ({stroke: theme.palette.error.light}),
    '& [stroke="error.contrastText"]': (theme: Theme) => ({stroke: theme.palette.error.contrastText}),
    '& [stroke="warning"]': (theme: Theme) => ({stroke: theme.palette.warning.main}),
    '& [stroke="warning.dark"]': (theme: Theme) => ({stroke: theme.palette.warning.dark}),
    '& [stroke="warning.light"]': (theme: Theme) => ({stroke: theme.palette.warning.light}),
    '& [stroke="warning.contrastText"]': (theme: Theme) => ({stroke: theme.palette.warning.contrastText}),
    '& [stroke="info"]': (theme: Theme) => ({stroke: theme.palette.info.main}),
    '& [stroke="info.dark"]': (theme: Theme) => ({stroke: theme.palette.info.dark}),
    '& [stroke="info.light"]': (theme: Theme) => ({stroke: theme.palette.info.light}),
    '& [stroke="info.contrastText"]': (theme: Theme) => ({stroke: theme.palette.info.contrastText}),
    '& [stroke="success"]': (theme: Theme) => ({stroke: theme.palette.success.main}),
    '& [stroke="success.dark"]': (theme: Theme) => ({stroke: theme.palette.success.dark}),
    '& [stroke="success.light"]': (theme: Theme) => ({stroke: theme.palette.success.light}),
    '& [stroke="success.contrastText"]': (theme: Theme) => ({stroke: theme.palette.success.contrastText}),

    // Additional utility colors
    '& [stroke="border"]': (theme: Theme) => ({stroke: theme.palette.divider}),
    '& [fill="highlight"]': (theme: Theme) => ({fill: theme.palette.action.selected}),
    '& [fill="hover"]': (theme: Theme) => ({fill: theme.palette.action.hover}),
  };

  // If SVG component is provided, render it in a wrapper with theme styles.
  // This path supports theme-aware fill/stroke remapping.
  if (SelectedSvgComponent) {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          '& > svg': colorSchemeStyles,
          ...sx,
        }}
        {...wrapperRest}
      >
        <SelectedSvgComponent width={width} height={height} />
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
      {...svgRest}
    >
      {children}
    </Box>
  );
}
