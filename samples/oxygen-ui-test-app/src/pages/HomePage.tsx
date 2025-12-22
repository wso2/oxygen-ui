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

import { Badge, Box, Button, Divider, Link, Stack, Typography } from '@wso2/oxygen-ui'
import { useState, type JSX } from 'react'
import { Link as NavigateLink } from 'react-router'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import { Lightbulb, WSO2 } from '@wso2/oxygen-ui-icons-react'
import appRoutes from '../config/appRoutes'

export default function HomePage(): JSX.Element {
  const [count, setCount] = useState(0)

  return (
    <Box sx={{ textAlign: 'center', mx: 'auto', maxWidth: '1280px', p: 2 }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography variant='h1' sx={{ mb: 4 }}>Vite + React + Oxygen UI</Typography>
      <div className="card">
        <p>
          <Badge badgeContent={count} color="secondary">
            <Button variant="contained" onClick={() => setCount((count) => count + 1)}>
              Click to increase count
            </Button>
          </Badge>
          <br /><br />
        </p>
      </div>
      Run <pre><code>pnpm storybook</code></pre>
      <p className="read-the-docs">
        <Lightbulb size={18} /> Click the icon on top right corner to change color mode
      </p>

      <Box sx={{ my: 8 }}>
        <Typography sx={{ mb: 2 }}>Example layouts:</Typography>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
          alignItems="center"
        >       
          {appRoutes
            .flatMap((route) => route.children || [])
            .filter((child) => child.showInNav)
            .map((child) => (
              <Box key={child.path}>
                <Link component={NavigateLink} to={child.path as string}>
                  {child.label}
                </Link>
              </Box>
            ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 12 }} className="footer">
        <Typography variant='body2'>
          Powered by&nbsp;
          <Link href="https://github.com/wso2/oxygen-ui/tree/next" target="_blank" rel="noopener noreferrer">
            WSO2 <WSO2 size={22} style={{ verticalAlign: 'bottom' }} /> Oxygen UI
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
