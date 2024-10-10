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

import MuiCollapse from '@mui/material/Collapse';
import {ChevronDownIcon, ChevronUpIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {forwardRef, useState} from 'react';
import type {ElementType, ForwardRefExoticComponent, MouseEvent, MutableRefObject, ReactElement} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box from '../Box';
import Chip from '../Chip';
import List from '../List';
import ListItemButton from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import type {NavbarProps} from '../Navbar';
import type {NavbarItemProps} from '../NavbarItem';
import Tooltip from '../Tooltip';
import './collapsible-navbar-item.scss';

export type CollapsibleNavbarItemProps<C extends ElementType = ElementType> = NavbarItemProps<C> &
  Pick<NavbarProps, 'fill' | 'open'> & {
    /**
     * Is the item expanded.
     */
    expanded?: boolean;
    /**
     * Set of sub items.
     */
    items: NavbarItemProps[];
  };

const COMPONENT_NAME: string = 'CollapsibleNavbarItem';

/**
 * The Collapsible Navbar Item is a custom component that is used to render a collapsible item in the Navbar.
 *
 * Demos:
 *
 * - [Collapsible Navbar Item (Oxygen UI)] (https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-collapsible-navbar-item)
 *
 * API:
 *
 * - inherits [ListItemButton API](https://mui.com/material-ui/api/list-item-button/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the CollapsibleNavbarItem component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered CollapsibleNavbarItem component.
 */
const CollapsibleNavbarItem: ForwardRefExoticComponent<CollapsibleNavbarItemProps> & WithWrapperProps = forwardRef(
  <C extends ElementType>(
    {
      className,
      expanded,
      fill,
      icon,
      id,
      open = true,
      label,
      onClick,
      items,
      tag,
      tagClassName,
      ...rest
    }: CollapsibleNavbarItemProps<C>,
    ref: MutableRefObject<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx(
      'oxygen-collapsible-navbar-item',
      {
        [`${fill}`]: fill,
        fill,
        open,
      },
      className,
    );

    const [itemExpanded, setItemExpanded] = useState<boolean>(expanded || false);

    const handleItemClick = (e: MouseEvent<HTMLDivElement>): void => {
      if (onClick) {
        onClick(e);
      }

      setItemExpanded((prevState: boolean) => !prevState);
    };

    const getIsItemSelected: boolean = Boolean(items?.find((item: NavbarItemProps) => item['selected'] === true));

    const renderChevron = (): ReactElement => (itemExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />);

    return (
      <Box ref={ref} className={clsx(classes, {expanded: itemExpanded})}>
        <Tooltip placement="right" title={!open && label}>
          <ListItemButton
            selected={getIsItemSelected}
            className={clsx({selected: getIsItemSelected}, {expanded: itemExpanded})}
            onClick={handleItemClick}
            {...rest}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
            <Box className="oxygen-collapsible-navbar-item-chevrons"> {renderChevron()} </Box>
          </ListItemButton>
        </Tooltip>
        <MuiCollapse in={itemExpanded} timeout="auto" unmountOnExit>
          <List>
            {items?.map(
              ({
                icon: subItemIcon,
                selected: subItemSelected,
                label: subItemName,
                onClick: subItemOnClick,
                tag: subItemTag,
                tagClassName: subItemTagClassName,
                ...otherSubItemProps
              }: NavbarItemProps) => (
                <Tooltip placement="right" title={!open && subItemName}>
                  <ListItemButton
                    component="li"
                    selected={subItemSelected}
                    className={clsx('oxygen-list-sub-item-button', {selected: subItemSelected})}
                    onClick={subItemOnClick}
                    {...otherSubItemProps}
                  >
                    <ListItemIcon>{subItemIcon}</ListItemIcon>
                    <ListItemText primary={subItemName} />
                    {open && subItemTag ? (
                      <Chip
                        label={subItemTag}
                        className={clsx(`oxygen-chip-${subItemTag.toLowerCase()}`, subItemTagClassName)}
                        classes={{label: 'oxygen-collapsible-navbar-item-chip-label'}}
                      />
                    ) : null}
                  </ListItemButton>
                </Tooltip>
              ),
            )}
          </List>
        </MuiCollapse>
      </Box>
    );
  },
) as ForwardRefExoticComponent<CollapsibleNavbarItemProps> & WithWrapperProps;

CollapsibleNavbarItem.displayName = composeComponentDisplayName(COMPONENT_NAME);
CollapsibleNavbarItem.muiName = COMPONENT_NAME;

export default CollapsibleNavbarItem;
