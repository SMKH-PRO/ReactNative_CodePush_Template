import { ThemeReducer } from '../../utils/enums/reducers.enums';
import {
  SwitchDarkModeAction,
  SetThemeAction,
  ThemeState,
} from '../types/theme.type';

const switchDarkMode = (bool: boolean): SwitchDarkModeAction => ({
  type: ThemeReducer.DARK_MODE,
  payload: { dark: bool },
});

const setTheme = (theme: ThemeState): SetThemeAction => ({
  type: ThemeReducer.SET_THEME,
  payload: theme,
});

export { switchDarkMode, setTheme };
