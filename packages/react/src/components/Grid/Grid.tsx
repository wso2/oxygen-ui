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

import MuiGrid, {Grid2Props as MuiGridProps} from '@mui/material/Unstable_Grid2';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import {WithWrapperProps} from '../../models';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import './grid.scss';

export type GridProps = MuiGridProps;

const COMPONENT_NAME: string = 'Grid';

const Grid: FC<GridProps> & WithWrapperProps = (props: GridProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-grid', className);

  return <MuiGrid className={classes} {...rest} />;
};

Grid.displayName = composeComponentDisplayName(COMPONENT_NAME);
Grid.muiName = COMPONENT_NAME;
Grid.defaultProps = {};

export default Grid;
