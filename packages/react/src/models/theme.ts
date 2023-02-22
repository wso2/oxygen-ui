/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {CssVarsTheme, Theme as MuiTheme} from '@mui/material/styles';
import {CSSProperties} from 'react';

/**
 * Augment the Theme interface with the custom properties for the existing keys.
 */
declare module '@mui/material/styles' {
  interface PaletteOptions {
    customComponents: {
      Footer: {
        background: string;
      };
      Navbar: {
        background: string;
      };
    };
    gradients: {
      primary: {
        stop1: string;
        stop2: string;
      };
    };
  }
  interface Palette {
    customComponents: {
      Footer: {
        background: string;
      };
      Navbar: {
        background: string;
      };
    };
    gradients: {
      primary: {
        stop1: string;
        stop2: string;
      };
    };
  }
  interface TypographyVariants {
    body3: CSSProperties;
    body4: CSSProperties;
    body5: CSSProperties;
    display1: CSSProperties;
    display2: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: CSSProperties;
    body4?: CSSProperties;
    body5?: CSSProperties;
    display1?: CSSProperties;
    display2?: CSSProperties;
  }
}

/**
 * Augment the Typography to add the custom variants.
 */
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    body5: true;
    display1: true;
    display2: true;
  }
}

/**
 * Custom property augmentations.
 */
interface CustomTheme {
  customComponents?: {
    AppShell: {
      properties: {
        padding: CSSProperties['padding'];
      };
    };
    Header?: {
      properties?: {
        'min-height'?: string;
      };
    };
    Navbar?: {
      properties?: {
        'mini-variant-width'?: string;
        width?: string;
      };
    };
  };
}

export type Theme = Omit<MuiTheme, 'palette'> & CssVarsTheme & CustomTheme;
