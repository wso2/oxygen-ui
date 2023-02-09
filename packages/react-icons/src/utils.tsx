/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

// React needs to be in the scope for the icons to work.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {CSSProperties, SVGProps} from 'react';
import {GeneratedIcon, IconSizes} from './models';

const sizeMap: {
  [key in IconSizes]: number;
} = {
  large: 64,
  medium: 32,
  small: 16,
};

/**
 * Calculates the closes height from a list of provided heights.
 *
 * @param naturalHeights - Set of natural heights.
 * @param height - Height to check.
 * @returns Closest natural height.
 */
const getClosestNaturalHeight = (naturalHeights: number[], height: number): number =>
  naturalHeights.reduce(
    (acc: number, naturalHeight: number) => (naturalHeight <= height ? naturalHeight : acc),
    naturalHeights[0],
  );

/**
 * Creates a React component from a `SVG`.
 *
 * @param name - Name for the Component.
 * @param defaultClassName - Default CSS class name.
 * @param getSVGData - Function to get the SVG data.
 * @returns A React component created from an SVG.
 */
export const createIconComponent = (
  name: string,
  defaultClassName: string,
  getSVGData: () => GeneratedIcon,
): Function => {
  const svgDataByHeight: GeneratedIcon = getSVGData();
  const heights: number[] = Object.keys(svgDataByHeight).map((height: string) => parseInt(height, 10));

  const Icon = ({
    'aria-label': ariaLabel,
    tabIndex,
    className = defaultClassName,
    fill = 'currentColor',
    size = 16,
    verticalAlign = 'text-bottom',
  }: SVGProps<SVGSVGElement> & {
    size: number;
    verticalAlign: CSSProperties['verticalAlign'];
  }): SVGProps<SVGSVGElement> => {
    const height: number = sizeMap[size] || size;
    const naturalHeight: number = getClosestNaturalHeight(heights, height);
    const naturalWidth: number = svgDataByHeight[naturalHeight].width as number;
    const width: number = height * (naturalWidth / naturalHeight);
    const {path} = svgDataByHeight[naturalHeight];

    return (
      <svg
        aria-hidden={ariaLabel ? 'false' : 'true'}
        tabIndex={tabIndex}
        focusable={tabIndex !== undefined && tabIndex >= 0 ? 'true' : 'false'}
        aria-label={ariaLabel}
        role="img"
        className={className}
        viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
        width={width}
        height={height}
        fill={fill}
        style={{
          display: 'inline-block',
          overflow: 'visible',
          userSelect: 'none',
          verticalAlign,
        }}
      >
        {path}
      </svg>
    );
  };

  Icon.displayName = name;

  return Icon;
};
