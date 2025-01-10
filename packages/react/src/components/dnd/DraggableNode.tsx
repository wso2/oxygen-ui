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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {DragEvent, forwardRef, ElementType, Ref, ReactElement} from 'react';
import useDnD from './useDnD';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import './draggable-node.scss';

/**
 * Props interface of {@link DraggableNode}
 */
export type DraggableNodeProps<C extends ElementType = ElementType> = BoxProps<C> & {
  /**
   * The node that is being dragged.
   */
  node: any;
};

/**
 * DraggableNode component can be used to make any node draggable within a drag-and-drop context.
 *
 * Demos:
 *
 * - [Drag & Drop (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-drag-and-drop--overview)
 *
 * API:
 *
 * - inherits [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the DraggableNode component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered DraggableNode component.
 */
const DraggableNode: OverridableComponent<BoxTypeMap<DraggableNodeProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, children, node, ...rest}: DraggableNodeProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const {setNode} = useDnD();

    const onDragStart = (event: DragEvent, draggingNode: any): void => {
      setNode(draggingNode);

      const {dataTransfer} = event;
      dataTransfer.effectAllowed = 'move';
      dataTransfer.setData('application/json', JSON.stringify(draggingNode));
    };

    return (
      <Box
        ref={ref}
        draggable
        onDragStart={(event: DragEvent): void => onDragStart(event, node)}
        className={clsx('OxygenDraggableNode-root', className)}
        {...rest}
      >
        {children}
      </Box>
    );
  },
) as OverridableComponent<BoxTypeMap<DraggableNodeProps>>;

export default DraggableNode;
