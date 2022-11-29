import React, {FC, ReactElement, ReactNode} from 'react';
import clsx from 'clsx';
import {Box, Typography, Grid, BoxProps, Paper} from '@mui/material';
import Link from '../Link';
import TextField from '../TextField';
import Button from '../Button';
import {composeComponentDisplayName} from '../../utils';
import {MuiWrapperProps} from '../../models';
import '@oxygen/styles/dist/sass/sign-in/index.scss';

export interface SignInProps extends BoxProps {
  /**
   * URL for the login box logo.
   */
  logoUrl: string;
  /**
   * URL for the sign up.
   */
  signUpUrl: string;
}

const COMPONENT_NAME: string = 'SignIn';

const SignIn: FC<SignInProps> & MuiWrapperProps = (props: SignInProps): ReactElement => {
  const {className, signUpUrl, logoUrl, ...rest} = props;

  const classes: string = clsx('oxygen-sign-in', className);

  return (
    <Box className={classes} {...rest}>
      <Box className="oxygen-sign-in-logo" component="img" src={logoUrl} />
      <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
        <Typography className="oxygen-sign-in-header" component="h1" variant="h6">
          Sign in
        </Typography>
        <Box className="oxygen-sign-in-form" component="form" onSubmit={() => null} noValidate sx={{mt: 1}}>
          <TextField
            required
            fullWidth
            id="name"
            label="Username"
            name="text"
            placeholder="Enter your username"
            autoFocus
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Button variant="primary" className="oxygen-sign-in-cta" type="submit" fullWidth sx={{mt: 3, mb: 2}}>
            Sign In
          </Button>
          <Grid container className="oxygen-sign-in-sign-up-link">
            <Grid item>Don&apos;t have an account?</Grid>
            <Grid item>
              <Link href={signUpUrl} className="oxygen-sign-in-sign-up-link-action">
                Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

SignIn.displayName = composeComponentDisplayName(COMPONENT_NAME);
SignIn.muiName = 'SignIn';
SignIn.defaultProps = {};

export default SignIn;
