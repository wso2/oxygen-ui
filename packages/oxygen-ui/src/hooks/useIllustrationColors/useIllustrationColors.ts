/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useTheme } from '@mui/material/styles';

export interface IllustrationColors {
  accentWarm: string;
  accentWarmLight: string;
  accentWarmDark: string;
  accentGold: string;
  accentGoldLight: string;
  accentCool: string;
  accentCoolLight: string;
  accentCoolDark: string;
  accentBlue: string;
  accentBlueLight: string;
  accentAlert: string;
  accentAlertLight: string;
  steelDark: string;
  steelLight: string;
  ink: string;
  inkMuted: string;
  inkStrong: string;
  paper: string;
  shadow: string;
  skinLight: string;
  skinDark: string;
}

export function useIllustrationColors(): IllustrationColors {
  const theme = useTheme();
  const palette = theme.vars?.palette ?? theme.palette;

  return {
    accentWarm: palette.primary.main,
    accentWarmLight: palette.primary.light ?? palette.primary.main,
    accentWarmDark: palette.primary.dark ?? palette.primary.main,
    accentGold: palette.warning.main,
    accentGoldLight: palette.warning.light ?? palette.warning.main,
    accentCool: palette.secondary.main,
    accentCoolLight: palette.secondary.light ?? palette.secondary.main,
    accentCoolDark: palette.secondary.dark ?? palette.secondary.main,
    accentBlue: palette.info.main,
    accentBlueLight: palette.info.light ?? palette.info.main,
    accentAlert: palette.error.main,
    accentAlertLight: palette.error.light ?? palette.error.main,
    steelDark: palette.grey?.[700] ?? palette.text.primary,
    steelLight: palette.grey?.[500] ?? palette.text.secondary,
    ink: palette.text.primary,
    inkMuted: palette.text.secondary,
    inkStrong: palette.grey?.[900] ?? palette.text.primary,
    paper: palette.background.paper,
    shadow: palette.grey?.[900] ?? '#010101',
    skinLight: palette.warning.light ?? palette.warning.main,
    skinDark: palette.warning.main,
  };
}

export default useIllustrationColors;
