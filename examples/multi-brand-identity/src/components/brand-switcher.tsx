import React, {useState, MouseEvent} from 'react';
import {ToggleButtonGroup, ToggleButton, Paper, Tooltip} from '@oxygen/react';

const BRANDS = [
  {
    name: 'Oxygen',
    switcher: {
      logo: '/assets/brands/oxygen/images/oxygen-mini-logo.svg',
      tooltip: 'Oxygen (Default',
    },
  },
  {
    name: 'Asgardeo',
    switcher: {
      logo: '/assets/brands/asgardeo/images/asgardeo-mini-logo.svg',
      tooltip: 'Asgardeo',
    },
  },
  {
    name: 'Choreo',
    switcher: {
      logo: '/assets/brands/choreo/images/choreo-mini-logo.svg',
      tooltip: 'Choreo',
    },
  },
  {
    name: 'WSO2',
    switcher: {
      logo: '/assets/brands/wso2/images/wso2-mini-logo.svg',
      tooltip: 'WSO2',
    },
  },
];

export interface BrandSwitcherProps {
  onBrandChange?: (brand: string) => void;
}

export const BrandSwitcher = (props: BrandSwitcherProps) => {
  const {onBrandChange} = props;

  const [activeBrand, setActiveBrand] = useState<string>(BRANDS[0].name);

  const handleBrandChange = (event: MouseEvent<HTMLElement>, brand: string) => {
    if (!brand) {
      return;
    }

    setActiveBrand(brand);

    if (onBrandChange) {
      onBrandChange(brand);
    }
  };

  return (
    <Paper
      className="brand-switcher"
      elevation={0}
      sx={{
        border: theme => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <ToggleButtonGroup
        exclusive
        className="brand-switcher-group"
        value={activeBrand}
        size="small"
        onChange={handleBrandChange}
      >
        {BRANDS.map(brand => (
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
