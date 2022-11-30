import {Grid, SignIn} from '@oxygen/react';
import React, {ReactElement} from 'react';

const LoginPage = (): ReactElement => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{minHeight: '100vh'}}
  >
    <SignIn logoUrl="/assets/images/choreo-logo.svg" signUpUrl="#" />
  </Grid>
);

export default LoginPage;
