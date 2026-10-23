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

import {Stack, StatCard} from '@wso2/oxygen-ui';
import {CircleAlert, FileCode, ListChecks, Sparkles, Wrench} from '@wso2/oxygen-ui-icons-react';
import {isAutoFixable, type Report} from '../data.js';

export default function Summary({report}: {report: Report}) {
  const {summary} = report;
  const fixable = report.findings.filter(isAutoFixable).length;

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={2} sx={{'& > *': {flex: 1}}}>
      <StatCard label="Findings" value={summary.findings} icon={<ListChecks />} iconColor={summary.findings > 0 ? 'error' : 'success'} />
      {report.baseline && (
        <StatCard
          label="New since baseline"
          value={report.baseline.new}
          icon={<Sparkles />}
          iconColor={report.baseline.new > 0 ? 'error' : 'success'}
        />
      )}
      <StatCard
        label="Files to update"
        value={`${summary.filesWithFindings} of ${summary.filesAnalyzed}`}
        icon={<FileCode />}
        iconColor="warning"
      />
      <StatCard label="Fixable automatically" value={fixable} icon={<Wrench />} iconColor="success" />
      <StatCard
        label="Files not analyzed"
        value={report.errors.length}
        icon={<CircleAlert />}
        iconColor={report.errors.length > 0 ? 'warning' : 'success'}
      />
    </Stack>
  );
}
