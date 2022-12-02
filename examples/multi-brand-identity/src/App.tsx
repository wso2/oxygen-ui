import {AppBar, ColorModeToggle, Toolbar, ThemeProvider, IconButton} from '@oxygen/react';
import React, {ReactElement, useReducer, useState} from 'react';
import {BrandingActions, brandingReducer, defaultTheme} from './branding';
import {BrandSwitcher, BuildingIcon, OrganizationSelectionDialog} from './components';
import LoginPage from './pages/login-page';

const App = (): ReactElement => {
  const [theme, dispatch] = useReducer(brandingReducer, defaultTheme as never);

  const [isOrganizationSelectionOpen, setIsOrganizationSelectionOpen] = useState<boolean>(false);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');

  const handleBrandChange = (brand: string) => {
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
            <IconButton
              sx={{height: 40, width: 40}}
              color="inherit"
              onClick={() => {
                if (!isOrganizationSelectionOpen) {
                  setIsOrganizationSelectionOpen(true);
                }
              }}
            >
              <BuildingIcon theme={theme} />
            </IconButton>
            <div className="selected-organization">{selectedOrganization}</div>
          </div>
          <BrandSwitcher onBrandChange={handleBrandChange} />
          <ColorModeToggle />
        </Toolbar>
      </AppBar>
      <LoginPage />
      <OrganizationSelectionDialog
        open={isOrganizationSelectionOpen}
        onClose={() => setIsOrganizationSelectionOpen(false)}
        onOrganizationConnect={(payload: any) => {
          setSelectedOrganization(payload.brand);
          dispatch(payload);
        }}
      />
    </ThemeProvider>
  );
};

export default App;
