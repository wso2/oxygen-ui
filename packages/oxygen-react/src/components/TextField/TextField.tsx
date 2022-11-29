import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import {InputLabel} from '@mui/material';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export type TextFieldProps = MuiTextFieldProps;

const COMPONENT_NAME: string = 'TextField';

export const TextField: FC<TextFieldProps> & WithWrapperProps = (props: TextFieldProps): ReactElement => {
  const {className, label, InputLabelProps, id, ...rest} = props;

  const classes: string = clsx('oxygen-text-field', className);

  return (
    <div className={classes}>
      <InputLabel htmlFor="id" shrink className="oxygen-text-field__label" {...InputLabelProps}>
        {label}
      </InputLabel>
      <MuiTextField className="oxygen-text-field__input" id={id} {...rest} />
    </div>
  );
};

TextField.displayName = composeComponentDisplayName(COMPONENT_NAME);
TextField.muiName = COMPONENT_NAME;
TextField.defaultProps = {};

export default TextField;
