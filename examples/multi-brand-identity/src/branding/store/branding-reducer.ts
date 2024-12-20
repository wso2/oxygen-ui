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

import {Theme} from '@oxygen-ui/react';
import AsgardeoTheme from '../themes/AsgardeoTheme';
import BallerinaTheme from '../themes/BallerinaTheme';
import ChoreoTheme from '../themes/ChoreoTheme';
import DefaultTheme from '../themes/DefaultTheme';

export enum BrandingActions {
  ChangeTheme = 'ChangeTheme',
}

const brandingReducer = (theme: Theme, action: any): Theme => {
  switch (action.type) {
    case BrandingActions.ChangeTheme: {
      if (action.brand === 'WSO2') {
        return DefaultTheme;
      }
      if (action.brand === 'Choreo') {
        return ChoreoTheme;
      }
      if (action.brand === 'Asgardeo') {
        return AsgardeoTheme;
      }
      if (action.brand === 'Ballerina') {
        return BallerinaTheme;
      }

      if (action.theme) {
        return action.theme;
      }

      return theme;
    }
    default: {
      return theme;
    }
  }
};

export default brandingReducer;
