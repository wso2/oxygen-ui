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

import { Box, ColorSchemeImage, Divider, Grid, Link, Paper, Stack, Typography, useThemeContent } from '@wso2/oxygen-ui'
import { type JSX } from 'react'
import LoginBox from '../components/LoginBox'
import { AppWindow, Cloud, Cog, FlaskConical, ShieldCheck, TerminalSquare, Zap } from '@wso2/oxygen-ui-icons-react';

export default function LoginPage(): JSX.Element {
  const sloganListItems: {
    icon: JSX.Element;
    title: string;
  }[] = [
    {
      icon: <Cloud className="text-muted-foreground" />,
      title: 'Flexible Identity Platform',
    },
    {
      icon: <ShieldCheck className="text-muted-foreground" />,
      title: 'Zero-trust Security',
    },
    {
      icon: <TerminalSquare className="text-muted-foreground" />,
      title: 'Developer-first Experience',
    },
    {
      icon: <Zap className="text-muted-foreground" />,
      title: 'Extensible & Enterprise-ready',
    },
  ];

  const sloganListItemsChoreo: {
    icon: JSX.Element;
    title: string;
  }[] = [
    {
      icon: <AppWindow className="text-muted-foreground" />,
      title: 'Design and develop applications',
    },
    {
      icon: <Cloud className="text-muted-foreground" />,
      title: 'Deploy and promote across environments',
    },
    {
      icon: <Cog className="text-muted-foreground" />,
      title: 'Manage application configurations',
    },
    {
      icon: <FlaskConical className="text-muted-foreground" />,
      title: 'Observe and test an application',
    },
  ];

  const Logo = useThemeContent({
    default: (
      <ColorSchemeImage
        src={{
          light: `${import.meta.env.BASE_URL}assets/images/logo.svg`,
          dark: `${import.meta.env.BASE_URL}assets/images/logo-inverted.svg`,
        }}
        alt={{light: 'Asgardeo Logo (Light)', dark: 'Asgardeo Logo (Dark)'}}
        height={30}
        width="auto"
      />),
    acrylicPurple: (
      <ColorSchemeImage
        src={{
          light: `${import.meta.env.BASE_URL}assets/images/choreo-logo.svg`,
          dark: `${import.meta.env.BASE_URL}assets/images/choreo-logo.svg`,
        }}
        alt={{light: 'Choreo Logo (Light)', dark: 'Choreo Logo (Dark)'}}
        height={40}
        width="auto"
      />)
  });

  const Slogan = useThemeContent({
    default: (
      <>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0 }}>
          Get Started with Asgardeo Identity and Access Management Solution
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          A flexible and secure identity platform for your applications
        </Typography>
        <Stack sx={{gap: 2}}>
          {sloganListItems.map((item) => (
            <Stack key={item.title} direction="row" sx={{gap: 2}}>
              {item.icon}
              <div>
                <Typography gutterBottom sx={{fontWeight: 'medium'}}>
                  {item.title}
                </Typography>
              </div>
            </Stack>
          ))}
        </Stack>
      </>),
    acrylicPurple: (
      <>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0 }}>
          Get Started with Choreo Internal Developer Platform
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          A full-fledged platform for cloud native application development
        </Typography>
        <Stack sx={{gap: 2}}>
          {sloganListItemsChoreo.map((item) => (
            <Stack key={item.title} direction="row" sx={{gap: 2}}>
              {item.icon}
              <div>
                <Typography gutterBottom sx={{fontWeight: 'medium'}}>
                  {item.title}
                </Typography>
              </div>
            </Stack>
          ))}
        </Stack>
      </>)
  });

  const BackgroundImage = useThemeContent({
    default: (
      <ColorSchemeImage
        src={{
          light: `${import.meta.env.BASE_URL}assets/images/login.svg`,
          dark: `${import.meta.env.BASE_URL}assets/images/login-inverted.svg`,
        }}
        alt={{light: 'Login Screen Image (Light)', dark: 'Login Screen Image (Dark)'}}
        height={450}
        width="auto"
        sx={{ position: 'absolute', bottom: 50, right: -100 }}
      />),
    acrylicPurple: (
      <ColorSchemeImage
        src={{
          light: `${import.meta.env.BASE_URL}assets/images/idevp-login.svg`,
          dark: `${import.meta.env.BASE_URL}assets/images/idevp-login-inverted.svg`,
        }}
        alt={{light: 'Login Screen Image (Light)', dark: 'Login Screen Image (Dark)'}}
        height={450}
        width="auto"
        sx={{ position: 'absolute', bottom: 50, right: -100 }}
      />)
  });

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Grid container sx={{ flex: 1 }}>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{
            display: 'flex',
            alignItems: 'top',
            justifyContent: 'left',
            padding: 18,
            textAlign: 'left',
            position: 'relative',
          }}
        >
          <Box>
            <Stack
              direction="column"
              alignItems="start"
              gap={2}
              maxWidth={580}
              display={{xs: 'none', md: 'flex'}}
            >
              <Box sx={{ my: 3 }}>
                {Logo}
              </Box>
              {Slogan}
            </Stack>
          </Box>
          {BackgroundImage}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              display: 'flex',
              padding: 4,
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              position: 'relative',
              textAlign: 'left',
          }}>
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                width: '100%',
                maxWidth: 500,
                margin: 'auto'
            }}>
              <LoginBox />
              <Box component="footer" sx={{ mt: 8 }}>
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
