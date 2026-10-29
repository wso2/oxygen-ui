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

import {useEffect, useState} from 'react';
import type {Report} from './data.js';

export type LiveStatus = 'static' | 'connecting' | 'live' | 'analyzing' | 'disconnected';

/**
 * The report to show. In a report served by `oxygen-ui-analyzer dev`, it is updated whenever the
 * project changes; in a report written by `build`, it stays as embedded.
 */
export function useReport(initial: Report, live: boolean): {report: Report; status: LiveStatus} {
  const [report, setReport] = useState(initial);
  const [status, setStatus] = useState<LiveStatus>(live ? 'connecting' : 'static');

  useEffect(() => {
    if (!live || typeof EventSource === 'undefined') {
      return undefined;
    }

    const events = new EventSource('./events');

    events.addEventListener('open', () => setStatus('live'));
    events.addEventListener('error', () => setStatus('disconnected'));
    events.addEventListener('analyzing', () => setStatus('analyzing'));
    events.addEventListener('report', (event) => {
      setReport(JSON.parse((event as MessageEvent<string>).data) as Report);
      setStatus('live');
    });

    return () => events.close();
  }, [live]);

  return {report, status};
}
