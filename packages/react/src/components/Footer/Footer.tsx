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

import type {OverridableComponent} from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ElementType, Ref, ReactElement, ReactNode} from 'react';
import {useIsMobile} from '../../hooks/use-is-mobile';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import Container from '../Container';
import type {ContainerProps} from '../Container';
import Link from '../Link';
import type {LinkProps} from '../Link';
import Typography from '../Typography';
import './footer.scss';

export type FooterProps<C extends ElementType = ElementType> = BoxProps<C> & {
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
};

/**
 * The Footers display a set of links and a copyright at the bottom of the application.
 *
 * Demos:
 *
 * - [Footer (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/navigation-footer)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Footer component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered Footer component.
 */
const Footer: OverridableComponent<BoxTypeMap<FooterProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {className, copyright, component = 'footer' as C, links, maxWidth, ...rest}: FooterProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const isMobile: boolean = useIsMobile();

    const classes: string = clsx('oxygen-footer', {mobile: isMobile}, className);

    return (
      <Box ref={ref} component={component} className={classes} {...rest}>
        <Container disableGutters maxWidth={maxWidth} className="oxygen-footer-container">
          {links !== undefined && Array.isArray(links) && links.length > 0 && (
            <Box className="oxygen-footer-links" fontSize="body2.fontSize">
              {links.map((link: LinkProps) => (
                <Link
                  key={link.id}
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
  },
) as OverridableComponent<BoxTypeMap<FooterProps>>;

export default Footer;
