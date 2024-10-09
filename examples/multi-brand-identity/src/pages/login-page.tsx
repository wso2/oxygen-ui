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

import {Grid, SignIn, useTheme, useColorScheme, Theme} from '@oxygen-ui/react';
import {ReactElement} from 'react';

export const LoginPage = (): ReactElement => {
  const theme: Theme = useTheme();
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
