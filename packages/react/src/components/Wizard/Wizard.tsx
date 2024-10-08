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
import {FC, HTMLAttributes, ReactElement, useCallback, useMemo, useState} from 'react';
import type {WithWrapperProps} from '../../models/component';
import composeComponentDisplayName from '../../utils/compose-component-display-name';
import Box from '../Box';
import Button from '../Button';
import Card from '../Card';
import CardActions from '../CardActions';
import CardContent from '../CardContent';
import CardHeader from '../CardHeader';
import LinearProgress from '../LinearProgress';
import Stepper from '../Stepper';
import Typography from '../Typography';
import './wizard.scss';

export interface WizardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Allow backward navigation. This will show a button allowing you to navigate backwards.
   */
  allowBackwardNavigation?: boolean;
  /**
   * Allow cancel. This will show a button allowing you to cancel the wizard.
   */
  allowCancel?: boolean;
  /**
   * Animate the slide transition.
   */
  animateOnSlide?: boolean;
  /**
   * Cancel button text.
   */
  cancelButtonText?: string;
  /**
   * Finish button text.
   */
  finishButtonText?: string;
  /**
   * Next button text.
   */
  nextButtonText?: string;
  /**
   * Callback to be called when the cancel button is clicked.
   */
  onCancelButtonClick: () => Promise<void>;
  /**
   * Callback to be called when the finish button is clicked.
   */
  onFinishButtonClick: () => Promise<void>;
  /**
   * Callback to be called when the next button is clicked.
   */
  onNextButtonClick: () => Promise<void>;
  /**
   * Callback to be called when the previous button is clicked.
   */
  onPreviousButtonClick: () => Promise<void>;
  /**
   * Previous button text.
   */
  previousButtonText?: string;
  /**
   * Steps to be rendered.
   */
  steps: ReactElement[];
  /**
   * Subtitle of the wizard.
   */
  subtitle: string;
  /**
   * Title of the wizard.
   */
  title: string;
}

const COMPONENT_NAME: string = 'Wizard';

const Wizard: FC<WizardProps> & WithWrapperProps = (props: WizardProps): ReactElement => {
  const {
    allowBackwardNavigation,
    allowCancel,
    animateOnSlide,
    className,
    title,
    subtitle,
    nextButtonText,
    previousButtonText,
    cancelButtonText,
    onCancelButtonClick,
    onNextButtonClick,
    onPreviousButtonClick,
    onFinishButtonClick,
    finishButtonText,
    steps,
  } = props;

  const [currentStep, setCurrentStep] = useState<number>(0);

  const classes: string = clsx('oxygen-wizard', className);

  const isLastStep: boolean = useMemo(() => currentStep === steps.length - 1, [steps, currentStep]);
  const isFirstStep: boolean = useMemo(() => currentStep === 0, [currentStep]);
  const displayCurrentStep: number = useMemo(() => currentStep + 1, [currentStep]);

  const handleNextButtonClick: () => Promise<void> = useCallback(async (): Promise<void> => {
    if (isLastStep) {
      if (onFinishButtonClick && onFinishButtonClick instanceof Function) {
        await onFinishButtonClick();
      }

      return;
    }

    if (onNextButtonClick && onNextButtonClick instanceof Function) {
      await onNextButtonClick();
    }

    setCurrentStep((step: number) => step + 1);
  }, [isLastStep, onFinishButtonClick, onNextButtonClick]);

  const handlePreviousButtonClick: () => Promise<void> = useCallback(async (): Promise<void> => {
    if (isFirstStep) {
      return;
    }

    if (onPreviousButtonClick && onPreviousButtonClick instanceof Function) {
      await onPreviousButtonClick();
    }
    setCurrentStep((step: number) => step - 1);
  }, [isFirstStep, onPreviousButtonClick]);

  return (
    <Box className={classes}>
      <Card elevation={1} className="oxygen-wizard-card">
        <CardHeader title={title} subheader={subtitle} />
        <CardContent className="oxygen-wizard-card-content">
          <Stepper animateOnSlide={animateOnSlide} currentStep={currentStep} steps={steps} />
        </CardContent>
        <CardActions className="oxygen-wizard-actions">
          <Box>
            {allowBackwardNavigation && !isFirstStep && (
              <Button color="secondary" onClick={handlePreviousButtonClick}>
                {previousButtonText}
              </Button>
            )}
          </Box>
          <Box className="oxygen-wizard-right-aligned-buttons">
            {allowCancel && (
              <Button variant="contained" color="secondary" onClick={onCancelButtonClick}>
                {cancelButtonText}
              </Button>
            )}
            <Button variant="contained" color="primary" onClick={handleNextButtonClick}>
              {isLastStep ? finishButtonText : nextButtonText}
            </Button>
          </Box>
        </CardActions>
      </Card>
      <Box className="oxygen-wizard-progress-container">
        <Typography>{`${displayCurrentStep}/${steps.length}`}</Typography>
        <Box className="oxygen-wizard-progress-bar-container">
          <LinearProgress
            className="oxygen-wizard-progress-bar"
            variant="determinate"
            value={(displayCurrentStep / steps.length) * 100}
            aria-label="Wizard Progress Bar"
          />
        </Box>
      </Box>
    </Box>
  );
};

Wizard.displayName = composeComponentDisplayName(COMPONENT_NAME);
Wizard.muiName = COMPONENT_NAME;
Wizard.defaultProps = {
  allowBackwardNavigation: true,
  allowCancel: false,
  cancelButtonText: 'Cancel',
  finishButtonText: 'Finish',
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
};

export default Wizard;
