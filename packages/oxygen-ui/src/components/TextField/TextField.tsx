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

/** `top` draws a static label above the field instead of MUI's floating label. */
export type TextFieldLabelPlacement = 'top';

export type TextFieldProps = MuiTextFieldProps & {
  /** Leave unset for MUI's floating label; `top` draws a static label above the field. */
  labelPlacement?: TextFieldLabelPlacement;
  /** Appends "(Optional)" to the label; ignored without a label or on a `required` field. */
  optional?: boolean;
};

/** MUI's TextField; with `labelPlacement="top"`, `ref` and layout props go to an outer FormControl. */
const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(function TextField(
  { labelPlacement, optional = false, label: labelProp, ...fieldProps },
  ref,
) {
  const hasLabel = labelProp != null && labelProp !== '';
  const label = optional && hasLabel && !fieldProps.required ? <>{labelProp} (Optional)</> : labelProp;
  const { id: idProp, sx, className, style, fullWidth, margin, required, error, disabled, color, focused: focusedProp, slotProps, onFocus, onBlur, helperText: helperProp, ...rest } = fieldProps;
  const generatedId = React.useId();
  // The inner field owns focus; lifting it lets the outer label colour on focus.
  const [hasFocus, setHasFocus] = React.useState(false);

  if (labelPlacement !== 'top' || !hasLabel) return <MuiTextField ref={ref} {...fieldProps} label={label} />;

  // Reserving the line keeps the form from shifting when an error appears.
  const helperText = error !== undefined && (helperProp == null || helperProp === '' || typeof helperProp === 'boolean') ? ' ' : helperProp;
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  // A select's combobox is a div, which <label for> cannot name, so it is named through labelId.
  const selectProps = slotProps?.select;
  const selectSlot = rest.select
    ? { select: typeof selectProps === 'function' ? (ownerState: Parameters<typeof selectProps>[0]) => ({ ...selectProps(ownerState), labelId }) : { ...selectProps, labelId } }
    : {};

  return (
    <FormControl ref={ref} sx={sx} className={className} style={style} fullWidth={fullWidth} margin={margin} required={required} error={error} disabled={disabled} color={color} focused={focusedProp ?? hasFocus}>
      <FormLabel id={labelId} htmlFor={id}>
        {label}
      </FormLabel>
      <MuiTextField
        {...rest}
        id={id}
        fullWidth
        // The filled variant pads for a floating label, which top mode does not draw.
        hiddenLabel
        required={required}
        error={error}
        disabled={disabled}
        color={color}
        focused={focusedProp}
        helperText={helperText}
        slotProps={{ ...slotProps, ...selectSlot }}
        onFocus={(e) => {
          setHasFocus(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          onBlur?.(e);
        }}
      />
    </FormControl>
  );
});

export default TextField;
