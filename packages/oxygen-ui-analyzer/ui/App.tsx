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

import {
  Alert,
  Box,
  Chip,
  ColorSchemeToggle,
  Header,
  OxygenTheme,
  OxygenUIThemeProvider,
  PageContent,
  PageTitle,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@wso2/oxygen-ui';
import {useEffect, useMemo, useState} from 'react';
import AcceptedList from './components/AcceptedList.js';
import FileDetail from './components/FileDetail.js';
import FileList from './components/FileList.js';
import FiltersBar from './components/FiltersBar.js';
import {RuleDetail, RuleList} from './components/RuleViews.js';
import Summary from './components/Summary.js';
import {
  DEFAULT_FILTERS,
  filterFindings,
  parseRoute,
  routeToHash,
  summarizeFiles,
  type Filters,
  type Report,
  type Route,
} from './data.js';
import {useReport, type LiveStatus} from './live.js';

const PRODUCT = 'Oxygen UI report';

const LIVE_LABEL: Record<Exclude<LiveStatus, 'static'>, {label: string; color: 'success' | 'info' | 'warning' | 'default'}> = {
  connecting: {label: 'Connecting', color: 'default'},
  live: {label: 'Live', color: 'success'},
  analyzing: {label: 'Analyzing', color: 'info'},
  disconnected: {label: 'Disconnected', color: 'warning'},
};

function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo({top: 0});
    };

    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

function pageTitle(route: Route, report: Report): string {
  switch (route.view) {
    case 'file':
      return `${route.file} | ${PRODUCT}`;
    case 'rule':
      return `${report.rules.find((rule) => rule.id === route.id)?.title ?? route.id} | ${PRODUCT}`;
    case 'rules':
      return `Rules | ${PRODUCT}`;
    case 'accepted':
      return `Accepted findings | ${PRODUCT}`;
    default:
      return `${report.project.name} | ${PRODUCT}`;
  }
}

export default function App({initialReport, live}: {initialReport: Report; live: boolean}) {
  const {report, status} = useReport(initialReport, live);
  const route = useRoute();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => filterFindings(report.findings, filters), [report, filters]);
  const files = useMemo(() => summarizeFiles(filtered), [filtered]);
  const tab = route.view === 'rules' || route.view === 'rule' ? 'rules' : route.view === 'accepted' ? 'accepted' : 'files';
  const generatedAt = new Date(report.generatedAt);

  return (
    <OxygenUIThemeProvider theme={OxygenTheme}>
      <title>{pageTitle(route, report)}</title>
      <Header>
        <Header.Brand>
          <Header.BrandTitle>{PRODUCT}</Header.BrandTitle>
        </Header.Brand>
        <Header.Spacer />
        <Header.Actions>
          {status !== 'static' && (
            <Chip label={LIVE_LABEL[status].label} color={LIVE_LABEL[status].color} size="small" variant="outlined" />
          )}
          <ColorSchemeToggle />
        </Header.Actions>
      </Header>

      <Box component="main">
        <PageContent>
          <Stack spacing={3}>
            <PageTitle>
              <PageTitle.Header>{report.project.name}</PageTitle.Header>
              <PageTitle.SubHeader>
                Checked against Oxygen UI rules {report.ruleset.version} on {generatedAt.toLocaleString()}
              </PageTitle.SubHeader>
            </PageTitle>

            <Summary report={report} />

            {report.notices.map((notice) => (
              <Alert key={notice.message} severity={notice.level}>
                {notice.message}
              </Alert>
            ))}

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                value={tab}
                aria-label="Report sections"
                textColor="inherit"
                // Oxygen's primary orange and dimmed text do not reach 4.5:1 contrast as tab labels.
                sx={{'& .MuiTab-root': {color: 'text.secondary', opacity: 1}, '& .MuiTab-root.Mui-selected': {color: 'text.primary'}}}
              >
                <Tab value="files" label={`Files (${report.summary.filesWithFindings})`} href={routeToHash({view: 'files'})} component="a" />
                <Tab value="rules" label={`Rules (${report.rules.length})`} href={routeToHash({view: 'rules'})} component="a" />
                <Tab
                  value="accepted"
                  label={`Accepted (${report.suppressed.length})`}
                  href={routeToHash({view: 'accepted'})}
                  component="a"
                />
              </Tabs>
            </Box>

            {tab === 'files' && (
              <Stack spacing={2}>
                {report.findings.length === 0 ? (
                  <Alert severity="success">No findings. The project follows every Oxygen UI rule that was checked.</Alert>
                ) : (
                  <>
                    <FiltersBar report={report} filters={filters} onChange={setFilters} />
                    {route.view === 'file' ? (
                      <FileDetail
                        file={route.file}
                        findings={filtered.filter((finding) => finding.file === route.file)}
                        rules={report.rules}
                      />
                    ) : (
                      <FileList files={files} showNew={Boolean(report.baseline)} />
                    )}
                  </>
                )}

                {route.view === 'files' && report.errors.length > 0 && (
                  <Alert severity="warning">
                    <Typography variant="body2" sx={{mb: 1}}>
                      These files could not be analyzed, so they may have findings that are not shown:
                    </Typography>
                    <Box component="ul" sx={{pl: 2, m: 0}}>
                      {report.errors.map((error) => (
                        <li key={error.file}>
                          <Typography variant="body2">
                            <Box component="span" sx={{fontFamily: 'monospace'}}>
                              {error.file}
                              {error.line ? `:${error.line}` : ''}
                            </Box>{' '}
                            {error.message}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </Alert>
                )}
              </Stack>
            )}

            {route.view === 'rules' && <RuleList rules={report.rules} />}
            {route.view === 'accepted' && <AcceptedList findings={report.suppressed} />}
            {route.view === 'rule' && (
              <RuleDetail
                rule={report.rules.find((rule) => rule.id === route.id)}
                findings={report.findings.filter((finding) => finding.ruleId === route.id)}
              />
            )}
          </Stack>
        </PageContent>
      </Box>
    </OxygenUIThemeProvider>
  );
}
