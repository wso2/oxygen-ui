/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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

import { extendTheme, keyframes, type Theme, type Shadows } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ChevronDown, X } from '@wso2/oxygen-ui-icons-react';
import React from 'react';
import { pxToRem } from '../utils';

// Define custom theme properties interface
interface CustomThemeProperties {
  blur: {
    light: string;
    medium: string;
    heavy: string;
  };
  border: {
    width: string;
    style: string;
  };
  gradient: {
    primary: string;
  };
  paperTransparent: {
    light: string;
    dark: string;
  };
  syntax: {
    light: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      function: string;
      number: string;
      operator: string;
    };
    dark: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      function: string;
      number: string;
      operator: string;
    };
  };
}

// Extend MUI Theme to include custom properties
declare module '@mui/material/styles' {
  interface Theme extends CustomThemeProperties {}

  interface Palette {
    /**
     * A categorical blue, for marking one kind of thing apart from another (a tag, a legend, a status
     * that is neither good nor bad). Use it for text, outlines and light tints, not for solid fills.
     */
    blue: Palette['primary'];
    /**
     * A violet-to-blue gradient for the `gradient` Button color, used to set apart AI features such as
     * an assistant. `start` and `end` are the gradient stops; `main` is a solid midpoint for anything
     * that needs a single color, such as an icon.
     */
    gradient: Palette['primary'] & { start: string; end: string };
  }
  interface PaletteOptions {
    blue?: PaletteOptions['primary'];
    gradient?: PaletteOptions['primary'] & { start?: string; end?: string };
  }
  
  interface ThemeOptions extends Partial<CustomThemeProperties> {}
  
  interface ThemeVars extends CustomThemeProperties {}
}

// Add a `light` Avatar variant (tinted background, colored content) and a `color` prop to pick its color
declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    light: true;
  }
  interface AvatarOwnProps {
    /**
     * Color of the `light` variant.
     * @default 'primary'
     */
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'blue';
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    blue: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gradient: true;
  }
}

export interface OxygenTheme extends Theme {
  vars: NonNullable<Theme['vars']>;
}

const OxygenUIPrimitives = {
  fontSize: 14,
  primaryColor: '#ff7300',
  secondaryColor: '#757575',
};

/** Class the Oxygen `Button` adds for `animated`; the theme animates gradient buttons that carry it. */
export const GRADIENT_ANIMATED_CLASS = 'OxygenButton-animated';

/** Registered custom property the circling outline rotates through (see the Oxygen `Button`). */
export const GRADIENT_ANGLE_PROPERTY = '--oxygen-gradient-angle';

const gradientCircle = keyframes`
  to { ${GRADIENT_ANGLE_PROPERTY}: 360deg; }
`;

const gradientFlow = keyframes`
  to { background-position: 200% 0; }
`;

/** Start, end and start again, so a fill or label shifted by its own width loops without a seam. */
const gradientLoop = (theme: Theme) => {
  const { start, end } = (theme.vars || theme).palette.gradient;
  return `linear-gradient(90deg, ${start}, ${end}, ${start})`;
};

const flowing = (theme: Theme) => ({
  [`&.${GRADIENT_ANIMATED_CLASS}`]: {
    backgroundImage: gradientLoop(theme),
    backgroundSize: '200% 100%',
    animation: `${gradientFlow} 4s linear infinite`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    [`&.${GRADIENT_ANIMATED_CLASS}`]: { animation: 'none' },
  },
});

const gradientFill = (theme: Theme) => {
  const { start, end } = (theme.vars || theme).palette.gradient;
  return `linear-gradient(90deg, ${start}, ${end})`;
};

/**
 * Styles for the `gradient` Button color, in every variant:
 * - `contained` - the gradient as the fill
 * - `outlined`  - a gradient outline around a transparent fill, as for an AI assistant entry point
 * - `text`      - gradient label text
 *
 * The outline is drawn by a masked pseudo-element rather than `border-image`, which cannot follow the
 * pill radius, so the fill stays transparent on any surface. Icons take the solid `main` color, since
 * an SVG stroke cannot take a CSS gradient. Exported so themes that define their own Button variants
 * can keep these.
 */
export const gradientButtonVariants = [
  {
    props: { variant: 'contained' as const, color: 'gradient' as const },
    style: ({ theme }: { theme: Theme }) => ({
      backgroundImage: gradientFill(theme),
      color: (theme.vars || theme).palette.gradient.contrastText,
      '&:hover, &.Mui-focusVisible, &:active': {
        backgroundImage: gradientFill(theme),
        color: (theme.vars || theme).palette.gradient.contrastText,
        filter: 'brightness(1.08)',
      },
      ...flowing(theme),
      [`&.Mui-disabled, &.Mui-disabled.${GRADIENT_ANIMATED_CLASS}`]: {
        backgroundImage: 'none',
        filter: 'none',
        animation: 'none',
      },
    }),
  },
  {
    props: { variant: 'outlined' as const, color: 'gradient' as const },
    style: ({ theme }: { theme: Theme }) => ({
      position: 'relative' as const,
      // Keeps the outlined button's 1px border box so sizes match the other outlined buttons
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      color: (theme.vars || theme).palette.text.primary,
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        // Sits exactly over the transparent 1px border, so the outline matches the other outlined buttons
        inset: -1,
        borderRadius: 'inherit',
        padding: 1,
        background: gradientFill(theme),
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none' as const,
      },
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        color: (theme.vars || theme).palette.gradient.main,
      },
      '&:hover, &.Mui-focusVisible, &:active': {
        borderColor: 'transparent',
        color: (theme.vars || theme).palette.text.primary,
        backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.gradient.main} 12%, transparent)`,
      },
      // `animated`: the gradient circles the outline
      [`&.${GRADIENT_ANIMATED_CLASS}::before`]: {
        background: `conic-gradient(from var(${GRADIENT_ANGLE_PROPERTY}), ${(theme.vars || theme).palette.gradient.start}, ${(theme.vars || theme).palette.gradient.end}, ${(theme.vars || theme).palette.gradient.start})`,
        animation: `${gradientCircle} 4s linear infinite`,
      },
      '@media (prefers-reduced-motion: reduce)': {
        [`&.${GRADIENT_ANIMATED_CLASS}::before`]: { animation: 'none' },
      },
      '&.Mui-disabled::before': {
        opacity: 0.4,
        animation: 'none',
      },
    }),
  },
  {
    props: { variant: 'text' as const, color: 'gradient' as const },
    style: ({ theme }: { theme: Theme }) => ({
      color: (theme.vars || theme).palette.gradient.main,
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        color: (theme.vars || theme).palette.gradient.main,
      },
      // The label itself takes the gradient; the icons keep the solid color above
      '@supports (background-clip: text)': {
        backgroundImage: gradientFill(theme),
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        // `animated`: the gradient flows across the label
        ...flowing(theme),
      },
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'transparent',
        filter: 'brightness(1.15)',
      },
      [`&.Mui-disabled, &.Mui-disabled.${GRADIENT_ANIMATED_CLASS}`]: {
        backgroundImage: 'none',
        WebkitTextFillColor: 'currentColor',
        filter: 'none',
        animation: 'none',
      },
    }),
  },
];

const OxygenThemeBase = extendTheme({
  cssVarPrefix: 'oxygen',
  colorSchemeSelector: 'data-color-scheme',
  typography: {
    fontFamily: "'Inter Variable', sans-serif",
    fontWeightRegular: 400,
    fontSize: OxygenUIPrimitives.fontSize,
    h1: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize + 14),
      fontWeight: 400,
    },
    h2: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize + 10),
      fontWeight: 400,
    },
    h3: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize + 8),
      fontWeight: 400,
    },
    h4: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize + 6),
      fontWeight: 400,
    },
    h5: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize + 2),
      fontWeight: 400,
    },
    h6: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize),
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize + 4),
    },
    subtitle2: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize),
      fontWeight: 400,
    },
    body1: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize),
    },
    body2: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize - 1), // Will use by the labels in the components
      fontWeight: 400,
    },
    button: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize),
      fontWeight: 500,
    },
    caption: {
      fontSize: pxToRem(OxygenUIPrimitives.fontSize - 3),
      fontWeight: 400,
    },
  },
  shadows: Array(25).fill('none') as Shadows,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: OxygenUIPrimitives.primaryColor,
          contrastText: '#ffffff',
        },
        secondary: {
          main: OxygenUIPrimitives.secondaryColor,
          contrastText: '#ffffff',
        },
        // Cobalt: 6.1:1 as text on white
        blue: {
          main: '#1F4FFF',
          contrastText: '#ffffff',
        },
        // Deeper stops on light surfaces, so the outline and gradient text stay legible on white
        gradient: {
          main: '#5B4FF0',
          start: '#7C3AED',
          end: '#2563EB',
          contrastText: '#ffffff',
        },
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: OxygenUIPrimitives.primaryColor,
          contrastText: '#ffffff',
        },
        secondary: {
          main: OxygenUIPrimitives.secondaryColor,
          contrastText: '#ffffff',
        },
        // Azure: Cobalt is too dark to read on dark surfaces
        blue: {
          main: '#3D8BFF',
          contrastText: '#0B1633',
        },
        // Lighter stops on dark surfaces
        gradient: {
          main: '#8B9CFB',
          start: '#A78BFA',
          end: '#60A5FA',
          contrastText: '#0B1633',
        },
        background: {
          default: '#121212',
          paper: '#121212',
        },
      },
    },
  },
  components: {
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: React.createElement(ChevronDown),
      },
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: theme.typography.fontWeightMedium,
          '& .MuiTypography-root': {
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&:hover:not(.Mui-disabled)': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
            cursor: 'pointer',
          },
        }),
      },
    },
    MuiAvatar: {
      variants: [
        // `light`: a tinted background (12% of the color) with the color itself for the icon.
        // Shape is circular, as the variant replaces `circular`/`rounded`/`square`.
        {
          props: { variant: 'light' },
          style: ({ theme }) => ({
            borderRadius: '50%',
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary.main} 12%, transparent)`,
            color: (theme.vars || theme).palette.primary.main,
          }),
        },
        ...(['primary', 'secondary', 'success', 'error', 'info', 'warning', 'blue'] as const).map(color => ({
          props: { variant: 'light' as const, color },
          style: ({ theme }: { theme: Theme }) => ({
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette[color].main} 12%, transparent)`,
            color: (theme.vars || theme).palette[color].main,
          }),
        })),
      ],
    },
    MuiButton: {
      variants: gradientButtonVariants,
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        // Only the current (last) level is highlighted; parent levels are muted.
        li: ({ theme }) => ({
          color: (theme.vars || theme).palette.text.secondary,
          '&:last-child': {
            color: (theme.vars || theme).palette.text.primary,
            fontWeight: theme.typography.fontWeightBold,
          },
          // Some themes (e.g. Acrylic) use nearly identical primary and secondary
          // text colors, so dim the parents further. Dark mode only: in light mode
          // any opacity drops parent links below the 4.5:1 contrast minimum.
          ...theme.applyStyles('dark', {
            '&:not(:last-child)': {
              opacity: 0.7,
            },
          }),
        }),
        separator: ({ theme }) => ({
          color: (theme.vars || theme).palette.text.disabled,
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Honor the user's OS-level reduced-motion preference (WCAG 2.3.3):
        // collapse all CSS animations/transitions to near-instant.
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: React.createElement(ChevronDown),
        clearIcon: React.createElement(X),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        // Required marker. Red signals "required" faster than grey, but the "*" glyph
        // carries the meaning, so color is not the only cue (WCAG 1.4.1). Dark mode
        // uses error.light because error.main often drops below 4.5:1 on dark surfaces.
        // `&.Mui-error` matches MUI's error rule so the dark color also holds in error state;
        // the disabled rule comes last so a disabled field's marker is muted like its label.
        asterisk: ({ theme }) => ({
          color: (theme.vars || theme).palette.error.main,
          ...theme.applyStyles('dark', {
            '&, &.Mui-error': {
              color: (theme.vars || theme).palette.error.light,
            },
          }),
          '.Mui-disabled > &': {
            color: (theme.vars || theme).palette.text.disabled,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '.MuiFormControl-root:has(.MuiSelect-select) &:not(.MuiInputLabel-shrink)': {
            top: '-7px',
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        IconComponent: ChevronDown
      },
      styleOverrides: {
        icon: {
          top: '50%',
          transform: 'translateY(-50%)',
          marginTop: 0,
        },
        select: {
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '&.MuiTabs-vertical': {
            alignItems: 'flex-start',
          },
        },
        flexContainer: {
          '&.MuiTabs-flexContainerVertical': {
            alignItems: 'flex-start',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: { theme: OxygenTheme }) => ({
          textTransform: 'none',
          fontWeight: 400,
          fontSize: theme.typography.body1.fontSize,
          '&.MuiTab-root': {
            minHeight: 48,
            padding: '8px 16px',
          },
          '.MuiTabs-vertical &': {
            width: '100%',
            minHeight: 40,
            padding: '8px 16px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'left',
          },
        }),
      },
    },
  },
});

// Add custom properties to the theme and theme.vars
const customProperties = {
  blur: {
    light: 'blur(3px)',
    medium: 'blur(10px)',
    heavy: 'blur(20px)',
  },
  border: {
    width: '1px',
    style: 'solid',
  },
  gradient: {
    primary: 'linear-gradient(90deg, #F47B20 0%, #EF4223 100%)',
  },
  syntax: {
    light: {
      background: '#f5f5f5',
      text: '#24292e',
      // Darkened from GitHub-light defaults to meet WCAG AA 4.5:1 contrast on #f5f5f5
      comment: '#57606a',
      keyword: '#cf222e',
      string: '#032f62',
      function: '#6f42c1',
      number: '#005cc5',
      operator: '#cf222e',
    },
    dark: {
      background: '#1e1e1e',
      text: '#d4d4d4',
      comment: '#6a9955',
      keyword: '#569cd6',
      string: '#ce9178',
      function: '#dcdcaa',
      number: '#b5cea8',
      operator: '#d4d4d4',
    },
  },
};

Object.assign(OxygenThemeBase, customProperties);

// Ensure vars object exists before assigning
if (OxygenThemeBase.vars) {
  Object.assign(OxygenThemeBase.vars, customProperties);
}

export default OxygenThemeBase as OxygenTheme;
