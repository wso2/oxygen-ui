import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiButton, {LoadingButtonProps as MuiButtonProps} from '@mui/lab/LoadingButton';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import '@oxygen/styles/dist/sass/button/index.scss';

export interface ButtonProps extends MuiButtonProps {}

const COMPONENT_NAME: string = 'Button';

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

const Button: FC<ButtonProps> & WithWrapperProps = (props: ButtonProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-button', className);

  const getResolvedProps = (): Partial<ButtonProps> => {
    let {color, variant} = {...rest};

    if (variant === 'primary') {
      color = 'primary';
      variant = 'contained';
    } else if (variant === 'secondary') {
      color = 'secondary';
      variant = 'contained';
    }

    return {
      ...rest,
      color,
      variant,
    };
  };

  return <MuiButton className={classes} {...getResolvedProps()} />;
};

Button.displayName = composeComponentDisplayName(COMPONENT_NAME);
Button.muiName = COMPONENT_NAME;
Button.defaultProps = {
  disableElevation: true,
  disableRipple: true,
};

export default Button;
