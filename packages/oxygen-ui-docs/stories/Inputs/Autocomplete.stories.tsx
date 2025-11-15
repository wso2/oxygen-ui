/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, TextField, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * The Autocomplete component provides suggestions while users type into a text field.
 * It supports single and multiple selections, custom rendering, and various filtering options.
 * 
 * This is a direct import of MUI autocomplete component. 
 * Read more at: https://mui.com/material-ui/react-autocomplete/
 */
const meta: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI autocomplete component is a direct import of MUI autocomplete component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-autocomplete/](https://mui.com/material-ui/react-autocomplete/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const topFilms = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'Forrest Gump', year: 1994 },
];

export const Default: Story = {
  render: () => (
    <Autocomplete
      disablePortal
      options={topFilms}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <Autocomplete
      multiple
      options={topFilms}
      getOptionLabel={(option) => option.label}
      defaultValue={[topFilms[0]]}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Movies" placeholder="Favorites" />}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Autocomplete
      disabled
      options={topFilms}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Disabled" />}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        size="small"
        options={topFilms}
        renderInput={(params) => <TextField {...params} label="Small" />}
      />
      <Autocomplete
        options={topFilms}
        renderInput={(params) => <TextField {...params} label="Medium (default)" />}
      />
    </Stack>
  ),
};
