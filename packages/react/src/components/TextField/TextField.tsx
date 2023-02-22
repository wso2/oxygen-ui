/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import {DoubleCircleIcon, VisibilityIcon, VisibilityOffIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {FC, MouseEvent, ReactElement, ReactNode, useState} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import IconButton from '../IconButton';
import InputLabel from '../InputLabel';
import List from '../List';
import ListItem from '../ListItem';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import Tooltip from '../Tooltip';
import './text-field.scss';

export type TextFieldProps = {
  /**
   * Criteria for user input.
   */
  criteria?: string[];
} & MuiTextFieldProps;

const COMPONENT_NAME: string = 'TextField';

const TextField: FC<TextFieldProps> & WithWrapperProps = (props: TextFieldProps): ReactElement => {
  const {className, criteria, InputLabelProps, id, label, type, ...rest} = props;

  const classes: string = clsx('oxygen-text-field', className);

  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (): void => {
    if (type === 'password' && criteria?.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = (): void => {
    if (open) {
      setOpen(false);
    }
  };

  const handleClickShowPassword = (): void => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const tooltipContent = (): ReactNode => (
    <List>
      {criteria?.map((criterion: string) => (
        <ListItem disablePadding>
          <ListItemIcon>
            <DoubleCircleIcon />
          </ListItemIcon>
          <ListItemText primary={criterion} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div className={classes}>
      <InputLabel htmlFor={id} aria-describedby={id} {...InputLabelProps}>
        {label}
      </InputLabel>
      <Tooltip
        arrow
        placement="right-end"
        describeChild
        open={open}
        title={tooltipContent()}
        classes={{arrow: 'oxygen-text-field-tooltip-arrow', tooltip: 'oxygen-text-field-tooltip'}}
      >
        <MuiTextField
          id={id}
          type={type === 'password' && (showPassword ? 'text' : 'password')}
          InputProps={
            type === 'password' && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }
          onClick={handleClick}
          onBlurCapture={handleClose}
          onFocus={handleClick}
          {...rest}
        />
      </Tooltip>
    </div>
  );
};

TextField.displayName = composeComponentDisplayName(COMPONENT_NAME);
TextField.muiName = COMPONENT_NAME;
TextField.defaultProps = {};

export default TextField;
