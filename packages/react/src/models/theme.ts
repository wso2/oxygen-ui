/**
 * Copyright (c) 2023-2024, WSO2 LLC. (https://www.wso2.com).
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
      AppShell: {
        Main: {
          background: string;
        };
        MainWrapper: {
          background: string;
        };
      };
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
      AppShell: {
        Main: {
          background: string;
        };
        MainWrapper: {
          background: string;
        };
      };
      Code: {
        background: string;
      };
      Footer: {
        background: string;
      };
      Navbar: {
        background: string;
        collapsibleItemBackground: string;
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
        mainBorderTopLeftRadius: string;
        navBarTopPosition: string;
        padding: CSSProperties['padding'];
      };
    };
    Chip?: {
      properties?: {
        'background-clip'?: string;
        'beta-background'?: string;
        'beta-border-color'?: string;
        'beta-text-color'?: string;
        border?: string;
        'border-radius'?: string;
        'coming-soon-background'?: string;
        'coming-soon-border-color'?: string;
        'coming-soon-text-color'?: string;
        'default-background'?: string;
        'default-border-color'?: string;
        'default-text-color'?: string;
        'experimental-background'?: string;
        'experimental-border-color'?: string;
        'experimental-text-color'?: string;
        'font-weight'?: string;
        'icon-stroke-width'?: string;
        'line-height'?: string;
        'new-background'?: string;
        'new-border-color'?: string;
        'new-text-color'?: string;
        'premium-background'?: string;
        'premium-border-color'?: string;
        'premium-text-color'?: string;
        'text-fill-color'?: string;
        'text-transform'?: string;
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
    Stepper?: {
      properties?: Record<string, string>;
    };
  };
}

export type Theme = Omit<MuiTheme, 'palette'> & CssVarsTheme & CustomTheme;
