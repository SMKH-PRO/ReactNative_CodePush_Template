import { ThemeReducer } from '../../utils/enums/reducers.enums';
import { Action, ThemeState } from '../types/theme.type';

const switchDarkMode = (bool: boolean): Action => ({
  type: ThemeReducer.DARK_MODE,
  payload: { dark: bool },
});

const setTheme = (theme: ThemeState): Action => ({
  type: ThemeReducer.SET_THEME,
  payload: theme,
});

export { switchDarkMode, setTheme };
