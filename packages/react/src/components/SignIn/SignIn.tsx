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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import type {BoxTypeMap, BoxProps} from '../Box';
import Box from '../Box';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Divider from '../Divider';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../FormGroup';
import Grid from '../Grid';
import Link from '../Link';
import Paper from '../Paper';
import TextField from '../TextField';
import Typography from '../Typography';
import './sign-in.scss';

export type SignInProps<C extends ElementType = ElementType> = BoxProps<C> & {
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
};

/**
 * The Sign In component is a custom component that is used to render a sign-in form.
 *
 * Demos:
 *
 * - [Sign In (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/patterns-sign-in--overview)
 *
 * API:
 *
 * - inherits [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the SignIn component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered SignIn component.
 */
const SignIn: OverridableComponent<BoxTypeMap<SignInProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, signUpUrl, logoUrl, signInOptions, ...rest}: SignInProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => (
    <Box
      ref={ref}
      className={clsx(
        /* @deprecated Use the PascalCase classname instead. https://github.com/wso2/oxygen-ui/issues/274 */
        'oxygen-sign-in',
        'OxygenSignIn-root',
        className,
      )}
      {...rest}
    >
      {logoUrl && <Box className="OxygenSignIn-logo oxygen-sign-in-logo" component="img" src={logoUrl} />}
      <Paper className="OxygenSignIn-box oxygen-sign-in-box" elevation={0} variant="outlined">
        <Typography align="center" className="OxygenSignIn-header oxygen-sign-in-header" variant="h5">
          Sign in
        </Typography>
        <Box
          className="OxygenSignIn-form oxygen-sign-in-form"
          component="form"
          onSubmit={(): void => null}
          noValidate
          sx={{mt: 1}}
        >
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
          <Button
            color="primary"
            variant="contained"
            className="OxygenSignIn-cta oxygen-sign-in-cta"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
          {signInOptions && (
            <div className="OxygenSignIn-optionsWrapper oxygen-sign-in-options-wrapper">
              <Divider>OR</Divider>
              <div className="OxygenSignIn-options oxygen-sign-in-options">{signInOptions}</div>
            </div>
          )}
          {signUpUrl && (
            <Grid container className="OxygenSignIn-signUpLink oxygen-sign-in-sign-up-link">
              <Grid>Don&apos;t have an account?</Grid>
              <Grid>
                <Link href={signUpUrl} className="OxygenSignIn-signUpLinkAction oxygen-sign-in-sign-up-link-action">
                  Sign up
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  ),
) as OverridableComponent<BoxTypeMap<SignInProps>>;

export default SignIn;
