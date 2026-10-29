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

import {Box, Button, Card, CardContent, CodeBlock, Stack, Typography} from '@wso2/oxygen-ui';
import TextLink from './TextLink.js';
import {Check, Copy} from '@wso2/oxygen-ui-icons-react';
import {useState} from 'react';
import {buildFixPrompt, languageOf, routeToHash, type Finding, type ReportRule} from '../data.js';
import {FixChip, NewChip, SeverityChip} from './Labels.js';

export default function FindingCard({finding, rule}: {finding: Finding; rule?: ReportRule}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildFixPrompt(finding, rule));
      setCopyState('copied');
    } catch {
      // The clipboard can be unavailable, for example when the browser blocks it for the page.
      setCopyState('failed');
    }

    window.setTimeout(() => setCopyState('idle'), 3000);
  };

  const copyLabel = {idle: 'Copy fix prompt', copied: 'Copied', failed: 'Could not copy'}[copyState];
  const copyStatus = {idle: '', copied: 'Fix prompt copied to the clipboard', failed: 'The browser did not allow copying to the clipboard'}[copyState];

  return (
    <Card variant="outlined" component="article" aria-label={`Line ${finding.line}: ${finding.message}`}>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <SeverityChip severity={finding.severity} />
            {finding.status === 'new' && <NewChip />}
            <FixChip finding={finding} />
            <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'monospace'}}>
              Line {finding.line}, column {finding.column}
            </Typography>
          </Stack>

          <Typography variant="body1">{finding.message}</Typography>

          <CodeBlock code={finding.evidence} language={languageOf(finding.file)} />

          {finding.fix.suggestion && (
            <Typography variant="body2" color="text.secondary">
              Suggested fix: {finding.fix.suggestion} Preview it with <code>oxygen:fix --suggestions</code>, then add{' '}
              <code>--apply</code> to write it.
            </Typography>
          )}

          <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} alignItems={{sm: 'center'}} justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Rule:{' '}
              <TextLink href={routeToHash({view: 'rule', id: finding.ruleId})}>{rule?.title ?? finding.ruleId}</TextLink>
            </Typography>
            <Box>
              <Button size="small" variant="outlined" color="inherit" startIcon={copyState === 'copied' ? <Check /> : <Copy />} onClick={copyPrompt}>
                {copyLabel}
              </Button>
              <Box component="span" role="status" sx={{position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)'}}>
                {copyStatus}
              </Box>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
