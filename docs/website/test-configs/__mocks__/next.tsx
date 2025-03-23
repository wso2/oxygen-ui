/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import {ImageProps} from 'next/image';
import {NextRouter} from 'next/router';
import {ReactElement} from 'react';

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({children}: {children: ReactElement}): ReactElement => <div data-testid="head">{children}</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps): ReactElement => (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-testid="next-image" alt={props.alt} src={props.src as string} />
  ),
}));

jest.mock('next/router', () => ({
  useRouter: (): Partial<NextRouter> => ({
    asPath: '/',
    basePath: '/base',
    pathname: '/',
    query: {},
    route: '/',
  }),
}));
