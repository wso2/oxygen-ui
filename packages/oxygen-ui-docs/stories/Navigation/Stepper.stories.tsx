/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import type { Meta, StoryObj } from '@storybook/react';
import { Box, Button, Stepper, Step, StepLabel, StepContent, Typography } from '@wso2/oxygen-ui';
import React, { useState } from 'react';

/**
 * Steppers convey progress through numbered steps. It provides a wizard-like workflow.
 * 
 * This is a direct import of MUI stepper component. 
 * Read more at: https://mui.com/material-ui/react-stepper/
 */
const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Oxygen UI stepper component is a direct import of MUI stepper component. \n\n' + 
        'Read MUI documentation for complete API : ' +
        '[https://mui.com/material-ui/react-stepper/](https://mui.com/material-ui/react-stepper/)',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const Horizontal: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <Box sx={{ width: '100%', minWidth: 600 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {activeStep === steps.length ? (
            <>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset} sx={{ mt: 1 }}>
                Reset
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <Box sx={{ minWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>Step {index + 1} content</Typography>
                <Box sx={{ mb: 2 }}>
                  <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Box sx={{ pt: 2 }}>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset} sx={{ mt: 1 }}>
              Reset
            </Button>
          </Box>
        )}
      </Box>
    );
  },
};

export const AlternativeLabel: Story = {
  render: () => (
    <Box sx={{ width: '100%', minWidth: 600 }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  ),
};

export const NonLinear: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(completed).length;

    const isLastStep = () => activeStep === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
      setActiveStep(step);
    };

    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };

    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };

    return (
      <Box sx={{ width: '100%', minWidth: 600 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel onClick={handleStep(index)} sx={{ cursor: 'pointer' }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {allStepsCompleted() ? (
            <>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset} sx={{ mt: 1 }}>
                Reset
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
};
