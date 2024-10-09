/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com).
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

// eslint-disable-next-line import/no-extraneous-dependencies
import {ReportHandler} from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import('web-vitals').then(
      ({
        getCLS,
        getFID,
        getFCP,
        getLCP,
        getTTFB,
      }: {
        getCLS: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
        getFCP: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
        getFID: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
        getLCP: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void;
        getTTFB: (onReport: ReportHandler) => void;
      }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      },
    );
  }
};

export default reportWebVitals;
