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

import {
  Card,
  CardContent,
  StepLabel,
  Step,
  Stepper,
  Divider,
} from '@mui/material';
import { Stack } from './Stack';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

export type WizardStep = {
  label: string;
  component: React.ReactNode;
};

export type WizardProps = {
  steps: WizardStep[];
  activeStep: number;
  actions?: React.ReactNode;
};

const StyledWizardActionsStack = styled(Stack)(() => ({
  justifyContent: 'space-between',
  flexGrow: 1,
}));

export function Wizard({ steps, activeStep, actions }: WizardProps) {
  const step = useMemo(() => activeStep < steps.length ? steps[activeStep] : null, [steps, activeStep]);
  return (
    <Card>
      <CardContent>
        <Stack>
          <Stepper activeStep={activeStep}>
            {steps.map(step => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider />
          <Stack direction="row">{step?.component}</Stack>
          <StyledWizardActionsStack direction="row">
            {actions}
          </StyledWizardActionsStack>
        </Stack>
      </CardContent>
    </Card>
  );
}
