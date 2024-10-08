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
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box from '../Box';
import Card, {CardProps} from '../Card';
import CardHeader, {CardHeaderProps} from '../CardHeader';
import Carousel, {CarouselStep} from '../Carousel';
import CircularProgressAvatar from '../CircularProgressAvatar';
import Divider from '../Divider';
import {UserTemplate} from '../UserDropdownMenu';
import './account-overview.scss';

export interface AccountOverviewProps extends Omit<CardProps, 'title'> {
  /**
   * Account completion steps.
   */
  accountCompletionSteps?: AccountCompletionSteps[];
  /**
   * Account completion steps title.
   */
  accountCompletionStepsTitle?: string;
  /**
   * Account progress.
   */
  accountProgress: number;
  /**
   * Card header props.
   */
  cardHeaderProps?: CardHeaderProps;
  /**
   * Card Subheader.
   * @example <span>subheader</span>
   */
  subheader?: ReactNode;
  /**
   * Card Title.
   * @example <span>title</span>
   */
  title: ReactNode;
  /**
   * Logged user information.
   */
  user: UserTemplate;
}

export type AccountCompletionSteps = CarouselStep;

const COMPONENT_NAME: string = 'AccountOverview';

const AccountOverview: FC<AccountOverviewProps> & WithWrapperProps = (props: AccountOverviewProps): ReactElement => {
  const {
    className,
    title,
    subheader,
    accountCompletionStepsTitle,
    accountCompletionSteps,
    accountProgress,
    user,
    cardHeaderProps,
    ...rest
  } = props;

  const classes: string = clsx('oxygen-account-overview', className);

  return (
    <Card className={classes} elevation={0} variant="outlined" {...rest}>
      <CardHeader
        avatar={
          <CircularProgressAvatar
            color={accountProgress < 100 ? 'warning' : 'success'}
            progress={accountProgress}
            avatarOptions={{alt: "User's avatar", src: user?.image}}
            badgeOptions={{badgeContent: `${accountProgress}%`, color: accountProgress < 100 ? 'warning' : 'success'}}
          />
        }
        title={title}
        subheader={subheader}
        {...cardHeaderProps}
      />
      {accountCompletionSteps && (
        <Box className="oxygen-account-completion-steps-box">
          <Divider />
          <Carousel title={accountCompletionStepsTitle} steps={accountCompletionSteps} />
        </Box>
      )}
    </Card>
  );
};

AccountOverview.displayName = composeComponentDisplayName(COMPONENT_NAME);
AccountOverview.muiName = COMPONENT_NAME;

export default AccountOverview;
