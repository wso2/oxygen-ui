import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiTooltip, {TooltipProps as MuiTooltipProps} from '@mui/material/Tooltip';
import {composeComponentDisplayName} from '../../utils';
import {WithWrapperProps} from '../../models';

export interface TooltipProps extends MuiTooltipProps {}

const COMPONENT_NAME: string = 'Tooltip';

const Tooltip: FC<TooltipProps> & WithWrapperProps = (props: TooltipProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-tooltip', className);

  return <MuiTooltip className={classes} {...rest} />;
};

Tooltip.displayName = composeComponentDisplayName(COMPONENT_NAME);
Tooltip.muiName = COMPONENT_NAME;
Tooltip.defaultProps = {};

export default Tooltip;
