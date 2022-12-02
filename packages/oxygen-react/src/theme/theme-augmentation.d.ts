import type {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material/style' {
  interface SupportedColorScheme {
    /**
     * Provides extra visual weight to identify the primary action from a set of buttons.
     */
    highContrast: true;
  }
}

// TS doesn't accept the augmented namespaces without this.
// https://github.com/mui/material-ui/issues/28244#issuecomment-1181448039
export {};
