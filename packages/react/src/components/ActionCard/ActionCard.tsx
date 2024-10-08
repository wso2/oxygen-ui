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
import {WithWrapperProps} from '../../models';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Button from '../Button';
import Card, {CardProps} from '../Card';
import CardActions from '../CardActions';
import CardContent from '../CardContent';
import Typography from '../Typography';
import './action-card.scss';

export interface ActionCardProps extends CardProps {
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
}

const COMPONENT_NAME: string = 'ActionCard';

const ActionCard: FC<ActionCardProps> & WithWrapperProps = (props: ActionCardProps): ReactElement => {
  const {className, image, title, description, actionText, onActionClick, ...rest} = props;

  const classes: string = clsx('oxygen-action-card', className);

  return (
    <Card className={classes} {...rest}>
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
};

ActionCard.displayName = composeComponentDisplayName(COMPONENT_NAME);
ActionCard.muiName = COMPONENT_NAME;
ActionCard.defaultProps = {};

export default ActionCard;
