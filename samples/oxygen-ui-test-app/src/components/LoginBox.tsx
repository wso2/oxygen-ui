/**
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com).
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

import { useState, type JSX } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography
} from '@wso2/oxygen-ui';
import { Eye, EyeOff, GitHub, Google } from '@wso2/oxygen-ui-icons-react'
import {useNavigate} from 'react-router';

export default function LoginBox(): JSX.Element {
  const [error] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/organizations');
  };

  return (
    <form onSubmit={handleLogin}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Login to Account
        </Typography>

        <Typography>
          Don&apos;t have an account <Link href="">Sign up!</Link>
        </Typography>
      </Box>

      { error &&
        <Alert severity="warning" sx={{ my: 2 }}>
          You are about to access a non-secure site. Proceed with caution!
        </Alert>
      }
          
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

      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" gap={0.5}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={0.5}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  )
}
