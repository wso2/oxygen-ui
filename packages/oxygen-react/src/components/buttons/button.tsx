import { FC, ReactElement } from "react";
import clsx from "clsx";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface ButtonProps extends MuiButtonProps {}

export const Button: FC<ButtonProps> & {
  muiName: string;
} = (props: ButtonProps): ReactElement => {
    const {
        className,
        ...rest
    } = props;

    const classes: string = clsx("freya-button");

    return (
        <MuiButton className={ classes } { ...rest } />
    );
}

Button.defaultProps = {};
Button.muiName = 'Button';

export default Button;
