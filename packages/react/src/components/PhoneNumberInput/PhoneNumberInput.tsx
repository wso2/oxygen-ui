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

import {FlagOutlined} from '@mui/icons-material';
import type {OverridableComponent} from '@mui/material/OverridableComponent';
import Select, {SelectChangeEvent, SelectProps as MuiSelectProps} from '@mui/material/Select';
import clsx from 'clsx';
import {forwardRef, useState} from 'react';
import type {ChangeEvent, ElementType, Ref, ReactElement} from 'react';
import Flag from 'react-world-flags';
import {countries, Country} from './constants/countries';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import InputLabel from '../InputLabel';
import type {InputLabelProps} from '../InputLabel';
import ListItemIcon from '../ListItemIcon';
import MenuItem from '../MenuItem';
import OutlinedInput from '../OutlinedInput';
import type {OutlinedInputProps} from '../OutlinedInput';
import Typography from '../Typography';
import './phone-number-input.scss';

export type PhoneNumberInputProps<C extends ElementType = ElementType> = BoxProps<C> & {
  /**
   * Props sent to the InputLabel component.
   *
   * Refer props: {@link https://mui.com/material-ui/api/input-label/}
   */
  InputLabelProps?: InputLabelProps;
  /**
   * Props sent to the OutlinedInput component.
   *
   * Refer props: {@link https://mui.com/material-ui/api/outlined-input/}
   */
  OutlinedInputProps?: Omit<OutlinedInputProps, 'id' | 'label' | 'placeholder' | 'value' | 'type'>;
  /**
   * Props sent to the Select component.
   *
   * Refer props: {@link https://mui.com/material-ui/api/select/}
   */
  SelectProps?: Omit<MuiSelectProps, 'labelId' | 'id' | 'value' | 'onChange' | 'placeholder' | 'variant'>;
  /**
   * Dial code state value.
   *
   * @example '+94'
   */
  dialCodeValue?: string;
  /**
   * Label for the phone number input.
   */
  label: string;
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
};

/**
 * The Phone Number Input component is used to get the phone number input from the user.
 *
 * Demos:
 *
 * - [Phone Number Input (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-phone-number-input)
 *
 * API:
 *
 * - inherits [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the PhoneNumberInput component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered PhoneNumberInput component.
 */
const PhoneNumberInput: OverridableComponent<BoxTypeMap<PhoneNumberInputProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {
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
    }: PhoneNumberInputProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
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
) as OverridableComponent<BoxTypeMap<PhoneNumberInputProps>>;

export default PhoneNumberInput;
