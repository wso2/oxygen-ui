/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import {FormControl, FormControlLabel, InputLabel, MenuItem, SearchBar, Select, Stack, Switch} from '@wso2/oxygen-ui';
import type {Filters, Report} from '../data.js';
import {CATEGORY_LABEL} from './Labels.js';

export default function FiltersBar({
  report,
  filters,
  onChange,
}: {
  report: Report;
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const categories = [...new Set(report.findings.map((finding) => finding.category))].sort();

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={2} alignItems={{md: 'center'}}>
      <SearchBar
        placeholder="Search files, messages and code"
        value={filters.query}
        onChange={(event) => onChange({...filters, query: event.target.value})}
        inputProps={{'aria-label': 'Search findings'}}
        sx={{flex: 1}}
        size="small"
      />
      <FormControl size="small" sx={{minWidth: 160}}>
        <InputLabel id="severity-filter-label">Severity</InputLabel>
        <Select
          labelId="severity-filter-label"
          label="Severity"
          value={filters.severity}
          onChange={(event) => onChange({...filters, severity: event.target.value as Filters['severity']})}
        >
          <MenuItem value="all">All severities</MenuItem>
          <MenuItem value="error">Error</MenuItem>
          <MenuItem value="warning">Warning</MenuItem>
          <MenuItem value="info">Info</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{minWidth: 160}}>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          label="Category"
          value={filters.category}
          onChange={(event) => onChange({...filters, category: event.target.value as Filters['category']})}
        >
          <MenuItem value="all">All categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {CATEGORY_LABEL[category] ?? category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch checked={filters.fixableOnly} onChange={(event) => onChange({...filters, fixableOnly: event.target.checked})} />
        }
        label="Fixable only"
      />
      {report.baseline && (
        <FormControlLabel
          control={<Switch checked={filters.newOnly} onChange={(event) => onChange({...filters, newOnly: event.target.checked})} />}
          label="New only"
        />
      )}
    </Stack>
  );
}
