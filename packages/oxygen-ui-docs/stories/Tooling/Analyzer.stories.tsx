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

import { Description, Primary, Subtitle, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  CodeBlock,
  Divider,
  Link,
  ListingTable,
  Stack,
  StatCard,
  Typography,
} from '@wso2/oxygen-ui';
import { FileCode, ListChecks, Wrench } from '@wso2/oxygen-ui-icons-react';
import React, { useEffect, useState } from 'react';
import CenterContentLayout from '../../layouts/CenterContentLayout';

/**
 * Check a product against the Oxygen UI rules, see which files are inconsistent with the design system,
 * and apply the safe fixes automatically.
 */
const meta: Meta = {
  title: 'Tooling/Analyzer',
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

// The parts of the analyzer's report and fix plan that this page shows. The data is generated from
// samples/oxygen-ui-analyzer-demo by scripts/generate-analyzer-demo.js when Storybook starts or builds.

interface Finding {
  id: string;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  file: string;
  line: number;
  column: number;
  message: string;
  evidence: string;
  fix: { type: string; available: boolean };
}

interface ReportRule {
  id: string;
  title: string;
  summary: string;
  category: string;
  level: string;
  fix: string;
  findings: number;
}

interface Report {
  project: { name: string };
  ruleset: { version: string };
  summary: { filesAnalyzed: number; filesWithFindings: number; findings: number };
  rules: ReportRule[];
  findings: Finding[];
}

interface FixPlan {
  files: { file: string; findings: string[]; suggested: string[]; diff: string }[];
  unfixable: Finding[];
}

type DemoData<T> = { status: 'loading' } | { status: 'ready'; data: T } | { status: 'missing' };

function useDemoData<T>(file: string): DemoData<T> {
  const [state, setState] = useState<DemoData<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetch(`./analyzer-demo/${file}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.statusText))))
      .then((data: T) => !cancelled && setState({ status: 'ready', data }))
      .catch(() => !cancelled && setState({ status: 'missing' }));

    return () => {
      cancelled = true;
    };
  }, [file]);

  return state;
}

function DemoState({ state, children }: { state: DemoData<unknown>; children: () => React.ReactNode }) {
  if (state.status === 'loading') {
    return <CircularProgress aria-label="Loading the demo" size={24} />;
  }

  if (state.status === 'missing') {
    return (
      <Alert severity="info">
        The demo data has not been generated. Build the packages with <code>pnpm build</code>, then restart Storybook.
      </Alert>
    );
  }

  return <>{children()}</>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Stack spacing={1.5}>{children}</Stack>
    </Box>
  );
}

function Text({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  );
}

const fixTypeLabel: Record<string, string> = {
  safe: 'Automatic',
  suggestion: 'Suggestion',
  ai: 'AI assisted',
  manual: 'Manual',
};

function FixChip({ finding }: { finding: Finding }) {
  return finding.fix.available && finding.fix.type === 'safe' ? (
    <Chip label="Fixable" size="small" color="success" variant="outlined" />
  ) : (
    <Chip label="Manual change" size="small" variant="outlined" />
  );
}

/**
 * What the analyzer does and how to add it to a product.
 */
export const Overview: Story = {
  render: () => (
    <CenterContentLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Oxygen UI analyzer
          </Typography>
          <Text>
            The analyzer checks a product against the Oxygen UI rules and reports which files are inconsistent with
            the design system: the rule, the file and line, the code involved, and how to fix it. Like Storybook, it
            runs as a local web page while you work, or builds a report file for CI. Safe fixes, such as importing MUI
            components from Oxygen UI, can be applied automatically.
          </Text>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Link href="./analyzer-demo/report.html" target="_blank" rel="noopener" color="text.primary" sx={{ textDecoration: 'underline' }}>
              Open the demo report
            </Link>
          </Typography>
        </Box>

        <Divider />

        <Section title="Add it to a product">
          <CodeBlock language="bash" code="pnpm add -D @wso2/oxygen-ui-analyzer" />
          <Text>Then add scripts to the product's package.json:</Text>
          <CodeBlock
            language="json"
            code={`"scripts": {
  "oxygen": "oxygen-ui-analyzer dev",
  "oxygen:build": "oxygen-ui-analyzer build",
  "oxygen:fix": "oxygen-ui-analyzer fix"
}`}
          />
        </Section>

        <Section title="Find inconsistencies">
          <CodeBlock
            language="bash"
            code={`pnpm oxygen                    # open the report at http://127.0.0.1:6007; it updates as files change
pnpm oxygen:build              # write the report to oxygen-report.html, for CI artifacts or sharing
npx oxygen-ui-analyzer analyze # print the report in the terminal
npx oxygen-ui-analyzer analyze --format json --output oxygen-report.json`}
          />
          <Text>
            The report lists the files to update, most findings first. Each finding shows the code involved, how to fix
            it, and a button that copies a fix prompt for an AI coding assistant. Every command accepts --include and
            --ignore to choose the files to check.
          </Text>
          <Text>
            The analyzer uses its own ESLint setup with only the Oxygen UI rules, so the product's ESLint configuration
            does not change the results. Dependencies, build output and tests are skipped by default. To accept a
            finding, add a disable comment with the reason:
          </Text>
          <CodeBlock
            language="tsx"
            code="// eslint-disable-next-line @wso2/oxygen-ui/no-direct-mui-imports -- Oxygen UI only re-exports the date-fns adapter"
          />
        </Section>

        <Section title="Fix them">
          <CodeBlock
            language="bash"
            code={`pnpm oxygen:fix                                  # preview the diff; nothing is changed
pnpm oxygen:fix --apply --verify "pnpm typecheck" # write the fixes, then check them
pnpm oxygen:fix --apply --rule no-direct-lucide-imports --limit 10
pnpm oxygen:fix --suggestions                    # also preview suggested fixes, which need review
pnpm oxygen:fix --ai                             # write the rest to a plan for an AI assistant`}
          />
          <Text>
            Automatic fixes are applied by default, and suggested fixes only with --suggestions. With --apply, nothing is
            written to files with uncommitted changes. After
            writing, the project is analyzed again, and every --verify command is run. If the changes introduce a
            new finding or a command fails, they are rolled back.
          </Text>
        </Section>

        <Section title="Adopt it in an existing product">
          <Text>
            Create the config, record the current findings as a baseline, and commit both. From then on, check fails
            only on findings that are not in the baseline, so new code cannot add inconsistencies while the existing
            ones are fixed over time.
          </Text>
          <CodeBlock
            language="bash"
            code={`npx oxygen-ui-analyzer init       # create oxygen-ui-analyzer.config.js
npx oxygen-ui-analyzer baseline   # record the current findings in .oxygen-ui/baseline.json
npx oxygen-ui-analyzer check      # fail on findings that are not in the baseline
npx oxygen-ui-analyzer baseline --prune  # after fixing findings, remove them from the baseline`}
          />
          <Text>
            The config belongs to the product; the analyzer never changes it. It sets the files to check, rule
            severities and options, and exceptions. Every exception needs a reason, and can expire, after which its
            findings are reported again. Expired exceptions, exceptions that match nothing, and mandatory rules that
            are turned off are shown in every report, so reviewers can see them.
          </Text>
          <CodeBlock
            language="javascript"
            code={`export default {
  rules: {
    'no-direct-lucide-imports': 'warning',
  },
  exceptions: [
    {
      rule: 'no-direct-mui-imports',
      files: ['src/legacy/**'],
      reason: 'The legacy audit log is replaced in the 2027 redesign.',
      expires: '2027-06-30',
    },
  ],
  failOn: 'error',
  verify: ['pnpm typecheck'],
};`}
          />
          <Text>In CI, run check, and keep the HTML report as an artifact:</Text>
          <CodeBlock
            language="bash"
            code={`npx oxygen-ui-analyzer check
npx oxygen-ui-analyzer build --output oxygen-report.html`}
          />
        </Section>

        <Section title="Try it on the demo">
          <Text>
            The repository includes samples/oxygen-ui-analyzer-demo, a small product with deliberate inconsistencies.
            The demo report linked above, and the Demo report and Demo fix stories on this page, are generated from it.
          </Text>
          <CodeBlock
            language="bash"
            code={`pnpm build
cd samples/oxygen-ui-analyzer-demo
pnpm oxygen
pnpm oxygen:fix`}
          />
        </Section>
      </Stack>
    </CenterContentLayout>
  ),
};

/**
 * The report the analyzer produces for the demo product.
 */
export const DemoReport: Story = {
  name: 'Demo report',
  render: function DemoReportStory() {
    const report = useDemoData<Report>('report.json');

    return (
      <CenterContentLayout>
        <DemoState state={report}>
          {() => {
            const { data } = report as { data: Report };
            const fixable = data.findings.filter((finding) => finding.fix.available && finding.fix.type === 'safe');

            return (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h2" gutterBottom>
                    Demo report
                  </Typography>
                  <Text>
                    The output of <code>pnpm oxygen</code> for {data.project.name}, checked against rules version{' '}
                    {data.ruleset.version}.
                  </Text>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <StatCard label="Findings" value={data.summary.findings} icon={<ListChecks />} iconColor="error" />
                  <StatCard
                    label="Files to update"
                    value={`${data.summary.filesWithFindings} of ${data.summary.filesAnalyzed}`}
                    icon={<FileCode />}
                    iconColor="warning"
                  />
                  <StatCard label="Fixable automatically" value={fixable.length} icon={<Wrench />} iconColor="success" />
                </Stack>

                <ListingTable.Container>
                  <ListingTable variant="table" density="compact">
                    <ListingTable.Head>
                      <ListingTable.Row>
                        <ListingTable.Cell>Location</ListingTable.Cell>
                        <ListingTable.Cell>Finding</ListingTable.Cell>
                        <ListingTable.Cell>Rule</ListingTable.Cell>
                        <ListingTable.Cell>Fix</ListingTable.Cell>
                      </ListingTable.Row>
                    </ListingTable.Head>
                    <ListingTable.Body>
                      {data.findings.map((finding) => (
                        <ListingTable.Row key={finding.id}>
                          <ListingTable.Cell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                              {finding.file}:{finding.line}
                            </Typography>
                          </ListingTable.Cell>
                          <ListingTable.Cell>
                            <Typography variant="body2">{finding.message}</Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="code"
                              sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                            >
                              {finding.evidence.trim()}
                            </Typography>
                          </ListingTable.Cell>
                          <ListingTable.Cell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                              {finding.ruleId}
                            </Typography>
                          </ListingTable.Cell>
                          <ListingTable.Cell>
                            <FixChip finding={finding} />
                          </ListingTable.Cell>
                        </ListingTable.Row>
                      ))}
                    </ListingTable.Body>
                  </ListingTable>
                </ListingTable.Container>
              </Stack>
            );
          }}
        </DemoState>
      </CenterContentLayout>
    );
  },
};

function DiffView({ diff }: { diff: string }) {
  const lines = diff.replace(/\n$/, '').split('\n');

  return (
    <Box
      component="pre"
      aria-label="Changes"
      sx={{
        m: 0,
        p: 1.5,
        overflowX: 'auto',
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        fontFamily: 'monospace',
        fontSize: '0.8125rem',
        lineHeight: 1.6,
      }}
    >
      {lines.map((line, index) => {
        const kind = line.startsWith('+++') || line.startsWith('---') ? 'file' : line[0];

        return (
          <Box
            key={index}
            component="span"
            sx={{
              display: 'block',
              px: 0.5,
              color: 'text.primary',
              fontWeight: kind === 'file' ? 600 : undefined,
              ...(kind === '+' && { bgcolor: (theme) => `rgba(${theme.vars?.palette.success.mainChannel ?? '46 125 50'} / 0.16)` }),
              ...(kind === '-' && { bgcolor: (theme) => `rgba(${theme.vars?.palette.error.mainChannel ?? '211 47 47'} / 0.16)` }),
              ...(kind === '@' && { color: 'text.secondary' }),
            }}
          >
            {line || ' '}
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * The fixes the analyzer would apply to the demo product.
 */
export const DemoFix: Story = {
  name: 'Demo fix',
  render: function DemoFixStory() {
    const plan = useDemoData<FixPlan>('fix-plan.json');

    return (
      <CenterContentLayout>
        <DemoState state={plan}>
          {() => {
            const { data } = plan as { data: FixPlan };
            const fixed = data.files.reduce((count, file) => count + file.findings.length, 0);
            const suggested = data.files.reduce((count, file) => count + file.suggested.length, 0);

            return (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h2" gutterBottom>
                    Demo fix
                  </Typography>
                  <Text>
                    The preview from <code>pnpm oxygen:fix --suggestions</code>: {fixed} findings in {data.files.length}{' '}
                    files can be fixed.{' '}
                    {suggested === 1
                      ? '1 of them is a suggested fix, which changes more than the import and needs review.'
                      : `${suggested} of them are suggested fixes, which change more than the import and need review.`}{' '}
                    Add --apply to write the changes.
                  </Text>
                </Box>

                {data.files.map((file) => (
                  <Box key={file.file}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontFamily: 'monospace' }}>
                      {file.file}
                    </Typography>
                    {file.suggested.length > 0 && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Includes a suggested fix: the DataGrid import, and every use of DataGrid and GridColDef.
                      </Typography>
                    )}
                    <DiffView diff={file.diff} />
                  </Box>
                ))}

                {data.unfixable.length > 0 && (
                  <Section title="Needs a manual change">
                    <Text>
                      These findings have no automatic or suggested fix. The message says what to use instead.{' '}
                      <code>pnpm oxygen:fix --ai</code> writes them, with each rule's guidance and the surrounding code,
                      to a plan for an AI coding assistant.
                    </Text>
                    <Box component="ul" sx={{ pl: 3, m: 0 }}>
                      {data.unfixable.map((finding) => (
                        <li key={finding.id}>
                          <Typography variant="body2">
                            <Box component="span" sx={{ fontFamily: 'monospace' }}>
                              {finding.file}:{finding.line}
                            </Box>{' '}
                            {finding.message}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </Section>
                )}
              </Stack>
            );
          }}
        </DemoState>
      </CenterContentLayout>
    );
  },
};

/**
 * The rules the analyzer checks, read from the current rule registry.
 */
export const Rules: Story = {
  render: function RulesStory() {
    const report = useDemoData<Report>('report.json');

    return (
      <CenterContentLayout>
        <DemoState state={report}>
          {() => {
            const { data } = report as { data: Report };

            return (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h2" gutterBottom>
                    Rules
                  </Typography>
                  <Text>
                    Rules version {data.ruleset.version}. Each rule is defined once in @wso2/oxygen-ui-rules. The
                    analyzer and the ESLint plugin check it, and the AI instructions that npx @wso2/oxygen-ui init
                    installs are generated from it.
                  </Text>
                </Box>

                <ListingTable.Container>
                  <ListingTable variant="table" density="compact">
                    <ListingTable.Head>
                      <ListingTable.Row>
                        <ListingTable.Cell>Rule</ListingTable.Cell>
                        <ListingTable.Cell>Category</ListingTable.Cell>
                        <ListingTable.Cell>Level</ListingTable.Cell>
                        <ListingTable.Cell>Fix</ListingTable.Cell>
                      </ListingTable.Row>
                    </ListingTable.Head>
                    <ListingTable.Body>
                      {data.rules.map((rule) => (
                        <ListingTable.Row key={rule.id}>
                          <ListingTable.Cell>
                            <Typography variant="body2">{rule.title}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                              {rule.id}
                            </Typography>
                          </ListingTable.Cell>
                          <ListingTable.Cell>{rule.category}</ListingTable.Cell>
                          <ListingTable.Cell>{rule.level}</ListingTable.Cell>
                          <ListingTable.Cell>{fixTypeLabel[rule.fix] ?? rule.fix}</ListingTable.Cell>
                        </ListingTable.Row>
                      ))}
                    </ListingTable.Body>
                  </ListingTable>
                </ListingTable.Container>

                <Section title="For Oxygen UI maintainers">
                  <Text>
                    When you add a component, package or guide to Oxygen UI, the rules must be updated too. The coverage
                    check fails until they are:
                  </Text>
                  <CodeBlock
                    language="bash"
                    code={`pnpm rules:coverage                         # check that the rules cover the library
pnpm rules:new --component ConfirmDialog    # add a catalog entry for a new export
pnpm rules:new --rule prefer-listing-table  # scaffold a new rule
pnpm rules:generate                         # update RULES.md and the API snapshot`}
                  />
                </Section>
              </Stack>
            );
          }}
        </DemoState>
      </CenterContentLayout>
    );
  },
};
