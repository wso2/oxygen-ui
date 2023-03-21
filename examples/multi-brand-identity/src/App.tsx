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

import {AppBar, ColorModeToggle, Toolbar, ThemeProvider, IconButton, Theme, Tooltip} from '@oxygen-ui-experimental/react';
import {ReactElement, useReducer, useState} from 'react';
import {BrandingActions, brandingReducer, DefaultTheme} from './branding';
import {BrandSwitcher, BuildingIcon, OrganizationSelectionDialog} from './components';
import {LoginPage} from './pages';

const App = (): ReactElement => {
  const [theme, dispatch] = useReducer(brandingReducer, DefaultTheme as never);

  const [isOrganizationSelectionOpen, setIsOrganizationSelectionOpen] = useState<boolean>(false);
  const [selectedOrganization, setSelectedOrganization] = useState<string | undefined>('');

  const handleBrandChange = (brand: string): void => {
    setSelectedOrganization('');
    dispatch({
      brand,
      type: BrandingActions.ChangeTheme,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar className="app-header" elevation={0} color="transparent" variant="outlined">
        <Toolbar className="app-header-toolbar">
          <div>
            <Tooltip title="Connect with Asgardeo Branding">
              <IconButton
                sx={{height: 40, width: 40}}
                color="inherit"
                onClick={(): void => {
                  if (!isOrganizationSelectionOpen) {
                    setIsOrganizationSelectionOpen(true);
                  }
                }}
              >
                <BuildingIcon theme={theme} />
              </IconButton>
            </Tooltip>
            <div className="selected-organization">{selectedOrganization}</div>
          </div>
          <BrandSwitcher onBrandChange={handleBrandChange} />
          <ColorModeToggle />
        </Toolbar>
      </AppBar>
      <LoginPage />
      <OrganizationSelectionDialog
        open={isOrganizationSelectionOpen}
        onClose={(): void => setIsOrganizationSelectionOpen(false)}
        onOrganizationConnect={(payload: {brand: string | undefined; theme: Theme; type: BrandingActions}): void => {
          setSelectedOrganization(payload.brand);
          dispatch(payload);
        }}
      />
    </ThemeProvider>
  );
};

export default App;
