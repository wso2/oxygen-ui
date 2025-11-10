/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com).
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

import { useColorScheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Moon, Monitor, Sun } from '@oxygen-ui/react-icons';
import { Tooltip } from '@mui/material';

/**
 * Props for the ColorSchemeToggle component.
 * @remarks Extends MUI IconButtonProps.
 * @see {@link https://mui.com/material-ui/api/icon-button/#props IconButtonProps}
 */
interface ColorSchemeToggleProps extends IconButtonProps {
  darkModeIcon?: React.ReactNode;
  lightModeIcon?: React.ReactNode;
  systemModeIcon?: React.ReactNode;
}

type Mode = 'light' | 'dark' | 'system';

export const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = ({
  darkModeIcon,
  lightModeIcon,
  systemModeIcon,
  ...buttonProps
}) => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const nextMode = (currentMode: Mode): Mode => {
    if (currentMode === 'light') return 'dark';
    if (currentMode === 'dark') return 'system';
    return 'light';
  };

  const currentMode: Mode = mode ?? 'system';

  const ColorSchemeIcon = () => {
    switch (currentMode) {
      case 'light':
        return lightModeIcon ?? <Sun />;
      case 'dark':
        return darkModeIcon ?? <Moon />;
      default:
        return systemModeIcon ?? <Monitor />;
    }
  };

  return (
    <Tooltip title={`${currentMode.charAt(0).toUpperCase()}${currentMode.slice(1)} Mode`}>
      <IconButton {...buttonProps} onClick={() => setMode(nextMode(currentMode))}>
        <ColorSchemeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
