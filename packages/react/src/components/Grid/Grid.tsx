import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiGrid, {Grid2Props as MuiGridProps} from '@mui/material/Unstable_Grid2';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';

export interface GridProps extends MuiGridProps {}

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
