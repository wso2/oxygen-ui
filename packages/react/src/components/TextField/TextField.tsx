/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import {FormControlTypeMap} from '@mui/material/FormControl';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import MuiTextField from '@mui/material/TextField';
import type {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import {CircleDotIcon, EyeIcon, EyeSlashIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {forwardRef, useState} from 'react';
import type {ElementType, ForwardRefExoticComponent, MouseEvent, Ref, ReactElement, ReactNode} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import IconButton from '../IconButton';
import InputAdornment from '../InputAdornment';
import InputLabel from '../InputLabel';
import List from '../List';
import ListItem from '../ListItem';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import Tooltip from '../Tooltip';
import './text-field.scss';

export enum TextFieldInputTypes {
  INPUT_PASSWORD = 'password',
  INPUT_TEXT = 'text',
}

export type TextFieldProps<C extends ElementType = ElementType> = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: C;
  /**
   * Criteria for user input.
   */
  criteria?: string[];
} & Omit<MuiTextFieldProps, 'component'>;

const COMPONENT_NAME: string = 'TextField';

const PasswordField: ForwardRefExoticComponent<TextFieldProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {type, variant, ...rest}: TextFieldProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
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
        variant={variant}
        {...rest}
      />
    );
  },
) as ForwardRefExoticComponent<TextFieldProps> & WithWrapperProps;

const PasswordFieldWithCriteria: ForwardRefExoticComponent<TextFieldProps> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {criteria, id, type, ...rest}: TextFieldProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
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
) as ForwardRefExoticComponent<TextFieldProps> & WithWrapperProps;

/**
 * The Text Fields let users enter and edit text..
 *
 * Demos:
 *
 * - [Autocomplete (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-autocomplete)
 * - [Autocomplete (MUI)](https://mui.com/material-ui/react-autocomplete/)
 * - [Text Field (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-text-field)
 * - [Text Field (MUI)](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [TextField API](https://mui.com/material-ui/api/text-field/)
 * - inherits [FormControl API](https://mui.com/material-ui/api/form-control/)
 *
 * @remarks
 * - ✔️ Props of the [FormControl](https://mui.com/material-ui/api/form-control/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the TextField component.
 * @param ref - The ref to be forwarded to the MuiTextField component.
 * @returns The rendered TextField component.
 */
const TextField: OverridableComponent<FormControlTypeMap<TextFieldProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, id, label, type, InputLabelProps, variant, ...rest}: TextFieldProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-text-field', className);

    return (
      <div className={classes}>
        <InputLabel htmlFor={id} aria-describedby={id} {...InputLabelProps}>
          {label}
        </InputLabel>
        {type === TextFieldInputTypes.INPUT_PASSWORD ? (
          <PasswordFieldWithCriteria ref={ref} id={id} variant={variant} type={type} {...rest} />
        ) : (
          <MuiTextField ref={ref} id={id} variant={variant} type={type} {...rest} />
        )}
      </div>
    );
  },
) as OverridableComponent<FormControlTypeMap<TextFieldProps>> & WithWrapperProps;

TextField.displayName = composeComponentDisplayName(COMPONENT_NAME);
TextField.muiName = COMPONENT_NAME;

export default TextField;
