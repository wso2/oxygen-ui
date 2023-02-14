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

import clsx from 'clsx';
import {FC, ReactElement, ReactNode} from 'react';
import {MuiWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import ListItemButton, {ListItemButtonProps} from '../ListItemButton';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import './left-navigation-item.scss';

export interface LeftNavigationItemProps extends ListItemButtonProps {
  icon?: ReactNode;
  iconSelected?: ReactNode;
  label?: ReactNode;
  onClick?: () => void;
  open?: boolean;
  selected?: boolean;
}

const COMPONENT_NAME: string = 'LeftNavigationItem';

const LeftNavigationItem: FC<LeftNavigationItemProps> & MuiWrapperProps = (
  props: LeftNavigationItemProps,
): ReactElement => {
  const {className, icon, iconSelected, label, onClick, selected, open, ...rest} = props;
  const classes: string = clsx(
    'oxygen-left-navigation-item',
    {
      expanded: open,
    },
    className,
  );

  return (
    <ListItemButton selected={selected} className={classes} onClick={onClick} {...rest}>
      <ListItemIcon>{selected ? iconSelected ?? icon : icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  );
};

LeftNavigationItem.displayName = composeComponentDisplayName(COMPONENT_NAME);
LeftNavigationItem.muiName = COMPONENT_NAME;

export default LeftNavigationItem;
