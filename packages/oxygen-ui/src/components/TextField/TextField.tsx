/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

/**
 * Where a TextField draws its label, when not MUI's floating label.
 * - `top`: a static label above the field, as in WSO2 cloud console forms.
 */
export type TextFieldLabelPlacement = 'top';

/**
 * Props for the TextField component: every MUI TextField prop, plus `labelPlacement`.
 */
export type TextFieldProps = MuiTextFieldProps & {
  /**
   * Leave unset for MUI's floating label. `top` draws a static label above the field instead,
   * and a field that sets `error` keeps its helper line while it is empty, so an error
   * appearing does not shift the form.
   */
  labelPlacement?: TextFieldLabelPlacement;
};

/**
 * TextField component - MUI's TextField, with an optional static label above the field
 *
 * With `labelPlacement="top"`, `ref` and the layout props (`sx`, `className`, `style`,
 * `fullWidth`, `margin`) go to an outer FormControl that holds both the label and the field.
 * Without `labelPlacement`, or without a label, the component is MUI's TextField unchanged.
 *
 * @example
 * ```tsx
 * <TextField label="Name" placeholder="e.g. Customer Support Platform" />
 * ```
 *
 * @example
 * ```tsx
 * <TextField labelPlacement="top" label="Name" required error={!!error} helperText={error} />
 * ```
 */
const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(function TextField(
  { labelPlacement, ...props },
  ref,
) {
  const { label, id: idProp, sx, className, style, fullWidth, margin, required, error, disabled, slotProps, onFocus, onBlur, helperText: helperProp, ...rest } = props;
  const generatedId = React.useId();
  // The inner field tracks its own focus, so it is lifted to the outer FormControl for the label to colour on focus.
  const [focused, setFocused] = React.useState(false);

  if (labelPlacement !== 'top' || label == null || label === '') return <MuiTextField ref={ref} {...props} />;

  const helperText = error !== undefined && (helperProp == null || helperProp === '') ? ' ' : helperProp;
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  // A select's combobox is a div, which a <label for> cannot name, so it is named through labelId instead.
  const selectSlot = rest.select ? { select: { ...(slotProps?.select as object | undefined), labelId } } : {};

  return (
    <FormControl ref={ref} sx={sx} className={className} style={style} fullWidth={fullWidth} margin={margin} required={required} error={error} disabled={disabled} focused={focused}>
      <FormLabel id={labelId} htmlFor={id}>
        {label}
      </FormLabel>
      <MuiTextField
        {...rest}
        id={id}
        fullWidth
        // The filled variant pads its input for a floating label; the label is above, so drop that room.
        hiddenLabel
        required={required}
        error={error}
        disabled={disabled}
        helperText={helperText}
        slotProps={{ ...slotProps, ...selectSlot }}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
      />
    </FormControl>
  );
});

export default TextField;
