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

import {OverridableComponent} from '@mui/material/OverridableComponent';
import {
  ElementType,
  forwardRef,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import './droppable-container.scss';

type DroppableNode = any;

/**
 * Props interface of {@link DroppableContainer}
 * TODO: Extending `any` as a temp workaround to overcome the TS issue.
 * Tracker: https://github.com/wso2/oxygen-ui/issues/326.
 */
export type DroppableContainerProps<C extends ElementType = ElementType> = BoxProps<C> & {
  /**
   * Function to render the children of the droppable container.
   *
   * @param props - The props to be passed to the children.
   * @returns The rendered children.
   */
  children: (props: {
    dragHandlers: DragHandlers;
    getDragItemProps: GetDragItemProps;
    nodes: DroppableNode[];
  }) => ReactNode;
  /**
   * The nodes to be rendered inside the droppable container.
   */
  nodes: DroppableNode[];
  /**
   * Callback to handle the order change of nodes.
   *
   * @param newOrder - The new order of nodes.
   */
  onOrderChange?: (newOrder: DroppableNode[]) => void;
} & any;

/**
 * Interface for the props of a draggable item.
 */
export interface DragItemProps {
  /**
   * The class name to be applied to the draggable item.
   */
  className?: string;
  /**
   * Indicates whether the item is draggable.
   */
  draggable: boolean;
  /**
   * Function to handle the drag end event.
   */
  onDragEnd: () => void;
  /**
   * Function to handle the drag enter event.
   */
  onDragEnter: () => void;
  /**
   * Function to handle the drag start event.
   */
  onDragStart: () => void;
}

/**
 * Type for the function to get the props of a draggable item.
 *
 * @param index - The index of the draggable item.
 * @returns The props of the draggable item.
 */
export type GetDragItemProps = (index: number) => DragItemProps;

/**
 * Interface for the drag handlers.
 */
export interface DragHandlers {
  /**
   * Function to handle the drag end event.
   */
  onDragEnd: () => void;
  /**
   * Function to handle the drag enter event.
   *
   * @param index - The index of the item being dragged over.
   */
  onDragEnter: (index: number) => void;
  /**
   * Function to handle the drag start event.
   *
   * @param index - The index of the item being dragged.
   */
  onDragStart: (index: number) => void;
}

/**
 * DroppableContainer component can be used to handle the re-ordering of nodes within a drag-and-drop context.
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
 * @param props - The props for the DroppableContainer component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered DroppableContainer component.
 */
const DroppableContainer: OverridableComponent<BoxTypeMap<DroppableContainerProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {nodes, onOrderChange, children, ...rest}: DroppableContainerProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const [orderedNodes, setOrderedNodes] = useState<DroppableNode[]>([]);
    const dragNodeIndex: MutableRefObject<number> = useRef<number | null>(null);
    const dragOverNodeIndex: MutableRefObject<number> = useRef<number | null>(null);

    /**
     * Takes a deep copy of the nodes and sets them as the ordered nodes.
     */
    useEffect(() => setOrderedNodes(JSON.parse(JSON.stringify(nodes))), [nodes]);

    /**
     * Handles the drag start event.
     *
     * @param index - The index of the item being dragged.
     */
    const handleDragStart = (index: number): void => {
      dragNodeIndex.current = index;
    };

    /**
     * Handles the drag enter event.
     *
     * @param index - The index of the item being dragged over.
     */
    const handleDragEnter = (index: number): void => {
      dragOverNodeIndex.current = index;
    };

    /**
     * Handles the drag end event.
     */
    const handleDragEnd = (): void => {
      if (
        dragNodeIndex.current !== null &&
        dragOverNodeIndex.current !== null &&
        dragNodeIndex.current !== dragOverNodeIndex.current
      ) {
        const updatedNodes: DroppableNode[] = [...orderedNodes];
        const [draggedItem] = updatedNodes.splice(dragNodeIndex.current, 1);

        updatedNodes.splice(dragOverNodeIndex.current, 0, draggedItem);

        setOrderedNodes(updatedNodes);
        if (onOrderChange) {
          onOrderChange(updatedNodes);
        }
      }

      dragNodeIndex.current = null;
      dragOverNodeIndex.current = null;
    };

    const dragHandlers: DragHandlers = {
      onDragEnd: handleDragEnd,
      onDragEnter: handleDragEnter,
      onDragStart: handleDragStart,
    };

    const getDragItemProps = (index: number): DragItemProps => ({
      className: 'OxygenDraggableItem-root',
      draggable: true,
      onDragEnd: handleDragEnd,
      onDragEnter: () => handleDragEnter(index),
      onDragStart: () => handleDragStart(index),
    });

    return (
      <Box ref={ref} className="OxygenDroppableContainer-root" {...rest}>
        {children({dragHandlers, getDragItemProps, nodes: orderedNodes})}
      </Box>
    );
  },
) as OverridableComponent<BoxTypeMap<DroppableContainerProps>>;

export default DroppableContainer;
