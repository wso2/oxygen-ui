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

import {PACKAGE_NAME} from '../constants';

/**
 * [IMPORTANT] Temporarily disabled due to the following issues with regards to composition.
 *  - https://github.com/wso2/oxygen-ui/issues/288
 *  - https://github.com/mui/material-ui/issues/32420#issuecomment-2410430433
 *
 * TODO: Consider and bring back once a solution is sorted out.
 * We may not even need this.
 */
const composeComponentDisplayName = (componentName: string): string => `${PACKAGE_NAME}/${componentName}`;

export default composeComponentDisplayName;
