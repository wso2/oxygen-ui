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

import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';

interface AuditEntry {
  id: string;
  action: string;
  time: string;
}

export default function AuditLogTable({entries}: {entries: AuditEntry[]}) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Action</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{entry.action}</TableCell>
            <TableCell>{entry.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
