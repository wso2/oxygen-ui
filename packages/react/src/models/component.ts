export type WithWrapperProps = MuiWrapperProps;

export interface MuiWrapperProps {
  /**
   * Component name with `Mui` prefix.
   * To provide maximum flexibility and performance, MUI needs a way to know the nature
   * of the child elements a component receives.
   * @see {@link https://mui.com/material-ui/guides/composition/#wrapping-components}
   */
  muiName: string;
}
