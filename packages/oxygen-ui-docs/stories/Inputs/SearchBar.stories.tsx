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

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Stack } from '@wso2/oxygen-ui'
import { SearchBarWithAdvancedFilter, SearchBar } from '@wso2/oxygen-ui'

/**
 * The SearchBar component provides a styled search input built
 * on top of MUI TextField.
 *
 * SearchBarWithAdvancedFilter extends SearchBar by adding an
 * advanced search popover (triggered via a filter icon) to refine
 * search results using attribute, condition and value.
 */
const meta: Meta<typeof SearchBar> = {
  title: 'Inputs/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'SearchBar is a custom Oxygen UI input component with orange hover and focus states. ' +
          'It also provides an advanced filter variant with a popover-based search.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 360 }}>
      <SearchBar size="small" />
    </Stack>
  ),
}

export const WithAdvancedFilter: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [advancedFilter, setAdvancedFilter] = React.useState({
      attribute: 'name',
      condition: 'starts_with',
      value: '',
    })

    return (
      <SearchBarWithAdvancedFilter
        sx={{ width: 560 }}
        value={value}
        onChange={setValue}
        advancedFilter={advancedFilter}
        onAdvancedFilterChange={setAdvancedFilter}
        attributeOptions={[
          { value: 'name', label: 'Name' },
          { value: 'description', label: 'Description' },
        ]}
        conditionOptions={[
          { value: 'starts_with', label: 'Starts with' },
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
        ]}
        onAdvancedSearch={payload => {
          // eslint-disable-next-line no-console
          console.log('Advanced search payload:', payload)
        }}
      />
    )
  },
}
