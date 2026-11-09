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
import { styled } from '@mui/material/styles';

/** `top` draws a static label above the select instead of MUI's floating label. */
export type SelectLabelPlacement = 'top';

export type SelectProps<Value = unknown> = MuiSelectProps<Value> & {
  /** Leave unset for MUI's floating label; `top` draws a static label above the select. */
  labelPlacement?: SelectLabelPlacement;
  /** Shown in the field while nothing is selected. Ignored by `native` selects. */
  placeholder?: React.ReactNode;
};

const Placeholder = styled('span', { name: 'MuiSelect', slot: 'Placeholder' })(({ theme }) => ({
  // Matches the text input placeholder.
  color: 'currentColor',
  opacity: theme.vars ? theme.vars.opacity.inputPlaceholder : theme.palette.mode === 'light' ? 0.42 : 0.5,
}));

// MUI's own test for an empty select value.
const isEmptyValue = (value: unknown) => value == null || value === '' || (Array.isArray(value) && value.length === 0);

// MUI compares option values as strings, except for objects.
const areEqualValues = (a: unknown, b: unknown) => (typeof b === 'object' && b !== null ? a === b : String(a) === String(b));

// MUI's default display: the children of the selected option(s), joined with ", " when multiple.
function renderSelectedOptions(selected: unknown, children: React.ReactNode): React.ReactNode {
  const options = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{ value?: unknown; children?: React.ReactNode }>[];
  const labelOf = (value: unknown) => options.find((option) => areEqualValues(value, option.props.value))?.props.children;
  if (!Array.isArray(selected)) return labelOf(selected);
  return selected.map((value, index) => (
    <React.Fragment key={index}>
      {index > 0 && ', '}
      {labelOf(value)}
    </React.Fragment>
  ));
}

/** Select props that show `placeholder` while the value is empty; shared with `TextField select`. */
export function selectPlaceholderProps<Value>(
  placeholder: React.ReactNode,
  renderValue: ((value: Value) => React.ReactNode) | undefined,
  children: React.ReactNode,
) {
  return {
    displayEmpty: true,
    renderValue: (selected: Value) => {
      if (isEmptyValue(selected)) return <Placeholder>{placeholder}</Placeholder>;
      return renderValue ? renderValue(selected) : renderSelectedOptions(selected, children);
    },
  };
}

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
