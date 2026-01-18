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
  CardButton,
  DisappearingCardButtonContent,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from './CardButton'
import { Stack } from './Stack'
import { Header, Subheader, Body } from './Typography'
import { Section } from './Section'
import { Wizard } from './Wizard'
import type { WizardProps, WizardStep } from './Wizard'
import { ElementWrapper } from './ElementWrapper'

export type { WizardProps, WizardStep }

export const Form = {
  CardButton: CardButton,
  DisappearingCardButtonContent: DisappearingCardButtonContent,
  CardHeader: CardHeader,
  CardContent: CardContent,
  CardActions: CardActions,
  CardMedia: CardMedia,
  Stack: Stack,
  Header: Header,
  Subheader: Subheader,
  Body: Body,
  Section: Section,
  Wizard: Wizard,
  // Form Element Wrapper
  ElementWrapper: ElementWrapper,
}
