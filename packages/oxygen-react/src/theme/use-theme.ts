import {useTheme as useSystemTheme} from '@mui/system';
import {Theme} from '../models';
import defaultTheme from './default-theme';

export const useTheme = <T = Theme>(): T => useSystemTheme<T>(defaultTheme as T);
