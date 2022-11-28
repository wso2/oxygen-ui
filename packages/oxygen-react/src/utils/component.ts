import {PACKAGE_NAME} from '../constants';

export const composeComponentDisplayName = (componentName: string): string => `${PACKAGE_NAME}/${componentName}`;
