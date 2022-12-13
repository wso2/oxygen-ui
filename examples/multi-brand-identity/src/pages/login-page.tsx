import {Grid, SignIn, useTheme, useColorScheme} from '@oxygen-ui/react';
import React, {ReactElement} from 'react';

const LoginPage = (): ReactElement => {
  const theme = useTheme();
  const {mode} = useColorScheme();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: '100vh'}}
    >
      <SignIn
        logoUrl={
          mode === 'light'
            ? (theme.colorSchemes?.light as any).brand?.logo?.main
            : (theme.colorSchemes?.dark as any).brand?.logo?.main
        }
        signUpUrl="#"
      />
    </Grid>
  );
};

export default LoginPage;
