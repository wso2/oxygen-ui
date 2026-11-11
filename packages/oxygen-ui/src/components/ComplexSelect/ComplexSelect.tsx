/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com).
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

import { ReactNode, ReactElement, Children, isValidElement, useId } from 'react';
import MuiSelect, { SelectProps, selectClasses } from '@mui/material/Select';
import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';
import MuiTypography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { styled, useThemeProps } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import ComplexSelectListHeader from './ComplexSelectListHeader';
import ComplexSelectMenuItem from './ComplexSelectMenuItem';
import ComplexSelectDivider from './ComplexSelectDivider';

export interface ComplexSelectProps extends Omit<SelectProps, 'children'> {
  children: ReactNode;
  /**
   * The anchor position of the label when provided.
   * - 'inside' (default): Label appears inside the select field above the selected value.
   *   Icons are preserved but secondary text is automatically hidden for a cleaner, more compact display.
   * - 'outside': Label appears above the select
   * - 'border': Label appears on the border (MUI standard behavior)
   * @default 'inside'
   */
  labelAnchor?: 'outside' | 'inside' | 'border';
  /**
   * The size of the field. Defaults to `small`, whatever the theme sets for `Select`, so
   * switchers fit the Header. A theme can change it with
   * `components.MuiComplexSelect.defaultProps.size`.
   * @default 'small'
   */
  size?: SelectProps['size'];
}

// Height of the field when the label is inside it
const INSIDE_LABEL_HEIGHT = 48;

const StyledSelect = styled(MuiSelect, {
  name: 'MuiComplexSelect',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'labelAnchor',
})<SelectProps & { labelAnchor?: 'outside' | 'inside' | 'border' }>(({ theme, labelAnchor }) => ({
  '&.MuiList-root': {
    padding: theme.spacing(1),
  },
  [`&.MuiInputBase-root .${selectClasses.select}`]: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '42px',
  },
  [`& .${selectClasses.icon}`]: {
    marginLeft: theme.spacing(1),
  },
  // Label inside: a 48px two-line field that fits the 64px Header. The height sits on the select
  // display (the click target). `&&` plus the input class outrank theme padding overrides on the
  // select slot, which are injected after this rule.
  ...(labelAnchor === 'inside' && {
    [`&&.MuiInputBase-root .${selectClasses.select}.${inputBaseClasses.input}`]: {
      boxSizing: 'border-box',
      minHeight: INSIDE_LABEL_HEIGHT,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(1.5),
    },
    [`& .${selectClasses.select} .${listItemTextClasses.root}`]: {
      marginTop: 0,
      marginBottom: 0,
    },
  }),
}));

const InsideLabelText = styled(MuiTypography, {
  name: 'MuiComplexSelect',
  slot: 'InsideLabel',
})(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.vars?.palette.text.secondary || theme.palette.text.secondary,
  display: 'block',
  lineHeight: 1.2,
  marginBottom: theme.spacing(0.125),
}));

const StyledFormControl = styled(MuiFormControl, {
  name: 'MuiComplexSelect',
  slot: 'FormControl',
})(() => ({
  minWidth: 120,
}));

// Names the combobox when the label is inside the field. A span rather than a <label>: a <label>
// must point at a form control, and Select's combobox is a div, so browsers flag a <label> here as
// not associated with any field.
const HiddenLabel = styled('span', {
  name: 'MuiComplexSelect',
  slot: 'HiddenLabel',
})(visuallyHidden);

const StyledInputLabel = styled(MuiInputLabel, {
  name: 'MuiComplexSelect',
  slot: 'InputLabel',
  shouldForwardProp: (prop) => prop !== 'labelAnchor',
})<{ labelAnchor: 'outside' | 'border' }>(({ theme, labelAnchor }) => ({
  ...(labelAnchor === 'outside' && {
    position: 'relative',
    transform: 'none',
    marginBottom: theme.spacing(1),
    color: theme.vars?.palette.text.primary || theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-focused': {
      color: theme.vars?.palette.text.primary || theme.palette.text.primary,
    },
  }),
}));

export function ComplexSelect(inProps: ComplexSelectProps) {
  const {
    children,
    sx,
    label,
    labelId,
    labelAnchor = 'inside',
    size = 'small',
    ...props
  } = useThemeProps({ props: inProps, name: 'MuiComplexSelect' });
  const autoLabelId = useId();
  // Helper function to inject label into MenuItem content
  const injectLabelIntoContent = (content: ReactNode): ReactNode => {
    if (!label || labelAnchor !== 'inside') return content;

    // Traverse through the content to find and modify MenuItemText
    const processChildren = (node: ReactNode): ReactNode => {
      if (!isValidElement(node)) return node;

      // Check if this is a MenuItemText component
      if (node.type && typeof node.type === 'function') {
        const nodeProps = node.props as { primary?: ReactNode; secondary?: ReactNode; children?: ReactNode };
        
        // If it has a 'primary' prop, it's likely the Text component
        if (nodeProps.primary) {
          return {
            ...node,
            props: {
              ...nodeProps,
              primary: (
                <>
                  <InsideLabelText>{label}</InsideLabelText>
                  {nodeProps.primary}
                </>
              ),
              // Remove secondary text when label is inside
              secondary: undefined,
            },
          };
        }
      }

      // If node has children, process them recursively
      const nodeProps = node.props as { children?: ReactNode };
      if (nodeProps.children) {
        return {
          ...node,
          props: {
            ...nodeProps,
            children: Children.map(nodeProps.children, processChildren),
          },
        };
      }

      return node;
    };

    return Children.map(content, processChildren);
  };

  // Helper function to find MenuItem content by value
  const findMenuItemContent = (selected: unknown): ReactNode => {
    let content: ReactNode = selected as ReactNode;
    
    const findInChildren = (childNodes: ReactNode): void => {
      Children.forEach(childNodes, (child) => {
        if (isValidElement(child)) {
          const childProps = child.props as { value?: unknown; children?: ReactNode };
          
          if (childProps.value === selected) {
            content = childProps.children;
          } else if (childProps.children) {
            findInChildren(childProps.children);
          }
        }
      });
    };
    
    findInChildren(children);
    return injectLabelIntoContent(content);
  };

  // Custom render function for inside label
  const renderInsideValue = labelAnchor === 'inside' && label
    ? (selected: unknown): ReactNode => findMenuItemContent(selected)
    : props.renderValue;

  // Default MenuProps with left anchor
  const defaultMenuProps = {
    anchorOrigin: {
      vertical: 'bottom' as const,
      horizontal: 'left' as const,
    },
    transformOrigin: {
      vertical: 'top' as const,
      horizontal: 'left' as const,
    },
    ...props.MenuProps,
  };

  const selectContent = (
    <StyledSelect 
      {...props}
      size={size}
      label={label}
      labelId={labelId}
      sx={sx}
      renderValue={renderInsideValue}
      MenuProps={defaultMenuProps}
    >
      {children}
    </StyledSelect>
  );

  // If label is provided, wrap with FormControl and InputLabel
  if (label) {
    const generatedLabelId = labelId || autoLabelId;

    return (
      <StyledFormControl fullWidth={props.fullWidth}>
        {/*
         * For 'inside' mode the label is drawn inside the select value, which is
         * not exposed as the field's accessible name. A visually hidden span keeps
         * the combobox named through aria-labelledby (WCAG 4.1.2).
         */}
        {labelAnchor === 'inside' ? (
          <HiddenLabel id={generatedLabelId}>{label}</HiddenLabel>
        ) : (
          <StyledInputLabel 
            id={generatedLabelId} 
            labelAnchor={labelAnchor}
          >
            {label}
          </StyledInputLabel>
        )}
        <StyledSelect
          {...props}
          size={size}
          label={labelAnchor === 'border' ? label : undefined}
          labelId={generatedLabelId}
          labelAnchor={labelAnchor}
          renderValue={renderInsideValue}
          MenuProps={defaultMenuProps}
          sx={sx}
        >
          {children}
        </StyledSelect>
      </StyledFormControl>
    );
  }

  return selectContent;
}

// Define the main component type with sub-components
interface ComplexSelectComponent {
  (props: ComplexSelectProps): ReactElement;
  ListHeader: typeof ComplexSelectListHeader;
  MenuItem: typeof ComplexSelectMenuItem;
  Divider: typeof ComplexSelectDivider;
}

// Create the compound component
const ComplexSelectCompound: ComplexSelectComponent = Object.assign(ComplexSelect, {
  ListHeader: ComplexSelectListHeader,
  MenuItem: ComplexSelectMenuItem,
  Divider: ComplexSelectDivider,
});

export default ComplexSelectCompound;
