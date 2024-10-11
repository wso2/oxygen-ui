/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, HTMLAttributes, Ref, ReactElement} from 'react';
import WorldFlag from 'react-world-flags';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Typography from '../Typography';

export type CountryFlagProps = {
  /**
   * The two-letter/three-letter/three-digit country code of the flag.
   */
  countryCode: string;
  /**
   * The height of the flag.
   */
  height?: string;
} & HTMLAttributes<HTMLImageElement>;

/**
 * @deprecated Use the {@link CountryFlagProps} instead.
 */
export type CountryFlagsProps = CountryFlagProps;

const COMPONENT_NAME: string = 'CountryFlag';

/**
 * The Toggle to switch between the two palette modes: light (the default) and dark.
 *
 * Demos:
 *
 * - [Country Flag (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/icons-country-flags)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @param props - The props for the CountryFlag component.
 * @param ref - The ref to be forwarded to the WorldFlag component.
 * @returns The rendered CountryFlag component.
 */
const CountryFlag: ForwardRefExoticComponent<CountryFlagProps> & WithWrapperProps = forwardRef(
  ({countryCode, height = '16', ...rest}: CountryFlagProps, ref: Ref<HTMLImageElement>): ReactElement => (
    <WorldFlag
      ref={ref}
      code={countryCode}
      height={height}
      fallback={<Typography>{countryCode}</Typography>}
      {...rest}
    />
  ),
) as ForwardRefExoticComponent<CountryFlagProps> & WithWrapperProps;

CountryFlag.displayName = composeComponentDisplayName(COMPONENT_NAME);
CountryFlag.muiName = COMPONENT_NAME;

export default CountryFlag;
