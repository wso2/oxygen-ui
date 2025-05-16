/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

import {
  extendTheme,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Theme} from '@oxygen-ui/react';
import {ChangeEvent, FC, ReactElement, useState} from 'react';
import {BrandingActions} from '../branding/store/branding-reducer';

export interface OrganizationSelectionDialogProps {
  onClose: () => void;
  onOrganizationConnect: (action: {brand: string | undefined; theme: Theme; type: BrandingActions}) => void;
  open: boolean;
}

const OrganizationSelectionDialog: FC<OrganizationSelectionDialogProps> = (
  props: OrganizationSelectionDialogProps,
): ReactElement => {
  const {open, onClose, onOrganizationConnect} = props;

  const [connectedOrganization, setConnectedOrganization] = useState<string>();
  const [isOrganizationBrandingFetchRequestLoading, setIsOrganizationBrandingFetchRequestLoading] = useState<boolean>();

  const handleOrganizationNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConnectedOrganization(e.target?.value);
  };

  const handleOrganizationConnect = (): void => {
    setIsOrganizationBrandingFetchRequestLoading(true);

    fetch(
      `https://api.asgardeo.io/t/${connectedOrganization}/api/server/v1/branding-preference?locale=en-US&name=${connectedOrganization}&type=ORG`,
    )
      .then((response: Response) => response.json())
      .then((response: Record<string, any>) => {
        // document.documentElement.style.setProperty(
        //   '--oxygen-palette-primary-main',
        //   response?.preference?.theme?.LIGHT?.colors?.primary,
        // );

        const theme: Theme = extendTheme({
          colorSchemes: {
            dark: {
              brand: {
                logo: {
                  main: response?.preference?.theme?.DARK?.images?.logo?.imgURL,
                },
              },
              palette: {
                background: {
                  default: response?.preference?.theme?.DARK?.page?.background?.backgroundColor,
                },
                primary: {
                  main: response?.preference?.theme?.DARK?.colors?.primary,
                },
              },
            },
            light: {
              brand: {
                logo: {
                  main: response?.preference?.theme?.LIGHT?.images?.logo?.imgURL,
                },
              },
              palette: {
                background: {
                  default: response?.preference?.theme?.LIGHT?.page?.background?.backgroundColor,
                },
                primary: {
                  main: response?.preference?.theme?.LIGHT?.colors?.primary,
                },
              },
            },
          },
          shape: {
            borderRadius: response?.preference?.theme?.LIGHT?.buttons?.primary?.base?.border?.borderRadius,
          },
          typography: {
            fontFamily: response?.preference?.theme?.LIGHT?.typography?.font?.fontFamily,
          },
        });

        onOrganizationConnect({
          brand: connectedOrganization,
          theme,
          type: BrandingActions.ChangeTheme,
        });
        onClose();
      })
      .catch(() => {
        // TODO: Handle error
      })
      .finally(() => setIsOrganizationBrandingFetchRequestLoading(false));
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{paper: 'organization-selection-dialog'}} maxWidth="xs">
      <DialogTitle className="organization-selection-dialog-title">
        <img
          className="provider-logo"
          src={`${process.env.PUBLIC_URL}/assets/brands/asgardeo/images/asgardeo-mini-logo.svg`}
          alt="asgardeo-logo"
        />
        Connect with Asgardeo Branding
      </DialogTitle>
      <DialogContent className="organization-selection-dialog-content">
        <DialogContentText className="organization-selection-dialog-description">
          Integrate with the Asgardeo Branding to easily configure the theme tokens on the Asgardeo Console.
        </DialogContentText>
        <Alert className="organization-selection-dialog-alert" severity="warning">
          For this feature to work properly, you need to allow {window.location.origin} as an `allowed origin` on your
          Asgardeo organization.
        </Alert>
        <Alert className="organization-selection-dialog-alert" severity="info">
          For testing purposes, you can use the following organizations.
          <ul>
            <li>drogo</li>
            <li>kfone</li>
          </ul>
        </Alert>
        <TextField
          required
          fullWidth
          id="orgaization-name"
          label="Organization Name"
          name="text"
          placeholder="Enter your Asgardeo organization name"
          value={connectedOrganization}
          onChange={handleOrganizationNameChange}
          autoFocus
        />
      </DialogContent>
      <DialogActions className="organization-selection-dialog-actions">
        <Button
          fullWidth
          loading={isOrganizationBrandingFetchRequestLoading}
          color="primary"
          variant="contained"
          onClick={handleOrganizationConnect}
        >
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrganizationSelectionDialog;
