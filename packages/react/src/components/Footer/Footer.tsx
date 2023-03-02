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
import {useIsMobile} from '../../hooks';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box, {BoxProps} from '../Box';
import Container, {ContainerProps} from '../Container';
import Link, {LinkProps} from '../Link';
import Typography from '../Typography';
import './footer.scss';

export interface FooterProps extends BoxProps {
  /**
   * Copyright to display.
   */
  copyright?: ReactNode;
  /**
   * Footer links.
   */
  links?: LinkProps[];
  /**
   * Determine the max-width of the footer container.
   */
  maxWidth?: ContainerProps['maxWidth'];
}

const COMPONENT_NAME: string = 'Footer';

const Footer: FC<FooterProps> & WithWrapperProps = (props: FooterProps): ReactElement => {
  const {className, copyright, links, maxWidth, ...rest} = props;

  const isMobile: boolean = useIsMobile();

  const classes: string = clsx('oxygen-footer', {mobile: isMobile}, className);

  return (
    <Box component="footer" className={classes} {...rest}>
      <Container disableGutters maxWidth={maxWidth} className="oxygen-footer-container">
        {links !== undefined && Array.isArray(links) && links.length > 0 && (
          <Box className="oxygen-footer-links" fontSize="body2.fontSize">
            {links.map((link: LinkProps) => (
              <Link
                className="oxygen-footer-link"
                underline="none"
                target="_blank"
                rel="noopener"
                color="textSecondary"
                {...link}
              />
            ))}
          </Box>
        )}
        {copyright && (
          <Box className="oxygen-footer-links">
            <Box color="text.secondary">
              <Typography className="oxygen-footer-copyright" display="inline" variant="body2">
                {copyright}
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

Footer.displayName = composeComponentDisplayName(COMPONENT_NAME);
Footer.muiName = COMPONENT_NAME;
Footer.defaultProps = {};

export default Footer;
