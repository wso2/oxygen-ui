/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
import {forwardRef, ForwardRefExoticComponent, MutableRefObject, ReactElement, useState} from 'react';
import type {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box from '../Box';
import Chip from '../Chip';
import List from '../List';
import ListItemButton from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import type {NavbarProps} from '../Navbar/Navbar';
import type {NavbarItemProps} from '../NavbarItem';
import Tooltip from '../Tooltip';
import './collapsible-navbar-item.scss';

export interface CollapsibleNavbarItemProps extends NavbarItemProps, Pick<NavbarProps, 'fill' | 'open'> {
  /**
   * Is the item expanded.
   */
  expanded?: boolean;
  /**
   * Set of sub items.
   */
  items: NavbarItemProps[];
}

const COMPONENT_NAME: string = 'CollapsibleNavbarItem';

const CollapsibleNavbarItem: ForwardRefExoticComponent<CollapsibleNavbarItemProps> & WithWrapperProps = forwardRef(
  (
    {
      className,
      component,
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
    }: CollapsibleNavbarItemProps,
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

    const handleItemClick = (): void => {
      if (onClick) {
        onClick();
      }
      setItemExpanded((prevState: boolean) => !prevState);
    };

    const getIsItemSelected: boolean = Boolean(items?.find((item: NavbarItemProps) => item['selected'] === true));

    const renderChevron = (): ReactElement => (itemExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />);

    return (
      <Box component={component} className={clsx(classes, {expanded: itemExpanded})} ref={ref}>
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
