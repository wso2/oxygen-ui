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

import {FlagOutlined} from '@mui/icons-material';
import Select, {SelectChangeEvent, SelectProps as MuiSelectProps} from '@mui/material/Select';
import clsx from 'clsx';
import {ChangeEvent, forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement, useState} from 'react';
import Flag from 'react-world-flags';
import {countries, Country} from './constants';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box, {BoxProps} from '../Box';
import InputLabel from '../InputLabel';
import ListItemIcon from '../ListItemIcon';
import MenuItem from '../MenuItem';
import './phone-number-input.scss';
import OutlinedInput, {OutlinedInputProps as MuiOutlinedInputProps} from '../OutlinedInput';
import Typography from '../Typography';

export interface PhoneNumberInputProps extends BoxProps {
  /**
   * Props sent to the OutlinedInput component.
   *
   * Refer props: {@link https://mui.com/material-ui/api/outlined-input/}
   */
  OutlinedInputProps?: Omit<MuiOutlinedInputProps, 'id' | 'label' | 'placeholder' | 'value' | 'type'>;
  /**
   * Props sent to the Select component.
   *
   * Refer props: {@link https://mui.com/material-ui/api/select/}
   */
  SelectProps?: Omit<MuiSelectProps, 'labelId' | 'id' | 'value' | 'onChange' | 'placeholder'>;
  /**
   * Dial code state value.
   *
   * @example '+94'
   */
  dialCodeValue?: string;
  /**
   * Callback function to be called when the dialCode or phoneNumber changes.
   */
  onChange?: (dialCode: string, phoneNumber: string) => void;
  /**
   * Phone number state value.
   *
   * @example '787878787'
   */
  phoneNumberValue?: string;
  /**
   * Placeholder text for the phone number input.
   */
  placeholder?: string;
}

const COMPONENT_NAME: string = 'PhoneNumberInput';

const PhoneNumberInput: ForwardRefExoticComponent<PhoneNumberInputProps> & WithWrapperProps = forwardRef(
  (props: PhoneNumberInputProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {
      className,
      dialCodeValue,
      label,
      InputLabelProps,
      OutlinedInputProps,
      onChange,
      phoneNumberValue,
      placeholder,
      SelectProps,
      ...rest
    } = props;

    const classes: string = clsx('oxygen-phone-number-input', className);

    const [dialCode, setDialCode] = useState<string>(dialCodeValue ?? countries[0].dialCode);

    const [phoneNumber, setPhoneNumber] = useState<string>(phoneNumberValue ?? '');

    const handleDialCodeChange = (event: SelectChangeEvent): void => {
      setDialCode(event.target.value);
      onChange?.(event.target.value, phoneNumber);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setPhoneNumber(event.target.value);
      onChange?.(dialCode, event.target.value);
    };

    const renderValue = (value: string): ReactElement => {
      const selectedCountry: Country = countries.find((item: Country) => item.dialCode === dialCode);

      return (
        <>
          <ListItemIcon>
            <Flag
              className="oxygen-image"
              alt={selectedCountry.name}
              code={selectedCountry.code}
              fallback={<FlagOutlined />}
            />
          </ListItemIcon>
          {value}
        </>
      );
    };

    return (
      <Box className={classes} ref={ref} {...rest}>
        <InputLabel htmlFor="phone-number-input" id="phone-number-label">
          {label}
        </InputLabel>
        <Box className="oxygen-select-input">
          <Select
            className="oxygen-select"
            labelId="phone-number-label"
            id="phone-number-select"
            value={dialCode}
            onChange={handleDialCodeChange}
            renderValue={renderValue}
            inputProps={{
              className: 'oxygen-select-input-root',
            }}
            {...SelectProps}
          >
            {countries?.map((countryItem: Country) => {
              const {dialCode: phoneCode, code, name} = countryItem;
              return (
                <MenuItem value={phoneCode} key={code} className="oxygen-dial-code-menu-item">
                  <ListItemIcon>
                    <Flag className="oxygen-image" alt={name} code={code} fallback={<FlagOutlined />} />
                  </ListItemIcon>
                  <Typography>{name}</Typography>&nbsp;
                  <Typography variant="body2">{phoneCode}</Typography>
                </MenuItem>
              );
            })}
          </Select>
          <OutlinedInput
            id="phone-number-input"
            type="tel"
            placeholder={placeholder}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            {...OutlinedInputProps}
          />
        </Box>
      </Box>
    );
  },
) as ForwardRefExoticComponent<PhoneNumberInputProps> & WithWrapperProps;

PhoneNumberInput.displayName = composeComponentDisplayName(COMPONENT_NAME);
PhoneNumberInput.muiName = COMPONENT_NAME;
PhoneNumberInput.defaultProps = {};

export default PhoneNumberInput;
