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

import {AutocompleteRenderInputParams} from '@mui/material/Autocomplete/Autocomplete';
import {render} from '@unit-testing';
import {ReactNode} from 'react';
import TextField from '../../TextField';
import Autocomplete from '../Autocomplete';

describe('Alert', () => {
  it('should render successfully', () => {
    const {baseElement} = render(
      <Autocomplete
        disablePortal
        options={[
          {label: 'The Shawshank Redemption', year: 1994},
          {label: 'The Godfather', year: 1972},
          {label: 'The Godfather: Part II', year: 1974},
          {label: 'The Dark Knight', year: 2008},
          {label: '12 Angry Men', year: 1957},
          {label: "Schindler's List", year: 1993},
          {label: 'Pulp Fiction', year: 1994},
        ]}
        renderInput={(params: AutocompleteRenderInputParams): ReactNode => <TextField {...params} label="Movie" />}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const {baseElement} = render(
      <Autocomplete
        disablePortal
        options={[
          {label: 'The Shawshank Redemption', year: 1994},
          {label: 'The Godfather', year: 1972},
          {label: 'The Godfather: Part II', year: 1974},
          {label: 'The Dark Knight', year: 2008},
          {label: '12 Angry Men', year: 1957},
          {label: "Schindler's List", year: 1993},
          {label: 'Pulp Fiction', year: 1994},
        ]}
        renderInput={(params: AutocompleteRenderInputParams): ReactNode => <TextField {...params} label="Movie" />}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
