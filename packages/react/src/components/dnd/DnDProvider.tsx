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

import {PropsWithChildren, ReactElement, useMemo, useState} from 'react';
import DnDContext, {DnDContextProps} from './DnDContext';

/**
 * Props interface of {@link DnDProvider}
 */
export type DnDProviderProps = unknown;

/**
 * This component provides Drag & Drop context to its children.
 *
 * Demos:
 *
 * - [Drag & Drop (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-drag-and-drop--overview)
 *
 * API:
 *
 * - [DnDProvider API (Oxygen UI)](// TODO: TBD)
 *
 * @remarks
 * - ✨ This is a custom provider that is not available in the Material-UI library.
 *
 * @param props - The props for the DnDProvider component.
 * @returns The rendered DnDProvider component.
 */
const DnDProvider = ({children}: PropsWithChildren<DnDProviderProps>): ReactElement => {
  const [node, setNode] = useState<any>(null);

  /**
   * Generates a unique component ID for the node.
   * @returns Unique component ID.
   */
  const generateComponentId = (prefix: string = 'Node'): string =>
    `dnd-${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  const contextValue: DnDContextProps = useMemo(() => ({generateComponentId, node, setNode}), [node]);

  return <DnDContext.Provider value={contextValue}>{children}</DnDContext.Provider>;
};

export default DnDProvider;
