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
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ChevronDown, ChevronRight } from '@wso2/oxygen-ui-icons-react';

const inherit = { fontFamily: 'inherit', fontSize: 'inherit' } as const;

interface JsonTreeProps {
  value: unknown;
  depth?: number;
  expandLabel: string;
  collapseLabel: string;
}

/**
 * Inline JSON tree. Objects and arrays are expandable; the first level starts open.
 */
const JsonTree: React.FC<JsonTreeProps> = ({ value, depth = 0, expandLabel, collapseLabel }) => {
  const [open, setOpen] = React.useState(depth < 1);

  if (value === null || value === undefined) {
    return (
      <Box component="span" sx={{ ...inherit, color: 'text.disabled' }}>
        null
      </Box>
    );
  }
  if (value instanceof Date) {
    return (
      <Box component="span" sx={{ ...inherit, color: 'info.main' }}>
        {Number.isNaN(value.getTime()) ? String(value) : value.toISOString()}
      </Box>
    );
  }
  if (typeof value === 'string') {
    return (
      <Box component="span" sx={{ ...inherit, color: 'warning.main' }}>
        &quot;{value}&quot;
      </Box>
    );
  }
  if (typeof value !== 'object') {
    return (
      <Box component="span" sx={{ ...inherit, color: 'info.main' }}>
        {String(value)}
      </Box>
    );
  }

  const isArray = Array.isArray(value);
  const entries: Array<readonly [string, unknown]> = isArray
    ? (value as unknown[]).map((item, index) => [String(index), item] as const)
    : Object.entries(value as Record<string, unknown>);

  if (entries.length === 0) {
    return (
      <Box component="span" sx={inherit}>
        {isArray ? '[]' : '{}'}
      </Box>
    );
  }

  return (
    <Box component="span">
      <IconButton
        size="small"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-label={open ? collapseLabel : expandLabel}
        sx={{ p: 0, width: 16, height: 16, mr: 0.5, verticalAlign: 'middle' }}
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </IconButton>
      <Box component="span" sx={inherit}>
        {isArray ? '[' : '{'}
      </Box>
      {open ? (
        <Box
          sx={{ pl: 2.5, ml: 0.5, borderLeft: 1, borderColor: 'divider' }}
        >
          {entries.map(([key, item]) => (
            <Box key={key} sx={{ py: 0.125 }}>
              {!isArray && (
                <Box component="span" sx={{ ...inherit, fontWeight: 600 }}>
                  &quot;{key}&quot;
                  <Box component="span" sx={{ fontWeight: 400 }}>
                    :{' '}
                  </Box>
                </Box>
              )}
              <JsonTree value={item} depth={depth + 1} expandLabel={expandLabel} collapseLabel={collapseLabel} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box component="span" sx={{ ...inherit, color: 'text.disabled' }}>
          {' … '}
        </Box>
      )}
      <Box component="span" sx={inherit}>
        {isArray ? ']' : '}'}
      </Box>
    </Box>
  );
};

JsonTree.displayName = 'LogViewerJsonTree';

interface LogViewerDetailsProps {
  details: Record<string, unknown>;
  expandLabel?: string;
  collapseLabel?: string;
}

/**
 * Default expanded view of an entry: one labelled row per field.
 */
const LogViewerDetails: React.FC<LogViewerDetailsProps> = ({ details, expandLabel = 'Expand', collapseLabel = 'Collapse' }) => (
  <Box
    component="dl"
    sx={{
      m: 0,
      display: 'grid',
      gridTemplateColumns: 'max-content minmax(0, 1fr)',
      columnGap: 2,
      rowGap: 0.5,
    }}
  >
    {Object.entries(details).map(([key, value]) => (
      <React.Fragment key={key}>
        <Box component="dt" sx={{ color: 'text.secondary' }}>
          {key}
        </Box>
        <Box component="dd" sx={{ m: 0, minWidth: 0, overflowWrap: 'anywhere' }}>
          {value !== null && typeof value === 'object' ? (
            <JsonTree value={value} expandLabel={expandLabel} collapseLabel={collapseLabel} />
          ) : (
            String(value ?? '')
          )}
        </Box>
      </React.Fragment>
    ))}
  </Box>
);

LogViewerDetails.displayName = 'LogViewerDetails';

export default LogViewerDetails;
