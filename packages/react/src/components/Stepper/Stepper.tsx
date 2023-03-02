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
import {FC, HTMLAttributes, MutableRefObject, ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {WithWrapperProps} from '../../models';
import {composeComponentDisplayName} from '../../utils';
import Box from '../Box';
import './stepper.scss';

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Animate the slide transition.
   */
  animateOnSlide?: boolean;
  /**
   * Current step.
   */
  currentStep: number;
  /**
   * Steps to be rendered.
   */
  steps: ReactElement[];
}

const COMPONENT_NAME: string = 'Stepper';

const Stepper: FC<StepperProps> & WithWrapperProps = (props: StepperProps): ReactElement => {
  const {animateOnSlide, className, currentStep, steps} = props;

  const [slideLeftPosition, setSlideLeftPosition] = useState<number>(0);
  const [slideContainerWidth, setSlideContainerWidth] = useState<number>(0);

  const slideContainerRef: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const classes: string = clsx('oxygen-stepper', className);

  const slideContainer: (position: number) => void = useCallback(
    (position: number): void => {
      if (!animateOnSlide) {
        return;
      }

      const slideBy: number = position;
      setSlideLeftPosition(slideBy * -1 * currentStep);
    },
    [currentStep, animateOnSlide],
  );

  useEffect(() => {
    if (!slideContainerRef?.current || !animateOnSlide) {
      return () => {};
    }

    setSlideContainerWidth(slideContainerRef.current.offsetWidth);

    const handleResize = (): void => {
      const width: number = slideContainerRef.current.offsetWidth;
      setSlideContainerWidth(width);
      slideContainer(width);
    };

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [animateOnSlide, slideContainer]);

  useEffect(() => {
    slideContainer(slideContainerWidth);
  }, [slideContainerWidth, slideContainer]);

  if (animateOnSlide) {
    return (
      <Box className={classes} ref={slideContainerRef}>
        <Box className="oxygen-stepper-container" sx={{left: `${slideLeftPosition}px`}}>
          {steps.map((step: ReactElement) => (
            <Box key={step.key} sx={{width: slideContainerWidth}}>
              {step}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return steps[currentStep];
};

Stepper.displayName = composeComponentDisplayName(COMPONENT_NAME);
Stepper.muiName = COMPONENT_NAME;
Stepper.defaultProps = {
  currentStep: 0,
};

export default Stepper;
