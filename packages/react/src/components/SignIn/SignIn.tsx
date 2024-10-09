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

import {Box, FormGroup, FormControlLabel, Typography, Grid, BoxProps, Paper, Checkbox} from '@mui/material';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {MuiWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Button from '../Button';
import Divider from '../Divider';
import Link from '../Link';
import TextField from '../TextField';
import './sign-in.scss';

export interface SignInProps extends BoxProps {
  /**
   * URL for the login box logo.
   */
  logoUrl?: string;
  /**
   * Different Sign In Options.
   */
  signInOptions?: ReactElement;
  /**
   * URL for the sign up.
   */
  signUpUrl?: string;
}

const COMPONENT_NAME: string = 'SignIn';

const SignIn: FC<SignInProps> & MuiWrapperProps = ({
  className,
  signUpUrl,
  logoUrl,
  signInOptions,
  ...rest
}: SignInProps): ReactElement => {
  const classes: string = clsx('oxygen-sign-in', className);

  return (
    <Box className={classes} {...rest}>
      {logoUrl && <Box className="oxygen-sign-in-logo" component="img" src={logoUrl} />}
      <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
        <Typography align="center" className="oxygen-sign-in-header" variant="h5">
          Sign in
        </Typography>
        <Box className="oxygen-sign-in-form" component="form" onSubmit={(): void => null} noValidate sx={{mt: 1}}>
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
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me on this computer" />
          </FormGroup>
          <Button color="primary" variant="contained" className="oxygen-sign-in-cta" type="submit" fullWidth>
            Sign In
          </Button>
          {signInOptions && (
            <div className="oxygen-sign-in-options-wrapper">
              <Divider>OR</Divider>
              <div className="oxygen-sign-in-options">{signInOptions}</div>
            </div>
          )}
          {signUpUrl && (
            <Grid container className="oxygen-sign-in-sign-up-link">
              <Grid item>Don&apos;t have an account?</Grid>
              <Grid item>
                <Link href={signUpUrl} className="oxygen-sign-in-sign-up-link-action">
                  Sign up
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

SignIn.displayName = composeComponentDisplayName(COMPONENT_NAME);
SignIn.muiName = 'SignIn';

export default SignIn;
