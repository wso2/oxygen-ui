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

import MuiAutocomplete from '@mui/material/Autocomplete';
import type {AutocompleteProps as MuiAutocompleteProps} from '@mui/material/Autocomplete';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ForwardRefExoticComponent, ReactElement, Ref} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import type {ChipTypeMap} from '../Chip';
import './autocomplete.scss';

export type AutocompleteProps<
  T,
  Multiple extends boolean | undefined = boolean | undefined,
  DisableClearable extends boolean | undefined = boolean | undefined,
  FreeSolo extends boolean | undefined = boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> = MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>;

const COMPONENT_NAME: string = 'Autocomplete';

/**
 * The Autocomplete is a normal text input enhanced by a panel of suggested options.
 *
 * Demos:
 *
 * - [Autocomplete (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/inputs-autocomplete)
 * - [Autocomplete (MUI)](https://mui.com/material-ui/react-autocomplete/)
 *
 * API:
 *
 * - [Autocomplete API](https://mui.com/material-ui/api/autocomplete/)
 *
 * @remarks
 * - ✔️ Props of the native component are also available.
 * - ❌ `component` prop is not supported.
 * - ❌ The component cannot hold a `ref`.
 *
 * @template C - The type of the component.
 * @param props - The props for the Accordion component.
 * @param ref - The ref to be forwarded to the MuiAccordion component.
 * @returns The rendered Accordion component.
 */
const Autocomplete: ForwardRefExoticComponent<AutocompleteProps<any>> & WithWrapperProps = forwardRef(
  ({className, ...rest}: AutocompleteProps<any>, ref: Ref<HTMLDivElement>): ReactElement => {
    const classes: string = clsx('oxygen-autocomplete', className);

    return <MuiAutocomplete className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<AutocompleteProps<any>> & WithWrapperProps;

Autocomplete.displayName = composeComponentDisplayName(COMPONENT_NAME);
Autocomplete.muiName = COMPONENT_NAME;

export default Autocomplete;
