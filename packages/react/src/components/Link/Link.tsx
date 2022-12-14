import React, {FC, ReactElement} from 'react';
import clsx from 'clsx';
import MuiLink, {LinkProps as MuiLinkProps} from '@mui/material/Link';
import {composeComponentDisplayName} from '../../utils';
import {WithWrapperProps} from '../../models';

export interface LinkProps extends MuiLinkProps {}

const COMPONENT_NAME: string = 'Link';

const Link: FC<LinkProps> & WithWrapperProps = (props: LinkProps): ReactElement => {
  const {className, ...rest} = props;

  const classes: string = clsx('oxygen-link', className);

  return <MuiLink className={classes} underline="hover" {...rest} />;
};

Link.displayName = composeComponentDisplayName(COMPONENT_NAME);
Link.muiName = COMPONENT_NAME;
Link.defaultProps = {};

export default Link;
