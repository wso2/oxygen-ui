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

import {Typography} from '@mui/material';
import {FC, ReactElement} from 'react';
import WorldFlag from 'react-world-flags';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';

export interface CountryFlagsProps extends React.HTMLAttributes<HTMLElement & SVGElement> {
  /**
   * The two-letter/three-letter/three-digit country code of the flag.
   */
  countryCode: string;
  /**
   * The height of the flag.
   */
  height?: string;
}

const COMPONENT_NAME: string = 'Flag';

const CountryFlag: FC<CountryFlagsProps> & WithWrapperProps = ({
  countryCode,
  height = '16',
  ...rest
}: CountryFlagsProps): ReactElement => (
  <WorldFlag code={countryCode} height={height} fallback={<Typography>{countryCode}</Typography>} {...rest} />
);

CountryFlag.displayName = composeComponentDisplayName(COMPONENT_NAME);
CountryFlag.muiName = COMPONENT_NAME;

export default CountryFlag;
