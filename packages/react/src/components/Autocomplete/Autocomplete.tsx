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

import MuiAutocomplete, {AutocompleteProps as MuiAutocompleteProps} from '@mui/material/Autocomplete';
import clsx from 'clsx';
import {forwardRef, ForwardRefExoticComponent, ReactElement, MutableRefObject} from 'react';
import {WithWrapperProps} from '../../models';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './autocomplete.scss';

export type AutocompleteProps<T> = MuiAutocompleteProps<T, boolean, boolean, boolean>;

const COMPONENT_NAME: string = 'Autocomplete';

/**
 * @remarks `any` is used as the generic type for the props because the generic type is not used in the component.
 */
const Autocomplete: ForwardRefExoticComponent<AutocompleteProps<any>> & WithWrapperProps = forwardRef(
  (props: AutocompleteProps<any>, ref: MutableRefObject<HTMLDivElement>): ReactElement => {
    const {className, ...rest} = props;

    const classes: string = clsx('oxygen-autocomplete', className);

    return <MuiAutocomplete className={classes} {...rest} ref={ref} />;
  },
) as ForwardRefExoticComponent<AutocompleteProps<any>> & WithWrapperProps;

Autocomplete.displayName = composeComponentDisplayName(COMPONENT_NAME);
Autocomplete.muiName = COMPONENT_NAME;
Autocomplete.defaultProps = {};

export default Autocomplete;
