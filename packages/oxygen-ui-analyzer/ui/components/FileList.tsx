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

import {Chip, Link, ListingTable, Stack, Typography} from '@wso2/oxygen-ui';
import {highestSeverity, routeToHash, type FileSummary} from '../data.js';
import {SeverityChip} from './Labels.js';

export default function FileList({files}: {files: FileSummary[]}) {
  if (files.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
        No files match the filters.
      </Typography>
    );
  }

  return (
    <ListingTable.Container>
      <ListingTable variant="table" density="compact">
        <ListingTable.Head>
          <ListingTable.Row>
            <ListingTable.Cell>File</ListingTable.Cell>
            <ListingTable.Cell>Findings</ListingTable.Cell>
            <ListingTable.Cell>Highest severity</ListingTable.Cell>
            <ListingTable.Cell>Fixable automatically</ListingTable.Cell>
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {files.map((summary) => (
            <ListingTable.Row key={summary.file} hover>
              <ListingTable.Cell>
                <Link color="text.primary" underline="always" href={routeToHash({view: 'file', file: summary.file})} sx={{fontFamily: 'monospace', wordBreak: 'break-all'}}>
                  {summary.file}
                </Link>
              </ListingTable.Cell>
              <ListingTable.Cell>{summary.findings.length}</ListingTable.Cell>
              <ListingTable.Cell>
                <SeverityChip severity={highestSeverity(summary.findings)} />
              </ListingTable.Cell>
              <ListingTable.Cell>
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{summary.fixable}</span>
                  {summary.fixable === summary.findings.length && <Chip label="All" size="small" color="success" variant="outlined" />}
                </Stack>
              </ListingTable.Cell>
            </ListingTable.Row>
          ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}
