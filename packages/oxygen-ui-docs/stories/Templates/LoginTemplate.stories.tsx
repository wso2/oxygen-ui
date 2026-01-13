/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Divider,
  Alert,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  Link,
  Checkbox,
  styled,
  Paper,
  ColorSchemeImage,
  ParticleBackground,
} from '@wso2/oxygen-ui';
import {Cloud, GitHub, Google, ShieldCheck, TerminalSquare, Zap} from '@wso2/oxygen-ui-icons-react';
import {error} from 'console';
import React, {JSX} from 'react';

const meta: Meta = {
  title: 'Templates/Login',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const StyledPaper = styled(Paper)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('sm')]: {
    width: '85%',
  },
}));

const items: {
  icon: JSX.Element;
  title: string;
  description: string;
}[] = [
  {
    icon: <Cloud className="text-muted-foreground" />,
    title: 'Flexible Identity Platform',
    description: 'Centralizes identity management for both on-prem and cloud environments—no protocol lock-in.',
  },
  {
    icon: <ShieldCheck className="text-muted-foreground" />,
    title: 'Zero-trust Security',
    description: 'Leverage adaptive authentication, OIDC, and OAuth 2.0 to protect every login and session.',
  },
  {
    icon: <TerminalSquare className="text-muted-foreground" />,
    title: 'Developer-first Experience',
    description: 'Configure auth flows and manage organizations with powerful SDKs and APIs.',
  },
  {
    icon: <Zap className="text-muted-foreground" />,
    title: 'Extensible & Enterprise-ready',
    description: 'Built for scale, integrates with your stack and CI/CD pipelines, and ready for any cloud.',
  },
];

const hasError = false;

export const Default: Story = {
  render: () => (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <ParticleBackground opacity={0.5} />
      <Grid container sx={{ flex: 1 }}>
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
            textAlign: 'left',
            position: 'relative',
          }}
        >
          <Box>
            <Stack
              direction="column"
              alignItems="start"
              gap={5}
              maxWidth={580}
              display={{xs: 'none', md: 'flex'}}
            >
              <ColorSchemeImage
                src={{
                  light: `oxygen-ui-react-logo.svg`,
                  dark: `oxygen-ui-react-logo-inverted.svg`,
                }}
                alt={{light: 'Logo (Light)', dark: 'Logo (Dark)'}}
                height={50}
                width="auto"
              />
              <Stack sx={{flexDirection: 'column', alignSelf: 'center', gap: 4}}>
                {items.map((item) => (
                  <Stack key={item.title} direction="row" sx={{gap: 2}}>
                    {item.icon}
                    <div>
                      <Typography gutterBottom sx={{fontWeight: 'medium'}}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {item.description}
                      </Typography>
                    </div>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <StyledPaper>
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                width: '100%',
                maxWidth: 500,
                margin: 'auto'
            }}>
              <form method="POST" action="">
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h3" gutterBottom>
                    Login to Account
                  </Typography>

                  <Typography>
                    Don&apos;t have an account <Link href="">Sign up!</Link>
                  </Typography>
                </Box>
                    
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Google />}
                    color="secondary"
                    sx={{ my: 1 }}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GitHub />}
                    color="secondary"
                    sx={{ my: 1 }}
                  >
                    Continue with GitHub
                  </Button>
                </Box>

                <Divider sx={{ my: 3 }}>or</Divider>

                { hasError &&
                  <Alert severity="error" sx={{ my: 2 }}>
                    You have entered either a wrong username or password!
                  </Alert>
                }

                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      size="small"
                      required
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      size="small"
                      required
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox name="remember-me-checkbox" />}
                      label="Remember me"
                    />
                    <Link href="">Forgot your password?</Link>
                  </Box>

                  <input type="hidden" id="sessionDataKey" name="sessionDataKey" value="" />
                  <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                    Sign In
                  </Button>
                </Box>
              </form>
              <Box component="footer" sx={{ mt: 4 }}>
                <Typography sx={{ textAlign: 'center' }}>
                  © Copyright {new Date().getFullYear()}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  sx={{ mt: 2 }}
                  spacing={1}
                >
                  <Link>Privacy Policy</Link>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <Link>Terms of Use</Link>
                </Stack>
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  ),
};
