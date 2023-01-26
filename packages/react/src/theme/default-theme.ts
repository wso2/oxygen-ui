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

import {experimental_extendTheme as extendTheme} from '@mui/material/styles';
import {Theme} from '../models';

const defaultTheme: Theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#FF7300',
        },
      },
    },
    light: {
      palette: {
        primary: {
          contrastText: '#fff',
          main: '#FF7300',
        },
        secondary: {
          contrastText: '#40404B',
          main: '#F7F8FB',
        },
      },
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            color: 'primary',
            variant: 'contained',
          },
          style: {
            textTransform: 'none',
          },
        },
        {
          props: {color: 'secondary', variant: 'secondary'},
          style: {
            textTransform: 'none',
          },
        },
      ],
    },
  },
  cssVarPrefix: 'oxygen',
  shape: {
    borderRadius: 8,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

export default defaultTheme;
