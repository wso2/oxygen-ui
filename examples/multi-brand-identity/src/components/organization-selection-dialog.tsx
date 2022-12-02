import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  extendTheme,
  Theme,
} from '@oxygen/react';
import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {BrandingActions} from '../branding';

interface OrganizationSelectionDialogProps {
  onClose: () => void;
  onOrganizationConnect: (action: {brand: string | undefined; theme: Theme; type: BrandingActions}) => void;
  open: boolean;
}

export const OrganizationSelectionDialog: FC<OrganizationSelectionDialogProps> = (
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
      .then(response => response.json())
      .then(response => {
        // document.documentElement.style.setProperty(
        //   '--oxygen-palette-primary-main',
        //   response?.preference?.theme?.LIGHT?.colors?.primary,
        // );

        const theme = extendTheme({
          colorSchemes: {
            dark: {
              brand: {
                logo: {
                  main: response?.preference?.theme?.DARK?.images?.logo?.imgURL,
                },
              },
              palette: {
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
          variant="primary"
          onClick={handleOrganizationConnect}
        >
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
};
