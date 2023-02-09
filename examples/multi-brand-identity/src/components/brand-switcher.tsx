/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {ToggleButtonGroup, ToggleButton, Paper, Tooltip} from '@oxygen-ui/react';
import React, {useState, MouseEvent, ReactElement} from 'react';

interface Brand {
  name: string;
  switcher: {
    logo: string;
    tooltip: string;
  };
}

const BRANDS: Brand[] = [
  {
    name: 'WSO2',
    switcher: {
      logo: `${process.env.PUBLIC_URL}/assets/brands/wso2/images/wso2-mini-logo.svg`,
      tooltip: 'WSO2 (Default Oxygen Brand)',
    },
  },
  {
    name: 'Asgardeo',
    switcher: {
      logo: `${process.env.PUBLIC_URL}/assets/brands/asgardeo/images/asgardeo-mini-logo.svg`,
      tooltip: 'Asgardeo',
    },
  },
  {
    name: 'Choreo',
    switcher: {
      logo: `${process.env.PUBLIC_URL}/assets/brands/choreo/images/choreo-mini-logo.svg`,
      tooltip: 'Choreo',
    },
  },
  {
    name: 'Ballerina',
    switcher: {
      logo: `${process.env.PUBLIC_URL}/assets/brands/ballerina/images/ballerina-mini-logo.svg`,
      tooltip: 'Ballerina',
    },
  },
];

export interface BrandSwitcherProps {
  onBrandChange?: (brand: string) => void;
}

export const BrandSwitcher = (props: BrandSwitcherProps): ReactElement => {
  const {onBrandChange} = props;

  const [activeBrand, setActiveBrand] = useState<string>(BRANDS[0].name);

  const handleBrandChange = (event: MouseEvent<HTMLElement>, brand: string): void => {
    if (!brand) {
      return;
    }

    setActiveBrand(brand);

    if (onBrandChange) {
      onBrandChange(brand);
    }
  };

  return (
    <Paper className="brand-switcher" elevation={0}>
      <ToggleButtonGroup
        exclusive
        className="brand-switcher-group"
        value={activeBrand}
        size="small"
        onChange={handleBrandChange}
      >
        {BRANDS.map((brand: Brand) => (
          <ToggleButton
            key={brand.name}
            className={`brand-switcher-switch ${brand.name.toLowerCase()}`}
            value={brand.name}
          >
            <Tooltip title={brand.switcher.tooltip}>
              <img className="brand-switcher-switch-logo" alt={brand.name} src={brand.switcher.logo} />
            </Tooltip>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
};
