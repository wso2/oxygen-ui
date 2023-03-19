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

import {LinkIcon, CheckCircleIcon} from '@oxygen-ui/react-icons';
import clsx from 'clsx';
import {FC, ReactElement, ReactNode} from 'react';
import {WithWrapperProps} from '../../models';
import Box from '../Box';
import Button from '../Button';
import Card, {CardProps} from '../Card';
import CardHeader from '../CardHeader';
import './connector-card.scss';

export interface ConnectorCardProps extends Omit<CardProps, 'image' | 'title'> {
  /**
   * The action button.
   */
  action?: {
    /**
     * Callback method to be called when the action button is clicked.
     * @example () => { console.log('Connected') }
     */
    onClick: () => void;
    /**
     * The text to be displayed in the action button.
     * @example 'Connect'
     */
    text: string;
  };
  /**
   * Whether the connector is connected or not.
   * @default false
   */
  connected: boolean;
  /**
   * The description of the card.
   */
  description?: ReactNode;
  /**
   * The image to be displayed in the card.
   */
  image?: ReactNode;
  /**
   * The title of the card.
   */
  title: ReactNode;
}

const COMPONENT_NAME: string = 'ConnectorCard';

const ConnectorCard: FC<ConnectorCardProps> & WithWrapperProps = (props: ConnectorCardProps): ReactElement => {
  const {className, connected, image, title, description, action, ...rest} = props;

  const classes: string = clsx('oxygen-connector-card', className);

  return (
    <Card variant="outlined" className={classes} {...rest}>
      <CardHeader
        classes={{action: 'oxygen-connector-card-status-icon', avatar: 'oxygen-connector-card-image'}}
        avatar={image}
        action={connected && <CheckCircleIcon />}
        title={title}
        subheader={
          <Box>
            <Box className="oxygen-connector-card-description">{description}</Box>
            {action && (
              <Button
                className={clsx('oxygen-connector-button', {connected})}
                onClick={action.onClick}
                variant={connected ? 'text' : 'outlined'}
                startIcon={<LinkIcon />}
              >
                {action.text}
              </Button>
            )}
          </Box>
        }
      />
    </Card>
  );
};

ConnectorCard.displayName = COMPONENT_NAME;
ConnectorCard.muiName = COMPONENT_NAME;
ConnectorCard.defaultProps = {};

export default ConnectorCard;
