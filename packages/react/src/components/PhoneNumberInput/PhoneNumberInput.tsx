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

import Select, {SelectChangeEvent, SelectProps as MuiSelectProps} from '@mui/material/Select';
import clsx from 'clsx';
import {ChangeEvent, forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement, useState} from 'react';
import {countries, Country} from './constants';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box, {BoxProps} from '../Box';
import Image from '../Image';
import InputLabel from '../InputLabel';
import ListItemIcon from '../ListItemIcon';
import MenuItem from '../MenuItem';
import './phone-number-input.scss';
import OutlinedInput, {OutlinedInputProps as MuiOutlinedInputProps} from '../OutlinedInput';

export interface PhoneNumberInputProps extends BoxProps {
  OutlinedInputProps?: Omit<MuiOutlinedInputProps, 'id' | 'label' | 'placeholder' | 'type'>;
  SelectProps?: Omit<MuiSelectProps, 'labelId' | 'id' | 'value' | 'onChange' | 'placeholder'>;
  defaultCountryCode?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const COMPONENT_NAME: string = 'PhoneNumberInput';

const PhoneNumberInput: ForwardRefExoticComponent<PhoneNumberInputProps> & WithWrapperProps = forwardRef(
  (props: PhoneNumberInputProps, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {
      className,
      defaultCountryCode,
      label,
      InputLabelProps,
      OutlinedInputProps,
      onChange,
      placeholder,
      SelectProps,
      ...rest
    } = props;

    const classes: string = clsx('oxygen-phone-number-input', className);

    const [countryCode, setCountryCode] = useState<string>(defaultCountryCode ?? countries[0].dial_code);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCountryCodeChange = (event: SelectChangeEvent): void => {
      setCountryCode(event.target.value);
      onChange(`${event.target.value}${phoneNumber}`);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setPhoneNumber(event.target.value);
      onChange(`${countryCode}${event.target.value}`);
    };

    return (
      <Box className={classes} {...rest} ref={ref}>
        <InputLabel htmlFor="phone-number-input" id="phone-number-label">
          {label}
        </InputLabel>
        <Box className="oxygen-select-input">
          <Select
            labelId="phone-number-label"
            id="phone-number-select"
            value={countryCode}
            onChange={handleCountryCodeChange}
            className="oxygen-select"
            inputProps={{
              className: 'oxygen-select-input-root',
            }}
            {...SelectProps}
          >
            {countries?.map((country: Country) => (
              <MenuItem value={country.dial_code} className="oxygen-dial-code-menu-item">
                <ListItemIcon>
                  <Image
                    loading="lazy"
                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                    srcSet={`https://flagcdn.com/${country.code.toLowerCase()}.svg 2x`}
                    alt={country.name}
                  />
                </ListItemIcon>
                {country.dial_code}
              </MenuItem>
            ))}
          </Select>
          <OutlinedInput
            id="phone-number-input"
            placeholder={placeholder}
            type="tel"
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
