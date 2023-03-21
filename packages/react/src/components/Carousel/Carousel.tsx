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

import {ChevronLeftIcon, ChevronRightIcon} from '@oxygen-ui-experimental/react-icons';
import clsx from 'clsx';
import {FC, HTMLAttributes, ReactElement, ReactNode, useEffect, useMemo, useState} from 'react';
import {useIsMobile} from '../../hooks';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box from '../Box';
import Button from '../Button';
import Card from '../Card';
import CardContent from '../CardContent';
import IconButton from '../IconButton';
import {IconButtonVariants} from '../IconButton/IconButton';
import ListItem from '../ListItem';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import {Stepper} from '../Stepper';
import './carousel.scss';

export interface CarouselStep {
  /**
   * Action to be performed on the step.
   * @example <Button onClick={() => {}}>Action Button</Button>
   */
  action?: ReactNode;
  /**
   * The description of the step.
   * @example <span>description</span>
   */
  description?: ReactNode;
  /**
   * The illustration to be displayed in the step.
   * @example <img src="https://example.com/image.png" alt="icon" />
   */
  illustration?: ReactElement;
  /**
   * The title of the step.
   * @example <span>title</span>
   */
  title: ReactNode;
}

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Specifies whether to auto play the carousel.
   */
  autoPlay?: boolean;
  /**
   * Specifies the interval between slide transitions.
   */
  autoPlayInterval?: number;
  /**
   * The text to be displayed in the next button.
   */
  nextButtonText?: string;
  /**
   * The text to be displayed in the previous button.
   */
  previousButtonText?: string;
  /**
   * The steps to be displayed in the carousel.
   */
  steps: CarouselStep[];
  /**
   * The title of the carousel.
   * @example <span>title</span>
   */
  title?: ReactNode;
}

const COMPONENT_NAME: string = 'Carousel';

const Carousel: FC<CarouselProps> & WithWrapperProps = (props: CarouselProps): ReactElement => {
  const {autoPlay, autoPlayInterval, className, nextButtonText, previousButtonText, steps, title, ...rest} = props;
  const [currentStep, setCurrentStep] = useState<number>(0);

  const isLastStep: boolean = useMemo(() => currentStep === steps.length - 1, [steps, currentStep]);
  const isFirstStep: boolean = useMemo(() => currentStep === 0, [currentStep]);
  const isMobile: boolean = useIsMobile();

  const classes: string = clsx('oxygen-carousel', {mobile: isMobile}, className);

  useEffect(() => {
    if (!autoPlay) {
      return () => {};
    }

    const interval: NodeJS.Timer = setInterval(() => {
      if (isLastStep) {
        setCurrentStep(0);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentStep, isLastStep]);

  const handleNextButtonClick = (): void => {
    if (isLastStep) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousButtonClick = (): void => {
    if (isFirstStep) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const generateCarouselSteps = (): ReactElement[] =>
    steps?.map((step: CarouselStep) => {
      const {title: stepTitle, description, illustration, action} = step;
      return (
        <Box key={`${stepTitle}-${description}`} className="oxygen-carousel-step">
          <Card elevation={0} variant="outlined" className="oxygen-carousel-step-card">
            <ListItem component={CardContent}>
              {illustration && <ListItemIcon>{illustration}</ListItemIcon>}
              <ListItemText primary={stepTitle} secondary={description ?? null} />
            </ListItem>
          </Card>
          {action && <Box className="oxygen-carousel-step-button-bar">{action}</Box>}
        </Box>
      );
    });

  return (
    <Box className={classes} {...rest}>
      <Box className="oxygen-carousel-top-bar">
        <Box className="oxygen-carousel-title">{title}</Box>
        <Box className="oxygen-carousel-mobile-buttons">
          <IconButton
            variant={IconButtonVariants.CONTAINED}
            color="secondary"
            disabled={isFirstStep}
            onClick={handlePreviousButtonClick}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            variant={IconButtonVariants.CONTAINED}
            color="secondary"
            disabled={isLastStep}
            onClick={handleNextButtonClick}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box className="oxygen-carousel-button-group">
          <Button
            variant="text"
            color="secondary"
            disabled={isFirstStep}
            onClick={handlePreviousButtonClick}
            startIcon={<ChevronLeftIcon />}
          >
            {previousButtonText}
          </Button>
          <Button
            variant="text"
            color="secondary"
            disabled={isLastStep}
            onClick={handleNextButtonClick}
            endIcon={<ChevronRightIcon />}
          >
            {nextButtonText}
          </Button>
        </Box>
      </Box>
      <Box>
        <Stepper animateOnSlide steps={generateCarouselSteps()} currentStep={currentStep} />
      </Box>
    </Box>
  );
};

Carousel.displayName = composeComponentDisplayName(COMPONENT_NAME);
Carousel.muiName = COMPONENT_NAME;
Carousel.defaultProps = {
  autoPlay: false,
  autoPlayInterval: 5000,
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
};

export default Carousel;
