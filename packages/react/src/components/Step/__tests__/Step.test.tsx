/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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
import Button from '../../Button/Button';
import StepContent from '../../StepContent/StepContent';
import StepLabel from '../../StepLabel/StepLabel';
import Typography from '../../Typography';
import Step from '../Step';

describe('Step', () => {
  it('should render successfully', () => {
    const {baseElement} = render(
      <Step>
        <StepLabel optional={<Typography variant="caption">Sample Step Description</Typography>}>
          Sample Step Label
        </StepLabel>
        <StepContent>
          <Typography>Sample Step Content</Typography>
          <Button sx={{mr: 1, mt: 1}}>Next</Button>
        </StepContent>
      </Step>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const {baseElement} = render(
      <Step>
        <StepLabel optional={<Typography variant="caption">Sample Step Description</Typography>}>
          Sample Step Label
        </StepLabel>
        <StepContent>
          <Typography>Sample Step Content</Typography>
          <Button sx={{mr: 1, mt: 1}}>Next</Button>
        </StepContent>
      </Step>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
