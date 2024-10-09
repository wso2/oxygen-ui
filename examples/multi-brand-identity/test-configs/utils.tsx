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

import {ThemeProvider} from '@oxygen-ui/react';
import {RenderResult, render as rtlRender, RenderOptions} from '@testing-library/react';
import {ComponentType, PropsWithChildren, ReactElement} from 'react';

/**
 * Custom render method to includes things like global context providers, data stores, etc.
 * @see {@link https://testing-library.com/docs/react-testing-library/setup#custom-render} for more info.
 *
 * @param ui - Component to render.
 * @param renderOptions - Render options.
 *
 * @return {RenderResult}
 */
const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  const Wrapper = (props: PropsWithChildren<ComponentType>): ReactElement => {
    const {children} = props;

    return <ThemeProvider>{children}</ThemeProvider>;
  };

  return rtlRender(ui, {wrapper: Wrapper as any, ...options});
};

// re-export everything
export * from '@testing-library/react';
// override render method
export {render};
