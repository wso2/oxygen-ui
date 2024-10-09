/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import {render} from '@unit-testing';
import {ReactElement} from 'react';
import ActionCard from '../ActionCard';

const onActionClick: jest.Mock<any, any> = jest.fn();

const ActionCardTestComponent: ReactElement = (
  <ActionCard
    title="Secure your account by adding an extra layer of security"
    description={
      'Configure additional authentications to sign in easily or to ' +
      'add an extra layer of security to your account.'
    }
    actionText="Setup MFA"
    onActionClick={onActionClick}
    image={<img src="/assets/images/action-card-image.svg" alt="action card" />}
  />
);

describe('ActionCard', () => {
  it('should render successfully', () => {
    const {baseElement} = render(ActionCardTestComponent);
    expect(baseElement).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const {baseElement} = render(ActionCardTestComponent);
    expect(baseElement).toMatchSnapshot();
  });
});
