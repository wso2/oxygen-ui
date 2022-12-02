import {asgardeoTheme, choreoTheme, defaultTheme, wso2Theme} from './themes';

export enum BrandingActions {
  ChangeTheme = 'ChangeTheme',
}

export const brandingReducer = (theme: string, action: any) => {
  switch (action.type) {
    case BrandingActions.ChangeTheme: {
      if (action.brand === 'Oxygen') {
        return defaultTheme;
      }
      if (action.brand === 'Choreo') {
        return choreoTheme;
      }
      if (action.brand === 'Asgardeo') {
        return asgardeoTheme;
      }
      if (action.brand === 'WSO2') {
        return wso2Theme;
      }

      if (action.theme) {
        return action.theme;
      }

      return theme;
    }
    default: {
      return theme;
    }
  }
};
