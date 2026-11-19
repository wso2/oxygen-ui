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
import MuiSelect, { type SelectProps as MuiSelectProps } from '@mui/material/Select';
import { selectPlaceholderProps } from './placeholder';

// Public through the `Select` path, where it is shared with `TextField select`.
export { selectPlaceholderProps };

/** `top` draws a static label above the select instead of MUI's floating label. */
export type SelectLabelPlacement = 'top';

export type SelectProps<Value = unknown> = MuiSelectProps<Value> & {
  /** Leave unset for MUI's floating label; `top` draws a static label above the select. */
  labelPlacement?: SelectLabelPlacement;
  /** Shown in the field while nothing is selected. Ignored by `native` selects. */
  placeholder?: React.ReactNode;
};

function SelectInner<Value>(
  { labelPlacement, label, placeholder, ...props }: SelectProps<Value>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const hasPlaceholder = placeholder != null && placeholder !== '' && !props.native;
  const selectProps = hasPlaceholder ? { ...props, ...selectPlaceholderProps(placeholder, props.renderValue, props.children) } : props;
  const { id: idProp, labelId: labelIdProp, sx, className, style, fullWidth, required, error, disabled, color, size, variant, ...rest } = selectProps;
  const generatedId = React.useId();

  if (labelPlacement !== 'top' || label == null || label === '') return <MuiSelect ref={ref} {...selectProps} label={label} />;

  const id = idProp ?? generatedId;
  // A combobox is a div, which <label for> cannot name, so it is named through labelId.
  const labelId = labelIdProp ?? `${id}-label`;

  return (
    <FormControl
      ref={ref}
      sx={sx}
      className={className}
      style={style}
      fullWidth={fullWidth}
      required={required}
      error={error}
      disabled={disabled}
      color={color}
      size={size}
      variant={variant}
      // The filled variant pads for a floating label, which top mode does not draw.
      hiddenLabel
    >
      {/* The select shares this FormControl, so keep the label from taking its focus and error colours. */}
      <FormLabel id={labelId} htmlFor={rest.native ? id : undefined} focused={false} error={false}>
        {label}
      </FormLabel>
      <MuiSelect
        {...rest}
        id={id}
        labelId={labelId}
        fullWidth
        required={required}
        error={error}
        disabled={disabled}
        color={color}
        size={size}
        variant={variant}
      />
    </FormControl>
  );
}

// forwardRef drops the Value generic, so restore MUI Select's generic signature.
type SelectComponent = (<Value = unknown>(
  props: SelectProps<Value> & { ref?: React.Ref<HTMLDivElement> },
) => React.JSX.Element) & { muiName: string };

/** MUI's Select; with `labelPlacement="top"`, `ref` and layout props go to an outer FormControl. */
// FormControl reads muiName to treat the component as an input.
const Select = Object.assign(React.forwardRef(SelectInner), { muiName: 'Select' }) as unknown as SelectComponent;

export default Select;
