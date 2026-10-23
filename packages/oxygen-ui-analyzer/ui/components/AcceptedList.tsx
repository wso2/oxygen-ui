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

import {ListingTable, Typography} from '@wso2/oxygen-ui';
import TextLink from './TextLink.js';
import {routeToHash, type SuppressedFinding} from '../data.js';

/** Findings the product accepts with exceptions in its config, with the reasons. */
export default function AcceptedList({findings}: {findings: SuppressedFinding[]}) {
  if (findings.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
        No findings are accepted by exceptions.
      </Typography>
    );
  }

  return (
    <ListingTable.Container>
      <ListingTable variant="table" density="compact">
        <ListingTable.Head>
          <ListingTable.Row>
            <ListingTable.Cell>Location</ListingTable.Cell>
            <ListingTable.Cell>Rule</ListingTable.Cell>
            <ListingTable.Cell>Reason</ListingTable.Cell>
            <ListingTable.Cell>Expires</ListingTable.Cell>
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {findings.map((finding) => (
            <ListingTable.Row key={finding.id}>
              <ListingTable.Cell>
                <Typography variant="body2" sx={{fontFamily: 'monospace', wordBreak: 'break-all'}}>
                  {finding.file}:{finding.line}
                </Typography>
              </ListingTable.Cell>
              <ListingTable.Cell>
                <TextLink href={routeToHash({view: 'rule', id: finding.ruleId})} sx={{fontFamily: 'monospace'}}>
                  {finding.ruleId}
                </TextLink>
              </ListingTable.Cell>
              <ListingTable.Cell>{finding.exception.reason}</ListingTable.Cell>
              <ListingTable.Cell>{finding.exception.expires ?? 'Never'}</ListingTable.Cell>
            </ListingTable.Row>
          ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}
