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

import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import {useColorScheme} from '@mui/material/styles';
import clsx from 'clsx';
import {FC, PropsWithChildren, ReactElement, SVGProps} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import './color-mode-toggle.scss';

export type ColorModeToggleProps = IconButtonProps;

const COMPONENT_NAME: string = 'ColorModeToggle';

const BrightnessIcon = (props: PropsWithChildren<SVGProps<SVGSVGElement>>): ReactElement => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const CrescentIcon = (props: PropsWithChildren<SVGProps<SVGSVGElement>>): ReactElement => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const ColorModeToggle: FC<ColorModeToggleProps> & WithWrapperProps = ({
  className,
  ...rest
}: ColorModeToggleProps): ReactElement => {
  const {mode, setMode} = useColorScheme();

  const classes: string = clsx('oxygen-color-mode-toggle', className);

  return (
    <IconButton
      sx={{ml: 1}}
      onClick={(): void => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
      color="inherit"
      className={classes}
      {...rest}
    >
      {mode === 'light' ? <BrightnessIcon /> : <CrescentIcon />}
    </IconButton>
  );
};

ColorModeToggle.displayName = composeComponentDisplayName(COMPONENT_NAME);
ColorModeToggle.muiName = COMPONENT_NAME;

export default ColorModeToggle;
