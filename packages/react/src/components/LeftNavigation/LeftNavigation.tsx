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
import {FC, isValidElement, ReactElement} from 'react';
import './left-navigation.scss';
import {MuiWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box, {BoxProps} from '../Box';
import LeftNavigationItem, {LeftNavigationItemProps} from '../LeftNavigationItem';
import List from '../List';
import Tooltip from '../Tooltip';

export interface LeftNavigationProps extends BoxProps {
  listItems?: LeftNavigationItemProps[] | ReactElement;
  open?: boolean;
}
const COMPONENT_NAME: string = 'LeftNavigation';

const LeftNavigation: FC<LeftNavigationProps> & MuiWrapperProps = (props: LeftNavigationProps): ReactElement => {
  const {className, open, listItems, ...rest} = props;
  const classes: string = clsx(
    'oxygen-left-navigation',
    {
      expanded: open,
    },
    className,
  );

  return (
    <Box role="presentation" className={classes} {...rest}>
      {isValidElement(listItems) ? (
        listItems
      ) : (
        <List>
          {listItems?.map((item: LeftNavigationItemProps) => {
            const {label, onClick, selected, icon, ...itemProps} = item;

            return (
              <Tooltip title={item.label} placement="right" disableHoverListener={open}>
                <LeftNavigationItem
                  open={open}
                  selected={selected}
                  onClick={onClick}
                  label={label}
                  icon={icon}
                  {...itemProps}
                />
              </Tooltip>
            );
          })}
        </List>
      )}
    </Box>
  );
};

LeftNavigation.displayName = composeComponentDisplayName(COMPONENT_NAME);
LeftNavigation.muiName = COMPONENT_NAME;

export default LeftNavigation;
