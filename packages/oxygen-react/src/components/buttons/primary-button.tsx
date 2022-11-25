import { FC, ReactElement } from "react";
import clsx from "clsx";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface PrimaryButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {}

export const PrimaryButton: FC<PrimaryButtonProps> & {
  muiName: string;
} = (props: PrimaryButtonProps): ReactElement => {
    const {
        className,
        ...rest
    } = props;

    const classes: string = clsx("freya-button");

    return (
        <MuiButton variant="contained" color="primary" className={ classes } { ...rest } />
    );
}

PrimaryButton.defaultProps = {};
PrimaryButton.muiName = 'Button';

export default PrimaryButton;
