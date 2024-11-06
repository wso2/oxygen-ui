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

import {render} from '@unit-testing';
import Button from '../../Button';
import Step from '../../Step';
import StepContent from '../../StepContent';
import StepLabel from '../../StepLabel';
import Typography from '../../Typography';
import Stepper from '../Stepper';

describe('Stepper', () => {
  it('should render successfully', () => {
    const {baseElement} = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel optional={<Typography variant="caption">Step One Description</Typography>}>
            Step One Label
          </StepLabel>
          <StepContent>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Typography>Aenean eleifend tortor lorem, at mollis mauris euismod in.</Typography>
            <Button sx={{mr: 1, mt: 1}} variant="contained">
              Next
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel optional={<Typography variant="caption">Step Two Description</Typography>}>
            Step Two Label
          </StepLabel>
          <StepContent>
            <Typography>Step Two Content</Typography>
            <Button sx={{mr: 1, mt: 1}} variant="contained">
              Next
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel optional={<Typography variant="caption">Step Three Description</Typography>}>
            Step Three Label
          </StepLabel>
          <StepContent>
            <Typography>Step Three Content</Typography>
            <Button sx={{mr: 1, mt: 1}} variant="contained">
              Done
            </Button>
          </StepContent>
        </Step>
      </Stepper>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const {baseElement} = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel optional={<Typography variant="caption">Step One Description</Typography>}>
            Step One Label
          </StepLabel>
          <StepContent>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Typography>Aenean eleifend tortor lorem, at mollis mauris euismod in.</Typography>
            <Button sx={{mr: 1, mt: 1}} variant="contained">
              Next
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel optional={<Typography variant="caption">Step Two Description</Typography>}>
            Step Two Label
          </StepLabel>
          <StepContent>
            <Typography>Step Two Content</Typography>
            <Button sx={{mr: 1, mt: 1}} variant="contained">
              Next
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel optional={<Typography variant="caption">Step Three Description</Typography>}>
            Step Three Label
          </StepLabel>
          <StepContent>
            <Typography>Step Three Content</Typography>
            <Button sx={{mr: 1, mt: 1}} variant="contained">
              Done
            </Button>
          </StepContent>
        </Step>
      </Stepper>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
