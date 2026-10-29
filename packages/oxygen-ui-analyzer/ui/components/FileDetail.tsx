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

import {Alert, Button, Stack, Typography} from '@wso2/oxygen-ui';
import {ArrowLeft} from '@wso2/oxygen-ui-icons-react';
import {routeToHash, type Finding, type ReportRule} from '../data.js';
import FindingCard from './FindingCard.js';

export default function FileDetail({file, findings, rules}: {file: string; findings: Finding[]; rules: ReportRule[]}) {
  return (
    <Stack spacing={2}>
      <div>
        <Button href={routeToHash({view: 'files'})} startIcon={<ArrowLeft />} size="small" color="inherit">
          All files
        </Button>
      </div>
      <Typography variant="h5" component="h2" sx={{fontFamily: 'monospace', wordBreak: 'break-all'}}>
        {file}
      </Typography>
      {findings.length === 0 ? (
        <Alert severity="success">This file has no findings that match the filters.</Alert>
      ) : (
        findings.map((finding) => (
          <FindingCard key={finding.id} finding={finding} rule={rules.find((rule) => rule.id === finding.ruleId)} />
        ))
      )}
    </Stack>
  );
}
