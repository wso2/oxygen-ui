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
import {CircleDotIcon, EyeIcon, EyeSlashIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {
  forwardRef,
  ForwardRefExoticComponent,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import {TextFieldInputTypes} from './constants';
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

const PasswordField: ForwardRefExoticComponent<TextFieldProps> = forwardRef(
  ({type, ...rest}: TextFieldProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = (): void => setShowPassword((show: boolean) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
    };

    return (
      <MuiTextField
        ref={ref}
        type={showPassword ? TextFieldInputTypes.INPUT_TEXT : TextFieldInputTypes.INPUT_PASSWORD}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    );
  },
) as ForwardRefExoticComponent<TextFieldProps>;

const PasswordFieldWithCriteria: ForwardRefExoticComponent<TextFieldProps> = forwardRef(
  ({criteria, id, type, ...rest}: TextFieldProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const [openPasswordCriteriaTooltip, setOpenPasswordCriteriaTooltip] = useState<boolean>(false);

    const handleClick = (): void => {
      setOpenPasswordCriteriaTooltip(true);
    };

    const handleBlurCapture = (): void => {
      if (openPasswordCriteriaTooltip) {
        setOpenPasswordCriteriaTooltip(false);
      }
    };

    const renderCriteriaTooltipContent = (): ReactNode => (
      <List>
        {criteria?.map((criterion: string) => (
          <ListItem disablePadding key={criteria.indexOf(criterion)}>
            <ListItemIcon>
              <CircleDotIcon />
            </ListItemIcon>
            <ListItemText primary={criterion} />
          </ListItem>
        ))}
      </List>
    );

    if (!criteria) {
      return <PasswordField {...rest} />;
    }

    return (
      <Tooltip
        arrow
        placement="right-end"
        describeChild
        open={openPasswordCriteriaTooltip}
        title={renderCriteriaTooltipContent()}
        classes={{arrow: 'oxygen-text-field-tooltip-arrow', tooltip: 'oxygen-text-field-tooltip'}}
        ref={ref}
      >
        <PasswordField
          ref={ref}
          id={id}
          type={type}
          onClick={handleClick}
          onBlurCapture={handleBlurCapture}
          onFocus={handleClick}
          {...rest}
        />
      </Tooltip>
    );
  },
) as ForwardRefExoticComponent<TextFieldProps>;

const TextField: ForwardRefExoticComponent<TextFieldProps> & WithWrapperProps = forwardRef(
  (
    {className, id, label, type, InputLabelProps, ...rest}: TextFieldProps,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-text-field', className);

    return (
      <div className={classes}>
        <InputLabel htmlFor={id} aria-describedby={id} {...InputLabelProps}>
          {label}
        </InputLabel>
        {type === TextFieldInputTypes.INPUT_PASSWORD ? (
          <PasswordFieldWithCriteria id={id} type={type} {...rest} ref={ref} />
        ) : (
          <MuiTextField id={id} type={type} {...rest} ref={ref} />
        )}
      </div>
    );
  },
) as ForwardRefExoticComponent<TextFieldProps> & WithWrapperProps;

TextField.displayName = composeComponentDisplayName(COMPONENT_NAME);
TextField.muiName = COMPONENT_NAME;

export default TextField;
