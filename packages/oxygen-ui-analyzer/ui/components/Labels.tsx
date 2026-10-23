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

import {Chip} from '@wso2/oxygen-ui';
import {isAutoFixable, type Finding, type Severity} from '../data.js';

const SEVERITY_COLOR: Record<Severity, 'error' | 'warning' | 'info'> = {error: 'error', warning: 'warning', info: 'info'};
const SEVERITY_LABEL: Record<Severity, string> = {error: 'Error', warning: 'Warning', info: 'Info'};

export const FIX_TYPE_LABEL: Record<string, string> = {
  safe: 'Automatic',
  suggestion: 'Suggestion',
  ai: 'AI assisted',
  manual: 'Manual',
};

export const CATEGORY_LABEL: Record<string, string> = {
  imports: 'Imports',
  styling: 'Styling',
  components: 'Components',
  patterns: 'Patterns',
  accessibility: 'Accessibility',
  testability: 'Testability',
  content: 'Content',
};

export function SeverityChip({severity}: {severity: Severity}) {
  return <Chip label={SEVERITY_LABEL[severity]} size="small" color={SEVERITY_COLOR[severity]} variant="outlined" />;
}

/** Marks a finding that is not in the baseline. */
export function NewChip() {
  // Oxygen's info colour does not reach 4.5:1 contrast as chip text, so the label carries the meaning.
  return <Chip label="New" size="small" variant="outlined" />;
}

export function FixChip({finding}: {finding: Finding}) {
  if (isAutoFixable(finding)) {
    return <Chip label="Fixable" size="small" color="success" variant="outlined" />;
  }

  if (finding.fix.suggestion) {
    return <Chip label="Suggested fix" size="small" variant="outlined" />;
  }

  return (
    <Chip label={finding.fix.type === 'safe' ? 'Manual change' : FIX_TYPE_LABEL[finding.fix.type]} size="small" variant="outlined" />
  );
}
