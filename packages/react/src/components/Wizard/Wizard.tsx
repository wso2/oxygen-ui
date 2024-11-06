/**
 * Copyright (c) 2023-2024, WSO2 LLC. (https://www.wso2.com).
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
import {forwardRef, useCallback, useMemo, useState} from 'react';
import type {ElementType, Ref, ReactElement} from 'react';
import Box from '../Box';
import type {BoxProps, BoxTypeMap} from '../Box';
import Button from '../Button';
import Card from '../Card';
import CardActions from '../CardActions';
import CardContent from '../CardContent';
import CardHeader from '../CardHeader';
import LinearProgress from '../LinearProgress';
import TransitionStepper from '../TransitionStepper';
import Typography from '../Typography';
import './wizard.scss';

export type WizardProps<C extends ElementType = ElementType> = BoxProps<C> & {
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
};

/**
 * The Wizard lets you create a step-by-step wizard with a progress bar.
 *
 * Demos:
 *
 * - [Wizard (Oxygen UI)](https://wso2.github.io/oxygen-ui/react/?path=/docs/patterns-wizard)
 *
 * API:
 *
 * - inherits [Box API](https://mui.com/material-ui/api/box/)
 *
 * @remarks
 * - ✨ This is a custom component that is not available in the Material-UI library.
 * - ✔️ Props of the [Box](https://mui.com/material-ui/api/box/) component are also available.
 * - ✅ `component` prop is supported.
 * - ✅ The `ref` is forwarded to the root element.
 *
 * @template C - The type of the component.
 * @param props - The props for the Wizard component.
 * @param ref - The ref to be forwarded to the Box component.
 * @returns The rendered Wizard component.
 */
const Wizard: OverridableComponent<BoxTypeMap<WizardProps>> = forwardRef(
  <C extends ElementType = ElementType>(
    {
      allowBackwardNavigation = true,
      allowCancel = false,
      animateOnSlide,
      className,
      title,
      subtitle,
      nextButtonText = 'Next',
      previousButtonText = 'Previous',
      cancelButtonText = 'Cancel',
      onCancelButtonClick,
      onNextButtonClick,
      onPreviousButtonClick,
      onFinishButtonClick,
      finishButtonText = 'Finish',
      steps,
    }: WizardProps<C>,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
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
      <Box ref={ref} className={classes}>
        <Card elevation={1} className="oxygen-wizard-card">
          <CardHeader title={title} subheader={subtitle} />
          <CardContent className="oxygen-wizard-card-content">
            <TransitionStepper animateOnSlide={animateOnSlide} currentStep={currentStep} steps={steps} />
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
  },
) as OverridableComponent<BoxTypeMap<WizardProps>>;

export default Wizard;
