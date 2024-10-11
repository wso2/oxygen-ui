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
import type {ElementType, ReactElement, ReactNode, Ref} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Button from '../Button';
import Card from '../Card';
import type {CardProps, CardTypeMap} from '../Card';
import CardActions from '../CardActions';
import CardContent from '../CardContent';
import Typography from '../Typography';
import './action-card.scss';

export type ActionCardProps<C extends ElementType = ElementType> = CardProps<C> & {
  /**
   * The text to be displayed in the action button.
   */
  actionText: string;
  /**
   * The description of the card.
   */
  description: string;
  /**
   * The image to be displayed in the card.
   */
  image: ReactNode;
  /**
   * Callback method to be called when the action button is clicked.
   */
  onActionClick: () => void;
  /**
   * The title of the card.
   */
  title: string;
};

const COMPONENT_NAME: string = 'ActionCard';

/**
 * The Action Card component is an extended version of the `Card` component with an action button.
 *
 * Demos:
 *
 * - [Action Card (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/surfaces-action-card)
 *
 * API:
 *
 * - inherits [Card API](https://mui.com/material-ui/api/card/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Paper](https://mui.com/material-ui/api/card/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the ActionCard component.
 * @param ref - The ref to be forwarded to the Card component.
 * @returns The rendered ActionCard component.
 */
const ActionCard: OverridableComponent<CardTypeMap<ActionCardProps>> & WithWrapperProps = forwardRef(
  <C extends ElementType = ElementType>(
    {className, image, title, description, actionText, onActionClick, ...rest}: ActionCardProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const classes: string = clsx('oxygen-action-card', className);

    return (
      <Card ref={ref} className={classes} {...rest}>
        <CardContent>
          {image}
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onActionClick} variant="contained">
            {actionText}
          </Button>
        </CardActions>
      </Card>
    );
  },
) as OverridableComponent<CardTypeMap<ActionCardProps>> & WithWrapperProps;

ActionCard.displayName = composeComponentDisplayName(COMPONENT_NAME);
ActionCard.muiName = COMPONENT_NAME;

export default ActionCard;
