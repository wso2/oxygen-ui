declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    /**
     * Provides extra visual weight to identify the primary action from a set of buttons.
     */
    primary: true;
    /**
     * Any actions that are less important.
     */
    secondary: true;
  }
}

// TS doesn't accept the augmented namespaces without this.
// https://github.com/mui/material-ui/issues/28244#issuecomment-1181448039
export {};
