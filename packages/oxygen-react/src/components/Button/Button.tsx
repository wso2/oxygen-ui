/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiButton, {LoadingButtonProps as MuiButtonProps} from '@mui/lab/LoadingButton';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';


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
