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

import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, ForwardRefExoticComponent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import type {BoxProps} from '../Box';
import Box from '../Box';
import './tab-panel.scss';

export type TabPanelProps<C extends ElementType = ElementType> = BoxProps<C> & {
  /*
   * The index of the corresponding `TabPanel`.
   */
  index: number;
  /*
   * The value of the selected `TabPanel`.
   */
  value: number;
};

const COMPONENT_NAME: string = 'TabPanel';

/**
 * TabPanel component can be used with Tabs component to implement the content of the tab views.
 *
 * Demos:
 *
 * - [TabPanel (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-tab-panel--overview)
 *
 * API:
 *
 * - inherits [Card API](https://mui.com/material-ui/api/card/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the TabPanel component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered TabPanel component.
 */
const TabPanel: ForwardRefExoticComponent<TabPanelProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>(
    {className, children, value, index, ...rest}: TabPanelProps<C>,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-tab-panel', className);

    return (
      <Box ref={ref} className={classes} role="tabpanel" hidden={value !== index} {...rest}>
        {value === index && <Box>{children}</Box>}
      </Box>
    );
  },
) as ForwardRefExoticComponent<TabPanelProps> & WithWrapperProps;

TabPanel.displayName = composeComponentDisplayName(COMPONENT_NAME);
TabPanel.muiName = COMPONENT_NAME;

export default TabPanel;
