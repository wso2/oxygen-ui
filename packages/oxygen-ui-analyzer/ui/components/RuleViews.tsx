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

import {Box, Button, Chip, ListingTable, Stack, Typography} from '@wso2/oxygen-ui';
import TextLink from './TextLink.js';
import {ArrowLeft} from '@wso2/oxygen-ui-icons-react';
import {routeToHash, type Finding, type ReportRule} from '../data.js';
import {CATEGORY_LABEL, FIX_TYPE_LABEL} from './Labels.js';
import Markdown, {renderInline} from './Markdown.js';

export function RuleList({rules}: {rules: ReportRule[]}) {
  return (
    <ListingTable.Container>
      <ListingTable variant="table" density="compact">
        <ListingTable.Head>
          <ListingTable.Row>
            <ListingTable.Cell>Rule</ListingTable.Cell>
            <ListingTable.Cell>Category</ListingTable.Cell>
            <ListingTable.Cell>Level</ListingTable.Cell>
            <ListingTable.Cell>Fix</ListingTable.Cell>
            <ListingTable.Cell>Findings</ListingTable.Cell>
          </ListingTable.Row>
        </ListingTable.Head>
        <ListingTable.Body>
          {[...rules]
            .sort((a, b) => b.findings - a.findings || a.id.localeCompare(b.id))
            .map((rule) => (
              <ListingTable.Row key={rule.id} hover>
                <ListingTable.Cell>
                  <TextLink href={routeToHash({view: 'rule', id: rule.id})}>{rule.title}</TextLink>
                  <Typography variant="caption" color="text.secondary" sx={{display: 'block', fontFamily: 'monospace'}}>
                    {rule.id}
                  </Typography>
                </ListingTable.Cell>
                <ListingTable.Cell>{CATEGORY_LABEL[rule.category] ?? rule.category}</ListingTable.Cell>
                <ListingTable.Cell>{capitalize(rule.level)}</ListingTable.Cell>
                <ListingTable.Cell>{FIX_TYPE_LABEL[rule.fix] ?? rule.fix}</ListingTable.Cell>
                <ListingTable.Cell>{rule.findings}</ListingTable.Cell>
              </ListingTable.Row>
            ))}
        </ListingTable.Body>
      </ListingTable>
    </ListingTable.Container>
  );
}

export function RuleDetail({rule, findings}: {rule?: ReportRule; findings: Finding[]}) {
  const back = (
    <div>
      <Button href={routeToHash({view: 'rules'})} startIcon={<ArrowLeft />} size="small" color="inherit">
        All rules
      </Button>
    </div>
  );

  if (!rule) {
    return (
      <Stack spacing={2}>
        {back}
        <Typography variant="body1">This rule is not part of the report.</Typography>
      </Stack>
    );
  }

  const files = [...new Set(findings.map((finding) => finding.file))];

  return (
    <Stack spacing={2}>
      {back}
      <Box>
        <Typography variant="h5" component="h2">
          {rule.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'monospace'}}>
          {rule.id}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label={CATEGORY_LABEL[rule.category] ?? rule.category} size="small" variant="outlined" />
        <Chip label={capitalize(rule.level)} size="small" variant="outlined" />
        <Chip label={`Fix: ${FIX_TYPE_LABEL[rule.fix] ?? rule.fix}`} size="small" variant="outlined" />
        <Chip label={rule.enforcement === 'automated' ? 'Checked automatically' : 'Needs review'} size="small" variant="outlined" />
      </Stack>
      <Typography variant="body1">{renderInline(rule.summary)}</Typography>
      <Markdown source={rule.docs} />
      <Box>
        <Typography variant="h6" component="h3" sx={{mb: 1}}>
          Files with findings
        </Typography>
        {files.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            None.
          </Typography>
        ) : (
          <Box component="ul" sx={{pl: 3, m: 0}}>
            {files.map((file) => (
              <li key={file}>
                <TextLink href={routeToHash({view: 'file', file})} sx={{fontFamily: 'monospace'}}>
                  {file}
                </TextLink>
                <Typography component="span" variant="body2" color="text.secondary">
                  {' '}
                  ({findings.filter((finding) => finding.file === file).length})
                </Typography>
              </li>
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
