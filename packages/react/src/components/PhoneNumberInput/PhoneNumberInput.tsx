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
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
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
   * Default country selected for the dialCode.
   *
   * @example {code: 'US', dialCode: '+1', name: 'United States'}
   */
  defaultCountry?: Country;
  /**
   * Callback function to be called when the dialCode or phoneNumber changes.
   */
  onChange?: (dialCode: string, phoneNumber: string) => void;
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
      defaultCountry,
      label,
      InputLabelProps,
      OutlinedInputProps,
      onChange,
      placeholder,
      SelectProps,
      ...rest
    } = props;

    const classes: string = clsx('oxygen-phone-number-input', className);

    const [country, setCountry] = useState<Country>(defaultCountry ?? countries[0]);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleDialCodeChange = (event: SelectChangeEvent): void => {
      setCountry(countries.find((item: Country) => item.dialCode === event.target.value));
      onChange?.(event.target.value, phoneNumber);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setPhoneNumber(event.target.value);
      onChange?.(country.dialCode, event.target.value);
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
            value={country.dialCode}
            onChange={handleDialCodeChange}
            renderValue={(value: string): ReactElement => (
              <>
                <ListItemIcon>
                  <Flag className="oxygen-image" alt={country.name} code={country.code} fallback={<FlagOutlined />} />
                </ListItemIcon>
                {value}
              </>
            )}
            inputProps={{
              className: 'oxygen-select-input-root',
            }}
            {...SelectProps}
          >
            {countries?.map((countryItem: Country) => {
              const {dialCode, code, name} = countryItem;
              return (
                <MenuItem value={dialCode} key={code} className="oxygen-dial-code-menu-item">
                  <ListItemIcon>
                    <Flag className="oxygen-image" alt={country.name} code={code} fallback={<FlagOutlined />} />
                  </ListItemIcon>
                  <Typography>{name}</Typography>&nbsp;
                  <Typography variant="body2">{dialCode}</Typography>
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
